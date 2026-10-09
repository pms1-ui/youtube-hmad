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
  | "iconGrid";

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
};

// 체지방 감량은 사실 간단합니다 (크리스 범스테드) — 오디오 261009_final.mp3 = 370.47초
// 52장면, 전사 타임스탬프 기반. 캐릭터 char-01~10 순환.
export const SCENES: Scene[] = [
  // 1. 훅: 범스테드는 체지방 감량이 쉽다고 말함 (0.00~4.64)
  {
    type: "text",
    text: "세계 최고 보디빌더가 말한다",
    subtitle: "\"체지방 감량, 사실 너무 쉽다\"",
    description: "크리스 범스테드",
    durationInSeconds: 4.64,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 2. 왜? 쉬워서? 뭔가 있나 (4.64~8.32)
  {
    type: "text",
    text: "정말 쉬워서일까",
    subtitle: "아니면 우리가 모르는 뭔가가",
    durationInSeconds: 3.68,
    accent: "#ffd93d",
    characterImage: "char-02.png",
  },
  // 3. 사람들은 유행 식단·공복 유산소·저녁 운동·단백질에 헤맴 (8.32~15.16)
  {
    type: "highlight",
    text: "다들 여기서 헤맨다",
    bullets: ["어떤 식단이 유행인지", "공복 유산소가 맞는지", "저녁 운동이 좋은지", "단백질은 어떻게 채울지"],
    durationInSeconds: 6.84,
    accent: "#6c5ce7",
    characterImage: "char-03.png",
  },
  // 4. 15년 선수·체지방 4%까지 간 범스테드의 답은 간단 (15.16~23.24)
  {
    type: "imageStat",
    text: "15년 프로가 내려가 본 지점",
    statValue: "체지방 4%",
    statLabel: "혈관이 다 비치는 그곳까지 가본 사람의 답은\n어이가 없을 만큼 간단합니다",
    durationInSeconds: 8.08,
    accent: "#ffd93d",
    characterImage: "char-04.png",
  },
  // 5. 인사 + 감기 양해 (23.24~29.44)
  {
    type: "text",
    text: "안녕하세요, 헬마드입니다",
    subtitle: "환절기 감기로 코가 살짝 막힌 점 양해 부탁드립니다",
    durationInSeconds: 6.2,
    accent: "#4A90D9",
    characterImage: "char-05.png",
  },
  // 6. 다이어트 몇 번씩, 늘 안 쉬웠고 금방 돌아옴 (29.44~36.10)
  {
    type: "text",
    text: "빼도 금방 돌아온다",
    subtitle: "다이어트, 늘 쉽지 않았죠",
    description: "원래 체중으로 돌아오고 마는 이유,\n왜일까요",
    durationInSeconds: 6.66,
    accent: "#e17055",
    characterImage: "char-06.png",
  },
  // 7. 범스테드 영상 하루만에 100만 조회, 비법 파헤치기 (36.10~42.84)
  {
    type: "imageStat",
    text: "업로드 하루 만에",
    statValue: "조회수 100만",
    statLabel: "범스테드가 공개한 그 비법,\n쉽고 빠르게 파헤쳐 봅니다",
    durationInSeconds: 6.74,
    accent: "#ffd93d",
    characterImage: "char-07.png",
  },
  // 8. 첫 번째, 가장 기본은 측정과 기록 (42.84~46.62)
  {
    type: "text",
    text: "첫 번째",
    subtitle: "가장 기본은 측정과 기록",
    durationInSeconds: 3.78,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 9. 측정 안 하면 관리 못 함, 먹는 걸 다 적기 (46.62~51.32)
  {
    type: "text",
    text: "측정하지 않으면\n관리할 수 없다",
    subtitle: "거창할 것 없이, 먹는 걸 다 적는 것",
    durationInSeconds: 4.7,
    accent: "#00b894",
    characterImage: "char-09.png",
  },
  // 10. 1700명 연구, 기록 그룹 감량 2배 이상 (51.32~58.32)
  {
    type: "text",
    text: "1,700명 연구 결과",
    subtitle: "매일 기록한 그룹의 감량",
    description: "기록 안 한 그룹의 무려 두 배 이상",
    durationInSeconds: 7.0,
    accent: "#6c5ce7",
    characterImage: "char-10.png",
  },
  // 11. 9kg vs 절반 (58.32~62.30)
  {
    type: "beforeAfterChart",
    text: "기록이 가른 결과",
    beforeAfterData: [{ label: "기록 안 함", before: 4, after: 4 }, { label: "매일 기록", before: 4, after: 9 }],
    unit: "kg",
    durationInSeconds: 3.98,
    accent: "#00b894",
    characterImage: "char-01.png",
  },
  // 12. 적는 행동 하나가 과식 막고 감량 확률 올림 (62.30~67.50)
  {
    type: "text",
    text: "재능이 아니다",
    subtitle: "적는다는 행동 하나가",
    description: "과식을 막고 감량 확률을 끌어올린다",
    durationInSeconds: 5.2,
    accent: "#00b894",
    characterImage: "char-02.png",
  },
  // 13. 체중은 같은 시간·같은 조건, 하루 숫자 말고 (67.50~72.06)
  {
    type: "text",
    text: "체중은 같은 시간, 같은 조건에서",
    subtitle: "하루치 숫자에 일희일비 금지",
    durationInSeconds: 4.56,
    accent: "#4A90D9",
    characterImage: "char-03.png",
  },
  // 14. 일주일 평균으로 흐름만, 조건 맞출수록 정직 (72.06~79.76)
  {
    type: "text",
    text: "일주일 평균으로 흐름만 본다",
    subtitle: "조건을 똑같이 맞출수록",
    description: "체중계가 체지방 변화를\n정직하게 보여준다",
    durationInSeconds: 7.7,
    accent: "#4A90D9",
    characterImage: "char-04.png",
  },
  // 15. 두 번째, 칼로리 기준점 — 남의 숫자 가져오는 실수 (79.76~87.30)
  {
    type: "text",
    text: "두 번째, 내 칼로리 기준점",
    subtitle: "여기서 다들 실수한다",
    description: "\"누구는 2,000 먹고 뺐다더라\"\n남의 숫자를 그대로 가져오는 것",
    durationInSeconds: 7.54,
    accent: "#00b894",
    characterImage: "char-05.png",
  },
  // 16. 신진대사는 사람마다 다름 + 직종 (87.30~98.20)
  {
    type: "text",
    text: "남의 숫자는 의미 없다",
    subtitle: "신진대사는 사람마다 다 다르다",
    description: "직종이 달라 기초 활동 칼로리도 제각각\n그래서 내 기준이 필요하다",
    durationInSeconds: 10.9,
    accent: "#e17055",
    characterImage: "char-06.png",
  },
  // 17. 유지 섭취량 파악 → 딱 200 줄임 (98.20~105.22)
  {
    type: "imageStat",
    text: "유지 섭취량을 먼저 파악",
    statValue: "-200kcal",
    statLabel: "며칠 기록하면 나온다\n거기서 딱 200칼로리만 줄인다",
    durationInSeconds: 7.02,
    accent: "#ffd93d",
    characterImage: "char-07.png",
  },
  // 18. 작게 떼고 반응 보기 (105.22~112.40)
  {
    type: "text",
    text: "확 굶기지 않는다",
    subtitle: "아주 조금만 줄이고 반응을 본다",
    description: "몸이 어떻게 반응하는지 기록하며\n천천히 조정",
    durationInSeconds: 7.18,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 19. 세 번째, 식단 — 세 가지만 (112.40~121.58)
  {
    type: "highlight",
    text: "식단은 이것만 기억하면 된다",
    bullets: ["전체 칼로리", "단백질", "자연식품"],
    durationInSeconds: 9.18,
    accent: "#6c5ce7",
    characterImage: "char-09.png",
  },
  // 20. 가공식품 vs 자연식품 (121.58~129.34)
  {
    type: "compare",
    text: "가공식품 vs 자연식품",
    compareData: {
      left: { title: "가공식품", description: "칼로리는 높은데\n미량영양소는 거의 없다" },
      right: { title: "자연식품", description: "같은 칼로리에\n영양 밀도가 훨씬 높다" },
    },
    durationInSeconds: 7.76,
    accent: "#4A90D9",
    characterImage: "char-10.png",
  },
  // 21. 가공식품 10%↑마다 영양 질 저하 (129.34~135.22)
  {
    type: "text",
    text: "가공식품 10% 더 먹을 때마다",
    subtitle: "식단 전체의 영양의 질이",
    description: "상당히 낮아진다는 분석",
    durationInSeconds: 5.88,
    accent: "#e17055",
    characterImage: "char-01.png",
  },
  // 22. 가공→자연 바꾸면 영양제 불필요 (135.22~139.76)
  {
    type: "text",
    text: "자연식품으로 바꾸기만 해도",
    subtitle: "영양제 몇 알에 매달릴 필요가 없다",
    durationInSeconds: 4.54,
    accent: "#00b894",
    characterImage: "char-02.png",
  },
  // 23. 가장 많이 하는 실수: 유산소 (139.76~149.70)
  {
    type: "text",
    text: "가장 많이 하는 실수",
    subtitle: "바로 유산소",
    description: "지방 태우는 마법으로 착각하고\n웨이트 버린 채 러닝머신만",
    durationInSeconds: 9.94,
    accent: "#e17055",
    characterImage: "char-03.png",
  },
  // 24. 근육 13kcal vs 지방 4.5kcal (149.70~155.72)
  {
    type: "beforeAfterChart",
    text: "가만있어도 쓰는 칼로리",
    beforeAfterData: [{ label: "지방 1kg", before: 0, after: 4.5 }, { label: "근육 1kg", before: 0, after: 13 }],
    unit: "kcal",
    durationInSeconds: 6.02,
    accent: "#00b894",
    characterImage: "char-04.png",
  },
  // 25. 근육 많을수록 하루 종일 더 태움 (155.72~158.96)
  {
    type: "text",
    text: "근육이 많을수록",
    subtitle: "가만히 있어도 하루 종일 더 태운다",
    durationInSeconds: 3.24,
    accent: "#00b894",
    characterImage: "char-05.png",
  },
  // 26. 유산소는 보조 수단 (158.96~165.66)
  {
    type: "text",
    text: "유산소는 보조 수단",
    subtitle: "지방을 녹이는 도구가 아니라",
    description: "조금 더 먹으면서도 날씬함을\n유지하게 도와주는 쪽",
    durationInSeconds: 6.7,
    accent: "#4A90D9",
    characterImage: "char-06.png",
  },
  // 27. 숨넘어가게 안 뛰어도, 걷기로 시작 (165.66~172.26)
  {
    type: "text",
    text: "숨넘어가게 뛸 필요 없다",
    subtitle: "걸음 수를 늘리고",
    description: "밥 먹고 10~15분만 걷는 걸로\n시작해도 충분",
    durationInSeconds: 6.6,
    accent: "#4A90D9",
    characterImage: "char-07.png",
  },
  // 28. 범스테드도 올림피아 준비 땐 걷기 20분→1.5시간 (172.26~179.24)
  {
    type: "timeline",
    text: "범스테드의 올림피아 유산소",
    steps: [
      { label: "느린 속도로 걷기", description: "달리기 아님" },
      { label: "처음 20분", description: "짧게 시작" },
      { label: "1시간~1시간 반", description: "점진적으로 늘림" },
    ],
    durationInSeconds: 6.98,
    accent: "#6c5ce7",
    characterImage: "char-08.png",
  },
  // 29. 네 번째, 운동 — 흔한 속설 (179.24~184.30)
  {
    type: "text",
    text: "네 번째, 운동",
    subtitle: "커팅할 때 흔한 속설 하나",
    durationInSeconds: 5.06,
    accent: "#00b894",
    characterImage: "char-09.png",
  },
  // 30. 가벼운 고반복이 선명? → 근육 깎는 지름길 (184.30~189.58)
  {
    type: "text",
    text: "\"가벼운 무게로 많이 들어야 선명해진다\"",
    subtitle: "이게 오히려",
    description: "근육을 깎아먹는 지름길",
    durationInSeconds: 5.28,
    accent: "#e17055",
    characterImage: "char-10.png",
  },
  // 31. 무게 낮추고 고반복 → 근력·근육 같이 빠짐 (189.58~194.64)
  {
    type: "text",
    text: "무게를 확 낮추면",
    subtitle: "근력이 빠지고",
    description: "근육도 같이 빠진다",
    durationInSeconds: 5.06,
    accent: "#e17055",
    characterImage: "char-01.png",
  },
  // 32. 커팅 중에도 무겁게, 강도 오래 유지 (194.64~202.60)
  {
    type: "text",
    text: "커팅 중에도 무겁게",
    subtitle: "운동 강도를 최대한 오래 유지",
    description: "그래야 몸이 \"이 근육은 꼭 필요하구나\"\n하고 지켜낸다",
    durationInSeconds: 7.96,
    accent: "#00b894",
    characterImage: "char-02.png",
  },
  // 33. 가능하면 점진적 과부하도 지속 (202.60~206.72)
  {
    type: "text",
    text: "살 빼는 중에도",
    subtitle: "조금씩 더 드는 점진적 과부하",
    durationInSeconds: 4.12,
    accent: "#00b894",
    characterImage: "char-03.png",
  },
  // 34. 왜 다들 실패? 음식으로 감정 채우기 (206.72~214.72)
  {
    type: "text",
    text: "이렇게 단순한데 왜 실패할까",
    subtitle: "의외의 데서 이유를 찾는다",
    description: "많은 경우, 음식으로\n감정을 채우기 때문",
    durationInSeconds: 8.0,
    accent: "#e17055",
    characterImage: "char-04.png",
  },
  // 35. 명상·호흡·상담이 더 필요할 수도 (214.72~225.82)
  {
    type: "text",
    text: "허무할 때, 외로울 때",
    subtitle: "그걸 먹는 걸로 메꾼다",
    description: "때로는 최고의 식단 프로그램보다\n명상·호흡·상담이 더 필요할 수 있다",
    durationInSeconds: 11.1,
    accent: "#6c5ce7",
    characterImage: "char-05.png",
  },
  // 36. 결정을 줄여라 — 루틴화 (225.82~236.62)
  {
    type: "text",
    text: "결정을 줄여라",
    subtitle: "매일 뭘 먹을지 고민하는 순간이",
    description: "다 의지력 소모\n같은 시간, 비슷한 음식, 정해진 루틴",
    durationInSeconds: 10.8,
    accent: "#4A90D9",
    characterImage: "char-06.png",
  },
  // 37. 올림피아 준비가 오히려 더 쉬웠던 이유 (236.62~241.90)
  {
    type: "text",
    text: "올림피아 준비가 더 쉬웠다",
    subtitle: "모든 게 정해져 있으니까",
    durationInSeconds: 5.28,
    accent: "#ffd93d",
    characterImage: "char-07.png",
  },
  // 38. 외식 팁: 스테이크+채소, 버터 빼기 (241.90~248.50)
  {
    type: "text",
    text: "외식·여행은 이렇게",
    subtitle: "스테이크에 채소",
    description: "버터는 빼고 구워달라고 하기",
    durationInSeconds: 6.6,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 39. 소스·기름·버터로 칼로리↑, 나가기 전 쉐이크 (248.50~257.62)
  {
    type: "text",
    text: "식당 음식은 생각보다 고칼로리",
    subtitle: "소스·기름·버터로 덮여 있다",
    description: "나가기 전 단백질 쉐이크 한 잔이면\n식욕이 눌려 과식을 막아준다",
    durationInSeconds: 9.12,
    accent: "#4A90D9",
    characterImage: "char-09.png",
  },
  // 40. 마지막, 정체기 — 몸은 적응한다 (257.62~266.12)
  {
    type: "text",
    text: "마지막, 정체기",
    subtitle: "다 완벽하게 해도 몸은 적응한다",
    description: "어느 순간 체중이 안 빠지는 때가\n반드시 온다",
    durationInSeconds: 8.5,
    accent: "#e17055",
    characterImage: "char-10.png",
  },
  // 41. 재급식으로 처진 대사 깨우기 (266.12~270.74)
  {
    type: "text",
    text: "일주일 정도 재급식",
    subtitle: "칼로리를 살짝 다시 올려",
    description: "처진 대사를 깨워준다",
    durationInSeconds: 4.62,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 42. 끝낼 신호: 수행능력·성장·잠의 질 저하 (270.74~283.82)
  {
    type: "highlight",
    text: "다이어트를 끝낼 신호",
    bullets: ["헬스장 수행능력이 떨어진다", "근성장이 멈춘다", "잠의 질이 나빠진다"],
    bulletDescriptions: ["이 신호가 오면 멈춰야 한다", "", "삶을 망가뜨리면서까지 할 건 아니다"],
    durationInSeconds: 13.08,
    accent: "#e17055",
    characterImage: "char-02.png",
  },
  // 43. 결론 요약 (283.82~293.24)
  {
    type: "highlight",
    text: "결국, 정말 간단하다",
    bullets: ["기록하고", "조금만 덜 먹고", "단백질 챙기고", "무겁게 운동하고", "많이 걷고"],
    durationInSeconds: 9.42,
    accent: "#00b894",
    characterImage: "char-03.png",
  },
  // 44. 가장 큰 적: 배고픔, 이기는 법 2개 (293.24~299.94)
  {
    type: "text",
    text: "가장 힘들게 만드는 적",
    subtitle: "바로 배고픔",
    description: "이기는 방법은 두 가지\n관점, 그리고 음식",
    durationInSeconds: 6.7,
    accent: "#e17055",
    characterImage: "char-04.png",
  },
  // 45. 관점 전환 (299.94~309.68)
  {
    type: "text",
    text: "\"지금 체지방이 빠지고 있구나\"",
    subtitle: "\"배고파 죽겠다\"가 아니라",
    description: "그 공복감은 몸이 지방을\n꺼내 쓰고 있다는 신호",
    durationInSeconds: 9.74,
    accent: "#6c5ce7",
    characterImage: "char-05.png",
  },
  // 46. 부피 큰 저칼로리 음식 (309.68~317.26)
  {
    type: "text",
    text: "부피로 채운다",
    subtitle: "상추 같은 잎채소, 살사처럼",
    description: "칼로리는 거의 없는데 부피가 큰 음식\n적게 먹어도 입이 심심하지 않게",
    durationInSeconds: 7.58,
    accent: "#00b894",
    characterImage: "char-06.png",
  },
  // 47. 포만감 압도하는 건 단백질 (317.26~326.74)
  {
    type: "text",
    text: "이 모든 걸 압도하는 하나",
    subtitle: "바로 단백질",
    description: "고단백 식단은 배고픔을 눌러주고\n다이어트 중 근육까지 지켜준다",
    durationInSeconds: 9.48,
    accent: "#ffd93d",
    characterImage: "char-07.png",
  },
  // 48. 닭가슴살 매끼 어려움 → 프로틴 한 스쿱 (326.74~338.14)
  {
    type: "text",
    text: "매 끼 닭가슴살은 쉽지 않다",
    subtitle: "가장 간편하고 확실한 방법",
    description: "프로틴 한 스쿱\n칼로리는 낮게, 단백질은 쏙",
    durationInSeconds: 11.4,
    accent: "#00b894",
    characterImage: "char-08.png",
  },
  // 49. 마프 10/10 타임세일 일정 (338.14~347.00)
  {
    type: "text",
    text: "지금이 프로틴 쟁여둘 때",
    subtitle: "마이프로틴 10/10 마프 대란",
    description: "10월 9일 금 저녁 7시 ~\n10월 10일 토 밤 11시 59분",
    durationInSeconds: 8.86,
    accent: "#ffd93d",
    characterImage: "char-09.png",
  },
  // 50. 할인 상세 (347.00~359.36)
  {
    type: "highlight",
    text: "고정 댓글 링크로 접속",
    bullets: ["최대 80% 할인", "할인코드 팀MP로 40% 추가", "트렌드 제품 담으면 5% 더", "금액대별 사은품 최대 2개"],
    durationInSeconds: 12.36,
    accent: "#f39c12",
    characterImage: "char-10.png",
  },
  // 51. 단백질 1년치 쟁여둘 기회 (359.36~363.80)
  {
    type: "text",
    text: "체지방 감량의 핵심, 단백질",
    subtitle: "1년치 쟁여둘 기회",
    description: "이 타이밍, 놓치지 마세요",
    durationInSeconds: 4.44,
    accent: "#ffd93d",
    characterImage: "char-01.png",
  },
  // 52. 아웃트로 (363.80~370.47)
  {
    type: "text",
    text: "구독·좋아요·알림·하이프",
    subtitle: "오늘도 득근하는 하루",
    durationInSeconds: 6.67,
    accent: "#4A90D9",
    characterImage: "char-02.png",
  },
];
