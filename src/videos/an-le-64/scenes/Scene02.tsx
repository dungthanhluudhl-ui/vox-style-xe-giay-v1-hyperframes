import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
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

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundCard,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <Interactive.Div
        name="Video bắt giữ"
        style={{
          position: "absolute",
          zIndex: 1,
          top: interpolate(frame, [138, 151], [190, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          right: interpolate(frame, [138, 151], [90, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          bottom: interpolate(frame, [138, 151], [220, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          left: interpolate(frame, [138, 151], [90, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          overflow: "hidden",
          borderRadius: interpolate(frame, [138, 151], [28, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          opacity: interpolate(
            frame,
            [0, 8, 81, 115, 141, 149],
            [0, 0.36, 0.42, 0.68, 0.86, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.spring({damping: 200}),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [0, 6, 14, 138, 145, 152],
            [0.9, 1.02, 1, 1, 0.965, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.spring({damping: 200}),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.spring({damping: 200}),
              ],
              output: "perceptual-scale",
            },
          ),
        }}
      >
        <MediaAssembler
          kind="video"
          src={staticFile(
            "videos/an-le-64/media/videos/vid-01-police-arresting-male-suspect.mp4",
          )}
          durationInFrames={163}
          trimBefore={1.29 * 30}
          trimAfter={6.71 * 30}
          cameraMotion="zoom-in"
          objectPosition="50% 50%"
          contrast={1.12}
        />

        <Interactive.Div
          name="Lớp che video"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: COLORS.backgroundCard,
            opacity: interpolate(
              frame,
              [0, 81, 115, 141, 151],
              [0.72, 0.72, 0.42, 0.14, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.linear,
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
          }}
        />

        <Interactive.Div
          name="Viền khung video"
          style={{
            position: "absolute",
            inset: 0,
            border: `5px solid ${COLORS.ink}`,
            borderRadius: 24,
            opacity: interpolate(frame, [138, 151], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
      </Interactive.Div>

      <BackgroundTreatment variant="card" />

      <Interactive.Div
        name="Quote · Có vẻ hợp lý"
        style={{
          position: "absolute",
          zIndex: 20,
          top: 370,
          left: 90,
          width: 900,
          height: 590,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "92px 54px 64px",
          border: `6px solid ${COLORS.ink}`,
          borderRadius: 18,
          backgroundColor: COLORS.backgroundCard,
          boxShadow: `18px 18px 0 ${COLORS.orange}`,
          opacity: interpolate(frame, [0, 5, 145, 157], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          }),
          scale: interpolate(
            frame,
            [0, 7, 14, 141, 158],
            [0.72, 1.06, 1, 1, 1.12],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.spring({damping: 200}),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [0, 12, 141, 158],
            ["0px 50px", "0px 0px", "0px 0px", "-140px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          rotate: interpolate(
            frame,
            [0, 14, 141, 158],
            ["-4deg", "-1deg", "-1deg", "-5deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.linear,
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 42,
            padding: "9px 16px",
            borderRadius: 5,
            backgroundColor: COLORS.ink,
            color: COLORS.onDarkText,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 27,
            lineHeight: 1.1,
            letterSpacing: 1.4,
          }}
        >
          LẬP LUẬN BAN ĐẦU
        </div>

        <div
          style={{
            position: "absolute",
            top: 90,
            left: 46,
            color: COLORS.orange,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 150,
            lineHeight: 0.8,
          }}
        >
          “
        </div>

        <div
          style={{
            position: "relative",
            color: COLORS.ink,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 86,
            lineHeight: 1.18,
            letterSpacing: -2.2,
            textAlign: "center",
          }}
        >
          CÓ VẺ
          <br />
          HỢP LÝ
        </div>

        <svg
          width="900"
          height="590"
          viewBox="0 0 900 590"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <path
            d="M-44 330 C170 278 412 356 944 286"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={20}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [141, 150], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}
            opacity={interpolate(
              frame,
              [140, 142, 156, 162],
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
            )}
          />
        </svg>
      </Interactive.Div>

      <Interactive.Div
        name="Punch phrase · Ranh giới hình sự"
        style={{
          position: "absolute",
          zIndex: 30,
          top: 1070,
          left: 70,
          right: 70,
          boxSizing: "border-box",
          padding: "25px 30px 29px",
          border: `6px solid ${COLORS.ink}`,
          borderRadius: 12,
          backgroundColor: COLORS.orange,
          boxShadow: `13px 13px 0 ${COLORS.ink}`,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 70,
          lineHeight: 1.08,
          letterSpacing: -1.5,
          textAlign: "center",
          opacity: interpolate(frame, [114, 117], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(
            frame,
            [114, 120, 128, 141, 145, 151],
            [0.6, 1.08, 1, 1, 1.04, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 200}),
                Easing.spring({damping: 200}),
                Easing.linear,
                Easing.spring({damping: 200}),
                Easing.spring({damping: 200}),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [114, 124],
            ["0px 46px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        RANH GIỚI HÌNH SỰ
      </Interactive.Div>
    </AbsoluteFill>
  );
};