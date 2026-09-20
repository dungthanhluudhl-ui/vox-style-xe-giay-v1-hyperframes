import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const QuestionIcon: React.FC<{frame: number}> = ({frame}) => {
  return (
    <Interactive.Div
      name="Question icon"
      style={{
        position: "absolute",
        top: 354,
        right: 112,
        zIndex: 8,
        width: 104,
        height: 104,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        backgroundColor: COLORS.ink,
        border: `4px solid ${COLORS.orange}`,
        boxShadow: `7px 7px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [118, 122], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [118, 132], [0.72, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        rotate: interpolate(
          frame,
          [118, 132, 170, 211],
          ["-12deg", "2deg", "-2deg", "1deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <svg
        width="65"
        height="65"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 22 C19 11 29 7 38 10 C48 13 51 24 46 32 C42 38 34 39 33 47"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [119, 136], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M33 55 L33 56"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [133, 140], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

const DocumentLines: React.FC<{dark?: boolean}> = ({dark = false}) => {
  const color = dark ? "rgba(247,244,236,0.22)" : "rgba(20,20,20,0.2)";

  return (
    <div
      style={{
        position: "absolute",
        left: 68,
        right: 68,
        bottom: 62,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {[100, 92, 96, 73].map((width, index) => (
        <div
          key={`${width}-${index}`}
          style={{
            width: `${width}%`,
            height: 5,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export const Scene02: React.FC = () => {
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
      <BackgroundTreatment variant="card" />

      <Interactive.Div
        name="Document stack"
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 22], ["0px 62px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
        }}
      >
        <Interactive.Div
          name="Lê Thái Viện document"
          style={{
            position: "absolute",
            top: 304,
            left: 112,
            width: 864,
            height: 810,
            overflow: "hidden",
            border: `5px solid ${COLORS.ink}`,
            borderRadius: 4,
            backgroundColor: COLORS.backgroundCard,
            color: COLORS.ink,
            boxShadow: `15px 15px 0 ${COLORS.orange}`,
            rotate: interpolate(
              frame,
              [0, 70, 140, 211],
              ["1.7deg", "0.7deg", "1.2deg", "0.4deg"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.18,
              backgroundImage:
                "radial-gradient(circle at 22% 34%, rgba(20,20,20,0.42) 0 1px, transparent 1.5px), repeating-linear-gradient(-3deg, transparent 0 14px, rgba(20,20,20,0.08) 15px)",
              backgroundSize: "21px 21px, 100% 16px",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 52,
              left: 62,
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 25,
              fontWeight: FONT.weights.black,
              letterSpacing: 3.5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 13px",
                color: COLORS.ink,
                backgroundColor: COLORS.orange,
              }}
            >
              02
            </span>
            <span>CÁCH ĐỌC KHÁC</span>
          </div>

          <div
            style={{
              position: "absolute",
              top: 174,
              left: 66,
              color: COLORS.orange,
              fontSize: 122,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
            }}
          >
            “
          </div>

          <Interactive.Div
            name="Lê Thái Viện title"
            style={{
              position: "absolute",
              top: 276,
              left: 82,
              right: 82,
              zIndex: 2,
              fontSize: 76,
              fontWeight: FONT.weights.black,
              lineHeight: FONT.headline.lineHeight,
              letterSpacing: -2,
              opacity: interpolate(frame, [162, 163], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [163, 174], [0.84, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
                output: "perceptual-scale",
              }),
              translate: interpolate(
                frame,
                [163, 174],
                ["0px 24px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            LÊ THÁI VIỆN
          </Interactive.Div>

          <div
            style={{
              position: "absolute",
              top: 397,
              left: 82,
              height: 13,
              width: interpolate(frame, [163, 181], [0, 610], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              backgroundColor: COLORS.orange,
              rotate: "-1deg",
            }}
          />

          <DocumentLines />
        </Interactive.Div>

        <Interactive.Div
          name="Dị Thái Viện document"
          style={{
            position: "absolute",
            top: 278,
            left: 88,
            zIndex: 4,
            width: 884,
            height: 822,
            overflow: "hidden",
            border: `5px solid ${COLORS.ink}`,
            borderRadius: 4,
            backgroundColor: COLORS.backgroundCard,
            boxShadow: `15px 15px 0 ${COLORS.orange}`,
            backfaceVisibility: "hidden",
            transformOrigin: "left center",
            transform: `perspective(1600px) rotateY(${interpolate(
              frame,
              [0, 23, 122, 163],
              [-88, 0, 0, -104],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.linear,
                  Easing.bezier(0.7, 0, 0.3, 1),
                ],
              },
            )}deg)`,
            rotate: interpolate(
              frame,
              [0, 54, 108, 160],
              ["-2.2deg", "-0.8deg", "-1.5deg", "-0.4deg"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.18,
              backgroundImage:
                "radial-gradient(circle at 22% 34%, rgba(20,20,20,0.42) 0 1px, transparent 1.5px), repeating-linear-gradient(-3deg, transparent 0 14px, rgba(20,20,20,0.08) 15px)",
              backgroundSize: "21px 21px, 100% 16px",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 52,
              left: 62,
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 25,
              fontWeight: FONT.weights.black,
              letterSpacing: 3.5,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 13px",
                color: COLORS.onDarkText,
                backgroundColor: COLORS.ink,
              }}
            >
              01
            </span>
            <span>BẢN GHI ĐỊA DANH</span>
          </div>

          <div
            style={{
              position: "absolute",
              top: 174,
              left: 66,
              color: COLORS.orange,
              fontSize: 122,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
            }}
          >
            “
          </div>

          <Interactive.Div
            name="Dị Thái Viện title"
            style={{
              position: "absolute",
              top: 276,
              left: 82,
              right: 82,
              zIndex: 2,
              fontSize: 76,
              fontWeight: FONT.weights.black,
              lineHeight: FONT.headline.lineHeight,
              letterSpacing: -2,
              opacity: interpolate(frame, [55, 56], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [56, 68], [0.84, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
                output: "perceptual-scale",
              }),
              translate: interpolate(
                frame,
                [56, 68],
                ["0px 24px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            DỊ THÁI VIỆN
          </Interactive.Div>

          <div
            style={{
              position: "absolute",
              top: 397,
              left: 82,
              height: 13,
              width: interpolate(frame, [56, 75], [0, 620], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              backgroundColor: COLORS.orange,
              rotate: "-1deg",
            }}
          />

          <DocumentLines />
        </Interactive.Div>

        <QuestionIcon frame={frame} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};