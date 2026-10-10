import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
} from "remotion";
import { Scene } from "../data/script";
import { Icon, IconName } from "../components/Icons";

// 아이콘 + 라벨 카드 하나
const IconCard: React.FC<{
  icon: IconName;
  label: string;
  desc?: string;
  accent: string;
  frame: number;
  fps: number;
  delay: number;
  big: boolean;
  compact?: boolean;
}> = ({ icon, label, desc, accent, frame, fps, delay, big, compact }) => {
  const pop = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slideY = interpolate(frame, [delay, delay + 16], [28, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${pop}) translateY(${slideY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: big ? 20 : compact ? 12 : 14,
        padding: big ? "40px 28px" : compact ? "24px 14px" : "30px 20px",
        borderRadius: 20,
        backgroundColor: `${accent}1f`,
        border: `1px solid ${accent}33`,
      }}
    >
      {/* 아이콘 원형 배경 */}
      <div
        style={{
          width: big ? 128 : compact ? 88 : 104,
          height: big ? 128 : compact ? 88 : 104,
          borderRadius: "50%",
          backgroundColor: `${accent}26`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: `drop-shadow(0 0 14px ${accent}55)`,
        }}
      >
        <Icon name={icon} color={accent} size={big ? 72 : compact ? 48 : 58} />
      </div>
      <span
        style={{
          fontSize: big ? 48 : compact ? 36 : 40,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "SCDream",
          textAlign: "center",
          wordBreak: "keep-all" as const,
          lineHeight: 1.25,
        }}
      >
        {label}
      </span>
      {desc && (
        <span
          style={{
            fontSize: big ? 30 : 26,
            fontWeight: 500,
            color: "#8a8f98",
            fontFamily: "SCDream",
            textAlign: "center",
            wordBreak: "keep-all" as const,
            whiteSpace: "pre-line",
            lineHeight: 1.3,
          }}
        >
          {desc}
        </span>
      )}
    </div>
  );
};

export const IconGridScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const items = scene.iconItems || [];
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 열 수: 항목 수에 맞춰 "한 줄에 균형있게" 배치 (2+1 깨짐 방지)
  //  - 세로(숏폼): 최대 2열
  //  - 가로(롱폼): 3개=3열, 4개=2열, 5개=3열, 그 외 min(n,3)
  //  - 캐릭터 유무와 무관하게 홀수(3·5)는 3열 가로배치
  const n = items.length;
  const colsFor = (cnt: number) => {
    if (isVertical) return Math.min(cnt, 2);
    if (cnt === 4) return 2; // 4개는 2x2가 균형
    return Math.min(cnt, 3); // 3·5개 → 3열, 2개 → 2열
  };
  const cols = colsFor(n);
  // 3열 + 캐릭터면 카드 폭이 좁아지므로 카드 내부를 축소(big=false)
  const big = n <= 3 && !hasChar && cols < 3;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", transform: `scale(${sceneZoom})` }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // 3열+캐릭터는 콘텐츠 폭이 더 필요 → 캐릭터 쪽 여백을 18%로 완화
          right: hasChar ? (cols >= 3 ? "17%" : "23%") : 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "40px" : cols >= 3 && hasChar ? "70px 36px" : "70px 60px",
          overflow: "hidden",
        }}
      >
        {/* 타이틀 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: isVertical ? 100 : 68,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            lineHeight: 1.35,
            whiteSpace: "pre-line",
            maxWidth: "100%",
            marginBottom: scene.description ? 14 : 44,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {scene.description && (
          <div
            style={{
              opacity: interpolate(frame, [16, 28], [0, 1], { extrapolateRight: "clamp" }),
              fontSize: isVertical ? 48 : 34,
              fontWeight: 500,
              color: "#8a8f98",
              fontFamily: "SCDream",
              textAlign: "center",
              marginBottom: 44,
              whiteSpace: "pre-line",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.description}
          </div>
        )}

        {/* 아이콘 그리드 — 열 수에 맞춰 최대폭 조정(3열은 넓게) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: isVertical ? 24 : cols >= 3 ? 20 : 28,
            width: "100%",
            maxWidth: hasChar ? (cols >= 3 ? 1060 : 760) : (cols >= 3 ? 1180 : 820),
          }}
        >
          {items.map((it, i) => (
            <IconCard
              key={i}
              icon={it.icon as IconName}
              label={it.label}
              desc={it.desc}
              accent={accent}
              frame={frame}
              fps={fps}
              delay={28 + i * 10}
              big={big}
              compact={cols >= 3 && hasChar}
            />
          ))}
        </div>
      </div>

      {hasChar && (
        <Img
          src={staticFile(scene.characterImage!)}
          style={{
            position: "absolute",
            right: "5%",
            bottom: 0,
            height: "95%",
            opacity: interpolate(frame, [3, 15], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [3, 15], [40, 0], { extrapolateRight: "clamp" })}px)`,
            objectFit: "contain",
            objectPosition: "center bottom",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
