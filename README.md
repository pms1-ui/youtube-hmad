# 헬마드 유튜브 콘텐츠 제작 워크스페이스

헬스/건강/웨이트 유튜브 채널 **헬마드**의 스크립트 작성 + 영상 제작 통합 워크스페이스.

---

## ★ 실행 위치 규칙 (필수)

> 워크스페이스 루트 **`d:\kiro\youtube`** 가 곧 Remotion 프로젝트 실체(package.json, src, node_modules 등)이자 git 저장소 루트다.
> 모든 npm/remotion/git 명령은 **루트에서 바로 실행**한다. 별도 `cwd` 지정 불필요.
> (과거 `youtube/youtube-remotion` 2단 중첩 구조는 폐기됨 — `youtube-remotion` 하위 폴더 없음)

## ★ 포맷 확인 규칙 (필수)

> 사용자가 영상/스크립트 제작을 요청할 때 **롱폼/숏폼을 명시하지 않으면 반드시 물어볼 것**
> — "롱폼 (16:9 유튜브 본영상)인가요, 숏폼 (9:16 쇼츠/릴스)인가요?"
> 명시된 경우 바로 진행.

---

## 구조 한눈에 보기

```
d:\kiro\youtube/                   ← 워크스페이스 루트 = Remotion 프로젝트 = git 저장소
├── README.md                      ← 이 파일 (워크스페이스 개요)
├── GUIDE.md                       ← 지침 인덱스 (어디에 뭐가 있는지)
├── .kiro/steering/                ← ★ 상세 작업 지침 (주제별 스티어링)
│   ├── core-workflow.md              (항상 로드: 폴더구조·실행규칙·포맷확인·gotchas)
│   ├── script-writing.md             (script/** 편집 시)
│   ├── remotion-scenes.md            (src/** 편집 시)
│   ├── character-images.md           (수동)
│   ├── audio-timing.md               (수동)
│   ├── higgsfield-video-workflow.md  (수동)
│   └── video-mix.md                  (수동)
├── .kiro/settings/mcp.json        ← MCP 설정 (n8n-mcp, higgsfield, remotion)
├── script/{longform,shortform}/   ← 대본(txt/md)
├── src/                           ← Remotion 소스 (Root.tsx, HealthVideo.tsx, MixVideo.tsx, components/, scenes/)
├── src/data/                      ← 장면 데이터 (script.ts / shorts-script.ts / mix-scenes.ts)
├── public/                        ← 정적 에셋 (char-01~10.png, character-v2.png, fonts/, image_2026/, mix/)
├── audio/{,result/}               ← 녹음 원본 + 트림/전사 결과
├── mix/{,mix_result/}             ← 영상 믹스 소스·결과
├── video_before/                  ← 편집 전 원본 소스 (대기)
├── video_output/                  ← Higgsfield 등 외부 생성 영상 다운로드본
├── out/{longform,shortform}/      ← ★ Remotion 렌더 결과 (.mov, ProRes 4444 투명)
├── tools/                         ← 일회성/보조 파이썬 스크립트
└── .env                           ← OpenAI API 키
```

> 폴더별 상세 용도는 `.kiro/steering/core-workflow.md`의 폴더 구조 섹션 참조.

---

## 작업 유형별 요약

### 롱폼 (16:9 유튜브 본영상)
| 항목 | 내용 |
|------|------|
| 대본 저장 | `script/longform/제목.md` |
| 장면 데이터 | `src/data/script.ts` |
| Composition | `HealthVideo` (1920×1080, 30fps) |
| 캐릭터 이미지 | 사용 (10개 순환) |
| 렌더 결과 | `out/longform/*.mov` |

### 숏폼 (9:16 쇼츠/릴스)
| 항목 | 내용 |
|------|------|
| 대본 저장 | `script/shortform/제목_shorts.txt` |
| 장면 데이터 | `src/data/shorts-script.ts` |
| Composition | `ShortVideo` (1080×1920, 30fps) |
| 캐릭터 이미지 | 사용하지 않음 |
| 렌더 결과 | `out/shortform/*.mov` |

### 영상 믹스 (장면 무작위 섞기)
| 항목 | 내용 |
|------|------|
| 원본 | `mix/YYMMDD.mp4` |
| 결과물 | `mix/mix_result/mix_YYMMDD.mp4` |
| 방식 | ffmpeg `-c copy` concat (재인코딩 없음) |

---

## 주요 명령어 (모두 워크스페이스 루트 `d:\kiro\youtube`에서 실행)

```bash
# Remotion Studio 미리보기
npx remotion studio

# 롱폼 렌더링
npx remotion render src/index.ts HealthVideo out/longform/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --concurrency=8

# 숏폼 렌더링
npx remotion render src/index.ts ShortVideo out/shortform/파일명.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le --concurrency=8
```

---

## 상세 가이드

모든 상세 규칙은 `.kiro/steering/` 의 주제별 문서에 있고, 그 인덱스는 `GUIDE.md`에 있다.
