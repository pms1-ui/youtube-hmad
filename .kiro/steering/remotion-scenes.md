---
inclusion: fileMatch
fileMatchPattern: 'src/**'
---

# Remotion 장면 구현 & 디자인 원칙 — 헬마드

`src/data/script.ts`(롱폼) / `shorts-script.ts`(숏폼)의 장면 데이터를 만들고, 디자인 규칙에 맞게 렌더한다.

## 영상 제작 실행 순서 (매번 이 순서)
1. **오디오 길이 측정** — `audio/`의 mp3 길이를 초 단위로 확인.
2. **장면 구성 + 타입 분포 점검** — 대본(hmad.txt)을 문장 단위로 쪼개어 장면 배분, 총 초수 = 오디오 길이와 정확히 일치. **각 장면은 "어떤 그림으로 보여줄지" 먼저 정하고 타입을 고른다.** 배분 후 타입 분포를 집계해 **text가 30%를 넘으면 초과분을 iconGrid/compare/splitFact/timeline/차트/이미지로 재배치**한다. (아래 "비주얼 우선 강령" 참조)
3. **이미지 생성** — 주제에 맞는 포즈로 병렬 생성 → 배경 제거 (상세: `character-images.md`). 개념 일러스트가 필요하면 sceneImage용 PNG도 함께 준비.
4. **script.ts 작성** — 장면 배열 작성, characterImage 순환 배정.
5. **TypeScript 검증** — `npx tsc --noEmit ; Write-Output "EXIT=$LASTEXITCODE"`.
6. **렌더링** — ProRes 4444 투명 .mov, TransitionOverlay 없음, `--concurrency=8` 병렬. 장기 렌더는 백그라운드.

> **★ 자막·효과음은 이 프로젝트에서 만들지 않는다.** 사용자가 Vrew로 직접 처리한다. Remotion은 **화면(차트·캐릭터·인포그래픽) 투명 .mov만** 뽑는다. 전사 JSON(`audio/result/*_transcript.json`)은 장면 타이밍 산출용으로만 쓰고, SRT 자막 파일이나 효과음 트랙(SfxTrack)은 생성하지 않는다. (youtube-baby는 숏폼이라 자막·효과음을 Remotion에 넣지만, 이 롱폼 프로젝트는 Vrew 분업 체제다.)

### 병렬 처리
```
스크립트 수령
    ├── [메인] 구성 기획 → script.ts 작성 → tsc 검증
    └── [서브에이전트/병렬] 캐릭터 이미지 N개 생성 + 배경제거 + 다운로드
         ↓ (동시 완료)
    script.ts에 characterImage 할당 → 겹침/균형 검증 → Studio
```

## 장면 분할 기준 (대본 → 장면)
- **★ 반드시 문장 단위로 하나씩 세어서 나눈다.** 임의 뭉텅이 묶기 금지.
- 의미가 이어지는 짧은 문장 2개 정도는 한 화면에 묶어도 됨(전달 메시지는 하나). 길거나 독립적 문장은 각각 별도 장면.
- 작업 순서: 문장 단위 번호 매김 → 이어지는 짧은 문장만 선별 묶음 → 최종 리스트 확정.
- 롱폼도 잘게(30~45장면). 한 장면 = 한 메시지, 5초 안에 파악.
- 한 장면당 3~7초, 긴 복문은 의미 전환점에서 끊음, 같은 타입 연속 배치 지양.

## 시각 표현 판단 (차트 우선)
| 조건 | 시각 표현 |
|------|-----------|
| 구체적 수치 데이터 | 차트/그래프 (barChart, donutChart, lineGraph) |
| 비율/퍼센트(절반, 두 배 등) | 도넛/원형 프로그레스 |
| **개수·수치의 전/후, 대조군 비교 (예: 7.5회→19.6회)** | **beforeAfterChart** |
| 여러 항목의 단일 퍼센트 값 비교 | barChart |
| A vs B 비교(수치 없음) | compare |
| 시계열/추이/변화 | lineGraph |
| 항목 나열 + 정도 차이 | highlight + bulletValues(원형 프로그레스) |
| 항목 나열(수치 없음) | **iconGrid**(아이콘+라벨 카드) 우선, 또는 highlight(넘버링 카드) |
| 개념 2~5개를 그림으로(음식·운동·시간·멘탈 등) | **iconGrid**(각 항목에 SVG 아이콘) |
| 오해→진실 / 통념→반전 / 원인→결과 | **splitFact**(상하 2블록+화살표) |
| 순서/과정/단계 | timeline |
| A vs B 비교(수치 없음) | compare |
| 큰 수치 1개 강조 + 이미지 | imageStat |
| 이미지 + 짧은 설명 | imageText |
| 이미지가 주인공 | imageShowcase |
| 순수 메시지(위 어디에도 안 맞을 때만) | text |
- **차트/그래프를 최우선**. text만 나열하지 말 것. "절반/두 배/거의 동일"은 수치로 변환. **근거 없는 수치는 만들지 않되** 표현에서 합리적으로 추론 가능한 수치는 사용.
- **★ barChart는 값 뒤에 무조건 `%`가 붙는다.** 개수·횟수·kg 등 퍼센트가 아닌 수치, 또는 "전 vs 후" 짝 비교에는 **절대 barChart를 쓰지 말고 `beforeAfterChart`를 쓴다.**

### ★★ 비주얼 우선 강령 — text 남발 금지 (필수, 반면교사 기반) ★★
글자만 띡 박힌 `text` 장면이 연속되면 의미가 퇴색되고 영상이 단조로워진다. **대본 문장을 그대로 화면에 옮기는 것은 금지.** 각 장면은 "이 메시지를 어떤 그림으로 보여줄까"를 먼저 정하고 타입을 고른다.
- **★ text 타입 상한: 전체 장면의 30% 이하.** (반면교사: 261009 체지방 편이 text 40/52 = 77%로 글자만 박혀 밋밋했음. 다시는 이렇게 하지 않는다.) 50장면이면 text는 최대 15개, 나머지는 iconGrid/compare/splitFact/timeline/차트/이미지로 분산한다.
- **★ 같은 타입 3연속 금지.** text가 두 번 나왔으면 다음은 반드시 비주얼 타입(iconGrid/splitFact/compare/차트 등)으로 바꾼다.
- **수치가 없어도 비주얼로 만들 수 있다** — 이게 핵심. 수치 없는 개념도 다음으로 그림이 된다:
  - 키워드/항목 나열 → **iconGrid**(각 항목에 어울리는 SVG 아이콘). 예: 식단·유산소·운동·멘탈 → plate/run/dumbbell/brain.
  - 통념이 틀렸다·반전 → **splitFact**(위=오해, 아래=진실, 가운데 화살표).
  - A와 B 대조 → **compare**.
  - 과정·순서·시간 흐름 → **timeline**.
- **아이콘은 `src/components/Icons.tsx`의 `Icon`(라인 SVG 22종)만 사용.** 이모지·외부 아이콘폰트 금지(디자인 언어 통일). 부족한 개념 아이콘은 Icons.tsx에 같은 스타일(viewBox 24, stroke 1.7, accent color)로 추가한다.
- **이미지(sceneImage)로 더 와닿는 장면**: 음식·식품·신체 등 "실물이 보여야 설득되는" 개념은 PNG 이미지가 아이콘보다 강하다. 이땐 imageText/imageShowcase로 가고, 이미지는 (a) gpt-image-2.5-sunburst로 개념 일러스트 생성, 또는 (b) 웹검색으로 적합한 png 확보 → `public/scene-*.png`. 단 Type A는 캐릭터가 이미 오버레이되므로, 이미지 주인공 장면은 캐릭터 없이(또는 imageText 중앙배치로) 구성해 복잡해지지 않게 한다.
- **장면 설계 산출 시 타입 분포를 스스로 집계**해 text 비율을 점검하고, 30%를 넘으면 초과분을 비주얼 타입으로 재배치한 뒤 script.ts를 확정한다. (글자수·합계 검증과 동급의 필수 절차)

## 장면 타입 (SceneType)
- `text`: 메인(82px 흰색) + subtitle(56px accent) + description(32px 회색). 테두리/카드 없음.
- `barChart`: `barData: {label,value,color}[]`. 바가 아래서 올라오는 spring. **값 뒤에 `%` 강제 표기** → 퍼센트 데이터 전용.
- `beforeAfterChart`: **개수·수치 전/후 비교 전용.** `beforeAfterData: {label,before,after}[]` + `unit`(예: "회"). 항목별로 before(회색)/after(accent) 두 막대를 그룹으로 묶고, 막대 위 실제 값(unit 포함), 그룹 상단에 증가배수(▲2.6배, 2배 미만이면 +%) 자동 표기. `%` 안 붙음.
- `donutChart`: `donutData: {label,value,color}[]`. 세그먼트 순차 그리기.
- `lineGraph`: `lineData: {label,value}[]`. 선이 좌→우.
- `highlight`: 강조 메시지 + bulletValues 있으면 원형 프로그레스, 없으면 **카드 세로 1열 스택**(가로 wrap 금지). 카드=accent 옅은 채움 + 왼쪽 accent 바 + accent로 채운 번호 배지.
- `compare`: 좌우 비교. 타이틀=**accent 옅은 채움 박스(테두리 아웃라인 금지)**, 설명=테두리 없는 순수 텍스트(화살표 연결).
- `timeline`: 시간순 단계, 연결선과 함께 순차 등장.
- `imageStat`: 이미지 + 큰 수치 1개 강조. `text`(accent 소형 캡션/eyebrow) → `statValue`(**흰색 대형 수치, 히어로**) → 짧은 accent 구분선 → `statLabel`(하단 설명). 세 요소를 하나의 덩어리로 묶어 배치. 이미지=`sceneImage` 우선, 없으면 `characterImage` fallback. 중앙 정렬. **`statValue`는 짧은 수치 전용**(16살/+3년/60~70% 등) — 긴 문장 넣으면 220px에서 깨짐, 문장은 `text` 타입으로.
- `imageText`: 이미지 + 짧은 텍스트(title/subtitle/description)를 화면 중앙에 나란히(가로형)/위아래(세로형). 이미지=`sceneImage`→`characterImage` fallback.
- `imageShowcase`: 이미지가 주인공. 이미지+캡션(text/subtitle)을 화면 정중앙 세로 스택. `sceneImage` 사용.
- `iconGrid`: **수치 없는 개념 2~5개를 아이콘 카드 그리드로.** `iconItems: {icon,label,desc?}[]` + 타이틀 `text` + 선택 `description`. 각 카드 = 원형 accent 배경 안의 라인 SVG 아이콘 + 라벨(+부연). 캐릭터 있으면 2열, 없으면 최대 3열(3개 이하+캐릭터X면 big 모드로 큼직). `icon` 값은 Icons.tsx의 IconName(scale/note/plate/run/dumbbell/clock/heart/meat/leaf/flame/brain/sleep/up/down/warning/check/target/calendar/shaker/drop/muscle/bulb). **글자만 나열하던 장면을 대체하는 1순위 타입.**

### 이미지 씬 필드 (sceneImage 계열)
- `sceneImage`: 장면 특화 그래픽 이미지 파일명(캐릭터와 별개). `public/scene-*.png`.
- `statValue`/`statLabel`: imageStat 전용. 큰 수치 + 하단 라벨.
- **이미지 3종(imageShowcase/imageText/imageStat)은 배경 글로우(radial-gradient) 쓰지 않음** — 초록/컬러 덩어리로 보이는 문제. 순수 중앙 정렬 + drop-shadow만.
- imageText/imageStat은 `sceneImage` 없으면 `characterImage`를 이미지 자리에 자동 사용(fallback).

## 디자인 원칙
### 배경
- **순수 검정(#000000) 단색**. 별/우주/그라데이션 금지(StarfieldBackground 미사용). 각 Scene 배경은 `transparent`(부모 #000000).

### 레이아웃
- 모든 요소 가운데 정렬. 16:9(1920×1080).
- **캐릭터 있는 장면**: 콘텐츠는 왼쪽 77%(`right: 23%`), 캐릭터는 오른쪽 `right: 5%`, `height: 95%`. `right:12%`는 텍스트에 너무 가까워 금지(콘텐츠-캐릭터 최소 5% 간격).
- **캐릭터 없는 장면**: 중앙 정렬(텍스트 화면 전체 사용).
- **겹침 방지 필수**: 콘텐츠(`right:23%` 영역 내) ↔ 캐릭터 절대 겹치지 않음. 콘텐츠 컨테이너에 `maxWidth:100%`, `overflow:hidden`.

### 카드 디자인 (통일 필수)
- **빈 테두리 박스 금지.** 카드는 항상 **accent 옅은 채움**(`${accent}1f`~`${accent}26`, 알파 12~15%) + 필요 시 **왼쪽 accent 바**(width 8px). 테두리 아웃라인(`border: 2px solid`)만 있고 안이 투명한 형태는 허전하고 촌스러움 → 금지.
- **항목이 여러 개면 세로 1열 스택**(`flexDirection: column`, `width: 100%`). 가로 `flexWrap: wrap` 금지 — "가로 4개인데 폭 때문에 3개 뜨고 1개 다음 줄로 넘어가는" 어색한 배치 방지. 카드 폭은 컨테이너에 맞춰 통일(좌우 정렬선 일치).
- 번호 배지: 떠 있는 테두리 동그라미 대신 **accent로 꽉 채운 원 + 흰 숫자**.
- compare 좌우 타이틀 박스도 채움 방식(테두리 아웃라인 금지). compare 설명 텍스트는 여전히 박스/테두리 없음.

### 장면 전환
- **TransitionOverlay(페이드) 사용 안 함** — 롱폼/숏폼 모두 즉시 전환.

### 폰트 (SCDream, 에스코어 드림)
- 파일: `public/fonts/SCDream5.otf`(Medium), `SCDream7.otf`(ExtraBold). Root.tsx에서 `@font-face` + `staticFile()` 등록.
- 굵은 텍스트(메인 타이틀/subtitle): `fontWeight:700`. 일반(description/범례/카드설명): `fontWeight:500`.
- 크기: 메인 타이틀(text) 96px / **메인 타이틀(chart·highlight·compare·progressCards·timeline) 72px 통일** / subtitle 64px / description 34px / 카드 라벨 44~54px / 카드 부연 26~34px / 차트 범례·라벨 36~38px.
- **★ 색 통일: 모든 서브텍스트·description·카드 부연·차트 설명은 회색 `#8a8f98` 하나로 통일**(예전 #888/#999/#ccc/#cccccc 혼용 금지). TextScene subtitle만 accent 유지(의도적 강조).

### description 줄바꿈
- 2가지 이상 정보는 반드시 `\n`으로 분리. `|`나 `,`로 이어붙이지 않음. 모든 description에 `whiteSpace:"pre-line"`.
- ❌ "100% 유청 가성비 최강 | 추가 7%" → ✅ "100% 유청 가성비 최강\n트렌드 제품 담기 시 추가 7% 할인"

### 모션 (필수)
- **모든 장면에 움직임** — 정적 금지. 점진적 확대/축소 기본(scale 1.0↔1.05, 미세·느리게).
- 텍스트 spring 등장(damping 14, stiffness 90), subtitle 딜레이 후 슬라이드 업, 요소별 순차 등장.
- **장면 최소 길이 5초** (3초 이하 금지).

### 인포그래픽/풍성도
- 가능한 한 시각 요소 추가, 차트 가능 장면엔 반드시 사용. 단순 텍스트 나열보다 구조화 우선.
- text: 메인+subtitle+description(3단). highlight: 메인+description+bulletDescriptions. compare: 메인+description+좌우 설명.
- 원칙: "왜/뭘/어떻게"가 화면에 함께.

### 텍스트 장면 워딩
- **대본(나레이션)을 그대로 화면에 넣지 않음.** 구어체 → 프레젠테이션 스타일. 핵심 키워드만 짧고 임팩트. 종결은 명사형/체언.

### 사용 금지
- 별/우주/그라데이션 배경, 상단 뱃지/태그, 반복 아이콘, 장식용 소형 텍스트, 근거 없는 수치, 정적 장면, compare 설명 영역 테두리/박스/배경.
- **빈 테두리 카드(테두리만 있고 안 투명), 카드 가로 wrap 배치, 배경 radial-gradient 글로우** — 전부 금지.

## 최소 폰트 사이즈 (절대 기준)
| 요소 | 최소 | 권장 |
|------|:---:|:---:|
| 장면 메인 텍스트 | 50px | 54~82px |
| 차트 축 라벨 | 26px | 28~32px |
| 차트 값 숫자 | 28px | 30~40px |
| 키워드 리스트 항목 | 38px | 42px |

**어떤 텍스트도 26px 미만 금지.**

## 색상 팔레트
| 용도 | 색상 |
|------|------|
| 긍정/성장 | #00b894, #55efc4, #00cec9 |
| 경고/감소 | #e17055, #d63031, #ff7675 |
| 강조/하이라이트 | #ffd93d, #fdcb6e, #f39c12 |
| 정보/안내 | #6c5ce7, #a29bfe, #74b9ff |
| 브랜드/신뢰 | #4A90D9, #5BA0E0, #3D7FC2 |

## 숏폼 레이아웃 자동 최적화
- `const isVertical = width < 1200;` (useVideoConfig의 width)로 감지.
- BarChart: 숏폼 시 차트 너비 700px로 축소(좌우 여백). Highlight: 롱폼·숏폼 모두 카드 세로 1열 스택(가로 wrap 없음).
- 롱폼(1920px)은 기존 레이아웃 유지, 숏폼(1080px)에서만 적용.

## Remotion 시퀀스 채번
- 모든 Sequence에 `name` prop으로 장면 번호+타입 표시: `<Sequence name={\`Scene ${index + 1} - ${scene.type}\`} ...>`. Studio 타임라인 식별용.

## ★ 장면 데이터 편집 gotchas (반복 실수 방지)
- script.ts 장면 블록마다 `// N. 설명` 주석 번호 유지 → durationInSeconds 교체 시 앵커로 안전 수정. **장면 추가 시 이후 주석 번호도 함께 갱신.**
- 장면 추가/삭제 시 캐릭터 순환 배정(char-01~10)이 밀리므로 characterImage 재확인.
- durationInSeconds 반영 후 **반드시 합계를 오디오 길이와 비교 검증** (상세: `audio-timing.md`).
