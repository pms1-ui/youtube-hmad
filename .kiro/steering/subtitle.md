---
inclusion: manual
---

# 자막(SRT) 자동 생성 — 헬마드 (프리미어용)

내 오디오 + 이미 있는 대본을 정렬(forced alignment)해서 **문장 단위 SRT 자막**을 자동 생성한다.
최종 목적지는 **프리미어(Premiere Pro)**. 자막 텍스트·타이밍은 여기서 자동 생성하고, **디자인(폰트·반투명 검은 배경 박스 등)은 프리미어에서** 처리한다.

## 핵심 개념 — "인식"이 아니라 "정렬"
- 순수 음성 인식(STT)은 소리를 추측해서 텍스트로 바꾸므로 한국어 헬스 전문용어("린매스업/크레아틴/데드리프트")에서 오타가 난다.
- 우리는 **정확한 대본이 이미 있으므로**, 인식 대신 "이 텍스트가 오디오의 몇 초에 나오는지" 시간만 맞춘다 = **forced alignment**.
- 결과: 자막 텍스트는 **대본 원문 그대로**(오타 0), 타이밍만 WhisperX가 자동 계산.

## 환경 (이미 세팅됨)
- 격리 venv: `.venv-subtitle/` (Python 3.11, git 미추적). 파이썬 실행경로 `./.venv-subtitle/bin/python`.
- 설치됨: `whisperx`, `torch`, `faster-whisper` + ffmpeg(Homebrew).
- ⚠️ 시스템 기본 `python3`(3.14)로 돌리지 말 것 — WhisperX 미호환. **반드시 `.venv-subtitle`의 파이썬** 사용.
- 재설치가 필요하면: `/opt/homebrew/bin/python3.11 -m venv .venv-subtitle && ./.venv-subtitle/bin/python -m pip install whisperx`

## 사용법
```
# 간편 실행기 (venv 자동 물림)
bash tools/srt.sh <오디오> <대본> [옵션]

# 또는 직접
./.venv-subtitle/bin/python tools/make_srt.py <오디오> <대본> [옵션]
```
예시:
```
bash tools/srt.sh audio/result/v7.mp3 script/longform/v7_260909_....md
bash tools/srt.sh audio/result/v7.mp3 script/longform/v7_....md --max-chars 20
```
- 오디오/대본 **경로는 매번 사용자가 알려준다.**
- 출력: 기본은 오디오와 같은 폴더에 `대본파일명.srt`. `-o`로 변경.

### 옵션
| 옵션 | 기본 | 설명 |
|------|:---:|------|
| `-o, --output` | 오디오폴더/대본명.srt | 출력 SRT 경로 |
| `--model` | large-v3 | Whisper 모델(tiny/base/small/medium/large-v3). 정확도 우선이면 large-v3, 속도 우선이면 small/medium |
| `--max-chars` | 0 | 0=순수 문장 단위. 값 지정 시 그 글자수로 긴 문장을 재분할(자막 짧게 끊기) |
| `--lang` | ko | 언어 코드 |

## 동작 원리 (tools/make_srt.py)
1. **대본 문장 분할**: 마크다운 장식 제거 후 종결부호(`.!?。！？`) 기준으로 문장 단위 분리.
2. **WhisperX 단어 타임스탬프**: transcribe → align(단어 단위, CPU/int8).
3. **문장↔단어 매핑**: 각 단어의 정규화 글자수를 누적한 '글자 타임라인'에, 대본 문장의 글자 길이만큼 순서대로 소비하며 시작/끝 시간 배정. 단어 경계 내에서는 비례 보간.
4. **겹침 방지** 후 SRT 출력. 자막 텍스트는 대본 원문 그대로.

## 프리미어에서 마무리 (디자인)
- SRT는 순수 `번호+시간+텍스트`만 담는다. **폰트·색·배경 박스 정보는 SRT에 없음.**
- 프리미어: 캡션 트랙으로 SRT 임포트 → **Essential Graphics(기본 그래픽)** 패널에서 스타일 지정.
  - **반투명 검은 배경 박스**: 캡션 스타일의 `Background` 옵션 켜고 색상 검정 + 불투명도 조절.
  - **폰트**: 같은 패널에서 지정(SCDream 등 프리미어에 설치돼 있어야 선택 가능).
  - 스타일을 **트랙 전체 적용 / 프리셋(트랙 스타일) 저장** 해두면 다음 영상부터 재사용 → Vrew 왕복 불필요.

## 자막 단위 기준 (헬마드)
- 기본은 **문장 단위**(대본 한 문장 = 자막 한 개).
- 롱폼에서 문장이 너무 길어 가독성이 떨어지면 `--max-chars 20` 정도로 끊어서 짧게.

## gotchas
- **오디오 파일은 git 미추적**(`audio/` gitignore). 저장소엔 안 올라가니 로컬 경로로만 접근.
- 첫 실행 시 WhisperX가 모델 가중치를 다운로드하므로 시간이 걸릴 수 있음(이후 캐시됨).
- 대본과 오디오 내용이 크게 다르면(대본에 없는 즉흥 멘트 등) 정렬이 밀릴 수 있음 → 대본을 실제 녹음과 일치시키는 게 정확도 핵심.
- 장기 실행(large-v3 + 긴 오디오)은 백그라운드 프로세스로 돌리고 로그 폴링.
