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

const SCENE_DURATION_IN_FRAMES = 233;
const LEFT_YEAR_START_FRAME = 35;
const RIGHT_YEAR_START_FRAME = 63;
const AGE_LINE_START_FRAME = 80;
const MEASUREMENT_START_FRAME = 115;
const MEASUREMENT_LABEL_START_FRAME = 133;

const IMAGE_SRC =
  "videos/tham-hoa-itaewon-phan-1/media/images/img-03-sewol-ferry-tragedy-memorial.jpeg";

type YearPlateProps = {
  year: string;
  left: number;
  startFrame: number;
  tilt: number;
};

const YearPlate: React.FC<YearPlateProps> = ({
  year,
  left,
  startFrame,
  tilt,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={`Year plate ${year}`}
      style={{
        position: "absolute",
        zIndex: 20,
        top: 230,
        left,
        width: 200,
        height: 116,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `4px solid ${COLORS.orange}`,
        backgroundColor: COLORS.backgroundCard,
        color: COLORS.ink,
        boxShadow: `10px 10px 0 ${COLORS.ink}`,
        fontFamily,
        fontSize: 59,
        fontWeight: FONT.weights.black,
        lineHeight: 1,
        letterSpacing: -2,
        opacity: interpolate(
          frame,
          [startFrame, startFrame + 6],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [startFrame, startFrame + 13],
          [0.42, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 180}),
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [startFrame, startFrame + 13],
          [
            year === "2014" ? "-54px 18px" : "54px 18px",
            "0px 0px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 180}),
          },
        ),
        rotate: interpolate(
          frame,
          [
            startFrame,
            startFrame + 13,
            Math.min(
              SCENE_DURATION_IN_FRAMES - 1,
              startFrame + 90,
            ),
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [
            `${tilt * 4}deg`,
            `${tilt}deg`,
            `${tilt * -0.35}deg`,
            `${tilt * 0.35}deg`,
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 180}),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      {year}
    </Interactive.Div>
  );
};

const AgeAlignmentGuide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Aligned generation guide"
      style={{
        position: "absolute",
        zIndex: 18,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [AGE_LINE_START_FRAME, AGE_LINE_START_FRAME + 7],
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
        width="100%"
        height="100%"
        viewBox="0 0 1080 1920"
        aria-hidden="true"
      >
        <path
          d="M88 922 H992"
          fill="none"
          pathLength={1}
          stroke="rgba(20,20,20,0.78)"
          strokeWidth={15}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [AGE_LINE_START_FRAME, AGE_LINE_START_FRAME + 22],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M88 922 H992"
          fill="none"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [AGE_LINE_START_FRAME, AGE_LINE_START_FRAME + 22],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        {[254, 826].map((cx, index) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy={922}
              r={interpolate(
                frame,
                [
                  AGE_LINE_START_FRAME + 15 + index * 5,
                  AGE_LINE_START_FRAME + 24 + index * 5,
                ],
                [0, 21],
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
            <path
              d={`M${cx} 350 V886`}
              fill="none"
              pathLength={1}
              stroke="rgba(247,244,236,0.72)"
              strokeWidth={4}
              strokeDasharray="12 13"
              strokeDashoffset={interpolate(
                frame,
                [
                  AGE_LINE_START_FRAME + 8 + index * 5,
                  AGE_LINE_START_FRAME + 27 + index * 5,
                ],
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
      </svg>
    </Interactive.Div>
  );
};

const MeasurementLine: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Eight-year measurement"
      style={{
        position: "absolute",
        zIndex: 24,
        top: 1038,
        left: 540,
        width: interpolate(
          frame,
          [MEASUREMENT_START_FRAME, MEASUREMENT_START_FRAME + 24],
          [0, 650],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        height: 120,
        overflow: "visible",
        translate: "-50% 0px",
        opacity: interpolate(
          frame,
          [MEASUREMENT_START_FRAME, MEASUREMENT_START_FRAME + 5],
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
        width="100%"
        height="100%"
        viewBox="0 0 650 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M24 60 H626 M24 22 V98 M626 22 V98"
          fill="none"
          pathLength={1}
          stroke="rgba(20,20,20,0.84)"
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [MEASUREMENT_START_FRAME, MEASUREMENT_START_FRAME + 25],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M24 60 H626 M24 22 V98 M626 22 V98 M58 38 L24 60 L58 82 M592 38 L626 60 L592 82"
          fill="none"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [MEASUREMENT_START_FRAME, MEASUREMENT_START_FRAME + 25],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Interactive.Div>
  );
};

const MeasurementLabel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Eight-year distance label"
      style={{
        position: "absolute",
        zIndex: 26,
        top: 1165,
        left: 540,
        minWidth: 480,
        padding: "17px 26px",
        border: `4px solid ${COLORS.orange}`,
        backgroundColor: COLORS.ink,
        color: COLORS.onDarkText,
        boxShadow: `9px 9px 0 ${COLORS.orange}`,
        fontFamily,
        fontSize: 43,
        fontWeight: FONT.weights.black,
        lineHeight: 1.05,
        letterSpacing: 1.2,
        textAlign: "center",
        whiteSpace: "nowrap",
        opacity: interpolate(
          frame,
          [
            MEASUREMENT_LABEL_START_FRAME,
            MEASUREMENT_LABEL_START_FRAME + 7,
          ],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        scale: interpolate(
          frame,
          [
            MEASUREMENT_LABEL_START_FRAME,
            MEASUREMENT_LABEL_START_FRAME + 12,
          ],
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
          [
            MEASUREMENT_LABEL_START_FRAME,
            MEASUREMENT_LABEL_START_FRAME + 12,
            180,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          [
            "-50% 26px",
            "-50% 0px",
            "-50% -3px",
            "-50% 3px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 180}),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [
            MEASUREMENT_LABEL_START_FRAME,
            MEASUREMENT_LABEL_START_FRAME + 12,
            180,
            SCENE_DURATION_IN_FRAMES - 1,
          ],
          ["-3deg", "0deg", "-0.45deg", "0.4deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 180}),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      CÁCH NHAU 8 NĂM
    </Interactive.Div>
  );
};

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.backgroundCard,
        fontFamily,
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
          objectPosition: "50% 48%",
          filter: "brightness(0.48) contrast(1.1)",
          scale: interpolate(
            frame,
            [0, SCENE_DURATION_IN_FRAMES - 1],
            [1.03, 1.09],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      />

      <AbsoluteFill
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(245,240,228,0.58) 0%, rgba(245,240,228,0.24) 48%, rgba(245,240,228,0.72) 76%, rgba(245,240,228,0.96) 100%)",
        }}
      />

      <BackgroundTreatment variant="card" />

      <div
        style={{
          position: "absolute",
          zIndex: 4,
          top: 1460,
          left: 0,
          right: 0,
          bottom: 0,
          borderTop: `5px solid ${COLORS.orange}`,
          backgroundColor: COLORS.backgroundCard,
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: 10,
          inset: 0,
          perspective: 1600,
          perspectiveOrigin: "50% 42%",
        }}
      >
        <Interactive.Div
          name="2014 and 2022 split comparison — flip entrance"
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "50% 50%",
            backfaceVisibility: "hidden",
            opacity: interpolate(frame, [0, 7], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            rotate: interpolate(frame, [0, 23], ["y -88deg", "y 0deg"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            }),
            scale: interpolate(frame, [0, 23], [0.9, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
              output: "perceptual-scale",
            }),
          }}
        >
          <Interactive.Div
            name="2014 memorial window"
            style={{
              position: "absolute",
              zIndex: 10,
              top: 160,
              left: 0,
              width: 530,
              height: 1300,
              overflow: "hidden",
              borderTop: `6px solid ${COLORS.orange}`,
              borderBottom: `6px solid ${COLORS.orange}`,
              backgroundColor: COLORS.ink,
              boxShadow: "10px 12px 0 rgba(20,20,20,0.34)",
              translate: interpolate(
                frame,
                [0, SCENE_DURATION_IN_FRAMES - 1],
                ["-9px 0px", "9px -3px"],
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
              cropLeft={0.02}
              cropRight={0.08}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "35% 50%",
                filter: "contrast(1.12) brightness(0.9)",
                scale: interpolate(
                  frame,
                  [0, SCENE_DURATION_IN_FRAMES - 1],
                  [1.04, 1.08],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    output: "perceptual-scale",
                  },
                ),
              }}
            />
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to bottom, rgba(20,20,20,0.42) 0%, rgba(20,20,20,0.02) 34%, rgba(20,20,20,0.08) 68%, rgba(20,20,20,0.5) 100%)",
              }}
            />
          </Interactive.Div>

          <Interactive.Div
            name="2022 generation window"
            style={{
              position: "absolute",
              zIndex: 10,
              top: 160,
              right: 0,
              width: 530,
              height: 1300,
              overflow: "hidden",
              borderTop: `6px solid ${COLORS.orange}`,
              borderBottom: `6px solid ${COLORS.orange}`,
              backgroundColor: COLORS.ink,
              boxShadow: "-10px 12px 0 rgba(20,20,20,0.34)",
              translate: interpolate(
                frame,
                [0, SCENE_DURATION_IN_FRAMES - 1],
                ["9px -3px", "-9px 3px"],
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
              cropLeft={0.12}
              cropRight={0.01}
              cropTop={0.2}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "68% 76%",
                filter: "contrast(1.15) brightness(0.82)",
                scale: interpolate(
                  frame,
                  [0, SCENE_DURATION_IN_FRAMES - 1],
                  [1.1, 1.05],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    output: "perceptual-scale",
                  },
                ),
              }}
            />
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to bottom, rgba(20,20,20,0.54) 0%, rgba(20,20,20,0.08) 32%, rgba(20,20,20,0.12) 66%, rgba(20,20,20,0.58) 100%)",
              }}
            />
          </Interactive.Div>

          <Interactive.Div
            name="Split divider"
            style={{
              position: "absolute",
              zIndex: 16,
              top: 810,
              left: 530,
              width: 20,
              height: interpolate(frame, [0, 25], [0, 1300], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              translate: "0px -50%",
              backgroundColor: COLORS.backgroundCard,
              boxShadow: `-5px 0 0 ${COLORS.orange}, 5px 0 0 ${COLORS.ink}`,
            }}
          />

          <YearPlate
            year="2014"
            left={154}
            startFrame={LEFT_YEAR_START_FRAME}
            tilt={-1.4}
          />
          <YearPlate
            year="2022"
            left={726}
            startFrame={RIGHT_YEAR_START_FRAME}
            tilt={1.3}
          />

          <AgeAlignmentGuide />
          <MeasurementLine />
          <MeasurementLabel />
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};