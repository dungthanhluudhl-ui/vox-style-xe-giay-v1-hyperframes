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

const VIDEO_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-03-postwar-seoul-street-cutout.mp4",
);

const SCENE_DURATION = 159;

const FlowLine: React.FC = () => {
  const frame = useCurrentFrame();

  const nodeFrames = [25, 67, 101];
  const nodes = [
    {cx: 286, cy: 846},
    {cx: 586, cy: 632},
    {cx: 824, cy: 424},
  ];

  return (
    <Interactive.Div
      name="Luồng người sang khu giải trí"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [0, 8, 142, SCENE_DURATION - 1],
          [0, 0.78, 0.78, 0.45],
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
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M138 1184 C198 1100 213 961 286 846 C359 731 472 709 586 632 C697 556 735 477 824 424 C884 389 924 370 962 334"
          pathLength={1}
          stroke="rgba(20,20,20,0.72)"
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [3, 112], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M138 1184 C198 1100 213 961 286 846 C359 731 472 709 586 632 C697 556 735 477 824 424 C884 389 924 370 962 334"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 114], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <path
          d="M940 311 L969 331 L941 353"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [106, 118], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        {nodes.map((node, index) => (
          <g key={`${node.cx}-${node.cy}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r={interpolate(
                frame,
                [nodeFrames[index], nodeFrames[index] + 12],
                [0, 14],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              )}
              fill={COLORS.orange}
              stroke={COLORS.ink}
              strokeWidth={4}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={interpolate(
                frame,
                [
                  nodeFrames[index],
                  nodeFrames[index] + 14,
                  nodeFrames[index] + 30,
                ],
                [8, 28, 38],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: [
                    Easing.spring({damping: 200}),
                    Easing.bezier(0.16, 1, 0.3, 1),
                  ],
                },
              )}
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={3}
              opacity={interpolate(
                frame,
                [
                  nodeFrames[index],
                  nodeFrames[index] + 9,
                  nodeFrames[index] + 30,
                ],
                [0, 0.8, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              )}
            />
          </g>
        ))}
      </svg>
    </Interactive.Div>
  );
};

type SignPulseProps = {
  name: string;
  left: number;
  top: number;
  width: number;
  height: number;
  durationInFrames: number;
  rotate: number;
};

const SignPulse: React.FC<SignPulseProps> = ({
  name,
  left,
  top,
  width,
  height,
  durationInFrames,
  rotate,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 24,
        left,
        top,
        width,
        height,
        pointerEvents: "none",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 10,
        boxShadow: `0 0 0 7px rgba(20,20,20,0.58)`,
        opacity: interpolate(
          frame,
          [0, 7, Math.max(8, durationInFrames - 10), durationInFrames - 1],
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
          [0, 12, Math.max(13, durationInFrames - 1)],
          [0.74, 1, 1.07],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        rotate: `${rotate + Math.sin(frame / 8) * 0.8}deg`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 10,
          border: `3px solid rgba(255,106,26,0.8)`,
          borderRadius: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -15,
          top: height / 2 - 5,
          width: 30,
          height: 10,
          backgroundColor: COLORS.orange,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -15,
          top: height / 2 - 5,
          width: 30,
          height: 10,
          backgroundColor: COLORS.orange,
        }}
      />
    </Interactive.Div>
  );
};

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();

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
      <Interactive.Div
        name="Phố giải trí trỗi dậy"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 20], ["0px 92px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
          scale: interpolate(frame, [0, 24], [1.05, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <MediaAssembler
          kind="video"
          src={VIDEO_SRC}
          durationInFrames={SCENE_DURATION}
          trimBefore={1.35 * 30}
          trimAfter={6.65 * 30}
          playbackRate={1}
          cameraMotion="pan-right"
          contrast={1}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          opacity: 0.34,
          pointerEvents: "none",
        }}
      >
        <BackgroundTreatment variant="spotlight" />
      </div>

      <FlowLine />

      <Sequence
        name="Cụm biển hiệu thứ nhất sáng lên"
        from={37}
        durationInFrames={36}
        layout="none"
      >
        <SignPulse
          name="Biển hiệu giải trí thứ nhất"
          left={530}
          top={510}
          width={360}
          height={146}
          durationInFrames={36}
          rotate={-2}
        />
      </Sequence>

      <Sequence
        name="Cụm biển hiệu thứ hai sáng lên"
        from={92}
        durationInFrames={54}
        layout="none"
      >
        <SignPulse
          name="Biển hiệu hộp đêm thứ hai"
          left={116}
          top={690}
          width={346}
          height={154}
          durationInFrames={54}
          rotate={2}
        />
      </Sequence>

      <Sequence
        name="Nhãn phố thức giấc"
        from={106}
        durationInFrames={53}
        layout="none"
      >
        <LightOverlay
          text="PHỐ THỨC GIẤC"
          variant="label"
          name="Phố thức giấc"
          top={226}
          left={72}
          maxWidth={560}
        />
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