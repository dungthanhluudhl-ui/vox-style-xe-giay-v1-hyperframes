import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const PEOPLE_COUNT = 158;
const LAST_MARKER_INDEX = PEOPLE_COUNT - 1;
const COUNTER_START_FRAME = 26;
const DIM_WAVE_START_FRAME = 65;
const FINAL_ACCENT_FRAME = 108;
const SCENE_DURATION_IN_FRAMES = 178;

const PEOPLE = Array.from({length: PEOPLE_COUNT}, (_, index) => index);

if (PEOPLE.length !== 158) {
  throw new Error("Scene04 must render exactly 158 person markers.");
}

const getRevealFrame = (index: number) => {
  const progress = index / LAST_MARKER_INDEX;

  return Math.round(
    FINAL_ACCENT_FRAME * Math.pow(progress, 0.62),
  );
};

const getDimFrame = (index: number) => {
  return (
    DIM_WAVE_START_FRAME +
    Math.round((index / LAST_MARKER_INDEX) * 92)
  );
};

const getMarkerPosition = (index: number) => {
  const row = Math.floor(index / 14);
  const column = index % 14;
  const centeredColumn = row === 11 ? column + 5 : column;

  return {
    left: 86 + centeredColumn * 65,
    top: 508 + row * 68,
  };
};

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();

  const revealedCount = PEOPLE.reduce((count, index) => {
    return frame >= getRevealFrame(index) ? count + 1 : count;
  }, 0);

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
      }}
    >
      <BackgroundTreatment variant="chart" />

      {[20, 40, 60, 80].map((topPercent, index) => (
        <Interactive.Div
          key={topPercent}
          name={`Chart tick ${index + 1}`}
          style={{
            position: "absolute",
            zIndex: 2,
            top: `${topPercent}%`,
            left: 0,
            width: interpolate(
              frame,
              [4 + index * 4, 14 + index * 4],
              [0, 42],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            height: 9,
            translate: "0px -4px",
            backgroundColor: COLORS.orange,
            boxShadow: `0 3px 0 ${COLORS.ink}`,
          }}
        />
      ))}

      <Interactive.Div
        name="158-person data field"
        style={{
          position: "absolute",
          zIndex: 10,
          inset: 0,
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 15], [0.94, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 190}),
            output: "perceptual-scale",
          }),
          rotate: interpolate(frame, [0, 15], ["-1.2deg", "0deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 190}),
          }),
          transformOrigin: "50% 48%",
        }}
      >
        {PEOPLE.map((index) => {
          const revealFrame = getRevealFrame(index);
          const dimFrame = getDimFrame(index);
          const position = getMarkerPosition(index);
          const isLastMarker = index === LAST_MARKER_INDEX;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: position.left,
                top: position.top,
                width: 48,
                height: 58,
                color:
                  isLastMarker && frame >= FINAL_ACCENT_FRAME
                    ? COLORS.orange
                    : `rgba(20,20,20,${interpolate(
                        frame,
                        [dimFrame, dimFrame + 8],
                        [1, 0.28],
                        {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                          easing: Easing.bezier(0.16, 1, 0.3, 1),
                        },
                      )})`,
                opacity: interpolate(
                  frame,
                  [revealFrame - 4, revealFrame],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
                scale: isLastMarker
                  ? interpolate(
                      frame,
                      [
                        revealFrame - 7,
                        revealFrame,
                        FINAL_ACCENT_FRAME + 4,
                        FINAL_ACCENT_FRAME + 11,
                      ],
                      [0.2, 1, 1.44, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: [
                          Easing.spring({damping: 185}),
                          Easing.spring({damping: 145}),
                          Easing.spring({damping: 185}),
                        ],
                        output: "perceptual-scale",
                      },
                    )
                  : interpolate(
                      frame,
                      [revealFrame - 7, revealFrame],
                      [0.2, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: Easing.spring({damping: 185}),
                        output: "perceptual-scale",
                      },
                    ),
                translate: isLastMarker
                  ? interpolate(
                      frame,
                      [
                        revealFrame - 7,
                        revealFrame,
                        FINAL_ACCENT_FRAME + 4,
                        FINAL_ACCENT_FRAME + 11,
                      ],
                      [
                        "0px 18px",
                        "0px 0px",
                        "0px -9px",
                        "0px 0px",
                      ],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                        easing: [
                          Easing.spring({damping: 185}),
                          Easing.spring({damping: 145}),
                          Easing.spring({damping: 185}),
                        ],
                      },
                    )
                  : `${Math.sin((frame + index * 3.7) * 0.055) * 0.8}px ${
                      Math.cos((frame + index * 4.1) * 0.047) * 0.7
                    }px`,
                rotate: `${
                  Math.sin((frame + index * 5.3) * 0.045) * 0.65
                }deg`,
                transformOrigin: "50% 80%",
                filter:
                  isLastMarker && frame >= FINAL_ACCENT_FRAME
                    ? "drop-shadow(4px 4px 0px rgba(20,20,20,0.9))"
                    : "none",
              }}
            >
              <svg
                width="48"
                height="58"
                viewBox="0 0 48 58"
                fill="none"
                aria-hidden="true"
              >
                <circle cx={24} cy={9} r={8} fill="currentColor" />
                <path
                  d="M16 20 C18 18 21 17 24 17 C27 17 30 18 32 20 L38 34 L32 37 L29 29 L30 42 L38 57 H28 L24 44 L20 57 H10 L18 42 L19 29 L16 37 L10 34 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          );
        })}
      </Interactive.Div>

      <Interactive.Div
        name="Synchronized victim counter"
        style={{
          position: "absolute",
          zIndex: 20,
          top: 202,
          left: 68,
          width: 308,
          height: 142,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 8,
          backgroundColor: COLORS.backgroundCard,
          color: COLORS.ink,
          boxShadow: `10px 10px 0 ${COLORS.orange}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 76,
          lineHeight: 1,
          letterSpacing: -3,
          fontVariantNumeric: "tabular-nums",
          opacity: interpolate(
            frame,
            [COUNTER_START_FRAME, COUNTER_START_FRAME + 6],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(
            frame,
            [COUNTER_START_FRAME, COUNTER_START_FRAME + 10],
            ["-46px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            },
          ),
          rotate: interpolate(
            frame,
            [COUNTER_START_FRAME, COUNTER_START_FRAME + 10],
            ["-4deg", "-1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            },
          ),
        }}
      >
        {revealedCount}
        <span
          style={{
            marginLeft: 14,
            color: COLORS.orange,
            fontSize: 34,
            letterSpacing: -1,
          }}
        >
          / 158
        </span>
      </Interactive.Div>

      <Interactive.Div
        name="158 punch phrase"
        style={{
          position: "absolute",
          zIndex: 24,
          top: 174,
          right: 60,
          width: 520,
          height: 198,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "polygon(3% 0, 100% 5%, 96% 100%, 0 94%)",
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `15px 15px 0 ${COLORS.ink}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 164,
          lineHeight: 0.9,
          letterSpacing: -10,
          fontVariantNumeric: "tabular-nums",
          opacity: interpolate(
            frame,
            [FINAL_ACCENT_FRAME, FINAL_ACCENT_FRAME + 4],
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
              FINAL_ACCENT_FRAME,
              FINAL_ACCENT_FRAME + 5,
              FINAL_ACCENT_FRAME + 13,
            ],
            [0.45, 1.12, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 145}),
                Easing.spring({damping: 190}),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [
              FINAL_ACCENT_FRAME,
              FINAL_ACCENT_FRAME + 5,
              FINAL_ACCENT_FRAME + 13,
            ],
            ["0px 72px", "0px -10px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 145}),
                Easing.spring({damping: 190}),
              ],
            },
          ),
          rotate: interpolate(
            frame,
            [
              FINAL_ACCENT_FRAME,
              FINAL_ACCENT_FRAME + 5,
              FINAL_ACCENT_FRAME + 13,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            ["-8deg", "2deg", "-1deg", "-0.6deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 145}),
                Easing.spring({damping: 190}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        158
      </Interactive.Div>
    </AbsoluteFill>
  );
};