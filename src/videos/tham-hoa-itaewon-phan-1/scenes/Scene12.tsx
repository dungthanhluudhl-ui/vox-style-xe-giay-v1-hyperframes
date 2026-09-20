import {Video} from "@remotion/media";
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
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const SCENE_DURATION_IN_FRAMES = 328;
const VIDEO_END_FRAME = 240;
const FINAL_HOLD_START_FRAME = 239;

const TERRITORY_START_FRAME = 15;
const THIRTY_PERCENT_FRAME = 65;
const SEVENTY_PERCENT_FRAME = 203;
const OCCUPATION_COMPLETE_FRAME = 291;

const DIVIDER_START_FRAME = 65;
const PUNCH_PHRASE_START_FRAME = 188;
const OCCUPATION_MATTE_START_FRAME = 258;

const VIDEO_SRC =
  "videos/tham-hoa-itaewon-phan-1/media/videos/vid-05-ancient-palace-attack-fire-cutout.mp4";

const SHARDS = [
  {
    clipPath: "polygon(0 0, 29% 0, 25% 50%, 0 56%)",
    translate: "-270px -190px",
    rotation: "-17deg",
    origin: "0% 0%",
    color: COLORS.backgroundCard,
  },
  {
    clipPath: "polygon(29% 0, 55% 0, 52% 48%, 25% 50%)",
    translate: "-60px -310px",
    rotation: "12deg",
    origin: "50% 0%",
    color: COLORS.ink,
  },
  {
    clipPath: "polygon(55% 0, 79% 0, 83% 53%, 52% 48%)",
    translate: "90px -280px",
    rotation: "-10deg",
    origin: "50% 0%",
    color: COLORS.orange,
  },
  {
    clipPath: "polygon(79% 0, 100% 0, 100% 57%, 83% 53%)",
    translate: "290px -150px",
    rotation: "18deg",
    origin: "100% 0%",
    color: COLORS.backgroundCard,
  },
  {
    clipPath: "polygon(0 56%, 25% 50%, 30% 100%, 0 100%)",
    translate: "-310px 190px",
    rotation: "16deg",
    origin: "0% 100%",
    color: COLORS.ink,
  },
  {
    clipPath: "polygon(25% 50%, 52% 48%, 56% 100%, 30% 100%)",
    translate: "-75px 320px",
    rotation: "-13deg",
    origin: "50% 100%",
    color: COLORS.orange,
  },
  {
    clipPath: "polygon(52% 48%, 83% 53%, 78% 100%, 56% 100%)",
    translate: "80px 300px",
    rotation: "11deg",
    origin: "50% 100%",
    color: COLORS.backgroundCard,
  },
  {
    clipPath: "polygon(83% 53%, 100% 57%, 100% 100%, 78% 100%)",
    translate: "320px 180px",
    rotation: "-18deg",
    origin: "100% 100%",
    color: COLORS.ink,
  },
] as const;

const ShatterEntrance: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Shatter entrance"
      style={{
        position: "absolute",
        zIndex: 80,
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {SHARDS.map((shard, index) => (
        <div
          key={shard.clipPath}
          style={{
            position: "absolute",
            inset: -3,
            clipPath: shard.clipPath,
            backgroundColor: shard.color,
            backgroundImage:
              index % 3 === 0
                ? `linear-gradient(${COLORS.gridLine} 1.5px, transparent 1.5px), linear-gradient(90deg, ${COLORS.gridLine} 1.5px, transparent 1.5px)`
                : undefined,
            backgroundSize: index % 3 === 0 ? "84px 84px" : undefined,
            boxShadow: `inset 0 0 0 5px ${COLORS.orange}`,
            transformOrigin: shard.origin,
            opacity: interpolate(frame, [0, 12, 20], [1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.linear,
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            }),
            translate: interpolate(
              frame,
              [0, 20],
              ["0px 0px", shard.translate],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.7, 0, 0.84, 0),
              },
            ),
            rotate: interpolate(
              frame,
              [0, 20],
              ["0deg", shard.rotation],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.7, 0, 0.84, 0),
              },
            ),
            scale: interpolate(frame, [0, 20], [1, 1.08], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.7, 0, 0.84, 0),
              output: "perceptual-scale",
            }),
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 540,
          top: 960,
          width: interpolate(frame, [0, 15], [18, 560], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          height: 12,
          backgroundColor: COLORS.orange,
          translate: "-50% -50%",
          rotate: "-32deg",
          opacity: interpolate(frame, [0, 9, 18], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          }),
        }}
      />
    </Interactive.Div>
  );
};

type TornDividerProps = {
  boundaryX: number;
  jitter: number;
};

const TornDivider: React.FC<TornDividerProps> = ({
  boundaryX,
  jitter,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Expanding paper tear divider"
      style={{
        position: "absolute",
        zIndex: 24,
        top: 0,
        left: boundaryX - 42,
        width: 84,
        height: 1920,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [
            DIVIDER_START_FRAME,
            DIVIDER_START_FRAME + 6,
            OCCUPATION_COMPLETE_FRAME - 7,
            OCCUPATION_COMPLETE_FRAME + 2,
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
        translate: `${jitter}px 0px`,
        filter: "drop-shadow(6px 0px 0px rgba(20,20,20,0.52))",
      }}
    >
      <svg
        width="84"
        height="1920"
        viewBox="0 0 84 1920"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M42 0 L31 124 L53 252 L27 384 L50 519 L30 650 L57 786 L26 922 L51 1052 L29 1190 L55 1320 L25 1458 L50 1586 L32 1730 L42 1920"
          pathLength={1}
          stroke="rgba(245,240,228,0.9)"
          strokeWidth={24}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIVIDER_START_FRAME, DIVIDER_START_FRAME + 27],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M42 0 L31 124 L53 252 L27 384 L50 519 L30 650 L57 786 L26 922 L51 1052 L29 1190 L55 1320 L25 1458 L50 1586 L32 1730 L42 1920"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIVIDER_START_FRAME, DIVIDER_START_FRAME + 27],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M49 0 L38 124 L60 252 L34 384 L57 519 L37 650 L64 786 L33 922 L58 1052 L36 1190 L62 1320 L32 1458 L57 1586 L39 1730 L49 1920"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [DIVIDER_START_FRAME + 7, DIVIDER_START_FRAME + 34],
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

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();

  const openingLeft = interpolate(
    frame,
    [0, TERRITORY_START_FRAME],
    [230, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.spring({damping: 190}),
    },
  );

  const openingTop = interpolate(
    frame,
    [0, TERRITORY_START_FRAME],
    [420, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.spring({damping: 190}),
    },
  );

  const openingBottom = interpolate(
    frame,
    [0, TERRITORY_START_FRAME],
    [1500, 1920],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.spring({damping: 190}),
    },
  );

  const territoryBoundary = interpolate(
    frame,
    [
      TERRITORY_START_FRAME,
      THIRTY_PERCENT_FRAME,
      SEVENTY_PERCENT_FRAME,
      OCCUPATION_COMPLETE_FRAME,
    ],
    [1080, 756, 324, -80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: [
        Easing.bezier(0.16, 1, 0.3, 1),
        Easing.bezier(0.4, 0, 0.2, 1),
        Easing.bezier(0.76, 0, 0.24, 1),
      ],
    },
  );

  const tearJitter =
    frame < DIVIDER_START_FRAME
      ? 0
      : Math.sin(frame * 0.71) * 4.2 +
        Math.sin(frame * 0.23 + 1.7) * 2.4;

  const boundaryX = territoryBoundary + tearJitter;

  const occupationMatteDepth = interpolate(
    frame,
    [OCCUPATION_MATTE_START_FRAME, OCCUPATION_COMPLETE_FRAME],
    [42, 460],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.76, 0, 0.24, 1),
    },
  );

  const occupationMatteFront = boundaryX - occupationMatteDepth;

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        color: COLORS.ink,
        fontFamily,
      }}
    >
      <BackgroundTreatment variant="spotlight" />

      <Interactive.Div
        name="War archive occupying the frame"
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          overflow: "hidden",
          translate: interpolate(
            frame,
            [VIDEO_END_FRAME, SCENE_DURATION_IN_FRAMES - 1],
            ["0px 0px", "-24px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [VIDEO_END_FRAME, SCENE_DURATION_IN_FRAMES - 1],
            [1, 1.04],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        <Video
          src={staticFile(VIDEO_SRC)}
          muted
          durationInFrames={VIDEO_END_FRAME}
          trimAfter={VIDEO_END_FRAME}
          objectFit="cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            filter: "contrast(1.12) brightness(0.86)",
          }}
        />

        <Sequence
          name="Held final war frame"
          from={FINAL_HOLD_START_FRAME}
          durationInFrames={
            SCENE_DURATION_IN_FRAMES - FINAL_HOLD_START_FRAME
          }
          layout="none"
        >
          <Video
            src={staticFile(VIDEO_SRC)}
            muted
            durationInFrames={
              SCENE_DURATION_IN_FRAMES - FINAL_HOLD_START_FRAME
            }
            trimBefore={238.8}
            trimAfter={VIDEO_END_FRAME}
            playbackRate={0.01}
            objectFit="cover"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              filter: "contrast(1.12) brightness(0.86)",
            }}
          />
        </Sequence>

        <AbsoluteFill
          style={{
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.38) 0%, rgba(10,10,10,0.04) 31%, rgba(10,10,10,0.08) 63%, rgba(10,10,10,0.5) 100%)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Bright present-day paper domain"
        style={{
          position: "absolute",
          zIndex: 12,
          inset: 0,
          overflow: "hidden",
          clipPath: `polygon(
            ${openingLeft}px ${openingTop}px,
            ${boundaryX}px ${openingTop}px,
            ${boundaryX - 10}px 148px,
            ${boundaryX + 14}px 302px,
            ${boundaryX - 9}px 468px,
            ${boundaryX + 17}px 626px,
            ${boundaryX - 13}px 792px,
            ${boundaryX + 18}px 958px,
            ${boundaryX - 11}px 1120px,
            ${boundaryX + 15}px 1288px,
            ${boundaryX - 16}px 1454px,
            ${boundaryX + 10}px 1618px,
            ${boundaryX - 7}px ${openingBottom}px,
            ${openingLeft}px ${openingBottom}px
          )`,
          backgroundColor: COLORS.backgroundCard,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 82px, rgba(20,20,20,0.1) 83px, transparent 85px)",
          boxShadow: `18px 0 0 ${COLORS.orange}`,
        }}
      >
        <AbsoluteFill
          style={{
            opacity: 0.16,
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%" aria-hidden="true">
            <filter id="scene-12-paper-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.72"
                numOctaves={4}
                seed={12}
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect
              width="100%"
              height="100%"
              fill={COLORS.background}
              filter="url(#scene-12-paper-grain)"
            />
          </svg>
        </AbsoluteFill>

        <Interactive.Div
          name="Present-day Itaewon name"
          style={{
            position: "absolute",
            zIndex: 2,
            top: 548,
            left: 270,
            width: 540,
            padding: "22px 24px 25px",
            borderTop: `7px solid ${COLORS.orange}`,
            borderBottom: `7px solid ${COLORS.ink}`,
            backgroundColor: "rgba(245,240,228,0.94)",
            color: COLORS.ink,
            boxShadow: `12px 12px 0 ${COLORS.orange}`,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 62,
            lineHeight: 1.06,
            letterSpacing: -2,
            textAlign: "center",
            whiteSpace: "nowrap",
            opacity: interpolate(
              frame,
              [4, 11, 144, 150],
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
            scale: interpolate(frame, [4, 17], [0.72, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
              output: "perceptual-scale",
            }),
            translate: `${
              Math.sin(Math.max(0, frame - 18) * 0.075) * 1.8
            }px ${
              Math.cos(Math.max(0, frame - 18) * 0.061) * 2.4
            }px`,
            rotate: `${
              Math.sin(Math.max(0, frame - 18) * 0.052) * 0.32
            }deg`,
          }}
        >
          梨泰院 · ITAEWON
        </Interactive.Div>

        <Interactive.Div
          name="Lê Thái Viện punch phrase"
          style={{
            position: "absolute",
            zIndex: 3,
            top: 732,
            left: 36,
            width: 184,
            padding: "17px 13px 21px",
            border: `5px solid ${COLORS.ink}`,
            backgroundColor: COLORS.orange,
            color: COLORS.ink,
            boxShadow: `10px 10px 0 ${COLORS.ink}`,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 51,
            lineHeight: 1.02,
            letterSpacing: -2.8,
            textAlign: "center",
            whiteSpace: "normal",
            opacity: interpolate(
              frame,
              [PUNCH_PHRASE_START_FRAME, PUNCH_PHRASE_START_FRAME + 6],
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
                PUNCH_PHRASE_START_FRAME,
                PUNCH_PHRASE_START_FRAME + 7,
                PUNCH_PHRASE_START_FRAME + 15,
                OCCUPATION_MATTE_START_FRAME,
              ],
              [0.42, 1.1, 1, 1.015],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.spring({damping: 150}),
                  Easing.spring({damping: 190}),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
                output: "perceptual-scale",
              },
            ),
            translate: interpolate(
              frame,
              [
                PUNCH_PHRASE_START_FRAME,
                PUNCH_PHRASE_START_FRAME + 15,
                OCCUPATION_MATTE_START_FRAME,
              ],
              ["-46px 34px", "0px 0px", "2px -3px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.spring({damping: 170}),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
            rotate: interpolate(
              frame,
              [
                PUNCH_PHRASE_START_FRAME,
                PUNCH_PHRASE_START_FRAME + 8,
                PUNCH_PHRASE_START_FRAME + 15,
                OCCUPATION_MATTE_START_FRAME,
              ],
              ["-8deg", "2deg", "-1deg", "-0.5deg"],
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
          <div>LÊ</div>
          <div>THÁI</div>
          <div>VIỆN</div>
        </Interactive.Div>

        <Interactive.Div
          name="Occupation ink matte"
          style={{
            position: "absolute",
            zIndex: 5,
            inset: 0,
            clipPath: `polygon(
              ${occupationMatteFront + 16}px 0,
              1080px 0,
              1080px 1920px,
              ${occupationMatteFront - 10}px 1920px,
              ${occupationMatteFront + 9}px 1690px,
              ${occupationMatteFront - 12}px 1450px,
              ${occupationMatteFront + 15}px 1210px,
              ${occupationMatteFront - 8}px 970px,
              ${occupationMatteFront + 13}px 730px,
              ${occupationMatteFront - 11}px 490px,
              ${occupationMatteFront + 14}px 250px
            )`,
            background:
              "linear-gradient(90deg, rgba(20,20,20,0.92), rgba(10,10,10,0.99))",
            opacity: interpolate(
              frame,
              [
                OCCUPATION_MATTE_START_FRAME,
                OCCUPATION_MATTE_START_FRAME + 5,
              ],
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
              opacity: 0.32,
              backgroundImage:
                "repeating-linear-gradient(-7deg, transparent 0, transparent 17px, rgba(247,244,236,0.08) 18px, transparent 20px)",
            }}
          />
        </Interactive.Div>
      </Interactive.Div>

      <TornDivider boundaryX={boundaryX} jitter={tearJitter} />

      <AbsoluteFill
        style={{
          zIndex: 42,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 48% 43%, rgba(20,20,20,0) 25%, rgba(20,20,20,0.08) 60%, rgba(20,20,20,0.48) 100%)",
          opacity: interpolate(
            frame,
            [0, 24, 260, 327],
            [0.5, 0.7, 0.7, 0.88],
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
      />

      <ShatterEntrance />
    </AbsoluteFill>
  );
};