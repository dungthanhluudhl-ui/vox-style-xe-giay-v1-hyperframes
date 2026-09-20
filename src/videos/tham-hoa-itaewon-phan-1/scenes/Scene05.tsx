import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {BackgroundTreatment} from "../../../components/BackgroundTreatment";
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const SCENE_DURATION_IN_FRAMES = 167;
const REWIND_START_FRAME = 89;
const YEAR_2014_START_FRAME = 122;

const TIMELINE_LEFT = 152;
const TIMELINE_WIDTH = 776;
const TIMELINE_TOP = 768;

const TimelineOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Historical timeline"
      style={{
        position: "absolute",
        zIndex: 20,
        top: TIMELINE_TOP,
        left: TIMELINE_LEFT,
        width: TIMELINE_WIDTH,
        height: 230,
        pointerEvents: "none",
        opacity: interpolate(frame, [5, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 106,
          right: 0,
          width: interpolate(frame, [7, 28], [0, TIMELINE_WIDTH], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          height: 5,
          borderRadius: 3,
          backgroundColor: "rgba(247,244,236,0.78)",
          boxShadow: "0 3px 0 rgba(20,20,20,0.82)",
        }}
      />

      {[0, 97, 194, 291, 388, 485, 582, 679, 776].map(
        (left, index) => {
          const revealFrame =
            REWIND_START_FRAME +
            ((TIMELINE_WIDTH - left) / TIMELINE_WIDTH) *
              (YEAR_2014_START_FRAME - REWIND_START_FRAME);

          return (
            <div
              key={left}
              style={{
                position: "absolute",
                top: index === 0 || index === 8 ? 91 : 97,
                left: left - 2,
                width: index === 0 || index === 8 ? 6 : 4,
                height: index === 0 || index === 8 ? 36 : 25,
                borderRadius: 3,
                backgroundColor:
                  frame >= revealFrame
                    ? COLORS.orange
                    : "rgba(247,244,236,0.72)",
                opacity: interpolate(
                  frame,
                  [8 + index * 1.5, 13 + index * 1.5],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  },
                ),
                scale: interpolate(
                  frame,
                  [revealFrame - 2, revealFrame + 4],
                  [0.72, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.spring({damping: 200}),
                    output: "perceptual-scale",
                  },
                ),
              }}
            />
          );
        },
      )}

      <Interactive.Div
        name="Rewind stroke"
        style={{
          position: "absolute",
          top: 104,
          right: 0,
          width: interpolate(
            frame,
            [REWIND_START_FRAME, YEAR_2014_START_FRAME],
            [0, TIMELINE_WIDTH],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          ),
          height: 9,
          borderRadius: 5,
          backgroundColor: COLORS.orange,
          boxShadow: "0 3px 0 rgba(20,20,20,0.82)",
          opacity: interpolate(
            frame,
            [REWIND_START_FRAME, REWIND_START_FRAME + 4],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      />

      <Interactive.Div
        name="Rewind head"
        style={{
          position: "absolute",
          top: 91,
          right: interpolate(
            frame,
            [REWIND_START_FRAME, YEAR_2014_START_FRAME],
            [0, TIMELINE_WIDTH],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            },
          ),
          width: 35,
          height: 35,
          border: `7px solid ${COLORS.orange}`,
          borderRadius: "50%",
          backgroundColor: COLORS.ink,
          translate: "50% 0px",
          opacity: interpolate(
            frame,
            [
              REWIND_START_FRAME,
              REWIND_START_FRAME + 3,
              YEAR_2014_START_FRAME - 2,
              YEAR_2014_START_FRAME + 2,
            ],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.linear,
                Easing.bezier(0.7, 0, 0.84, 0),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [
              REWIND_START_FRAME,
              REWIND_START_FRAME + 5,
              REWIND_START_FRAME + 9,
              YEAR_2014_START_FRAME,
            ],
            [0.6, 1.15, 1, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 180}),
                Easing.spring({damping: 180}),
                Easing.linear,
              ],
              output: "perceptual-scale",
            },
          ),
        }}
      />

      <Interactive.Div
        name="2022 timeline marker"
        style={{
          position: "absolute",
          top: 0,
          right: -42,
          minWidth: 164,
          padding: "13px 20px",
          border: `4px solid ${COLORS.orange}`,
          borderRadius: 8,
          backgroundColor: "rgba(20,20,20,0.9)",
          color: COLORS.onDarkText,
          boxShadow: `8px 8px 0 ${COLORS.orange}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 47,
          lineHeight: 1,
          letterSpacing: -1.5,
          textAlign: "center",
          opacity: interpolate(frame, [3, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [3, 14], [0.62, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 190}),
            output: "perceptual-scale",
          }),
          translate: interpolate(
            frame,
            [3, 14],
            ["0px 18px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 190}),
            },
          ),
        }}
      >
        2022
      </Interactive.Div>

      <Interactive.Div
        name="2014 lock pulse"
        style={{
          position: "absolute",
          top: 73,
          left: -35,
          width: 72,
          height: 72,
          border: `8px solid ${COLORS.orange}`,
          borderRadius: "50%",
          opacity: interpolate(
            frame,
            [
              YEAR_2014_START_FRAME,
              YEAR_2014_START_FRAME + 4,
              YEAR_2014_START_FRAME + 21,
            ],
            [0, 0.9, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.bezier(0.16, 1, 0.3, 1),
                Easing.bezier(0.16, 1, 0.3, 1),
              ],
            },
          ),
          scale: interpolate(
            frame,
            [
              YEAR_2014_START_FRAME,
              YEAR_2014_START_FRAME + 21,
            ],
            [0.55, 2.2],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      />

      <Interactive.Div
        name="2014 timeline marker"
        style={{
          position: "absolute",
          top: 137,
          left: -47,
          minWidth: 174,
          padding: "14px 20px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 8,
          backgroundColor: COLORS.orange,
          color: COLORS.ink,
          boxShadow: `9px 9px 0 ${COLORS.ink}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 50,
          lineHeight: 1,
          letterSpacing: -1.5,
          textAlign: "center",
          opacity: interpolate(
            frame,
            [YEAR_2014_START_FRAME, YEAR_2014_START_FRAME + 5],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
          scale: interpolate(
            frame,
            [YEAR_2014_START_FRAME, YEAR_2014_START_FRAME + 12],
            [0.64, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 175}),
              output: "perceptual-scale",
            },
          ),
          translate: interpolate(
            frame,
            [YEAR_2014_START_FRAME, YEAR_2014_START_FRAME + 12],
            ["-18px 22px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 175}),
            },
          ),
          rotate: interpolate(
            frame,
            [YEAR_2014_START_FRAME, YEAR_2014_START_FRAME + 12],
            ["-5deg", "-1deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 175}),
            },
          ),
        }}
      >
        2014
      </Interactive.Div>
    </Interactive.Div>
  );
};

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        fontFamily,
      }}
    >
      <Interactive.Div
        name="Sewol memorial unfold entrance"
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          bottom: 0,
          left: "50%",
          width: interpolate(frame, [0, 22], [8, 1080], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.76, 0, 0.24, 1),
          }),
          overflow: "hidden",
          translate: "-50% 0px",
          opacity: interpolate(frame, [0, 6], [0.55, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Video
          src={staticFile(
            "videos/tham-hoa-itaewon-phan-1/media/videos/vid-03-sewol-ferry-tragedy-memorial.mp4",
          )}
          muted
          durationInFrames={SCENE_DURATION_IN_FRAMES}
          trimBefore={1.22 * fps}
          trimAfter={6.78 * fps}
          objectFit="cover"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 1080,
            height: 1920,
            translate: "-50% 0px",
            scale: interpolate(
              frame,
              [0, SCENE_DURATION_IN_FRAMES - 1],
              [1.05, 1],
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
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.02) 35%, rgba(10,10,10,0.2) 61%, rgba(10,10,10,0.54) 100%)",
          }}
        />
      </Interactive.Div>

      <BackgroundTreatment variant="spotlight" />

      <TimelineOverlay />

      <Interactive.Div
        name="Left unfolding edge"
        style={{
          position: "absolute",
          zIndex: 60,
          top: 0,
          bottom: 0,
          left: interpolate(frame, [0, 22], [532, -12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.76, 0, 0.24, 1),
          }),
          width: 16,
          backgroundColor: COLORS.orange,
          boxShadow: "8px 0 0 rgba(20,20,20,0.74)",
          opacity: interpolate(frame, [0, 18, 26], [1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          }),
        }}
      />

      <Interactive.Div
        name="Right unfolding edge"
        style={{
          position: "absolute",
          zIndex: 60,
          top: 0,
          bottom: 0,
          left: interpolate(frame, [0, 22], [540, 1076], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.76, 0, 0.24, 1),
          }),
          width: 16,
          backgroundColor: COLORS.orange,
          boxShadow: "-8px 0 0 rgba(20,20,20,0.74)",
          opacity: interpolate(frame, [0, 18, 26], [1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.linear,
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          }),
        }}
      />
    </AbsoluteFill>
  );
};