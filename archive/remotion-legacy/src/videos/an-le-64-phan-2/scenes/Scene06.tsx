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

const SCENE_DURATION = 191;

const PUNCH_START_FRAME = 9;
const PUNCH_DURATION = 60;

const COUNTER_START_FRAME = 91;
const COUNTER_DURATION = 100;
const COUNTER_LOCK_FRAME = 7;

const MARKERS_START_FRAME = 98;
const MARKERS_DURATION = 93;

const DIMENSION_START_FRAME = 146;
const DIMENSION_DURATION = 45;
const DIMENSION_LABEL_LOCK_FRAME = 29;

const VIDEO_SRC = staticFile(
  "videos/an-le-64-phan-2/media/videos/vid-01-cardboard-crime-weapons-prep.mp4",
);

const BATON_TARGETS = [
  {
    left: 160,
    top: 630,
    width: 670,
    height: 110,
    rotate: -7,
  },
  {
    left: 245,
    top: 830,
    width: 670,
    height: 110,
    rotate: 5,
  },
  {
    left: 165,
    top: 1045,
    width: 690,
    height: 110,
    rotate: -8,
  },
] as const;

type TimedVisibilityProps = {
  children: React.ReactNode;
  durationInFrames: number;
  name: string;
};

const TimedVisibility: React.FC<TimedVisibilityProps> = ({
  children,
  durationInFrames,
  name,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [0, 5, durationInFrames - 7, durationInFrames - 1],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          },
        ),
      }}
    >
      {children}
    </Interactive.Div>
  );
};

const PunchPhrase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Chuẩn bị có chủ đích"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 190,
        left: 70,
        width: 940,
        boxSizing: "border-box",
        padding: "20px 28px 23px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: COLORS.orange,
        boxShadow: `13px 13px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 58,
        lineHeight: 1.14,
        letterSpacing: -1.4,
        textAlign: "center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 8, 14], [0.62, 1.08, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.spring({damping: 200}),
            Easing.spring({damping: 200}),
          ],
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 9, 18, PUNCH_DURATION - 1],
          ["0px 48px", "0px -5px", "0px 0px", "0px -3px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 10, 18, PUNCH_DURATION - 1],
          ["-4deg", "1.2deg", "-0.4deg", "0.2deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
      }}
    >
      CHUẨN BỊ CÓ CHỦ ĐÍCH
    </Interactive.Div>
  );
};

const BatonCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const lockFrames = [2, 5, COUNTER_LOCK_FRAME];

  return (
    <Interactive.Div
      name="Bộ đếm ba gậy"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 36,
        pointerEvents: "none",
      }}
    >
      {BATON_TARGETS.map((target, index) => {
        const lockFrame = lockFrames[index];
        const revealFrame = Math.max(0, lockFrame - 3);

        return (
          <Interactive.Div
            key={`baton-count-${index + 1}`}
            name={`Số đếm gậy ${index + 1}`}
            style={{
              position: "absolute",
              top: target.top - 38,
              left: target.left - 34,
              width: 88,
              height: 88,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `5px solid ${COLORS.ink}`,
              borderRadius: "50%",
              backgroundColor: COLORS.orange,
              boxShadow: `8px 8px 0 ${COLORS.ink}`,
              color: COLORS.ink,
              fontFamily,
              fontWeight: FONT.weights.black,
              fontSize: 48,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              opacity: interpolate(
                frame,
                [revealFrame, lockFrame],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              scale: interpolate(
                frame,
                [revealFrame, lockFrame, lockFrame + 5],
                [0.42, 1.18, 1],
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
              translate: interpolate(
                frame,
                [revealFrame, lockFrame],
                ["0px 26px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
              rotate: interpolate(
                frame,
                [revealFrame, lockFrame],
                [`${-13 + index * 5}deg`, `${-2 + index * 2}deg`],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            {index + 1}
          </Interactive.Div>
        );
      })}

      <Interactive.Div
        name="Dải dữ liệu một hai ba"
        style={{
          position: "absolute",
          top: 430,
          left: 344,
          width: 392,
          boxSizing: "border-box",
          padding: "12px 24px 15px",
          border: `4px solid ${COLORS.orange}`,
          borderRadius: 8,
          backgroundColor: "rgba(20,20,20,0.9)",
          boxShadow: `9px 9px 0 ${COLORS.orange}`,
          color: COLORS.onDarkText,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 55,
          lineHeight: 1,
          letterSpacing: 11,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          opacity: interpolate(
            frame,
            [0, 4, COUNTER_DURATION - 1],
            [0, 1, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
              ],
            },
          ),
          scale: interpolate(
            frame,
            [0, COUNTER_LOCK_FRAME, COUNTER_LOCK_FRAME + 6],
            [0.75, 1.06, 1],
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
        }}
      >
        1 · 2 · 3
      </Interactive.Div>
    </Interactive.Div>
  );
};

type FocusMarkerProps = {
  index: number;
  delay: number;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
};

const FocusMarker: React.FC<FocusMarkerProps> = ({
  index,
  delay,
  left,
  top,
  width,
  height,
  rotate,
}) => {
  const frame = useCurrentFrame();

  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    width: 52,
    height: 52,
    borderColor: COLORS.orange,
    borderStyle: "solid",
    pointerEvents: "none",
  };

  return (
    <Interactive.Div
      name={`Khóa tiêu điểm gậy ${index + 1}`}
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        rotate: `${rotate}deg`,
        borderRadius: 18,
        backgroundColor: "rgba(247,244,236,0.025)",
        WebkitBackdropFilter: "contrast(1.18) brightness(1.03)",
        backdropFilter: "contrast(1.18) brightness(1.03)",
        boxShadow: `0 0 0 3px rgba(20,20,20,0.42)`,
        opacity: interpolate(frame, [delay, delay + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [delay, delay + 8, delay + 14],
          [1.22, 0.96, 1],
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
      }}
    >
      <div
        style={{
          ...cornerStyle,
          top: -5,
          left: -5,
          borderWidth: "8px 0 0 8px",
          borderRadius: "16px 0 0 0",
        }}
      />
      <div
        style={{
          ...cornerStyle,
          top: -5,
          right: -5,
          borderWidth: "8px 8px 0 0",
          borderRadius: "0 16px 0 0",
        }}
      />
      <div
        style={{
          ...cornerStyle,
          bottom: -5,
          left: -5,
          borderWidth: "0 0 8px 8px",
          borderRadius: "0 0 0 16px",
        }}
      />
      <div
        style={{
          ...cornerStyle,
          right: -5,
          bottom: -5,
          borderWidth: "0 8px 8px 0",
          borderRadius: "0 0 16px 0",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -18,
          border: `4px solid ${COLORS.orange}`,
          borderRadius: 26,
          opacity: interpolate(
            frame,
            [delay + 6, delay + 16, delay + 30],
            [0, 0.75, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [delay + 6, delay + 30],
            [0.86, 1.12],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      />
    </Interactive.Div>
  );
};

const FocusMarkers: React.FC = () => {
  return (
    <Interactive.Div
      name="Ba marker khóa vào gậy"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 32,
        pointerEvents: "none",
      }}
    >
      {BATON_TARGETS.map((target, index) => (
        <FocusMarker
          key={`focus-marker-${index + 1}`}
          index={index}
          delay={index * 7}
          left={target.left}
          top={target.top}
          width={target.width}
          height={target.height}
          rotate={target.rotate}
        />
      ))}
    </Interactive.Div>
  );
};

const DimensionLine: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường đo sáu mươi centimet"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 42,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <path
          d="M185 1228 L862 1133"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={19}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 27], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M185 1218 L862 1123"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 29], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M174 1168 L196 1278"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 11], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M851 1073 L873 1183"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [20, 31], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M174 1158 L196 1268"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 13], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M851 1063 L873 1173"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [22, 33], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      <Interactive.Div
        name="Mốc sáu mươi centimet"
        style={{
          position: "absolute",
          top: 1220,
          left: 115,
          minWidth: 250,
          boxSizing: "border-box",
          padding: "14px 22px 17px",
          border: `5px solid ${COLORS.ink}`,
          borderRadius: 8,
          backgroundColor: COLORS.orange,
          boxShadow: `10px 10px 0 ${COLORS.ink}`,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 61,
          lineHeight: 1,
          letterSpacing: -1.3,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
          opacity: interpolate(
            frame,
            [
              DIMENSION_LABEL_LOCK_FRAME - 4,
              DIMENSION_LABEL_LOCK_FRAME,
            ],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [
              DIMENSION_LABEL_LOCK_FRAME - 5,
              DIMENSION_LABEL_LOCK_FRAME,
              DIMENSION_LABEL_LOCK_FRAME + 5,
            ],
            [0.55, 1.14, 1],
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
            [
              DIMENSION_LABEL_LOCK_FRAME - 5,
              DIMENSION_LABEL_LOCK_FRAME + 5,
            ],
            ["-9deg", "-2deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        60 CM
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
      }}
    >
      <Interactive.Div
        name="Punch video entrance"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 10, 19], [1.2, 0.985, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          }),
          rotate: interpolate(frame, [0, 13, 21], ["1.8deg", "-0.3deg", "0deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
          }),
        }}
      >
        <MediaAssembler
          kind="video"
          src={VIDEO_SRC}
          durationInFrames={SCENE_DURATION}
          trimBefore={0.8 * 30}
          trimAfter={7.15 * 30}
          cameraMotion="none"
          objectPosition="50% 50%"
          contrast={1.08}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.02) 25%, rgba(20,20,20,0) 64%, rgba(20,20,20,0.3) 100%), radial-gradient(circle at 50% 52%, rgba(247,244,236,0.05) 0%, rgba(20,20,20,0.04) 58%, rgba(20,20,20,0.3) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <AbsoluteFill
        style={{
          zIndex: 8,
          opacity: 0.27,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      >
        <BackgroundTreatment variant="chart" />
      </AbsoluteFill>

      {[384, 768, 1152, 1536].map((top, index) => (
        <div
          key={`chart-tick-${top}`}
          style={{
            position: "absolute",
            zIndex: 9,
            top: top - 5,
            left: 0,
            width: 52 + index * 8,
            height: 10,
            backgroundColor: COLORS.orange,
            opacity: interpolate(
              frame,
              [6 + index * 4, 14 + index * 4],
              [0, 0.72],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            pointerEvents: "none",
          }}
        />
      ))}

      <Sequence
        name="Punch phrase"
        from={PUNCH_START_FRAME}
        durationInFrames={PUNCH_DURATION}
        layout="none"
      >
        <TimedVisibility
          name="Punch phrase visibility"
          durationInFrames={PUNCH_DURATION}
        >
          <PunchPhrase />
        </TimedVisibility>
      </Sequence>

      <Sequence
        name="Baton data counter"
        from={COUNTER_START_FRAME}
        durationInFrames={COUNTER_DURATION}
        layout="none"
      >
        <BatonCounter />
      </Sequence>

      <Sequence
        name="Baton focus markers"
        from={MARKERS_START_FRAME}
        durationInFrames={MARKERS_DURATION}
        layout="none"
      >
        <FocusMarkers />
      </Sequence>

      <Sequence
        name="Sixty centimeter dimension"
        from={DIMENSION_START_FRAME}
        durationInFrames={DIMENSION_DURATION}
        layout="none"
      >
        <DimensionLine />
      </Sequence>

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