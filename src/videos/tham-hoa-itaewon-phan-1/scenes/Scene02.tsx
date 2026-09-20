import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {LightOverlay} from "../../../components/LightOverlay";
import {ZoomThroughEntrance} from "../../../components/SceneTransitions";
import {COLORS} from "../../../styles/theme";

const SCENE_DURATION_IN_FRAMES = 239;
const OUTLINE_START_FRAME = 108;
const LABEL_START_FRAME = 123;

const BottleneckOutline: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Crowd bottleneck outline"
      style={{
        position: "absolute",
        top: 770,
        left: interpolate(frame, [0, 30, 112], [215, 215, 235], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.bezier(0.16, 1, 0.3, 1),
            Easing.bezier(0.16, 1, 0.3, 1),
          ],
        }),
        width: interpolate(frame, [0, 30, 112], [650, 650, 610], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.linear,
            Easing.bezier(0.16, 1, 0.3, 1),
          ],
        }),
        height: 390,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        filter: "drop-shadow(0px 3px 0px rgba(20,20,20,0.8))",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 650 390"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x={10}
          y={10}
          width={630}
          height={370}
          rx={58}
          fill="none"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 30], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Interactive.Div>
  );
};

const BottleneckLabel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <Interactive.Div
        name="Bottleneck leader line"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: interpolate(frame, [0, 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1080 1920"
          aria-hidden="true"
        >
          <path
            d="M650 690 L650 735 L690 790"
            fill="none"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [2, 16], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}
          />
          <circle
            cx={690}
            cy={790}
            r={interpolate(frame, [13, 20], [0, 11], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            })}
            fill={COLORS.orange}
          />
        </svg>
      </Interactive.Div>

      <LightOverlay
        name="Bottleneck label"
        text="NÚT THẮT DÒNG NGƯỜI"
        variant="label"
        top={600}
        left={470}
        maxWidth={530}
      />
    </>
  );
};

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
      }}
    >
      <BackgroundTreatment variant="grid" />

      <ZoomThroughEntrance name="Itaewon simulation zoom-through">
        <Video
          src={staticFile(
            "videos/tham-hoa-itaewon-phan-1/media/videos/vid-04-itaewon-crowd-surge-simulation.mp4",
          )}
          muted
          durationInFrames={SCENE_DURATION_IN_FRAMES}
          trimBefore={0.03 * fps}
          trimAfter={8 * fps}
          objectFit="cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            scale: interpolate(
              frame,
              [0, SCENE_DURATION_IN_FRAMES - 1],
              [1, 1.04],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
          }}
        />

        <Sequence
          name="Crowd bottleneck outline"
          from={OUTLINE_START_FRAME}
          durationInFrames={
            SCENE_DURATION_IN_FRAMES - OUTLINE_START_FRAME
          }
          layout="none"
        >
          <BottleneckOutline />
        </Sequence>

        <Sequence
          name="Crowd bottleneck annotation"
          from={LABEL_START_FRAME}
          durationInFrames={SCENE_DURATION_IN_FRAMES - LABEL_START_FRAME}
        >
          <BottleneckLabel />
        </Sequence>
      </ZoomThroughEntrance>
    </AbsoluteFill>
  );
};