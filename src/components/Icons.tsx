// ============================================================
//  개념 SVG 아이콘 세트 — 헬스/다이어트 인포그래픽용
//  모두 stroke 기반 라인 아이콘(1 viewBox=24). color prop으로 accent 통일.
//  수치 없이 개념을 그림으로 표현할 때 사용 (IconGridScene 등).
// ============================================================
import React from "react";

export type IconName =
  | "scale"      // 체중계 (측정)
  | "note"       // 기록/메모
  | "plate"      // 식단(접시+포크나이프)
  | "run"        // 유산소/걷기
  | "dumbbell"   // 웨이트
  | "clock"      // 시간/루틴
  | "heart"      // 심장/건강
  | "meat"       // 단백질
  | "leaf"       // 자연식품/채소
  | "flame"      // 대사/연소
  | "brain"      // 멘탈/감정
  | "sleep"      // 수면
  | "up"         // 증가
  | "down"       // 감소
  | "warning"    // 경고/실수
  | "check"      // 정답/체크
  | "target"     // 목표/기준점
  | "calendar"   // 주간/정체기
  | "shaker"     // 프로틴 쉐이커
  | "drop"       // 지방/수분
  | "muscle"     // 근육
  | "bulb";      // 아이디어/비결

const S: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7}
    strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    {children}
  </svg>
);

export const Icon: React.FC<{ name: IconName; color: string; size?: number }> = ({
  name, color, size = 72,
}) => {
  const box = { width: size, height: size, display: "flex" } as const;
  return (
    <div style={box}>
      {render(name, color)}
    </div>
  );
};

function render(name: IconName, c: string) {
  switch (name) {
    case "scale":
      return <S color={c}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M12 4v3" /><path d="M8 11a4 4 0 0 1 8 0" /><circle cx="12" cy="11" r="0.6" fill={c} /></S>;
    case "note":
      return <S color={c}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></S>;
    case "plate":
      return <S color={c}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3.2" /><path d="M3 12h2M19 12h2" /></S>;
    case "run":
      return <S color={c}><circle cx="14" cy="5" r="1.6" /><path d="M13 8l-3 3 2 2 1 4" /><path d="M10 11l-3 1" /><path d="M14 13l3 1" /><path d="M12 17l-2 3" /></S>;
    case "dumbbell":
      return <S color={c}><path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" /></S>;
    case "clock":
      return <S color={c}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></S>;
    case "heart":
      return <S color={c}><path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5c0 5-7 9.5-7 9.5z" /></S>;
    case "meat":
      return <S color={c}><path d="M7 17a5 5 0 0 1 0-10c4 0 5 2 8 2a3 3 0 0 1 0 6c-3 0-4 2-8 2z" /><circle cx="6" cy="18" r="1.5" /></S>;
    case "leaf":
      return <S color={c}><path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13z" /><path d="M5 19c3-5 6-7 10-9" /></S>;
    case "flame":
      return <S color={c}><path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 1 1.5 1.5 2 1 0-2-1-4 1-6z" /></S>;
    case "brain":
      return <S color={c}><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 4 3 3 0 0 0 5 1" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 4 3 3 0 0 1-5 1" /><path d="M12 4v16" /></S>;
    case "sleep":
      return <S color={c}><path d="M20 14a8 8 0 1 1-9-9 6 6 0 0 0 9 9z" /><path d="M15 5h3l-3 3h3" /></S>;
    case "up":
      return <S color={c}><path d="M4 17l6-6 4 4 6-7" /><path d="M16 8h4v4" /></S>;
    case "down":
      return <S color={c}><path d="M4 7l6 6 4-4 6 7" /><path d="M16 16h4v-4" /></S>;
    case "warning":
      return <S color={c}><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17h.01" /></S>;
    case "check":
      return <S color={c}><circle cx="12" cy="12" r="8.5" /><path d="M8 12l3 3 5-6" /></S>;
    case "target":
      return <S color={c}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill={c} /></S>;
    case "calendar":
      return <S color={c}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /><path d="M8 13h2M14 13h2M8 17h2" /></S>;
    case "shaker":
      return <S color={c}><path d="M8 8h8l-1 12H9z" /><path d="M8 8l1-4h6l1 4" /><path d="M8.5 12h7" /></S>;
    case "drop":
      return <S color={c}><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" /></S>;
    case "muscle":
      return <S color={c}><path d="M4 10c2-1 4-1 5 1 3-3 6-4 11-3-1 2-2 3-4 3 1 2 1 5-2 6-4 1-7-1-8-4-1 0-2-1-2-3z" /></S>;
    case "bulb":
      return <S color={c}><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 1 4 10c-1 1-1 2-1 3H9c0-1 0-2-1-3a6 6 0 0 1 4-10z" /></S>;
    default:
      return <S color={c}><circle cx="12" cy="12" r="8" /></S>;
  }
}
