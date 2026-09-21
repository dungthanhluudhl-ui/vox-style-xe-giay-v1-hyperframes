import {
  AbsoluteFill,
  Easing,
  Freeze,
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
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-01-itaewon-crowd-crush-cutout.mp4",
);

const SCENE_DURATION = 282;
const VIDEO_DURATION = 8 * 30;
const HOLD_DURATION = SCENE_DURATION - VIDEO_DURATION;

const LENGTH_LINE_FRAME = 19;
const LENGTH_LABEL_FRAME = 25;
const WIDTH_LINE_FRAME = 98;
const WIDTH_LABEL_FRAME = 142;
const FUNNEL_FRAME = 185;
const ARROWS_FRAME = 215;
const COLLISION_FRAME = 232;

const SHARDS = [
  {
    left: 0,
    top: 0,
    width: 270,
    height: 960,
    color: COLORS.backgroundCard,
    exitX: -350,
    exitY: -190,
    exitRotate: -12,
    clipPath:
      "polygon(0 0, 100% 0, 94% 24%, 100% 47%, 91% 70%, 100% 100%, 0 100%)",
  },
  {
    left: 270,
    top: 0,
    width: 270,
    height: 960,
    color: COLORS.ink,
    exitX: -115,
    exitY: -1080,
    exitRotate: 9,
    clipPath:
      "polygon(6% 0, 100% 0, 93% 28%, 100% 54%, 92% 78%, 100% 100%, 0 100%, 8% 73%, 0 45%)",
  },
  {
    left: 540,
    top: 0,
    width: 270,
    height: 960,
    color: COLORS.backgroundCard,
    exitX: 120,
    exitY: -1090,
    exitRotate: -8,
    clipPath:
      "polygon(0 0, 94% 0, 100% 23%, 91% 49%, 100% 76%, 94% 100%, 0 100%, 7% 72%, 0 43%)",
  },
  {
    left: 810,
    top: 0,
    width: 270,
    height: 960,
    color: COLORS.ink,
    exitX: 360,
    exitY: -220,
    exitRotate: 13,
    clipPath:
      "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 75%, 8% 51%, 0 27%)",
  },
  {
    left: 0,
    top: 960,
    width: 270,
    height: 960,
    color: COLORS.ink,
    exitX: -370,
    exitY: 230,
    exitRotate: 11,
    clipPath:
      "polygon(0 0, 91% 0, 100% 27%, 92% 53%, 100% 78%, 94% 100%, 0 100%)",
  },
  {
    left: 270,
    top: 960,
    width: 270,
    height: 960,
    color: COLORS.backgroundCard,
    exitX: -120,
    exitY: 1090,
    exitRotate: -10,
    clipPath:
      "polygon(7% 0, 100% 0, 93% 25%, 100% 51%, 92% 77%, 100% 100%, 0 100%, 7% 70%, 0 42%)",
  },
  {
    left: 540,
    top: 960,
    width: 270,
    height: 960,
    color: COLORS.ink,
    exitX: 135,
    exitY: 1100,
    exitRotate: 8,
    clipPath:
      "polygon(0 0, 93% 0, 100% 24%, 92% 48%, 100% 75%, 94% 100%, 0 100%, 7% 69%, 0 39%)",
  },
  {
    left: 810,
    top: 960,
    width: 270,
    height: 960,
    color: COLORS.backgroundCard,
    exitX: 375,
    exitY: 250,
    exitRotate: -13,
    clipPath:
      "polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 74%, 8% 49%, 0 22%)",
  },
] as const;

const AlleyVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Camera tiến vào cổ hẻm"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        scale: interpolate(
          frame,
          [0, VIDEO_DURATION - 1, SCENE_DURATION - 1],
          [1.015, 1.085, 1.1],
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
          [0, VIDEO_DURATION - 1, SCENE_DURATION - 1],
          ["0px 0px", "-8px -18px", "-6px -22px"],
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
        name="Phát toàn bộ video gốc"
        durationInFrames={VIDEO_DURATION}
      >
        <MediaAssembler
          kind="video"
          src={VIDEO_SRC}
          durationInFrames={VIDEO_DURATION}
          trimAfter={VIDEO_DURATION}
          playbackRate={1}
          cameraMotion="none"
          contrast={1}
        />
      </Sequence>

      <Sequence
        name="Giữ đông khung hình cuối"
        from={VIDEO_DURATION}
        durationInFrames={HOLD_DURATION}
      >
        <Freeze frame={VIDEO_DURATION - 1}>
          <MediaAssembler
            kind="video"
            src={VIDEO_SRC}
            durationInFrames={VIDEO_DURATION}
            trimAfter={VIDEO_DURATION}
            playbackRate={1}
            cameraMotion="none"
            contrast={1}
          />
        </Freeze>
      </Sequence>
    </Interactive.Div>
  );
};

const LengthDimension: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường đo chiều dài hẻm"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 22,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [LENGTH_LINE_FRAME, LENGTH_LINE_FRAME + 7],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        translate: `${Math.sin((frame - LENGTH_LINE_FRAME) / 19) * 2}px ${
          Math.sin((frame - LENGTH_LINE_FRAME) / 23 + 0.8) * 3
        }px`,
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
          d="M808 390 C792 626 779 885 755 1254"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [LENGTH_LINE_FRAME, LENGTH_LINE_FRAME + 32],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M808 390 C792 626 779 885 755 1254"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [LENGTH_LINE_FRAME + 2, LENGTH_LINE_FRAME + 34],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M754 388 L862 395 M701 1250 L809 1257"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [LENGTH_LINE_FRAME + 18, LENGTH_LINE_FRAME + 31],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M754 388 L862 395 M701 1250 L809 1257"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [LENGTH_LINE_FRAME + 20, LENGTH_LINE_FRAME + 33],
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
        name="Nhãn chiều dài 41 đến 45 mét"
        style={{
          position: "absolute",
          top: 426,
          right: 76,
          minWidth: 254,
          padding: "16px 22px",
          border: `5px solid ${COLORS.ink}`,
          borderRadius: 8,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `10px 10px 0 ${COLORS.ink}`,
          fontSize: 57,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: -1,
          textAlign: "center",
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [LENGTH_LABEL_FRAME, LENGTH_LABEL_FRAME + 7],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [LENGTH_LABEL_FRAME, LENGTH_LABEL_FRAME + 14],
            [0.62, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [LENGTH_LABEL_FRAME, LENGTH_LABEL_FRAME + 14],
            ["34px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [LENGTH_LABEL_FRAME, LENGTH_LABEL_FRAME + 14],
            ["4deg", "-1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        41–45 m
      </Interactive.Div>
    </Interactive.Div>
  );
};

const WidthDimension: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường đo cổ hẻm"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 28,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [WIDTH_LINE_FRAME, WIDTH_LINE_FRAME + 7],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        translate: `${Math.sin((frame - WIDTH_LINE_FRAME) / 17 + 1.1) * 2}px ${
          Math.sin((frame - WIDTH_LINE_FRAME) / 21) * 2
        }px`,
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
          d="M425 900 H655"
          pathLength={1}
          stroke="rgba(20,20,20,0.88)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [WIDTH_LINE_FRAME, WIDTH_LINE_FRAME + 22],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M425 900 H655"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [WIDTH_LINE_FRAME + 2, WIDTH_LINE_FRAME + 24],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M425 850 V950 M655 850 V950"
          pathLength={1}
          stroke="rgba(20,20,20,0.88)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [WIDTH_LINE_FRAME + 11, WIDTH_LINE_FRAME + 25],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M425 850 V950 M655 850 V950"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [WIDTH_LINE_FRAME + 13, WIDTH_LINE_FRAME + 27],
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
        name="Nhãn chiều rộng 3 phẩy 2 đến 4 mét"
        style={{
          position: "absolute",
          top: 745,
          left: 366,
          minWidth: 348,
          padding: "17px 24px",
          border: `5px solid ${COLORS.orange}`,
          borderRadius: 8,
          backgroundColor: "rgba(20,20,20,0.9)",
          color: COLORS.onDarkText,
          boxShadow: `10px 10px 0 ${COLORS.orange}`,
          fontSize: 61,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: -1.2,
          textAlign: "center",
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [WIDTH_LABEL_FRAME, WIDTH_LABEL_FRAME + 7],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [WIDTH_LABEL_FRAME, WIDTH_LABEL_FRAME + 14],
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
            [WIDTH_LABEL_FRAME, WIDTH_LABEL_FRAME + 14],
            ["0px -34px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [WIDTH_LABEL_FRAME, WIDTH_LABEL_FRAME + 14],
            ["-4deg", "1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        3,2–4 m
      </Interactive.Div>
    </Interactive.Div>
  );
};

const FunnelContour: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường bao hình phễu"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [FUNNEL_FRAME, FUNNEL_FRAME + 8],
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
          d="M252 390 C305 558 368 721 424 868 C444 920 419 1040 350 1260 M828 390 C775 558 712 721 656 868 C636 920 661 1040 730 1260"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FUNNEL_FRAME, FUNNEL_FRAME + 32],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M252 390 C305 558 368 721 424 868 C444 920 419 1040 350 1260 M828 390 C775 558 712 721 656 868 C636 920 661 1040 730 1260"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FUNNEL_FRAME + 2, FUNNEL_FRAME + 34],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M398 850 C450 875 493 885 540 885 C587 885 630 875 682 850"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [FUNNEL_FRAME + 18, FUNNEL_FRAME + 31],
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

const OpposingArrows: React.FC = () => {
  const frame = useCurrentFrame();

  const upperOffset = interpolate(
    frame,
    [ARROWS_FRAME, COLLISION_FRAME],
    [-245, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const lowerOffset = interpolate(
    frame,
    [ARROWS_FRAME, COLLISION_FRAME],
    [250, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const settledUpperTremble =
    frame >= COLLISION_FRAME ? Math.sin(frame / 7) * 1.5 : 0;
  const settledLowerTremble =
    frame >= COLLISION_FRAME ? Math.sin(frame / 8 + 1.4) * 1.5 : 0;

  return (
    <Interactive.Div
      name="Hai luồng người đối đầu"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 34,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [ARROWS_FRAME, ARROWS_FRAME + 7],
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
        <g transform={`translate(0 ${upperOffset + settledUpperTremble})`}>
          <path
            d="M540 480 V835 M487 778 L540 840 L593 778"
            pathLength={1}
            stroke="rgba(20,20,20,0.9)"
            strokeWidth={29}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROWS_FRAME, ARROWS_FRAME + 15],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
          <path
            d="M540 480 V835 M487 778 L540 840 L593 778"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={13}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROWS_FRAME + 2, ARROWS_FRAME + 17],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        </g>

        <g transform={`translate(0 ${lowerOffset + settledLowerTremble})`}>
          <path
            d="M540 1310 V965 M487 1022 L540 960 L593 1022"
            pathLength={1}
            stroke="rgba(20,20,20,0.9)"
            strokeWidth={29}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROWS_FRAME, ARROWS_FRAME + 15],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
          <path
            d="M540 1310 V965 M487 1022 L540 960 L593 1022"
            pathLength={1}
            stroke={COLORS.onDarkText}
            strokeWidth={13}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [ARROWS_FRAME + 2, ARROWS_FRAME + 17],
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

const CollisionAccent: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Điểm va tại cổ phễu"
      style={{
        position: "absolute",
        zIndex: 40,
        top: 808,
        left: 448,
        width: 184,
        height: 184,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [COLLISION_FRAME, COLLISION_FRAME + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [COLLISION_FRAME, COLLISION_FRAME + 8, COLLISION_FRAME + 15],
          [0.38, 1.18, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(
          frame,
          [COLLISION_FRAME, COLLISION_FRAME + 8, SCENE_DURATION - 1],
          ["-15deg", "2deg", "-1deg"],
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
      <svg
        width="184"
        height="184"
        viewBox="0 0 184 184"
        fill="none"
        aria-hidden="true"
        style={{overflow: "visible"}}
      >
        <circle
          cx="92"
          cy="92"
          r={interpolate(
            frame,
            [COLLISION_FRAME, COLLISION_FRAME + 12, SCENE_DURATION - 1],
            [0, 78, 68],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          )}
          fill="rgba(20,20,20,0.82)"
          stroke={COLORS.orange}
          strokeWidth={10}
        />

        <path
          d="M92 12 V42 M92 142 V172 M12 92 H42 M142 92 H172 M35 35 L56 56 M128 128 L149 149 M149 35 L128 56 M56 128 L35 149"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [COLLISION_FRAME + 3, COLLISION_FRAME + 17],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M59 92 H125 M74 69 L52 92 L74 115 M110 69 L132 92 L110 115"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [COLLISION_FRAME + 7, COLLISION_FRAME + 21],
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

const ShatterEntrance: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Shatter entrance"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 90,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: interpolate(frame, [15, 26], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {SHARDS.map((shard, index) => (
        <Interactive.Div
          key={`${shard.left}-${shard.top}`}
          name={`Mảnh vỡ ${index + 1}`}
          style={{
            position: "absolute",
            left: shard.left,
            top: shard.top,
            width: shard.width,
            height: shard.height,
            overflow: "hidden",
            clipPath: shard.clipPath,
            backgroundColor: shard.color,
            border: `3px solid ${
              shard.color === COLORS.ink ? COLORS.orange : COLORS.ink
            }`,
            translate: interpolate(
              frame,
              [index * 0.6, 22 + index * 0.6],
              ["0px 0px", `${shard.exitX}px ${shard.exitY}px`],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.7, 0, 0.84, 0),
              },
            ),
            rotate: interpolate(
              frame,
              [index * 0.6, 22 + index * 0.6],
              ["0deg", `${shard.exitRotate}deg`],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.7, 0, 0.84, 0),
              },
            ),
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: shard.color === COLORS.ink ? 0.32 : 0.22,
              backgroundImage:
                shard.color === COLORS.ink
                  ? "repeating-linear-gradient(7deg, transparent 0 48px, rgba(247,244,236,0.28) 50px 54px, transparent 56px 104px)"
                  : "repeating-linear-gradient(-7deg, transparent 0 46px, rgba(20,20,20,0.25) 48px 52px, transparent 54px 102px)",
            }}
          />
        </Interactive.Div>
      ))}
    </Interactive.Div>
  );
};

export const Scene16: React.FC = () => {
  const frame = useCurrentFrame();

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
      <AlleyVideo />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          opacity: interpolate(frame, [0, 22], [0, 0.15], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <BackgroundTreatment variant="grid" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 8,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.36) 0%, rgba(20,20,20,0.02) 35%, rgba(20,20,20,0.08) 68%, rgba(20,20,20,0.34) 100%)",
        }}
      />

      <LengthDimension />
      <WidthDimension />
      <FunnelContour />
      <OpposingArrows />
      <CollisionAccent />
      <ShatterEntrance />

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