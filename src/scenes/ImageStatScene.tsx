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

// 이미지 + 큰 수치 하나 강조
// - 캐릭터(characterImage)만 있는 경우: HighlightScene과 동일하게 캐릭터를 오른쪽에
//   꽉 차게 붙이고 콘텐츠(수치 그룹)는 왼쪽 영역을 채운다. (사방 여백 방지)
// - sceneImage(그래픽)가 있는 경우: 이미지와 수치 그룹을 화면 중앙에 나란히 배치.
export const ImageStatScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();
  const accent = scene.accent || "#00b894";
  const isVertical = width < 1200;

  const statScale = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 11, stiffness: 130 },
  });
  const statOpacity = interpolate(frame, [16, 28], [0, 1], { extrapolateRight: "clamp" });

  const labelDelay = 30;
  const labelOpacity = interpolate(frame, [labelDelay, labelDelay + 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const labelSlide = interpolate(frame, [labelDelay, labelDelay + 14], [20, 0], {
    extrapolateRight: "clamp",
  });

  // 메인 텍스트(text) 등장
  const textOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateRight: "clamp" });
  const textSlide = interpolate(frame, [4, 18], [-20, 0], { extrapolateRight: "clamp" });

  // statValue는 항상 한 줄(whiteSpace: nowrap). 폰트는 크게 유지하고, 값이 길 때만
  // 최소한으로 줄인다.
  const statLen = (scene.statValue || "").length;
  const baseStat = isVertical ? 200 : 220;
  let statFontSize = baseStat;
  if (statLen >= 8) statFontSize = isVertical ? 150 : 168;
  else if (statLen >= 6) statFontSize = isVertical ? 176 : 196;

  // 그래픽 이미지가 지정된 경우에만 나란히 배치 모드. 캐릭터는 오른쪽 꽉참 모드.
  const useSideBySide = Boolean(scene.sceneImage);
  const hasChar = Boolean(scene.characterImage);

  // 장면 전체 slow zoom in
  const sceneZoom = interpolate(frame, [0, durationInFrames], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  // 수치 그룹(text + statValue + 구분선 + statLabel)
  const statGroup = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        maxWidth: isVertical ? 900 : 1100,
      }}
    >
      {scene.text && (
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textSlide}px)`,
            fontSize: isVertical ? 60 : 54,
            fontWeight: 700,
            color: accent,
            fontFamily: "SCDream",
            marginBottom: isVertical ? 6 : 4,
            lineHeight: 1.25,
            letterSpacing: 0.5,
            whiteSpace: "pre-line",
            wordBreak: "keep-all" as const,
          }}
        >
          {scene.text}
        </div>
      )}

      {scene.statValue && (
        <div
          style={{
            opacity: statOpacity,
            transform: `scale(${statScale})`,
            fontSize: statFontSize,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "SCDream",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
          }}
        >
          {scene.statValue}
        </div>
      )}

      {scene.statLabel && (
        <>
          {/* accent 구분선 — statValue와 statLabel을 하나로 묶음 */}
          <div
            style={{
              opacity: labelOpacity,
              width: interpolate(frame, [labelDelay, labelDelay + 16], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              height: 5,
              borderRadius: 3,
              backgroundColor: accent,
              margin: `${isVertical ? 20 : 18}px 0 ${isVertical ? 16 : 14}px`,
            }}
          />
          <div
            style={{
              opacity: labelOpacity,
              transform: `translateY(${labelSlide}px)`,
              fontSize: isVertical ? 52 : 42,
              fontWeight: 500,
              color: "#cfd2d8",
              fontFamily: "SCDream",
              lineHeight: 1.4,
              whiteSpace: "pre-line",
              wordBreak: "keep-all" as const,
            }}
          >
            {scene.statLabel}
          </div>
        </>
      )}
    </div>
  );

  // 그래픽 이미지 나란히 배치 모드
  if (useSideBySide) {
    const imgZoom = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
      extrapolateRight: "clamp",
    });
    const imgOpacity = interpolate(frame, [2, 16], [0, 1], { extrapolateRight: "clamp" });
    const imgSlide = interpolate(frame, [2, 18], [-24, 0], { extrapolateRight: "clamp" });
    return (
      <AbsoluteFill
        style={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: isVertical ? 30 : 70,
          padding: isVertical ? "80px 60px" : "60px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            opacity: imgOpacity,
            transform: `translateX(${isVertical ? 0 : imgSlide}px) scale(${imgZoom})`,
          }}
        >
          <Img
            src={staticFile(scene.sceneImage!)}
            style={{
              maxHeight: isVertical ? "38vh" : "78vh",
              maxWidth: isVertical ? "66%" : "40vw",
              objectFit: "contain",
              filter: "drop-shadow(0 16px 44px rgba(0,0,0,0.5))",
            }}
          />
        </div>
        {statGroup}
      </AbsoluteFill>
    );
  }

  // 캐릭터 오른쪽 꽉참 모드 (HighlightScene과 동일 구조)
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* 콘텐츠(수치 그룹) 영역 — 캐릭터가 있으면 오른쪽 23% 비움 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: hasChar ? "23%" : 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        {statGroup}
      </div>

      {/* 캐릭터 */}
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
