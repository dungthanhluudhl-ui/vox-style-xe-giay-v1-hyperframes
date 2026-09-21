import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {COLORS} from "../../../styles/theme";

const SCENE_DURATION_IN_FRAMES = 215;
const CHECKPOINT_START_FRAMES = [21, 30, 39] as const;
const BREAK_START_FRAME = 52;
const QUESTION_START_FRAME = 93;
const QUESTION_END_FRAME = 175;
const REWIND_START_FRAME = 148;
const PIN_START_FRAME = 166;

type CheckpointGlyphProps = {
  centerX: number;
  centerY: number;
  revealFrame: number;
  split?: boolean;
};

type CheckGlyphProps = {
  revealFrame: number;
};

const CheckGlyph: React.FC<CheckGlyphProps> = ({revealFrame}) => {
  const frame = useCurrentFrame();

  return (
    <svg
      width={88}
      height={88}
      viewBox="0 0 88 88"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx={44}
        cy={44}
        r={36}
        fill="rgba(20,20,20,0.88)"
        pathLength={1}
        stroke={COLORS.orange}
        strokeWidth={7}
        strokeDasharray={1}
        strokeDashoffset={interpolate(
          frame,
          [revealFrame, revealFrame + 12],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        )}
      />
      <path
        d="M24 44 L38 58 L65 29"
        fill="none"
        pathLength={1}
        stroke={COLORS.onDarkText}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1}
        strokeDashoffset={interpolate(
          frame,
          [revealFrame + 6, revealFrame + 18],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        )}
      />
    </svg>
  );
};

const CheckpointGlyph: React.FC<CheckpointGlyphProps> = ({
  centerX,
  centerY,
  revealFrame,
  split = false,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={split ? "Broken safety checkpoint" : "Safety checkpoint"}
      style={{
        position: "absolute",
        left: centerX - 44,
        top: centerY - 44,
        width: 88,
        height: 88,
        opacity: interpolate(
          frame,
          [revealFrame, revealFrame + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [revealFrame, revealFrame + 10],
          [0.35, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 180}),
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(
          frame,
          [revealFrame, revealFrame + 10],
          ["-12deg", "0deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 180}),
          },
        ),
        filter: "drop-shadow(5px 5px 0px rgba(20,20,20,0.72))",
      }}
    >
      {split ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 44,
              height: 88,
              overflow: "hidden",
              translate: interpolate(
                frame,
                [BREAK_START_FRAME, BREAK_START_FRAME + 12],
                ["0px 0px", "-14px 5px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 175}),
                },
              ),
              rotate: interpolate(
                frame,
                [BREAK_START_FRAME, BREAK_START_FRAME + 12],
                ["0deg", "-7deg"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 175}),
                },
              ),
              transformOrigin: "100% 50%",
            }}
          >
            <CheckGlyph revealFrame={revealFrame} />
          </div>

          <div
            style={{
              position: "absolute",
              left: 44,
              top: 0,
              width: 44,
              height: 88,
              overflow: "hidden",
              translate: interpolate(
                frame,
                [BREAK_START_FRAME, BREAK_START_FRAME + 12],
                ["0px 0px", "14px -5px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 175}),
                },
              ),
              rotate: interpolate(
                frame,
                [BREAK_START_FRAME, BREAK_START_FRAME + 12],
                ["0deg", "7deg"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 175}),
                },
              ),
              transformOrigin: "0% 50%",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -44,
                top: 0,
                width: 88,
                height: 88,
              }}
            >
              <CheckGlyph revealFrame={revealFrame} />
            </div>
          </div>

          <svg
            width={58}
            height={102}
            viewBox="0 0 58 102"
            fill="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 15,
              top: -7,
              opacity: interpolate(
                frame,
                [BREAK_START_FRAME, BREAK_START_FRAME + 4],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
            }}
          >
            <path
              d="M35 8 L21 31 L34 45 L20 61 L32 73 L23 95"
              pathLength={1}
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [BREAK_START_FRAME, BREAK_START_FRAME + 12],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            />
          </svg>
        </>
      ) : (
        <CheckGlyph revealFrame={revealFrame} />
      )}
    </Interactive.Div>
  );
};

const SafetyChain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Three safety checkpoints"
      style={{
        position: "absolute",
        zIndex: 20,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [CHECKPOINT_START_FRAMES[0], CHECKPOINT_START_FRAMES[0] + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 234,
          top: 566,
          width: interpolate(
            frame,
            [24, 43, BREAK_START_FRAME, BREAK_START_FRAME + 12],
            [0, 262, 262, 234],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.spring({damping: 175}),
              ],
            },
          ),
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.orange,
          boxShadow: "0 3px 0 rgba(20,20,20,0.72)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: interpolate(
            frame,
            [BREAK_START_FRAME, BREAK_START_FRAME + 12],
            [584, 612],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 175}),
            },
          ),
          top: 566,
          width: interpolate(
            frame,
            [32, 51, BREAK_START_FRAME + 1, BREAK_START_FRAME + 12],
            [0, 262, 262, 234],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.spring({damping: 175}),
              ],
            },
          ),
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.orange,
          boxShadow: "0 3px 0 rgba(20,20,20,0.72)",
        }}
      />

      <CheckpointGlyph
        centerX={190}
        centerY={570}
        revealFrame={CHECKPOINT_START_FRAMES[0]}
      />
      <CheckpointGlyph
        centerX={540}
        centerY={570}
        revealFrame={CHECKPOINT_START_FRAMES[1]}
        split
      />
      <CheckpointGlyph
        centerX={890}
        centerY={570}
        revealFrame={CHECKPOINT_START_FRAMES[2]}
      />
    </Interactive.Div>
  );
};

const QuestionIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const trembleFrame = Math.max(0, frame - QUESTION_START_FRAME - 18);

  return (
    <Interactive.Div
      name="Question icon"
      style={{
        position: "absolute",
        zIndex: 24,
        left: 479,
        top: 688,
        width: 122,
        height: 122,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [
            QUESTION_START_FRAME,
            QUESTION_START_FRAME + 5,
            QUESTION_END_FRAME - 6,
            QUESTION_END_FRAME,
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
          [QUESTION_START_FRAME, QUESTION_START_FRAME + 12],
          [0.45, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 175}),
            output: "perceptual-scale",
          },
        ),
        translate: `${
          Math.sin(trembleFrame * 0.72) *
          interpolate(
            frame,
            [QUESTION_START_FRAME + 18, QUESTION_START_FRAME + 34],
            [0, 2.7],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )
        }px ${
          Math.cos(trembleFrame * 0.61) *
          interpolate(
            frame,
            [QUESTION_START_FRAME + 18, QUESTION_START_FRAME + 34],
            [0, 1.8],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )
        }px`,
        rotate: `${
          Math.sin(trembleFrame * 0.48) *
          interpolate(
            frame,
            [QUESTION_START_FRAME + 18, QUESTION_START_FRAME + 34],
            [0, 1.4],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )
        }deg`,
        filter: "drop-shadow(6px 6px 0px rgba(20,20,20,0.74))",
      }}
    >
      <svg
        width="122"
        height="122"
        viewBox="0 0 122 122"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx={61}
          cy={61}
          r={52}
          fill="rgba(20,20,20,0.9)"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [QUESTION_START_FRAME, QUESTION_START_FRAME + 14],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M43 47 C43 35 51 28 62 28 C75 28 83 36 83 47 C83 58 76 63 68 68 C62 72 59 77 59 85"
          fill="none"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [QUESTION_START_FRAME + 6, QUESTION_START_FRAME + 22],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <circle
          cx={59}
          cy={98}
          r={interpolate(
            frame,
            [QUESTION_START_FRAME + 18, QUESTION_START_FRAME + 25],
            [0, 5],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
            },
          )}
          fill={COLORS.orange}
        />
      </svg>
    </Interactive.Div>
  );
};

type RewindTickProps = {
  index: number;
  startX: number;
  startY: number;
};

const RewindTick: React.FC<RewindTickProps> = ({
  index,
  startX,
  startY,
}) => {
  const frame = useCurrentFrame();
  const tickStart = REWIND_START_FRAME + index * 3;
  const tickEnd = Math.min(PIN_START_FRAME + 20, tickStart + 30);

  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(frame, [tickStart, tickEnd], [startX, 540], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        top: interpolate(frame, [tickStart, tickEnd], [startY, 934], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.76, 0, 0.24, 1),
        }),
        width: 24,
        height: 9,
        borderRadius: 5,
        backgroundColor: COLORS.orange,
        boxShadow: "3px 3px 0 rgba(20,20,20,0.75)",
        opacity: interpolate(
          frame,
          [tickStart, tickStart + 4, tickEnd - 3, tickEnd],
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
        scale: interpolate(frame, [tickStart, tickEnd], [1, 0.55], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
        rotate: `${-28 + index * 7}deg`,
        translate: "-12px -4px",
      }}
    />
  );
};

const RewindPath: React.FC = () => {
  const frame = useCurrentFrame();

  const ticks = [
    {x: 914, y: 1248},
    {x: 850, y: 1190},
    {x: 785, y: 1136},
    {x: 722, y: 1081},
    {x: 664, y: 1034},
    {x: 614, y: 994},
    {x: 575, y: 962},
  ];

  return (
    <Interactive.Div
      name="Rewind path toward Itaewon"
      style={{
        position: "absolute",
        zIndex: 26,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [REWIND_START_FRAME, REWIND_START_FRAME + 5],
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
          d="M920 1255 C835 1172 777 1134 710 1075 C640 1014 594 972 540 934"
          pathLength={1}
          stroke="rgba(247,244,236,0.65)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="0.018 0.026"
          strokeDashoffset={interpolate(
            frame,
            [REWIND_START_FRAME, SCENE_DURATION_IN_FRAMES - 1],
            [0, -0.62],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          )}
        />
      </svg>

      {ticks.map((tick, index) => (
        <RewindTick
          key={`${tick.x}-${tick.y}`}
          index={index}
          startX={tick.x}
          startY={tick.y}
        />
      ))}
    </Interactive.Div>
  );
};

const ItaewonPin: React.FC = () => {
  const frame = useCurrentFrame();
  const bobFrame = Math.max(0, frame - PIN_START_FRAME - 18);

  return (
    <Interactive.Div
      name="Itaewon destination pin"
      style={{
        position: "absolute",
        zIndex: 30,
        left: 482,
        top: 846,
        width: 116,
        height: 150,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [PIN_START_FRAME, PIN_START_FRAME + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [PIN_START_FRAME, PIN_START_FRAME + 13],
          [0.35, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 165}),
            output: "perceptual-scale",
          },
        ),
        translate: `0px ${
          -Math.abs(Math.sin(bobFrame * 0.12)) *
          interpolate(
            frame,
            [PIN_START_FRAME + 18, PIN_START_FRAME + 28],
            [0, 8],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )
        }px`,
        filter: "drop-shadow(7px 8px 0px rgba(20,20,20,0.78))",
      }}
    >
      <svg
        width="116"
        height="150"
        viewBox="0 0 116 150"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M58 8 C31 8 12 28 12 54 C12 87 58 139 58 139 C58 139 104 87 104 54 C104 28 85 8 58 8 Z"
          fill="rgba(20,20,20,0.92)"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [PIN_START_FRAME, PIN_START_FRAME + 18],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <circle
          cx={58}
          cy={54}
          r={interpolate(
            frame,
            [PIN_START_FRAME + 10, PIN_START_FRAME + 20],
            [0, 17],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
            },
          )}
          fill={COLORS.orange}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 31,
          top: 117,
          width: 54,
          height: 22,
          border: `5px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [PIN_START_FRAME + 8, PIN_START_FRAME + 28],
            [0.9, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [PIN_START_FRAME + 8, PIN_START_FRAME + 28],
            [0.45, 2.15],
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

export const Scene07: React.FC = () => {
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

      <Interactive.Div
        name="Itaewon map spiral entrance"
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 21], [1.28, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
          rotate: interpolate(frame, [0, 21], ["11deg", "0deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Video
          src={staticFile(
            "videos/tham-hoa-itaewon-phan-1/media/videos/vid-01-itaewon-seoul-district-map.mp4",
          )}
          muted
          durationInFrames={SCENE_DURATION_IN_FRAMES}
          trimBefore={0.45 * fps}
          trimAfter={7.6 * fps}
          objectFit="cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            scale: interpolate(
              frame,
              [0, SCENE_DURATION_IN_FRAMES - 1],
              [1.05, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
          }}
        />

        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.12) 0%, rgba(20,20,20,0.01) 31%, rgba(20,20,20,0.04) 67%, rgba(20,20,20,0.24) 100%)",
          }}
        />
      </Interactive.Div>

      <SafetyChain />
      <QuestionIcon />
      <RewindPath />
      <ItaewonPin />
    </AbsoluteFill>
  );
};