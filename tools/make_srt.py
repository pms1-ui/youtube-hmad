#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
make_srt.py — 오디오 + 내 대본 → 문장 단위 SRT 자막 생성 (프리미어용)

핵심 아이디어
------------
음성 인식(STT)은 "소리를 추측"하므로 헬스 전문용어에서 오타가 난다.
하지만 우리는 정확한 대본(script)이 이미 있으므로, 인식 대신 "정렬(forced alignment)"만 하면 된다.
  1) WhisperX로 오디오를 단어 단위 타임스탬프로 얻는다 (transcribe → align).
  2) 대본을 문장 단위로 쪼갠다.
  3) 대본 문장의 글자 흐름을 WhisperX 단어 타임라인에 순서대로 매핑해서
     각 문장의 시작/끝 시간을 구한다.
  4) 자막 텍스트는 "대본 원문 그대로" 쓴다 → 오타 0, 타이밍만 자동.

사용법
------
  ./.venv-subtitle/bin/python tools/make_srt.py <오디오파일> <대본파일> [옵션]

예시
----
  ./.venv-subtitle/bin/python tools/make_srt.py audio/result/v7.mp3 script/longform/v7_....md
  ./.venv-subtitle/bin/python tools/make_srt.py audio/result/v7.mp3 script/longform/v7_....md -o out/v7.srt --model large-v3

옵션
----
  -o, --output   출력 SRT 경로 (기본: 대본파일명.srt, 오디오와 같은 폴더)
  --model        Whisper 모델 크기 (tiny/base/small/medium/large-v3, 기본 large-v3)
  --max-chars    한 자막 줄 최대 글자 수. 문장이 길면 이 길이로 다시 쪼갬 (기본 0 = 안 쪼갬, 순수 문장 단위)
  --lang         언어 코드 (기본 ko)
"""
import argparse
import os
import re
import sys


def log(msg: str) -> None:
    print(f"[make_srt] {msg}", flush=True)


# ---------------------------------------------------------------------------
# 대본 파싱: 문장 단위 분할
# ---------------------------------------------------------------------------
def load_script_sentences(path: str):
    """대본 파일을 읽어 문장 리스트로 반환. 마크다운 장식/빈줄 제거."""
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    # 마크다운 헤더/불릿/코드펜스 등 장식 제거 (대본은 순수 줄글이지만 방어적으로)
    lines = []
    for line in raw.splitlines():
        s = line.strip()
        if not s:
            continue
        if s.startswith("#") or s.startswith("```") or s.startswith(">"):
            continue
        s = re.sub(r"^[-*+]\s+", "", s)          # 불릿 기호
        s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)   # 볼드
        lines.append(s)
    text = " ".join(lines)
    text = re.sub(r"\s+", " ", text).strip()

    # 문장 종결부호(. ! ?) 뒤에서 분리. 종결부호는 문장에 포함.
    sentences = re.split(r"(?<=[.!?。！？])\s+", text)
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences


def split_long_sentence(sentence: str, max_chars: int):
    """max_chars가 설정된 경우, 긴 문장을 쉼표/공백 경계에서 여러 조각으로 분할."""
    if max_chars <= 0 or len(sentence) <= max_chars:
        return [sentence]
    parts = []
    remaining = sentence
    while len(remaining) > max_chars:
        window = remaining[:max_chars]
        # 쉼표 우선, 없으면 마지막 공백에서 끊기
        cut = max(window.rfind(","), window.rfind(" "))
        if cut < max_chars // 2:  # 적당한 경계가 없으면 그냥 max_chars에서 자름
            cut = max_chars
        parts.append(remaining[:cut].strip())
        remaining = remaining[cut:].strip()
    if remaining:
        parts.append(remaining)
    return [p for p in parts if p]


# ---------------------------------------------------------------------------
# 한글 정규화: 문장↔단어 매핑을 위해 비교용 글자 스트림 생성
# ---------------------------------------------------------------------------
def normalize_chars(s: str) -> str:
    """한글/영숫자만 남기고 소문자화. 매핑 비교용."""
    return re.sub(r"[^0-9a-zA가-힣]", "", s.lower())


# ---------------------------------------------------------------------------
# WhisperX로 단어 단위 타임스탬프 추출
# ---------------------------------------------------------------------------
def transcribe_words(audio_path: str, model_size: str, lang: str):
    """WhisperX transcribe + align → [{word, start, end}, ...] 반환."""
    import whisperx

    device = "cpu"
    compute_type = "int8"  # Mac CPU 안전 옵션

    log(f"Whisper 모델 로드: {model_size} (device={device}, compute={compute_type})")
    model = whisperx.load_model(model_size, device, compute_type=compute_type, language=lang)

    log(f"오디오 로드: {audio_path}")
    audio = whisperx.load_audio(audio_path)

    log("1/2 전사(transcribe) 중...")
    result = model.transcribe(audio, batch_size=8, language=lang)

    log("2/2 정렬(align, 단어 단위 타임스탬프) 중...")
    align_model, metadata = whisperx.load_align_model(language_code=lang, device=device)
    aligned = whisperx.align(
        result["segments"], align_model, metadata, audio, device,
        return_char_alignments=False,
    )

    words = []
    for seg in aligned.get("segments", []):
        for w in seg.get("words", []):
            token = w.get("word", "").strip()
            start = w.get("start")
            end = w.get("end")
            if token and start is not None and end is not None:
                words.append({"word": token, "start": float(start), "end": float(end)})
    log(f"단어 타임스탬프 {len(words)}개 확보")
    return words


# ---------------------------------------------------------------------------
# 대본 문장 ↔ WhisperX 단어 정렬
# ---------------------------------------------------------------------------
def align_sentences_to_words(sentences, words):
    """
    각 단어의 정규화 글자 수를 누적해 '글자 타임라인'을 만든 뒤,
    대본 문장의 정규화 글자 길이만큼 순서대로 소비하며 시작/끝 시간을 배정.
    """
    # 단어별 (정규화글자, start, end)
    word_stream = []
    for w in words:
        nc = normalize_chars(w["word"])
        if nc:
            word_stream.append((nc, w["start"], w["end"]))

    if not word_stream:
        return None

    total_audio_end = word_stream[-1][2]
    results = []
    wi = 0                 # 현재 단어 인덱스
    char_used_in_word = 0  # 현재 단어에서 소비한 글자 수

    for sent in sentences:
        need = len(normalize_chars(sent))
        if need == 0:
            # 정규화 후 글자가 없는 문장(기호만) → 스킵성 처리: 직전 끝 시간에 붙임
            start = results[-1]["end"] if results else 0.0
            results.append({"text": sent, "start": start, "end": start})
            continue

        start_time = None
        end_time = None
        remaining = need

        while remaining > 0 and wi < len(word_stream):
            nc, wstart, wend = word_stream[wi]
            avail = len(nc) - char_used_in_word
            if start_time is None:
                # 이 단어 구간 안에서 시작 시점 비례 보간
                frac = char_used_in_word / len(nc)
                start_time = wstart + (wend - wstart) * frac

            if avail <= remaining:
                # 이 단어를 전부 소비
                remaining -= avail
                end_time = wend
                wi += 1
                char_used_in_word = 0
            else:
                # 이 단어 일부만 소비하고 멈춤
                char_used_in_word += remaining
                frac = char_used_in_word / len(nc)
                end_time = wstart + (wend - wstart) * frac
                remaining = 0

        if start_time is None:
            start_time = results[-1]["end"] if results else 0.0
        if end_time is None:
            end_time = total_audio_end

        results.append({"text": sent, "start": start_time, "end": end_time})

    # 겹침/역전 방지: 다음 자막 시작은 이전 끝 이상으로
    for i in range(1, len(results)):
        if results[i]["start"] < results[i - 1]["end"]:
            results[i]["start"] = results[i - 1]["end"]
        if results[i]["end"] < results[i]["start"]:
            results[i]["end"] = results[i]["start"] + 0.3

    return results


# ---------------------------------------------------------------------------
# SRT 출력
# ---------------------------------------------------------------------------
def fmt_ts(seconds: float) -> str:
    if seconds < 0:
        seconds = 0
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_srt(cues, out_path: str) -> None:
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        for i, c in enumerate(cues, 1):
            f.write(f"{i}\n")
            f.write(f"{fmt_ts(c['start'])} --> {fmt_ts(c['end'])}\n")
            f.write(f"{c['text']}\n\n")


# ---------------------------------------------------------------------------
def main() -> int:
    ap = argparse.ArgumentParser(description="오디오 + 대본 → 문장 단위 SRT (프리미어용)")
    ap.add_argument("audio", help="오디오 파일 경로 (mp3/wav/m4a...)")
    ap.add_argument("script", help="대본 파일 경로 (txt/md, 순수 줄글)")
    ap.add_argument("-o", "--output", default=None, help="출력 SRT 경로")
    ap.add_argument("--model", default="large-v3", help="Whisper 모델 (기본 large-v3)")
    ap.add_argument("--max-chars", type=int, default=0, help="자막 최대 글자수(0=순수 문장단위)")
    ap.add_argument("--lang", default="ko", help="언어 코드 (기본 ko)")
    args = ap.parse_args()

    if not os.path.exists(args.audio):
        log(f"오디오 파일 없음: {args.audio}")
        return 1
    if not os.path.exists(args.script):
        log(f"대본 파일 없음: {args.script}")
        return 1

    out_path = args.output
    if out_path is None:
        base = os.path.splitext(os.path.basename(args.script))[0]
        out_path = os.path.join(os.path.dirname(os.path.abspath(args.audio)), base + ".srt")

    # 1) 대본 문장 분할
    sentences = load_script_sentences(args.script)
    if args.max_chars > 0:
        expanded = []
        for s in sentences:
            expanded.extend(split_long_sentence(s, args.max_chars))
        sentences = expanded
    log(f"대본 문장 {len(sentences)}개")

    # 2) WhisperX 단어 타임스탬프
    words = transcribe_words(args.audio, args.model, args.lang)
    if not words:
        log("단어 타임스탬프를 얻지 못했습니다. (오디오/모델 확인)")
        return 1

    # 3) 문장 ↔ 단어 정렬
    cues = align_sentences_to_words(sentences, words)
    if not cues:
        log("정렬 실패")
        return 1

    # 4) SRT 출력
    write_srt(cues, out_path)
    log(f"완료 → {out_path}  (자막 {len(cues)}개)")
    log(f"마지막 자막 끝 시간: {fmt_ts(cues[-1]['end'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
