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
};

// 버피 vs 데빌프레스 A안 (오디오 260922.mp3 = 343.47초)
export const SCENES: Scene[] = [
  // 1. 훅: 5개만 해도 표정 무너짐 (0~9.04)
  {
    type: "text",
    text: "5개만 해도\n표정이 무너지는 두 동작",
    subtitle: "둘 다 별명이 악마의 운동",
    description: "하나는 전 세계가 인정한 악마\n하나는 악마도 울고 가는 운동",
    durationInSeconds: 9.04,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 2. 훅 마무리: 진짜 악마는? (9.04~14.56)
  {
    type: "text",
    text: "더 사악한 진짜 악마는",
    subtitle: "과연 누구일까",
    durationInSeconds: 5.52,
    accent: "#ffd93d",
    characterImage: "char-02.png",
  },
  // 3. 인사 + 두 주인공 (14.56~20.72)
  {
    type: "text",
    text: "헬스 건강 정보\n헬마드",
    subtitle: "버피 vs 데빌프레스",
    description: "이름만 들어도 다리가 후들거리는 두 동작",
    durationInSeconds: 6.16,
    accent: "#4A90D9",
    characterImage: "char-03.png",
  },
  // 4. 2024 연구: 버피 맨몸 1위 (20.72~30.5)
  {
    type: "imageStat",
    text: "2024년 연구, 맨몸 운동 강도 순위",
    statValue: "버피 1위",
    statLabel: "힘든 정도·부하 거의 모든 항목 1등\n맨몸 세계의 챔피언",
    durationInSeconds: 9.78,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 5. 데빌프레스 도전장 (30.5~39.7)
  {
    type: "text",
    text: "여기에 덤벨을 들고\n체급을 올린 도전자",
    subtitle: "데빌프레스",
    description: "오늘 일곱 개 항목으로\n한 라운드씩 채점합니다",
    durationInSeconds: 9.2,
    accent: "#e17055",
    characterImage: "char-05.png",
  },
  // 6. 버피란? (39.7~47.96)
  {
    type: "text",
    text: "버피",
    subtitle: "기구 없는 맨몸 동작",
    description: "쪼그려 앉아 엎드리고\n팔굽혀펴기 하고, 튀어 올라 점프",
    durationInSeconds: 8.26,
    accent: "#4A90D9",
    characterImage: "char-06.png",
  },
  // 7. 데빌프레스란? (47.96~60.48)
  {
    type: "text",
    text: "데빌프레스",
    subtitle: "덤벨 버피 + 스내치",
    description: "엎드렸다 일어서며 덤벨을 머리 위로\n버피의 무게감 있는 버전",
    durationInSeconds: 12.52,
    accent: "#e17055",
    characterImage: "char-07.png",
  },
  // 8. 1R 칼로리 소개 (60.48~71.3)
  {
    type: "imageStat",
    text: "1라운드 · 칼로리",
    statValue: "10~15",
    statLabel: "버피는 1분에 10~15kcal\n설렁설렁 조깅의 1.5배, 맨몸치곤 괴물",
    durationInSeconds: 10.82,
    accent: "#4A90D9",
    characterImage: "char-08.png",
  },
  // 9. 1R 판정: 데빌 승 (71.3~84.8)
  {
    type: "barChart",
    text: "같은 시간, 총 소모 열량",
    subtitle: "무게가 곧 일의 양",
    barData: [
      { label: "버피", value: 100, color: "#4A90D9" },
      { label: "데빌프레스", value: 125, color: "#e17055" },
    ],
    description: "덤벨을 들어 올리는 만큼 데빌프레스가 더 태운다\n1라운드 데빌프레스 승",
    durationInSeconds: 13.5,
    accent: "#e17055",
  },
  // 10. 2R 심박수 소개 (84.8~91.32)
  {
    type: "text",
    text: "2라운드 · 심박수",
    subtitle: "이게 진짜 악마의 핵심",
    description: "몇 개 안 했는데 심장이\n목구멍까지 튀어나올 것 같은 느낌",
    durationInSeconds: 6.52,
    accent: "#d63031",
    characterImage: "char-09.png",
  },
  // 11. 2R 버피 산소섭취량 (91.32~102.54)
  {
    type: "imageStat",
    text: "버피 산소 섭취량",
    statValue: "22.9",
    statLabel: "1분에 체중 1kg당 22.9ml\n웬만한 유산소보다 높은 수치",
    durationInSeconds: 11.22,
    accent: "#00b894",
    characterImage: "char-10.png",
  },
  // 12. 2R 판정: 데빌 승 (102.54~114.56)
  {
    type: "text",
    text: "데빌프레스는\n무게를 든 채로 끌어올린다",
    subtitle: "심장이 천장을 뚫고, 목에서 피맛",
    description: "체감 강도는 데빌프레스가 한 수 위\n2라운드 데빌프레스 승",
    durationInSeconds: 12.02,
    accent: "#e17055",
    characterImage: "char-01.png",
  },
  // 13. 3R 동원 근육 (114.56~124.12)
  {
    type: "compare",
    text: "3라운드 · 동원 근육",
    accent: "#e17055",
    compareData: {
      left: {
        title: "버피",
        description: "다리·엉덩이·가슴\n어깨·코어\n훌륭한 전신",
      },
      right: {
        title: "데빌프레스",
        description: "여기에 등·삼두\n어깨 순간 파워까지\n더 얹는다",
      },
    },
    durationInSeconds: 9.56,
    characterImage: "char-02.png",
  },
  // 14. 3R 판정: 데빌 승, 3대0 (124.12~137.62)
  {
    type: "text",
    text: "근력 자극 총량\n데빌프레스 우세",
    subtitle: "초반 세 판을 쓸어 담았다",
    description: "버피 팬 여러분, 아직 영상 끄지 마세요\n진짜 승부는 지금부터",
    durationInSeconds: 13.5,
    accent: "#e17055",
    characterImage: "char-03.png",
  },
  // 15. 4R 애프터번 소개 (137.62~145.28)
  {
    type: "text",
    text: "4라운드 · 애프터번",
    subtitle: "운동 끝난 뒤에도 계속 태운다",
    description: "강도가 높을수록 폭발적으로 커지는 현상",
    durationInSeconds: 7.66,
    accent: "#6c5ce7",
    characterImage: "char-04.png",
  },
  // 16. 4R 근거 수치 (145.28~156.9)
  {
    type: "imageStat",
    text: "고강도일 때 운동 후 추가 소모",
    statValue: "몇 배 ↑",
    statLabel: "강도를 최대치 근처로 올리자\n운동 후 태우는 에너지가 몇 배로 증가",
    durationInSeconds: 11.62,
    accent: "#6c5ce7",
    characterImage: "char-05.png",
  },
  // 17. 4R 판정: 무승부 (156.9~165.54)
  {
    type: "text",
    text: "둘 다 바닥에 눕게 만든다",
    subtitle: "애프터번을 최대로 끌어내는 극강도",
    description: "우열을 가리기 어렵다\n4라운드는 무승부",
    durationInSeconds: 8.64,
    accent: "#8a8f98",
    characterImage: "char-06.png",
  },
  // 18. 5R 부상·접근성 소개 (165.54~176.44)
  {
    type: "text",
    text: "5라운드 · 부상 위험과 접근성",
    subtitle: "데빌프레스는 어깨가 위험",
    description: "덤벨을 머리 위로 올리다 지쳐 말리면 관절 부상\n게다가 덤벨 없으면 시작도 못 한다",
    durationInSeconds: 10.9,
    accent: "#d63031",
    characterImage: "char-07.png",
  },
  // 19. 5R 판정: 버피 완승 (176.44~185.32)
  {
    type: "text",
    text: "버피는 몸 하나면 끝",
    subtitle: "장비도 장소도 필요 없다",
    description: "호텔 방에서도 가능, 무게가 없으니 위험도 작다\n5라운드 버피의 완승",
    durationInSeconds: 8.88,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 20. 6R 시간효율 소개 (185.32~194.98)
  {
    type: "text",
    text: "6라운드 · 시간 효율",
    subtitle: "같은 5분엔 데빌프레스가 세지만",
    description: "덤벨 찾고 무게 고르는 사이\n버피는 이미 30개를 끝냈다",
    durationInSeconds: 9.66,
    accent: "#4A90D9",
    characterImage: "char-09.png",
  },
  // 21. 6R 판정: 버피 승 (194.98~207.02)
  {
    type: "text",
    text: "제대로 시작하기까지\n걸리는 시간",
    subtitle: "데빌프레스는 예열·스트레칭 필수",
    description: "이 시간이 운동을 하느냐 마느냐를 가른다\n실전 시간 효율은 버피 승",
    durationInSeconds: 12.04,
    accent: "#00b894",
    characterImage: "char-10.png",
  },
  // 22. 7R 체지방 소개 (207.02~216) — 착각 (207.02~216.5 approx)
  {
    type: "text",
    text: "마지막 7라운드 · 체지방",
    subtitle: "제일 세게 태우면 살도 잘 빠진다?",
    description: "이게 함정입니다",
    durationInSeconds: 9.48,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 23. 7R 원리: 총 운동량 (216.5~231.04)
  {
    type: "text",
    text: "체지방을 결정하는 건\n순간 강도가 아니라 총 운동량",
    subtitle: "데빌프레스는 금방 지쳐 나가떨어진다",
    description: "버피는 강도는 낮아도\n더 오래, 더 많이 반복할 수 있다",
    durationInSeconds: 14.54,
    accent: "#00b894",
    characterImage: "char-02.png",
  },
  // 24. 7R 지방연소 구간 (231.04~244.08)
  {
    type: "text",
    text: "오래 버틸수록\n지방 연소 구간이 길어진다",
    subtitle: "초반엔 탄수화물, 길어지면 지방",
    description: "오래 버티는 버피가 이 구간을 더 길게 가져간다\n매일 반복하니 주간 총 소모량도 크다",
    durationInSeconds: 13.04,
    accent: "#00b894",
    characterImage: "char-03.png",
  },
  // 25. 7R 판정: 버피 승 (244.08~249.82)
  {
    type: "text",
    text: "살을 빼는 꾸준함과 총량",
    subtitle: "버피가 앞선다",
    description: "7라운드도 버피의 승리",
    durationInSeconds: 5.74,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 26. 라운드별 승자 요약 (249.82~255.64)
  {
    type: "compare",
    text: "라운드 결과 정리",
    accent: "#ffd93d",
    compareData: {
      left: {
        title: "데빌프레스 승",
        description: "칼로리\n심박수\n동원 근육",
      },
      right: {
        title: "버피 승",
        description: "접근성\n시간 효율\n체지방",
      },
    },
    description: "애프터번은 무승부",
    durationInSeconds: 5.82,
  },
  // 27. 3대 3 동점 (255.64~258.42)
  {
    type: "text",
    text: "최종 3 대 3",
    subtitle: "그야말로 동점입니다",
    durationInSeconds: 2.78,
    accent: "#ffd93d",
    characterImage: "char-05.png",
  },
  // 27. 타이브레이커 (258.42~264.32)
  {
    type: "text",
    text: "그래서 마지막 하나를\n더 추가합니다",
    subtitle: "몸을 진짜 바꾸는 건",
    description: "제일 센 운동이 아니라\n가장 오래 붙어 있는 운동이라는 것",
    durationInSeconds: 5.9,
    accent: "#ffd93d",
    characterImage: "char-05.png",
  },
  // 28. 데빌 한계 (264.32~273.58)
  {
    type: "text",
    text: "데빌프레스는\n순간 화력의 챔피언",
    subtitle: "하지만 덤벨이 있어야 하고 몇 세트 못 버틴다",
    description: "자세도 배워야 해 접근성이 살짝 떨어진다\n버피는 몸 하나로 오늘도 내일도",
    durationInSeconds: 9.26,
    accent: "#e17055",
    characterImage: "char-06.png",
  },
  // 29. 종합 챔피언 버피 (273.58~281.54)
  {
    type: "imageStat",
    text: "종합 챔피언 벨트",
    statValue: "버피",
    statLabel: "순간 강도의 왕관은 데빌프레스\n1년 뒤 몸을 바꿀 악마는 버피",
    durationInSeconds: 7.96,
    accent: "#00b894",
    characterImage: "char-07.png",
  },
  // 30. 데빌도 좋은 운동 + 초보 팁 (281.54~293.5)
  {
    type: "compare",
    text: "그래도 데빌프레스는",
    accent: "#4A90D9",
    compareData: {
      left: {
        title: "이런 분께",
        description: "덤벨 다룰 줄 알고\n전신을 근력까지\n통째로 조지고 싶다면",
      },
      right: {
        title: "초보라면",
        description: "완성형 욕심 말고\n버피 자세부터\n완성하고 넘어가기",
      },
    },
    durationInSeconds: 11.96,
    characterImage: "char-08.png",
  },
  // 31. 광고 전환: 회복 (293.5~303.6)
  {
    type: "text",
    text: "운동만큼 중요한 건\n그다음 회복",
    subtitle: "단백질이 안 받쳐주면 근육은 안 자란다",
    description: "마침 시기 좋은 세일 정보 하나 소개합니다",
    durationInSeconds: 10.1,
    accent: "#6c5ce7",
    characterImage: "char-09.png",
  },
  // 32. 광고: 세일 일정+할인 (303.6~315.88)
  {
    type: "imageStat",
    text: "마이프로틴 해피 추석 타임세일",
    statValue: "최대 80%",
    statLabel: "9/22 화 저녁 7시 ~ 9/23 수 밤 11:59\n할인코드 TEAMMP 입력 시 40% 추가",
    durationInSeconds: 12.28,
    accent: "#e17055",
    characterImage: "char-10.png",
  },
  // 33. 광고: 추가 혜택 (315.88~328.46)
  {
    type: "highlight",
    text: "추가 혜택도 가득",
    bullets: [
      "선착순 922명 쇼핑지원금 5천원",
      "트렌드 제품 결제금액 5% 추가 할인",
      "금액대별 사은품 최대 2개",
      "앱 12만원 이상 제품지원금 7천원",
    ],
    durationInSeconds: 12.58,
    accent: "#e17055",
    characterImage: "char-01.png",
  },
  // 34. 광고 마무리 (328.46~335.24)
  {
    type: "text",
    text: "링크는 고정댓글에",
    subtitle: "이번 추석엔 운동도 회복도 알차게",
    durationInSeconds: 6.78,
    accent: "#6c5ce7",
    characterImage: "char-02.png",
  },
  // 35. 아웃트로 (335.24~343.47)
  {
    type: "text",
    text: "구독 · 좋아요 · 알림",
    subtitle: "오늘도 득근하는 하루",
    durationInSeconds: 8.23,
    accent: "#4A90D9",
    characterImage: "char-03.png",
  },
];
