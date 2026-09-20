import {Video} from "@remotion/media";
import {
  AbsoluteFill,
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

type DocumentCopyProps = {
  delay: number;
  targetLeft: number;
  targetTop: number;
  targetRotate: number;
  targetScale: number;
  pageNumber: string;
};

const DocumentCopy: React.FC<DocumentCopyProps> = ({
  delay,
  targetLeft,
  targetTop,
  targetRotate,
  targetScale,
  pageNumber,
}) => {
  const frame = useCurrentFrame();
  const entranceFrame = 149 + delay;
  const settledFrame = entranceFrame + 18;

  return (
    <Interactive.Div
      name={`Bản sao hồ sơ ${pageNumber}`}
      style={{
        position: "absolute",
        zIndex: 2,
        left: interpolate(
          frame,
          [entranceFrame, settledFrame],
          [345, targetLeft],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        top: interpolate(
          frame,
          [entranceFrame, settledFrame],
          [600, targetTop],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        width: 390,
        height: 540,
        boxSizing: "border-box",
        padding: "36px 31px",
        overflow: "hidden",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: 7,
        backgroundColor: COLORS.backgroundCard,
        backgroundImage:
          "linear-gradient(132deg, rgba(20,20,20,0.055), transparent 32%, rgba(255,255,255,0.25) 66%, rgba(20,20,20,0.035))",
        boxShadow: `9px 9px 0 ${COLORS.orange}`,
        opacity: interpolate(
          frame,
          [entranceFrame, entranceFrame + 5],
          [0, 0.92],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [entranceFrame, settledFrame],
          [0.42, targetScale],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(
          frame,
          [entranceFrame, settledFrame],
          ["0deg", `${targetRotate}deg`],
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
          width: 150,
          height: 15,
          marginBottom: 28,
          backgroundColor: COLORS.orange,
        }}
      />

      {Array.from({length: 6}).map((_, index) => (
        <div
          key={`copy-${pageNumber}-line-${index}`}
          style={{
            width: index === 5 ? "54%" : index % 2 === 0 ? "100%" : "82%",
            height: index === 0 ? 12 : 8,
            marginBottom: 22,
            backgroundColor:
              index === 0
                ? COLORS.ink
                : "rgba(20,20,20,0.34)",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          right: 26,
          bottom: 22,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 28,
          lineHeight: 1,
        }}
      >
        {pageNumber}
      </div>
    </Interactive.Div>
  );
};

const DocumentCopies: React.FC = () => {
  return (
    <>
      <DocumentCopy
        delay={0}
        targetLeft={-205}
        targetTop={275}
        targetRotate={-12}
        targetScale={0.78}
        pageNumber="01"
      />
      <DocumentCopy
        delay={2}
        targetLeft={895}
        targetTop={245}
        targetRotate={11}
        targetScale={0.73}
        pageNumber="02"
      />
      <DocumentCopy
        delay={4}
        targetLeft={-175}
        targetTop={1040}
        targetRotate={8}
        targetScale={0.7}
        pageNumber="03"
      />
      <DocumentCopy
        delay={6}
        targetLeft={850}
        targetTop={1055}
        targetRotate={-9}
        targetScale={0.74}
        pageNumber="04"
      />
      <DocumentCopy
        delay={8}
        targetLeft={338}
        targetTop={-295}
        targetRotate={-4}
        targetScale={0.68}
        pageNumber="05"
      />
      <DocumentCopy
        delay={10}
        targetLeft={350}
        targetTop={1380}
        targetRotate={5}
        targetScale={0.66}
        pageNumber="06"
      />
    </>
  );
};

const MainDocument: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Hồ sơ pháp lý"
      style={{
        position: "absolute",
        zIndex: 4,
        top: 210,
        left: 70,
        width: 940,
        height: 1160,
        boxSizing: "border-box",
        overflow: "hidden",
        border: `6px solid ${COLORS.ink}`,
        borderRadius: 10,
        backgroundColor: COLORS.backgroundCard,
        backgroundImage:
          "linear-gradient(118deg, rgba(20,20,20,0.055), transparent 26%, rgba(255,255,255,0.34) 58%, rgba(20,20,20,0.04))",
        boxShadow: `17px 17px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [34, 44], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [34, 48, 132, 136, 142],
          [0.92, 1, 1, 0.982, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          },
        ),
        rotate: interpolate(
          frame,
          [34, 48, 132, 136, 142],
          ["3deg", "-0.7deg", "-0.7deg", "-1.5deg", "-0.7deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 46,
          left: 48,
          width: 190,
          height: 17,
          backgroundColor: COLORS.orange,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 88,
          left: 48,
          right: 48,
          height: 5,
          backgroundColor: COLORS.ink,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 50,
          bottom: 58,
          width: 240,
          height: 9,
          backgroundColor: "rgba(20,20,20,0.32)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 50,
          bottom: 88,
          width: 360,
          height: 9,
          backgroundColor: "rgba(20,20,20,0.32)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 48,
          bottom: 48,
          width: 72,
          height: 72,
          border: `4px solid ${COLORS.orange}`,
          borderRadius: "50%",
        }}
      />
    </Interactive.Div>
  );
};

const CourtroomVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const shadowOffset = interpolate(frame, [38, 58], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const shadowOpacity = interpolate(frame, [38, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Interactive.Div
      name="Video phiên tòa chuyển thành hồ sơ"
      style={{
        position: "absolute",
        zIndex: 8,
        top: interpolate(frame, [38, 58], [0, 420], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        right: interpolate(frame, [38, 58], [0, 120], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        bottom: interpolate(frame, [38, 58], [0, 710], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        left: interpolate(frame, [38, 58], [0, 120], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        overflow: "hidden",
        borderStyle: "solid",
        borderColor: COLORS.ink,
        borderWidth: interpolate(frame, [38, 58], [0, 5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        borderRadius: interpolate(frame, [38, 58], [0, 7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        boxShadow: `${shadowOffset}px ${shadowOffset}px 0 rgba(255,106,26,${shadowOpacity})`,
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        transformOrigin: "50% 50%",
        transform: `perspective(1600px) rotateY(${interpolate(
          frame,
          [0, 16],
          [-88, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        )}deg)`,
      }}
    >
      <Interactive.Div
        name="Zoom-out trong cảnh phiên tòa"
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, 205], [1.08, 1.01], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <Video
          src={staticFile(
            "videos/an-le-64/media/videos/vid-03-shocked-defendant-courtroom-verdict.mp4",
          )}
          muted
          durationInFrames={206}
          trimBefore={0.58 * 30}
          trimAfter={7.42 * 30}
          objectFit="cover"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            filter: "contrast(1.1)",
          }}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to bottom, rgba(20,20,20,0.04), transparent 45%, rgba(20,20,20,0.24))",
          pointerEvents: "none",
        }}
      />
    </Interactive.Div>
  );
};

const DocumentLabel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Nhãn hồ sơ xét xử"
      style={{
        position: "absolute",
        zIndex: 10,
        top: 260,
        left: 120,
        padding: "14px 22px 16px",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: 6,
        backgroundColor: COLORS.ink,
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 39,
        lineHeight: 1,
        letterSpacing: 1.3,
        opacity: interpolate(frame, [67, 74], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [67, 80],
          ["-42px 0px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: interpolate(frame, [67, 80], ["-5deg", "-1deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      HỒ SƠ XÉT XỬ
    </Interactive.Div>
  );
};

const PrecedentStamp: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dấu Án lệ"
      style={{
        position: "absolute",
        zIndex: 12,
        top: 1160,
        left: 555,
        width: 380,
        height: 174,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `13px solid ${COLORS.orange}`,
        borderRadius: 12,
        backgroundColor: "rgba(245,240,228,0.9)",
        boxShadow: `11px 11px 0 ${COLORS.ink}`,
        color: COLORS.orange,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 100,
        lineHeight: 1,
        letterSpacing: 2,
        opacity: interpolate(frame, [133, 136], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [133, 137, 143],
          [1.58, 0.88, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [133, 137, 143],
          ["0px -150px", "0px 15px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [133, 137, 143],
          ["-3deg", "-10deg", "-7deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
            ],
          },
        ),
      }}
    >
      ÁN LỆ
    </Interactive.Div>
  );
};

export const Scene04: React.FC = () => {
  useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: COLORS.backgroundCard,
        isolation: "isolate",
      }}
    >
      <BackgroundTreatment variant="card" />
      <DocumentCopies />
      <MainDocument />
      <CourtroomVideo />
      <DocumentLabel />
      <PrecedentStamp />
    </AbsoluteFill>
  );
};