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
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {MediaAssembler} from "../../../components/MediaAssembler";
import {COLORS, FONT, fontFamily} from "../../../styles/theme";

const UnfoldAccountShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Ảnh tài khoản mở theo trục dọc"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 11], ["1 0.03", "1 1"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        transformOrigin: "50% 50%",
      }}
    >
      <Interactive.Div
        name="Ảnh tài khoản mở theo trục ngang"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          scale: interpolate(frame, [9, 24], ["0.06 1", "1 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
          transformOrigin: "50% 50%",
        }}
      >
        <MediaAssembler
          kind="image"
          src={staticFile(
            "videos/an-le-64/media/images/img-03-man-smartphone-screen-glow-cutout.jpeg",
          )}
          durationInFrames={83}
          cameraMotion="zoom-in"
          objectPosition="50% 49%"
          cropLeft={0.006}
          cropRight={0.006}
          cropTop={0.004}
          cropBottom={0.004}
          contrast={1.1}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to bottom, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0) 36%, rgba(20,20,20,0.28) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>
    </Interactive.Div>
  );
};

const ProfileDissolveShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Dissolve sang hồ sơ Zalo"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
      }}
    >
      <CanvasImage
        src={staticFile(
          "videos/an-le-64/media/images/img-03-man-smartphone-screen-glow-cutout.jpeg",
        )}
        cropLeft={0.006}
        cropRight={0.006}
        cropTop={0.004}
        cropBottom={0.004}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 49%",
          filter: "contrast(1.1)",
          scale: 1.11,
        }}
      />

      <Interactive.Div
        name="Trang cá nhân xuất hiện"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 49], [1.1, 1.06], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
          translate: interpolate(
            frame,
            [0, 49],
            ["32px 0px", "-22px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <CanvasImage
          src={staticFile(
            "videos/an-le-64/media/images/img-05-online-scam-dating-profile.jpeg",
          )}
          cropLeft={0.006}
          cropRight={0.006}
          cropTop={0.004}
          cropBottom={0.004}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "53% 50%",
            filter: "contrast(1.09)",
          }}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to bottom, rgba(20,20,20,0.16), rgba(20,20,20,0) 45%, rgba(20,20,20,0.3))",
          pointerEvents: "none",
        }}
      />
    </Interactive.Div>
  );
};

const ScamVideoShot: React.FC = () => {
  return (
    <Interactive.Div
      name="Video thao tác trên hồ sơ"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: COLORS.ink,
      }}
    >
      <MediaAssembler
        kind="video"
        src={staticFile(
          "videos/an-le-64/media/videos/vid-04-online-scam-phone-blue-fire.mp4",
        )}
        durationInFrames={64}
        trimBefore={3.7 * 30}
        trimAfter={5.84 * 30}
        cameraMotion="none"
        objectPosition="50% 50%"
        contrast={1.1}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to bottom, rgba(20,20,20,0.18), rgba(20,20,20,0) 42%, rgba(20,20,20,0.3))",
          pointerEvents: "none",
        }}
      />
    </Interactive.Div>
  );
};

const PhoneMechanism: React.FC<{frame: number}> = ({frame}) => {
  return (
    <Interactive.Div
      name="Khung điện thoại xuyên suốt"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 270,
        left: 150,
        width: 780,
        height: 1040,
        opacity: interpolate(frame, [30, 35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [30, 42], ["1 0.03", "1 1"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        transformOrigin: "50% 50%",
        pointerEvents: "none",
      }}
    >
      <Interactive.Div
        name="Khung điện thoại mở ngang"
        style={{
          position: "absolute",
          inset: 0,
          boxSizing: "border-box",
          overflow: "visible",
          border: `8px solid ${COLORS.ink}`,
          borderRadius: 54,
          boxShadow: `14px 14px 0 ${COLORS.orange}`,
          scale: interpolate(frame, [39, 51], ["0.08 1", "1 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          }),
          transformOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -8,
            left: 244,
            width: 292,
            height: 34,
            borderRight: `8px solid ${COLORS.ink}`,
            borderBottom: `8px solid ${COLORS.ink}`,
            borderLeft: `8px solid ${COLORS.ink}`,
            borderRadius: "0 0 22px 22px",
            backgroundColor: COLORS.orange,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 10,
            left: 326,
            width: 128,
            height: 8,
            borderRadius: 8,
            backgroundColor: COLORS.ink,
          }}
        />

        <Interactive.Div
          name="Plate kem trung hòa nội dung nguồn"
          style={{
            position: "absolute",
            top: 50,
            left: 28,
            right: 28,
            height: 174,
            boxSizing: "border-box",
            padding: "28px 30px",
            border: `4px solid ${COLORS.ink}`,
            borderRadius: 20,
            backgroundColor: "rgba(245,240,228,0.9)",
            opacity: interpolate(
              frame,
              [30, 42, 118, 133],
              [0, 1, 1, 0.56],
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
        >
          <div
            style={{
              width: 210,
              height: 16,
              marginBottom: 24,
              borderRadius: 8,
              backgroundColor: COLORS.orange,
            }}
          />
          <div
            style={{
              width: "82%",
              height: 11,
              marginBottom: 18,
              borderRadius: 7,
              backgroundColor: COLORS.ink,
            }}
          />
          <div
            style={{
              width: "58%",
              height: 9,
              borderRadius: 7,
              backgroundColor: "rgba(20,20,20,0.38)",
            }}
          />
        </Interactive.Div>
      </Interactive.Div>
    </Interactive.Div>
  );
};

const BorrowedIdentityLabel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Nhãn danh tính mượn"
      style={{
        position: "absolute",
        zIndex: 34,
        top: 1004,
        left: 42,
        width: 438,
        boxSizing: "border-box",
        padding: "16px 20px 18px",
        border: `4px solid ${COLORS.orange}`,
        borderRadius: 8,
        backgroundColor: "rgba(20,20,20,0.92)",
        boxShadow: `9px 9px 0 ${COLORS.orange}`,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 39,
        lineHeight: 1.05,
        letterSpacing: 0.6,
        textAlign: "center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(frame, [0, 12], ["-48px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        rotate: interpolate(frame, [0, 12], ["-4deg", "-1deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      DANH TÍNH MƯỢN

      <svg
        width="330"
        height="180"
        viewBox="0 0 330 180"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -170,
          left: 284,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <path
          d="M8 168 C72 132 105 82 164 56 C211 35 258 37 312 16"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={15}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 22], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={0.55}
        />
        <path
          d="M8 160 C72 124 105 74 164 48 C211 27 258 29 312 8"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [5, 22], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M284 3 L315 7 L298 34"
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(frame, [18, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

const ProfileCardOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Card hồ sơ của L"
      style={{
        position: "absolute",
        zIndex: 36,
        top: 430,
        left: 262,
        width: 556,
        height: 252,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: 30,
        padding: "28px 34px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 20,
        backgroundColor: "rgba(245,240,228,0.9)",
        boxShadow: `11px 11px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(frame, [0, 12], ["0px 34px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      <Interactive.Div
        name="Ảnh đại diện được khoanh"
        style={{
          position: "relative",
          flex: "0 0 auto",
          width: 132,
          height: 132,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `5px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor: COLORS.backgroundCard,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 72,
          lineHeight: 1,
          scale: interpolate(
            frame,
            [10, 14, 20],
            [1, 1.06, 1],
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
        }}
      >
        L

        <svg
          width="166"
          height="166"
          viewBox="0 0 166 166"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -17,
            pointerEvents: "none",
          }}
        >
          <circle
            cx="83"
            cy="83"
            r="73"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [10, 23], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}
          />
        </svg>
      </Interactive.Div>

      <div style={{flex: 1}}>
        <div
          style={{
            width: 228,
            height: 19,
            marginBottom: 24,
            borderRadius: 10,
            backgroundColor: COLORS.ink,
          }}
        />
        <div
          style={{
            width: "100%",
            height: 11,
            marginBottom: 17,
            borderRadius: 8,
            backgroundColor: "rgba(20,20,20,0.38)",
          }}
        />
        <div
          style={{
            width: "72%",
            height: 11,
            borderRadius: 8,
            backgroundColor: "rgba(20,20,20,0.28)",
          }}
        />
      </div>
    </Interactive.Div>
  );
};

const FriendButton: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Nút kết bạn"
      style={{
        position: "absolute",
        zIndex: 42,
        top: 720,
        left: 357,
        width: 366,
        height: 108,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        overflow: "hidden",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 16,
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `10px 10px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 43,
        lineHeight: 1,
        letterSpacing: 1,
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [0, 5, 9, 15],
          [0.72, 1, 0.92, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.orange,
          opacity: interpolate(frame, [5, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />

      <span style={{position: "relative", zIndex: 1}}>KẾT BẠN</span>

      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          opacity: interpolate(frame, [6, 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <path
          d="M7 25 L19 37 L42 10"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [6, 17], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
      </svg>
    </Interactive.Div>
  );
};

const TrapPunchPhrase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Punch phrase · Mồi ảo"
      style={{
        position: "absolute",
        zIndex: 50,
        top: 154,
        left: 336,
        width: 408,
        boxSizing: "border-box",
        padding: "19px 26px 23px",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 10,
        backgroundColor: "rgba(20,20,20,0.94)",
        boxShadow: `11px 11px 0 ${COLORS.orange}`,
        color: COLORS.onDarkText,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 70,
        lineHeight: 1,
        letterSpacing: 0.8,
        textAlign: "center",
        opacity: interpolate(frame, [0, 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(
          frame,
          [0, 5, 11],
          [0.55, 1.08, 1],
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
        rotate: interpolate(frame, [0, 11], ["-5deg", "-1deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      MỒI ẢO
    </Interactive.Div>
  );
};

const ChatThread: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Chuỗi chat nối sang con nợ"
      style={{
        position: "absolute",
        zIndex: 44,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <Interactive.Div
        name="Điểm phát từ hồ sơ"
        style={{
          position: "absolute",
          top: 922,
          left: 238,
          width: 116,
          height: 116,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `5px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor: COLORS.backgroundCard,
          boxShadow: `8px 8px 0 ${COLORS.orange}`,
          color: COLORS.ink,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 58,
          lineHeight: 1,
          scale: interpolate(frame, [0, 10], [0.58, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          }),
        }}
      >
        L
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
        }}
      >
        <path
          d="M360 972 C454 918 540 920 650 955"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 14], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={0.55}
        />
        <path
          d="M356 964 C450 910 536 912 646 947"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 14], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M620 925 L653 950 L615 963"
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={interpolate(frame, [11, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </svg>

      <Interactive.Div
        name="Điện thoại phía con nợ"
        style={{
          position: "absolute",
          top: 846,
          left: 646,
          width: 218,
          height: 350,
          boxSizing: "border-box",
          overflow: "hidden",
          border: `6px solid ${COLORS.ink}`,
          borderRadius: 30,
          backgroundColor: "rgba(245,240,228,0.94)",
          boxShadow: `10px 10px 0 ${COLORS.orange}`,
          scale: interpolate(frame, [3, 13], [0.72, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 15,
            left: 76,
            width: 66,
            height: 7,
            borderRadius: 7,
            backgroundColor: COLORS.ink,
          }}
        />

        <Interactive.Div
          name="Tin nhắn đầu tiên"
          style={{
            position: "absolute",
            top: 66,
            left: 22,
            width: 142,
            height: 70,
            boxSizing: "border-box",
            padding: "17px 18px",
            border: `3px solid ${COLORS.ink}`,
            borderRadius: "18px 18px 18px 5px",
            backgroundColor: COLORS.backgroundCard,
            opacity: interpolate(frame, [8, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(
              frame,
              [8, 16],
              ["-70px 0px", "0px 0px"],
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
              width: 92,
              height: 9,
              marginBottom: 10,
              borderRadius: 6,
              backgroundColor: COLORS.ink,
            }}
          />
          <div
            style={{
              width: 65,
              height: 7,
              borderRadius: 6,
              backgroundColor: "rgba(20,20,20,0.35)",
            }}
          />
        </Interactive.Div>

        <Interactive.Div
          name="Tin nhắn có biểu tượng tim"
          style={{
            position: "absolute",
            top: 166,
            right: 20,
            width: 132,
            height: 92,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: `3px solid ${COLORS.ink}`,
            borderRadius: "18px 18px 5px 18px",
            backgroundColor: COLORS.orange,
            color: COLORS.ink,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 54,
            lineHeight: 1,
            opacity: interpolate(frame, [20, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(
              frame,
              [20, 25, 31],
              [0.55, 1.08, 1],
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
              [20, 29],
              ["58px 0px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({damping: 200}),
              },
            ),
          }}
        >
          ♥
        </Interactive.Div>
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: COLORS.backgroundCard,
        isolation: "isolate",
      }}
    >
      <Sequence name="S07-1 · Mượn tài khoản" durationInFrames={83}>
        <UnfoldAccountShot />
      </Sequence>

      <Sequence
        name="S07-2 · Danh tính hồ sơ"
        from={83}
        durationInFrames={50}
      >
        <ProfileDissolveShot />
      </Sequence>

      <Sequence
        name="S07-3 · Kết bạn và nhắn tin"
        from={133}
        durationInFrames={64}
      >
        <ScamVideoShot />
      </Sequence>

      <BackgroundTreatment variant="card" />

      <PhoneMechanism frame={frame} />

      <Sequence
        name="Nhãn danh tính mượn"
        from={37}
        durationInFrames={46}
        layout="none"
      >
        <BorrowedIdentityLabel />
      </Sequence>

      <Sequence
        name="Card hồ sơ trong điện thoại"
        from={83}
        durationInFrames={50}
        layout="none"
      >
        <ProfileCardOverlay />
      </Sequence>

      <Sequence
        name="Nút kết bạn"
        from={147}
        durationInFrames={50}
        layout="none"
      >
        <FriendButton />
      </Sequence>

      <Sequence
        name="Punch phrase · Mồi ảo"
        from={149}
        durationInFrames={48}
        layout="none"
      >
        <TrapPunchPhrase />
      </Sequence>

      <Sequence
        name="Chuỗi chat thả thính"
        from={152}
        durationInFrames={45}
        layout="none"
      >
        <ChatThread />
      </Sequence>
    </AbsoluteFill>
  );
};