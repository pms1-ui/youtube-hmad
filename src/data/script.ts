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

// 9번 롱폼: 러닝머신 vs 사이클, 체지방 연소 (오디오 260919_after.mp3 = 296.23초)
export const SCENES: Scene[] = [
  // 1. 훅: 같은 시간, 갈리는 결과 (0.0~6.42)
  {
    type: "text",
    text: "같은 시간, 같은 땀\n갈리는 결과",
    subtitle: "한쪽은 쭉쭉, 한쪽은 제자리",
    description: "노력은 똑같은데\n몸의 변화는 정반대",
    durationInSeconds: 6.42,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 2. 결정적 차이 (6.42~8.7)
  {
    type: "text",
    text: "이 둘의 결정적 차이",
    subtitle: "대체 뭘까",
    durationInSeconds: 2.28,
    accent: "#ffd93d",
    characterImage: "char-02.png",
  },
  // 3. 인사 + 러닝머신과 사이클 (8.7~13.54)
  {
    type: "text",
    text: "헬스 건강 정보\n헬마드",
    subtitle: "러닝머신 vs 사이클",
    description: "헬스장에 나란히 선 두 기계",
    durationInSeconds: 4.84,
    accent: "#4A90D9",
    characterImage: "char-03.png",
  },
  // 4. 뛸까 vs 페달 (13.54~17.8)
  {
    type: "compare",
    text: "당신의 선택은",
    accent: "#4A90D9",
    compareData: {
      left: { title: "러닝머신", description: "오늘은\n뛸까" },
      right: { title: "사이클", description: "아니면\n페달을 밟을까" },
    },
    durationInSeconds: 4.26,
    characterImage: "char-04.png",
  },
  // 5. 결과 가르는 두 가지 (17.8~26.74)
  {
    type: "highlight",
    text: "결과를 가르는 두 가지",
    description: "이 사소한 차이가\n체지방 태우는 속도를 갈라놓는다",
    bullets: ["기계 선택", "강도 기준"],
    bulletDescriptions: [
      "러닝머신이냐 사이클이냐",
      "강도의 기준을 어디에 두고 운동했느냐",
    ],
    durationInSeconds: 8.94,
    accent: "#4A90D9",
    characterImage: "char-05.png",
  },
  // 6. 심박수 넣으면 뒤집힘 (26.74~36.66)
  {
    type: "text",
    text: "칼로리만 보면\n답이 뻔한데",
    subtitle: "심박수를 넣는 순간",
    description: "이야기가 완전히 뒤집힌다",
    durationInSeconds: 9.92,
    accent: "#e17055",
    characterImage: "char-06.png",
  },
  // 7. 놓치는 숫자 두 개 (36.66~42.26)
  {
    type: "text",
    text: "대부분이 놓치는\n숫자 두 개",
    subtitle: "모르면 헛바퀴",
    description: "아무리 밟아도\n제자리만 도는 셈",
    durationInSeconds: 5.6,
    accent: "#e17055",
    characterImage: "char-07.png",
  },
  // 8. 오늘 3가지 예고 (42.26~53.18)
  {
    type: "timeline",
    text: "오늘 정리할 세 가지",
    accent: "#6c5ce7",
    steps: [
      { label: "칼로리", description: "같은 시간이면 뭐가 더 태우나" },
      { label: "선택", description: "그런데도 왜 사이클이 나을 수 있나" },
      { label: "숫자", description: "계기판 두 숫자를 어떻게 쓰나" },
    ],
    durationInSeconds: 10.92,
    characterImage: "char-08.png",
  },
  // 9. 과학적으로 뜯어보기 (53.18~62.22)
  {
    type: "text",
    text: "뭐가 진짜\n체지방 킬러인가",
    subtitle: "과학으로 하나씩",
    description: "오늘부터 어느 기계에 올라탈지\n딱 정리됩니다",
    durationInSeconds: 9.04,
    accent: "#4A90D9",
    characterImage: "char-09.png",
  },
  // 10. MET 기준 소개 (62.22~69.0)
  {
    type: "text",
    text: "강도를 재는 기준\nMET",
    subtitle: "대사당량",
    description: "운동 강도를 숫자로 재는 단위",
    durationInSeconds: 6.78,
    accent: "#6c5ce7",
    characterImage: "char-10.png",
  },
  // 11. 왜 공통 잣대 (69.0~76.28)
  {
    type: "text",
    text: "왜 MET로 잴까",
    subtitle: "힘든 정도는 제각각",
    description: "그냥 '힘들다'로만 말하면\n사람마다 기준이 다르니까\n공통 잣대를 만든 것",
    durationInSeconds: 7.28,
    accent: "#6c5ce7",
    characterImage: "char-01.png",
  },
  // 12. 1 MET 정의 (76.28~88.58)
  {
    type: "imageStat",
    text: "가만히 앉아 숨만 쉬는 상태",
    statValue: "1 MET",
    statLabel: "3 MET면 3배, 10 MET면 10배\n에너지를 쓴다는 뜻",
    durationInSeconds: 12.3,
    accent: "#6c5ce7",
    characterImage: "char-02.png",
  },
  // 13. 러닝 9.8 MET (88.58~96.12)
  {
    type: "imageStat",
    text: "시속 10km 러닝머신",
    statValue: "9.8 MET",
    statLabel: "가만히 있을 때보다\n에너지를 10배 가까이 태운다",
    durationInSeconds: 7.54,
    accent: "#e17055",
    characterImage: "char-03.png",
  },
  // 14. 사이클 6~8 MET (96.12~101.66)
  {
    type: "imageStat",
    text: "시속 16km 사이클",
    statValue: "6~8 MET",
    statLabel: "숫자만 보면 벌써 승부가 난 듯",
    durationInSeconds: 5.54,
    accent: "#4A90D9",
    characterImage: "char-04.png",
  },
  // 15. 칼로리 비교 (101.66~109.08)
  {
    type: "beforeAfterChart",
    text: "1시간 소모 칼로리",
    subtitle: "체중 70kg 기준",
    beforeAfterData: [
      { label: "사이클", before: 350, after: 500 },
      { label: "러닝머신", before: 490, after: 595 },
    ],
    unit: "kcal",
    durationInSeconds: 7.42,
    accent: "#e17055",
  },
  // 16. 25~40% 더 (109.08~115.5)
  {
    type: "barChart",
    text: "같은 체감 강도 비교",
    subtitle: "러닝머신이 더 태운다",
    barData: [
      { label: "사이클", value: 100, color: "#4A90D9" },
      { label: "러닝머신", value: 132, color: "#e17055" },
    ],
    description: "러닝머신이 대략 25~40% 더 많은 칼로리 소모",
    durationInSeconds: 6.42,
    accent: "#e17055",
  },
  // 17. 체중 지지 차이 (115.5~124.66)
  {
    type: "compare",
    text: "이유는 간단하다",
    accent: "#4A90D9",
    compareData: {
      left: {
        title: "달리기",
        description: "매 발걸음마다\n체중 전체를\n띄웠다 받아낸다",
      },
      right: {
        title: "사이클",
        description: "안장이 몸무게를\n받쳐주니\n몸이 일을 덜 한다",
      },
    },
    durationInSeconds: 9.16,
    characterImage: "char-05.png",
  },
  // 18. 러닝 앞서지만 (124.66~133.02)
  {
    type: "text",
    text: "시간당 칼로리는\n러닝머신 승",
    subtitle: "그럼 사이클은 접어야 하나",
    description: "그런데 진짜 이야기는\n지금부터",
    durationInSeconds: 8.36,
    accent: "#e17055",
    characterImage: "char-06.png",
  },
  // 19. 핵심 변수 심박수 (133.02~139.9)
  {
    type: "text",
    text: "핵심 변수\n심박수",
    subtitle: "체지방이 타느냐 마느냐",
    description: "지금 심장이 몇 번 뛰고 있느냐에\n달려 있다",
    durationInSeconds: 6.88,
    accent: "#d63031",
    characterImage: "char-07.png",
  },
  // 20. 지방연소존 60~70% (139.9~147.56)
  {
    type: "donutChart",
    text: "지방연소존",
    subtitle: "최대심박수의 60~70%",
    donutData: [
      { label: "지방연소존", value: 65, color: "#00b894" },
      { label: "그 외 구간", value: 35, color: "#2a2a2a" },
    ],
    description: "이 강도에서 지방이 차지하는 비율이\n가장 높아진다",
    durationInSeconds: 7.66,
    accent: "#00b894",
  },
  // 21. 지방산화 최대 61% (147.56~155.5)
  {
    type: "imageStat",
    text: "지방산화가 최대가 되는 지점",
    statValue: "약 61%",
    statLabel: "최대심박수의 61%\n최대산소섭취량 절반이 안 되는 지점",
    durationInSeconds: 7.94,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 22. 220-나이 공식 (155.5~163.4)
  {
    type: "imageStat",
    text: "내 최대심박수 = 220 - 나이",
    statValue: "108~126",
    statLabel: "40살이면 최대 180\n그 60~70%가 목표 심박수",
    durationInSeconds: 7.9,
    accent: "#d63031",
    characterImage: "char-09.png",
  },
  // 23. 대화되나 노래 벅참 (163.4~168.64)
  {
    type: "text",
    text: "딱 이 정도 강도",
    subtitle: "대화는 되는데 노래는 벅찬",
    description: "옆 사람과 말은 이어지지만\n노래 부르긴 숨찬 정도",
    durationInSeconds: 5.24,
    accent: "#d63031",
    characterImage: "char-10.png",
  },
  // 24. 흔한 착각 (168.64~175.16)
  {
    type: "text",
    text: "여기서 크게 착각한다",
    subtitle: "저강도가 무조건 살 뺀다?",
    description: "지방 연소 비율이 높다고\n무조건 더 빠지는 게 아니다",
    durationInSeconds: 6.52,
    accent: "#e17055",
    characterImage: "char-01.png",
  },
  // 25. 저강도 vs 고강도 (175.16~184.82)
  {
    type: "compare",
    text: "함정의 정체",
    accent: "#6c5ce7",
    compareData: {
      left: {
        title: "낮은 강도",
        description: "지방 비율 ↑\n총 에너지 자체가 적다",
      },
      right: {
        title: "높은 강도",
        description: "지방 비율 ↓\n총 소모량이 커서\n지방 절대량은 더 많을 수도",
      },
    },
    durationInSeconds: 9.66,
    characterImage: "char-02.png",
  },
  // 26. RPM·WATT 무기 (184.82~191.36)
  {
    type: "text",
    text: "사이클의 무기\nRPM · WATT",
    subtitle: "러닝머신엔 없는 숫자 두 개",
    durationInSeconds: 6.54,
    accent: "#4A90D9",
    characterImage: "char-03.png",
  },
  // 27. RPM/WATT 정의 (191.36~198.28)
  {
    type: "highlight",
    text: "두 숫자의 뜻",
    bullets: ["RPM", "WATT"],
    bulletDescriptions: [
      "1분에 페달을 몇 바퀴 — 다리 회전수",
      "실제로 만들어내는 힘 — 파워를 숫자로",
    ],
    durationInSeconds: 6.92,
    accent: "#4A90D9",
    characterImage: "char-04.png",
  },
  // 28. WATT=성장 증거 (198.28~210.52)
  {
    type: "text",
    text: "WATT로\n내 출력을 정확히 찍는다",
    subtitle: "성장의 객관적 증거",
    description: "어제와 같은 심박수에서\n더 높은 WATT = 몸이 좋아졌다는 증거",
    durationInSeconds: 12.24,
    accent: "#4A90D9",
    characterImage: "char-05.png",
  },
  // 29. 1999 실험 60rpm (210.52~220.58)
  {
    type: "imageStat",
    text: "1999년 사이클 선수 실험",
    statValue: "60 RPM",
    statLabel: "산소를 가장 아껴 쓰는\n효율적인 회전수 — 힘은 덜 든다",
    durationInSeconds: 10.06,
    accent: "#6c5ce7",
    characterImage: "char-06.png",
  },
  // 30. 편한거≠살빠짐 (220.58~226.98)
  {
    type: "text",
    text: "편한 것과\n살 빠지는 건 다르다",
    subtitle: "여기서 함정",
    description: "편하게 빠지면\n세상에 뚱뚱한 사람이 없겠죠",
    durationInSeconds: 6.4,
    accent: "#e17055",
    characterImage: "char-07.png",
  },
  // 31. 회전수↑ 지방연소↑, 76rpm (226.98~236.42)
  {
    type: "lineGraph",
    text: "회전수 ↑ → 지방 연소 ↑",
    subtitle: "지방산화 최대 회전수",
    lineData: [
      { label: "60", value: 60 },
      { label: "70", value: 80 },
      { label: "76", value: 100 },
      { label: "90", value: 88 },
    ],
    description: "빠르게 돌릴수록 지방 태우는 비율 상승\n최대 지점은 대략 분당 76회전",
    durationInSeconds: 9.44,
    accent: "#00b894",
  },
  // 32. 75~90rpm 권장 (236.42~246.8)
  {
    type: "imageStat",
    text: "살이 목적이라면",
    statValue: "75~90 RPM",
    statLabel: "저항을 적당히 두고 경쾌하게\n심박수를 지방연소 구간에 올려두기 유리",
    durationInSeconds: 10.38,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 33. 정리: 칼로리는 러닝 (246.8~251.38)
  {
    type: "text",
    text: "정리하겠습니다",
    subtitle: "순수 칼로리 효율은 러닝머신 위",
    durationInSeconds: 4.58,
    accent: "#e17055",
    characterImage: "char-09.png",
  },
  // 34. 사이클 관절보호 (251.38~258.4)
  {
    type: "compare",
    text: "하지만 사이클은",
    accent: "#4A90D9",
    compareData: {
      left: {
        title: "충격 ↓",
        description: "안장이 체중을 받쳐\n무릎·발목 충격이\n달리기보다 훨씬 적다",
      },
      right: {
        title: "지속 ↑",
        description: "지치지 않고\n더 오래, 더 자주\n탈 수 있다",
      },
    },
    durationInSeconds: 7.02,
    characterImage: "char-10.png",
  },
  // 35. 상황별 선택 (258.4~269.46)
  {
    type: "highlight",
    text: "상황별 정답",
    bullets: ["관절 약함 · 고체중", "시간 없음"],
    bulletDescriptions: [
      "사이클 — 오래 살을 태워주는 기계",
      "러닝머신 경사 ↑ — 짧고 굵게 심박수",
    ],
    durationInSeconds: 11.06,
    accent: "#4A90D9",
    characterImage: "char-01.png",
  },
  // 36. 진짜 열쇠: 총열량+꾸준함 (269.46~276.42)
  {
    type: "text",
    text: "진짜 열쇠는\n총 소모 열량 · 꾸준함",
    subtitle: "마법 같은 기계는 없다",
    description: "특정 기계가 뱃살만 녹이는 일은\n일어나지 않는다",
    durationInSeconds: 6.96,
    accent: "#ffd93d",
    characterImage: "char-02.png",
  },
  // 37. 강도 흔들기 (276.42~286.68)
  {
    type: "text",
    text: "강도를 조금씩 흔들어라",
    subtitle: "매일 같으면 몸이 적응한다",
    description: "똑같은 강도만 반복하면\n체지방 소모 효율이 떨어진다\n심박수 기준으로 강도를 바꿔라",
    durationInSeconds: 10.26,
    accent: "#6c5ce7",
    characterImage: "char-03.png",
  },
  // 38. 최고의 체지방 킬러 (286.68~291.9)
  {
    type: "text",
    text: "가장 오래 붙어 있을 기계",
    subtitle: "그게 최고의 체지방 킬러",
    description: "지루하지 않고 꾸준히 탈 수 있는 기계가\n당신의 정답",
    durationInSeconds: 5.22,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 39. 아웃트로 (291.9~296.23)
  {
    type: "text",
    text: "구독 · 좋아요 · 알림",
    subtitle: "오늘도 득근하는 하루",
    durationInSeconds: 4.33,
    accent: "#4A90D9",
    characterImage: "char-05.png",
  },
];
