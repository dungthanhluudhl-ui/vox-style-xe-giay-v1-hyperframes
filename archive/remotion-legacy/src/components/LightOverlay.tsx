import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {
  COLORS,
  FONT,
  fontFamily,
  type OverlayVariant,
  type SimpleIconName,
} from "../styles/theme";

type SimpleIconProps = {
  icon: SimpleIconName;
  size?: number;
  color?: string;
};

export const SimpleIcon: React.FC<SimpleIconProps> = ({
  icon,
  size = 42,
  color = COLORS.orange,
}) => {
  const frame = useCurrentFrame();

  const paths: Record<SimpleIconName, string[]> = {
    money: [
      "M12 8 H36 V34 H12 Z",
      "M18 21 C18 16 30 16 30 21 C30 26 18 26 18 21 Z",
      "M8 13 V39 H32",
    ],
    phone: [
      "M14 5 H34 Q38 5 38 9 V39 Q38 43 34 43 H14 Q10 43 10 39 V9 Q10 5 14 5 Z",
      "M20 37 H28",
    ],
    warning: [
      "M24 5 L44 41 H4 Z",
      "M24 16 V28",
      "M24 35 V36",
    ],
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      {paths[icon].map((path, index) => (
        <path
          key={`${icon}-${path}`}
          d={path}
          pathLength={1}
          stroke={color}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [index * 3, 12 + index * 3],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      ))}
    </svg>
  );
};

type LightOverlayProps = {
  text: string;
  variant: OverlayVariant;
  name: string;
  top: number;
  left: number;
  icon?: SimpleIconName;
  maxWidth?: number;
};

export const LightOverlay: React.FC<LightOverlayProps> = ({
  text,
  variant,
  name,
  top,
  left,
  icon,
  maxWidth = 760,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        top,
        left,
        maxWidth,
        display: "flex",
        alignItems: "center",
        gap: icon ? 14 : 0,
        padding: variant === "amount" ? "16px 22px" : "11px 18px",
        border:
          variant === "amount"
            ? `4px solid ${COLORS.orange}`
            : `2px solid ${COLORS.orange}`,
        borderRadius: variant === "amount" ? 10 : 6,
        backgroundColor:
          variant === "amount"
            ? COLORS.backgroundCard
            : variant === "punch"
              ? COLORS.orange
              : "rgba(20,20,20,0.88)",
        color:
          variant === "punch"
            ? COLORS.ink
            : variant === "amount"
              ? COLORS.ink
              : COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: variant === "amount" ? 62 : 34,
        lineHeight: 1.1,
        letterSpacing: variant === "amount" ? -1.5 : 1.2,
        boxShadow:
          variant === "amount"
            ? `10px 10px 0 ${COLORS.ink}`
            : `6px 6px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 10], [0.78, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 10], ["0px 24px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      {icon ? <SimpleIcon icon={icon} /> : null}
      <span>{text}</span>
    </Interactive.Div>
  );
};