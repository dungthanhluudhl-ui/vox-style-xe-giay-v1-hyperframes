import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {MediaAssembler} from "../../../components/MediaAssembler";
import {
  COLORS,
  fontFamily,
} from "../../../styles/theme";

const VIDEO_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-06-cutout-collapsing-urban-alley.mp4",
);

const SCENE_DURATION = 242;
const MOVING_VIDEO_DURATION = 225;
const HOLD_DURATION = SCENE_DURATION - MOVING_VIDEO_DURATION;

const BOUNDARY_START_FRAME = 32;
const ARROW_START_FRAME = 52;
const SLOPE_START_FRAME = 120;

const UrbanAlleyVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Wobble-drop entrance"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 8, 14, 20, 26],
          [
            "0px -160px",
            "0px 25px",
            "0px -12px",
            "0px 5px",
            "0px 0px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 8, 14, 20, 26],
          ["-5deg", "3deg", "-2deg", "1deg", "0deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
          },
        ),
      }}
    >
      <Interactive.Div
        name="Slow zoom into narrowing alley"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          scale: interpolate(
            frame,
            [0, MOVING_VIDEO_DURATION - 1, SCENE_DURATION - 1],
            [1.03, 1.105, 1.105],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [0, MOVING_VIDEO_DURATION - 1, SCENE_DURATION - 1],
            ["0px 0px", "-7px -14px", "-7px -14px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
              ],
            },
          ),
        }}
      >
        <Sequence
          name="Hai dãy nhà ép lại"
          durationInFrames={MOVING_VIDEO_DURATION}
        >
          <MediaAssembler
            kind="video"
            src={VIDEO_SRC}
            durationInFrames={MOVING_VIDEO_DURATION}
            trimAfter={6.9 * 30}
            playbackRate={0.92}
            cameraMotion="none"
            contrast={1.04}
          />
        </Sequence>

        <Sequence
          name="Giữ khung cuối"
          from={MOVING_VIDEO_DURATION}
          durationInFrames={HOLD_DURATION}
        >
          <MediaAssembler
            kind="video"
            src={VIDEO_SRC}
            durationInFrames={HOLD_DURATION}
            trimBefore={6.86 * 30}
            trimAfter={6.9 * 30}
            playbackRate={0.0625}
            cameraMotion="none"
            contrast={1.04}
          />
        </Sequence>
      </Interactive.Div>
    </Interactive.Div>
  );
};

const BoundaryPath: React.FC<{
  name: string;
  path: string;
  direction: "left" | "right";
}> = ({name, path, direction}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        inset: 0,
        translate:
          direction === "left"
            ? interpolate(
                frame,
                [BOUNDARY_START_FRAME, 218],
                ["-58px 0px", "30px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )
            : interpolate(
                frame,
                [BOUNDARY_START_FRAME, 218],
                ["58px 0px", "-30px 0px"],
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
          d={path}
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={19}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [BOUNDARY_START_FRAME, BOUNDARY_START_FRAME + 23],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d={path}
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [BOUNDARY_START_FRAME + 2, BOUNDARY_START_FRAME + 25],
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

const BoundaryLines: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Hai biên khoảng trống"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [BOUNDARY_START_FRAME, 40, 232, SCENE_DURATION - 1],
          [0, 1, 1, 0],
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
      }}
    >
      <BoundaryPath
        name="Biên dãy nhà bên trái"
        direction="left"
        path="M238 286 C266 510 294 708 315 920 C337 1135 363 1326 406 1518"
      />
      <BoundaryPath
        name="Biên dãy nhà bên phải"
        direction="right"
        path="M858 286 C830 508 802 708 778 918 C754 1134 725 1328 680 1518"
      />
    </Interactive.Div>
  );
};

const InwardArrows: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Mũi tên ép vào trong"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 22,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [ARROW_START_FRAME, ARROW_START_FRAME + 8, 233, 241],
          [0, 1, 1, 0],
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
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <g
          transform={`translate(${Math.sin(frame / 8) * 7} 0)`}
        >
          <path
            d="M120 790 H438"
            pathLength={1}
            stroke="rgba(20,20,20,0.84)"
            strokeWidth={17}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROW_START_FRAME, ARROW_START_FRAME + 18],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
          <path
            d="M120 790 H438 M402 752 L441 790 L402 828"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROW_START_FRAME + 2, ARROW_START_FRAME + 21],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        </g>

        <g
          transform={`translate(${-Math.sin(frame / 8 + 0.9) * 7} 0)`}
        >
          <path
            d="M960 790 H642"
            pathLength={1}
            stroke="rgba(20,20,20,0.84)"
            strokeWidth={17}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROW_START_FRAME, ARROW_START_FRAME + 18],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
          <path
            d="M960 790 H642 M678 752 L639 790 L678 828"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROW_START_FRAME + 2, ARROW_START_FRAME + 21],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        </g>
      </svg>
    </Interactive.Div>
  );
};

const SlopeIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Chỉ báo độ dốc"
      style={{
        position: "absolute",
        zIndex: 24,
        top: 1005,
        left: 80,
        width: 920,
        height: 390,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [SLOPE_START_FRAME, SLOPE_START_FRAME + 8, 234, 241],
          [0, 1, 1, 0],
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
          [SLOPE_START_FRAME, SLOPE_START_FRAME + 17],
          [0.92, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [SLOPE_START_FRAME, SLOPE_START_FRAME + 17],
          ["0px 28px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      <svg
        width="920"
        height="390"
        viewBox="0 0 920 390"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M98 304 H822"
          pathLength={1}
          stroke="rgba(247,244,236,0.86)"
          strokeWidth={15}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [SLOPE_START_FRAME, SLOPE_START_FRAME + 20],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M98 304 L822 84"
          pathLength={1}
          stroke="rgba(20,20,20,0.86)"
          strokeWidth={21}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [SLOPE_START_FRAME + 8, SLOPE_START_FRAME + 34],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M98 304 L822 84"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [SLOPE_START_FRAME + 10, SLOPE_START_FRAME + 36],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M218 304 A120 120 0 0 0 213 268"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [SLOPE_START_FRAME + 24, SLOPE_START_FRAME + 40],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <circle
          cx="98"
          cy="304"
          r={interpolate(
            frame,
            [SLOPE_START_FRAME + 10, SLOPE_START_FRAME + 22],
            [0, 13],
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
    </Interactive.Div>
  );
};

export const Scene08: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        color: COLORS.onDarkText,
        fontFamily,
      }}
    >
      <UrbanAlleyVideo />
      <BackgroundTreatment variant="spotlight" />
      <BoundaryLines />
      <InwardArrows />
      <SlopeIndicator />
    </AbsoluteFill>
  );
};