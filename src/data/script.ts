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
  | "beforeAfterChart";

export type BarData = { label: string; value: number; color: string };
// 전후 비교(개수/수치 기반): 항목별 before → after 그룹 막대
export type BeforeAfterData = {
  label: string; // 운동명 (예: 푸시업)
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

export type Scene = {
  type: SceneType;
  title?: string;
  text: string;
  subtitle?: string;
  description?: string;
  durationInSeconds: number;
  accent?: string;
  characterImage?: string;
  // 장면 특화 그래픽 이미지 (캐릭터와 별개, 크게 배치)
  sceneImage?: string;
  // imageStat 타입용: 이미지 위/옆에 얹는 큰 수치
  statValue?: string;
  statLabel?: string;
  barData?: BarData[];
  // 전후 비교 그룹 막대 (개수/수치). unit으로 단위 표기(예: "회")
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
};

export const SCENES: Scene[] = [
  // 1. 인사 (0.0~2.3)
  {
    type: "text",
    text: "헬스 건강 정보\n헬마드",
    subtitle: "직장인·학생 최적 분할",
    durationInSeconds: 2.3,
    accent: "#4A90D9",
    characterImage: "char-01.png",
  },
  // 2. 공감: 파김치 직장인 (2.3~9.8)
  {
    type: "text",
    text: "3분할? 4분할?\n부위별로 쪼개라니",
    subtitle: "일하고 공부하고 파김치인데",
    durationInSeconds: 7.5,
    accent: "#e17055",
    characterImage: "char-02.png",
  },
  // 3. 주 5,6일 못 나감 (9.8~18.8)
  {
    type: "imageStat",
    text: "그거 다 하려면\n직장인·학생이 지킬 수 있을까",
    statValue: "주 5~6일",
    durationInSeconds: 9.0,
    accent: "#e17055",
    characterImage: "char-03.png",
  },
  // 4. 놓친 근육 (18.8~21.1)
  {
    type: "text",
    text: "버린 회원권,\n놓친 근육",
    durationInSeconds: 2.3,
    accent: "#8a8f98",
    characterImage: "char-02.png",
  },
  // 5. 훅: 상식을 뒤집는 연구 (21.1~32.5)
  {
    type: "text",
    text: "유명 연구 하나가\n분할 상식을 뒤집는다",
    subtitle: "왜 잘게 쪼갤수록 손해일까",
    durationInSeconds: 11.4,
    accent: "#ffd93d",
    characterImage: "char-04.png",
  },
  // 6. 착각 vs 진실 (32.5~39.6)
  {
    type: "compare",
    text: "흔한 착각",
    durationInSeconds: 7.1,
    accent: "#6c5ce7",
    compareData: {
      left: { title: "잘게 쪼갤수록\n전문적이다?", description: "대부분의 생각" },
      right: { title: "사실은\n정반대", description: "연구가 말하는 것" },
    },
  },
  // 7. 진짜 중요한 건 빈도 (39.6~46.8)
  {
    type: "highlight",
    text: "근성장의 진짜 열쇠",
    description: "무게도 종목 수도 분할 개수도 아니다",
    bullets: ["한 부위를 주에 몇 번 자극하나 = 빈도"],
    durationInSeconds: 7.2,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 8. 핵심 원칙 주 2회 (46.8~53.3)
  {
    type: "imageStat",
    text: "오늘의 핵심 하나",
    statValue: "주 2회",
    statLabel: "한 부위는 일주일에 최소 두 번",
    durationInSeconds: 6.5,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 9. 반론 훅: 그럼 프로는? (53.3~62.7)
  {
    type: "text",
    text: "그럼 올림피아 선수들은?",
    subtitle: "4·5분할로 최정상 찍었잖아",
    durationInSeconds: 9.4,
    accent: "#fdcb6e",
    characterImage: "char-05.png",
  },
  // 10. 차이① 약물 (62.7~77.9)
  {
    type: "compare",
    text: "우리와 다른 점 ①",
    durationInSeconds: 15.2,
    accent: "#d63031",
    compareData: {
      left: { title: "약물의 도움", description: "회복 속도를\n비정상적으로 끌어올림" },
      right: { title: "주 1회로도\n일반인 2회 이상", description: "게임의 규칙이 다름" },
    },
  },
  // 11. 차이② 하루 2회 (77.9~88.4)
  {
    type: "compare",
    text: "우리와 다른 점 ②",
    durationInSeconds: 10.5,
    accent: "#d63031",
    compareData: {
      left: { title: "하루 두 번 훈련", description: "오전 가슴\n오후 어깨" },
      right: { title: "주요 부위\n주 2회 유지", description: "훈련이 곧 직업" },
    },
  },
  // 12. 경고: 베끼면 근손실 (88.4~99.3)
  {
    type: "text",
    text: "그대로 베끼면\n근손실만 난다",
    subtitle: "회복 안 되는 프로 루틴",
    durationInSeconds: 10.9,
    accent: "#d63031",
    characterImage: "char-06.png",
  },
  // 13. 답은 2·3분할 (99.3~104.6)
  {
    type: "text",
    text: "우리 답은\n2분할과 3분할",
    subtitle: "주 2회를 억지 없이 맞춘다",
    durationInSeconds: 5.3,
    accent: "#4A90D9",
    characterImage: "char-10.png",
  },
  // 14. 2분할 = 밀기/당기기 (104.6~114.2)
  {
    type: "compare",
    text: "2분할, 가장 검증된 방식",
    durationInSeconds: 9.6,
    accent: "#6c5ce7",
    compareData: {
      left: { title: "미는 날", description: "가슴 · 어깨 · 삼두" },
      right: { title: "당기는 날", description: "등 · 이두 · 하체" },
    },
  },
  // 15. 주4회 상하체 → 주2회 (114.2~124.5)
  {
    type: "timeline",
    text: "주 4회면 이렇게",
    durationInSeconds: 10.3,
    accent: "#4A90D9",
    steps: [
      { label: "상체", description: "월" },
      { label: "하체", description: "화" },
      { label: "상체", description: "목" },
      { label: "하체", description: "금" },
    ],
  },
  // 16. 3분할 = 밀/당/다리 (124.5~132.9)
  {
    type: "timeline",
    text: "3분할, 시간 되면 상한선",
    description: "주 6회 돌리면 각 부위 정확히 주 2회",
    durationInSeconds: 8.4,
    accent: "#6c5ce7",
    steps: [
      { label: "미는 날", description: "가슴·어깨" },
      { label: "당기는 날", description: "등·이두" },
      { label: "다리 날", description: "하체" },
    ],
  },
  // 17. 내 횟수가 곧 답 (132.9~139.4)
  {
    type: "imageStat",
    text: "고민할 것도 없다",
    statValue: "내 횟수 = 답",
    statLabel: "주 3~4회 → 2분할\n주 5~6회 → 3분할",
    durationInSeconds: 6.5,
    accent: "#00b894",
    characterImage: "char-10.png",
  },
  // 18. 볼륨도 챙겨라 (139.4~148.9)
  {
    type: "text",
    text: "하나만 더,\n볼륨",
    subtitle: "한 부위 일주일 총 세트 수",
    durationInSeconds: 9.5,
    accent: "#ffd93d",
    characterImage: "char-11.png",
  },
  // 19. 볼륨 용량반응 (148.9~160.7)
  {
    type: "barChart",
    text: "세트 수와 근성장",
    description: "주당 세트에 따른 근비대 정도",
    durationInSeconds: 11.8,
    accent: "#ffd93d",
    barData: [
      { label: "주 5세트 미만", value: 5, color: "#5a6270" },
      { label: "10~20세트", value: 18, color: "#ffd93d" },
    ],
  },
  // 20. 2·3분할도 안 밀림 (160.7~167.8)
  {
    type: "highlight",
    text: "총량만 채우면",
    description: "화려한 5분할과 근성장 차이 없다",
    bullets: ["주당 10~20세트가 최적 구간", "빈도까지 챙기니 오히려 유리"],
    durationInSeconds: 7.1,
    accent: "#00b894",
    characterImage: "char-11.png",
  },
  // 21. 배치에서 다 까먹는다 (167.8~175.4)
  {
    type: "text",
    text: "분할 잘 짜고도\n배치에서 까먹는다",
    subtitle: "은근히 성장을 잡아먹는 실수",
    durationInSeconds: 7.6,
    accent: "#e17055",
    characterImage: "char-12.png",
  },
  // 22. 미는 날 순서: 어깨먼저 X, 가슴먼저 O (175.4~188.8)
  {
    type: "compare",
    text: "미는 날 순서",
    durationInSeconds: 13.4,
    accent: "#6c5ce7",
    compareData: {
      left: { title: "어깨부터 (X)", description: "삼두·어깨 먼저 지쳐\n가슴에 힘 안 남음" },
      right: { title: "가슴부터 (O)", description: "큰 근육 먼저\n뒤 종목이 안 무너짐" },
    },
  },
  // 23. 등 날도 등 먼저 (188.8~192.2)
  {
    type: "text",
    text: "등 날도\n등 먼저, 이두 나중",
    durationInSeconds: 3.4,
    accent: "#4A90D9",
    characterImage: "char-13.png",
  },
  // 24. 연달아 겹치지 않게 (192.2~208.6)
  {
    type: "highlight",
    text: "연달아 붙는 날",
    description: "같은 근육 겹치면 회복 안 돼 부상 위험",
    bullets: ["미는 날 다음엔 당기는 날·하체 날", "쓴 근육은 쉬게, 안 쓴 근육을 치기"],
    durationInSeconds: 16.4,
    accent: "#e17055",
    characterImage: "char-12.png",
  },
  // 25. 정리① 주2회 + 볼륨 (208.6~217.3)
  {
    type: "highlight",
    text: "핵심 정리",
    description: "분할 개수가 아니라 이것만 맞추면 된다",
    bullets: ["각 부위 주 2회", "주당 10~20세트"],
    durationInSeconds: 8.7,
    accent: "#00b894",
    characterImage: "char-14.png",
  },
  // 26. 정리② 횟수별 분할 (217.3~228.2)
  {
    type: "imageStat",
    text: "내 횟수에 맞춰라",
    statValue: "2분할 or 3분할",
    statLabel: "4분할 이상은 빈도가 떨어져 비효율",
    durationInSeconds: 10.9,
    accent: "#4A90D9",
    characterImage: "char-14.png",
  },
  // 27. 고수의 순서 (228.2~232.8)
  {
    type: "text",
    text: "빈도부터 정하는 게\n진짜 고수의 순서",
    subtitle: "화려한 분할 부러워 말고",
    durationInSeconds: 4.6,
    accent: "#ffd93d",
    characterImage: "char-15.png",
  },
  // 28. 마무리 구독 (232.8~239.52)
  {
    type: "text",
    text: "구독 · 좋아요\n알림 · 하이프",
    subtitle: "오늘도 득근하세요",
    durationInSeconds: 6.72,
    accent: "#4A90D9",
    characterImage: "char-15.png",
  },
];
