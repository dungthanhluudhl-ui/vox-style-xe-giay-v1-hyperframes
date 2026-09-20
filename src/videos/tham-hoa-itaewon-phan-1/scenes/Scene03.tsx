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

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
      }}
    >
      <Interactive.Div
        name="Rescue image — rise entrance"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 20],
            ["0px 96px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        <Interactive.Div
          name="Slow zoom toward rescuers"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            scale: interpolate(frame, [0, 167], [1, 1.07], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            }),
          }}
        >
          <CanvasImage
            src={staticFile(
              "videos/tham-hoa-itaewon-phan-1/media/images/img-04-itaewon-crowd-crush-rescue.jpeg",
            )}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 48%",
              filter: "contrast(1.08) brightness(0.91)",
            }}
          />

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              zIndex: 2,
              left: 275,
              top: 1370,
              width: 530,
              height: 250,
              borderRadius: 34,
              background:
                "linear-gradient(142deg, rgba(17,17,18,0.98) 0%, rgba(25,23,23,0.98) 52%, rgba(13,14,15,0.97) 100%)",
              boxShadow:
                "0 0 18px 10px rgba(16,16,17,0.54), inset 0 0 22px rgba(255,255,255,0.025)",
            }}
          />
        </Interactive.Div>
      </Interactive.Div>

      <BackgroundTreatment variant="spotlight" />

      <AbsoluteFill
        style={{
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <Interactive.Div
          name="Blocked pulling force"
          style={{
            position: "absolute",
            left: 155,
            top: 885,
            width: 630,
            height: 140,
            opacity: interpolate(frame, [98, 104, 164, 167], [0, 1, 1, 0], {
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
              [138, 142, 151],
              ["0px 0px", "-12px 0px", "-72px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.7, 0, 0.84, 0),
                  Easing.spring({damping: 160}),
                ],
              },
            ),
          }}
        >
          <svg
            width="630"
            height="140"
            viewBox="0 0 630 140"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M34 70 H552 M512 34 L552 70 L512 106"
              pathLength={1}
              stroke="rgba(20,20,20,0.78)"
              strokeWidth={20}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [98, 129], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />
            <path
              d="M34 70 H552 M512 34 L552 70 L512 106"
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [98, 129], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />
          </svg>
        </Interactive.Div>

        <Interactive.Div
          name="Force blocker"
          style={{
            position: "absolute",
            left: 742,
            top: 848,
            width: 44,
            height: 220,
            opacity: interpolate(frame, [119, 125, 164, 167], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            }),
            scale: interpolate(frame, [119, 128], [0.58, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
              output: "perceptual-scale",
            }),
            rotate: interpolate(
              frame,
              [138, 141, 144, 148],
              ["0deg", "-5deg", "4deg", "0deg"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.7, 0, 0.84, 0),
                  Easing.linear,
                  Easing.spring({damping: 170}),
                ],
              },
            ),
            transformOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 4,
              top: 0,
              width: 18,
              height: "100%",
              borderRadius: 4,
              backgroundColor: COLORS.ink,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 3,
              top: 0,
              width: 13,
              height: "100%",
              borderRadius: 4,
              backgroundColor: COLORS.orange,
            }}
          />
        </Interactive.Div>

        <Interactive.Div
          name="Locked force label"
          style={{
            position: "absolute",
            top: 690,
            right: 58,
            maxWidth: 455,
            padding: "14px 19px",
            border: `3px solid ${COLORS.orange}`,
            borderRadius: 8,
            backgroundColor: "rgba(20,20,20,0.9)",
            color: COLORS.onDarkText,
            boxShadow: `7px 7px 0 ${COLORS.orange}`,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 35,
            lineHeight: 1.12,
            letterSpacing: 0.7,
            textAlign: "center",
            opacity: interpolate(frame, [119, 126, 164, 167], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            }),
            scale: interpolate(frame, [119, 129], [0.78, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
              output: "perceptual-scale",
            }),
            translate: interpolate(
              frame,
              [119, 129],
              ["0px 22px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 180}),
              },
            ),
          }}
        >
          LỰC KÉO BỊ KHÓA
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};