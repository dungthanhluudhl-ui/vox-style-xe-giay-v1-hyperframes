import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {MediaAssembler} from "../../../components/MediaAssembler";
import {ZoomThroughEntrance} from "../../../components/SceneTransitions";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const VIDEO_SRC = staticFile(
  "videos/tham-hoa-itaewon-phan-2/media/videos/vid-07-itaewon-halloween-crowd-crush.mp4",
);

const SCENE_DURATION = 211;
const EVENING_END_FRAME = 101;
const IMPACT_START_FRAME = 182;

const CrowdVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ZoomThroughEntrance name="Zoom-through into the Itaewon crowd">
      <Interactive.Div
        name="Crowd camera motion"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          scale: interpolate(
            frame,
            [0, EVENING_END_FRAME, SCENE_DURATION - 1],
            [1.04, 1.095, 1.11],
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
            [
              0,
              90,
              100,
              101,
              104,
              108,
              112,
              128,
              131,
              134,
              138,
              156,
              160,
              164,
              168,
              181,
              184,
              187,
              190,
              194,
              SCENE_DURATION - 1,
            ],
            [
              "-26px 5px",
              "8px -10px",
              "16px -14px",
              "16px -14px",
              "-8px -14px",
              "12px -12px",
              "0px -13px",
              "0px -13px",
              "9px -13px",
              "-10px -12px",
              "0px -13px",
              "0px -13px",
              "-8px -13px",
              "10px -12px",
              "0px -13px",
              "0px -13px",
              "-14px -13px",
              "14px -12px",
              "-7px -13px",
              "0px -13px",
              "0px -13px",
            ],
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
          src={VIDEO_SRC}
          durationInFrames={SCENE_DURATION}
          trimBefore={0.48 * 30}
          trimAfter={7.51 * 30}
          playbackRate={1}
          cameraMotion="none"
          contrast={1.04}
        />
      </Interactive.Div>
    </ZoomThroughEntrance>
  );
};

const TimelineOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Timeline từ chiều đến 20 giờ"
      style={{
        position: "absolute",
        zIndex: 30,
        top: 204,
        left: 80,
        width: 920,
        height: 194,
        border: `4px solid ${COLORS.onDarkText}`,
        borderRadius: 10,
        backgroundColor: "rgba(20,20,20,0.86)",
        boxShadow: `11px 11px 0 ${COLORS.orange}`,
        opacity: interpolate(frame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 15], [0.9, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 15], ["0px -34px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 200}),
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 95,
          left: 74,
          width: 772,
          height: 8,
          borderRadius: 999,
          backgroundColor: "rgba(247,244,236,0.32)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 95,
          left: 74,
          width: interpolate(
            frame,
            [0, EVENING_END_FRAME],
            [0, 772],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          height: 8,
          borderRadius: 999,
          backgroundColor: COLORS.orange,
        }}
      />

      <Interactive.Div
        name="Kim thời gian"
        style={{
          position: "absolute",
          top: 74,
          left: interpolate(
            frame,
            [0, EVENING_END_FRAME],
            [58, 830],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          width: 40,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          translate: "-20px 0px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            width: 7,
            height: 50,
            borderRadius: 999,
            backgroundColor: COLORS.onDarkText,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 14,
            width: 27,
            height: 27,
            border: `5px solid ${COLORS.ink}`,
            borderRadius: "50%",
            backgroundColor: COLORS.orange,
          }}
        />
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 82,
          left: 65,
          width: 34,
          height: 34,
          border: `5px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor: COLORS.orange,
        }}
      />

      <Interactive.Div
        name="Mốc chiều"
        style={{
          position: "absolute",
          top: 25,
          left: 34,
          padding: "8px 15px",
          border: `3px solid ${COLORS.orange}`,
          borderRadius: 5,
          backgroundColor: COLORS.backgroundCard,
          color: COLORS.ink,
          fontSize: 28,
          fontWeight: FONT.weights.black,
          lineHeight: 1,
          letterSpacing: 2,
          opacity: interpolate(
            frame,
            [0, 7, 94, EVENING_END_FRAME],
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
          ),
        }}
      >
        CHIỀU
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          top: 82,
          right: 64,
          width: 34,
          height: 34,
          border: `5px solid ${COLORS.ink}`,
          borderRadius: "50%",
          backgroundColor:
            frame >= EVENING_END_FRAME
              ? COLORS.orange
              : COLORS.onDarkText,
          scale: interpolate(
            frame,
            [
              EVENING_END_FRAME - 5,
              EVENING_END_FRAME,
              EVENING_END_FRAME + 9,
            ],
            [0.72, 1.34, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
        }}
      />

      <Interactive.Div
        name="Mốc 20 giờ"
        style={{
          position: "absolute",
          top: 21,
          right: 26,
          padding: "10px 17px",
          border: `4px solid ${COLORS.orange}`,
          borderRadius: 5,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          fontSize: 34,
          fontWeight: FONT.weights.black,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          letterSpacing: 1.5,
          opacity: interpolate(
            frame,
            [EVENING_END_FRAME - 5, EVENING_END_FRAME + 2],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [EVENING_END_FRAME - 5, EVENING_END_FRAME + 9],
            [0.66, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [EVENING_END_FRAME - 5, EVENING_END_FRAME + 9],
            ["0px -18px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 200}),
            },
          ),
        }}
      >
        20:00
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          left: 74,
          right: 74,
          bottom: 25,
          height: 3,
          backgroundColor: "rgba(247,244,236,0.18)",
        }}
      />
    </Interactive.Div>
  );
};

const ImpactLines: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Nhịp chen lấn và xô đẩy"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 42,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [
            IMPACT_START_FRAME,
            IMPACT_START_FRAME + 5,
            SCENE_DURATION - 9,
            SCENE_DURATION - 1,
          ],
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
          [IMPACT_START_FRAME, IMPACT_START_FRAME + 10],
          [0.9, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 200}),
            output: "perceptual-scale",
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
          d="M58 654 L260 730 M26 812 L238 836 M70 982 L272 934"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [IMPACT_START_FRAME, IMPACT_START_FRAME + 13],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M58 654 L260 730 M26 812 L238 836 M70 982 L272 934"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [IMPACT_START_FRAME + 2, IMPACT_START_FRAME + 15],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M1022 654 L820 730 M1054 812 L842 836 M1010 982 L808 934"
          pathLength={1}
          stroke="rgba(20,20,20,0.82)"
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [IMPACT_START_FRAME + 2, IMPACT_START_FRAME + 15],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />
        <path
          d="M1022 654 L820 730 M1054 812 L842 836 M1010 982 L808 934"
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [IMPACT_START_FRAME + 4, IMPACT_START_FRAME + 17],
            [1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )}
        />

        <path
          d="M470 770 L510 814 L472 856 M610 770 L570 814 L608 856"
          pathLength={1}
          stroke={COLORS.onDarkText}
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(
            frame,
            [IMPACT_START_FRAME + 7, IMPACT_START_FRAME + 20],
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

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();

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
      <CrowdVideo />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          opacity: interpolate(
            frame,
            [0, 18, EVENING_END_FRAME, SCENE_DURATION - 1],
            [0.24, 0.34, 0.38, 0.46],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
        }}
      >
        <BackgroundTreatment variant="spotlight" />
      </div>

      <TimelineOverlay />
      <ImpactLines />

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