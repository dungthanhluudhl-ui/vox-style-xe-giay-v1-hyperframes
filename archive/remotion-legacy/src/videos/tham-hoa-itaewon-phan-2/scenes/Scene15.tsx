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

const IMAGE_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/images/img-07-itaewon-crush-chokepoint-map.jpeg",
);

const SCENE_DURATION = 213;
const EXIT_ANNOTATION_FRAME = 91;
const ROUTE_START_FRAME = 157;
const ROUTE_LABEL_FRAME = 165;

const MapBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Punch entrance — bản đồ điểm nghẽn Itaewon"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 8, 18], [0.86, 1.04, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: [
            Easing.spring({damping: 200}),
            Easing.spring({damping: 200}),
          ],
          output: "perceptual-scale",
        }),
      }}
    >
      <Interactive.Div
        name="Zoom chậm vào lối ra ga và cổ hẻm"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          transformOrigin: "43% 59%",
          scale: interpolate(
            frame,
            [0, SCENE_DURATION - 1],
            [1, 1.06],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [0, SCENE_DURATION - 1],
            ["0px 0px", "10px -24px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <CanvasImage
          src={IMAGE_SRC}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        />
      </Interactive.Div>
    </Interactive.Div>
  );
};

const ExitOneAnnotation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Khoanh lối ra số 1"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 24,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [EXIT_ANNOTATION_FRAME, EXIT_ANNOTATION_FRAME + 7],
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
          d="M356 1003 C414 1000 456 1037 458 1091 C461 1148 419 1190 358 1192 C296 1194 254 1157 252 1099 C250 1042 292 1007 356 1003 Z"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={23}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME, EXIT_ANNOTATION_FRAME + 25],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M356 1003 C414 1000 456 1037 458 1091 C461 1148 419 1190 358 1192 C296 1194 254 1157 252 1099 C250 1042 292 1007 356 1003 Z"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={11}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 2, EXIT_ANNOTATION_FRAME + 27],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M225 954 C261 965 288 987 309 1019"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={17}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 14, EXIT_ANNOTATION_FRAME + 27],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M225 954 C261 965 288 987 309 1019"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 15, EXIT_ANNOTATION_FRAME + 28],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>

      <Interactive.Div
        name="Nhãn lối ra 1"
        style={{
          position: "absolute",
          top: 858,
          left: 72,
          minWidth: 248,
          padding: "14px 20px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 7,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `9px 9px 0 ${COLORS.ink}`,
          fontSize: 39,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 2.2,
          textAlign: "center",
          opacity: interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 13, EXIT_ANNOTATION_FRAME + 20],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 13, EXIT_ANNOTATION_FRAME + 27],
            [0.6, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 13, EXIT_ANNOTATION_FRAME + 27],
            ["-26px 18px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(
            frame,
            [EXIT_ANNOTATION_FRAME + 13, EXIT_ANNOTATION_FRAME + 27],
            ["-5deg", "-1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        LỐI RA 1
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          left: 274,
          top: 1024,
          width: 168,
          height: 168,
          border: `4px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [
              EXIT_ANNOTATION_FRAME + 22,
              EXIT_ANNOTATION_FRAME + 31,
              SCENE_DURATION - 1,
            ],
            [0, 0.6, 0.18],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [
              EXIT_ANNOTATION_FRAME + 22,
              EXIT_ANNOTATION_FRAME + 45,
              SCENE_DURATION - 1,
            ],
            [0.72, 1.18, 1.28],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      />
    </Interactive.Div>
  );
};

const RouteConvergence: React.FC = () => {
  const frame = useCurrentFrame();

  const feederRoutes = [
    {
      path: "M94 1395 C157 1340 224 1252 352 1098",
      delay: ROUTE_START_FRAME,
    },
    {
      path: "M345 1480 C337 1365 340 1235 352 1098",
      delay: ROUTE_START_FRAME + 4,
    },
    {
      path: "M618 1392 C542 1307 462 1192 352 1098",
      delay: ROUTE_START_FRAME + 8,
    },
  ];

  return (
    <Interactive.Div
      name="Các tuyến chụm vào hẻm"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [ROUTE_START_FRAME, ROUTE_START_FRAME + 7],
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
        {feederRoutes.map((route, index) => (
          <g key={route.path}>
            <path
              d={route.path}
              pathLength={1}
              stroke="rgba(20,20,20,0.78)"
              strokeWidth={13}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [route.delay, route.delay + 22],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            />
            <path
              d={route.path}
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth={index === 1 ? 6 : 5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(
                frame,
                [route.delay + 2, route.delay + 24],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              )}
            />
          </g>
        ))}

        <path
          d="M352 1098 C400 1022 431 950 482 879 C527 816 566 748 603 650"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={interpolate(
            frame,
            [ROUTE_START_FRAME, ROUTE_START_FRAME + 33],
            [14, 45],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ROUTE_START_FRAME + 7, ROUTE_START_FRAME + 39],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M352 1098 C400 1022 431 950 482 879 C527 816 566 748 603 650"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={interpolate(
            frame,
            [ROUTE_START_FRAME, ROUTE_START_FRAME + 33],
            [6, 25],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ROUTE_START_FRAME + 9, ROUTE_START_FRAME + 41],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M568 706 L606 641 L622 715"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={21}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ROUTE_START_FRAME + 31, ROUTE_START_FRAME + 43],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M568 706 L606 641 L622 715"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [ROUTE_START_FRAME + 32, ROUTE_START_FRAME + 44],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
      </svg>

      <Interactive.Div
        name="Nhãn luồng chính"
        style={{
          position: "absolute",
          top: 735,
          left: 625,
          width: interpolate(
            frame,
            [ROUTE_LABEL_FRAME, ROUTE_LABEL_FRAME + 14],
            [0, 340],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          height: 78,
          overflow: "hidden",
          opacity: interpolate(
            frame,
            [ROUTE_LABEL_FRAME, ROUTE_LABEL_FRAME + 6],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          translate: interpolate(
            frame,
            [ROUTE_LABEL_FRAME, ROUTE_LABEL_FRAME + 14],
            ["22px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: `${-1 + Math.sin((frame - ROUTE_LABEL_FRAME) / 16) * 0.35}deg`,
        }}
      >
        <div
          style={{
            width: 326,
            padding: "14px 18px",
            border: `4px solid ${COLORS.ink}`,
            borderRadius: 6,
            backgroundColor: COLORS.orange,
            color: COLORS.ink,
            boxShadow: `8px 8px 0 ${COLORS.ink}`,
            fontSize: 35,
            fontWeight: FONT.weights.black,
            lineHeight: 1,
            letterSpacing: 2.1,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          LUỒNG CHÍNH
        </div>
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene15: React.FC = () => {
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
      <MapBackground />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 8,
          pointerEvents: "none",
          opacity: 0.72,
        }}
      >
        <BackgroundTreatment variant="spotlight" />
      </div>

      <ExitOneAnnotation />
      <RouteConvergence />

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