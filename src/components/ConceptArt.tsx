// ============================================================
//  ConceptArt — 핵심 개념/로직 전용 "큰" 커스텀 SVG 일러스트 세트
//  Icons.tsx(24px 작은 라인아이콘)와 달리, 화면 중앙을 채우는 개념도.
//  viewBox 120, stroke 기반, accent color 통일. 장면마다 개념을 '그려서' 설명.
//  신규 개념이 필요하면 같은 스타일(viewBox 120, strokeWidth 3~3.5)로 여기에 추가.
// ============================================================
import React from "react";

export type ConceptArtName =
  | "grip"       // 손아귀 악력 — 바를 꽉 쥔 손
  | "spine"      // 척추 코르셋 — 척추를 감싸는 코어
  | "balance"    // 균형 — 좌우 평형추
  | "link"       // 상관/연결 — 두 원을 잇는 사슬
  | "carry"      // 들고 걷기 — 양손 중량 + 발걸음
  | "fullbody"   // 전신 — 사람 실루엣 + 활성 포인트
  | "posture"    // 자세 교정 — 굽은 등 → 편 등
  | "bottleneck" // 병목 — 넓다가 좁아지는 깔때기
  | "cardio"     // 심폐 — 심장 + 파동
  | "mental";    // 멘탈/인내 — 오르막 + 깃발

const Svg: React.FC<{ children: React.ReactNode; color: string; size: number }> = ({
  children,
  color,
  size,
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    stroke={color}
    strokeWidth={3.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    style={{ filter: `drop-shadow(0 0 18px ${color}44)` }}
  >
    {children}
  </svg>
);

function paths(name: ConceptArtName, c: string) {
  switch (name) {
    case "grip":
      // 수평 바 + 감싸쥔 손가락 4 + 엄지
      return (
        <>
          <line x1="18" y1="60" x2="102" y2="60" strokeWidth="7" />
          <path d="M40 60 v-16 a6 6 0 0 1 12 0 v16" />
          <path d="M54 60 v-20 a6 6 0 0 1 12 0 v20" />
          <path d="M68 60 v-18 a6 6 0 0 1 12 0 v18" />
          <path d="M82 60 v-13 a6 6 0 0 1 12 0 v13" />
          <path d="M40 62 q-14 2 -14 14 q0 10 12 10" />
        </>
      );
    case "spine":
      // 척추(마디) + 좌우에서 감싸는 코르셋 괄호
      return (
        <>
          <path d="M60 20 v80" strokeDasharray="0.1 14" strokeWidth="4" />
          {[28, 44, 60, 76, 92].map((y, i) => (
            <circle key={i} cx="60" cy={y} r="4.5" fill={c} stroke="none" />
          ))}
          <path d="M38 26 q-14 34 0 68" />
          <path d="M82 26 q14 34 0 68" />
        </>
      );
    case "balance":
      // 받침점 + 수평 바 + 좌우 추
      return (
        <>
          <path d="M60 40 v6" />
          <path d="M30 46 h60" strokeWidth="5" />
          <path d="M48 100 L60 46 L72 100" />
          <rect x="22" y="46" width="20" height="20" rx="3" />
          <rect x="78" y="46" width="20" height="20" rx="3" />
        </>
      );
    case "link":
      // 두 원 + 가운데 사슬 고리 (상관/연결)
      return (
        <>
          <circle cx="30" cy="60" r="20" />
          <circle cx="90" cy="60" r="20" />
          <path d="M46 54 h12 a6 6 0 0 1 0 12 h-12" />
          <path d="M74 54 h-12 a6 6 0 0 0 0 12 h12" />
        </>
      );
    case "carry":
      // 가운데 사람 + 양손 중량 블록 + 발걸음 바닥선
      return (
        <>
          <circle cx="60" cy="26" r="9" />
          <path d="M60 35 v34" />
          <path d="M60 42 H30 M60 42 H90" />
          <rect x="18" y="46" width="20" height="22" rx="3" />
          <rect x="82" y="46" width="20" height="22" rx="3" />
          <path d="M60 69 l-12 24 M60 69 l12 24" />
          <path d="M26 104 h68" strokeDasharray="2 12" strokeWidth="4" />
        </>
      );
    case "fullbody":
      // 사람 실루엣 + 활성 포인트(점)
      return (
        <>
          <circle cx="60" cy="22" r="10" />
          <path d="M60 32 v38 M60 44 l-22 10 M60 44 l22 10 M60 70 l-16 32 M60 70 l16 32" />
          {[
            [38, 54],
            [82, 54],
            [60, 56],
            [44, 102],
            [76, 102],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5.5" fill={c} stroke="none" />
          ))}
        </>
      );
    case "posture":
      // 굽은 척추(붉은 느낌은 색으로) → 화살표 → 곧은 척추
      return (
        <>
          <path d="M30 24 q-10 28 2 54 q4 10 14 14" />
          <path d="M86 24 v68" />
          <path d="M56 58 h12 M62 52 l8 6 -8 6" />
        </>
      );
    case "bottleneck":
      // 깔때기 — 넓다가 좁아짐 (병목)
      return (
        <>
          <path d="M24 26 H96 L68 64 V96 H52 V64 Z" />
          <path d="M52 96 h16" />
        </>
      );
    case "cardio":
      // 심장 + 심박 파형
      return (
        <>
          <path d="M60 92 C30 70 24 48 36 38 C46 30 58 36 60 46 C62 36 74 30 84 38 C96 48 90 70 60 92 Z" />
          <path d="M20 60 h14 l6 -14 8 28 7 -14 h45" strokeWidth="3.6" />
        </>
      );
    case "mental":
      // 오르막 + 정상 깃발 (버티고 한 걸음 더)
      return (
        <>
          <path d="M18 100 L78 32" strokeWidth="4" />
          <path d="M18 100 H104" strokeDasharray="2 12" strokeWidth="4" />
          <path d="M78 32 v-18 l20 7 -20 7" />
          <circle cx="46" cy="66" r="5.5" fill={c} stroke="none" />
        </>
      );
  }
}

export const ConceptArt: React.FC<{
  name: ConceptArtName;
  color: string;
  size?: number;
}> = ({ name, color, size = 220 }) => (
  <Svg color={color} size={size}>
    {paths(name, color)}
  </Svg>
);

export const CONCEPT_ART_NAMES: ConceptArtName[] = [
  "grip", "spine", "balance", "link", "carry",
  "fullbody", "posture", "bottleneck", "cardio", "mental",
];
