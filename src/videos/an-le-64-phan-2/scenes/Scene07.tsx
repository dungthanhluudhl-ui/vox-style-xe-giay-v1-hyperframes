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

const DISSOLVE_DURATION = 9;

const SHOT_01_DURATION = 67;
const SHOT_01_RENDER_DURATION = SHOT_01_DURATION + DISSOLVE_DURATION;

const SHOT_02_START_FRAME = 67;
const SHOT_02_DURATION = 60;

const SHOT_03_START_FRAME = 127;
const SHOT_03_DURATION = 66;
const SHOT_03_RENDER_DURATION = SHOT_03_DURATION + DISSOLVE_DURATION;

const SHOT_04_START_FRAME = 193;
const SHOT_04_DURATION = 54;

const SHOT_05_START_FRAME = 247;
const SHOT_05_DURATION = 47;
const SHOT_05_RENDER_DURATION = SHOT_05_DURATION + DISSOLVE_DURATION;

const SHOT_06_START_FRAME = 294;
const SHOT_06_DURATION = 50;
const SCENE_DURATION = 344;

const SCENE_GLOBAL_START_FRAME = 1284;
const SPARK_PULSE_GLOBAL_FRAME = 1346;
const SPARK_PULSE_START_FRAME =
  SPARK_PULSE_GLOBAL_FRAME - SCENE_GLOBAL_START_FRAME;
const SPARK_PULSE_DURATION = 9;

const TOOLS_IMAGE = staticFile(
  "videos/an-le-64-phan-2/media/images/img-02-papercraft-crime-weapons-evidence.png",
);
const LIGHTER_IMAGE = staticFile(
  "videos/an-le-64-phan-2/media/images/img-01-electric-lighter-gear-mechanism.png",
);
const TAXI_IMAGE = staticFile(
  "videos/an-le-64-phan-2/media/images/img-08-noi-bai-taxi-night-drive.png",
);
const AIRPORT_IMAGE = staticFile(
  "videos/an-le-64-phan-2/media/images/img-03-noi-bai-airport-night-departure.png",
);
const WINDOW_IMAGE = staticFile(
  "videos/an-le-64-phan-2/media/images/img-06-noi-bai-airport-escape-window.png",
);
const PLANNING_IMAGE = staticFile(
  "videos/an-le-64-phan-2/media/images/img-04-gang-leader-planning-map.png",
);

type DrawnIconName = "pin" | "clock" | "crowd";

type DrawnIconProps = {
  icon: DrawnIconName;
  name: string;
  size: number;
  accent?: string;
};

const DrawnIcon: React.FC<DrawnIconProps> = ({
  icon,
  name,
  size,
  accent = COLORS.orange,
}) => {
  const frame = useCurrentFrame();

  const paths: Record<DrawnIconName, string[]> = {
    pin: [
      "M50 9 C31 9 18 23 18 42 C18 64 50 91 50 91 C50 91 82 64 82 42 C82 23 69 9 50 9 Z",
      "M50 28 C42 28 36 34 36 42 C36 50 42 56 50 56 C58 56 64 50 64 42 C64 34 58 28 50 28 Z",
    ],
    clock: [
      "M50 11 C28 11 12 28 12 50 C12 72 28 89 50 89 C72 89 88 72 88 50 C88 28 72 11 50 11 Z",
      "M50 26 V51 L68 63",
      "M37 5 H63",
    ],
    crowd: [
      "M50 15 C40 15 33 23 33 33 C33 43 40 51 50 51 C60 51 67 43 67 33 C67 23 60 15 50 15 Z",
      "M18 89 C20 66 32 55 50 55 C68 55 80 66 82 89",
      "M22 29 C14 29 9 35 9 43 C9 51 15 57 23 57",
      "M78 29 C86 29 91 35 91 43 C91 51 85 57 77 57",
      "M5 85 C7 68 15 61 28 61 M95 85 C93 68 85 61 72 61",
    ],
  };

  return (
    <Interactive.Div
      name={name}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${accent}`,
        borderRadius: "50%",
        backgroundColor: "rgba(20,20,20,0.92)",
        boxShadow: `9px 9px 0 ${accent}`,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.55, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 12, 30, 48],
          ["0px 38px", "0px 0px", "0px -4px", "0px 1px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 12, 30, 48],
          ["-9deg", "1deg", "-1deg", "0.5deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
      }}
    >
      <svg
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        {paths[icon].map((path, index) => (
          <path
            key={`${icon}-${path}`}
            d={path}
            pathLength={1}
            stroke={
              icon === "crowd" && index > 1
                ? COLORS.onDarkText
                : accent
            }
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [index * 3, 14 + index * 4],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        ))}
      </svg>
    </Interactive.Div>
  );
};

type LabelPlateProps = {
  text: string;
  name: string;
  top: number;
  left: number;
  maxWidth?: number;
  light?: boolean;
};

const LabelPlate: React.FC<LabelPlateProps> = ({
  text,
  name,
  top,
  left,
  maxWidth = 620,
  light = false,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 42,
        top,
        left,
        maxWidth,
        boxSizing: "border-box",
        padding: "13px 21px 16px",
        border: `4px solid ${light ? COLORS.ink : COLORS.orange}`,
        borderRadius: 7,
        backgroundColor: light
          ? "rgba(245,240,228,0.95)"
          : "rgba(20,20,20,0.92)",
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        color: light ? COLORS.ink : COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 35,
        lineHeight: 1.08,
        letterSpacing: 1.5,
        textAlign: "center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 11], [0.72, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 11], ["0px 31px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        rotate: interpolate(frame, [0, 11], ["-2.5deg", "-0.4deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

type PunchPhraseProps = {
  text: string;
  name: string;
  top: number;
  fontSize?: number;
};

const PunchPhrase: React.FC<PunchPhraseProps> = ({
  text,
  name,
  top,
  fontSize = 58,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 48,
        top,
        left: 70,
        width: 940,
        boxSizing: "border-box",
        padding: "19px 27px 22px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: COLORS.orange,
        boxShadow: `13px 13px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize,
        lineHeight: 1.13,
        letterSpacing: -1.3,
        textAlign: "center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 8, 14], [0.64, 1.07, 1], {
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
          [0, 10, 24, 49],
          ["0px 45px", "0px -4px", "0px 0px", "0px -2px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 11, 25, 49],
          ["-3.5deg", "0.8deg", "-0.3deg", "0.2deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const ShatterImage: React.FC = () => {
  const frame = useCurrentFrame();

  const fragments = [
    {
      clipPath: "polygon(0 0, 38% 0, 31% 36%, 0 31%)",
      x: -155,
      y: -120,
      rotate: -8,
    },
    {
      clipPath: "polygon(38% 0, 73% 0, 69% 39%, 31% 36%)",
      x: 24,
      y: -180,
      rotate: 6,
    },
    {
      clipPath: "polygon(73% 0, 100% 0, 100% 36%, 69% 39%)",
      x: 170,
      y: -96,
      rotate: 9,
    },
    {
      clipPath: "polygon(0 31%, 31% 36%, 35% 73%, 0 100%)",
      x: -175,
      y: 95,
      rotate: 7,
    },
    {
      clipPath: "polygon(31% 36%, 69% 39%, 72% 72%, 35% 73%)",
      x: 12,
      y: 145,
      rotate: -5,
    },
    {
      clipPath: "polygon(69% 39%, 100% 36%, 100% 100%, 72% 72%)",
      x: 190,
      y: 110,
      rotate: -9,
    },
    {
      clipPath: "polygon(0 100%, 35% 73%, 72% 72%, 100% 100%)",
      x: -22,
      y: 190,
      rotate: 5,
    },
  ] as const;

  return (
    <Interactive.Div
      name="Shatter ghép bộ công cụ"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {fragments.map((fragment, index) => (
        <div
          key={`tool-fragment-${index}`}
          style={{
            position: "absolute",
            inset: -3,
            overflow: "hidden",
            clipPath: fragment.clipPath,
            translate: interpolate(
              frame,
              [index * 0.7, 19 + index * 0.7],
              [`${fragment.x}px ${fragment.y}px`, "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              },
            ),
            rotate: interpolate(
              frame,
              [index * 0.7, 19 + index * 0.7],
              [`${fragment.rotate}deg`, "0deg"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              },
            ),
            scale: interpolate(
              frame,
              [index * 0.7, 19 + index * 0.7],
              [1.08, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
                output: "perceptual-scale",
              },
            ),
          }}
        >
          <MediaAssembler
            kind="image"
            src={TOOLS_IMAGE}
            durationInFrames={SHOT_01_RENDER_DURATION}
            cameraMotion="pan-right"
            objectPosition="48% 50%"
            contrast={1}
          />
        </div>
      ))}

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0) 31%, rgba(20,20,20,0.04) 62%, rgba(20,20,20,0.38) 100%)",
          pointerEvents: "none",
        }}
      />
    </Interactive.Div>
  );
};

const ToolDataMarker: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Món công cụ thứ nhất"
      style={{
        position: "absolute",
        zIndex: 34,
        top: 205,
        left: 72,
        minWidth: 220,
        boxSizing: "border-box",
        padding: "15px 24px 18px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: COLORS.orange,
        boxShadow: `10px 10px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 66,
        lineHeight: 1,
        textAlign: "center",
        fontVariantNumeric: "tabular-nums",
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.55, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 12], ["-42px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      1 / 3
    </Interactive.Div>
  );
};

const SprayAnnotation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Chú thích bình xịt"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 37,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 5, 51, 58], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.bezier(0.16, 1, 0.3, 1),
            Easing.linear,
            Easing.bezier(0.7, 0, 0.84, 0),
          ],
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
          d="M286 515 C304 574 312 625 318 706"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 20], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M276 505 C294 564 302 615 308 696"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 22], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M308 696 L278 651 M308 696 L339 649"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [16, 27], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      <LabelPlate
        name="Nhãn khống chế từ xa"
        text="KHỐNG CHẾ TỪ XA"
        top={390}
        left={72}
        maxWidth={520}
      />
    </Interactive.Div>
  );
};

const MovingFocusRing: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Vòng tiêu điểm chuyển sang bật lửa"
      style={{
        position: "absolute",
        zIndex: 40,
        top: 650,
        left: 190,
        width: 230,
        height: 300,
        border: `8px solid ${COLORS.orange}`,
        borderRadius: "50%",
        boxShadow: `0 0 0 5px ${COLORS.ink}`,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 5, 38, 43], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.bezier(0.16, 1, 0.3, 1),
            Easing.linear,
            Easing.bezier(0.7, 0, 0.84, 0),
          ],
        }),
        translate: interpolate(
          frame,
          [0, 23, 43],
          ["0px 0px", "410px 210px", "416px 204px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        scale: interpolate(
          frame,
          [0, 9, 23, 29, 43],
          [0.72, 1, 0.82, 1.05, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(frame, [0, 23, 43], ["-7deg", "5deg", "3deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.bezier(0.16, 1, 0.3, 1),
            Easing.bezier(0.45, 0, 0.55, 1),
          ],
        }),
      }}
    />
  );
};

const Shot01: React.FC = () => {
  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <ShatterImage />

      <Sequence
        name="First tool data marker"
        durationInFrames={SHOT_01_DURATION}
        layout="none"
      >
        <ToolDataMarker />
      </Sequence>

      <Sequence
        name="Spray annotation"
        from={8}
        durationInFrames={59}
        layout="none"
      >
        <SprayAnnotation />
      </Sequence>

      <Sequence
        name="Moving lighter focus ring"
        from={23}
        durationInFrames={44}
        layout="none"
      >
        <MovingFocusRing />
      </Sequence>
    </AbsoluteFill>
  );
};

const ToolCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const isComplete = frame >= 17;

  return (
    <Interactive.Div
      name="Bộ đếm hoàn tất ba món"
      style={{
        position: "absolute",
        zIndex: 47,
        top: 1005,
        left: 365,
        width: 350,
        boxSizing: "border-box",
        padding: "15px 24px 18px",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 9,
        backgroundColor: "rgba(20,20,20,0.93)",
        boxShadow: `11px 11px 0 ${COLORS.orange}`,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 72,
        lineHeight: 1,
        textAlign: "center",
        fontVariantNumeric: "tabular-nums",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [0, 8, 16, 17, 24, 44],
          [0.66, 1, 1, 1.16, 1, 1.02],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.linear,
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [0, 8, 16, 17, 24, 44],
          [
            "0px 35px",
            "0px 0px",
            "0px 0px",
            "0px -8px",
            "0px 0px",
            "0px -2px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.linear,
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
      }}
    >
      {isComplete ? "3 / 3" : "2 / 3"}
    </Interactive.Div>
  );
};

const Shot02: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Interactive.Div
        name="Dissolve vào bật lửa điện"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, DISSOLVE_DURATION], [0.22, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 13], [1.06, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <MediaAssembler
          kind="image"
          src={LIGHTER_IMAGE}
          durationInFrames={SHOT_02_DURATION}
          cameraMotion="zoom-in"
          objectPosition="50% 49%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.26) 0%, rgba(20,20,20,0.02) 30%, rgba(20,20,20,0) 61%, rgba(20,20,20,0.42) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Dư sáng tia lửa"
        style={{
          position: "absolute",
          zIndex: 25,
          top: 610,
          left: 380,
          width: 330,
          height: 330,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(247,244,236,0.96) 0%, rgba(255,106,26,0.55) 24%, rgba(255,106,26,0.12) 52%, rgba(255,106,26,0) 75%)",
          mixBlendMode: "screen",
          opacity: interpolate(frame, [0, 4, 13], [0.85, 0.55, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          }),
          scale: interpolate(frame, [0, 13], [0.72, 1.32], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
          pointerEvents: "none",
        }}
      />

      <PunchPhrase
        name="Mạch điện kích hoạt"
        text="MẠCH ĐIỆN KÍCH HOẠT"
        top={205}
        fontSize={56}
      />

      <Sequence
        name="Tool completion counter"
        from={15}
        durationInFrames={45}
        layout="none"
      >
        <ToolCounter />
      </Sequence>
    </AbsoluteFill>
  );
};

const TravelTimeline: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Timeline di chuyển đến Nội Bài"
      style={{
        position: "absolute",
        zIndex: 38,
        top: 1120,
        left: 70,
        width: 940,
        height: 190,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        pointerEvents: "none",
      }}
    >
      <svg
        width="940"
        height="190"
        viewBox="0 0 940 190"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M45 96 C246 63 428 124 610 91 C714 72 799 65 890 84"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={22}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 29], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M45 86 C246 53 428 114 610 81 C714 62 799 55 890 74"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 31], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M890 74 L824 31 M890 74 L814 103"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [25, 38], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        {[46, 315, 610, 886].map((x, index) => (
          <circle
            key={`travel-node-${x}`}
            cx={x}
            cy={index === 0 ? 86 : index === 1 ? 80 : 81}
            r={index === 3 ? 18 : 13}
            fill={COLORS.orange}
            stroke={COLORS.ink}
            strokeWidth={7}
            opacity={interpolate(
              frame,
              [6 + index * 7, 12 + index * 7],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          top: 56,
          left: 28,
          width: 42,
          height: 42,
          border: `6px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor: COLORS.orange,
          translate: interpolate(
            frame,
            [7, 54],
            ["0px 0px", "826px -8px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(frame, [48, 57], [0.78, 1.28], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          }),
        }}
      />
    </Interactive.Div>
  );
};

const Shot03: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Interactive.Div
        name="Taxi tiến về Nội Bài"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          translate: interpolate(
            frame,
            [0, 43, 48, 53, SHOT_03_DURATION - 1],
            [
              "0px 0px",
              "0px 0px",
              "0px -15px",
              "0px 0px",
              "0px -3px",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.linear,
                Easing.spring({damping: 200}),
                Easing.spring({damping: 200}),
                Easing.bezier(0.45, 0, 0.55, 1),
              ],
            },
          ),
        }}
      >
        <MediaAssembler
          kind="image"
          src={TAXI_IMAGE}
          durationInFrames={SHOT_03_RENDER_DURATION}
          cameraMotion="pan-right"
          objectPosition="50% 50%"
          contrast={1}
        />

        <Interactive.Div
          name="Parallax lớp taxi"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            WebkitMaskImage:
              "radial-gradient(ellipse 42% 31% at 48% 66%, black 0%, black 53%, rgba(0,0,0,0.48) 73%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 42% 31% at 48% 66%, black 0%, black 53%, rgba(0,0,0,0.48) 73%, transparent 100%)",
            translate: interpolate(
              frame,
              [0, SHOT_03_RENDER_DURATION - 1],
              ["-10px 0px", "18px -5px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            scale: interpolate(
              frame,
              [0, SHOT_03_RENDER_DURATION - 1],
              [1.015, 1.04],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
          }}
        >
          <MediaAssembler
            kind="image"
            src={TAXI_IMAGE}
            durationInFrames={SHOT_03_RENDER_DURATION}
            cameraMotion="pan-right"
            objectPosition="50% 50%"
            contrast={1}
          />
        </Interactive.Div>

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0) 29%, rgba(20,20,20,0.04) 56%, rgba(20,20,20,0.48) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <Sequence
        name="Taxi travel timeline hold"
        durationInFrames={SHOT_03_DURATION}
        layout="none"
      >
        <TravelTimeline />
      </Sequence>

      <Sequence
        name="Airport direction label"
        from={21}
        durationInFrames={45}
        layout="none"
      >
        <LabelPlate
          name="Hướng ra sân bay"
          text="HƯỚNG RA SÂN BAY"
          top={250}
          left={555}
          maxWidth={455}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const Shot04: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Interactive.Div
        name="Dissolve mở rộng khu vực Nội Bài"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(
            frame,
            [0, DISSOLVE_DURATION - 1],
            [0.25, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [0, SHOT_04_DURATION - 1],
            [1.1, 1.025],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        <MediaAssembler
          kind="image"
          src={AIRPORT_IMAGE}
          durationInFrames={SHOT_04_DURATION}
          cameraMotion="none"
          objectPosition="49% 49%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.24) 0%, rgba(20,20,20,0) 32%, rgba(20,20,20,0.02) 65%, rgba(20,20,20,0.4) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          zIndex: 43,
          top: 465,
          right: 90,
        }}
      >
        <DrawnIcon
          icon="pin"
          name="Ghim điểm tập kết"
          size={140}
        />
      </div>

      <LabelPlate
        name="Nhãn điểm tập kết"
        text="ĐIỂM TẬP KẾT"
        top={230}
        left={72}
        maxWidth={455}
        light
      />
    </AbsoluteFill>
  );
};

const Shot05: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Interactive.Div
        name="Zoom qua cửa sổ nơi nghỉ"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          translate: interpolate(
            frame,
            [0, 18, 34, SHOT_05_DURATION - 1],
            ["0px 18px", "0px 0px", "0px -4px", "0px 1px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.bezier(0.45, 0, 0.55, 1),
                Easing.bezier(0.45, 0, 0.55, 1),
              ],
            },
          ),
        }}
      >
        <MediaAssembler
          kind="image"
          src={WINDOW_IMAGE}
          durationInFrames={SHOT_05_RENDER_DURATION}
          cameraMotion="zoom-in"
          objectPosition="49% 50%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.29) 0%, rgba(20,20,20,0) 34%, rgba(20,20,20,0.04) 60%, rgba(20,20,20,0.48) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <Sequence
        name="Hideout label and clock hold"
        durationInFrames={SHOT_05_DURATION}
        layout="none"
      >
        <div
          style={{
            position: "absolute",
            zIndex: 45,
            top: 255,
            left: 72,
          }}
        >
          <DrawnIcon
            icon="clock"
            name="Biểu tượng chờ đợi"
            size={132}
          />
        </div>

        <LabelPlate
          name="Nhãn chia chỗ ẩn"
          text="CHIA CHỖ ẨN"
          top={285}
          left={245}
          maxWidth={420}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const Shot06: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Interactive.Div
        name="Dissolve vào bàn kế hoạch"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(
            frame,
            [0, DISSOLVE_DURATION - 1],
            [0.25, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(
            frame,
            [0, SHOT_06_DURATION - 1],
            ["20px 0px", "-8px -6px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <MediaAssembler
          kind="image"
          src={PLANNING_IMAGE}
          durationInFrames={SHOT_06_DURATION}
          cameraMotion="zoom-in"
          objectPosition="50% 51%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.35) 0%, rgba(20,20,20,0.03) 31%, rgba(20,20,20,0.02) 57%, rgba(20,20,20,0.53) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <PunchPhrase
        name="Kế hoạch siết lại"
        text="KẾ HOẠCH SIẾT LẠI"
        top={205}
        fontSize={59}
      />

      <Sequence
        name="Crowd icon"
        from={2}
        durationInFrames={48}
        layout="none"
      >
        <div
          style={{
            position: "absolute",
            zIndex: 50,
            top: 980,
            right: 90,
          }}
        >
          <DrawnIcon
            icon="crowd"
            name="Biểu tượng nhóm đồng phạm"
            size={154}
          />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

const SparkPulse: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Pulse tia lửa điện"
      style={{
        position: "absolute",
        zIndex: 74,
        top: 610,
        left: 380,
        width: 330,
        height: 330,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 1, 3, 8], [0.38, 1, 0.68, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.bezier(0.16, 1, 0.3, 1),
            Easing.linear,
            Easing.bezier(0.7, 0, 0.84, 0),
          ],
        }),
        scale: interpolate(frame, [0, 2, 8], [0.42, 1.08, 1.55], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.spring({damping: 200}),
            Easing.bezier(0.7, 0, 0.84, 0),
          ],
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 5, 8],
          ["170px 235px", "0px 0px", "0px 0px"],
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(247,244,236,1) 0%, rgba(247,244,236,0.96) 8%, rgba(255,106,26,0.78) 21%, rgba(255,106,26,0.25) 44%, rgba(255,106,26,0) 70%)",
          mixBlendMode: "screen",
        }}
      />

      <svg
        width="330"
        height="330"
        viewBox="0 0 330 330"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          rotate: interpolate(frame, [0, 8], ["-8deg", "13deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {[
          "M165 18 L165 92",
          "M165 238 L165 312",
          "M18 165 L92 165",
          "M238 165 L312 165",
          "M61 61 L113 113",
          "M217 217 L269 269",
          "M269 61 L217 113",
          "M113 217 L61 269",
        ].map((path, index) => (
          <path
            key={`spark-ray-${index}`}
            d={path}
            pathLength={1}
            stroke={index % 2 === 0 ? COLORS.onDarkText : COLORS.orange}
            strokeWidth={index % 2 === 0 ? 10 : 8}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [0, 2 + (index % 2), 8],
              [1, 0, 0.72],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.7, 0, 0.84, 0),
                ],
              },
            )}
          />
        ))}

        <path
          d="M141 180 L160 139 L173 161 L197 123 L185 177 L167 159 Z"
          fill={COLORS.onDarkText}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinejoin="round"
          opacity={interpolate(frame, [0, 1, 5, 8], [0.6, 1, 0.82, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
      }}
    >
      <BackgroundTreatment variant="spotlight" />

      <Sequence
        name="Tools shatter shot"
        durationInFrames={SHOT_01_RENDER_DURATION}
        layout="none"
      >
        <Shot01 />
      </Sequence>

      <Sequence
        name="Electric lighter shot"
        from={SHOT_02_START_FRAME}
        durationInFrames={SHOT_02_DURATION}
        layout="none"
      >
        <Shot02 />
      </Sequence>

      <Sequence
        name="Taxi travel shot"
        from={SHOT_03_START_FRAME}
        durationInFrames={SHOT_03_RENDER_DURATION}
        layout="none"
      >
        <Shot03 />
      </Sequence>

      <Sequence
        name="Noi Bai establishing shot"
        from={SHOT_04_START_FRAME}
        durationInFrames={SHOT_04_DURATION}
        layout="none"
      >
        <Shot04 />
      </Sequence>

      <Sequence
        name="Airport window hideout shot"
        from={SHOT_05_START_FRAME}
        durationInFrames={SHOT_05_RENDER_DURATION}
        layout="none"
      >
        <Shot05 />
      </Sequence>

      <Sequence
        name="Planning room shot"
        from={SHOT_06_START_FRAME}
        durationInFrames={SHOT_06_DURATION}
        layout="none"
      >
        <Shot06 />
      </Sequence>

      <Sequence
        name="Electric spark pulse at global frame 1346"
        from={SPARK_PULSE_START_FRAME}
        durationInFrames={SPARK_PULSE_DURATION}
        layout="none"
      >
        <SparkPulse />
      </Sequence>

      <AbsoluteFill
        style={{
          zIndex: 80,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 45%, rgba(20,20,20,0) 30%, rgba(20,20,20,0.08) 59%, rgba(20,20,20,0.5) 100%)",
          opacity:
            0.76 +
            Math.sin(
              (frame / Math.max(1, SCENE_DURATION - 1)) * Math.PI * 5,
            ) *
              0.035,
        }}
      />

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