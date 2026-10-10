export type SceneType =
  | "text"
  | "barChart"
  | "donutChart"
  | "lineGraph"
  | "highlight"
  | "compare"
  | "timeline"
  | "iconList"
  | "splitFact"
  | "radarChart"
  | "progressCards"
  | "muscleMap"
  | "imageShowcase"
  | "imageText"
  | "imageStat"
  | "beforeAfterChart"
  | "iconGrid"
  | "conceptArt";

export type BarData = { label: string; value: number; color: string };
export type BeforeAfterData = {
  label: string;
  before: number;
  after: number;
};
export type DonutData = { label: string; value: number; color: string };
export type LineData = { label: string; value: number };
export type CompareData = {
  left: { title: string; description: string };
  right: { title: string; description: string };
};
export type StepData = { label: string; description?: string };
export type RadarData = { axis: string; value: number };
export type ProgressCardData = {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  description?: string;
};
export type MuscleData = {
  name: string;
  activation: number;
  color: string;
};
export type IconItem = {
  icon: string;
  label: string;
  desc?: string;
};

// conceptArt — 핵심 개념/로직을 큰 그림(커스텀 SVG 일러스트 or 이모지)으로 표현.
//  · 플로우 노드: 인과/로직을 아이콘+라벨 노드로 두고 화살표(→)로 연결.
//    glyph 우선순위: art(사전정의 커스텀 SVG) > emoji(큰 이모지) > icon(Icons.tsx 라인아이콘).
export type ConceptNode = {
  art?: string;    // ConceptArt.tsx에 사전 정의한 커스텀 일러스트 키 (예: "grip", "spine")
  emoji?: string;  // 큰 이모지 (예: "💪", "🏋️")
  icon?: string;   // Icons.tsx IconName fallback
  label: string;
  sub?: string;    // 노드 하단 짧은 보조어 (선택)
  color?: string;  // 노드 개별 색 (미지정 시 accent)
};

export type Scene = {
  type: SceneType;
  title?: string;
  text: string;
  subtitle?: string;
  description?: string;
  durationInSeconds: number;
  accent?: string;
  characterImage?: string;
  sceneImage?: string;
  statValue?: string;
  statLabel?: string;
  barData?: BarData[];
  beforeAfterData?: BeforeAfterData[];
  unit?: string;
  donutData?: DonutData[];
  lineData?: LineData[];
  bullets?: string[];
  bulletDescriptions?: string[];
  bulletValues?: number[];
  compareData?: CompareData;
  steps?: StepData[];
  radarData?: RadarData[];
  progressCards?: ProgressCardData[];
  muscleData?: MuscleData[];
  iconItems?: IconItem[];
  // conceptArt 전용
  conceptArt?: string;        // 단일 히어로 커스텀 SVG 키 (ConceptArt.tsx)
  conceptEmoji?: string;      // 단일 히어로 큰 이모지
  conceptNodes?: ConceptNode[]; // 플로우 다이어그램 노드들 (화살표로 연결)
  conceptLayout?: "flow" | "hero"; // flow=노드 연결, hero=단일 상징(기본 자동 판별)
};

// 파머스 캐리 들고 걷기의 힘 — 오디오 261010 jamak.mp3 = 257.23초
// 37장면, 전사 타임스탬프(261010_transcript.json) 기반. 캐릭터 char-01~10 순환.
// 자막·효과음은 Vrew로 사용자가 직접 처리 → Remotion은 화면(차트·캐릭터·인포그래픽) 투명 .mov만 렌더.
export const SCENES: Scene[] = [
  // 1. 훅: 세계 최강 스트롱맨 톰 해빌랜드 "들고 걷는 게 진짜" (seg1-2, 0.00~9.78)
  {
    type: "text",
    text: "이 하나로 최강이 된다",
    subtitle: "제자리 쇠질보다 들고 걷기",
    description: "세계 최강 스트롱맨 톰 해빌랜드",
    durationInSeconds: 9.78,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 2. 조 로건, 32kg 케틀벨로 100m 언덕 (seg3, 9.78~16.68)
  {
    type: "imageStat",
    text: "조 로건이 직접 해본 실험",
    statValue: "100m 언덕",
    statLabel: "32kg 케틀벨을 양손에 들고\n반신반의하며 오르내리기 시작",
    durationInSeconds: 6.9,
    accent: "#6c5ce7",
    characterImage: "char-02.png",
  },
  // 3. 세 달 후 효과: 악력↑ 다리 굵어짐 등 편해짐 수행능력↑ (seg4-5, 16.68~25.06)
  {
    type: "iconGrid",
    text: "세 달 후, 몸이 달라졌다",
    description: "들고 걷기만 했을 뿐인데",
    iconItems: [
      { icon: "muscle", label: "악력 폭발", desc: "손아귀 힘 급상승" },
      { icon: "dumbbell", label: "다리 굵어짐", desc: "하체 볼륨 증가" },
      { icon: "check", label: "등 편해짐", desc: "뻐근함 해소" },
      { icon: "up", label: "수행능력↑", desc: "다른 운동도 상승" },
    ],
    durationInSeconds: 8.38,
    accent: "#00b894",
    characterImage: "char-03.png",
  },
  // 4. 어쩌면 몸의 모든 걸 바꿀 운동 (seg6, 25.06~29.18)
  {
    type: "text",
    text: "내 몸의 모든 걸 바꿀 운동",
    subtitle: "그가 내린 결론",
    durationInSeconds: 4.12,
    accent: "#ffd93d",
    characterImage: "char-04.png",
  },
  // 5. 파머스 캐리 유래 — 농부·시장 봉다리 유머 (seg7-9, 29.18~40.66)
  {
    type: "text",
    text: "파머스 캐리",
    subtitle: "곡물 포대를 양손에 들고 나르던 농부",
    description: "시장에서 까만 봉다리 한가득 들고 걷는\n그 모습이 바로 완벽한 파머스 캐리\n생활의 고수들은 이미 다 하고 계셨다",
    durationInSeconds: 11.48,
    accent: "#fdcb6e",
    characterImage: "char-05.png",
  },
  // 6. 예고: 왜 바뀌는지, 어떻게 하는지 (seg10, 40.66~45.62)
  {
    type: "compare",
    text: "쉽고 빠르게 뜯어본다",
    compareData: {
      left: { title: "왜 몸이 바뀌는가", description: "다섯 가지 핵심 효과" },
      right: { title: "어떻게 하는가", description: "제대로 하는 법과 루틴" },
    },
    durationInSeconds: 4.96,
    accent: "#74b9ff",
    characterImage: "char-06.png",
  },
  // 7. ①악력 — 전완 근육 총동원 (seg11-12, 45.62~53.10)
  {
    type: "iconGrid",
    text: "첫 번째 · 악력의 폭발적 상승",
    description: "무거운 걸 들고 걸으면 총동원되는 근육",
    iconItems: [
      { icon: "muscle", label: "심지굴근", desc: "손가락 깊은 굽힘근" },
      { icon: "muscle", label: "천지굴근", desc: "손가락 얕은 굽힘근" },
      { icon: "dumbbell", label: "손목·손가락 안정근", desc: "쥐는 힘 유지" },
    ],
    durationInSeconds: 7.48,
    accent: "#e17055",
    characterImage: "char-07.png",
  },
  // 8. 악력이 왜 중요한가 — 수행능력을 끌어올림 (seg13-14, 53.10~60.26)
  {
    type: "text",
    text: "악력이 왜 중요한가",
    subtitle: "다른 운동 수행 능력을 그대로 끌어올린다",
    description: "악력과 주요 운동 최대 중량을 비교한 연구",
    durationInSeconds: 7.16,
    accent: "#e17055",
    characterImage: "char-08.png",
  },
  // 9. 악력-1RM 상관계수: 벤치 0.73 / 데드 0.69 (seg15, 60.26~66.44)
  {
    type: "barChart",
    text: "악력과 1RM의 상관계수",
    barData: [
      { label: "벤치프레스 1RM", value: 73, color: "#e17055" },
      { label: "데드리프트 1RM", value: 69, color: "#fdcb6e" },
    ],
    description: "1에 가까울수록 강한 상관 · 아주 강하게 연결",
    durationInSeconds: 6.18,
    accent: "#e17055",
    characterImage: "char-09.png",
  },
  // 10. 쉽게 말해: 손아귀 힘↑ → 미는 힘·당기는 힘 같이↑ (seg16-17, 66.44~74.18)
  {
    type: "splitFact",
    text: "쉽게 말하면",
    compareData: {
      left: { title: "손아귀 힘이 세진다", description: "악력 상승" },
      right: { title: "미는 힘·당기는 힘이 같이 오른다", description: "전반적 중량 상승" },
    },
    durationInSeconds: 7.74,
    accent: "#00b894",
    characterImage: "char-10.png",
  },
  // 11. 바벨 미끄러지면 등 강해도 소용없다 → 악력은 병목 (seg18-19, 74.18~79.78)
  {
    type: "splitFact",
    text: "악력은 모든 중량 운동의 병목",
    compareData: {
      left: { title: "손에서 바벨이 미끄러진다", description: "아무리 등이 강해도" },
      right: { title: "데드리프트 중량이 안 는다", description: "악력이 발목을 잡는다" },
    },
    durationInSeconds: 5.6,
    accent: "#e17055",
    characterImage: "char-01.png",
  },
  // 12. ②자세 교정 — 어깨 처질 것 같은데, 의외 (seg20-21, 79.78~83.74)
  {
    type: "text",
    text: "두 번째 · 자세 교정",
    subtitle: "어깨가 처질 것 같은데, 의외죠?",
    durationInSeconds: 3.96,
    accent: "#74b9ff",
    characterImage: "char-02.png",
  },
  // 13. 폰 보고 웅크리면 어깨 말리고 거북목 (seg22, 83.74~87.96)
  {
    type: "splitFact",
    text: "하루 종일 웅크린 몸",
    compareData: {
      left: { title: "어깨가 앞으로 말린다", description: "라운드 숄더" },
      right: { title: "목은 거북목이 된다", description: "폰·책상 자세의 결과" },
    },
    durationInSeconds: 4.22,
    accent: "#e17055",
    characterImage: "char-03.png",
  },
  // 14. 견갑골 뒤·아래로, 가슴 펴야 버틴다 (seg23-24, 87.96~95.90)
  {
    type: "iconGrid",
    text: "버티려면 자세가 잡힌다",
    description: "무거운 걸 들려면 강제로 만들어지는 자세",
    iconItems: [
      { icon: "down", label: "견갑골 뒤·아래로", desc: "꾹 눌러넣기" },
      { icon: "up", label: "가슴을 편다", desc: "흉추 신전" },
      { icon: "check", label: "안 그러면 못 버틴다", desc: "자세가 저절로 교정" },
    ],
    durationInSeconds: 7.94,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 15. 걷는 내내 등 윗부분 근육 — 승모근 중하부·능형근·회전근개 (seg25, 95.90~100.84)
  {
    type: "iconGrid",
    text: "걷는 내내 쓰는 등 근육",
    iconItems: [
      { icon: "muscle", label: "승모근 중하부", desc: "날개뼈를 아래로" },
      { icon: "muscle", label: "능형근", desc: "날개뼈 모음" },
      { icon: "muscle", label: "회전근개", desc: "어깨 안정화" },
    ],
    durationInSeconds: 4.94,
    accent: "#4A90D9",
    characterImage: "char-05.png",
  },
  // 16. 근력운동으로 위장한 공짜 물리치료 (seg26-27, 100.84~105.52)
  {
    type: "text",
    text: "근력운동으로 위장한 공짜 물리치료",
    subtitle: "몇 주만 해도 날개뼈 사이 결림이 사라진다",
    durationInSeconds: 4.68,
    accent: "#00cec9",
    characterImage: "char-06.png",
  },
  // 17. ③코어 — 윗몸일으키기 vs 파머스 캐리 (seg28-30, 105.52~116.78)
  {
    type: "compare",
    text: "세 번째 · 코어",
    compareData: {
      left: { title: "윗몸일으키기", description: "몸을 접었다 펴는 운동" },
      right: { title: "파머스 캐리", description: "쏠리고 비틀리려는 걸 버티는 운동" },
    },
    durationInSeconds: 11.26,
    accent: "#6c5ce7",
    characterImage: "char-07.png",
  },
  // 18. 항측굴·항회전 — 복횡근·내복사근이 코르셋처럼 (seg31, 116.78~123.48)
  {
    type: "timeline",
    text: "척추를 코르셋처럼 잡는다",
    steps: [
      { label: "항측굴", description: "옆으로 꺾이는 걸 버틴다" },
      { label: "항회전", description: "비틀리는 걸 버틴다" },
      { label: "복횡근·내복사근", description: "배 가장 깊은 곳에서 척추 고정" },
    ],
    durationInSeconds: 6.7,
    accent: "#6c5ce7",
    characterImage: "char-08.png",
  },
  // 19. 척추 권위자 스튜어트 맥길 박사 (seg32-33, 123.48~133.28)
  {
    type: "text",
    text: "척추 연구 권위자 스튜어트 맥길",
    subtitle: "캐리 동작은 코어 전체를 유기적으로 작동",
    description: "척추를 지키기 위해 몸통 전체가 함께 일한다\n허리 통증에 시달리는 분들에게 특히 좋은 이유",
    durationInSeconds: 9.8,
    accent: "#6c5ce7",
    characterImage: "char-09.png",
  },
  // 20. ④전신 근성장 — 핵심 근육 거의 다 (seg34-36, 133.28~143.28)
  {
    type: "iconGrid",
    text: "네 번째 · 전신 근성장",
    description: "이 동작 하나에 들어가는 핵심 근육",
    iconItems: [
      { icon: "dumbbell", label: "전완·승모근", desc: "쥐고 지탱" },
      { icon: "muscle", label: "광배근·둔근", desc: "상·하체 대근육" },
      { icon: "run", label: "다리", desc: "걷는 추진력" },
      { icon: "target", label: "코어", desc: "중심을 잡는 축" },
    ],
    durationInSeconds: 10.0,
    accent: "#00b894",
    characterImage: "char-10.png",
  },
  // 21. 걷는데 심박↑ 근육 긴장 → 근력+유산소 동시 (seg37, 143.28~149.48)
  {
    type: "compare",
    text: "근력과 유산소를 동시에",
    compareData: {
      left: { title: "심박수가 치솟는다", description: "무게가 있으니 유산소 효과" },
      right: { title: "근육은 계속 긴장", description: "들고 있으니 근력 자극" },
    },
    durationInSeconds: 6.2,
    accent: "#00cec9",
    characterImage: "char-01.png",
  },
  // 22. 2016 연구 — 러닝·인클라인 걷기와 비슷한 칼로리 (seg38, 149.48~154.54)
  {
    type: "imageStat",
    text: "2016년 연구 결과",
    statValue: "러닝급 칼로리",
    statLabel: "일반 러닝·인클라인 걷기와\n비슷한 칼로리 소모를 보였다",
    durationInSeconds: 5.06,
    accent: "#e17055",
    characterImage: "char-02.png",
  },
  // 23. 강도 조절 자유 — 무겁게/가볍게 멀리/한 손 (seg39-40, 154.54~162.76)
  {
    type: "iconGrid",
    text: "드는 방식으로 목적이 달라진다",
    iconItems: [
      { icon: "dumbbell", label: "무겁게 들면", desc: "근력 중심" },
      { icon: "run", label: "가볍게 멀리", desc: "체력·지구력" },
      { icon: "target", label: "한 손으로", desc: "복사근 집중" },
    ],
    durationInSeconds: 8.22,
    accent: "#fdcb6e",
    characterImage: "char-03.png",
  },
  // 24. ⑤균형·멘탈 — 고유수용감각 (seg41-44, 162.76~174.90)
  {
    type: "iconGrid",
    text: "다섯 번째 · 균형과 고유수용감각",
    description: "매 걸음 신호를 주고받으며 균형을 잡는다",
    iconItems: [
      { icon: "target", label: "발목", desc: "지면 접지 안정" },
      { icon: "target", label: "무릎", desc: "충격 흡수" },
      { icon: "target", label: "고관절", desc: "체중 분배" },
      { icon: "check", label: "헛디딤·낙상 감소", desc: "일상 실수가 준다" },
    ],
    durationInSeconds: 12.14,
    accent: "#a29bfe",
    characterImage: "char-04.png",
  },
  // 25. 허리·무릎·발목 관절 안정화 → 나이 들어도 건강 (seg45, 174.90~179.80)
  {
    type: "highlight",
    text: "자연스럽게 안정화되는 관절",
    description: "나이가 들어도 훨씬 건강하게",
    bullets: ["허리", "무릎", "발목"],
    bulletDescriptions: ["코어가 받쳐준다", "주변근 강화", "흔들림 감소"],
    durationInSeconds: 4.9,
    accent: "#00b894",
    characterImage: "char-05.png",
  },
  // 26. 멘탈 — 힘들 때 한 걸음 더 → 인내심 (seg46-48, 179.80~188.02)
  {
    type: "splitFact",
    text: "멘탈까지 단련된다",
    compareData: {
      left: { title: "너무 힘든 그 순간", description: "포기하고 싶은 지점" },
      right: { title: "한 걸음 더 간다", description: "버티는 습관과 인내심\n운동 밖 삶으로도 번진다" },
    },
    durationInSeconds: 8.22,
    accent: "#6c5ce7",
    characterImage: "char-06.png",
  },
  // 27. 제대로 하는 법 — 자세 틀어지면 효과 반·부상 (seg49-50, 188.02~192.64)
  {
    type: "text",
    text: "이제 제대로 하는 법",
    subtitle: "자세가 틀어지면 효과도 반, 다치기 쉽다",
    durationInSeconds: 4.62,
    accent: "#ffd93d",
    characterImage: "char-07.png",
  },
  // 28. ①어깨 — 견갑골 뒤·아래 고정, 가슴 펴고 당당하게 (seg51-52, 192.64~198.36)
  {
    type: "iconGrid",
    text: "하나 · 어깨를 말지 마라",
    iconItems: [
      { icon: "down", label: "견갑골 뒤·아래 고정", desc: "말리지 않게" },
      { icon: "up", label: "가슴을 살짝 편다", desc: "흉추 신전" },
      { icon: "check", label: "당당하게 걷는다", desc: "자세 유지가 핵심" },
    ],
    durationInSeconds: 5.72,
    accent: "#4A90D9",
    characterImage: "char-08.png",
  },
  // 29. ②속도 — 처음엔 통제된 걸음, 익숙해지면 올림 (seg53-54, 198.36~203.72)
  {
    type: "timeline",
    text: "둘 · 처음엔 빨리 걷지 마라",
    steps: [
      { label: "통제된 걸음", description: "한 걸음 한 걸음 또박또박" },
      { label: "익숙해지면", description: "속도를 올려도 된다" },
    ],
    durationInSeconds: 5.36,
    accent: "#74b9ff",
    characterImage: "char-09.png",
  },
  // 30. ③코어 — 복압 유지, 복식호흡 (seg55-56, 203.72~210.44)
  {
    type: "text",
    text: "셋 · 코어를 풀지 마라",
    subtitle: "배에 한 대 맞기 직전이라 생각하고 복압 유지",
    description: "복식호흡을 쓰면 자연스럽게 된다",
    durationInSeconds: 6.72,
    accent: "#6c5ce7",
    characterImage: "char-10.png",
  },
  // 31. 루틴 — 초보 45초×3~4세트 / 익숙 1분×4~5세트 (seg57-58, 210.44~219.86)
  {
    type: "compare",
    text: "루틴은 이렇게",
    compareData: {
      left: { title: "초보", description: "중간 무게 45초 × 3~4세트\n세트 사이 60초 휴식" },
      right: { title: "익숙해지면", description: "1분 × 4~5세트\n무게↑ 휴식 45초로↓" },
    },
    durationInSeconds: 9.42,
    accent: "#00b894",
    characterImage: "char-01.png",
  },
  // 32. 인터벌 — 30초 걷고 30초 쉬고 5~6세트 (seg59, 219.86~223.66)
  {
    type: "timeline",
    text: "인터벌 방식도 좋다",
    steps: [
      { label: "30초 걷기", description: "무게를 들고 이동" },
      { label: "30초 휴식", description: "호흡 정리" },
      { label: "5~6세트 반복", description: "짧고 굵게" },
    ],
    durationInSeconds: 3.8,
    accent: "#fdcb6e",
    characterImage: "char-02.png",
  },
  // 33. 변형 3종 — 수트케이스·베어허그·랙 포지션 (seg60, 223.66~228.74)
  {
    type: "iconGrid",
    text: "변형 3종",
    iconItems: [
      { icon: "dumbbell", label: "수트케이스 캐리", desc: "한 손으로 들기" },
      { icon: "heart", label: "베어허그", desc: "가슴에 안고" },
      { icon: "muscle", label: "랙 포지션", desc: "어깨에 올리고" },
    ],
    durationInSeconds: 5.08,
    accent: "#a29bfe",
    characterImage: "char-03.png",
  },
  // 34. 집에서 — 물통·장바구니·배낭, 주 2~3회 마무리 10분 (seg61-62, 228.74~233.04)
  {
    type: "highlight",
    text: "헬스장 없이 집에서 당장",
    description: "주 2~3회 · 다른 운동 마무리에 10분이면 충분",
    bullets: ["물통 두 개", "장바구니", "무거운 배낭"],
    bulletDescriptions: ["손잡이로 쥐기 좋다", "무게 조절 자유", "안아서 캐리"],
    durationInSeconds: 8.9,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 35. 요약 — 악력·자세·코어·전신·심폐·균형·멘탈 (seg63-64, 233.04~237.64)
  {
    type: "iconGrid",
    text: "운동 하나로 이만큼",
    description: "이렇게 다 가져가는 동작은 흔치 않다",
    iconItems: [
      { icon: "muscle", label: "악력·전신 근육", desc: "쥐는 힘부터 대근육까지" },
      { icon: "up", label: "자세·코어", desc: "교정과 안정" },
      { icon: "heart", label: "심폐·균형", desc: "유산소와 밸런스" },
      { icon: "brain", label: "멘탈", desc: "버티는 인내심" },
    ],
    durationInSeconds: 8.4,
    accent: "#ffd93d",
    characterImage: "char-05.png",
  },
  // 36. 오늘 당장 — 무거운 거 두 개 들고 집 안 걷기 (seg65, 237.64~246.04)
  {
    type: "text",
    text: "오늘 당장 두 개 들고 걸어라",
    subtitle: "무거운 거 아무거나, 집 안을",
    description: "그 단순한 게 몸을 바꿉니다",
    durationInSeconds: 3.04,
    accent: "#ffd93d",
    characterImage: "char-06.png",
  },
  // 37. 아웃트로 — 구독·좋아요·알림, 득근하는 하루 (seg66-67, 246.04~257.23)
  {
    type: "text",
    text: "득근하는 하루 되세요",
    subtitle: "구독 · 좋아요 · 알림 · 하이프",
    description: "헬마드 구독자 여러분, 오늘도 득근!",
    durationInSeconds: 8.15,
    accent: "#00b894",
    characterImage: "char-07.png",
  },
];
