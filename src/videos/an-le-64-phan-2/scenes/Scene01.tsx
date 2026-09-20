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
import {LightOverlay} from "../../../components/LightOverlay";
import {MediaAssembler} from "../../../components/MediaAssembler";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const SCENE_DURATION = 251;
const DATE_START_FRAME = 49;
const DATE_DURATION = 62;
const PUNCH_START_FRAME = 113;
const PUNCH_DURATION = 66;
const TRANSFER_START_FRAME = 191;
const COUNTER_START_FRAME = 198;
const COUNTER_LOCK_FRAME = 226;

type FadeAtEndProps = {
  children: React.ReactNode;
  durationInFrames: number;
};

const FadeAtEnd: React.FC<FadeAtEndProps> = ({
  children,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Timed overlay visibility"
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
      name="Khoản vay được lập"
      style={{
        position: "absolute",
        top: 650,
        left: 70,
        width: 940,
        display: "flex",
        justifyContent: "center",
        padding: "20px 28px",
        boxSizing: "border-box",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: 8,
        backgroundColor: COLORS.orange,
        color: COLORS.ink,
        boxShadow: `12px 12px 0 ${COLORS.ink}`,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 64,
        lineHeight: 1.18,
        letterSpacing: -1.2,
        textAlign: "center",
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 10], [0.82, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 10],
          ["0px 34px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      KHOẢN VAY ĐƯỢC LẬP
    </Interactive.Div>
  );
};

const TransferArrow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dòng tiền từ N sang T"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [TRANSFER_START_FRAME, TRANSFER_START_FRAME + 5],
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
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <path
          d="M190 1060 C380 950 680 950 870 1060"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TRANSFER_START_FRAME, TRANSFER_START_FRAME + 24],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M190 1049 C380 939 680 939 870 1049"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TRANSFER_START_FRAME + 2, TRANSFER_START_FRAME + 26],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M837 1015 L890 1050 L836 1080"
          stroke={COLORS.ink}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(
            frame,
            [TRANSFER_START_FRAME + 18, TRANSFER_START_FRAME + 25],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )}
        />
        <path
          d="M838 1006 L891 1041 L837 1071"
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(
            frame,
            [TRANSFER_START_FRAME + 19, TRANSFER_START_FRAME + 26],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 118,
          top: 1008,
          width: 82,
          height: 82,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `5px solid ${COLORS.orange}`,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          color: COLORS.onDarkText,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 44,
          lineHeight: 1,
          boxShadow: `7px 7px 0 ${COLORS.orange}`,
        }}
      >
        N
      </div>

      <div
        style={{
          position: "absolute",
          left: 880,
          top: 1008,
          width: 82,
          height: 82,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `5px solid ${COLORS.orange}`,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          color: COLORS.onDarkText,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 44,
          lineHeight: 1,
          boxShadow: `7px 7px 0 ${COLORS.orange}`,
        }}
      >
        T
      </div>

      {[0, 1, 2].map((index) => {
        const noteStart = TRANSFER_START_FRAME + 3 + index * 5;
        const noteEnd = TRANSFER_START_FRAME + 27 + index * 5;

        return (
          <div
            key={`moving-banknote-${index}`}
            style={{
              position: "absolute",
              left: 238,
              top: 992 + index * 15,
              width: 112,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `4px solid ${COLORS.ink}`,
              borderRadius: 5,
              backgroundColor: COLORS.backgroundCard,
              color: COLORS.ink,
              fontFamily,
              fontWeight: FONT.weights.black,
              fontSize: 20,
              lineHeight: 1,
              rotate: `${-7 + index * 6}deg`,
              translate: interpolate(
                frame,
                [noteStart, noteEnd],
                ["0px 0px", "478px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              opacity: interpolate(
                frame,
                [noteStart, noteStart + 3, noteEnd - 3, noteEnd],
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
              boxShadow: `5px 5px 0 ${COLORS.orange}`,
            }}
          >
            500K
          </div>
        );
      })}
    </Interactive.Div>
  );
};

const LoanCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const amount = Math.round(
    interpolate(
      frame,
      [COUNTER_START_FRAME, COUNTER_LOCK_FRAME],
      [0, 150],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      },
    ),
  );

  return (
    <Interactive.Div
      name="Bộ đếm 150 triệu"
      style={{
        position: "absolute",
        zIndex: 24,
        top: 1180,
        left: 150,
        width: 780,
        boxSizing: "border-box",
        padding: "18px 28px 22px",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 10,
        backgroundColor: "rgba(245,240,228,0.96)",
        boxShadow: `13px 13px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        textAlign: "center",
        pointerEvents: "none",
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
        scale: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 10],
          [0.8, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [COUNTER_START_FRAME, COUNTER_START_FRAME + 10],
          ["0px 30px", "0px 0px"],
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
          marginBottom: 3,
          color: COLORS.orange,
          fontWeight: FONT.weights.black,
          fontSize: 27,
          lineHeight: 1.1,
          letterSpacing: 3.5,
        }}
      >
        GIÁ TRỊ CHỐT
      </div>
      <div
        style={{
          fontWeight: FONT.weights.black,
          fontSize: 88,
          lineHeight: 1.05,
          letterSpacing: -2.5,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {amount} TRIỆU
      </div>
    </Interactive.Div>
  );
};

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.backgroundCard,
      }}
    >
      <Interactive.Div
        name="Unfold photo entrance"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          clipPath: `inset(0 ${interpolate(frame, [0, 24], [50, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}% 0 ${interpolate(frame, [0, 24], [50, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}%)`,
        }}
      >
        <MediaAssembler
          kind="image"
          src={staticFile(
            "videos/an-le-64-phan-2/media/images/img-05-timeline-august-2018-cash-suspect.png",
          )}
          durationInFrames={SCENE_DURATION}
          cameraMotion="pan-right"
          objectPosition="48% 50%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.08) 0%, rgba(20,20,20,0) 32%, rgba(20,20,20,0.06) 58%, rgba(20,20,20,0.34) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <BackgroundTreatment variant="card" />

      <Interactive.Div
        name="Unfold center seam"
        style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          bottom: 0,
          left: 540,
          width: interpolate(frame, [0, 20], [32, 3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: "-50% 0px",
          backgroundColor: COLORS.orange,
          opacity: interpolate(frame, [0, 17, 25], [0.95, 0.45, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          }),
          pointerEvents: "none",
        }}
      />

      <Sequence
        name="Date marker"
        from={DATE_START_FRAME}
        durationInFrames={DATE_DURATION}
        layout="none"
      >
        <FadeAtEnd durationInFrames={DATE_DURATION}>
          <LightOverlay
            name="Mốc tháng 8 năm 2018"
            text="08 / 2018"
            variant="amount"
            top={245}
            left={70}
            maxWidth={520}
          />
        </FadeAtEnd>
      </Sequence>

      <Sequence
        name="Punch phrase"
        from={PUNCH_START_FRAME}
        durationInFrames={PUNCH_DURATION}
        layout="none"
      >
        <FadeAtEnd durationInFrames={PUNCH_DURATION}>
          <PunchPhrase />
        </FadeAtEnd>
      </Sequence>

      <TransferArrow />
      <LoanCounter />
    </AbsoluteFill>
  );
};