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
  "videos/tham-hoa-itaewon-phan-2/media/images/img-03-itaewon-halloween-crowd-crush.jpeg",
);

const SCENE_DURATION = 198;
const COUNTER_START_FRAME = 35;
const RISE_ICON_START_FRAME = 47;
const PUNCH_START_FRAME = 82;
const DENSITY_START_FRAME = 147;

const formatCount = (value: number) => {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CrowdPhoto: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Punch entrance — đám đông Itaewon"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 8, 16], [0.86, 1.04, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.spring({damping: 200}),
            Easing.spring({damping: 200}),
          ],
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
          objectPosition: "50% 48%",
          scale: interpolate(
            frame,
            [0, SCENE_DURATION - 1],
            [1, 1.08],
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

const LowerReadabilityGradient: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        zIndex: 5,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        background:
          "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 36%, rgba(10,10,10,0.18) 55%, rgba(10,10,10,0.66) 82%, rgba(10,10,10,0.82) 100%)",
      }}
    />
  );
};

const ReferenceLine: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Mốc tham chiếu 100.000"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 8, 74, 82], [0, 0.72, 0.72, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.bezier(0.16, 1, 0.3, 1),
            Easing.linear,
            Easing.bezier(0.16, 1, 0.3, 1),
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
      >
        <path
          d="M72 1040 H1008"
          pathLength={1}
          stroke="rgba(247,244,236,0.82)"
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 18], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M72 1040 H1008"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [3, 21], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      <Interactive.Div
        name="Nhãn mốc tham chiếu"
        style={{
          position: "absolute",
          top: 934,
          left: 72,
          minWidth: 298,
          padding: "14px 20px 16px",
          border: `3px solid ${COLORS.orange}`,
          borderRadius: 7,
          backgroundColor: "rgba(20,20,20,0.84)",
          color: COLORS.onDarkText,
          boxShadow: `8px 8px 0 rgba(255,106,26,0.72)`,
          opacity: interpolate(frame, [5, 13], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [5, 17], ["-30px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
        }}
      >
        <div
          style={{
            marginBottom: 7,
            color: COLORS.orange,
            fontSize: 22,
            fontWeight: FONT.weights.black,
            lineHeight: 1,
            letterSpacing: 2.3,
          }}
        >
          MỐC THAM CHIẾU
        </div>
        <div
          style={{
            fontSize: 55,
            fontWeight: FONT.weights.black,
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          100.000
        </div>
      </Interactive.Div>
    </Interactive.Div>
  );
};

const RisingCount: React.FC = () => {
  const frame = useCurrentFrame();
  const currentCount = interpolate(
    frame,
    [COUNTER_START_FRAME, PUNCH_START_FRAME],
    [100_000, 130_000],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  return (
    <Interactive.Div
      name="Bộ đếm vượt mốc 100.000"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 24,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [
            COUNTER_START_FRAME,
            COUNTER_START_FRAME + 7,
            112,
            119,
          ],
          [0, 1, 1, 0],
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
    >
      <Interactive.Div
        name="Cột tăng trưởng"
        style={{
          position: "absolute",
          right: 104,
          bottom: 570,
          width: 158,
          height: interpolate(
            frame,
            [COUNTER_START_FRAME, PUNCH_START_FRAME],
            [310, 620],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          overflow: "hidden",
          border: `5px solid ${COLORS.ink}`,
          borderRadius: "8px 8px 0 0",
          backgroundColor: COLORS.orange,
          boxShadow: `11px 11px 0 rgba(20,20,20,0.72)`,
          scale: interpolate(
            frame,
            [COUNTER_START_FRAME, COUNTER_START_FRAME + 12],
            [0.76, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          transformOrigin: "bottom center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 12,
            border: "3px solid rgba(20,20,20,0.56)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 23,
            right: 23,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[1, 0.78, 0.9].map((width, index) => (
            <div
              key={`${width}-${index}`}
              style={{
                width: `${width * 100}%`,
                height: 8,
                backgroundColor: COLORS.ink,
                opacity: 0.68,
              }}
            />
          ))}
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Bảng số đang tăng"
        style={{
          position: "absolute",
          top: 1120,
          left: 72,
          width: 822,
          minHeight: 126,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 26px",
          border: `4px solid ${COLORS.orange}`,
          borderRadius: 8,
          backgroundColor: "rgba(20,20,20,0.9)",
          boxShadow: `10px 10px 0 rgba(255,106,26,0.72)`,
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
            [COUNTER_START_FRAME, COUNTER_START_FRAME + 13],
            ["0px 38px", "0px 0px"],
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
            color: "rgba(247,244,236,0.68)",
            fontSize: 43,
            fontWeight: FONT.weights.black,
            lineHeight: 1,
            letterSpacing: -0.5,
          }}
        >
          100.000
        </div>

        <svg
          width="116"
          height="58"
          viewBox="0 0 116 58"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 29 H98 M78 10 L100 29 L78 48"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [COUNTER_START_FRAME + 5, COUNTER_START_FRAME + 18],
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
            minWidth: 286,
            color: COLORS.orange,
            fontSize: 66,
            fontWeight: FONT.weights.black,
            lineHeight: 1,
            letterSpacing: -1.6,
            textAlign: "right",
          }}
        >
          {formatCount(currentCount)}
        </div>
      </Interactive.Div>
    </Interactive.Div>
  );
};

const RiseIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Biểu tượng tăng vọt"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 642,
        right: 78,
        width: 142,
        height: 142,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 999,
        backgroundColor: "rgba(20,20,20,0.92)",
        boxShadow: `9px 9px 0 rgba(255,106,26,0.76)`,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [
            RISE_ICON_START_FRAME,
            RISE_ICON_START_FRAME + 7,
            132,
            139,
          ],
          [0, 1, 1, 0],
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
        scale: interpolate(
          frame,
          [RISE_ICON_START_FRAME, RISE_ICON_START_FRAME + 13],
          [0.42, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(
          frame,
          [RISE_ICON_START_FRAME, RISE_ICON_START_FRAME + 13],
          ["-14deg", "2deg"],
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
          width: 94,
          height: 94,
          translate: `${Math.sin(frame / 8) * 3}px ${Math.sin(
            frame / 10 + 0.8,
          ) * 4}px`,
        }}
      >
        <svg
          width="94"
          height="94"
          viewBox="0 0 94 94"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 75 L35 53 L50 64 L78 29"
            pathLength={1}
            stroke={COLORS.onDarkText}
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [RISE_ICON_START_FRAME, RISE_ICON_START_FRAME + 18],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
          <path
            d="M57 28 H79 V50"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [
                RISE_ICON_START_FRAME + 10,
                RISE_ICON_START_FRAME + 24,
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
      </div>
    </Interactive.Div>
  );
};

const RecordPunch: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Kỷ lục 130.000"
      style={{
        position: "absolute",
        zIndex: 32,
        top: 746,
        left: 70,
        width: 650,
        minHeight: 252,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "31px 40px 35px",
        border: `6px solid ${COLORS.ink}`,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
        color: COLORS.ink,
        boxShadow: `15px 15px 0 rgba(20,20,20,0.86)`,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [PUNCH_START_FRAME, PUNCH_START_FRAME + 6],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [PUNCH_START_FRAME, PUNCH_START_FRAME + 13],
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
          [PUNCH_START_FRAME, PUNCH_START_FRAME + 13],
          ["0px 66px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: `${-0.8 + Math.sin(frame / 18) * 0.45}deg`,
      }}
    >
      <div
        style={{
          marginBottom: 13,
          fontSize: 26,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 3.1,
        }}
      >
        ĐỈNH GHI NHẬN
      </div>

      <div
        style={{
          fontSize: 112,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: -4.2,
          whiteSpace: "nowrap",
        }}
      >
        130.000
      </div>

      <div
        style={{
          marginTop: 18,
          width: interpolate(
            frame,
            [PUNCH_START_FRAME + 7, PUNCH_START_FRAME + 24],
            [0, 540],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          height: 11,
          backgroundColor: COLORS.ink,
          rotate: "-1deg",
        }}
      />
    </Interactive.Div>
  );
};

const DensityMask: React.FC = () => {
  const frame = useCurrentFrame();
  const holeWidth = interpolate(
    frame,
    [DENSITY_START_FRAME, SCENE_DURATION - 1],
    [92, 58],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );
  const holeHeight = interpolate(
    frame,
    [DENSITY_START_FRAME, SCENE_DURATION - 1],
    [88, 52],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  return (
    <Interactive.Div
      name="Vùng trống co hẹp"
      style={{
        position: "absolute",
        zIndex: 12,
        top: 510,
        left: 0,
        right: 0,
        bottom: 18,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [DENSITY_START_FRAME, DENSITY_START_FRAME + 10],
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
          backgroundImage: `radial-gradient(ellipse ${holeWidth}% ${holeHeight}% at 50% 48%, transparent 0%, transparent 54%, rgba(10,10,10,0.78) 100%)`,
          opacity: interpolate(
            frame,
            [DENSITY_START_FRAME, SCENE_DURATION - 1],
            [0.28, 0.76],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      />

      <Interactive.Div
        name="Mảng tối ép từ trái"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: interpolate(
            frame,
            [DENSITY_START_FRAME, SCENE_DURATION - 1],
            [0, 210],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          overflow: "hidden",
          background:
            "linear-gradient(to right, rgba(10,10,10,0.76), rgba(10,10,10,0.22))",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 5,
            backgroundColor: COLORS.orange,
            opacity: 0.58,
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Mảng tối ép từ phải"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: interpolate(
            frame,
            [DENSITY_START_FRAME, SCENE_DURATION - 1],
            [0, 210],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          overflow: "hidden",
          background:
            "linear-gradient(to left, rgba(10,10,10,0.76), rgba(10,10,10,0.22))",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 5,
            backgroundColor: COLORS.orange,
            opacity: 0.58,
          }}
        />
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene11: React.FC = () => {
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
      <CrowdPhoto />
      <BackgroundTreatment variant="chart" />
      <LowerReadabilityGradient />
      <DensityMask />
      <ReferenceLine />
      <RisingCount />
      <RiseIcon />
      <RecordPunch />
    </AbsoluteFill>
  );
};