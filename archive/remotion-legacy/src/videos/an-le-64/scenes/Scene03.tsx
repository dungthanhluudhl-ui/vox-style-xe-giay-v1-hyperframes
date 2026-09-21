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
import {MediaAssembler} from "../../../components/MediaAssembler";
import {DissolveEntrance} from "../../../components/SceneTransitions";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const ArrestShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Công an ập vào bắt giữ"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 12, 45, 56],
          [
            "0px 1920px",
            "0px 0px",
            "0px 0px",
            "-1080px 0px",
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
      }}
    >
      <MediaAssembler
        kind="image"
        src={staticFile(
          "videos/an-le-64/media/images/img-01-police-arresting-suspect-night.jpeg",
        )}
        durationInFrames={57}
        cameraMotion="zoom-in"
        objectPosition="50% 49%"
        cropLeft={0.01}
        cropRight={0.01}
        cropTop={0.005}
        cropBottom={0.005}
        contrast={1.14}
      />

      <Interactive.Div
        name="Cạnh phải chuẩn bị chuyển cảnh"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 330,
          backgroundImage:
            "linear-gradient(90deg, rgba(20,20,20,0), rgba(20,20,20,0.72))",
          opacity: interpolate(frame, [31, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />
    </Interactive.Div>
  );
};

const CourtShot: React.FC = () => {
  const frame = useCurrentFrame();
  const shadowOffset = interpolate(frame, [0, 11], [-28, -14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const shadowOpacity = interpolate(frame, [0, 11], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Interactive.Div
      name="Phòng xử án lấn khung bắt giữ"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: interpolate(frame, [0, 11], [1080, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        boxShadow: `${shadowOffset}px 0px 0px rgba(255,106,26,${shadowOpacity})`,
        opacity: interpolate(frame, [137, 148], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 1080,
        }}
      >
        <MediaAssembler
          kind="image"
          src={staticFile(
            "videos/an-le-64/media/images/img-09-terrified-defendant-courtroom-trial.jpeg",
          )}
          durationInFrames={137}
          cameraMotion="zoom-in"
          objectPosition="50% 47%"
          cropLeft={0.01}
          cropRight={0.01}
          cropTop={0.005}
          cropBottom={0.005}
          contrast={1.12}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to bottom, rgba(20,20,20,0.08) 0%, rgba(20,20,20,0) 43%, rgba(20,20,20,0.34) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 12,
          backgroundColor: COLORS.orange,
        }}
      />
    </Interactive.Div>
  );
};

const KidnappingCharge: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Tội danh bắt cóc"
      style={{
        position: "absolute",
        top: 228,
        left: 62,
        right: 62,
        boxSizing: "border-box",
        padding: "25px 32px 30px",
        border: `6px solid ${COLORS.ink}`,
        borderRadius: 12,
        backgroundColor: COLORS.orange,
        boxShadow: `14px 14px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 70,
        lineHeight: 1.08,
        letterSpacing: -1.8,
        textAlign: "center",
        opacity: interpolate(
          frame,
          [0, 5, 80, 91],
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
          [0, 7, 14, 80, 91],
          [0.64, 1.07, 1, 1, 1.05],
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
          [0, 11],
          ["0px 48px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: interpolate(
          frame,
          [0, 12],
          ["-3deg", "-0.8deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      BẮT CÓC NHẰM
      <br />
      CHIẾM ĐOẠT
      <br />
      TÀI SẢN
    </Interactive.Div>
  );
};

const JusticeSystemShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dissolve sang hệ thống tư pháp"
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(frame, [0, 11], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <DissolveEntrance name="Hệ thống tư pháp khép lại">
        <Interactive.Div
          name="Ảnh hệ thống tư pháp"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            scale: interpolate(
              frame,
              [0, 111],
              [1.1, 1.02],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            ),
          }}
        >
          <MediaAssembler
            kind="image"
            src={staticFile(
              "videos/an-le-64/media/images/img-02-police-arrest-suspect-cutout.jpeg",
            )}
            durationInFrames={112}
            cameraMotion="none"
            objectPosition="50% 49%"
            cropLeft={0.008}
            cropRight={0.008}
            cropTop={0.004}
            cropBottom={0.004}
            contrast={1.12}
          />
        </Interactive.Div>

        <Interactive.Div
          name="Spotlight khép lại"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 50% 44%, rgba(20,20,20,0) 22%, rgba(20,20,20,0.2) 61%, rgba(20,20,20,0.82) 100%)",
            opacity: interpolate(frame, [60, 111], [0.15, 0.72], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            pointerEvents: "none",
          }}
        />
      </DissolveEntrance>
    </Interactive.Div>
  );
};

const QuestionIcon: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dấu hỏi bàng hoàng"
      style={{
        position: "absolute",
        top: 430,
        right: 92,
        width: 178,
        height: 220,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.65, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 12, 42, 72, 111],
          [
            "0px 30px",
            "0px 0px",
            "0px -8px",
            "0px 5px",
            "0px -5px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.42, 0, 0.58, 1),
              Easing.bezier(0.42, 0, 0.58, 1),
              Easing.bezier(0.42, 0, 0.58, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 12, 42, 72, 111],
          ["-12deg", "-3deg", "2deg", "-2deg", "2deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.42, 0, 0.58, 1),
              Easing.bezier(0.42, 0, 0.58, 1),
              Easing.bezier(0.42, 0, 0.58, 1),
            ],
          },
        ),
      }}
    >
      <svg
        width="178"
        height="220"
        viewBox="0 0 178 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M31 63 C37 20 134 14 148 65 C159 106 119 120 96 137 C82 147 80 158 80 169"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={27}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 18], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={interpolate(frame, [0, 4], [0, 0.55], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
        <path
          d="M23 55 C29 12 126 6 140 57 C151 98 111 112 88 129 C74 139 72 150 72 161"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 18], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <circle
          cx="72"
          cy="198"
          r={interpolate(frame, [14, 22], [0, 14], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          })}
          fill={COLORS.orange}
          stroke={COLORS.ink}
          strokeWidth={7}
        />
      </svg>
    </Interactive.Div>
  );
};

const StatusReversalFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const accusedShadowOffset = interpolate(frame, [7, 27], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <Interactive.Div
      name="Người cho vay trở thành bị cáo"
      style={{
        position: "absolute",
        top: 1110,
        left: 54,
        right: 54,
        height: 210,
        boxSizing: "border-box",
        padding: "22px 24px 32px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 15,
        backgroundColor: "rgba(245,240,228,0.94)",
        boxShadow: `12px 12px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 11],
          ["0px 54px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        scale: interpolate(frame, [0, 12], [0.88, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
      }}
    >
      <div
        style={{
          height: 112,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Interactive.Div
          name="Vị thế người cho vay thu hẹp"
          style={{
            width: interpolate(frame, [7, 27], [455, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            minWidth: 0,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px 16px",
            border: `4px solid ${COLORS.ink}`,
            borderRadius: 8,
            backgroundColor: COLORS.backgroundCard,
            color: COLORS.ink,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: interpolate(frame, [7, 27], [35, 28], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            lineHeight: 1.05,
            textAlign: "center",
            whiteSpace: "nowrap",
            opacity: interpolate(frame, [13, 31], [1, 0.58], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NGƯỜI CHO VAY
        </Interactive.Div>

        <div
          style={{
            width: 72,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: COLORS.orange,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 58,
            lineHeight: 1,
          }}
        >
          →
        </div>

        <Interactive.Div
          name="Vị thế bị cáo mở rộng"
          style={{
            width: interpolate(frame, [7, 27], [300, 455], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            minWidth: 0,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px 16px",
            border: `4px solid ${COLORS.ink}`,
            borderRadius: 8,
            backgroundColor: COLORS.orange,
            color: COLORS.ink,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: interpolate(frame, [7, 27], [31, 42], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            lineHeight: 1.05,
            textAlign: "center",
            whiteSpace: "nowrap",
            boxShadow: `${accusedShadowOffset}px ${accusedShadowOffset}px 0px ${COLORS.ink}`,
          }}
        >
          BỊ CÁO
        </Interactive.Div>
      </div>

      <svg
        width="924"
        height="44"
        viewBox="0 0 924 44"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 24,
          bottom: 10,
        }}
      >
        <path
          d="M10 14 C184 31 382 13 535 22 C682 31 791 18 914 14"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [20, 39], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={0.55}
        />
        <path
          d="M10 8 C184 25 382 7 535 16 C682 25 791 12 914 8"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [20, 39], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

export const Scene03: React.FC = () => {
  useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <Sequence
        name="S03-1 · Công an ập vào"
        durationInFrames={57}
      >
        <ArrestShot />
      </Sequence>

      <Sequence
        name="S03-2 · Phòng xử án lấn khung"
        from={45}
        durationInFrames={149}
      >
        <CourtShot />
      </Sequence>

      <Sequence
        name="S03-3 · Hệ thống tư pháp"
        from={182}
        durationInFrames={112}
      >
        <JusticeSystemShot />
      </Sequence>

      <BackgroundTreatment variant="spotlight" />

      <Sequence
        name="Punch phrase · Tội danh"
        from={90}
        durationInFrames={92}
        layout="none"
      >
        <KidnappingCharge />
      </Sequence>

      <Sequence
        name="Dấu hỏi bàng hoàng"
        from={182}
        durationInFrames={112}
        layout="none"
      >
        <QuestionIcon />
      </Sequence>

      <Sequence
        name="Đảo vị thế"
        from={239}
        durationInFrames={55}
        layout="none"
      >
        <StatusReversalFlow />
      </Sequence>
    </AbsoluteFill>
  );
};