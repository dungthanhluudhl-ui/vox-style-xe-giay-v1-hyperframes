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

const SCENE_DURATION = 307;
const STRIKE_FRAME = 66;
const PEEL_FRAME = 96;
const STAMP_FRAME = 148;
const TILES_FRAME = 180;
const PUNCH_FRAME = 230;
const CHECK_FRAME = 245;

const PaperTexture: React.FC<{dark?: boolean}> = ({dark = false}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 0.13 : 0.18,
          pointerEvents: "none",
          backgroundImage: dark
            ? "radial-gradient(circle at 28% 32%, rgba(247,244,236,0.52) 0 1px, transparent 1.5px), repeating-linear-gradient(-3deg, transparent 0 15px, rgba(247,244,236,0.12) 16px)"
            : "radial-gradient(circle at 22% 31%, rgba(20,20,20,0.38) 0 1px, transparent 1.5px), repeating-linear-gradient(3deg, transparent 0 14px, rgba(20,20,20,0.07) 15px)",
          backgroundSize: "23px 23px, 100% 16px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 54,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: dark ? 0.2 : 0.17,
          pointerEvents: "none",
        }}
      >
        {[100, 93, 97, 76].map((width, index) => (
          <div
            key={`${width}-${index}`}
            style={{
              width: `${width}%`,
              height: 5,
              backgroundColor: dark
                ? COLORS.onDarkText
                : COLORS.ink,
            }}
          />
        ))}
      </div>
    </>
  );
};

const ArchiveBackSheet: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Archive back sheet"
      style={{
        position: "absolute",
        zIndex: 2,
        top: 310,
        left: 111,
        width: 858,
        height: 1040,
        overflow: "hidden",
        border: `4px solid ${COLORS.ink}`,
        borderRadius: 6,
        backgroundColor: "#D8D2C5",
        boxShadow: `14px 14px 0 rgba(20,20,20,0.2)`,
        opacity: interpolate(frame, [0, 9], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0, 16, SCENE_DURATION - 1],
          ["0px 84px", "0px 0px", "0px -8px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
        rotate: interpolate(
          frame,
          [0, 16, SCENE_DURATION - 1],
          ["-4deg", "-2.2deg", "-1.3deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <PaperTexture />
    </Interactive.Div>
  );
};

const OfficialDecision: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Official naming decision"
      style={{
        position: "absolute",
        zIndex: 4,
        top: 326,
        left: 104,
        width: 872,
        height: 1036,
        overflow: "hidden",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 7,
        backgroundColor: COLORS.backgroundCard,
        boxShadow: `15px 15px 0 ${COLORS.ink}`,
        opacity: interpolate(frame, [104, 116], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [104, 123], [0.94, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [
            104,
            123,
            STAMP_FRAME,
            STAMP_FRAME + 2,
            STAMP_FRAME + 5,
            STAMP_FRAME + 9,
            SCENE_DURATION - 1,
          ],
          [
            "0px 58px",
            "0px 0px",
            "0px 0px",
            "-9px 7px",
            "6px -4px",
            "0px 0px",
            "0px -7px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        rotate: interpolate(
          frame,
          [
            104,
            123,
            STAMP_FRAME,
            STAMP_FRAME + 2,
            STAMP_FRAME + 6,
            SCENE_DURATION - 1,
          ],
          ["1.8deg", "0.8deg", "0.8deg", "-0.3deg", "0.7deg", "0.2deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
      }}
    >
      <PaperTexture />

      <div
        style={{
          position: "absolute",
          top: 48,
          left: 58,
          right: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 22,
          borderBottom: `4px solid ${COLORS.ink}`,
          fontSize: 23,
          fontWeight: FONT.weights.black,
          letterSpacing: 3.2,
        }}
      >
        <span>QUYẾT ĐỊNH ĐỊA DANH</span>
        <span>1945 — NAY</span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 142,
          left: 58,
          padding: "8px 13px",
          backgroundColor: COLORS.ink,
          color: COLORS.onDarkText,
          fontSize: 23,
          fontWeight: FONT.weights.black,
          letterSpacing: 2.5,
        }}
      >
        YT1
      </div>

      <Interactive.Div
        name="Government authority line"
        style={{
          position: "absolute",
          top: 147,
          right: 59,
          fontSize: 24,
          fontWeight: FONT.weights.bold,
          letterSpacing: 1.8,
          opacity: interpolate(frame, [122, 132], [0, 0.72], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        CƠ QUAN HÀNH CHÍNH
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 242,
          left: 58,
          right: 58,
          height: 2,
          backgroundColor: "rgba(20,20,20,0.24)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 285,
          left: 58,
          fontSize: 25,
          fontWeight: FONT.weights.bold,
          letterSpacing: 2.2,
          opacity: 0.62,
        }}
      >
        TÊN ĐƯỢC XÁC LẬP
      </div>
    </Interactive.Div>
  );
};

const OldNameFile: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Old name file"
      style={{
        position: "absolute",
        zIndex: 20,
        top: 278,
        left: 80,
        width: 920,
        height: 936,
        overflow: "hidden",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 6,
        backgroundColor: COLORS.ink,
        color: COLORS.onDarkText,
        boxShadow: `17px 17px 0 ${COLORS.orange}`,
        transformOrigin: "right center",
        opacity: interpolate(
          frame,
          [0, 5, PEEL_FRAME + 25, PEEL_FRAME + 38],
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
        scale: interpolate(frame, [0, 13], [1.09, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [
            0,
            13,
            PEEL_FRAME,
            PEEL_FRAME + 18,
            PEEL_FRAME + 38,
          ],
          [
            "0px -210px",
            "0px 0px",
            "0px 0px",
            "245px -34px",
            "1120px -120px",
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [
            0,
            13,
            PEEL_FRAME,
            PEEL_FRAME + 18,
            PEEL_FRAME + 38,
          ],
          ["-3deg", "0.6deg", "0.6deg", "5deg", "13deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.linear,
              Easing.bezier(0.7, 0, 0.84, 0),
              Easing.bezier(0.7, 0, 0.84, 0),
            ],
          },
        ),
      }}
    >
      <PaperTexture dark />

      <Interactive.Div
        name="Old file heading"
        style={{
          position: "absolute",
          top: 54,
          left: 58,
          display: "flex",
          alignItems: "center",
          gap: 17,
          fontSize: 24,
          fontWeight: FONT.weights.black,
          letterSpacing: 3.4,
          opacity: interpolate(frame, [9, 17], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span
          style={{
            padding: "8px 13px",
            backgroundColor: COLORS.orange,
            color: COLORS.ink,
          }}
        >
          LƯU
        </span>
        <span>HỒ SƠ TÊN CŨ</span>
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 171,
          left: 62,
          color: COLORS.orange,
          fontSize: 118,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
        }}
      >
        “
      </div>

      <Interactive.Div
        name="Former name"
        style={{
          position: "absolute",
          top: 317,
          left: 68,
          right: 68,
          fontSize: 78,
          fontWeight: FONT.weights.black,
          lineHeight: 1.15,
          letterSpacing: -1.5,
          textAlign: "center",
          opacity: interpolate(frame, [25, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [25, 39],
            ["0px 30px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        DỊ THÁI VIỆN
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 474,
          left: 198,
          width: 524,
          height: 84,
          pointerEvents: "none",
        }}
      >
        <svg
          width="524"
          height="84"
          viewBox="0 0 524 84"
          fill="none"
          aria-hidden="true"
          style={{overflow: "visible"}}
        >
          <path
            d="M8 48 C122 30 232 57 332 39 C411 25 465 42 516 27"
            pathLength={1}
            stroke={COLORS.orange}
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [STRIKE_FRAME, STRIKE_FRAME + 14],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.7, 0, 0.3, 1),
              },
            )}
          />
        </svg>
      </div>

      <Interactive.Div
        name="Archived status"
        style={{
          position: "absolute",
          top: 588,
          left: 306,
          padding: "12px 20px",
          border: `3px solid ${COLORS.orange}`,
          color: COLORS.onDarkText,
          fontSize: 27,
          fontWeight: FONT.weights.black,
          letterSpacing: 2.5,
          opacity: interpolate(
            frame,
            [STRIKE_FRAME + 11, STRIKE_FRAME + 19],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [STRIKE_FRAME + 11, STRIKE_FRAME + 23],
            [0.78, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        LOẠI KHỎI HỒ SƠ
      </Interactive.Div>
    </Interactive.Div>
  );
};

const OfficialStamp: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Official government stamp"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 602,
        left: 258,
        width: 564,
        height: 166,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `12px double ${COLORS.orange}`,
        borderRadius: 12,
        color: COLORS.orange,
        backgroundColor: "rgba(245,240,228,0.9)",
        fontSize: 61,
        fontWeight: FONT.weights.black,
        lineHeight: 1,
        letterSpacing: 5.5,
        textAlign: "center",
        opacity: interpolate(
          frame,
          [STAMP_FRAME - 1, STAMP_FRAME, SCENE_DURATION - 1],
          [0, 1, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        scale: interpolate(
          frame,
          [STAMP_FRAME - 8, STAMP_FRAME, STAMP_FRAME + 8],
          [1.75, 0.9, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.7, 0, 0.84, 0),
              Easing.spring({damping: 200}),
            ],
            output: "perceptual-scale",
          },
        ),
        translate: interpolate(
          frame,
          [STAMP_FRAME - 8, STAMP_FRAME, STAMP_FRAME + 7],
          ["0px -170px", "0px 12px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.7, 0, 0.84, 0),
              Easing.spring({damping: 200}),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [STAMP_FRAME - 8, STAMP_FRAME, STAMP_FRAME + 8],
          ["-8deg", "-2deg", "-3.4deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.7, 0, 0.84, 0),
              Easing.spring({damping: 200}),
            ],
          },
        ),
      }}
    >
      CHÍNH THỨC
    </Interactive.Div>
  );
};

const SyllableTiles: React.FC = () => {
  const frame = useCurrentFrame();
  const tiles = [
    {hangul: "이", latin: "I", delay: TILES_FRAME},
    {hangul: "태", latin: "TAE", delay: TILES_FRAME + 7},
    {hangul: "원", latin: "WON", delay: TILES_FRAME + 14},
  ];

  return (
    <Interactive.Div
      name="Homophone syllable tiles"
      style={{
        position: "absolute",
        zIndex: 25,
        top: 817,
        left: 163,
        width: 754,
        opacity: interpolate(
          frame,
          [TILES_FRAME, TILES_FRAME + 7, PUNCH_FRAME + 8, PUNCH_FRAME + 16],
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
      }}
    >
      <div
        style={{
          marginBottom: 20,
          color: COLORS.ink,
          fontSize: 26,
          fontWeight: FONT.weights.black,
          letterSpacing: 3.2,
          textAlign: "center",
        }}
      >
        TỪ ĐỒNG ÂM
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
        }}
      >
        {tiles.map((tile) => (
          <Interactive.Div
            key={tile.hangul}
            name={`Syllable ${tile.latin}`}
            style={{
              width: 206,
              height: 188,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: `5px solid ${COLORS.ink}`,
              borderRadius: 8,
              backgroundColor: COLORS.backgroundCard,
              boxShadow: `9px 9px 0 ${COLORS.orange}`,
              opacity: interpolate(
                frame,
                [tile.delay, tile.delay + 7],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
              scale: interpolate(
                frame,
                [tile.delay, tile.delay + 12],
                [0.55, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                  output: "perceptual-scale",
                },
              ),
              translate: interpolate(
                frame,
                [tile.delay, tile.delay + 12],
                ["0px -42px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 200}),
                },
              ),
              rotate: `${Math.sin(frame / 13 + tile.delay) * 0.7}deg`,
            }}
          >
            <div
              style={{
                fontSize: 76,
                fontWeight: FONT.weights.black,
                lineHeight: 1,
              }}
            >
              {tile.hangul}
            </div>
            <div
              style={{
                marginTop: 15,
                color: COLORS.orange,
                fontSize: 25,
                fontWeight: FONT.weights.black,
                letterSpacing: 2.5,
              }}
            >
              {tile.latin}
            </div>
          </Interactive.Div>
        ))}
      </div>
    </Interactive.Div>
  );
};

const FinalName: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Official name punch phrase"
      style={{
        position: "absolute",
        zIndex: 32,
        top: 882,
        left: 135,
        width: 810,
        minHeight: 314,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "38px 48px",
        border: `6px solid ${COLORS.ink}`,
        borderRadius: 10,
        backgroundColor: COLORS.orange,
        color: COLORS.ink,
        boxShadow: `15px 15px 0 ${COLORS.ink}`,
        opacity: interpolate(frame, [PUNCH_FRAME, PUNCH_FRAME + 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [PUNCH_FRAME, PUNCH_FRAME + 14], [0.66, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [PUNCH_FRAME, PUNCH_FRAME + 14, SCENE_DURATION - 1],
          ["0px 68px", "0px 0px", "0px -6px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
        rotate: interpolate(
          frame,
          [PUNCH_FRAME, PUNCH_FRAME + 14, SCENE_DURATION - 1],
          ["-3deg", "-0.7deg", "0.2deg"],
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
          fontSize: 70,
          fontWeight: FONT.weights.black,
          lineHeight: 1.1,
          letterSpacing: -1.8,
          textAlign: "center",
        }}
      >
        LÊ THÁI VIỆN
      </div>
      <div
        style={{
          margin: "20px auto 16px",
          width: 104,
          height: 7,
          backgroundColor: COLORS.ink,
        }}
      />
      <div
        style={{
          fontSize: 57,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 4.5,
          textAlign: "center",
        }}
      >
        ITAEWON
      </div>
    </Interactive.Div>
  );
};

const ConfirmedCheck: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Confirmed check icon"
      style={{
        position: "absolute",
        zIndex: 36,
        top: 1133,
        right: 105,
        width: 126,
        height: 126,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: 999,
        backgroundColor: COLORS.ink,
        boxShadow: `8px 8px 0 ${COLORS.backgroundCard}`,
        opacity: interpolate(frame, [CHECK_FRAME, CHECK_FRAME + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [CHECK_FRAME, CHECK_FRAME + 13], [0.4, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        rotate: interpolate(
          frame,
          [CHECK_FRAME, CHECK_FRAME + 13, SCENE_DURATION - 1],
          ["-16deg", "3deg", "-1deg"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
          },
        ),
      }}
    >
      <svg
        width="76"
        height="76"
        viewBox="0 0 76 76"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 39 L30 57 L65 18"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [CHECK_FRAME + 3, CHECK_FRAME + 18],
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

const ImpactFlash: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        zIndex: 70,
        pointerEvents: "none",
        backgroundColor: COLORS.orange,
        opacity: interpolate(
          frame,
          [
            STAMP_FRAME - 1,
            STAMP_FRAME,
            STAMP_FRAME + 2,
            STAMP_FRAME + 7,
          ],
          [0, 0.42, 0.2, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 525,
          left: 190,
          width: 700,
          height: 360,
          border: `12px solid ${COLORS.onDarkText}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [STAMP_FRAME, STAMP_FRAME + 3, STAMP_FRAME + 12],
            [0, 0.72, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          scale: interpolate(
            frame,
            [STAMP_FRAME, STAMP_FRAME + 12],
            [0.46, 1.38],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      />
    </AbsoluteFill>
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
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.bold,
      }}
    >
      <BackgroundTreatment variant="card" />

      <Interactive.Div
        name="Naming dossier stack"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          translate: interpolate(
            frame,
            [0, 88, 142, 151, 160, SCENE_DURATION - 1],
            [
              "0px 0px",
              "0px -4px",
              "0px -4px",
              "0px 3px",
              "0px -3px",
              "0px 0px",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <ArchiveBackSheet />
        <OfficialDecision />
        <OldNameFile />
        <OfficialStamp />
        <SyllableTiles />
        <FinalName />
        <ConfirmedCheck />
      </Interactive.Div>

      <ImpactFlash />

      <div
        style={{
          position: "absolute",
          zIndex: 80,
          top: 218,
          left: 55,
          width: interpolate(frame, [0, 13], [0, 182], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          height: 14,
          backgroundColor: COLORS.ink,
          opacity: interpolate(frame, [0, 5, 34, 46], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};