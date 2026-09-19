import { Scene } from "./script";

// 260918_1.mp3 (NEAT — 앉아만 있는데 살 안 빠지는 이유) 기반
// ★ 숏폼 그래픽 중심 버전: 텍스트 최소화, 차트·도넛·아이콘 도식 위주.
// 전사(audio/result/260918_1_transcript.json) 타이밍. 총 39.34s, 9:16 세로, 캐릭터 미사용.
export const SHORTS_SCENES: Scene[] = [
  // 1. 후킹: 운동O·식단O 인데 살은 그대로 (0.00~3.64)
  {
    type: "compare",
    text: "다 하는데 왜?",
    durationInSeconds: 3.64,
    accent: "#e17055",
    compareData: {
      left: { title: "운동+식단", description: "열심히" },
      right: { title: "체중", description: "그대로" },
    },
  },

  // 2. 하루 24시간: 운동 1h vs 나머지 23h (3.64~6.78)
  {
    type: "donutChart",
    text: "하루 24시간",
    durationInSeconds: 3.14,
    accent: "#e17055",
    donutData: [
      { label: "나머지", value: 96, color: "#e17055" },
      { label: "운동", value: 4, color: "#4A90D9" },
    ],
  },

  // 3. 핵심 수치: 하루 소모 열량 격차 2000kcal (6.78~12.70)
  {
    type: "imageStat",
    text: "같은 체격, 하루 소모 격차",
    statValue: "2000kcal",
    statLabel: "연구로 확인된 최대 차이",
    durationInSeconds: 5.92,
    accent: "#ffd93d",
  },

  // 4. 정체 공개: NEAT (12.70~16.58)
  {
    type: "imageStat",
    text: "그 열쇠의 정체",
    statValue: "NEAT",
    statLabel: "운동이 아닌 일상 활동 대사",
    durationInSeconds: 3.88,
    accent: "#6c5ce7",
  },

  // 5. 니트 구성: 일상의 자잘한 움직임 (16.58~22.40)
  {
    type: "iconList",
    text: "이런 것들의 총합",
    durationInSeconds: 5.82,
    accent: "#00b894",
    bullets: ["서 있기", "걷기", "다리 떨기", "설거지"],
  },

  // 6. 앉아만 있으면 하루 대사량 바닥 (22.40~27.52)
  {
    type: "barChart",
    text: "하루 대사량 차이",
    description: "니트가 바닥이면 운동해도 부족",
    durationInSeconds: 5.12,
    accent: "#d63031",
    barData: [
      { label: "앉아만", value: 45, color: "#d63031" },
      { label: "많이 움직", value: 100, color: "#00b894" },
    ],
  },

  // 7. 날씬한 사람의 선택: 운동량 vs 니트 (27.52~30.78)
  {
    type: "compare",
    text: "날씬한 사람은",
    durationInSeconds: 3.26,
    accent: "#00b894",
    compareData: {
      left: { title: "운동량", description: "늘리기" },
      right: { title: "니트", description: "올리기" },
    },
  },

  // 8. 니트 올리는 법 4가지 (30.78~35.32)
  {
    type: "iconList",
    text: "니트 올리는 법",
    durationInSeconds: 4.54,
    accent: "#74b9ff",
    bullets: ["계단 이용", "서서 통화", "한 정거장 먼저", "식후 걷기"],
  },

  // 9. 마무리: 니트 누적 vs 운동 1h (35.32~39.34)
  {
    type: "barChart",
    text: "결국 이깁니다",
    description: "쌓인 니트 > 운동 1시간",
    durationInSeconds: 4.02,
    accent: "#ffd93d",
    barData: [
      { label: "운동 1h", value: 55, color: "#5a6270" },
      { label: "니트 누적", value: 100, color: "#ffd93d" },
    ],
  },
];
