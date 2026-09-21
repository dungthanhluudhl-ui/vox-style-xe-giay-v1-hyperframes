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

const SCENE_DURATION = 166;

const ONLINE_DURATION = 60;

const HANOI_START_FRAME = 38;
const HANOI_DURATION = 98;

const VINH_PHUC_START_FRAME = 83;
const VINH_PHUC_DURATION = 54;

const ROUTE_START_FRAME = 83;
const ROUTE_DURATION = 54;

const CHECK_START_FRAME = 122;
const CHECK_DURATION = 44;
const CHECK_LOCK_FRAME = 16;

type TimedVisibilityProps = {
  children: React.ReactNode;
  durationInFrames: number;
  name: string;
};

const TimedVisibility: React.FC<TimedVisibilityProps> = ({
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

const PhoneMockup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Khung điện thoại hội thoại"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 145,
        left: 125,
        width: 830,
        height: 1285,
        perspective: 1500,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        transform: `rotateY(${interpolate(frame, [0, 22], [-82, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}deg)`,
        transformOrigin: "50% 50%",
        backfaceVisibility: "hidden",
      }}
    >
      <Interactive.Div
        name="Chuyển động nền điện thoại"
        style={{
          position: "absolute",
          inset: 0,
          translate: `0px ${Math.sin(frame / 18) * 5}px`,
          rotate: `${Math.sin(frame / 24) * 0.35}deg`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `7px solid ${COLORS.ink}`,
            borderRadius: 62,
            backgroundColor: COLORS.backgroundCard,
            boxShadow: `18px 20px 0 ${COLORS.orange}`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 61,
            left: 40,
            right: 40,
            bottom: 61,
            overflow: "hidden",
            border: `5px solid ${COLORS.ink}`,
            borderRadius: 37,
            backgroundColor: COLORS.ink,
          }}
        >
          <Interactive.Div
            name="Video hội thoại phóng nhẹ"
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              scale: 1.08,
            }}
          >
            <MediaAssembler
              kind="video"
              src={staticFile(
                "videos/an-le-64-phan-2/media/videos/vid-05-online-romance-scam-zalo.mp4",
              )}
              durationInFrames={SCENE_DURATION}
              trimBefore={1.2 * 30}
              trimAfter={6.75 * 30}
              cameraMotion="none"
              objectPosition="50% 44%"
              contrast={1}
            />
          </Interactive.Div>

          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to bottom, rgba(20,20,20,0.18) 0%, rgba(20,20,20,0) 18%, rgba(20,20,20,0) 70%, rgba(20,20,20,0.18) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 178,
              overflow: "hidden",
              borderTop: `5px solid ${COLORS.orange}`,
              backgroundColor: "rgba(20,20,20,0.96)",
              pointerEvents: "none",
            }}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={`privacy-stripe-${index}`}
                style={{
                  position: "absolute",
                  top: -35,
                  left: 72 + index * 145,
                  width: 24,
                  height: 250,
                  rotate: "24deg",
                  backgroundColor:
                    index % 2 === 0
                      ? COLORS.orange
                      : "rgba(247,244,236,0.35)",
                  opacity: 0.72,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 4,
            top: 38,
            left: 307,
            width: 216,
            height: 47,
            border: `5px solid ${COLORS.ink}`,
            borderRadius: 24,
            backgroundColor: COLORS.ink,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 13,
              left: 57,
              width: 92,
              height: 8,
              borderRadius: 5,
              backgroundColor: "rgba(247,244,236,0.42)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 9,
              right: 22,
              width: 17,
              height: 17,
              borderRadius: "50%",
              backgroundColor: COLORS.orange,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 4,
            left: 362,
            bottom: 23,
            width: 106,
            height: 10,
            borderRadius: 6,
            backgroundColor: COLORS.ink,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 190,
            right: -21,
            width: 22,
            height: 126,
            border: `5px solid ${COLORS.ink}`,
            borderLeft: 0,
            borderRadius: "0 12px 12px 0",
            backgroundColor: COLORS.orange,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 352,
            right: -21,
            width: 22,
            height: 184,
            border: `5px solid ${COLORS.ink}`,
            borderLeft: 0,
            borderRadius: "0 12px 12px 0",
            backgroundColor: COLORS.orange,
          }}
        />
      </Interactive.Div>
    </Interactive.Div>
  );
};

const OnlineMessage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Trạng thái đang trực tuyến"
      style={{
        position: "absolute",
        zIndex: 42,
        top: 255,
        left: 240,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "15px 24px",
        border: `4px solid ${COLORS.orange}`,
        borderRadius: 28,
        backgroundColor: "rgba(20,20,20,0.94)",
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 31,
        lineHeight: 1,
        letterSpacing: 1.4,
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
        translate: interpolate(frame, [0, 11], ["0px 26px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      <div
        style={{
          width: 19,
          height: 19,
          border: `4px solid ${COLORS.onDarkText}`,
          borderRadius: "50%",
          backgroundColor: COLORS.orange,
          scale: interpolate(frame, [7, 15, 23], [0.65, 1.2, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          }),
        }}
      />
      <span>ĐANG TRỰC TUYẾN</span>
    </Interactive.Div>
  );
};

type LocationChipProps = {
  text: string;
  top: number;
  left: number;
  width: number;
  phase: number;
};

const LocationChip: React.FC<LocationChipProps> = ({
  text,
  top,
  left,
  width,
  phase,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={`Điểm hẹn ${text}`}
      style={{
        position: "absolute",
        zIndex: 45,
        top,
        left,
        width,
        boxSizing: "border-box",
        padding: "16px 22px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `10px 10px 0 ${COLORS.orange}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 39,
        lineHeight: 1,
        letterSpacing: 1.8,
        textAlign: "center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.65, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 12], ["0px 42px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        rotate: `${Math.sin((frame + phase) / 13) * 0.8}deg`,
      }}
    >
      <span
        style={{
          color: COLORS.orange,
          marginRight: 10,
        }}
      >
        ●
      </span>
      {text}
    </Interactive.Div>
  );
};

const AppointmentRoute: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường hẹn Hà Nội đến Vĩnh Phúc"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 43,
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
          d="M290 676 C405 724 458 818 548 870 C620 912 686 932 756 952"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 24], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M290 666 C405 714 458 808 548 860 C620 902 686 922 756 942"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 26], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M756 942 L699 900 M756 942 L688 960"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={20}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [20, 32], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M766 932 L709 890 M766 932 L698 950"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [22, 34], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      {[0, 1, 2].map((index) => {
        const particleStart = 7 + index * 7;
        const particleEnd = 35 + index * 5;

        return (
          <div
            key={`route-particle-${index}`}
            style={{
              position: "absolute",
              top: 656,
              left: 280,
              width: 24,
              height: 24,
              border: `4px solid ${COLORS.ink}`,
              borderRadius: "50%",
              backgroundColor: COLORS.orange,
              translate: interpolate(
                frame,
                [particleStart, particleEnd],
                [
                  `${index * -7}px ${index * 3}px`,
                  `${465 + index * 12}px ${270 + index * 7}px`,
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
                  particleEnd - 4,
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

const ConfirmationCheck: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dấu xác nhận khóa bẫy"
      style={{
        position: "absolute",
        zIndex: 52,
        top: 1070,
        left: 445,
        width: 190,
        height: 190,
        borderRadius: "50%",
        backgroundColor: "rgba(20,20,20,0.94)",
        boxShadow: `12px 12px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [0, 8, CHECK_LOCK_FRAME, 25, CHECK_DURATION - 1],
          [0.4, 1, 1.18, 1, 1.03],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(
          frame,
          [0, CHECK_LOCK_FRAME, 25, CHECK_DURATION - 1],
          ["-14deg", "4deg", "-1deg", "1deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        pointerEvents: "none",
      }}
    >
      <svg
        width="190"
        height="190"
        viewBox="0 0 190 190"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx={95}
          cy={95}
          r={76}
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={12}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 13], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M55 96 L83 124 L139 65"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={17}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [5, CHECK_LOCK_FRAME],
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
          inset: -28,
          border: `5px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [CHECK_LOCK_FRAME - 1, CHECK_LOCK_FRAME + 7, 31],
            [0, 0.9, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [CHECK_LOCK_FRAME - 1, 31],
            [0.72, 1.45],
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

export const Scene04: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
      }}
    >
      <BackgroundTreatment variant="grid" />

      <div
        style={{
          position: "absolute",
          zIndex: 4,
          top: 115,
          left: 52,
          width: 245,
          height: 20,
          backgroundColor: COLORS.orange,
          rotate: "-3deg",
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 4,
          top: 1365,
          right: 35,
          width: 270,
          height: 20,
          backgroundColor: COLORS.ink,
          rotate: "4deg",
        }}
      />

      <PhoneMockup />

      <Sequence
        name="Online status"
        durationInFrames={ONLINE_DURATION}
        layout="none"
      >
        <TimedVisibility
          name="Online status visibility"
          durationInFrames={ONLINE_DURATION}
        >
          <OnlineMessage />
        </TimedVisibility>
      </Sequence>

      <Sequence
        name="Hanoi appointment point"
        from={HANOI_START_FRAME}
        durationInFrames={HANOI_DURATION}
        layout="none"
      >
        <TimedVisibility
          name="Hanoi chip visibility"
          durationInFrames={HANOI_DURATION}
        >
          <LocationChip
            text="HÀ NỘI"
            top={585}
            left={62}
            width={300}
            phase={0}
          />
        </TimedVisibility>
      </Sequence>

      <Sequence
        name="Vinh Phuc destination"
        from={VINH_PHUC_START_FRAME}
        durationInFrames={VINH_PHUC_DURATION}
        layout="none"
      >
        <TimedVisibility
          name="Vinh Phuc chip visibility"
          durationInFrames={VINH_PHUC_DURATION}
        >
          <LocationChip
            text="VĨNH PHÚC"
            top={900}
            left={650}
            width={365}
            phase={11}
          />
        </TimedVisibility>
      </Sequence>

      <Sequence
        name="Appointment route"
        from={ROUTE_START_FRAME}
        durationInFrames={ROUTE_DURATION}
        layout="none"
      >
        <TimedVisibility
          name="Appointment route visibility"
          durationInFrames={ROUTE_DURATION}
        >
          <AppointmentRoute />
        </TimedVisibility>
      </Sequence>

      <Sequence
        name="Confirmation check"
        from={CHECK_START_FRAME}
        durationInFrames={CHECK_DURATION}
        layout="none"
      >
        <ConfirmationCheck />
      </Sequence>
    </AbsoluteFill>
  );
};