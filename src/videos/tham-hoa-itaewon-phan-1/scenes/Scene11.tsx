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
import {ZoomThroughEntrance} from "../../../components/SceneTransitions";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const SCENE_DURATION_IN_FRAMES = 268;
const SCREEN_START_FRAME = 39;
const LABEL_START_FRAME = 58;
const TV_SHRINK_START_FRAME = 102;
const TV_SHRINK_END_FRAME = 130;
const FOOTPRINT_START_FRAME = 130;
const FIGURE_HIGHLIGHT_START_FRAME = 161;

const IMAGE_SRC =
  "videos/tham-hoa-itaewon-phan-1/media/images/img-06-itaewon-nightlife-street-cutout.jpeg";

const FIGURE_OUTLINES = [
  {
    path: "M166 952 C127 1005 126 1126 159 1215 C184 1284 247 1307 292 1260 C329 1222 323 1118 307 1023 C292 937 210 901 166 952 Z",
    startFrame: FIGURE_HIGHLIGHT_START_FRAME,
  },
  {
    path: "M341 845 C300 901 308 1034 333 1134 C351 1208 413 1241 460 1199 C502 1162 494 1045 482 946 C469 843 392 792 341 845 Z",
    startFrame: FIGURE_HIGHLIGHT_START_FRAME + 8,
  },
  {
    path: "M506 920 C468 978 473 1100 499 1204 C518 1280 579 1315 628 1270 C668 1232 662 1115 646 1014 C630 914 550 862 506 920 Z",
    startFrame: FIGURE_HIGHLIGHT_START_FRAME + 16,
  },
  {
    path: "M681 815 C644 870 647 1002 676 1107 C697 1184 758 1214 802 1170 C841 1131 832 1014 818 915 C804 817 727 759 681 815 Z",
    startFrame: FIGURE_HIGHLIGHT_START_FRAME + 24,
  },
  {
    path: "M826 944 C788 997 790 1112 817 1209 C838 1282 897 1311 942 1268 C980 1232 974 1125 959 1031 C943 936 868 889 826 944 Z",
    startFrame: FIGURE_HIGHLIGHT_START_FRAME + 32,
  },
] as const;

const FigureHighlights: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Growing nightlife crowd highlights"
      style={{
        position: "absolute",
        zIndex: 5,
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        {FIGURE_OUTLINES.map((outline, index) => (
          <g key={outline.path}>
            <path
              d={outline.path}
              pathLength={1}
              fill={COLORS.orange}
              fillOpacity={interpolate(
                frame,
                [outline.startFrame + 12, outline.startFrame + 22],
                [0, 0.08],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
              stroke="rgba(20,20,20,0.82)"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [outline.startFrame, outline.startFrame + 20],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
              opacity={interpolate(
                frame,
                [outline.startFrame, outline.startFrame + 5],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            />
            <path
              d={outline.path}
              pathLength={1}
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={8}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [outline.startFrame, outline.startFrame + 20],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
              opacity={interpolate(
                frame,
                [
                  outline.startFrame,
                  outline.startFrame + 5,
                  SCENE_DURATION_IN_FRAMES - 16 + index,
                  SCENE_DURATION_IN_FRAMES - 1,
                ],
                [0, 1, 1, 0.72],
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
          </g>
        ))}
      </svg>
    </Interactive.Div>
  );
};

const NightlifeBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ZoomThroughEntrance name="Nightlife street zoom-through">
      <Interactive.Div
        name="Nightlife street zoom-out"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          scale: interpolate(
            frame,
            [0, SCENE_DURATION_IN_FRAMES - 1],
            [1.1, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [0, SCENE_DURATION_IN_FRAMES - 1],
            ["0px 24px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <CanvasImage
          src={staticFile(IMAGE_SRC)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />

        <AbsoluteFill
          style={{
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0.02) 31%, rgba(20,20,20,0.02) 68%, rgba(20,20,20,0.24) 100%)",
          }}
        />

        <FigureHighlights />
      </Interactive.Div>
    </ZoomThroughEntrance>
  );
};

const TelevisionMockup: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Paper television mockup"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 230,
        left: 90,
        width: 900,
        height: 1020,
        transformOrigin: "50% 50%",
        opacity: interpolate(frame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [
            0,
            18,
            TV_SHRINK_START_FRAME,
            TV_SHRINK_END_FRAME,
            218,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [1.18, 1, 1, 0.43, 0.43, 0.435],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.linear,
              Easing.bezier(0.76, 0, 0.24, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [
            0,
            18,
            TV_SHRINK_START_FRAME,
            TV_SHRINK_END_FRAME,
            218,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [
            "0px 90px",
            "0px 0px",
            "0px 0px",
            "-300px -350px",
            "-302px -354px",
            "-296px -348px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.linear,
              Easing.bezier(0.76, 0, 0.24, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [
            0,
            18,
            TV_SHRINK_START_FRAME,
            TV_SHRINK_END_FRAME,
            218,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          ["-4deg", "0.8deg", "0.8deg", "-1.3deg", "-0.9deg", "-1.4deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.linear,
              Easing.spring({damping: 180}),
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
          clipPath: "polygon(2% 0, 98% 2%, 100% 96%, 4% 100%, 0 5%)",
          border: `8px solid ${COLORS.ink}`,
          backgroundColor: COLORS.backgroundCard,
          boxShadow: `22px 24px 0 ${COLORS.orange}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 54,
          left: 54,
          width: 792,
          height: 718,
          overflow: "hidden",
          border: `10px solid ${COLORS.ink}`,
          borderRadius: 32,
          backgroundColor: COLORS.ink,
          boxShadow: `inset 0 0 0 7px ${COLORS.orange}`,
        }}
      >
        <CanvasImage
          src={staticFile(IMAGE_SRC)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 39%",
            opacity: interpolate(
              frame,
              [
                SCREEN_START_FRAME,
                SCREEN_START_FRAME + 8,
                139,
                146,
              ],
              [0, 1, 1, 0.58],
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
              [SCREEN_START_FRAME, 146],
              [1.08, 1.16],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
            translate: interpolate(
              frame,
              [SCREEN_START_FRAME, 146],
              ["-18px 8px", "18px -10px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,106,26,0.1), rgba(20,20,20,0.02) 48%, rgba(20,20,20,0.32))",
            opacity: interpolate(
              frame,
              [SCREEN_START_FRAME, SCREEN_START_FRAME + 8],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        />

        <AbsoluteFill
          style={{
            pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 7px, rgba(247,244,236,0.16) 8px, transparent 10px)",
            opacity: interpolate(
              frame,
              [
                SCREEN_START_FRAME,
                SCREEN_START_FRAME + 9,
                139,
                146,
              ],
              [0, 0.52, 0.52, 0.2],
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
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            boxShadow:
              "inset 0 0 70px rgba(20,20,20,0.58), inset 0 0 0 5px rgba(247,244,236,0.18)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 810,
          left: 78,
          width: 520,
          height: 82,
          borderTop: `7px solid ${COLORS.ink}`,
          borderBottom: `4px solid ${COLORS.ink}`,
        }}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 30,
              left: 20 + index * 96,
              width: 66,
              height: 9,
              borderRadius: 5,
              backgroundColor:
                index === 1 ? COLORS.orange : COLORS.ink,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 804,
          right: 82,
          width: 108,
          height: 108,
          border: `8px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor: COLORS.orange,
          boxShadow: `7px 7px 0 ${COLORS.ink}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 17,
            width: 66,
            height: 9,
            borderRadius: 5,
            backgroundColor: COLORS.ink,
            rotate: interpolate(frame, [39, 74], ["-34deg", "18deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
            }),
          }}
        />
      </div>

      <Interactive.Div
        name="Screen influence label"
        style={{
          position: "absolute",
          top: 912,
          left: 184,
          minWidth: 550,
          padding: "17px 27px",
          border: `5px solid ${COLORS.orange}`,
          backgroundColor: COLORS.ink,
          color: COLORS.onDarkText,
          boxShadow: `10px 10px 0 ${COLORS.orange}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 42,
          lineHeight: 1,
          letterSpacing: 1.4,
          textAlign: "center",
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [LABEL_START_FRAME, LABEL_START_FRAME + 7, 140, 148],
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
          scale: interpolate(
            frame,
            [LABEL_START_FRAME, LABEL_START_FRAME + 11],
            [0.72, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [LABEL_START_FRAME, LABEL_START_FRAME + 11],
            ["0px 28px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
            },
          ),
        }}
      >
        SỨC HÚT MÀN ẢNH
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 982,
          left: 105,
          width: 245,
          height: 34,
          clipPath: "polygon(0 0, 100% 40%, 96% 100%, 4% 74%)",
          backgroundColor: COLORS.orange,
          opacity: interpolate(
            frame,
            [LABEL_START_FRAME + 5, LABEL_START_FRAME + 13, 140, 148],
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

      <div
        style={{
          position: "absolute",
          top: 990,
          left: 165,
          width: 160,
          height: 58,
          clipPath: "polygon(0 0, 100% 0, 86% 100%, 12% 100%)",
          backgroundColor: COLORS.ink,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 990,
          right: 165,
          width: 160,
          height: 58,
          clipPath: "polygon(0 0, 100% 0, 88% 100%, 14% 100%)",
          backgroundColor: COLORS.ink,
        }}
      />
    </Interactive.Div>
  );
};

type FootprintPairProps = {
  index: number;
  left: number;
  top: number;
  angle: number;
};

const FootprintPair: React.FC<FootprintPairProps> = ({
  index,
  left,
  top,
  angle,
}) => {
  const frame = useCurrentFrame();
  const revealFrame = FOOTPRINT_START_FRAME + index * 10;
  const driftFrame = Math.max(0, frame - revealFrame - 10);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 82,
        height: 112,
        opacity: interpolate(
          frame,
          [revealFrame, revealFrame + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [revealFrame, revealFrame + 10],
          [0.25, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 175}),
            output: "perceptual-scale",
          },
        ),
        translate: `${Math.sin(driftFrame * 0.055 + index) * 1.4}px ${
          Math.cos(driftFrame * 0.049 + index) * 1.2
        }px`,
        rotate: `${angle}deg`,
        filter: "drop-shadow(4px 4px 0px rgba(255,106,26,0.9))",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 4,
          width: 29,
          height: 64,
          borderRadius: "58% 42% 48% 52%",
          backgroundColor: COLORS.ink,
          rotate: "-12deg",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 44,
          width: 28,
          height: 64,
          borderRadius: "42% 58% 52% 48%",
          backgroundColor: COLORS.ink,
          rotate: "12deg",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 9,
          top: 73,
          width: 24,
          height: 18,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          rotate: "-12deg",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 14,
          width: 24,
          height: 18,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          rotate: "12deg",
        }}
      />
    </div>
  );
};

const FootprintTrail: React.FC = () => {
  const frame = useCurrentFrame();

  const footprints = [
    {left: 234, top: 644, angle: -18},
    {left: 300, top: 734, angle: -11},
    {left: 372, top: 822, angle: -5},
    {left: 452, top: 902, angle: 3},
    {left: 542, top: 978, angle: 10},
    {left: 642, top: 1046, angle: 16},
    {left: 748, top: 1108, angle: 22},
  ] as const;

  return (
    <Interactive.Div
      name="Footprint trail from screen to street"
      style={{
        position: "absolute",
        zIndex: 20,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [FOOTPRINT_START_FRAME, FOOTPRINT_START_FRAME + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
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
          d="M245 650 C318 750 397 846 490 925 C590 1012 685 1080 801 1165"
          pathLength={1}
          stroke="rgba(247,244,236,0.58)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="0.018 0.025"
          strokeDashoffset={interpolate(
            frame,
            [FOOTPRINT_START_FRAME, 209],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>

      {footprints.map((footprint, index) => (
        <FootprintPair
          key={`${footprint.left}-${footprint.top}`}
          index={index}
          left={footprint.left}
          top={footprint.top}
          angle={footprint.angle}
        />
      ))}
    </Interactive.Div>
  );
};

export const Scene11: React.FC = () => {
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
      <NightlifeBackground />
      <BackgroundTreatment variant="card" />
      <FootprintTrail />
      <TelevisionMockup />
    </AbsoluteFill>
  );
};