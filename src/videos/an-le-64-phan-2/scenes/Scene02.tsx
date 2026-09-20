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
  LightOverlay,
  SimpleIcon,
} from "../../../components/LightOverlay";
import {MediaAssembler} from "../../../components/MediaAssembler";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const SCENE_DURATION = 237;

const MONEY_ICON_START_FRAME = 17;
const MONEY_ICON_DURATION = 93;

const BARRIER_START_FRAME = 56;
const BARRIER_DURATION = 54;

const SOUTH_POINT_START_FRAME = 110;
const SOUTH_POINT_DURATION = 66;

const REVERSE_ARROW_START_FRAME = 175;
const REVERSE_ARROW_DURATION = 62;

const REVERSE_LABEL_START_FRAME = 189;
const REVERSE_LABEL_DURATION = 48;

type TimedLayerProps = {
  children: React.ReactNode;
  durationInFrames: number;
  name: string;
};

const TimedLayer: React.FC<TimedLayerProps> = ({
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

const MoneyDemandIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Biểu tượng đòi tiền"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 250,
        left: 72,
        width: 128,
        height: 128,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: "50%",
        backgroundColor: "rgba(20,20,20,0.9)",
        boxShadow: `9px 9px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.68, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 12], ["0px 48px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        rotate: interpolate(frame, [0, 12], ["-9deg", "0deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      <SimpleIcon icon="money" size={82} color={COLORS.orange} />
    </Interactive.Div>
  );
};

const BlockedMoneyFlow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dòng tiền bị chặn"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 24,
        pointerEvents: "none",
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
          d="M884 884 C736 826 553 842 365 903"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={15}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 23], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M884 874 C736 816 553 832 365 893"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 25], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M310 732 L310 1027"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={25}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [4, 18], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M310 732 L310 1027"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [6, 20], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M265 817 L355 937 M355 817 L265 937"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={20}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [19, 33], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M265 807 L355 927 M355 807 L265 927"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [21, 35], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      {[0, 1, 2].map((index) => {
        const noteStart = 5 + index * 7;
        const noteStop = 31 + index * 5;

        return (
          <div
            key={`blocked-money-${index}`}
            style={{
              position: "absolute",
              top: 810 + index * 48,
              left: 740 + index * 42,
              width: 116,
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `4px solid ${COLORS.ink}`,
              borderRadius: 5,
              backgroundColor: COLORS.backgroundCard,
              boxShadow: `5px 5px 0 ${COLORS.orange}`,
              color: COLORS.ink,
              fontFamily,
              fontWeight: FONT.weights.black,
              fontSize: 21,
              lineHeight: 1,
              rotate: `${-7 + index * 6}deg`,
              translate: interpolate(
                frame,
                [noteStart, noteStop],
                ["0px 0px", `${-405 - index * 40}px 0px`],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              opacity: interpolate(
                frame,
                [noteStart, noteStart + 4, BARRIER_DURATION - 8],
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
            }}
          >
            500K
          </div>
        );
      })}
    </Interactive.Div>
  );
};

const SouthPoint: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Điểm phía Nam"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 26,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 1110,
          left: 800,
          width: 56,
          height: 56,
          border: `9px solid ${COLORS.orange}`,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          boxShadow: `7px 7px 0 rgba(20,20,20,0.75)`,
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 12], [0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          }),
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 1088,
          left: 778,
          width: 100,
          height: 100,
          border: `4px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(frame, [8, 25, 42], [0, 0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          }),
          scale: interpolate(frame, [8, 42], [0.45, 1.65], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      />

      <LightOverlay
        name="Nhãn điểm phía Nam"
        text="ĐIỂM PHÍA NAM"
        variant="label"
        top={1190}
        left={575}
        maxWidth={430}
      />
    </Interactive.Div>
  );
};

const ReverseArrow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Mũi tên kéo ngược ra Bắc"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 28,
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
          d="M824 1138 C747 1012 655 919 548 858 C438 795 351 700 276 582"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={25}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 34], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M824 1127 C747 1001 655 908 548 847 C438 784 351 689 276 571"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 36], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M282 572 L293 662 M282 572 L369 594"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={25}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [29, 42], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M272 562 L283 652 M272 562 L359 584"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [31, 44], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      {[0, 1, 2].map((index) => {
        const particleStart = 4 + index * 8;
        const particleEnd = 39 + index * 7;

        return (
          <div
            key={`reverse-flow-particle-${index}`}
            style={{
              position: "absolute",
              left: 786,
              top: 1095,
              width: 26,
              height: 26,
              border: `5px solid ${COLORS.ink}`,
              borderRadius: "50%",
              backgroundColor: COLORS.orange,
              translate: interpolate(
                frame,
                [particleStart, particleEnd],
                [
                  `${-index * 8}px ${index * 5}px`,
                  `${-470 - index * 23}px ${-505 - index * 18}px`,
                ],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              opacity: interpolate(
                frame,
                [
                  particleStart,
                  particleStart + 4,
                  particleEnd - 5,
                  particleEnd,
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
            }}
          />
        );
      })}
    </Interactive.Div>
  );
};

export const Scene02: React.FC = () => {
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
        name="Rise video entrance"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 20], ["0px 82px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
        }}
      >
        <Interactive.Div
          name="Dịch trọng tâm xuống nhân vật"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            translate: interpolate(
              frame,
              [103, SCENE_DURATION - 1],
              ["0px 0px", "0px -58px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <MediaAssembler
            kind="video"
            src={staticFile(
              "videos/an-le-64-phan-2/media/videos/vid-03-calendar-flip-illicit-money.mp4",
            )}
            durationInFrames={SCENE_DURATION}
            trimBefore={0.05 * 30}
            trimAfter={7.95 * 30}
            cameraMotion="zoom-in"
            objectPosition="50% 47%"
            contrast={1}
          />
        </Interactive.Div>

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.12) 0%, rgba(20,20,20,0) 26%, rgba(20,20,20,0.02) 58%, rgba(20,20,20,0.28) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <AbsoluteFill
        style={{
          zIndex: 6,
          opacity: 0.36,
          pointerEvents: "none",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 48%, transparent 0%, transparent 42%, rgba(0,0,0,0.35) 67%, black 100%)",
          maskImage:
            "radial-gradient(circle at 50% 48%, transparent 0%, transparent 42%, rgba(0,0,0,0.35) 67%, black 100%)",
        }}
      >
        <BackgroundTreatment variant="grid" />
      </AbsoluteFill>

      <Sequence
        name="Money demand icon"
        from={MONEY_ICON_START_FRAME}
        durationInFrames={MONEY_ICON_DURATION}
        layout="none"
      >
        <TimedLayer
          name="Money icon visibility"
          durationInFrames={MONEY_ICON_DURATION}
        >
          <MoneyDemandIcon />
        </TimedLayer>
      </Sequence>

      <Sequence
        name="Blocked money flow"
        from={BARRIER_START_FRAME}
        durationInFrames={BARRIER_DURATION}
        layout="none"
      >
        <TimedLayer
          name="Barrier visibility"
          durationInFrames={BARRIER_DURATION}
        >
          <BlockedMoneyFlow />
        </TimedLayer>
      </Sequence>

      <Sequence
        name="Southern location"
        from={SOUTH_POINT_START_FRAME}
        durationInFrames={SOUTH_POINT_DURATION}
        layout="none"
      >
        <TimedLayer
          name="Southern point visibility"
          durationInFrames={SOUTH_POINT_DURATION}
        >
          <SouthPoint />
        </TimedLayer>
      </Sequence>

      <Sequence
        name="Reverse route arrow"
        from={REVERSE_ARROW_START_FRAME}
        durationInFrames={REVERSE_ARROW_DURATION}
        layout="none"
      >
        <TimedLayer
          name="Reverse arrow visibility"
          durationInFrames={REVERSE_ARROW_DURATION}
        >
          <ReverseArrow />
        </TimedLayer>
      </Sequence>

      <Sequence
        name="Reverse route label"
        from={REVERSE_LABEL_START_FRAME}
        durationInFrames={REVERSE_LABEL_DURATION}
        layout="none"
      >
        <TimedLayer
          name="Reverse route label visibility"
          durationInFrames={REVERSE_LABEL_DURATION}
        >
          <LightOverlay
            name="Nhãn tuyến ngược chiều"
            text="TUYẾN NGƯỢC CHIỀU"
            variant="label"
            top={450}
            left={82}
            maxWidth={545}
          />
        </TimedLayer>
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