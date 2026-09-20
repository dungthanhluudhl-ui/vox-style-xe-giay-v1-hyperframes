import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {LightOverlay} from "../../../components/LightOverlay";
import {MediaAssembler} from "../../../components/MediaAssembler";
import {DissolveEntrance} from "../../../components/SceneTransitions";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const IMAGE_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/images/img-05-itaewon-origins-joseon-cutout.jpeg",
);

const VIDEO_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-04-joseon-history-cutout-collage.mp4",
);

const HistoricalVillageImage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <CanvasImage
        src={IMAGE_SRC}
        cropLeft={interpolate(frame, [0, 24], [0.497, 0.003], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}
        cropRight={interpolate(frame, [0, 24], [0.497, 0.003], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: interpolate(
            frame,
            [0, 80],
            ["48% 44%", "53% 49%"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(frame, [0, 80], [1, 1.04], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: interpolate(frame, [0, 24], [537, 3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          width: 4,
          backgroundColor: COLORS.orange,
          opacity: interpolate(frame, [15, 28], [0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          right: interpolate(frame, [0, 24], [537, 3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          bottom: 0,
          width: 4,
          backgroundColor: COLORS.orange,
          opacity: interpolate(frame, [15, 28], [0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 538,
          width: 4,
          backgroundColor: COLORS.ink,
          opacity: interpolate(frame, [0, 10, 24], [0.55, 0.35, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const RefugeLabel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Paper reveal — Nơi nương náu"
      style={{
        position: "absolute",
        top: 1125,
        left: 72,
        width: interpolate(frame, [0, 12], [0, 520], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        height: 100,
        overflow: "hidden",
      }}
    >
      <LightOverlay
        text="NƠI NƯƠNG NÁU"
        variant="label"
        name="Nơi nương náu"
        top={0}
        left={0}
        maxWidth={500}
      />
    </Interactive.Div>
  );
};

type PersonMarkerProps = {
  name: string;
  left: number;
  top: number;
  size: number;
  phase: number;
};

const PersonMarker: React.FC<PersonMarkerProps> = ({
  name,
  left,
  top,
  size,
  phase,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: "50%",
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.55, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: `0px ${Math.sin(frame / 8 + phase) * 5}px`,
        rotate: `${Math.sin(frame / 13 + phase) * 1.5}deg`,
      }}
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M32 8 C25 8 21 13 21 20 C21 27 25 31 32 31 C39 31 43 27 43 20 C43 13 39 8 32 8 Z"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 10], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M13 57 C14 42 21 34 32 34 C43 34 50 42 51 57"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 17], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M24 39 L20 57 M40 39 L44 57"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [9, 20], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

const HistoricalVideo: React.FC = () => {
  return (
    <DissolveEntrance name="Dissolve into moving Joseon collage">
      <MediaAssembler
        kind="video"
        src={VIDEO_SRC}
        durationInFrames={111}
        trimBefore={2 * 30}
        trimAfter={5.71 * 30}
        playbackRate={1}
        cameraMotion="none"
        contrast={1}
      />
    </DissolveEntrance>
  );
};

export const Scene01: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.backgroundCard,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.bold,
      }}
    >
      <Sequence name="Làng cổ hình thành" durationInFrames={81}>
        <HistoricalVillageImage />
      </Sequence>

      <Sequence
        name="Phụ nữ và trẻ nhỏ"
        from={81}
        durationInFrames={111}
      >
        <HistoricalVideo />
      </Sequence>

      <BackgroundTreatment variant="card" />

      <Sequence
        name="Nhãn nơi nương náu"
        from={33}
        durationInFrames={48}
        layout="none"
      >
        <RefugeLabel />
      </Sequence>

      <Sequence
        name="Dấu người phụ nữ"
        from={101}
        durationInFrames={91}
        layout="none"
      >
        <PersonMarker
          name="Người phụ nữ"
          left={104}
          top={905}
          size={118}
          phase={0}
        />
      </Sequence>

      <Sequence
        name="Dấu trẻ nhỏ"
        from={141}
        durationInFrames={51}
        layout="none"
      >
        <PersonMarker
          name="Trẻ nhỏ"
          left={830}
          top={1060}
          size={84}
          phase={1.7}
        />
      </Sequence>
    </AbsoluteFill>
  );
};