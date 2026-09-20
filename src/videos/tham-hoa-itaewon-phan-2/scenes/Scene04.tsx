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
import {ZoomThroughEntrance} from "../../../components/SceneTransitions";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const IMAGE_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/images/img-06-korea-military-camptown-collage.jpeg",
);

const SCENE_DURATION = 228;
const ANNOTATION_START_FRAME = 156;

const HistoricalStreet: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ZoomThroughEntrance name="Zoom-through into post-war Itaewon">
      <Interactive.Div
        name="Post-war street camera"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          scale: interpolate(
            frame,
            [0, 72, 96, SCENE_DURATION - 1],
            [1, 1.018, 1.035, 1.06],
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
            [0, 72, 96, SCENE_DURATION - 1],
            ["0px 0px", "0px 0px", "-18px -16px", "-30px -28px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.linear,
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
    </ZoomThroughEntrance>
  );
};

const ProximityAnnotation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Military base proximity annotation"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 774,
        left: 430,
        width: 590,
        height: 440,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [ANNOTATION_START_FRAME, ANNOTATION_START_FRAME + 7],
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
        width="590"
        height="390"
        viewBox="0 0 590 390"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        <path
          d="M32 18 C108 18 108 79 108 119 C108 163 145 184 205 184 C145 184 108 209 108 253 C108 294 108 356 32 356"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ANNOTATION_START_FRAME, ANNOTATION_START_FRAME + 18],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M205 184 H472"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ANNOTATION_START_FRAME + 10, ANNOTATION_START_FRAME + 24],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M445 158 L476 184 L445 210"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ANNOTATION_START_FRAME + 18, ANNOTATION_START_FRAME + 28],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <circle
          cx="32"
          cy="18"
          r={interpolate(
            frame,
            [ANNOTATION_START_FRAME + 4, ANNOTATION_START_FRAME + 13],
            [0, 10],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          )}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={4}
        />

        <circle
          cx="32"
          cy="356"
          r={interpolate(
            frame,
            [ANNOTATION_START_FRAME + 10, ANNOTATION_START_FRAME + 19],
            [0, 10],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          )}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={4}
        />
      </svg>

      <Interactive.Div
        name="Sát khu dân cư label"
        style={{
          position: "absolute",
          top: 132,
          right: 0,
          width: 346,
          padding: "17px 21px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 7,
          backgroundColor: COLORS.backgroundCard,
          color: COLORS.ink,
          boxShadow: `10px 10px 0 ${COLORS.orange}`,
          fontFamily,
          fontSize: 44,
          fontWeight: FONT.weights.black,
          lineHeight: 1.08,
          letterSpacing: 1.2,
          textAlign: "center",
          opacity: interpolate(
            frame,
            [ANNOTATION_START_FRAME + 12, ANNOTATION_START_FRAME + 20],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [ANNOTATION_START_FRAME + 12, ANNOTATION_START_FRAME + 25],
            [0.78, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [ANNOTATION_START_FRAME + 12, ANNOTATION_START_FRAME + 25],
            ["26px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [ANNOTATION_START_FRAME + 12, ANNOTATION_START_FRAME + 25],
            ["3deg", "-1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        SÁT KHU DÂN CƯ
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene04: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.backgroundCard,
        color: COLORS.ink,
        fontFamily,
      }}
    >
      <HistoricalStreet />
      <BackgroundTreatment variant="card" />
      <ProximityAnnotation />
    </AbsoluteFill>
  );
};