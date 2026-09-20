import {
  AbsoluteFill,
  CanvasImage,
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

const SCENE_DURATION = 181;
const PUNCH_START_FRAME = 23;
const PUNCH_DURATION = 72;
const ANNOTATION_START_FRAME = 93;
const ANNOTATION_DURATION = 88;
const PERSON_ICON_START_FRAME = 136;
const PERSON_ICON_DURATION = 45;

const IMAGE_SRC = staticFile(
  "videos/an-le-64-phan-2/media/images/img-07-online-romance-scam-victim.png",
);

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
          [0, 6, durationInFrames - 8, durationInFrames - 1],
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
      name="Danh tính bị mượn"
      style={{
        position: "absolute",
        zIndex: 24,
        top: 205,
        left: 70,
        width: 940,
        boxSizing: "border-box",
        padding: "19px 28px 22px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 8,
        backgroundColor: COLORS.orange,
        boxShadow: `12px 12px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 62,
        lineHeight: 1.16,
        letterSpacing: -1.5,
        textAlign: "center",
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.76, 1], {
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
        rotate: interpolate(frame, [0, 12], ["-2.5deg", "-0.5deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      DANH TÍNH BỊ MƯỢN
    </Interactive.Div>
  );
};

const DetachedProfile: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Hồ sơ cô L tách khỏi điện thoại"
      style={{
        position: "absolute",
        zIndex: 28,
        top: 470,
        left: 710,
        width: 260,
        height: 370,
        overflow: "hidden",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 14,
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `11px 11px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 42, 65, ANNOTATION_DURATION - 1],
          [
            "0px 0px",
            "-430px 210px",
            "-424px 202px",
            "-430px 206px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 42, 65, ANNOTATION_DURATION - 1],
          ["3deg", "-5deg", "-3.5deg", "-5deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        scale: interpolate(frame, [0, 16], [0.82, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
      }}
    >
      <CanvasImage
        src={IMAGE_SRC}
        cropLeft={0.5}
        cropRight={0.02}
        cropTop={0.08}
        cropBottom={0.55}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 28%",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `4px solid ${COLORS.orange}`,
          borderRadius: "50%",
          backgroundColor: "rgba(20,20,20,0.9)",
          color: COLORS.onDarkText,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 34,
          lineHeight: 1,
        }}
      >
        L
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 14px",
          backgroundColor: "rgba(20,20,20,0.9)",
          color: COLORS.onDarkText,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 25,
          lineHeight: 1.1,
          letterSpacing: 1.3,
          textAlign: "center",
        }}
      >
        HỒ SƠ
      </div>
    </Interactive.Div>
  );
};

const ProfileTransferAnnotation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường hồ sơ trượt về phía N"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 26,
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
        <circle
          cx={828}
          cy={648}
          r={92}
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={14}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 17], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <circle
          cx={828}
          cy={638}
          r={92}
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 19], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M795 692 C690 720 588 756 500 806 C426 848 360 879 298 895"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 39], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M795 682 C690 710 588 746 500 796 C426 838 360 869 298 885"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [7, 41], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M298 885 L355 836 M298 885 L372 900"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [35, 47], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M288 875 L345 826 M288 875 L362 890"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [37, 49], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>

      <DetachedProfile />

      <LightOverlay
        name="Nhãn hồ sơ tách rời"
        text="HỒ SƠ TÁCH RỜI"
        variant="label"
        top={1090}
        left={555}
        maxWidth={450}
      />
    </Interactive.Div>
  );
};

const FakeFriendRequestIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Biểu tượng lời mời kết bạn giả"
      style={{
        position: "absolute",
        zIndex: 34,
        top: 1020,
        left: 155,
        width: 150,
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: "50%",
        backgroundColor: "rgba(20,20,20,0.92)",
        boxShadow: `10px 10px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 13], [0.58, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 13, 29, PERSON_ICON_DURATION - 1],
          ["0px -48px", "0px 0px", "0px -5px", "0px 0px"],
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
          [0, 13, 29, PERSON_ICON_DURATION - 1],
          ["-10deg", "2deg", "-2deg", "1deg"],
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
        width="104"
        height="104"
        viewBox="0 0 104 104"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M43 17 C31 17 24 25 24 36 C24 48 32 56 43 56 C54 56 62 48 62 36 C62 25 55 17 43 17 Z"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [1, 16], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M13 88 C15 69 26 60 43 60 C60 60 71 69 73 88"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [8, 24], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M80 34 V66 M64 50 H96"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [18, 32], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

export const Scene03: React.FC = () => {
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
        name="Peel photo entrance"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          clipPath: `polygon(0 0, ${interpolate(
            frame,
            [0, 24],
            [0, 112],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}% 0, ${interpolate(frame, [0, 24], [-12, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}% 100%, 0 100%)`,
        }}
      >
        <Interactive.Div
          name="Parallax người đàn ông"
          style={{
            position: "absolute",
            top: 0,
            left: -70,
            width: 1190,
            height: 1480,
            overflow: "hidden",
            translate: interpolate(
              frame,
              [0, SCENE_DURATION - 1],
              ["-12px -4px", "12px -24px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            scale: interpolate(
              frame,
              [0, SCENE_DURATION - 1],
              [1.02, 1.055],
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
            src={IMAGE_SRC}
            durationInFrames={SCENE_DURATION}
            cameraMotion="none"
            objectPosition="48% 28%"
            contrast={1}
          />
        </Interactive.Div>

        <Interactive.Div
          name="Parallax điện thoại"
          style={{
            position: "absolute",
            top: 0,
            left: -70,
            width: 1190,
            height: 1480,
            overflow: "hidden",
            WebkitMaskImage:
              "radial-gradient(ellipse 34% 47% at 76% 47%, black 0%, black 55%, rgba(0,0,0,0.55) 73%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 34% 47% at 76% 47%, black 0%, black 55%, rgba(0,0,0,0.55) 73%, transparent 100%)",
            translate: interpolate(
              frame,
              [0, SCENE_DURATION - 1],
              ["10px -8px", "-16px 10px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            scale: interpolate(
              frame,
              [0, SCENE_DURATION - 1],
              [1.035, 1.07],
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
            src={IMAGE_SRC}
            durationInFrames={SCENE_DURATION}
            cameraMotion="none"
            objectPosition="48% 28%"
            contrast={1}
          />
        </Interactive.Div>

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.12) 0%, rgba(20,20,20,0) 24%, rgba(20,20,20,0.03) 66%, rgba(245,240,228,0.72) 75%, #F5F0E4 82%, #F5F0E4 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Peel fold edge"
        style={{
          position: "absolute",
          zIndex: 18,
          top: -80,
          left: interpolate(frame, [0, 24], [-56, 1110], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          width: 82,
          height: 2080,
          rotate: "4deg",
          backgroundColor: COLORS.backgroundCard,
          borderLeft: `7px solid ${COLORS.orange}`,
          boxShadow: `-14px 0 0 rgba(20,20,20,0.32)`,
          opacity: interpolate(frame, [0, 18, 25], [1, 0.92, 0], {
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

      <BackgroundTreatment variant="card" />

      <Sequence
        name="Punch phrase"
        from={PUNCH_START_FRAME}
        durationInFrames={PUNCH_DURATION}
        layout="none"
      >
        <TimedVisibility
          name="Punch phrase visibility"
          durationInFrames={PUNCH_DURATION}
        >
          <PunchPhrase />
        </TimedVisibility>
      </Sequence>

      <Sequence
        name="Detached profile annotation"
        from={ANNOTATION_START_FRAME}
        durationInFrames={ANNOTATION_DURATION}
        layout="none"
      >
        <ProfileTransferAnnotation />
      </Sequence>

      <Sequence
        name="Fake friend request icon"
        from={PERSON_ICON_START_FRAME}
        durationInFrames={PERSON_ICON_DURATION}
        layout="none"
      >
        <FakeFriendRequestIcon />
      </Sequence>
    </AbsoluteFill>
  );
};