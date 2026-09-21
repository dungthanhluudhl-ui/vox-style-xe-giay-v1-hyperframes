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

const VIDEO_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-02-itaewon-crowd-surge-animation.mp4",
);

const SCENE_DURATION = 199;
const TEAR_FRAME = 89;
const ARROW_FRAME = 94;
const BAN_FRAME = 119;
const BAN_SPLIT_FRAME = 134;

const BanGlyph: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg
      width="136"
      height="136"
      viewBox="0 0 136 136"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="68"
        cy="68"
        r="55"
        fill="rgba(20,20,20,0.9)"
        opacity={interpolate(frame, [BAN_FRAME, BAN_FRAME + 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}
      />
      <circle
        cx="68"
        cy="68"
        r="49"
        pathLength={1}
        stroke={COLORS.orange}
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={interpolate(
          frame,
          [BAN_FRAME, BAN_FRAME + 15],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        )}
      />
      <path
        d="M34 34 L102 102"
        pathLength={1}
        stroke={COLORS.orange}
        strokeWidth={11}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={interpolate(
          frame,
          [BAN_FRAME + 7, BAN_FRAME + 19],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        )}
      />
    </svg>
  );
};

const RemovedBarrierIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Biểu tượng lệnh cấm bị đường xé cắt qua"
      style={{
        position: "absolute",
        zIndex: 32,
        top: 830,
        left: 580,
        width: 136,
        height: 136,
        pointerEvents: "none",
        opacity: interpolate(frame, [BAN_FRAME, BAN_FRAME + 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [BAN_FRAME, BAN_FRAME + 14], [0.48, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        rotate: interpolate(
          frame,
          [BAN_FRAME, BAN_FRAME + 14, SCENE_DURATION - 1],
          ["-16deg", "-3deg", "1deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
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
          clipPath: "inset(0 0 49% 0)",
          translate: interpolate(
            frame,
            [BAN_SPLIT_FRAME, BAN_SPLIT_FRAME + 14],
            ["0px 0px", "-15px -13px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [BAN_SPLIT_FRAME, BAN_SPLIT_FRAME + 14],
            ["0deg", "-8deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        <BanGlyph />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: "inset(51% 0 0 0)",
          translate: interpolate(
            frame,
            [BAN_SPLIT_FRAME, BAN_SPLIT_FRAME + 14],
            ["0px 0px", "17px 15px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [BAN_SPLIT_FRAME, BAN_SPLIT_FRAME + 14],
            ["0deg", "9deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        <BanGlyph />
      </div>
    </Interactive.Div>
  );
};

const TearEdgeAnnotation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Nét cam bám theo mép giấy bị xé"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 36,
        pointerEvents: "none",
        opacity: interpolate(frame, [TEAR_FRAME, TEAR_FRAME + 7], [0, 1], {
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
      >
        <path
          d="M88 1030 C166 973 220 1000 290 930 L360 972 L430 900 L510 942 L590 865 L665 910 L740 844 L820 892 L910 820 L1006 846"
          pathLength={1}
          stroke="rgba(20,20,20,0.76)"
          strokeWidth={21}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TEAR_FRAME, TEAR_FRAME + 55],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M88 1030 C166 973 220 1000 290 930 L360 972 L430 900 L510 942 L590 865 L665 910 L740 844 L820 892 L910 820 L1006 846"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [TEAR_FRAME + 2, TEAR_FRAME + 57],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>
    </Interactive.Div>
  );
};

const TearArrow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Mũi tên chỉ mép quy định bị xé"
      style={{
        position: "absolute",
        zIndex: 38,
        top: 668,
        left: 164,
        width: 370,
        height: 300,
        pointerEvents: "none",
        opacity: interpolate(frame, [ARROW_FRAME, ARROW_FRAME + 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [ARROW_FRAME, ARROW_FRAME + 16, SCENE_DURATION - 1],
          ["-20px -18px", "0px 0px", "4px 3px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [ARROW_FRAME, ARROW_FRAME + 16, SCENE_DURATION - 1],
          ["-5deg", "0deg", "1deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <svg
        width="370"
        height="300"
        viewBox="0 0 370 300"
        fill="none"
        aria-hidden="true"
        style={{overflow: "visible"}}
      >
        <path
          d="M36 42 C118 38 189 82 229 142 C253 178 269 211 291 247"
          pathLength={1}
          stroke="rgba(20,20,20,0.8)"
          strokeWidth={17}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ARROW_FRAME, ARROW_FRAME + 21],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M36 42 C118 38 189 82 229 142 C253 178 269 211 291 247"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ARROW_FRAME + 1, ARROW_FRAME + 22],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M253 231 L294 252 L300 207"
          pathLength={1}
          stroke="rgba(20,20,20,0.8)"
          strokeWidth={17}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ARROW_FRAME + 17, ARROW_FRAME + 29],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M253 231 L294 252 L300 207"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ARROW_FRAME + 18, ARROW_FRAME + 30],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>
    </Interactive.Div>
  );
};

const PeelEntrance: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Lớp giấy quy định bị bóc khỏi dòng người"
      style={{
        position: "absolute",
        zIndex: 90,
        top: -70,
        left: -70,
        width: 1240,
        height: 2070,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: COLORS.backgroundCard,
        borderLeft: `18px solid ${COLORS.orange}`,
        boxShadow: "-24px 0 0 rgba(20,20,20,0.34)",
        clipPath:
          "polygon(0 0, 100% 0, 100% 100%, 0 100%, 2% 92%, 0 84%, 3% 75%, 0 65%, 2% 54%, 0 43%, 3% 31%, 0 19%)",
        translate: interpolate(frame, [0, 25], ["0px 0px", "1270px -30px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        }),
        rotate: interpolate(frame, [0, 25], ["0deg", "-5deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.7, 0, 0.84, 0),
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "radial-gradient(circle at 25% 31%, rgba(20,20,20,0.4) 0 1px, transparent 1.5px), repeating-linear-gradient(-3deg, transparent 0 15px, rgba(20,20,20,0.08) 16px)",
          backgroundSize: "24px 24px, 100% 17px",
        }}
      />

      <svg
        width="1240"
        height="2070"
        viewBox="0 0 1240 2070"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <path
          d="M102 970 C253 904 362 1014 493 934 C630 851 745 979 886 892 C976 837 1065 838 1155 786"
          stroke={COLORS.ink}
          strokeWidth={15}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M102 991 C253 925 362 1035 493 955 C630 872 745 1000 886 913 C976 858 1065 859 1155 807"
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Interactive.Div>
  );
};

export const Scene10: React.FC = () => {
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
        name="Dòng người Itaewon sau khi dỡ bỏ quy định"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 7], [0.72, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <MediaAssembler
          kind="video"
          src={VIDEO_SRC}
          durationInFrames={SCENE_DURATION}
          trimBefore={0.7 * 30}
          trimAfter={7.32 * 30}
          playbackRate={1}
          cameraMotion="none"
          contrast={1}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          opacity: interpolate(frame, [0, 25], [0.42, 0.32], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          pointerEvents: "none",
        }}
      >
        <BackgroundTreatment variant="spotlight" />
      </div>

      <RemovedBarrierIcon />
      <TearEdgeAnnotation />
      <TearArrow />
      <PeelEntrance />

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