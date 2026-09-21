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

const SCENE_DURATION_IN_FRAMES = 264;
const TIMELINE_LOCK_FRAME = 23;
const ADVANCE_ARROW_START_FRAME = 97;
const OCCUPATION_WASH_START_FRAME = 120;
const BLACKOUT_START_FRAME = 153;
const TEMPLE_PIN_START_FRAME = 219;

const IMAGE_SRC =
  "videos/tham-hoa-itaewon-phan-1/media/images/img-05-samurai-palace-intrusion-cutout.jpeg";

const HistoricalTimeline: React.FC = () => {
  const frame = useCurrentFrame();

  const tickPositions = [90, 165, 240, 340, 440, 540, 640, 740, 840, 890];

  return (
    <Interactive.Div
      name="Rewinding sixteenth-century timeline"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 164,
        left: 55,
        width: 970,
        height: 190,
        overflow: "hidden",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: 10,
        backgroundColor: "rgba(245,240,228,0.92)",
        boxShadow: `11px 11px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 18, SCENE_DURATION_IN_FRAMES - 1],
          ["0px -42px", "0px 0px", "0px -2px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 111,
          left: 90,
          width: 800,
          height: 6,
          borderRadius: 3,
          backgroundColor: "rgba(20,20,20,0.32)",
        }}
      />

      <Interactive.Div
        name="Reversing timeline ticks"
        style={{
          position: "absolute",
          inset: 0,
          translate: interpolate(
            frame,
            [0, 10, TIMELINE_LOCK_FRAME],
            ["310px 0px", "74px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.76, 0, 0.24, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        {tickPositions.map((left, index) => (
          <div
            key={left}
            style={{
              position: "absolute",
              top: index === 2 ? 94 : 99,
              left,
              width: index === 2 ? 8 : 5,
              height: index === 2 ? 42 : 30,
              borderRadius: 4,
              backgroundColor:
                index === 2 ? COLORS.orange : "rgba(20,20,20,0.62)",
              opacity: interpolate(
                frame,
                [index * 0.8, 5 + index * 0.8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
            }}
          />
        ))}
      </Interactive.Div>

      <Interactive.Div
        name="Backward-running orange timeline"
        style={{
          position: "absolute",
          top: 109,
          right: 80,
          width: interpolate(
            frame,
            [0, 9, TIMELINE_LOCK_FRAME],
            [0, 500, 650],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.76, 0, 0.24, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          height: 10,
          borderRadius: 5,
          backgroundColor: COLORS.orange,
          boxShadow: `0 4px 0 ${COLORS.ink}`,
        }}
      />

      <Interactive.Div
        name="Timeline rewind head"
        style={{
          position: "absolute",
          top: 92,
          right:
            80 +
            interpolate(
              frame,
              [0, 9, TIMELINE_LOCK_FRAME],
              [0, 500, 650],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.76, 0, 0.24, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
          width: 44,
          height: 44,
          border: `8px solid ${COLORS.orange}`,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          translate: "50% 0px",
          boxShadow: "4px 4px 0 rgba(20,20,20,0.46)",
          scale: interpolate(
            frame,
            [0, 7, 13, TIMELINE_LOCK_FRAME],
            [0.55, 1.2, 0.9, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 150}),
                Easing.spring({damping: 180}),
                Easing.spring({damping: 200}),
              ],
              output: "perceptual-scale",
            },
          ),
        }}
      />

      <Interactive.Div
        name="Late sixteenth-century timeline marker"
        style={{
          position: "absolute",
          zIndex: 3,
          top: 14,
          left: 79,
          width: 330,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 8,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `8px 8px 0 ${COLORS.ink}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 42,
          lineHeight: 1,
          letterSpacing: 0.8,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [TIMELINE_LOCK_FRAME, TIMELINE_LOCK_FRAME + 4],
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
              TIMELINE_LOCK_FRAME,
              TIMELINE_LOCK_FRAME + 6,
              TIMELINE_LOCK_FRAME + 14,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            [0.42, 1.12, 1, 1.01],
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
              TIMELINE_LOCK_FRAME,
              TIMELINE_LOCK_FRAME + 13,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            ["0px -32px", "0px 0px", "0px -2px"],
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
              TIMELINE_LOCK_FRAME,
              TIMELINE_LOCK_FRAME + 7,
              TIMELINE_LOCK_FRAME + 14,
              SCENE_DURATION_IN_FRAMES - 1,
            ],
            ["-6deg", "2deg", "-1deg", "-0.55deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 150}),
                Easing.spring({damping: 190}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        CUỐI TK XVI
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 81,
          left: 236,
          width: 8,
          height: interpolate(
            frame,
            [TIMELINE_LOCK_FRAME + 4, TIMELINE_LOCK_FRAME + 13],
            [0, 30],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          borderRadius: 4,
          backgroundColor: COLORS.orange,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 77,
          left: 218,
          width: 44,
          height: 44,
          border: `7px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [
              TIMELINE_LOCK_FRAME,
              TIMELINE_LOCK_FRAME + 5,
              TIMELINE_LOCK_FRAME + 20,
            ],
            [0, 0.85, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [TIMELINE_LOCK_FRAME, TIMELINE_LOCK_FRAME + 20],
            [0.5, 2.25],
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

const AdvanceArrow: React.FC = () => {
  const frame = useCurrentFrame();
  const swayFrame = Math.max(0, frame - ADVANCE_ARROW_START_FRAME - 34);

  return (
    <Interactive.Div
      name="Army advance through the gate"
      style={{
        position: "absolute",
        zIndex: 22,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [ADVANCE_ARROW_START_FRAME, ADVANCE_ARROW_START_FRAME + 6],
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
          d="M146 1163 C302 1117 451 1044 570 969 C624 935 673 905 723 880"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ADVANCE_ARROW_START_FRAME, ADVANCE_ARROW_START_FRAME + 31],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M146 1163 C302 1117 451 1044 570 969 C624 935 673 905 723 880"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ADVANCE_ARROW_START_FRAME, ADVANCE_ARROW_START_FRAME + 31],
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
        name="Swaying advance arrowhead"
        style={{
          position: "absolute",
          left: 689,
          top: 837,
          width: 92,
          height: 76,
          opacity: interpolate(
            frame,
            [
              ADVANCE_ARROW_START_FRAME + 22,
              ADVANCE_ARROW_START_FRAME + 31,
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
              ADVANCE_ARROW_START_FRAME + 22,
              ADVANCE_ARROW_START_FRAME + 34,
            ],
            [0.35, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 170}),
              output: "perceptual-scale",
            },
          ),
          translate: `${Math.sin(swayFrame * 0.09) * 3}px ${
            Math.cos(swayFrame * 0.075) * 2
          }px`,
          rotate: `${-25 + Math.sin(swayFrame * 0.08) * 1.8}deg`,
          filter: "drop-shadow(5px 5px 0px rgba(20,20,20,0.82))",
        }}
      >
        <svg
          width="92"
          height="76"
          viewBox="0 0 92 76"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 12 L80 38 L10 64 L28 38 Z"
            fill={COLORS.orange}
            stroke={COLORS.ink}
            strokeWidth={7}
            strokeLinejoin="round"
          />
        </svg>
      </Interactive.Div>
    </Interactive.Div>
  );
};

const OccupiedAreaWash: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Occupied territory spreading behind the army"
      style={{
        position: "absolute",
        zIndex: 12,
        top: 390,
        left: 450,
        width: interpolate(
          frame,
          [OCCUPATION_WASH_START_FRAME, OCCUPATION_WASH_START_FRAME + 38],
          [0, 650],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        height: 910,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [OCCUPATION_WASH_START_FRAME, OCCUPATION_WASH_START_FRAME + 8],
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
          inset: 0,
          width: 650,
          height: 910,
          clipPath:
            "polygon(8% 8%, 38% 0, 76% 7%, 100% 25%, 94% 66%, 73% 100%, 30% 93%, 0 69%)",
          background:
            "linear-gradient(118deg, rgba(20,20,20,0.14) 0%, rgba(20,20,20,0.52) 62%, rgba(20,20,20,0.66) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 76,
          left: 0,
          width: 13,
          height: 720,
          borderRadius: 7,
          backgroundColor: COLORS.orange,
          opacity: interpolate(
            frame,
            [
              OCCUPATION_WASH_START_FRAME + 4,
              OCCUPATION_WASH_START_FRAME + 18,
            ],
            [0, 0.82],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      />
    </Interactive.Div>
  );
};

type BlackoutPatchProps = {
  name: string;
  startFrame: number;
  top: number;
  left: number;
  width: number;
  height: number;
  clipPath: string;
  opacity: number;
  entrance: string;
  tilt: number;
};

const BlackoutPatch: React.FC<BlackoutPatchProps> = ({
  name,
  startFrame,
  top,
  left,
  width,
  height,
  clipPath,
  opacity,
  entrance,
  tilt,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 15,
        top,
        left,
        width,
        height,
        clipPath,
        pointerEvents: "none",
        backgroundColor: `rgba(20,20,20,${opacity})`,
        mixBlendMode: "multiply",
        opacity: interpolate(frame, [startFrame, startFrame + 11], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [startFrame, startFrame + 15],
          [0.88, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 190}),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [startFrame, startFrame + 15, SCENE_DURATION_IN_FRAMES - 1],
          [entrance, "0px 0px", "2px -2px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [startFrame, startFrame + 15, SCENE_DURATION_IN_FRAMES - 1],
          [`${tilt * 3}deg`, `${tilt}deg`, `${tilt * -0.35}deg`],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    />
  );
};

const OccupationBlackoutSteps: React.FC = () => {
  return (
    <Interactive.Div
      name="Three-step occupation blackout"
      style={{
        position: "absolute",
        zIndex: 14,
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <BlackoutPatch
        name="Occupied land blackout step one"
        startFrame={BLACKOUT_START_FRAME}
        top={470}
        left={602}
        width={440}
        height={305}
        clipPath="polygon(12% 3%, 88% 0, 100% 38%, 86% 100%, 18% 91%, 0 47%)"
        opacity={0.35}
        entrance="48px -10px"
        tilt={1.2}
      />

      <BlackoutPatch
        name="Occupied land blackout step two"
        startFrame={BLACKOUT_START_FRAME + 12}
        top={738}
        left={430}
        width={590}
        height={340}
        clipPath="polygon(7% 8%, 78% 0, 100% 34%, 91% 92%, 36% 100%, 0 71%)"
        opacity={0.39}
        entrance="52px 8px"
        tilt={-0.8}
      />

      <BlackoutPatch
        name="Occupied land blackout step three"
        startFrame={BLACKOUT_START_FRAME + 24}
        top={1022}
        left={205}
        width={795}
        height={330}
        clipPath="polygon(0 17%, 38% 0, 88% 8%, 100% 60%, 79% 100%, 18% 91%)"
        opacity={0.43}
        entrance="58px 18px"
        tilt={0.65}
      />
    </Interactive.Div>
  );
};

const AncientTemplePin: React.FC = () => {
  const frame = useCurrentFrame();
  const bobFrame = Math.max(0, frame - TEMPLE_PIN_START_FRAME - 20);

  return (
    <Interactive.Div
      name="Ancient temple location pin"
      style={{
        position: "absolute",
        zIndex: 32,
        left: 741,
        top: 575,
        width: 124,
        height: 168,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [TEMPLE_PIN_START_FRAME, TEMPLE_PIN_START_FRAME + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [TEMPLE_PIN_START_FRAME, TEMPLE_PIN_START_FRAME + 14],
          [0.32, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 165}),
            output: "perceptual-scale",
          },
        ),
        translate: `0px ${
          -Math.abs(Math.sin(bobFrame * 0.13)) *
          interpolate(
            frame,
            [TEMPLE_PIN_START_FRAME + 20, TEMPLE_PIN_START_FRAME + 30],
            [0, 5],
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
        width="124"
        height="168"
        viewBox="0 0 124 168"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M62 8 C32 8 12 30 12 59 C12 96 62 154 62 154 C62 154 112 96 112 59 C112 30 92 8 62 8 Z"
          fill="rgba(20,20,20,0.92)"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TEMPLE_PIN_START_FRAME, TEMPLE_PIN_START_FRAME + 18],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M35 61 L62 39 L89 61 M42 60 H82 M46 60 V82 M58 60 V82 M70 60 V82 M78 60 V82 M39 84 H85"
          fill="none"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [
              TEMPLE_PIN_START_FRAME + 8,
              TEMPLE_PIN_START_FRAME + 27,
            ],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 35,
          top: 128,
          width: 54,
          height: 24,
          border: `6px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [
              TEMPLE_PIN_START_FRAME + 8,
              TEMPLE_PIN_START_FRAME + 14,
              TEMPLE_PIN_START_FRAME + 31,
            ],
            [0, 0.9, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [
              TEMPLE_PIN_START_FRAME + 8,
              TEMPLE_PIN_START_FRAME + 31,
            ],
            [0.4, 2.35],
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

export const Scene13: React.FC = () => {
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
      <Interactive.Div
        name="Historical palace image rise entrance"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 21], ["0px 96px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
        }}
      >
        <Interactive.Div
          name="Slow rightward military advance camera"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            scale: interpolate(
              frame,
              [0, SCENE_DURATION_IN_FRAMES - 1],
              [1.02, 1.08],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
            translate: interpolate(
              frame,
              [0, SCENE_DURATION_IN_FRAMES - 1],
              ["-30px 0px", "30px -4px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <CanvasImage
            src={staticFile(IMAGE_SRC)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 46%",
              filter: "contrast(1.08) brightness(0.91) saturate(0.82)",
            }}
          />
        </Interactive.Div>
      </Interactive.Div>

      <AbsoluteFill
        style={{
          zIndex: 2,
          pointerEvents: "none",
          backgroundColor: "rgba(245,240,228,0.1)",
          mixBlendMode: "soft-light",
        }}
      />

      <AbsoluteFill
        style={{
          zIndex: 3,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 52% 46%, rgba(20,20,20,0) 28%, rgba(20,20,20,0.08) 62%, rgba(20,20,20,0.42) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          zIndex: 4,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.24) 0%, rgba(20,20,20,0.02) 24%, rgba(20,20,20,0.02) 66%, rgba(20,20,20,0.3) 100%)",
        }}
      />

      <BackgroundTreatment variant="card" />

      <OccupiedAreaWash />
      <OccupationBlackoutSteps />
      <AdvanceArrow />
      <HistoricalTimeline />
      <AncientTemplePin />
    </AbsoluteFill>
  );
};