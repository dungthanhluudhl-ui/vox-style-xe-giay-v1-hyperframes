import {AbsoluteFill} from "remotion";
import {
  BACKGROUND,
  COLORS,
  type BackgroundVariant,
} from "../styles/theme";

type BackgroundTreatmentProps = {
  variant: BackgroundVariant;
};

export const BackgroundTreatment: React.FC<BackgroundTreatmentProps> = ({
  variant,
}) => {
  return (
    <>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundImage:
            variant === "spotlight"
              ? "radial-gradient(circle at 50% 44%, rgba(20,20,20,0) 30%, rgba(20,20,20,0.18) 67%, rgba(20,20,20,0.58) 100%)"
              : variant === "grid"
                ? `linear-gradient(${COLORS.gridLine} ${BACKGROUND.gridStrokeWidth}px, transparent ${BACKGROUND.gridStrokeWidth}px), linear-gradient(90deg, ${COLORS.gridLine} ${BACKGROUND.gridStrokeWidth}px, transparent ${BACKGROUND.gridStrokeWidth}px)`
                : variant === "chart"
                  ? `repeating-linear-gradient(to bottom, transparent 0, transparent 19.8%, ${COLORS.gridLine} 20%, transparent 20.2%)`
                  : "none",
          backgroundSize:
            variant === "grid"
              ? `${BACKGROUND.gridCellPx}px ${BACKGROUND.gridCellPx}px`
              : undefined,
        }}
      />

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          mixBlendMode: "multiply",
          opacity: BACKGROUND.grainOpacity,
        }}
      >
        <svg width="100%" height="100%" aria-hidden="true">
          <filter id="paper-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves={4}
              seed={14}
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            fill={COLORS.background}
            filter="url(#paper-grain)"
          />
        </svg>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          zIndex: 100,
          left: 0,
          right: 0,
          bottom: 0,
          height: 18,
          backgroundColor: COLORS.orange,
          pointerEvents: "none",
        }}
      />
    </>
  );
};