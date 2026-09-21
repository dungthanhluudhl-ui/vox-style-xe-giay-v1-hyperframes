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
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const AIRPORT_SHOT_DURATION = 113;
const GROUP_SHOT_START_FRAME = 113;
const GROUP_SHOT_DURATION = 145;

const CLOCK_START_FRAME = 24;
const TIME_MARKER_START_FRAME = 35;
const PIN_START_FRAME = 65;

const FIRST_PERSON_START_FRAME = 3;
const SECOND_PERSON_START_FRAME = 30;
const THIRD_PERSON_START_FRAME = 31;
const FOURTH_PERSON_START_FRAME = 41;
const FIFTH_PERSON_START_FRAME = 51;

const DIVIDER_MOVE_START_FRAME = 74;
const DIVIDER_MOVE_END_FRAME = 108;
const PUNCH_START_FRAME = 90;
const PUNCH_DURATION = 55;

const AIRPORT_VIDEO = staticFile(
  "videos/an-le-64-phan-2/media/videos/vid-02-suspect-waiting-airport-night.mp4",
);

const GROUP_VIDEO = staticFile(
  "videos/an-le-64-phan-2/media/videos/vid-04-gang-leader-planning-map.mp4",
);

type DrawnIconName = "clock" | "pin" | "person";

type DrawnIconProps = {
  icon: DrawnIconName;
  size: number;
  name: string;
  phase?: number;
};

const DrawnIcon: React.FC<DrawnIconProps> = ({
  icon,
  size,
  name,
  phase = 0,
}) => {
  const frame = useCurrentFrame();

  const paths: Record<DrawnIconName, string[]> = {
    clock: [
      "M50 12 C29 12 13 28 13 50 C13 72 29 88 50 88 C72 88 88 72 88 50 C88 28 72 12 50 12 Z",
      "M50 27 V52 L67 63",
      "M37 5 H63",
    ],
    pin: [
      "M50 10 C31 10 18 24 18 42 C18 64 50 91 50 91 C50 91 82 64 82 42 C82 24 69 10 50 10 Z",
      "M50 29 C42 29 36 35 36 43 C36 51 42 57 50 57 C58 57 64 51 64 43 C64 35 58 29 50 29 Z",
    ],
    person: [
      "M50 14 C39 14 31 23 31 34 C31 46 39 54 50 54 C61 54 69 46 69 34 C69 23 61 14 50 14 Z",
      "M18 88 C20 68 32 58 50 58 C68 58 80 68 82 88",
    ],
  };

  return (
    <Interactive.Div
      name={name}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `5px solid ${COLORS.orange}`,
        borderRadius: "50%",
        backgroundColor: "rgba(20,20,20,0.9)",
        boxShadow: `8px 8px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 13], [0.58, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(
          frame,
          [0, 13, 32, 62, 92],
          [
            "0px 38px",
            "0px 0px",
            `0px ${Math.sin(phase) * 3}px`,
            `0px ${Math.sin(phase + 1.5) * 5}px`,
            `0px ${Math.sin(phase + 3) * 3}px`,
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
        rotate: interpolate(
          frame,
          [0, 13, 40, 72, 105],
          [
            `${-8 + phase}deg`,
            `${phase * 0.35}deg`,
            `${-1.2 + phase * 0.2}deg`,
            `${1.1 + phase * 0.15}deg`,
            `${phase * 0.2}deg`,
          ],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 200}),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
              Easing.bezier(0.45, 0, 0.55, 1),
            ],
          },
        ),
      }}
    >
      <svg
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        {paths[icon].map((path, index) => (
          <path
            key={`${icon}-${path}`}
            d={path}
            pathLength={1}
            stroke={
              icon === "person" && index === 1
                ? COLORS.onDarkText
                : COLORS.orange
            }
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [index * 4, 15 + index * 5],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        ))}
      </svg>
    </Interactive.Div>
  );
};

const TimelineRail: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Đường thời gian đến 19 giờ"
      style={{
        position: "absolute",
        zIndex: 22,
        top: 1040,
        left: 58,
        width: 420,
        height: 150,
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <svg
        width="420"
        height="150"
        viewBox="0 0 420 150"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 76 H393"
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 25], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <path
          d="M18 66 H393"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [2, 27], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />

        {[20, 112, 205, 298, 390].map((x, index) => (
          <path
            key={`timeline-tick-${x}`}
            d={`M${x} 44 V98`}
            pathLength={1}
            stroke={index === 4 ? COLORS.orange : COLORS.onDarkText}
            strokeWidth={index === 4 ? 9 : 6}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [8 + index * 5, 19 + index * 5],
              [1, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}
          />
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          top: 43,
          left: 6,
          width: 34,
          height: 34,
          border: `5px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor: COLORS.orange,
          translate: interpolate(
            frame,
            [6, 88],
            ["0px 0px", "370px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(frame, [82, 93], [0.82, 1.32], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
          }),
        }}
      />
    </Interactive.Div>
  );
};

const TimeMarker: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Mốc thời gian 19 giờ"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 840,
        left: 72,
        padding: "16px 27px 19px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: COLORS.orange,
        boxShadow: `11px 11px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 76,
        lineHeight: 1,
        letterSpacing: -2,
        fontVariantNumeric: "tabular-nums",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.7, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 12], ["0px 35px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      19:00
    </Interactive.Div>
  );
};

const AirportShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Zoom-through sân bay Nội Bài"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 21], [1.26, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
      }}
    >
      <Interactive.Div
        name="Panel người đang đến sân bay"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: interpolate(
            frame,
            [0, AIRPORT_SHOT_DURATION - 1],
            [734, 540],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          overflow: "hidden",
          borderRight: `8px solid ${COLORS.orange}`,
          backgroundColor: COLORS.ink,
        }}
      >
        <MediaAssembler
          kind="video"
          src={AIRPORT_VIDEO}
          durationInFrames={AIRPORT_SHOT_DURATION}
          trimBefore={2.1 * 30}
          trimAfter={5.85 * 30}
          cameraMotion="zoom-in"
          objectPosition="51% 47%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.18) 0%, rgba(20,20,20,0) 34%, rgba(20,20,20,0.08) 62%, rgba(20,20,20,0.56) 100%)",
            pointerEvents: "none",
          }}
        />

        <TimelineRail />

        <Sequence
          name="Clock icon"
          from={CLOCK_START_FRAME}
          durationInFrames={
            AIRPORT_SHOT_DURATION - CLOCK_START_FRAME
          }
          layout="none"
        >
          <div
            style={{
              position: "absolute",
              zIndex: 28,
              top: 680,
              left: 70,
            }}
          >
            <DrawnIcon
              icon="clock"
              size={126}
              name="Biểu tượng đồng hồ"
            />
          </div>
        </Sequence>

        <Sequence
          name="19:00 marker"
          from={TIME_MARKER_START_FRAME}
          durationInFrames={
            AIRPORT_SHOT_DURATION - TIME_MARKER_START_FRAME
          }
          layout="none"
        >
          <TimeMarker />
        </Sequence>

        <Sequence
          name="Noi Bai pin"
          from={PIN_START_FRAME}
          durationInFrames={AIRPORT_SHOT_DURATION - PIN_START_FRAME}
          layout="none"
        >
          <div
            style={{
              position: "absolute",
              zIndex: 31,
              top: 690,
              left: 367,
            }}
          >
            <DrawnIcon
              icon="pin"
              size={112}
              name="Ghim sân bay"
              phase={1.7}
            />
            <div
              style={{
                position: "absolute",
                top: 89,
                left: 24,
                padding: "7px 13px",
                border: `3px solid ${COLORS.orange}`,
                borderRadius: 5,
                backgroundColor: COLORS.ink,
                color: COLORS.onDarkText,
                fontFamily,
                fontWeight: FONT.weights.black,
                fontSize: 25,
                lineHeight: 1,
                letterSpacing: 2,
              }}
            >
              HAN
            </div>
          </div>
        </Sequence>
      </Interactive.Div>

      <Interactive.Div
        name="Vùng nguy cơ chờ mở"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: interpolate(
            frame,
            [0, AIRPORT_SHOT_DURATION - 1],
            [346, 540],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          background:
            "radial-gradient(circle at 35% 45%, rgba(255,106,26,0.14), rgba(20,20,20,0.88) 68%)",
        }}
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={`waiting-mark-${index}`}
            style={{
              position: "absolute",
              top: 325 + index * 245,
              right: 42 + (index % 2) * 75,
              width: 145 + index * 17,
              height: 9,
              backgroundColor:
                index % 2 === 0
                  ? "rgba(255,106,26,0.52)"
                  : "rgba(247,244,236,0.25)",
              rotate: `${index % 2 === 0 ? -4 : 5}deg`,
              opacity: interpolate(
                frame,
                [58 + index * 8, 72 + index * 8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                },
              ),
            }}
          />
        ))}
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          zIndex: 40,
          top: 0,
          bottom: 0,
          left: interpolate(
            frame,
            [0, AIRPORT_SHOT_DURATION - 1],
            [734, 540],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          width: 9,
          translate: "-50% 0px",
          backgroundColor: COLORS.orange,
          boxShadow: `9px 0 0 rgba(20,20,20,0.72)`,
          opacity: interpolate(frame, [92, 103], [0.4, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />
    </Interactive.Div>
  );
};

type PersonMarkerProps = {
  top: number;
  left: number;
  size: number;
  phase: number;
  name: string;
};

const PersonMarker: React.FC<PersonMarkerProps> = ({
  top,
  left,
  size,
  phase,
  name,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 36,
        top,
        left,
      }}
    >
      <DrawnIcon
        icon="person"
        size={size}
        phase={phase}
        name={name}
      />
    </div>
  );
};

const ClosingCircle: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Vòng vây khép lại"
      style={{
        position: "absolute",
        zIndex: 50,
        top: 1090,
        left: 355,
        width: 660,
        boxSizing: "border-box",
        padding: "18px 25px 21px",
        border: `5px solid ${COLORS.ink}`,
        borderRadius: 9,
        backgroundColor: COLORS.orange,
        boxShadow: `13px 13px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        fontFamily,
        fontWeight: FONT.weights.black,
        fontSize: 56,
        lineHeight: 1.12,
        letterSpacing: -1.2,
        textAlign: "center",
        opacity: interpolate(frame, [0, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 12], [0.7, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 12], ["0px 38px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
        rotate: interpolate(frame, [0, 12], ["-2deg", "0deg"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      VÒNG VÂY KHÉP LẠI
    </Interactive.Div>
  );
};

const GroupShot: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Interactive.Div
        name="Panel sân bay bị thu hẹp"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: interpolate(
            frame,
            [DIVIDER_MOVE_START_FRAME, DIVIDER_MOVE_END_FRAME],
            [540, 302],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          overflow: "hidden",
          backgroundColor: COLORS.ink,
        }}
      >
        <MediaAssembler
          kind="video"
          src={AIRPORT_VIDEO}
          durationInFrames={GROUP_SHOT_DURATION}
          trimBefore={5.85 * 30}
          trimAfter={7.98 * 30}
          playbackRate={0.44}
          cameraMotion="zoom-in"
          objectPosition="52% 47%"
          contrast={1}
        />

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to right, rgba(20,20,20,0.08), rgba(20,20,20,0.58)), linear-gradient(to bottom, transparent 50%, rgba(20,20,20,0.48))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 900,
            left: 35,
            padding: "13px 19px",
            border: `4px solid ${COLORS.orange}`,
            borderRadius: 7,
            backgroundColor: "rgba(20,20,20,0.9)",
            color: COLORS.onDarkText,
            fontFamily,
            fontWeight: FONT.weights.black,
            fontSize: 42,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            boxShadow: `7px 7px 0 ${COLORS.orange}`,
          }}
        >
          19:00
        </div>
      </Interactive.Div>

      <Interactive.Div
        name="Dissolve panel nhóm đồng phạm"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: interpolate(
            frame,
            [DIVIDER_MOVE_START_FRAME, DIVIDER_MOVE_END_FRAME],
            [540, 302],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          overflow: "hidden",
          backgroundColor: COLORS.ink,
          opacity: interpolate(frame, [0, 9], [0.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 13], [1.055, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <Interactive.Div
          name="Pan trái qua bàn kế hoạch"
          style={{
            position: "absolute",
            inset: "-42px -95px",
            overflow: "hidden",
            scale: 1.12,
            translate: interpolate(
              frame,
              [0, GROUP_SHOT_DURATION - 1],
              ["58px 0px", "-34px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <MediaAssembler
            kind="video"
            src={GROUP_VIDEO}
            durationInFrames={GROUP_SHOT_DURATION}
            trimBefore={2.3 * 30}
            trimAfter={7.15 * 30}
            cameraMotion="none"
            objectPosition="50% 48%"
            contrast={1.06}
          />
        </Interactive.Div>

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,20,20,0.23) 0%, rgba(20,20,20,0) 37%, rgba(20,20,20,0.12) 64%, rgba(20,20,20,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Đường chia lấn về phía sân bay"
        style={{
          position: "absolute",
          zIndex: 45,
          top: 0,
          bottom: 0,
          left: interpolate(
            frame,
            [DIVIDER_MOVE_START_FRAME, DIVIDER_MOVE_END_FRAME],
            [540, 302],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          width: 11,
          translate: "-50% 0px",
          backgroundColor: COLORS.orange,
          boxShadow: `10px 0 0 rgba(20,20,20,0.78)`,
          opacity: interpolate(frame, [0, 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />

      <Sequence
        name="Người tham gia thứ nhất"
        from={FIRST_PERSON_START_FRAME}
        durationInFrames={
          GROUP_SHOT_DURATION - FIRST_PERSON_START_FRAME
        }
        layout="none"
      >
        <PersonMarker
          name="Bóng người thứ nhất"
          top={250}
          left={620}
          size={132}
          phase={0.2}
        />
      </Sequence>

      <Sequence
        name="Người tham gia thứ hai"
        from={SECOND_PERSON_START_FRAME}
        durationInFrames={
          GROUP_SHOT_DURATION - SECOND_PERSON_START_FRAME
        }
        layout="none"
      >
        <PersonMarker
          name="Bóng người thứ hai"
          top={405}
          left={830}
          size={120}
          phase={1.1}
        />
      </Sequence>

      <Sequence
        name="Người tham gia thứ ba"
        from={THIRD_PERSON_START_FRAME}
        durationInFrames={
          GROUP_SHOT_DURATION - THIRD_PERSON_START_FRAME
        }
        layout="none"
      >
        <PersonMarker
          name="Bóng người thứ ba"
          top={545}
          left={565}
          size={124}
          phase={2}
        />
      </Sequence>

      <Sequence
        name="Người tham gia thứ tư"
        from={FOURTH_PERSON_START_FRAME}
        durationInFrames={
          GROUP_SHOT_DURATION - FOURTH_PERSON_START_FRAME
        }
        layout="none"
      >
        <PersonMarker
          name="Bóng người thứ tư"
          top={690}
          left={850}
          size={116}
          phase={2.9}
        />
      </Sequence>

      <Sequence
        name="Người tham gia thứ năm"
        from={FIFTH_PERSON_START_FRAME}
        durationInFrames={
          GROUP_SHOT_DURATION - FIFTH_PERSON_START_FRAME
        }
        layout="none"
      >
        <PersonMarker
          name="Bóng người thứ năm"
          top={820}
          left={655}
          size={138}
          phase={3.8}
        />
      </Sequence>

      <Sequence
        name="Closing circle punch phrase"
        from={PUNCH_START_FRAME}
        durationInFrames={PUNCH_DURATION}
        layout="none"
      >
        <ClosingCircle />
      </Sequence>
    </AbsoluteFill>
  );
};

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
      }}
    >
      <BackgroundTreatment variant="spotlight" />

      <Sequence
        name="Airport timeline shot"
        durationInFrames={AIRPORT_SHOT_DURATION}
        layout="none"
      >
        <AirportShot />
      </Sequence>

      <Sequence
        name="Accomplice group shot"
        from={GROUP_SHOT_START_FRAME}
        durationInFrames={GROUP_SHOT_DURATION}
        layout="none"
      >
        <GroupShot />
      </Sequence>

      <AbsoluteFill
        style={{
          zIndex: 80,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 48% 43%, rgba(20,20,20,0) 31%, rgba(20,20,20,0.08) 61%, rgba(20,20,20,0.48) 100%)",
          opacity: 0.82 + Math.sin(frame / 28) * 0.04,
        }}
      />

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