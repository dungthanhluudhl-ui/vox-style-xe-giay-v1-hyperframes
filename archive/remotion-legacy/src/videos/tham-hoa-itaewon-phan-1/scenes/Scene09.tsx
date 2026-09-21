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

const SCENE_DURATION_IN_FRAMES = 168;
const ROUTE_START_FRAME = 2;
const STRIKE_START_FRAME = 5;
const ROUTE_END_FRAME = 62;
const BOUNDARY_START_FRAME = 30;
const BOUNDARY_LOCK_FRAME = 63;
const BADGE_START_FRAME = 72;
const GEO_TAG_START_FRAME = 119;

const IMAGE_SRC =
  "videos/tham-hoa-itaewon-phan-1/media/images/img-02-seoul-itaewon-district-map.jpeg";

const RouteAndStrike: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Street route rejected by orange strike"
      style={{
        position: "absolute",
        zIndex: 12,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [
            ROUTE_START_FRAME,
            ROUTE_START_FRAME + 4,
            ROUTE_END_FRAME - 5,
            ROUTE_END_FRAME,
          ],
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
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M397 1048 C425 991 446 938 469 884 C493 827 518 776 555 739 C579 715 605 696 635 676"
          pathLength={1}
          fill="none"
          stroke="rgba(245,240,228,0.82)"
          strokeWidth={25}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ROUTE_START_FRAME, ROUTE_START_FRAME + 19],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M397 1048 C425 991 446 938 469 884 C493 827 518 776 555 739 C579 715 605 696 635 676"
          pathLength={1}
          fill="none"
          stroke={COLORS.ink}
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ROUTE_START_FRAME, ROUTE_START_FRAME + 19],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M367 1021 L666 691"
          pathLength={1}
          fill="none"
          stroke="rgba(20,20,20,0.76)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [STRIKE_START_FRAME, STRIKE_START_FRAME + 11],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          )}
        />
        <path
          d="M367 1021 L666 691"
          pathLength={1}
          fill="none"
          stroke={COLORS.orange}
          strokeWidth={13}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [STRIKE_START_FRAME, STRIKE_START_FRAME + 11],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          )}
        />

        <circle
          cx={516}
          cy={856}
          r={interpolate(
            frame,
            [
              STRIKE_START_FRAME + 7,
              STRIKE_START_FRAME + 15,
              STRIKE_START_FRAME + 24,
            ],
            [4, 46, 62],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 175}),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          )}
          fill="none"
          stroke={COLORS.orange}
          strokeWidth={7}
          opacity={interpolate(
            frame,
            [
              STRIKE_START_FRAME + 7,
              STRIKE_START_FRAME + 13,
              STRIKE_START_FRAME + 24,
            ],
            [0, 0.9, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          )}
        />
      </svg>
    </Interactive.Div>
  );
};

const AreaBoundary: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Itaewon district boundary"
      style={{
        position: "absolute",
        zIndex: 14,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [BOUNDARY_START_FRAME, BOUNDARY_START_FRAME + 6],
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
          d="M268 536 C382 468 542 474 694 548 C824 612 897 739 894 889 C890 1055 813 1215 666 1310 C526 1400 350 1343 240 1210 C150 1102 148 930 190 790 C223 681 184 591 268 536 Z"
          fill={COLORS.orange}
          fillOpacity={interpolate(
            frame,
            [BOUNDARY_LOCK_FRAME - 8, BOUNDARY_LOCK_FRAME + 8],
            [0, 0.12],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [BOUNDARY_START_FRAME, BOUNDARY_LOCK_FRAME],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M268 536 C382 468 542 474 694 548 C824 612 897 739 894 889 C890 1055 813 1215 666 1310 C526 1400 350 1343 240 1210 C150 1102 148 930 190 790 C223 681 184 591 268 536 Z"
          fill="none"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [BOUNDARY_START_FRAME, BOUNDARY_LOCK_FRAME],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <circle
          cx={268}
          cy={536}
          r={interpolate(
            frame,
            [BOUNDARY_LOCK_FRAME - 2, BOUNDARY_LOCK_FRAME + 8],
            [0, 18],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
            },
          )}
          fill={COLORS.ink}
          stroke={COLORS.orange}
          strokeWidth={8}
        />

        <circle
          cx={268}
          cy={536}
          r={interpolate(
            frame,
            [BOUNDARY_LOCK_FRAME, BOUNDARY_LOCK_FRAME + 18],
            [18, 62],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          fill="none"
          stroke={COLORS.orange}
          strokeWidth={6}
          opacity={interpolate(
            frame,
            [
              BOUNDARY_LOCK_FRAME,
              BOUNDARY_LOCK_FRAME + 5,
              BOUNDARY_LOCK_FRAME + 18,
            ],
            [0, 0.85, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          )}
        />
      </svg>
    </Interactive.Div>
  );
};

const AreaBadge: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Itaewon area badge"
      style={{
        position: "absolute",
        zIndex: 22,
        top: 794,
        left: 540,
        minWidth: 410,
        padding: "24px 34px 27px",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 12,
        backgroundColor: "rgba(245,240,228,0.94)",
        color: COLORS.ink,
        boxShadow: `14px 14px 0 ${COLORS.ink}`,
        fontFamily,
        fontSize: 86,
        fontWeight: FONT.weights.black,
        lineHeight: 1,
        letterSpacing: -4,
        textAlign: "center",
        whiteSpace: "nowrap",
        transformOrigin: "50% 50%",
        opacity: interpolate(
          frame,
          [BADGE_START_FRAME, BADGE_START_FRAME + 5],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [BADGE_START_FRAME, BADGE_START_FRAME + 8, BADGE_START_FRAME + 16],
          [0.35, 1.12, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 150}),
              Easing.spring({damping: 190}),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [
            BADGE_START_FRAME,
            BADGE_START_FRAME + 16,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          ["-50% 42px", "-50% 0px", "-50% -4px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 180}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [
            BADGE_START_FRAME,
            BADGE_START_FRAME + 8,
            BADGE_START_FRAME + 16,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          ["-7deg", "2deg", "-1deg", "-0.4deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 150}),
              Easing.spring({damping: 190}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      1,37 km²
    </Interactive.Div>
  );
};

const GeoTag: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Yongsan Seoul geo tag"
      style={{
        position: "absolute",
        zIndex: 24,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [GEO_TAG_START_FRAME, GEO_TAG_START_FRAME + 7],
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
          d="M730 1132 L776 1168 L776 1204"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={15}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [GEO_TAG_START_FRAME, GEO_TAG_START_FRAME + 16],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M730 1132 L776 1168 L776 1204"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [GEO_TAG_START_FRAME, GEO_TAG_START_FRAME + 16],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <circle
          cx={730}
          cy={1132}
          r={interpolate(
            frame,
            [GEO_TAG_START_FRAME + 8, GEO_TAG_START_FRAME + 17],
            [0, 14],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 180}),
            },
          )}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={6}
        />
      </svg>

      <Interactive.Div
        name="Yongsan Seoul label"
        style={{
          position: "absolute",
          top: 1194,
          left: 540,
          padding: "15px 22px",
          borderLeft: `8px solid ${COLORS.orange}`,
          backgroundColor: "rgba(20,20,20,0.9)",
          color: COLORS.onDarkText,
          boxShadow: `7px 7px 0 ${COLORS.orange}`,
          fontFamily,
          fontSize: 32,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 2.1,
          whiteSpace: "nowrap",
          opacity: interpolate(
            frame,
            [GEO_TAG_START_FRAME + 9, GEO_TAG_START_FRAME + 15],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(
            frame,
            [GEO_TAG_START_FRAME + 9, GEO_TAG_START_FRAME + 20],
            ["0px 30px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            },
          ),
          rotate: interpolate(
            frame,
            [GEO_TAG_START_FRAME + 9, GEO_TAG_START_FRAME + 20],
            ["2.5deg", "0deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            },
          ),
        }}
      >
        YONGSAN · SEOUL
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
        fontFamily,
      }}
    >
      <BackgroundTreatment variant="grid" />

      <Interactive.Div
        name="Itaewon map zoom-out"
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          overflow: "hidden",
          transformOrigin: "50% 47%",
          scale: interpolate(
            frame,
            [0, 54, SCENE_DURATION_IN_FRAMES - 1],
            [1.24, 1.02, 1.01],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [0, 54, SCENE_DURATION_IN_FRAMES - 1],
            ["-20px 30px", "0px 0px", "5px -4px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
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
            zIndex: 3,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.08) 0%, rgba(20,20,20,0) 26%, rgba(20,20,20,0) 70%, rgba(20,20,20,0.14) 100%)",
          }}
        />

        <RouteAndStrike />
        <AreaBoundary />
        <AreaBadge />
        <GeoTag />
      </Interactive.Div>

      <Interactive.Div
        name="Map peel entrance"
        style={{
          position: "absolute",
          zIndex: 90,
          inset: -90,
          overflow: "hidden",
          pointerEvents: "none",
          transformOrigin: "100% 0%",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 93% 100%, 0 100%)",
          backgroundColor: COLORS.backgroundCard,
          backgroundImage: `linear-gradient(${COLORS.gridLine} 1.5px, transparent 1.5px), linear-gradient(90deg, ${COLORS.gridLine} 1.5px, transparent 1.5px)`,
          backgroundSize: "84px 84px",
          boxShadow: `28px 14px 0 ${COLORS.orange}`,
          translate: interpolate(
            frame,
            [0, 15],
            ["0px 0px", "-1320px -220px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          ),
          rotate: interpolate(frame, [0, 15], ["0deg", "-12deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.76, 0, 0.24, 1),
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 74,
            bottom: 74,
            width: 210,
            height: 210,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(135deg, rgba(20,20,20,0.2), rgba(255,106,26,0.82))",
          }}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};