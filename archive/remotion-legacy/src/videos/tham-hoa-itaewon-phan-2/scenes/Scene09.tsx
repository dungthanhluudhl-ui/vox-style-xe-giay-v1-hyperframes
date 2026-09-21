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
  "videos/tham-hoa-itaewon-phan-2/media/images/img-02-itaewon-crowd-crush-illustration.jpeg",
);

const SCENE_DURATION = 227;
const COUNTER_START_FRAME = 83;
const PUNCH_FRAME = 152;
const YEAR_FRAME = 179;

const CROWD_MEMBERS = [
  {x: 28, y: 92, scale: 0.78},
  {x: 60, y: 58, scale: 0.92},
  {x: 94, y: 88, scale: 0.72},
  {x: 126, y: 48, scale: 1},
  {x: 162, y: 82, scale: 0.82},
  {x: 198, y: 54, scale: 0.94},
  {x: 232, y: 92, scale: 0.74},
  {x: 44, y: 130, scale: 0.86},
  {x: 82, y: 120, scale: 1},
  {x: 122, y: 132, scale: 0.82},
  {x: 158, y: 116, scale: 0.96},
  {x: 200, y: 130, scale: 0.84},
  {x: 236, y: 122, scale: 0.9},
] as const;

const CrowdIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Crowd density icon"
      style={{
        width: 275,
        height: 208,
        opacity: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 8],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 14],
          [0.78, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: `${Math.sin((frame - COUNTER_START_FRAME) / 15) * 2}px ${
          Math.sin((frame - COUNTER_START_FRAME) / 19 + 0.8) * 3
        }px`,
      }}
    >
      <svg
        width="275"
        height="208"
        viewBox="0 0 275 208"
        fill="none"
        aria-hidden="true"
      >
        {CROWD_MEMBERS.map((member, index) => {
          const drawStart = COUNTER_START_FRAME + index * 4;

          return (
            <g
              key={`${member.x}-${member.y}-${index}`}
              transform={`translate(${member.x} ${member.y}) scale(${member.scale})`}
              opacity={interpolate(
                frame,
                [drawStart, drawStart + 7],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            >
              <circle
                cx="0"
                cy="-23"
                r="10"
                fill={COLORS.ink}
                stroke={
                  index % 3 === 0 ? COLORS.orange : COLORS.onDarkText
                }
                strokeWidth="4"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [drawStart, drawStart + 9],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                )}
              />
              <path
                d="M-17 20 C-16 -5 -9 -13 0 -13 C9 -13 16 -5 17 20 M0 -11 V15 M-13 0 L0 7 L13 0"
                pathLength={1}
                stroke={
                  index % 3 === 0 ? COLORS.orange : COLORS.onDarkText
                }
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [drawStart + 3, drawStart + 13],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                )}
              />
            </g>
          );
        })}
      </svg>
    </Interactive.Div>
  );
};

const DataPlate: React.FC = () => {
  const frame = useCurrentFrame();

  const displayedCount =
    frame < 100
      ? "0"
      : frame < 122
        ? "25.000"
        : frame < PUNCH_FRAME
          ? "60.000"
          : "100.000";

  return (
    <Interactive.Div
      name="Halloween crowd counter"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 218,
        left: 60,
        width: 960,
        height: 482,
        overflow: "hidden",
        border: `5px solid ${COLORS.onDarkText}`,
        borderRadius: 12,
        backgroundColor: "rgba(20,20,20,0.9)",
        boxShadow: `14px 14px 0 ${COLORS.orange}`,
        opacity: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 8],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 15],
          [0.88, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 15],
          ["0px 42px", "0px 0px"],
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
          opacity: 0.16,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 94px, rgba(247,244,236,0.38) 96px, transparent 99px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 30,
          left: 34,
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: COLORS.onDarkText,
          fontSize: 25,
          fontWeight: FONT.weights.black,
          letterSpacing: 2.8,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 13,
            height: 34,
            backgroundColor: COLORS.orange,
          }}
        />
        <span>ĐỈNH MẬT ĐỘ</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 28,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <CrowdIcon />

        <div
          style={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Interactive.Div
            name="Crowd count"
            style={{
              color:
                frame >= PUNCH_FRAME
                  ? COLORS.orange
                  : COLORS.onDarkText,
              fontSize: 128,
              fontWeight: FONT.weights.black,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 0.96,
              letterSpacing: -5,
              whiteSpace: "nowrap",
              transformOrigin: "right center",
              scale: interpolate(
                frame,
                [83, 94, 99, 105, 121, 127, 152, 161, 168],
                [0.7, 1, 0.92, 1, 0.92, 1, 0.84, 1.08, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                  output: "perceptual-scale",
                },
              ),
            }}
          >
            {displayedCount}
          </Interactive.Div>

          <div
            style={{
              marginTop: 20,
              width: "100%",
              height: 16,
              overflow: "hidden",
              border: `3px solid ${COLORS.onDarkText}`,
              backgroundColor: "rgba(247,244,236,0.12)",
            }}
          >
            <div
              style={{
                width: interpolate(
                  frame,
                  [83, 100, 122, 152],
                  [0, 25, 60, 100],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
                height: "100%",
                backgroundColor: COLORS.orange,
              }}
            />
          </div>

          <Interactive.Div
            name="2019 data badge"
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "11px 20px",
              border: `3px solid ${COLORS.orange}`,
              backgroundColor: COLORS.backgroundCard,
              color: COLORS.ink,
              fontSize: 43,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
              letterSpacing: 1.8,
              opacity: interpolate(
                frame,
                [YEAR_FRAME, YEAR_FRAME + 7],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              scale: interpolate(
                frame,
                [YEAR_FRAME, YEAR_FRAME + 13],
                [0.72, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                  output: "perceptual-scale",
                },
              ),
              translate: interpolate(
                frame,
                [YEAR_FRAME, YEAR_FRAME + 13],
                ["26px 0px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: COLORS.orange,
              }}
            />
            <span>2019</span>
          </Interactive.Div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          bottom: 25,
          height: 5,
          backgroundColor: "rgba(247,244,236,0.24)",
        }}
      >
        {[0, 0.25, 0.6, 1].map((position, index) => (
          <div
            key={`${position}-${index}`}
            style={{
              position: "absolute",
              left: `${position * 100}%`,
              top: -7,
              width: 19,
              height: 19,
              marginLeft: -9.5,
              borderRadius: "50%",
              border: `3px solid ${COLORS.ink}`,
              backgroundColor:
                frame >= [83, 100, 122, 152][index]
                  ? COLORS.orange
                  : COLORS.onDarkText,
              scale: interpolate(
                frame,
                [
                  [83, 100, 122, 152][index],
                  [83, 100, 122, 152][index] + 9,
                ],
                [0.4, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                  output: "perceptual-scale",
                },
              ),
            }}
          />
        ))}
      </div>
    </Interactive.Div>
  );
};

export const Scene09: React.FC = () => {
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
      <Interactive.Div
        name="Grow into Halloween crowd"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 20], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          }),
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
            scale: interpolate(
              frame,
              [0, SCENE_DURATION - 1],
              [1, 1.07],
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
              ["0px 0px", "-8px -32px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          opacity: interpolate(frame, [0, 14], [0, 0.16], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <BackgroundTreatment variant="chart" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.58) 0%, rgba(20,20,20,0.16) 39%, rgba(20,20,20,0.02) 67%, rgba(20,20,20,0.28) 100%)",
        }}
      />

      <DataPlate />

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