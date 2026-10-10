import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
} from "remotion";
import { Scene, ConceptNode } from "../data/script";
import { ConceptArt, ConceptArtName } from "../components/ConceptArt";
import { Icon, IconName } from "../components/Icons";

// 노드 하나의 글리프 렌더: art > emoji > icon 우선순위
const Glyph: React.FC<{ node: ConceptNode; color: string; size: number }> = ({
  node,
  color,
  size,
}) => {
  if (node.art) return <ConceptArt name={node.art as ConceptArtName} color={color} size={size} />;
  if (node.emoji)
    return (
      <span style={{ fontSize: size * 0.82, lineHeight: 1, filter: `drop-shadow(0 0 16px ${color}44)` }}>
        {node.emoji}
      </span>
    );
  if (node.icon)
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: `${color}26`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={node.icon as IconName} color={color} size={size * 0.56} />
      </div>
    );
  return null;
};

export const ConceptArtScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#6c5ce7";
  const hasChar = Boolean(scene.characterImage);
  const isVertical = width < 1200;

  const nodes = scene.conceptNodes || [];
  const layout: "flow" | "hero" =
    scene.conceptLayout || (nodes.length > 0 ? "flow" : "hero");

  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateRight: "clamp" });

  // 캐릭터 있으면 글리프/노드를 약간 축소
  const heroSize = isVertical ? 420 : hasChar ? 300 : 380;
  const nodeSize = isVertical ? 190 : hasChar ? 150 : 180;

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", transform: `scale(${sceneZoom})` }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: hasChar ? "20%" : 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "40px" : "60px 60px",
          overflow: "hidden",
        }}
      >
        {/* 타이틀 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: isVertical ? 96 : 66,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            lineHeight: 1.3,
            whiteSpace: "pre-line",
            maxWidth: "100%",
            marginBottom: isVertical ? 48 : 54,
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>

        {/* HERO 레이아웃 — 단일 큰 상징 */}
        {layout === "hero" && (
          <HeroGlyph
            scene={scene}
            accent={accent}
            size={heroSize}
            frame={frame}
            fps={fps}
          />
        )}

        {/* FLOW 레이아웃 — 노드 + 화살표 연결 */}
        {layout === "flow" && (
          <div
            style={{
              display: "flex",
              flexDirection: isVertical ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              gap: isVertical ? 20 : 10,
              width: "100%",
              flexWrap: "nowrap",
            }}
          >
            {nodes.map((node, i) => {
              const delay = 22 + i * 20;
              return (
                <FlowItem
                  key={i}
                  node={node}
                  accent={accent}
                  size={nodeSize}
                  frame={frame}
                  fps={fps}
                  delay={delay}
                  showArrow={i < nodes.length - 1}
                  vertical={isVertical}
                />
              );
            })}
          </div>
        )}
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

// 단일 히어로 상징 + 캡션(subtitle)
const HeroGlyph: React.FC<{
  scene: Scene;
  accent: string;
  size: number;
  frame: number;
  fps: number;
}> = ({ scene, accent, size, frame, fps }) => {
  const pop = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const breathe = 1 + Math.sin(frame / 22) * 0.02;

  const node: ConceptNode = {
    art: scene.conceptArt,
    emoji: scene.conceptEmoji,
    label: "",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <div style={{ transform: `scale(${pop * breathe})`, display: "flex" }}>
        <Glyph node={node} color={accent} size={size} />
      </div>
      {scene.subtitle && (
        <div
          style={{
            opacity: interpolate(frame, [34, 48], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 48,
            fontWeight: 700,
            color: accent,
            fontFamily: "SCDream",
            textAlign: "center",
            wordBreak: "keep-all" as const,
            whiteSpace: "pre-line",
            lineHeight: 1.3,
          }}
        >
          {scene.subtitle}
        </div>
      )}
    </div>
  );
};

// 플로우 노드 하나 + (뒤에 화살표)
const FlowItem: React.FC<{
  node: ConceptNode;
  accent: string;
  size: number;
  frame: number;
  fps: number;
  delay: number;
  showArrow: boolean;
  vertical: boolean;
}> = ({ node, accent, size, frame, fps, delay, showArrow, vertical }) => {
  const color = node.color || accent;
  const pop = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: "clamp" });

  const arrowDelay = delay + 12;
  const arrowOpacity = interpolate(frame, [arrowDelay, arrowDelay + 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          opacity,
          transform: `scale(${pop})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          minWidth: size + 20,
        }}
      >
        <div style={{ height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Glyph node={node} color={color} size={size} />
        </div>
        <span
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            textAlign: "center",
            wordBreak: "keep-all" as const,
            lineHeight: 1.2,
          }}
        >
          {node.label}
        </span>
        {node.sub && (
          <span
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#8a8f98",
              fontFamily: "SCDream",
              textAlign: "center",
              wordBreak: "keep-all" as const,
            }}
          >
            {node.sub}
          </span>
        )}
      </div>

      {showArrow && (
        <div
          style={{
            opacity: arrowOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
            flexShrink: 0,
            transform: vertical ? "rotate(90deg)" : "none",
            margin: vertical ? "4px 0" : "0 4px",
            marginBottom: vertical ? 4 : 56, // 라벨 높이만큼 글리프 중앙에 맞춤(가로)
          }}
        >
          <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
            <path
              d="M6 20 H44 M34 10 L46 20 L34 30"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 0 6px ${accent}66)` }}
            />
          </svg>
        </div>
      )}
    </>
  );
};
