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
  FONT,
  fontFamily,
} from "../../../styles/theme";

const VIDEO_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-05-itaewon-alley-choke-point-map.mp4",
);

const SCENE_DURATION = 301;
const MOVING_VIDEO_DURATION = 240;
const HOLD_DURATION = SCENE_DURATION - MOVING_VIDEO_DURATION;

const PIN_START_FRAME = 20;
const SOUTH_MARKER_FRAME = 99;
const SOUTH_EMPHASIS_END_FRAME = 181;
const NORTH_MARKER_FRAME = 191;
const FLOW_START_FRAME = 210;

const MapVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Camera bản đồ Itaewon"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        scale: interpolate(
          frame,
          [0, MOVING_VIDEO_DURATION - 1, SCENE_DURATION - 1],
          [1.015, 1.05, 1.066],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [0, MOVING_VIDEO_DURATION - 1, SCENE_DURATION - 1],
          ["0px 2px", "-8px -14px", "-15px -22px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <Sequence
        name="Chuyển động bản đồ gốc"
        durationInFrames={MOVING_VIDEO_DURATION}
      >
        <MediaAssembler
          kind="video"
          src={VIDEO_SRC}
          durationInFrames={MOVING_VIDEO_DURATION}
          trimAfter={8 * 30}
          playbackRate={1}
          cameraMotion="none"
          contrast={1}
        />
      </Sequence>

      <Sequence
        name="Giữ khung bản đồ cuối"
        from={MOVING_VIDEO_DURATION}
        durationInFrames={HOLD_DURATION}
      >
        <MediaAssembler
          kind="video"
          src={VIDEO_SRC}
          durationInFrames={HOLD_DURATION}
          trimBefore={7.96 * 30}
          trimAfter={8 * 30}
          playbackRate={0.02}
          cameraMotion="none"
          contrast={1}
        />
      </Sequence>
    </Interactive.Div>
  );
};

const PinIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Ghim đầu mối giao thông"
      style={{
        position: "absolute",
        left: 350,
        top: 1180,
        width: 142,
        height: 178,
        opacity: interpolate(
          frame,
          [PIN_START_FRAME, PIN_START_FRAME + 7],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [PIN_START_FRAME, PIN_START_FRAME + 15],
          [0.48, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [PIN_START_FRAME, PIN_START_FRAME + 15],
          ["0px -54px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: `${-3 + Math.sin((frame - PIN_START_FRAME) / 18) * 1.1}deg`,
      }}
    >
      <svg
        width="142"
        height="178"
        viewBox="0 0 142 178"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M71 12 C39 12 17 35 17 67 C17 108 71 163 71 163 C71 163 125 108 125 67 C125 35 103 12 71 12 Z"
          fill="rgba(20,20,20,0.9)"
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [PIN_START_FRAME, PIN_START_FRAME + 19],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <circle
          cx="71"
          cy="66"
          r={interpolate(
            frame,
            [PIN_START_FRAME + 8, PIN_START_FRAME + 20],
            [0, 20],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          )}
          fill={COLORS.backgroundCard}
          stroke={COLORS.orange}
          strokeWidth={7}
        />
        <ellipse
          cx="71"
          cy="166"
          rx={interpolate(
            frame,
            [PIN_START_FRAME + 13, PIN_START_FRAME + 28],
            [0, 39],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          )}
          ry="8"
          fill="rgba(20,20,20,0.42)"
        />
      </svg>
    </Interactive.Div>
  );
};

type MapMarkerProps = {
  name: string;
  label: "S" | "N";
  left: number;
  top: number;
  startFrame: number;
  emphasisEndFrame?: number;
};

const MapMarker: React.FC<MapMarkerProps> = ({
  name,
  label,
  left,
  top,
  startFrame,
  emphasisEndFrame,
}) => {
  const frame = useCurrentFrame();
  const pulsePhase = label === "S" ? 0 : 1.4;

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        left,
        top,
        width: 126,
        height: 126,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `6px solid ${COLORS.ink}`,
        borderRadius: "50%",
        backgroundColor: COLORS.orange,
        color: COLORS.ink,
        boxShadow: `10px 10px 0 ${COLORS.backgroundCard}`,
        fontSize: 65,
        fontWeight: FONT.weights.black,
        lineHeight: 1,
        opacity:
          emphasisEndFrame !== undefined && frame >= emphasisEndFrame
            ? 0
            : interpolate(frame, [startFrame, startFrame + 7], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
        scale: interpolate(
          frame,
          [startFrame, startFrame + 14],
          [0.38, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: `${Math.sin((frame - startFrame) / 16 + pulsePhase) * 3}px ${
          Math.sin((frame - startFrame) / 20 + pulsePhase) * 4
        }px`,
        rotate: `${Math.sin((frame - startFrame) / 21 + pulsePhase) * 1.2}deg`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: interpolate(
            frame,
            [startFrame, startFrame + 15, startFrame + 34],
            [22, -12, -28],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          border: `5px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [startFrame, startFrame + 9, startFrame + 34],
            [0, 0.72, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      />
      <span>{label}</span>
    </Interactive.Div>
  );
};

const RouteFlow: React.FC = () => {
  const frame = useCurrentFrame();

  const routes = [
    {
      path: "M424 1288 C420 1210 444 1158 505 1110 C567 1061 639 1038 650 982 C660 928 578 897 586 837 C594 779 686 752 680 690 C674 626 603 596 625 522",
      start: FLOW_START_FRAME,
    },
    {
      path: "M437 1294 C482 1225 513 1184 580 1150 C648 1115 735 1102 744 1032 C752 969 680 933 700 874 C720 817 785 786 765 719 C744 650 666 610 640 522",
      start: FLOW_START_FRAME + 7,
    },
    {
      path: "M412 1292 C370 1224 354 1174 389 1116 C423 1060 515 1032 508 963 C501 900 432 870 449 805 C467 740 558 716 568 652 C577 590 610 550 625 522",
      start: FLOW_START_FRAME + 14,
    },
  ];

  return (
    <Interactive.Div
      name="Các tuyến luồn qua hẻm ngang"
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(
          frame,
          [FLOW_START_FRAME, FLOW_START_FRAME + 8],
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
        {routes.map((route, index) => (
          <g key={route.path}>
            <path
              d={route.path}
              pathLength={1}
              stroke="rgba(20,20,20,0.84)"
              strokeWidth={22}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [route.start, route.start + 42],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            />
            <path
              d={route.path}
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [route.start + 2, route.start + 44],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            />

            <circle
              cx={[586, 700, 449][index]}
              cy={[837, 874, 805][index]}
              r={interpolate(
                frame,
                [route.start + 20, route.start + 31],
                [0, 14],
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
          </g>
        ))}

        <path
          d="M596 555 L625 514 L654 555"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FLOW_START_FRAME + 44, FLOW_START_FRAME + 55],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M596 555 L625 514 L654 555"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FLOW_START_FRAME + 46, FLOW_START_FRAME + 57],
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

const MapOverlayLayer: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Lớp chỉ dẫn bản đồ"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        pointerEvents: "none",
        translate: interpolate(
          frame,
          [0, MOVING_VIDEO_DURATION - 1, SCENE_DURATION - 1],
          ["0px 0px", "0px 0px", "8px 6px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <PinIcon />

      <MapMarker
        name="Điểm phía Nam"
        label="S"
        left={378}
        top={1270}
        startFrame={SOUTH_MARKER_FRAME}
        emphasisEndFrame={SOUTH_EMPHASIS_END_FRAME}
      />

      <MapMarker
        name="Điểm phía Bắc"
        label="N"
        left={565}
        top={382}
        startFrame={NORTH_MARKER_FRAME}
      />

      <RouteFlow />
    </Interactive.Div>
  );
};

const UnfoldEntrance: React.FC = () => {
  const frame = useCurrentFrame();

  const folds = [
    {top: 0, height: 480, start: 0, origin: "top center"},
    {top: 480, height: 480, start: 4, origin: "bottom center"},
    {top: 960, height: 480, start: 8, origin: "top center"},
    {top: 1440, height: 480, start: 12, origin: "bottom center"},
  ] as const;

  return (
    <Interactive.Div
      name="Unfold entrance"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 90,
        pointerEvents: "none",
      }}
    >
      {folds.map((fold, index) => (
        <div
          key={`${fold.top}-${fold.height}`}
          style={{
            position: "absolute",
            top: fold.top,
            left: 0,
            width: 1080,
            height: fold.height,
            overflow: "hidden",
            transformOrigin: fold.origin,
            scale: interpolate(
              frame,
              [fold.start, fold.start + 17],
              ["1 1", "1 0"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.7, 0, 0.3, 1),
              },
            ),
            backgroundColor:
              index % 2 === 0
                ? COLORS.backgroundCard
                : COLORS.ink,
            borderBottom: `9px solid ${COLORS.orange}`,
            boxShadow:
              index % 2 === 0
                ? "0 16px 0 rgba(20,20,20,0.3)"
                : "0 16px 0 rgba(255,106,26,0.32)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: index % 2 === 0 ? 0.16 : 0.1,
              backgroundImage:
                "radial-gradient(circle at 24% 34%, rgba(20,20,20,0.42) 0 1px, transparent 1.5px), repeating-linear-gradient(-3deg, transparent 0 15px, rgba(20,20,20,0.12) 16px)",
              backgroundSize: "23px 23px, 100% 17px",
            }}
          />
        </div>
      ))}
    </Interactive.Div>
  );
};

export const Scene14: React.FC = () => {
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
      <MapVideo />
      <BackgroundTreatment variant="card" />
      <MapOverlayLayer />
      <UnfoldEntrance />
    </AbsoluteFill>
  );
};