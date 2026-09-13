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
  // ============ 인트로 ============
  // 1. 훅: 안 뛰는 사람과의 격차 (0~4.36)
  {
    type: "text",
    text: "매년 벌어지는\n보이지 않는 격차",
    subtitle: "뛰는 사람 vs 안 뛰는 사람",
    description: "지금 이 순간에도 몸속에서\n조용히 벌어지고 있습니다",
    durationInSeconds: 4.36,
    accent: "#6c5ce7",
    characterImage: "char-01.png",
  },

  // 2. 인사 + 통념 도입 (4.36~7.78)
  {
    type: "text",
    text: "달리기,\n다들 이렇게 알죠",
    subtitle: "헬스 건강정보 헬마드",
    durationInSeconds: 3.42,
    accent: "#4A90D9",
    characterImage: "char-02.png",
  },

  // 3. 흔한 통념 (7.78~12.5)
  {
    type: "highlight",
    text: "흔한 오해",
    bullets: ["살 빼려고", "숨만 차고", "지루한 유산소"],
    durationInSeconds: 4.72,
    accent: "#e17055",
    characterImage: "char-03.png",
  },

  // 4. 먼지 쌓인 러닝화 (12.5~15.94)
  {
    type: "text",
    text: "신발장 속\n먼지 쌓인 러닝화",
    subtitle: "큰맘 먹고 샀지만",
    durationInSeconds: 3.44,
    accent: "#fdcb6e",
    characterImage: "char-04.png",
  },

  // 5. 대규모 연구, 거의 다 틀렸다 (15.94~22.74)
  {
    type: "text",
    text: "거의 전부\n오해였다",
    subtitle: "대규모 연구가 내린 결론",
    description: "수만 명을 십수 년 추적한 데이터",
    durationInSeconds: 6.8,
    accent: "#00b894",
    characterImage: "char-05.png",
  },

  // 6. 진짜 과학적 이유 4가지 예고 (22.74~29.78)
  {
    type: "highlight",
    text: "오늘 알려드릴\n진짜 이유 4가지",
    bullets: ["세포 나이", "뇌 크기", "마음 건강", "숨은 내장지방"],
    durationInSeconds: 7.04,
    accent: "#a29bfe",
    characterImage: "char-06.png",
  },

  // ============ 이유 1: 세포 / 텔로미어 ============
  // 7. 세포 나이 16살 차이 (29.78~36.46)
  {
    type: "imageStat",
    text: "① 같은 나이, 다른 세포",
    statValue: "16살",
    statLabel: "세포 나이 격차, 갈림길은 달리기",
    durationInSeconds: 6.68,
    accent: "#00cec9",
    characterImage: "char-07.png",
  },

  // 8. 텔로미어 = 신발끈 캡 (36.46~41.08)
  {
    type: "text",
    text: "텔로미어",
    subtitle: "신발끈 끝 플라스틱 캡",
    description: "세포의 수명을 지키는 보호막",
    durationInSeconds: 4.62,
    accent: "#74b9ff",
    characterImage: "char-08.png",
  },

  // 9. 짧아지면 노화·질병 (41.08~45.28)
  {
    type: "text",
    text: "닳아서 짧아지면",
    subtitle: "노화 · 질병 가속",
    durationInSeconds: 4.2,
    accent: "#e17055",
    characterImage: "char-09.png",
  },

  // 10. 달리는 사람 텔로미어 김 (45.28~49.7)
  {
    type: "text",
    text: "달리는 사람의 텔로미어는\n눈에 띄게 길었다",
    subtitle: "안 뛰는 사람 대비",
    durationInSeconds: 4.42,
    accent: "#00b894",
    characterImage: "char-10.png",
  },

  // 11. 울트라마라토너 11% ↑ (49.7~58.46)
  {
    type: "barChart",
    text: "텔로미어 길이 비교",
    description: "울트라마라톤 주자 vs 일반인",
    barData: [
      { label: "일반인", value: 100, color: "#636e72" },
      { label: "장거리 러너", value: 111, color: "#00b894" },
    ],
    durationInSeconds: 8.76,
    accent: "#00b894",
    characterImage: "char-01.png",
  },

  // 12. 마라톤 필요 없다 (58.46~62.16)
  {
    type: "text",
    text: "마라톤은\n필요 없습니다",
    subtitle: "핵심은 꾸준함",
    durationInSeconds: 3.7,
    accent: "#ffd93d",
    characterImage: "char-02.png",
  },

  // 13. 사망위험 30%↓, 심혈관 45%↓ (62.16~72.58) — 바차트(감소율)
  {
    type: "barChart",
    text: "하루 5~10분, 천천히 뛰기",
    description: "안 뛰는 사람 대비 사망 위험 감소율",
    barData: [
      { label: "전체 사망 위험", value: 30, color: "#00b894" },
      { label: "심혈관 사망 위험", value: 45, color: "#00cec9" },
    ],
    durationInSeconds: 10.42,
    accent: "#00b894",
    characterImage: "char-03.png",
  },

  // 14. 수명 3년 ↑ (72.58~77.82)
  {
    type: "imageStat",
    text: "평균 수명",
    statValue: "+3년",
    statLabel: "러닝화 한 켤레로 버는 시간",
    durationInSeconds: 5.24,
    accent: "#ffd93d",
    characterImage: "char-04.png",
  },

  // ============ 이유 2: 뇌 / 해마 ============
  // 15. 커지는 건 뇌 (77.82~82.04)
  {
    type: "text",
    text: "② 다리로 뛰는데\n뇌가 커진다",
    subtitle: "가장 놀라운 변화",
    durationInSeconds: 4.22,
    accent: "#6c5ce7",
    characterImage: "char-05.png",
  },

  // 16. 해마 매년 위축 (82.04~87.24)
  {
    type: "text",
    text: "나이 들면\n뇌도 쪼그라든다",
    subtitle: "기억 담당 '해마'가 매년 위축",
    durationInSeconds: 5.2,
    accent: "#e17055",
    characterImage: "char-06.png",
  },

  // 17. 건망증 → 치매 (87.24~90.02)
  {
    type: "text",
    text: "건망증에서\n치매까지",
    durationInSeconds: 2.78,
    accent: "#d63031",
    characterImage: "char-07.png",
  },

  // 18. 해마 부피 2% ↑ (90.02~97.22) — 도넛/스탯
  {
    type: "imageStat",
    text: "1년 유산소 운동 후",
    statValue: "+2%",
    statLabel: "해마 부피 증가 · 오히려 커졌다",
    durationInSeconds: 7.2,
    accent: "#00b894",
    characterImage: "char-08.png",
  },

  // 19. 노화 1~2년 되돌림 (97.22~100.96)
  {
    type: "imageStat",
    text: "뇌 노화 시계",
    statValue: "1~2년",
    statLabel: "거꾸로 되돌린 수준",
    durationInSeconds: 3.74,
    accent: "#00cec9",
    characterImage: "char-09.png",
  },

  // 20. BDNF = 뇌세포 비료 (100.96~108.64)
  {
    type: "text",
    text: "비디엔에프",
    subtitle: "뇌세포에게 주는 비료",
    description: "새 뇌세포가 자라고\n서로 연결되게 만드는 물질",
    durationInSeconds: 7.68,
    accent: "#a29bfe",
    characterImage: "char-10.png",
  },

  // 21. 달리기는 머리 운동 (108.64~112.0)
  {
    type: "text",
    text: "달리기는\n사실 머리 운동",
    durationInSeconds: 3.36,
    accent: "#6c5ce7",
    characterImage: "char-01.png",
  },

  // ============ 이유 3: 정신 건강 ============
  // 22. 항우울제 대신 운동화 처방 (112.0~117.84)
  {
    type: "text",
    text: "③ 항우울제 대신\n운동화를 처방",
    subtitle: "정신과 진료의 변화",
    durationInSeconds: 5.84,
    accent: "#74b9ff",
    characterImage: "char-02.png",
  },

  // 23. 하루 15분 → 우울증 위험 ↓ (117.84~123.6)
  {
    type: "imageStat",
    text: "하버드 추적 연구",
    statValue: "하루 15분",
    statLabel: "주요 우울증 위험 뚜렷하게 감소",
    durationInSeconds: 5.76,
    accent: "#4A90D9",
    characterImage: "char-03.png",
  },

  // 24. 16만명, 신체활동↑마다 우울증 26%↓ (123.6~130.64) — 프로그레스 카드
  {
    type: "progressCards",
    text: "16만 명 대규모 분석",
    description: "신체활동 한 단계 늘 때마다",
    progressCards: [
      {
        label: "우울증 위험 감소",
        value: 26,
        maxValue: 100,
        color: "#4A90D9",
        description: "저강도 운동까지 효과 확인",
      },
    ],
    durationInSeconds: 7.04,
    accent: "#4A90D9",
    characterImage: "char-04.png",
  },

  // 25. 운동화로 마음의 감기 예방 (130.64~139.02)
  {
    type: "text",
    text: "약이 아니라\n운동화로",
    subtitle: "마음의 감기를 막는다",
    description: "머리가 터질 것 같을 때\n딱 15분만 뛰고 오면 맑아지는 이유",
    durationInSeconds: 8.38,
    accent: "#a29bfe",
    characterImage: "char-05.png",
  },

  // ============ 이유 4: 내장지방 ============
  // 26. 체중계 그대로여도 위험한 기름 사라짐 (139.02~143.8)
  {
    type: "text",
    text: "④ 체중계는\n그대로여도",
    subtitle: "숨은 기름부터 사라진다",
    description: "가장 위험한 지방이 먼저 빠진다",
    durationInSeconds: 4.78,
    accent: "#e17055",
    characterImage: "char-06.png",
  },

  // 27. 진짜 무서운 건 내장지방 (143.8~148.46)
  {
    type: "text",
    text: "진짜 위험한 건\n내장지방",
    subtitle: "장기 사이에 낀 기름",
    durationInSeconds: 4.66,
    accent: "#d63031",
    characterImage: "char-07.png",
  },

  // 28. 당뇨·심장병의 진짜 원인 (148.46~150.9)
  {
    type: "text",
    text: "당뇨 · 심장병의\n진짜 원인",
    durationInSeconds: 2.44,
    accent: "#ff7675",
    characterImage: "char-08.png",
  },

  // 29. 유산소 > 저항: 내장지방·간지방↓ 인슐린↑ (150.9~159.48) — 비교
  {
    type: "compare",
    text: "유산소 운동의 3연타",
    compareData: {
      left: {
        title: "내장지방 · 간지방",
        description: "효과적으로 감소",
      },
      right: {
        title: "인슐린 감수성",
        description: "혈당 처리 능력 상승",
      },
    },
    durationInSeconds: 8.58,
    accent: "#00b894",
    characterImage: "char-09.png",
  },

  // 30. 독한 지방부터 녹아내림 (159.48~163.94)
  {
    type: "text",
    text: "거울엔 티가 안 나도",
    subtitle: "가장 독한 지방부터\n조용히 녹아내린다",
    durationInSeconds: 4.46,
    accent: "#00cec9",
    characterImage: "char-10.png",
  },

  // ============ 실전 처방 ============
  // 31. 얼마나 어떻게? 수준별 정리 (163.94~167.9)
  {
    type: "text",
    text: "그럼 얼마나,\n어떻게 뛸까",
    subtitle: "수준별로 정리",
    durationInSeconds: 3.96,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },

  // 32. 초급: 주 2~3회, 20~30분 (167.9~174.52)
  {
    type: "imageStat",
    text: "초보자 처방",
    statValue: "주 2~3회",
    statLabel: "하루 20~30분이면 충분",
    durationInSeconds: 6.62,
    accent: "#00b894",
    characterImage: "char-02.png",
  },

  // 33. 대화 되는 속도 (174.52~179.38)
  {
    type: "text",
    text: "속도의 기준",
    subtitle: "옆 사람과 대화가 될 정도",
    description: "숨은 살짝 차지만\n말은 끊기지 않는 페이스",
    durationInSeconds: 4.86,
    accent: "#74b9ff",
    characterImage: "char-03.png",
  },

  // 34. 심박 60~70% 존 (179.38~184.48) — 스탯
  {
    type: "imageStat",
    text: "지방 태우는 마법의 존",
    statValue: "60~70%",
    statLabel: "최대 심박수 기준 목표 구간",
    durationInSeconds: 5.1,
    accent: "#ffd93d",
    characterImage: "char-04.png",
  },

  // 35. 1분 뛰고 2분 걷기, 10%룰 (184.48~190.36) — 타임라인
  {
    type: "timeline",
    text: "시작 공식",
    accent: "#6c5ce7",
    steps: [
      { label: "1분 달리기" },
      { label: "2분 걷기" },
      { label: "주간 거리 +10% 이내" },
    ],
    durationInSeconds: 5.88,
    characterImage: "char-05.png",
  },

  // 36. 10%룰 = 부상 90%↓ (190.36~193.24)
  {
    type: "imageStat",
    text: "10% 원칙 하나로",
    statValue: "부상 90%",
    statLabel: "예방할 수 있다",
    durationInSeconds: 2.88,
    accent: "#e17055",
    characterImage: "char-06.png",
  },

  // 37. 중급: 주간 총량 목표 (193.24~198.42)
  {
    type: "text",
    text: "중급 이상이라면",
    subtitle: "목표는 주간 총량",
    durationInSeconds: 5.18,
    accent: "#4A90D9",
    characterImage: "char-07.png",
  },

  // 38. WHO 중강도 150분 / 고강도 75분 (198.42~202.1) — 좌우 비교
  {
    type: "compare",
    text: "세계보건기구 주간 권고량",
    compareData: {
      left: {
        title: "중강도 150분",
        description: "편하게 오래 뛰기",
      },
      right: {
        title: "고강도 75분",
        description: "숨찰 만큼 강하게",
      },
    },
    durationInSeconds: 3.68,
    accent: "#4A90D9",
    characterImage: "char-08.png",
  },

  // 39. 케이던스 = 분당 발 닿는 횟수 (202.1~207.88)
  {
    type: "text",
    text: "케이던스",
    subtitle: "1분에 발이 땅에 닿는 횟수",
    description: "고수와 초보를 가르는 핵심 지표",
    durationInSeconds: 5.78,
    accent: "#a29bfe",
    characterImage: "char-09.png",
  },

  // 40. 케이던스 160~180 (207.88~213.0) — 스탯
  {
    type: "imageStat",
    text: "목표 케이던스",
    statValue: "160~180",
    statLabel: "180은 프로 선수 평균일 뿐",
    durationInSeconds: 5.12,
    accent: "#00cec9",
    characterImage: "char-10.png",
  },

  // 41. 잘게 자주 → 무릎 충격↓ 효율↑ (213.0~219.98)
  {
    type: "text",
    text: "넓게 쿵쿵 대신\n잘게 자주",
    subtitle: "무릎 충격은 줄고\n유산소 효율은 올라간다",
    durationInSeconds: 6.98,
    accent: "#00b894",
    characterImage: "char-01.png",
  },
];
