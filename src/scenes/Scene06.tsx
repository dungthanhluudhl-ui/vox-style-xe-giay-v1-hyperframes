import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../components/BackgroundTreatment";
import {MediaAssembler} from "../components/MediaAssembler";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../styles/theme";

const EscapeRoute: React.FC = () => {
  const frame = useCurrentFrame();

  const arrowRotation = interpolate(
    frame,
    [122, 128, 134],
    [-160, 24, 8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: [
        Easing.bezier(0.16, 1, 0.3, 1),
        Easing.spring({damping: 200}),
      ],
    },
  );

  const arrowScale = interpolate(
    frame,
    [122, 128, 134],
    [1, 1.35, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: [
        Easing.bezier(0.16, 1, 0.3, 1),
        Easing.spring({damping: 200}),
      ],
      output: "perceptual-scale",
    },
  );

  const arrowRecoil = interpolate(
    frame,
    [122, 128, 134],
    [0, -24, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: [
        Easing.bezier(0.16, 1, 0.3, 1),
        Easing.spring({damping: 200}),
      ],
    },
  );

  return (
    <Interactive.Div
      name="Đường bỏ trốn đảo thành kế hoạch"
      style={{
        position: "absolute",
        zIndex: 20,
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
        <path
          d="M895 892 C774 906 710 954 602 972 C454 997 331 1036 165 1104"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={17}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 96], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(
            frame,
            [0, 7, 124, 140],
            [0, 0.58, 0.58, 0.25],
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
        <path
          d="M895 884 C774 898 710 946 602 964 C454 989 331 1028 165 1096"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 96], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(
            frame,
            [0, 7, 124, 140],
            [0, 1, 1, 0.42],
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

        <path
          d="M165 1096 C302 1140 396 1088 567 1102 C650 1109 674 1210 759 1210 C837 1210 860 1092 935 1078"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [126, 176], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(frame, [124, 130], [0, 0.68], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M165 1088 C302 1132 396 1080 567 1094 C650 1101 674 1202 759 1202 C837 1202 860 1084 935 1070"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [126, 176], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(frame, [124, 130], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <g
          transform={`translate(${165 + arrowRecoil} 1096) rotate(${arrowRotation}) scale(${arrowScale})`}
          opacity={interpolate(
            frame,
            [84, 94, 176, 184],
            [0, 1, 1, 0.78],
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
        >
          <path
            d="M-28 -23 L22 0 L-28 23 Z"
            fill={COLORS.ink}
            stroke={COLORS.ink}
            strokeWidth={12}
            strokeLinejoin="round"
          />
          <path
            d="M-27 -15 L14 0 L-27 15 Z"
            fill={COLORS.orange}
            stroke={COLORS.orange}
            strokeWidth={5}
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </Interactive.Div>
  );
};

type PlanBoxProps = {
  delay: number;
  left: number;
  top: number;
  rotate: number;
  name: string;
};

const PlanBox: React.FC<PlanBoxProps> = ({
  delay,
  left,
  top,
  rotate,
  name,
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
        width: 158,
        height: 104,
        boxSizing: "border-box",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: "rgba(245,240,228,0.93)",
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [delay, delay + 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [delay, delay + 7, delay + 14],
          [0.45, 1.08, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [delay, delay + 14],
          ["0px 42px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: interpolate(
          frame,
          [delay, delay + 14],
          [`${rotate * 2.5}deg`, `${rotate}deg`],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    />
  );
};

const PlanFlow: React.FC = () => {
  return (
    <>
      <PlanBox
        name="Ô kế hoạch 1"
        delay={126}
        left={488}
        top={1042}
        rotate={-2}
      />
      <PlanBox
        name="Ô kế hoạch 2"
        delay={136}
        left={680}
        top={1150}
        rotate={2}
      />
      <PlanBox
        name="Ô kế hoạch 3"
        delay={144}
        left={856}
        top={1018}
        rotate={-1}
      />
    </>
  );
};

const EscapeLabel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Nhãn càng lún sâu"
      style={{
        position: "absolute",
        zIndex: 26,
        top: 912,
        left: 62,
        padding: "12px 18px 14px",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: 6,
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `7px 7px 0 ${COLORS.orange}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 33,
        lineHeight: 1,
        letterSpacing: 0.8,
        opacity: interpolate(
          frame,
          [12, 18, 60, 66],
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
        translate: interpolate(
          frame,
          [12, 24, 60, 66],
          [
            "-42px 18px",
            "0px 0px",
            "0px 0px",
            "-18px 0px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [12, 24],
          ["-5deg", "-1deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      CÀNG LÚN SÂU
    </Interactive.Div>
  );
};

const WaitingPunchPhrase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Punch phrase · Không ngồi chờ"
      style={{
        position: "absolute",
        zIndex: 32,
        top: 226,
        left: 66,
        right: 66,
        boxSizing: "border-box",
        padding: "27px 30px 35px",
        border: `6px solid ${COLORS.orange}`,
        borderRadius: 10,
        backgroundColor: "rgba(20,20,20,0.94)",
        boxShadow: `13px 13px 0 ${COLORS.orange}`,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 73,
        lineHeight: 1.08,
        letterSpacing: -1.8,
        textAlign: "center",
        opacity: interpolate(
          frame,
          [96, 100, 153, 159],
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
          [96, 102, 109, 153, 159],
          [0.62, 1.08, 1, 1, 1.04],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [96, 108],
          ["0px 46px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: interpolate(
          frame,
          [96, 108],
          ["-3deg", "-0.6deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      KHÔNG NGỒI CHỜ

      <svg
        width="830"
        height="34"
        viewBox="0 0 830 34"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 50,
          bottom: 8,
          pointerEvents: "none",
        }}
      >
        <path
          d="M8 19 C196 4 410 27 822 11"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [103, 118], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <Interactive.Div
        name="Zoom-through vào cuộc bỏ trốn"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 23], [2.5, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
          transformOrigin: "58% 45%",
        }}
      >
        <MediaAssembler
          kind="video"
          src={staticFile(
            "media/videos/vid-02-suspect-looking-back-alley.mp4",
          )}
          durationInFrames={185}
          trimBefore={0.9 * 30}
          trimAfter={7.08 * 30}
          cameraMotion="pan-right"
          objectPosition="56% 50%"
          contrast={1.1}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Khoảng tối sau đường chạy"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(122deg, rgba(20,20,20,0.44) 0%, rgba(20,20,20,0.08) 43%, rgba(20,20,20,0) 68%)",
          opacity: interpolate(frame, [0, 14], [0.2, 0.72], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          pointerEvents: "none",
        }}
      />

      <BackgroundTreatment variant="spotlight" />
      <EscapeRoute />
      <PlanFlow />
      <EscapeLabel />
      <WaitingPunchPhrase />
    </AbsoluteFill>
  );
};