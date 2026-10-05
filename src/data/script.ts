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

// 브이 vs 펜듈럼 vs 핵스쿼트 (오디오 260924.mp4 = 259.26초)
export const SCENES: Scene[] = [
  // 1. 훅: 스쿼트 기계 3개, 아무거나 타면 헛수고 (0~9.64)
  {
    type: "text",
    text: "똑같이 생긴\n스쿼트 기계 세 개",
    subtitle: "아무거나 타면 헛수고",
    description: "노리는 근육도, 관절 부담도\n제각각입니다",
    durationInSeconds: 9.64,
    accent: "#ffd93d",
    characterImage: "scene-torso.png",
  },
  // 2. 공감: 뭘 메인으로 해야 할지 (9.64~18.62)
  {
    type: "highlight",
    text: "뭘 메인으로 해야 할까",
    description: "이런 고민, 한 번쯤 있으시죠",
    bullets: [
      "허벅지 앞? 뒤? 어디에 좋은지",
      "무릎·허리 안 아픈 건 뭔지",
      "초보가 붙어도 되는 건 뭔지",
    ],
    durationInSeconds: 8.98,
    accent: "#74b9ff",
    characterImage: "scene-legs.png",
  },
  // 3. 항목 예고: 4가지 기준 비교 (18.62~24.3)
  {
    type: "timeline",
    text: "네 가지 기준으로 쫙 비교",
    steps: [
      { label: "효과", description: "근성장 관점" },
      { label: "자세", description: "궤적과 움직임" },
      { label: "자극 부위", description: "어디에 실리나" },
      { label: "위험도", description: "관절 부담" },
    ],
    durationInSeconds: 5.68,
    accent: "#6c5ce7",
    characterImage: "scene-torso.png",
  },
  // 4. 효과 인트로 (24.3~28.42)
  {
    type: "text",
    text: "먼저, 근성장 효과",
    subtitle: "셋의 공통 강점부터",
    durationInSeconds: 4.12,
    accent: "#00b894",
    characterImage: "scene-hack1.png",
  },
  // 5. 공통 강점: 바벨은 허리·코어가 먼저 (28.42~39.7)
  {
    type: "compare",
    text: "왜 머신이 더 잘 클까",
    compareData: {
      left: {
        title: "바벨 스쿼트",
        description: "무게 오르면\n허리·코어가 먼저 방전\n다리 다 못 씀",
      },
      right: {
        title: "스쿼트 머신",
        description: "몸을 기대 궤적 고정\n방해 없이 다리를\n실패 지점까지",
      },
    },
    durationInSeconds: 11.28,
    accent: "#00b894",
    characterImage: "scene-v1.png",
  },
  // 6. 근비대 결론 (39.7~42.7)
  {
    type: "text",
    text: "셋 다 바벨보다\n근비대에 유리",
    subtitle: "여기서부터 성격이 갈린다",
    durationInSeconds: 3.0,
    accent: "#00b894",
    characterImage: "scene-torso.png",
  },
  // 7. 핵스쿼트: 사두 고립 최강 (42.7~48.28)
  {
    type: "imageText",
    text: "핵스쿼트",
    subtitle: "사두 고립 최강",
    description: "허벅지 앞쪽 하나만\n집중적으로 조진다",
    durationInSeconds: 5.58,
    accent: "#e17055",
    sceneImage: "scene-hack3.png",
  },
  // 8. 핵스쿼트: 고중량 때려박기 (48.28~58.08)
  {
    type: "imageText",
    text: "밸런스 걱정 없이 고중량",
    subtitle: "무릎 굽힘 위주",
    description: "등판에 몸을 고정해\n계속 무게를 올릴 수 있다\n앞쪽에 고중량 때려박기 최고",
    durationInSeconds: 9.8,
    accent: "#e17055",
    sceneImage: "scene-hack1.png",
  },
  // 9. 펜듈럼: 스트레치 자극 (58.08~70.5)
  {
    type: "imageText",
    text: "펜듈럼, 곡선 궤적",
    subtitle: "늘어난 지점에서 최대 장력",
    description: "근육이 쭉 늘어난 바닥에서 자극\n요즘 연구가 주목하는 스트레치 자극\n늘어난 채 부하받을수록 성장 유리",
    durationInSeconds: 12.42,
    accent: "#6c5ce7",
    sceneImage: "scene-pen1.png",
  },
  // 10. 펜듈럼: 종합 1티어 (70.5~77.88)
  {
    type: "imageStat",
    text: "허리 부담 최저 + 사두 장력 최대",
    statValue: "1티어",
    statLabel: "종합 근성장 최고로 꼽는 사람 많음\n단, 헬스장에 잘 없다",
    durationInSeconds: 7.38,
    accent: "#6c5ce7",
    sceneImage: "scene-pen2.png",
  },
  // 11. V스쿼트: 앞뒤 볼륨 동시 (77.88~89.86)
  {
    type: "imageText",
    text: "V스쿼트",
    subtitle: "앞뒤를 한 번에",
    description: "사두에 엉덩이·뒷허벅지까지\n하체 앞뒤 볼륨 동시에\n자세가 직관적이라 초보도 금방 적응",
    durationInSeconds: 11.98,
    accent: "#00cec9",
    sceneImage: "scene-v2.png",
  },
  // 12. 자세 인트로 (89.86~94.62)
  {
    type: "text",
    text: "이번엔 자세와 궤적",
    subtitle: "여기서 성격이 확 갈린다",
    durationInSeconds: 4.76,
    accent: "#fdcb6e",
    characterImage: "scene-torso.png",
  },
  // 13. 핵스쿼트 궤적: 직선 (94.62~102.98)
  {
    type: "imageText",
    text: "핵스쿼트: 직선 궤적",
    subtitle: "레일 위 썰매",
    description: "등을 패드에 붙이고\n정해진 트랙 위아래로 미끄러짐\n사두에 극한 스트레치",
    durationInSeconds: 8.36,
    accent: "#e17055",
    sceneImage: "scene-hack3.png",
  },
  // 14. 펜듈럼 궤적: 곡선 (102.98~115.72)
  {
    type: "imageText",
    text: "펜듈럼: 곡선 궤적",
    subtitle: "그네처럼 호를 그림",
    description: "곡선이라 힘 걸리는 지점이 바뀜\n바닥 깊은 구간에서 최대 장력\n등패드가 몸 따라 움직여 깊은 가동범위",
    durationInSeconds: 12.74,
    accent: "#6c5ce7",
    sceneImage: "scene-pen3.png",
  },
  // 15. V스쿼트 궤적: 분산 (115.72~122.24)
  {
    type: "imageText",
    text: "V스쿼트: V자 형태",
    subtitle: "하중을 골고루",
    description: "무릎·엉덩이·허리로 분산\n밸런스가 좋다",
    durationInSeconds: 6.52,
    accent: "#00cec9",
    sceneImage: "scene-v3.png",
  },
  // 16. 궤적 결론 (122.24~127.16)
  {
    type: "text",
    text: "이 궤적 차이가\n모든 걸 갈라놓는다",
    subtitle: "자극 부위 · 관절 부담",
    durationInSeconds: 4.92,
    accent: "#fdcb6e",
    characterImage: "scene-legs.png",
  },
  // 17. 자극 부위 인트로 + 핵 사두 편중 (127.16~136.92)
  {
    type: "muscleMap",
    text: "핵스쿼트, 자극 부위",
    subtitle: "철저한 사두 편중",
    muscleData: [
      { name: "대퇴사두", activation: 95, color: "#e17055" },
      { name: "둔근", activation: 30, color: "#8a8f98" },
      { name: "햄스트링", activation: 20, color: "#8a8f98" },
    ],
    description: "뒤쪽 근육 자극은 상대적으로 적다",
    durationInSeconds: 9.76,
    accent: "#e17055",
    characterImage: "scene-hack1.png",
  },
  // 18. 펜듈럼 타겟: 균형 (136.92~141.96)
  {
    type: "muscleMap",
    text: "펜듈럼, 자극 부위",
    subtitle: "사두 중심 + 균형",
    muscleData: [
      { name: "대퇴사두", activation: 85, color: "#6c5ce7" },
      { name: "대둔근", activation: 55, color: "#a29bfe" },
      { name: "내전근", activation: 50, color: "#a29bfe" },
    ],
    description: "안쪽 허벅지까지 좀 더 균형 있게",
    durationInSeconds: 5.04,
    accent: "#6c5ce7",
    characterImage: "scene-v1.png",
  },
  // 19. V스쿼트 타겟: 후면사슬 (141.96~151.58)
  {
    type: "muscleMap",
    text: "V스쿼트, 자극 부위",
    subtitle: "후면사슬 관여 최대",
    muscleData: [
      { name: "대퇴사두", activation: 80, color: "#00cec9" },
      { name: "둔근", activation: 75, color: "#00b894" },
      { name: "햄스트링", activation: 65, color: "#00b894" },
    ],
    description: "고관절 각도가 커서 앞뒤를 같이 쓴다",
    durationInSeconds: 9.62,
    accent: "#00cec9",
    characterImage: "scene-pen3.png",
  },
  // 20. 발 위치로 편집 (151.58~159.06)
  {
    type: "compare",
    text: "발 위치가 곧 스위치",
    compareData: {
      left: {
        title: "발 높이고 넓게",
        description: "둔근·햄스트링으로",
      },
      right: {
        title: "발 낮추고 좁게",
        description: "사두로 몰린다",
      },
    },
    durationInSeconds: 7.48,
    accent: "#fdcb6e",
    characterImage: "scene-v3.png",
  },
  // 21. 위험도 인트로 + 핵 주의 2가지 (159.06~171.5)
  {
    type: "highlight",
    text: "핵스쿼트, 주의 두 가지",
    bullets: [
      "무릎 완전히 펴 락 → 관절 스트레스",
      "등 떼거나 허리 말면 → 허리 위험",
    ],
    description: "이 두 개만 피하면 된다",
    durationInSeconds: 12.44,
    accent: "#e17055",
    characterImage: "scene-hack2.png",
  },
  // 22. EMG 연구: 핵스쿼트 안정성 (171.5~182.94)
  {
    type: "barChart",
    text: "2019년 근전도 연구",
    subtitle: "핵스쿼트, 뒤쪽 근육 활성도 최저",
    barData: [
      { label: "척추기립근", value: 42, color: "#e17055" },
      { label: "안쪽 햄스트링", value: 38, color: "#e17055" },
    ],
    description: "다른 스쿼트 머신보다 유의미하게 낮음\n뒤집으면 무릎·척추 건강엔 좋은 선택",
    durationInSeconds: 11.44,
    accent: "#e17055",
    characterImage: "scene-hack3.png",
  },
  // 23. 펜듈럼: 가장 관절 친화적 (182.94~192.8)
  {
    type: "imageStat",
    text: "펜듈럼, 관절 친화 1위",
    statValue: "주 2회",
    statLabel: "요추 전단력·세로 압박 완화\n회복 부담 적어 자주 넣을 수 있다",
    durationInSeconds: 9.86,
    accent: "#6c5ce7",
    sceneImage: "scene-pen2.png",
  },
  // 24. 펜듈럼도 방심 금지 (192.8~199.68)
  {
    type: "imageText",
    text: "순하다고 방심은 금물",
    description: "무게 확 올리기\n맨 위에서 무릎 락 걸기\n펜듈럼도 똑같이 조심",
    durationInSeconds: 6.88,
    accent: "#6c5ce7",
    sceneImage: "scene-pen3.png",
  },
  // 25. V스쿼트 주의: 무릎 방향 (199.68~211.2)
  {
    type: "imageText",
    text: "V스쿼트, 하중 분산형",
    subtitle: "관절 스트레스 낮음",
    description: "단, 발을 너무 넓게 벌리면\n무릎 안쪽에 스트레스\n무릎이 발끝 방향 따라가게",
    durationInSeconds: 11.52,
    accent: "#00cec9",
    sceneImage: "scene-v1.png",
  },
  // 26. 공통 기본기 (211.2~220.56)
  {
    type: "highlight",
    text: "세 기계 공통 기본기",
    bullets: [
      "맨 위에서 무릎 완전히 안 잠그기",
      "살짝 굽힌 채 멈추기",
      "무릎·발끝 방향 안 틀어지게",
    ],
    durationInSeconds: 9.36,
    accent: "#ffd93d",
    characterImage: "scene-legs.png",
  },
  // 27. 핵스쿼트 추천 대상 (220.56~229.92)
  {
    type: "imageStat",
    text: "이런 분은 핵스쿼트",
    statValue: "사두 극한",
    statLabel: "앞쪽 갈라지게 키우고 싶고\n고통 잘 참고 자세에 자신 있는 분",
    durationInSeconds: 9.36,
    accent: "#e17055",
    sceneImage: "scene-hack1.png",
  },
  // 28. 펜듈럼 추천 대상 (229.92~235.78)
  {
    type: "imageStat",
    text: "이런 분은 펜듈럼",
    statValue: "관절 보호",
    statLabel: "허리가 걱정되거나\n가장 관절 친화적인 걸 원하는 분",
    durationInSeconds: 5.86,
    accent: "#6c5ce7",
    sceneImage: "scene-pen2.png",
  },
  // 29. V스쿼트 추천 대상 (235.78~246.06)
  {
    type: "imageStat",
    text: "이런 분은 V스쿼트",
    statValue: "하체 전체",
    statLabel: "앞뒤 밸런스 좋게 키우고 싶고\n재활 중이거나 가동성 제한 있는 분",
    durationInSeconds: 10.28,
    accent: "#00cec9",
    sceneImage: "scene-v2.png",
  },
  // 30. 병행 팁 (246.06~252.16)
  {
    type: "text",
    text: "머신 하나만 하지 말고",
    subtitle: "프리웨이트와 섞으면 금상첨화",
    description: "바벨 스쿼트·런지와 함께",
    durationInSeconds: 6.1,
    accent: "#4A90D9",
    characterImage: "scene-legs.png",
  },
  // 31. 아웃트로 (252.16~259.26)
  {
    type: "text",
    text: "구독·좋아요·알림·하이프",
    subtitle: "오늘도 득근하는 하루",
    durationInSeconds: 7.1,
    accent: "#4A90D9",
    characterImage: "scene-torso.png",
  },
];
