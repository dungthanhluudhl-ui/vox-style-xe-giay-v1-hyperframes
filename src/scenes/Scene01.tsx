import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../components/BackgroundTreatment";
import {LightOverlay} from "../components/LightOverlay";
import {MediaAssembler} from "../components/MediaAssembler";
import {
  DissolveEntrance,
  ZoomThroughEntrance,
} from "../components/SceneTransitions";
import {COLORS} from "../styles/theme";

const DebtTrapConnector: React.FC<{frame: number}> = ({frame}) => {
  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M490 304 C565 345 590 485 662 584 C700 637 720 680 720 735"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(frame, [150, 157], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [150, 176], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M490 296 C565 337 598 477 670 576 C708 629 728 672 728 727"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(frame, [150, 157], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [150, 176], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M704 710 L728 742 L744 704"
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(frame, [170, 179], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />

        <rect
          x={interpolate(frame, [185, 205], [352, 425], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          y={interpolate(frame, [185, 205], [555, 632], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          width={interpolate(frame, [185, 205], [640, 510], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          height={interpolate(frame, [185, 205], [770, 635], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          rx={18}
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={20}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [185, 210], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(frame, [185, 190], [0, 0.55], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
        <rect
          x={interpolate(frame, [185, 205], [344, 417], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          y={interpolate(frame, [185, 205], [547, 624], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          width={interpolate(frame, [185, 205], [640, 510], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          height={interpolate(frame, [185, 205], [770, 635], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          rx={18}
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [185, 210], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(frame, [185, 190], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <Sequence name="S01-1 · Khoản nợ" durationInFrames={150}>
        <ZoomThroughEntrance>
          <MediaAssembler
            kind="image"
            src={staticFile(
              "media/images/img-08-extortion-money-demand-cutout.jpeg",
            )}
            durationInFrames={150}
            cameraMotion="zoom-in"
            objectPosition="50% 49%"
            cropLeft={0.015}
            cropRight={0.015}
            cropTop={0.01}
            cropBottom={0.01}
            contrast={1.1}
          />
        </ZoomThroughEntrance>
      </Sequence>

      <Sequence
        name="S01-2 · Mồi Zalo"
        from={150}
        durationInFrames={84}
      >
        <DissolveEntrance>
          <MediaAssembler
            kind="image"
            src={staticFile(
              "media/images/img-04-online-scam-catfish-victim.jpeg",
            )}
            durationInFrames={84}
            cameraMotion="pan-right"
            objectPosition="56% 50%"
            cropLeft={0.01}
            cropRight={0.01}
            cropTop={0.005}
            cropBottom={0.005}
            contrast={1.08}
          />
        </DissolveEntrance>
      </Sequence>

      <BackgroundTreatment variant="spotlight" />

      <DebtTrapConnector frame={frame} />

      <Sequence
        name="Giá trị khoản nợ"
        from={32}
        durationInFrames={202}
        layout="none"
      >
        <LightOverlay
          name="150 triệu"
          text="150 TRIỆU"
          variant="amount"
          icon="money"
          top={220}
          left={64}
          maxWidth={520}
        />
      </Sequence>

      <Sequence
        name="Nhãn khoản nợ"
        from={62}
        durationInFrames={88}
        layout="none"
      >
        <LightOverlay
          name="Khoản nợ treo"
          text="KHOẢN NỢ TREO"
          variant="label"
          top={448}
          left={78}
          maxWidth={410}
        />
      </Sequence>

      <Sequence
        name="Nhãn mồi ảo"
        from={157}
        durationInFrames={77}
        layout="none"
      >
        <LightOverlay
          name="Mồi ảo"
          text="MỒI ẢO"
          variant="label"
          icon="phone"
          top={500}
          left={690}
          maxWidth={330}
        />
      </Sequence>

      <Sequence
        name="Nhãn bẫy thật"
        from={185}
        durationInFrames={49}
        layout="none"
      >
        <LightOverlay
          name="Bẫy thật"
          text="BẪY THẬT"
          variant="punch"
          icon="warning"
          top={1260}
          left={584}
          maxWidth={390}
        />
      </Sequence>
    </AbsoluteFill>
  );
};