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
  "videos/tham-hoa-itaewon-phan-2/media/images/img-04-seoul-itaewon-alley-cutout.jpeg",
);

const SCENE_DURATION = 251;
const SPLIT_EXIT_FRAME = 150;
const ANNOTATION_START_FRAME = 173;

const SHARDS = [
  {
    left: 0,
    width: 138,
    backgroundColor: COLORS.backgroundCard,
    initialX: -128,
    initialY: -88,
    clipPath: "polygon(0 0, 91% 0, 100% 29%, 88% 57%, 100% 100%, 0 100%)",
  },
  {
    left: 128,
    width: 146,
    backgroundColor: COLORS.ink,
    initialX: 36,
    initialY: -180,
    clipPath: "polygon(7% 0, 100% 0, 91% 34%, 100% 67%, 92% 100%, 0 100%, 8% 57%)",
  },
  {
    left: 264,
    width: 146,
    backgroundColor: COLORS.backgroundCard,
    initialX: -42,
    initialY: 146,
    clipPath: "polygon(0 0, 94% 0, 100% 24%, 90% 51%, 100% 79%, 93% 100%, 7% 100%, 0 69%, 8% 35%)",
  },
  {
    left: 400,
    width: 142,
    backgroundColor: COLORS.ink,
    initialX: 58,
    initialY: -116,
    clipPath: "polygon(8% 0, 100% 0, 93% 31%, 100% 62%, 91% 100%, 0 100%, 8% 72%, 0 42%)",
  },
  {
    left: 532,
    width: 142,
    backgroundColor: COLORS.backgroundCard,
    initialX: -28,
    initialY: 192,
    clipPath: "polygon(0 0, 92% 0, 100% 36%, 91% 65%, 100% 100%, 6% 100%, 0 73%, 9% 43%)",
  },
  {
    left: 664,
    width: 146,
    backgroundColor: COLORS.ink,
    initialX: 146,
    initialY: 72,
    clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 8% 74%, 0 47%, 9% 21%)",
  },
] as const;

const AlleyImage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Hẻm Itaewon camera"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        scale: interpolate(
          frame,
          [0, SCENE_DURATION - 1],
          [1.01, 1.05],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [0, SCENE_DURATION - 1],
          ["26px 0px", "-30px -8px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
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
  );
};

const InternationalShell: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Lớp vỏ đô thị bị đẩy sang bên"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 0,
        bottom: 0,
        left: interpolate(
          frame,
          [0, 18, SPLIT_EXIT_FRAME],
          [-58, -58, 968],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.7, 0, 0.3, 1),
            ],
          },
        ),
        width: interpolate(
          frame,
          [0, 18, SPLIT_EXIT_FRAME],
          [810, 810, 96],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.7, 0, 0.3, 1),
            ],
          },
        ),
        overflow: "hidden",
        opacity: interpolate(
          frame,
          [0, 6, 141, SPLIT_EXIT_FRAME],
          [0.88, 1, 1, 0],
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
        boxShadow: "18px 0 0 rgba(255,106,26,0.84)",
      }}
    >
      {SHARDS.map((shard, index) => (
        <Interactive.Div
          key={`${shard.left}-${shard.width}`}
          name={`Mảnh đô thị ${index + 1}`}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: shard.left,
            width: shard.width,
            overflow: "hidden",
            backgroundColor: shard.backgroundColor,
            clipPath: shard.clipPath,
            opacity: interpolate(
              frame,
              [index * 1.2, 7 + index * 1.2],
              [0.5, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            translate: interpolate(
              frame,
              [0, 17],
              [
                `${shard.initialX}px ${shard.initialY}px`,
                "0px 0px",
              ],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              },
            ),
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: shard.backgroundColor === COLORS.ink ? 0.72 : 0.48,
              backgroundImage:
                shard.backgroundColor === COLORS.ink
                  ? `repeating-linear-gradient(to bottom, transparent 0 132px, rgba(247,244,236,0.34) 134px 139px, transparent 141px 230px), repeating-linear-gradient(90deg, transparent 0 52px, ${COLORS.orange} 54px 58px, transparent 60px 105px)`
                  : `repeating-linear-gradient(to bottom, transparent 0 112px, rgba(20,20,20,0.35) 114px 119px, transparent 121px 218px), repeating-linear-gradient(90deg, transparent 0 56px, rgba(20,20,20,0.3) 58px 62px, transparent 64px 112px)`,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 138 + index * 84,
              left: 22,
              width: Math.max(42, shard.width - 48),
              height: 330 + (index % 3) * 126,
              border:
                shard.backgroundColor === COLORS.ink
                  ? `5px solid ${COLORS.orange}`
                  : `5px solid ${COLORS.ink}`,
              backgroundColor:
                shard.backgroundColor === COLORS.ink
                  ? "rgba(247,244,236,0.08)"
                  : "rgba(20,20,20,0.04)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              bottom: 178 + (index % 2) * 124,
              height: 11,
              backgroundColor:
                shard.backgroundColor === COLORS.ink
                  ? COLORS.orange
                  : COLORS.ink,
            }}
          />
        </Interactive.Div>
      ))}

      <div
        style={{
          position: "absolute",
          zIndex: 4,
          top: 0,
          right: 0,
          bottom: 0,
          width: 15,
          backgroundColor: COLORS.orange,
        }}
      />
    </Interactive.Div>
  );
};

const ConstructionAnnotation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Khoanh vùng công trình chen cài"
      style={{
        position: "absolute",
        zIndex: 42,
        top: 684,
        left: 384,
        width: 610,
        height: 610,
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
        scale: interpolate(
          frame,
          [ANNOTATION_START_FRAME, ANNOTATION_START_FRAME + 14],
          [0.91, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: `${Math.sin((frame - ANNOTATION_START_FRAME) / 13) * 3}px ${Math.sin((frame - ANNOTATION_START_FRAME) / 17 + 1.2) * 4}px`,
        rotate: `${Math.sin((frame - ANNOTATION_START_FRAME) / 19) * 0.7 - 2}deg`,
      }}
    >
      <svg
        width="610"
        height="610"
        viewBox="0 0 610 610"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        <path
          d="M312 44 C449 36 552 123 565 267 C578 412 493 538 329 558 C164 578 57 493 47 345 C37 197 142 68 312 44 Z"
          pathLength={1}
          stroke="rgba(20,20,20,0.78)"
          strokeWidth={19}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ANNOTATION_START_FRAME, ANNOTATION_START_FRAME + 29],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M312 44 C449 36 552 123 565 267 C578 412 493 538 329 558 C164 578 57 493 47 345 C37 197 142 68 312 44 Z"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ANNOTATION_START_FRAME + 2, ANNOTATION_START_FRAME + 31],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M74 153 C46 132 32 108 26 77 M510 491 C540 509 559 531 570 561"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ANNOTATION_START_FRAME + 23, ANNOTATION_START_FRAME + 40],
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

export const Scene07: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.bold,
      }}
    >
      <AlleyImage />
      <BackgroundTreatment variant="grid" />
      <InternationalShell />
      <ConstructionAnnotation />
    </AbsoluteFill>
  );
};