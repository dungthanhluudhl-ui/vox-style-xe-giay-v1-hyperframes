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

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        fontFamily,
      }}
    >
      <CanvasImage
        src={staticFile(
          "videos/tham-hoa-itaewon-phan-1/media/images/img-01-itaewon-crowd-crush-alley.jpeg",
        )}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 50%",
          filter: "contrast(1.08)",
          scale: interpolate(frame, [0, 176], [1, 1.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.28) 34%, rgba(10,10,10,0.1) 58%, rgba(10,10,10,0.58) 100%)",
        }}
      />

      <BackgroundTreatment variant="spotlight" />

      <Interactive.Div
        name="Location label"
        style={{
          position: "absolute",
          zIndex: 10,
          top: 184,
          left: 70,
          padding: "10px 17px",
          borderLeft: `8px solid ${COLORS.orange}`,
          backgroundColor: "rgba(20,20,20,0.88)",
          color: COLORS.onDarkText,
          fontFamily,
          fontSize: 28,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 2.4,
          opacity: interpolate(frame, [24, 31], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [24, 34],
            ["-42px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        SEOUL · ITAEWON
      </Interactive.Div>

      <Interactive.Div
        name="Timeline guide"
        style={{
          position: "absolute",
          zIndex: 10,
          top: 515,
          left: 132,
          width: interpolate(frame, [43, 60], [0, 816], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.orange,
          boxShadow: "0 4px 0 rgba(20,20,20,0.72)",
        }}
      />

      <Interactive.Div
        name="Date lock"
        style={{
          position: "absolute",
          zIndex: 12,
          inset: 0,
          rotate: interpolate(
            frame,
            [0, 123, 126, 129, 132, 154, 176],
            [
              "0deg",
              "0deg",
              "-1.3deg",
              "0.8deg",
              "0deg",
              "-0.18deg",
              "0.16deg",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.linear,
                Easing.linear,
                Easing.linear,
                Easing.spring({damping: 200}),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          translate: interpolate(
            frame,
            [0, 123, 126, 129, 132, 176],
            [
              "0px 0px",
              "0px 0px",
              "-7px 3px",
              "6px -2px",
              "0px 0px",
              "0px -2px",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.linear,
                Easing.linear,
                Easing.linear,
                Easing.spring({damping: 200}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        <Interactive.Div
          name="Day chip"
          style={{
            position: "absolute",
            top: 288,
            left: 84,
            width: 252,
            height: 192,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            clipPath: "polygon(3% 0, 100% 3%, 96% 100%, 0 96%)",
            border: `4px solid ${COLORS.orange}`,
            backgroundColor: COLORS.backgroundCard,
            boxShadow: `12px 12px 0 ${COLORS.ink}`,
            color: COLORS.ink,
            opacity: interpolate(frame, [62, 66], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [62, 76],
              ["-440px 0px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              },
            ),
            rotate: interpolate(frame, [62, 76], ["-7deg", "-1deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            }),
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: FONT.weights.black,
              lineHeight: 0.9,
              letterSpacing: -5,
            }}
          >
            29
          </div>
          <div
            style={{
              marginTop: 15,
              color: COLORS.orange,
              fontSize: 23,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
              letterSpacing: 4,
            }}
          >
            NGÀY
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Month chip"
          style={{
            position: "absolute",
            top: 288,
            left: 348,
            width: 252,
            height: 192,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            clipPath: "polygon(0 4%, 96% 0, 100% 96%, 4% 100%)",
            backgroundColor: COLORS.orange,
            boxShadow: `12px 12px 0 ${COLORS.ink}`,
            color: COLORS.ink,
            opacity: interpolate(frame, [93, 97], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [93, 105],
              ["0px -310px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 170}),
              },
            ),
            rotate: interpolate(frame, [93, 105], ["6deg", "1deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 170}),
            }),
          }}
        >
          <div
            style={{
              fontSize: 82,
              fontWeight: FONT.weights.black,
              lineHeight: 0.9,
              letterSpacing: -4,
            }}
          >
            / 10
          </div>
          <div
            style={{
              marginTop: 19,
              fontSize: 23,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
              letterSpacing: 4,
            }}
          >
            THÁNG
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Year punch phrase"
          style={{
            position: "absolute",
            top: 288,
            left: 612,
            width: 384,
            height: 192,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            clipPath: "polygon(2% 0, 100% 4%, 97% 100%, 0 96%)",
            border: `4px solid ${COLORS.orange}`,
            backgroundColor: COLORS.backgroundCard,
            boxShadow: `14px 14px 0 ${COLORS.orange}`,
            color: COLORS.ink,
            transformOrigin: "50% 0%",
            opacity: interpolate(frame, [124, 128], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [124, 129],
              ["0px -180px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 190}),
              },
            ),
            rotate: interpolate(frame, [124, 129], ["-9deg", "0deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            }),
            scale: interpolate(frame, [124, 129], [1.14, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
              output: "perceptual-scale",
            }),
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -11,
              left: 102,
              width: 180,
              height: 23,
              rotate: "-2deg",
              backgroundColor: COLORS.orange,
            }}
          />
          <div
            style={{
              fontSize: 76,
              fontWeight: FONT.weights.black,
              lineHeight: 0.92,
              letterSpacing: -4,
            }}
          >
            / 2022
          </div>
          <div
            style={{
              marginTop: 19,
              color: COLORS.orange,
              fontSize: 23,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
              letterSpacing: 4,
            }}
          >
            NĂM
          </div>
        </Interactive.Div>

        {[210, 474, 804].map((left, index) => {
          const revealFrame = [62, 93, 124][index];

          return (
            <div
              key={left}
              style={{
                position: "absolute",
                top: 498,
                left,
                width: 34,
                height: 34,
                border: `7px solid ${COLORS.orange}`,
                borderRadius: "50%",
                backgroundColor: COLORS.ink,
                opacity: interpolate(
                  frame,
                  [revealFrame, revealFrame + 4],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
                scale: interpolate(
                  frame,
                  [revealFrame, revealFrame + 7],
                  [0.35, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.spring({damping: 180}),
                    output: "perceptual-scale",
                  },
                ),
              }}
            />
          );
        })}
      </Interactive.Div>

      <Interactive.Div
        name="Peel entrance"
        style={{
          position: "absolute",
          zIndex: 40,
          inset: -80,
          pointerEvents: "none",
          overflow: "hidden",
          transformOrigin: "100% 0%",
          clipPath: "polygon(0 0, 100% 0, 100% 92%, 94% 100%, 0 100%)",
          backgroundColor: COLORS.backgroundCard,
          backgroundImage: `linear-gradient(${COLORS.gridLine} 1.5px, transparent 1.5px), linear-gradient(90deg, ${COLORS.gridLine} 1.5px, transparent 1.5px)`,
          backgroundSize: "84px 84px",
          boxShadow: `26px 0 0 ${COLORS.orange}`,
          translate: interpolate(
            frame,
            [0, 24],
            ["0px 0px", "-1320px -180px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          ),
          rotate: interpolate(frame, [0, 24], ["0deg", "-13deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.76, 0, 0.24, 1),
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 68,
            bottom: 68,
            width: 190,
            height: 190,
            background:
              "linear-gradient(135deg, rgba(20,20,20,0.2), rgba(255,106,26,0.76))",
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          }}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};