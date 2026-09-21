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

const SCENE_DURATION_IN_FRAMES = 299;

const TRUTH_START_FRAME = 5;
const TRUTH_END_FRAME = 84;
const TRAIL_START_FRAME = 33;
const CHANNEL_TITLE_START_FRAME = 86;
const FOLLOW_BUTTON_START_FRAME = 131;
const FOLLOW_ACTIVE_FRAME = 147;
const LIKE_BUTTON_START_FRAME = 159;
const LIKE_ACTIVE_FRAME = 176;
const FINAL_PHRASE_START_FRAME = 222;

const TRAIL_PATH =
  "M882 394 C1000 420 988 526 824 570 C644 618 150 538 116 684 C82 828 276 884 526 858 C690 842 816 786 886 702";

type ActionButtonProps = {
  name: string;
  text: string;
  left: number;
  startFrame: number;
  activeFrame: number;
  tilt: number;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  text,
  left,
  startFrame,
  activeFrame,
  tilt,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 30,
        top: 982,
        left,
        width: 450,
        height: 132,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 12,
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `11px 11px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 42,
        lineHeight: 1,
        letterSpacing: 1.8,
        opacity: interpolate(
          frame,
          [startFrame, startFrame + 5],
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
            startFrame,
            startFrame + 9,
            activeFrame,
            activeFrame + 4,
            activeFrame + 11,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [0.68, 1, 1, 1.08, 1, 1.012],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.linear,
              Easing.spring({damping: 145}),
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [
            startFrame,
            startFrame + 9,
            activeFrame,
            activeFrame + 4,
            activeFrame + 11,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [
            "0px 48px",
            "0px 0px",
            "0px 0px",
            "0px -7px",
            "0px 0px",
            "0px -2px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.linear,
              Easing.spring({damping: 145}),
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [
            startFrame,
            startFrame + 9,
            activeFrame,
            activeFrame + 4,
            activeFrame + 11,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [
            `${tilt * 4}deg`,
            `${tilt}deg`,
            `${tilt}deg`,
            `${tilt * -0.75}deg`,
            `${tilt * 0.45}deg`,
            `${tilt * -0.25}deg`,
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.linear,
              Easing.spring({damping: 145}),
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          bottom: 0,
          left: 0,
          width: interpolate(
            frame,
            [activeFrame, activeFrame + 8],
            [0, 450],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          backgroundColor: COLORS.orange,
        }}
      />

      <span
        style={{
          position: "relative",
          zIndex: 2,
          translate: interpolate(
            frame,
            [activeFrame, activeFrame + 8],
            ["20px 0px", "-16px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            },
          ),
        }}
      >
        {text}
      </span>

      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 2,
          marginLeft: 8,
          opacity: interpolate(
            frame,
            [activeFrame + 3, activeFrame + 7],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [activeFrame + 3, activeFrame + 9],
            [0.4, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 170}),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        <circle cx={27} cy={27} r={22} fill={COLORS.ink} />
        <path
          d="M16 27 L24 35 L39 18"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [activeFrame + 4, activeFrame + 12],
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

const OrangeTrail: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Orange truth trail"
      style={{
        position: "absolute",
        zIndex: 5,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [TRAIL_START_FRAME, TRAIL_START_FRAME + 5],
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
          d={TRAIL_PATH}
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={38}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TRAIL_START_FRAME, 112],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          opacity={0.88}
          transform="translate(8 9)"
        />
        <path
          d={TRAIL_PATH}
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={28}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TRAIL_START_FRAME, 112],
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
        name="Rolled paper end"
        style={{
          position: "absolute",
          top: 671,
          left: 852,
          width: 74,
          height: 74,
          border: `9px solid ${COLORS.orange}`,
          borderLeftColor: "transparent",
          borderRadius: "50%",
          opacity: interpolate(frame, [105, 113], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [105, 116], [0.35, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 175}),
            output: "perceptual-scale",
          }),
          rotate: interpolate(frame, [105, 116], ["-95deg", "18deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 175}),
          }),
          boxShadow: `7px 7px 0 ${COLORS.ink}`,
        }}
      />
    </Interactive.Div>
  );
};

const ChannelTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const words = [
    {
      text: "DẤU",
      left: 112,
      top: 570,
      fontSize: 92,
      startFrame: CHANNEL_TITLE_START_FRAME,
      entrance: "-70px 34px",
      tilt: -1.2,
    },
    {
      text: "VẾT",
      left: 382,
      top: 570,
      fontSize: 92,
      startFrame: CHANNEL_TITLE_START_FRAME + 5,
      entrance: "0px 58px",
      tilt: 1.1,
    },
    {
      text: "CUỐI",
      left: 202,
      top: 710,
      fontSize: 96,
      startFrame: CHANNEL_TITLE_START_FRAME + 10,
      entrance: "0px -52px",
      tilt: -0.8,
    },
    {
      text: "CÙNG",
      left: 524,
      top: 710,
      fontSize: 96,
      startFrame: CHANNEL_TITLE_START_FRAME + 15,
      entrance: "72px 32px",
      tilt: 1.2,
    },
  ] as const;

  return (
    <>
      {words.map((word, index) => (
        <Interactive.Div
          key={word.text}
          name={`Channel title word ${index + 1}`}
          style={{
            position: "absolute",
            zIndex: 12,
            top: word.top,
            left: word.left,
            padding: index < 2 ? "5px 18px 10px" : "4px 20px 11px",
            backgroundColor:
              index === 1 || index === 2
                ? COLORS.orange
                : COLORS.backgroundCard,
            border: `5px solid ${COLORS.ink}`,
            color: COLORS.ink,
            boxShadow:
              index === 1 || index === 2
                ? `11px 11px 0 ${COLORS.ink}`
                : `11px 11px 0 ${COLORS.orange}`,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: word.fontSize,
            lineHeight: 0.98,
            letterSpacing: -4,
            whiteSpace: "nowrap",
            opacity: interpolate(
              frame,
              [word.startFrame, word.startFrame + 5],
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
                word.startFrame,
                word.startFrame + 8,
                word.startFrame + 15,
                SCENE_DURATION_IN_FRAMES - 1,
              ],
              [0.52, 1.08, 1, 1.012],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.spring({damping: 155}),
                  Easing.spring({damping: 190}),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
                output: "perceptual-scale",
              },
            ),
            translate: interpolate(
              frame,
              [
                word.startFrame,
                word.startFrame + 13,
                190 + index * 4,
                SCENE_DURATION_IN_FRAMES - 1,
              ],
              [
                word.entrance,
                "0px 0px",
                `${index % 2 === 0 ? -2 : 2}px -2px`,
                `${index % 2 === 0 ? 2 : -2}px 2px`,
              ],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.spring({damping: 175}),
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
            rotate: interpolate(
              frame,
              [
                word.startFrame,
                word.startFrame + 13,
                190 + index * 4,
                SCENE_DURATION_IN_FRAMES - 1,
              ],
              [
                `${word.tilt * 5}deg`,
                `${word.tilt}deg`,
                `${word.tilt * -0.35}deg`,
                `${word.tilt * 0.3}deg`,
              ],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.spring({damping: 175}),
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
          }}
        >
          {word.text}
        </Interactive.Div>
      ))}
    </>
  );
};

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();

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
      <BackgroundTreatment variant="card" />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 1,
          top: 176,
          left: 54,
          width: 972,
          height: 4,
          backgroundColor: COLORS.ink,
          opacity: 0.22,
        }}
      />

      <OrangeTrail />

      <Interactive.Div
        name="Truth punch phrase"
        style={{
          position: "absolute",
          zIndex: 10,
          top: 238,
          left: 94,
          padding: "14px 28px 20px",
          border: `6px solid ${COLORS.ink}`,
          backgroundColor: COLORS.backgroundCard,
          color: COLORS.ink,
          boxShadow: `15px 15px 0 ${COLORS.orange}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 132,
          lineHeight: 0.95,
          letterSpacing: -7,
          whiteSpace: "nowrap",
          transformOrigin: "50% 50%",
          opacity: interpolate(
            frame,
            [
              TRUTH_START_FRAME,
              TRUTH_START_FRAME + 5,
              TRUTH_END_FRAME - 5,
              TRUTH_END_FRAME,
            ],
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
          scale: interpolate(
            frame,
            [
              TRUTH_START_FRAME,
              TRUTH_START_FRAME + 13,
              TRUTH_START_FRAME + 23,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            [0.72, 1.08, 1, 1.01],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 145}),
                Easing.spring({damping: 190}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [
              TRUTH_START_FRAME,
              TRAIL_START_FRAME,
              68,
              190,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            [
              "248px 22px",
              "248px 0px",
              "0px 0px",
              "-3px -2px",
              "4px 2px",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 180}),
                Easing.bezier(0.76, 0, 0.24, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          rotate: interpolate(
            frame,
            [
              TRUTH_START_FRAME,
              TRUTH_START_FRAME + 18,
              68,
              190,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            ["-5deg", "1.5deg", "-1deg", "-0.6deg", "0.4deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 165}),
                Easing.spring({damping: 190}),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        SỰ THẬT
      </Interactive.Div>

      <ChannelTitle />

      <ActionButton
        name="Follow action button"
        text="THEO DÕI"
        left={62}
        startFrame={FOLLOW_BUTTON_START_FRAME}
        activeFrame={FOLLOW_ACTIVE_FRAME}
        tilt={-0.8}
      />

      <ActionButton
        name="Like action button"
        text="THÍCH"
        left={568}
        startFrame={LIKE_BUTTON_START_FRAME}
        activeFrame={LIKE_ACTIVE_FRAME}
        tilt={0.8}
      />

      <Interactive.Div
        name="Mystery reveal punch phrase"
        style={{
          position: "absolute",
          zIndex: 32,
          top: 1215,
          left: 70,
          right: 70,
          height: 118,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 69,
          lineHeight: 1,
          letterSpacing: -2,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [FINAL_PHRASE_START_FRAME, FINAL_PHRASE_START_FRAME + 7],
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
              FINAL_PHRASE_START_FRAME,
              FINAL_PHRASE_START_FRAME + 10,
              FINAL_PHRASE_START_FRAME + 18,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            [0.76, 1.07, 1, 1.012],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 155}),
                Easing.spring({damping: 190}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [
              FINAL_PHRASE_START_FRAME,
              FINAL_PHRASE_START_FRAME + 14,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            ["0px 74px", "0px 0px", "0px -3px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 175}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          rotate: interpolate(
            frame,
            [
              FINAL_PHRASE_START_FRAME,
              FINAL_PHRASE_START_FRAME + 14,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            ["-3.5deg", "-0.6deg", "0.35deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 175}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        VÉN MÀN BÍ ẨN
      </Interactive.Div>

      <Interactive.Div
        name="Mystery phrase orange strike"
        style={{
          position: "absolute",
          zIndex: 31,
          top: 1328,
          left: 540,
          width: interpolate(
            frame,
            [FINAL_PHRASE_START_FRAME + 10, FINAL_PHRASE_START_FRAME + 28],
            [0, 790],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          height: 18,
          borderRadius: 9,
          backgroundColor: COLORS.orange,
          boxShadow: `0 7px 0 ${COLORS.ink}`,
          translate: "-50% 0px",
          rotate: "-1deg",
          opacity: interpolate(
            frame,
            [
              FINAL_PHRASE_START_FRAME + 10,
              FINAL_PHRASE_START_FRAME + 14,
            ],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      />
    </AbsoluteFill>
  );
};