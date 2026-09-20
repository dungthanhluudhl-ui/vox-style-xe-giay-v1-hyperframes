import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const IMAGE_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/images/img-01-itaewon-halloween-crowd-crush.jpeg",
);

const SCENE_DURATION = 316;
const FOCUS_SHIFT_FRAME = 205;
const NORTH_ARROW_FRAME = 234;
const DIMENSION_FRAME = 252;
const DISTANCE_FRAME = 267;

type CostumePulseProps = {
  name: string;
  delay: number;
  left: number;
  top: number;
  size: number;
  rotate: number;
};

const CostumePulse: React.FC<CostumePulseProps> = ({
  name,
  delay,
  left,
  top,
  size,
  rotate,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 14,
        left,
        top,
        width: size,
        height: size,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [delay, delay + 7, delay + 34, delay + 50],
          [0, 0.9, 0.9, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        scale: interpolate(
          frame,
          [delay, delay + 13, delay + 50],
          [0.66, 1, 1.08],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: `${Math.sin((frame - delay) / 9) * 3}px ${
          Math.sin((frame - delay) / 12 + 0.8) * 4
        }px`,
        rotate: `${rotate + Math.sin((frame - delay) / 13) * 0.8}deg`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 180 180"
        fill="none"
        aria-hidden="true"
        style={{overflow: "visible"}}
      >
        <path
          d="M90 15 C135 15 164 47 162 91 C160 136 130 164 87 162 C44 160 16 132 18 89 C20 46 48 17 90 15 Z"
          pathLength={1}
          stroke="rgba(20,20,20,0.74)"
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [delay, delay + 18],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M90 15 C135 15 164 47 162 91 C160 136 130 164 87 162 C44 160 16 132 18 89 C20 46 48 17 90 15 Z"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [delay + 2, delay + 20],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M30 34 L16 18 M149 35 L165 18 M31 146 L16 162 M148 147 L164 163"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [delay + 12, delay + 25],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>
    </Interactive.Div>
  );
};

const HalloweenCrowdImage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Rise into Halloween crowd"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 22],
          ["0px 150px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      <Interactive.Div
        name="Pan across costumes then reveal northern street"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          scale: interpolate(
            frame,
            [0, 145, FOCUS_SHIFT_FRAME, SCENE_DURATION - 1],
            [1.12, 1.15, 1.1, 1.055],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [0, 145, FOCUS_SHIFT_FRAME, SCENE_DURATION - 1],
            [
              "38px 0px",
              "-34px -8px",
              "-18px 28px",
              "0px 58px",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        <CanvasImage
          src={IMAGE_SRC}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
      </Interactive.Div>
    </Interactive.Div>
  );
};

const ConvergenceCorridor: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Crowd attention converges north"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 18,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [FOCUS_SHIFT_FRAME, FOCUS_SHIFT_FRAME + 14],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 59% 37%, rgba(20,20,20,0) 0%, rgba(20,20,20,0.04) 35%, rgba(20,20,20,0.47) 100%)",
          opacity: interpolate(
            frame,
            [FOCUS_SHIFT_FRAME, FOCUS_SHIFT_FRAME + 24],
            [0, 0.82],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      />

      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M394 1372 C429 1117 455 865 491 495 M736 1372 C705 1114 676 859 641 495"
          pathLength={1}
          stroke="rgba(20,20,20,0.72)"
          strokeWidth={15}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FOCUS_SHIFT_FRAME, FOCUS_SHIFT_FRAME + 31],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M394 1372 C429 1117 455 865 491 495 M736 1372 C705 1114 676 859 641 495"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FOCUS_SHIFT_FRAME + 2, FOCUS_SHIFT_FRAME + 33],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>
    </Interactive.Div>
  );
};

const NorthDirection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Northern direction arrow"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 24,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [NORTH_ARROW_FRAME, NORTH_ARROW_FRAME + 7],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M566 1192 C585 1011 602 822 603 574"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={21}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [NORTH_ARROW_FRAME, NORTH_ARROW_FRAME + 27],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M566 1192 C585 1011 602 822 603 574"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [NORTH_ARROW_FRAME + 2, NORTH_ARROW_FRAME + 29],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M550 635 L604 565 L653 638"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={21}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [NORTH_ARROW_FRAME + 19, NORTH_ARROW_FRAME + 31],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M550 635 L604 565 L653 638"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [NORTH_ARROW_FRAME + 20, NORTH_ARROW_FRAME + 32],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>

      <Interactive.Div
        name="North label"
        style={{
          position: "absolute",
          top: 365,
          left: 512,
          minWidth: 184,
          padding: "13px 22px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 7,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `8px 8px 0 ${COLORS.ink}`,
          fontSize: 43,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 3.2,
          textAlign: "center",
          opacity: interpolate(
            frame,
            [NORTH_ARROW_FRAME + 17, NORTH_ARROW_FRAME + 24],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [NORTH_ARROW_FRAME + 17, NORTH_ARROW_FRAME + 29],
            [0.66, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [NORTH_ARROW_FRAME + 17, NORTH_ARROW_FRAME + 29],
            ["0px 24px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [NORTH_ARROW_FRAME + 17, NORTH_ARROW_FRAME + 29],
            ["-5deg", "-1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        BẮC
      </Interactive.Div>
    </Interactive.Div>
  );
};

const StreetDimension: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="302 meter street dimension"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [DIMENSION_FRAME, DIMENSION_FRAME + 6],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M851 1218 C856 1033 851 834 838 626"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIMENSION_FRAME, DIMENSION_FRAME + 31],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M851 1218 C856 1033 851 834 838 626"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIMENSION_FRAME + 2, DIMENSION_FRAME + 33],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M790 1218 L912 1218 M777 626 L899 626"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIMENSION_FRAME + 16, DIMENSION_FRAME + 28],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M790 1218 L912 1218 M777 626 L899 626"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIMENSION_FRAME + 18, DIMENSION_FRAME + 30],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <circle
          cx="851"
          cy="1218"
          r={interpolate(
            frame,
            [DIMENSION_FRAME + 12, DIMENSION_FRAME + 22],
            [0, 12],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          )}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={5}
        />
        <circle
          cx="838"
          cy="626"
          r={interpolate(
            frame,
            [DIMENSION_FRAME + 20, DIMENSION_FRAME + 30],
            [0, 12],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          )}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={5}
        />
      </svg>

      <Interactive.Div
        name="302 meter attached measurement"
        style={{
          position: "absolute",
          top: 858,
          left: 688,
          width: 302,
          minHeight: 132,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 25px",
          border: `5px solid ${COLORS.ink}`,
          borderRadius: 9,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `11px 11px 0 ${COLORS.ink}`,
          fontSize: 70,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: -1.5,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [DISTANCE_FRAME, DISTANCE_FRAME + 7],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [DISTANCE_FRAME, DISTANCE_FRAME + 14],
            [0.58, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [DISTANCE_FRAME, DISTANCE_FRAME + 14],
            ["35px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [DISTANCE_FRAME, DISTANCE_FRAME + 14, SCENE_DURATION - 1],
            ["4deg", "-1deg", "0.5deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        302 m
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene13: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.bold,
      }}
    >
      <HalloweenCrowdImage />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          opacity: 0.16,
          pointerEvents: "none",
        }}
      >
        <BackgroundTreatment variant="grid" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 6,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.28) 0%, rgba(20,20,20,0.02) 36%, rgba(20,20,20,0.08) 72%, rgba(20,20,20,0.32) 100%)",
        }}
      />

      <CostumePulse
        name="Costume highlight one"
        delay={45}
        left={126}
        top={616}
        size={208}
        rotate={-5}
      />
      <CostumePulse
        name="Costume highlight two"
        delay={105}
        left={435}
        top={766}
        size={224}
        rotate={3}
      />
      <CostumePulse
        name="Costume highlight three"
        delay={165}
        left={742}
        top={566}
        size={194}
        rotate={-2}
      />

      <ConvergenceCorridor />
      <NorthDirection />
      <StreetDimension />

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
    </AbsoluteFill>
  );
};