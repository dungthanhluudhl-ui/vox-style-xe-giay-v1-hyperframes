import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

type PersonMarkerProps = {
  delay: number;
  left: number;
  top: number;
  rotate: number;
  name: string;
};

const PersonMarker: React.FC<PersonMarkerProps> = ({
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
        left,
        top,
        width: 74,
        height: 112,
        opacity: interpolate(frame, [delay, delay + 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [delay, delay + 10], [0.56, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [delay, delay + 10],
          ["0px -24px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: `${rotate}deg`,
      }}
    >
      <svg
        width="74"
        height="112"
        viewBox="0 0 74 112"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="37"
          cy="19"
          r="13"
          fill={COLORS.backgroundCard}
          stroke={COLORS.ink}
          strokeWidth="7"
        />
        <path
          d="M37 35 V75 M16 54 L37 42 L58 54 M37 75 L18 104 M37 75 L57 104"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [delay + 2, delay + 14],
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

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
      }}
    >
      <BackgroundTreatment variant="grid" />

      <Interactive.Div
        name="Post-war timeline"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          translate: interpolate(
            frame,
            [0, 179],
            ["-20px 0px", "18px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <Interactive.Div
          name="Post-war milestone label"
          style={{
            position: "absolute",
            top: 184,
            left: 72,
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [23, 31], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [23, 35],
              ["0px 34px", "0px 0px"],
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
              width: 18,
              height: 92,
              backgroundColor: COLORS.orange,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 34,
                fontWeight: FONT.weights.bold,
                lineHeight: 1,
                letterSpacing: 2.8,
              }}
            >
              1945
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 68,
                fontWeight: FONT.weights.black,
                lineHeight: 1.05,
                letterSpacing: -1.8,
              }}
            >
              MỐC HẬU CHIẾN
            </div>
          </div>
        </Interactive.Div>

        <Interactive.Div
          name="Timeline paper"
          style={{
            position: "absolute",
            top: 382,
            left: 62,
            width: 956,
            height: 910,
            overflow: "hidden",
            border: `4px solid ${COLORS.ink}`,
            borderRadius: 12,
            backgroundColor: COLORS.backgroundCard,
            boxShadow: `14px 14px 0 ${COLORS.ink}`,
            opacity: interpolate(frame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [0, 17], [0.94, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            }),
          }}
        >
          <svg
            width="956"
            height="910"
            viewBox="0 0 956 910"
            fill="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
            }}
          >
            <path
              d="M92 332 H864"
              pathLength={1}
              stroke={COLORS.ink}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [2, 28], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />
            <path
              d="M833 304 L870 332 L833 360"
              pathLength={1}
              stroke={COLORS.ink}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [19, 31], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />

            <circle
              cx="184"
              cy="332"
              r={interpolate(frame, [8, 18], [0, 24], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              })}
              fill={COLORS.orange}
              stroke={COLORS.ink}
              strokeWidth="7"
            />
            <path
              d="M184 374 V432"
              pathLength={1}
              stroke={COLORS.ink}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [15, 25], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />

            <path
              d="M526 332 C571 298 610 250 662 220"
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [125, 139], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />
            <path
              d="M662 220 H733"
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [134, 143], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <path
              d="M796 220 H868"
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [143, 152], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
            <path
              d="M842 194 L873 220 L842 246"
              pathLength={1}
              stroke={COLORS.orange}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [149, 159], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />

            <path
              d="M748 190 L780 250 M780 190 L748 250"
              pathLength={1}
              stroke={COLORS.ink}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [145, 156], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />

            <path
              d="M526 332 C565 405 605 484 664 606"
              pathLength={1}
              stroke={COLORS.ink}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [125, 150], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
            />
            <path
              d="M638 578 L664 612 L676 570"
              pathLength={1}
              stroke={COLORS.ink}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={interpolate(frame, [144, 155], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />

            <circle
              cx="526"
              cy="332"
              r={interpolate(frame, [125, 136], [0, 19], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              })}
              fill={COLORS.orange}
              stroke={COLORS.ink}
              strokeWidth="7"
            />
          </svg>

          <Interactive.Div
            name="1945 marker"
            style={{
              position: "absolute",
              top: 424,
              left: 105,
              width: 160,
              padding: "10px 16px",
              border: `3px solid ${COLORS.ink}`,
              backgroundColor: COLORS.orange,
              color: COLORS.ink,
              fontSize: 35,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
              textAlign: "center",
              opacity: interpolate(frame, [12, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [12, 22],
                ["0px -18px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            1945
          </Interactive.Div>

          <Interactive.Div
            name="Home route label"
            style={{
              position: "absolute",
              top: 100,
              right: 72,
              padding: "9px 15px",
              border: `3px solid ${COLORS.orange}`,
              backgroundColor: COLORS.backgroundCard,
              color: COLORS.ink,
              fontSize: 28,
              fontWeight: FONT.weights.black,
              letterSpacing: 1.5,
              opacity: interpolate(frame, [125, 137], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [125, 139],
                ["-22px 0px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            QUÊ NHÀ
          </Interactive.Div>

          <Interactive.Div
            name="Settlement marker"
            style={{
              position: "absolute",
              top: 608,
              left: 605,
              width: 286,
              minHeight: 146,
              padding: "22px 20px 18px",
              border: `4px solid ${COLORS.ink}`,
              borderRadius: 8,
              backgroundColor: COLORS.background,
              boxShadow: `9px 9px 0 ${COLORS.orange}`,
              opacity: interpolate(frame, [58, 67], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              scale: interpolate(frame, [58, 72], [0.7, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
                output: "perceptual-scale",
              }),
              translate: interpolate(
                frame,
                [58, 72],
                ["0px 38px", "0px 0px"],
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
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 8,
                height: 56,
                marginBottom: 17,
              }}
            >
              {[44, 58, 38, 52].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  style={{
                    width: 45,
                    height,
                    border: `4px solid ${COLORS.ink}`,
                    borderBottom: 0,
                    backgroundColor:
                      index === 1 ? COLORS.orange : COLORS.backgroundCard,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                borderTop: `3px solid ${COLORS.ink}`,
                paddingTop: 12,
                fontSize: 31,
                fontWeight: FONT.weights.black,
                lineHeight: 1.05,
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              KHU ĐỊNH CƯ
            </div>
          </Interactive.Div>

          <PersonMarker
            name="Soldier marker one"
            delay={81}
            left={428}
            top={366}
            rotate={-4}
          />
          <PersonMarker
            name="Soldier marker two"
            delay={86}
            left={505}
            top={378}
            rotate={3}
          />
          <PersonMarker
            name="Soldier marker three"
            delay={91}
            left={574}
            top={371}
            rotate={-2}
          />

          <Interactive.Div
            name="Lowered weapon"
            style={{
              position: "absolute",
              top: 540,
              left: 193,
              width: 318,
              height: 160,
              opacity: interpolate(frame, [98, 106], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              translate: interpolate(
                frame,
                [98, 116],
                ["0px -36px", "0px 0px"],
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
                position: "absolute",
                top: 17,
                left: 28,
                width: 184,
                height: 17,
                borderRadius: 5,
                backgroundColor: COLORS.ink,
                rotate: interpolate(
                  frame,
                  [98, 116],
                  ["-18deg", "28deg"],
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
                  position: "absolute",
                  right: -45,
                  top: 4,
                  width: 58,
                  height: 9,
                  backgroundColor: COLORS.ink,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 70,
                  top: 12,
                  width: 18,
                  height: 42,
                  backgroundColor: COLORS.ink,
                  rotate: "18deg",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -30,
                  top: -8,
                  width: 44,
                  height: 34,
                  border: `8px solid ${COLORS.ink}`,
                  borderRight: 0,
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                left: 24,
                bottom: 0,
                padding: "10px 16px",
                border: `3px solid ${COLORS.orange}`,
                backgroundColor: COLORS.ink,
                color: COLORS.onDarkText,
                fontSize: 29,
                fontWeight: FONT.weights.black,
                lineHeight: 1,
                letterSpacing: 1.1,
              }}
            >
              HẠ VŨ KHÍ
            </div>
          </Interactive.Div>

          <Interactive.Div
            name="Far from home label"
            style={{
              position: "absolute",
              left: 590,
              top: 787,
              width: 308,
              padding: "13px 20px",
              border: `4px solid ${COLORS.ink}`,
              backgroundColor: COLORS.orange,
              color: COLORS.ink,
              fontSize: 38,
              fontWeight: FONT.weights.black,
              lineHeight: 1,
              letterSpacing: 2,
              textAlign: "center",
              opacity: interpolate(frame, [134, 143], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
              scale: interpolate(frame, [134, 148], [0.72, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
                output: "perceptual-scale",
              }),
              translate: interpolate(
                frame,
                [134, 148],
                ["0px 26px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
            }}
          >
            XA QUÊ
          </Interactive.Div>
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="Peel entrance"
        style={{
          position: "absolute",
          zIndex: 90,
          top: -70,
          left: -35,
          width: 1180,
          height: 2070,
          pointerEvents: "none",
          backgroundColor: COLORS.backgroundCard,
          borderLeft: `18px solid ${COLORS.orange}`,
          boxShadow: `-20px 0 0 rgba(20,20,20,0.18)`,
          translate: interpolate(
            frame,
            [0, 23],
            ["0px 0px", "1190px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.7, 0, 0.84, 0),
            },
          ),
          rotate: interpolate(frame, [0, 23], ["0deg", "-4deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.7, 0, 0.84, 0),
          }),
        }}
      />
    </AbsoluteFill>
  );
};