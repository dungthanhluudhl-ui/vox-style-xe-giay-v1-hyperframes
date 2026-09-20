import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../components/BackgroundTreatment";
import {SimpleIcon} from "../components/LightOverlay";
import {MediaAssembler} from "../components/MediaAssembler";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../styles/theme";

const LoanVideoShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Khoản vay 150 triệu"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 16],
          ["0px -112px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        transformOrigin: "50% 0%",
        transform: `perspective(1600px) rotateX(${interpolate(
          frame,
          [0, 16],
          [-78, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        )}deg)`,
      }}
    >
      <MediaAssembler
        kind="video"
        src={staticFile(
          "media/videos/vid-05-man-demanding-extortion-money.mp4",
        )}
        durationInFrames={110}
        trimBefore={2.1 * 30}
        trimAfter={5.78 * 30}
        cameraMotion="none"
        objectPosition="50% 50%"
        contrast={1.08}
      />

      <Interactive.Div
        name="Nếp gấp bóc giấy"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: interpolate(frame, [0, 16], [180, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
          backgroundImage:
            "linear-gradient(to bottom, rgba(245,240,228,0.88), rgba(20,20,20,0.22), rgba(20,20,20,0))",
          opacity: interpolate(frame, [0, 13], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 520,
          backgroundImage:
            "linear-gradient(to bottom, rgba(20,20,20,0), rgba(20,20,20,0.48))",
          pointerEvents: "none",
        }}
      />
    </Interactive.Div>
  );
};

const DebtCollectionShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Chuỗi đòi nợ không hồi đáp"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        opacity: interpolate(frame, [0, 9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <MediaAssembler
        kind="image"
        src={staticFile(
          "media/images/img-06-suspect-looking-back-dark-alley.jpeg",
        )}
        durationInFrames={54}
        cameraMotion="pan-right"
        objectPosition="56% 50%"
        cropTop={0.006}
        cropBottom={0.006}
        contrast={1.1}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(135deg, rgba(20,20,20,0.26) 0%, rgba(20,20,20,0) 48%, rgba(20,20,20,0.2) 100%)",
          pointerEvents: "none",
        }}
      />

      <Interactive.Div
        name="Nhãn khoản nợ mắc kẹt"
        style={{
          position: "absolute",
          zIndex: 4,
          top: 238,
          left: 62,
          padding: "17px 23px 19px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 7,
          backgroundColor: COLORS.backgroundCard,
          boxShadow: `9px 9px 0 ${COLORS.orange}`,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 38,
          lineHeight: 1.05,
          letterSpacing: 0.7,
          opacity: interpolate(frame, [9, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [9, 21],
            ["-42px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(frame, [9, 21], ["-4deg", "-1deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
        }}
      >
        KHOẢN NỢ MẮC KẸT
      </Interactive.Div>
    </Interactive.Div>
  );
};

const DisappearanceShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dấu vết biến mất trong hẻm"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
      }}
    >
      <CanvasImage
        src={staticFile(
          "media/images/img-06-suspect-looking-back-dark-alley.jpeg",
        )}
        cropTop={0.006}
        cropBottom={0.006}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "56% 50%",
          filter: "contrast(1.1)",
          scale: 1.1,
          translate: "34px 0px",
        }}
      />

      <Interactive.Div
        name="Ảnh nghi phạm ẩn trong hẻm"
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <MediaAssembler
          kind="image"
          src={staticFile(
            "media/images/img-07-suspect-hiding-dark-alley.jpeg",
          )}
          durationInFrames={45}
          cameraMotion="zoom-in"
          objectPosition="50% 53%"
          cropTop={0.006}
          cropBottom={0.006}
          contrast={1.1}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Hẻm tối nuốt dấu vết"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 51% 48%, rgba(20,20,20,0) 24%, rgba(20,20,20,0.24) 66%, rgba(20,20,20,0.72) 100%)",
          opacity: interpolate(frame, [0, 44], [0.35, 0.72], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          pointerEvents: "none",
        }}
      />

      <Interactive.Div
        name="Nhãn dấu vết đứt"
        style={{
          position: "absolute",
          zIndex: 4,
          top: 246,
          right: 66,
          padding: "17px 23px 19px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 7,
          backgroundColor: COLORS.backgroundCard,
          boxShadow: `9px 9px 0 ${COLORS.orange}`,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 39,
          lineHeight: 1.05,
          letterSpacing: 0.8,
          opacity: interpolate(frame, [0, 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 12],
            ["42px 0px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
          rotate: interpolate(frame, [0, 12], ["4deg", "1deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
        }}
      >
        DẤU VẾT ĐỨT
      </Interactive.Div>

      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <path
          d="M790 342 C824 422 864 544 866 690 C868 812 844 982 812 1188"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 25], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={0.5}
        />
        <path
          d="M782 334 C816 414 856 536 858 682 C860 804 836 974 804 1180"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 25], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

const LoanTimeline: React.FC<{frame: number}> = ({frame}) => {
  const breakTranslate = interpolate(frame, [184, 199], [0, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Interactive.Div
      name="Dòng thời gian khoản vay"
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
          d="M90 1240 C278 1214 418 1254 585 1236 C674 1227 738 1234 805 1238"
          pathLength={1}
          stroke={COLORS.backgroundCard}
          strokeWidth={24}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [8, 100], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={0.72}
        />
        <path
          d="M90 1232 C278 1206 418 1246 585 1228 C674 1219 738 1226 805 1230"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [8, 100], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <circle
          cx="116"
          cy="1229"
          r={interpolate(frame, [9, 18], [0, 22], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={7}
        />

        {[0, 1, 2].map((index) => {
          const markerFrame = 131 + index * 6;
          const x = 520 + index * 94;

          return (
            <g key={`collection-marker-${index}`}>
              <path
                d={`M${x} 1168 L${x} 1284`}
                pathLength={1}
                stroke={COLORS.backgroundCard}
                strokeWidth={17}
                strokeLinecap="round"
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [markerFrame, markerFrame + 8],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                )}
                opacity={0.76}
              />
              <path
                d={`M${x} 1168 L${x} 1284`}
                pathLength={1}
                stroke={COLORS.ink}
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [markerFrame, markerFrame + 8],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                )}
              />
              <path
                d={`M${x - 19} 1162 L${x + 21} 1195`}
                pathLength={1}
                stroke={COLORS.orange}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [markerFrame + 5, markerFrame + 12],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                )}
              />
            </g>
          );
        })}

        <path
          d="M804 1230 C835 1233 855 1227 875 1228"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [96, 109], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        <g transform={`translate(${breakTranslate} 0)`}>
          <path
            d="M899 1228 C936 1228 965 1222 1006 1211"
            pathLength={1}
            stroke={COLORS.backgroundCard}
            strokeWidth={24}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [98, 110], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}
            opacity={interpolate(frame, [184, 199], [0.72, 0.12], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <path
            d="M899 1220 C936 1220 965 1214 1006 1203"
            pathLength={1}
            stroke={COLORS.ink}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [98, 110], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}
            opacity={interpolate(frame, [184, 199], [1, 0.15], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </g>

        <path
          d="M870 1205 L895 1248"
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          opacity={interpolate(frame, [181, 188], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
        <path
          d="M884 1203 L909 1246"
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          opacity={interpolate(frame, [183, 190], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

const MoneyMilestone: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Mốc khoản vay"
      style={{
        position: "absolute",
        zIndex: 24,
        left: 178,
        top: 1080,
        width: 116,
        height: 116,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: "50%",
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.62, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        rotate: interpolate(frame, [0, 12], ["-10deg", "-2deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      <SimpleIcon icon="money" size={72} color={COLORS.ink} />

      <div
        style={{
          position: "absolute",
          right: 12,
          bottom: 12,
          width: 17,
          height: 17,
          borderRadius: "50%",
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
        backgroundColor: COLORS.ink,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <Sequence
        name="S05-1 · Khoản vay 150 triệu"
        durationInFrames={110}
      >
        <LoanVideoShot />
      </Sequence>

      <Sequence
        name="S05-2 · Chuỗi đòi nợ"
        from={101}
        durationInFrames={54}
      >
        <DebtCollectionShot />
      </Sequence>

      <Sequence
        name="S05-3 · Dấu vết biến mất"
        from={155}
        durationInFrames={45}
      >
        <DisappearanceShot />
      </Sequence>

      <BackgroundTreatment variant="grid" />

      <LoanTimeline frame={frame} />

      <Sequence
        name="Icon mốc khoản vay"
        from={53}
        durationInFrames={57}
        layout="none"
      >
        <MoneyMilestone />
      </Sequence>
    </AbsoluteFill>
  );
};