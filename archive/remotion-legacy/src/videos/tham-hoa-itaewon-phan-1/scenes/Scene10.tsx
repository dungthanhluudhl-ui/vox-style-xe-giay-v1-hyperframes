import {Video} from "@remotion/media";
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
import {
  COLORS,
  FONT,
  fontFamily,
} from "../../../styles/theme";

const SCENE_DURATION_IN_FRAMES = 327;
const VIDEO_END_FRAME = 240;
const FINAL_HOLD_START_FRAME = 239;

const FIRST_POINTER_START_FRAME = 24;
const FIRST_LABEL_START_FRAME = 48;
const SECOND_POINTER_START_FRAME = 100;
const THIRD_POINTER_START_FRAME = 173;
const COMMUNITY_LABEL_START_FRAME = 254;

const VIDEO_SRC =
  "videos/tham-hoa-itaewon-phan-1/media/videos/vid-02-itaewon-nightlife-street-cutout.mp4";

type AnnotationLineProps = {
  name: string;
  path: string;
  targetX: number;
  targetY: number;
  holdFrames: number;
  phase: number;
};

const AnnotationLine: React.FC<AnnotationLineProps> = ({
  name,
  path,
  targetX,
  targetY,
  holdFrames,
  phase,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 20,
        inset: 0,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [0, 5, Math.max(6, holdFrames - 9), holdFrames - 1],
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
        translate: `${Math.sin((frame + phase) * 0.055) * 2.2}px ${
          Math.cos((frame + phase) * 0.047) * 1.5
        }px`,
        filter: "drop-shadow(5px 5px 0px rgba(20,20,20,0.82))",
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
          d={path}
          pathLength={1}
          stroke={COLORS.ink}
          strokeWidth={18}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 21], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
          opacity={0.86}
        />
        <path
          d={path}
          pathLength={1}
          stroke={COLORS.orange}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 21], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}
        />
        <circle
          cx={targetX}
          cy={targetY}
          r={interpolate(frame, [17, 26], [0, 14], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 180}),
          })}
          fill={COLORS.ink}
          stroke={COLORS.orange}
          strokeWidth={7}
        />
        <circle
          cx={targetX}
          cy={targetY}
          r={interpolate(frame, [21, 30], [0, 5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 180}),
          })}
          fill={COLORS.onDarkText}
        />
      </svg>
    </Interactive.Div>
  );
};

type AnnotationLabelProps = {
  name: string;
  text: string;
  top: number;
  left: number;
  holdFrames: number;
  tilt: number;
  phase: number;
  community?: boolean;
};

const AnnotationLabel: React.FC<AnnotationLabelProps> = ({
  name,
  text,
  top,
  left,
  holdFrames,
  tilt,
  phase,
  community = false,
}) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        zIndex: 24,
        top,
        left,
        pointerEvents: "none",
        opacity: interpolate(
          frame,
          [0, 6, Math.max(7, holdFrames - 9), holdFrames - 1],
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
        scale: interpolate(frame, [0, 12], [0.68, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 175}),
          output: "perceptual-scale",
        }),
        translate: interpolate(frame, [0, 12], ["0px 38px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({damping: 175}),
        }),
        rotate: interpolate(
          frame,
          [0, 12, Math.max(13, holdFrames - 1)],
          [`${tilt * 4}deg`, `${tilt}deg`, `${tilt * -0.35}deg`],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.spring({damping: 175}),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
      }}
    >
      <div
        style={{
          position: "relative",
          padding: community ? "17px 22px" : "14px 20px",
          border: `4px solid ${community ? COLORS.ink : COLORS.orange}`,
          borderRadius: 8,
          backgroundColor: community
            ? COLORS.orange
            : "rgba(20,20,20,0.91)",
          color: community ? COLORS.ink : COLORS.onDarkText,
          boxShadow: community
            ? `10px 10px 0 ${COLORS.ink}`
            : `9px 9px 0 ${COLORS.orange}`,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: community ? 39 : 37,
          lineHeight: 1,
          letterSpacing: 1.2,
          whiteSpace: "nowrap",
          translate: `${
            Math.sin((frame + phase) * (community ? 0.075 : 0.052)) *
            (community ? 3.2 : 1.8)
          }px ${
            Math.cos((frame + phase) * (community ? 0.061 : 0.045)) *
            (community ? 4.4 : 1.4)
          }px`,
        }}
      >
        {text}

        {community ? (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 54,
                bottom: -70,
                width: 9,
                height: 70,
                borderRadius: 5,
                backgroundColor: COLORS.orange,
                boxShadow: `5px 4px 0 ${COLORS.ink}`,
                rotate: "16deg",
                transformOrigin: "50% 0%",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 29,
                bottom: -86,
                width: 34,
                height: 34,
                border: `7px solid ${COLORS.orange}`,
                borderRadius: "50%",
                backgroundColor: COLORS.ink,
                boxShadow: "4px 4px 0 rgba(20,20,20,0.7)",
              }}
            />
          </>
        ) : null}
      </div>
    </Interactive.Div>
  );
};

const MovingGrain: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Moving paper grain"
      style={{
        position: "absolute",
        zIndex: 5,
        inset: -28,
        pointerEvents: "none",
        overflow: "hidden",
        mixBlendMode: "multiply",
        opacity: interpolate(
          frame,
          [0, FINAL_HOLD_START_FRAME, SCENE_DURATION_IN_FRAMES - 1],
          [0.045, 0.055, 0.095],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [
              Easing.bezier(0.16, 1, 0.3, 1),
              Easing.bezier(0.16, 1, 0.3, 1),
            ],
          },
        ),
        translate: `${Math.sin(frame * 0.41) * 4}px ${
          Math.cos(frame * 0.37) * 4
        }px`,
      }}
    >
      <svg width="1136" height="1976" aria-hidden="true">
        <filter id="scene-10-moving-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves={4}
            seed={31}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="1136"
          height="1976"
          fill={COLORS.background}
          filter="url(#scene-10-moving-grain)"
        />
      </svg>
    </Interactive.Div>
  );
};

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        isolation: "isolate",
        overflow: "hidden",
        backgroundColor: COLORS.ink,
        color: COLORS.onDarkText,
        fontFamily,
      }}
    >
      <Interactive.Div
        name="Itaewon street wobble-drop entrance"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: interpolate(frame, [0, 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(
            frame,
            [0, 9, 16, 24],
            [
              "0px -184px",
              "0px 20px",
              "0px -9px",
              "0px 0px",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 135}),
                Easing.spring({damping: 165}),
                Easing.spring({damping: 195}),
              ],
            },
          ),
          rotate: interpolate(
            frame,
            [0, 9, 16, 24],
            ["-4.8deg", "2.1deg", "-1deg", "0deg"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: [
                Easing.spring({damping: 135}),
                Easing.spring({damping: 165}),
                Easing.spring({damping: 195}),
              ],
            },
          ),
          scale: interpolate(frame, [0, 24], [1.05, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 190}),
            output: "perceptual-scale",
          }),
        }}
      >
        <Interactive.Div
          name="Street pan-right camera"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            scale: interpolate(
              frame,
              [
                0,
                FINAL_HOLD_START_FRAME,
                SCENE_DURATION_IN_FRAMES - 1,
              ],
              [1.12, 1.04, 1.07],
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
                FINAL_HOLD_START_FRAME,
                SCENE_DURATION_IN_FRAMES - 1,
              ],
              ["-54px 0px", "15px 0px", "29px -2px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [
                  Easing.bezier(0.16, 1, 0.3, 1),
                  Easing.bezier(0.16, 1, 0.3, 1),
                ],
              },
            ),
          }}
        >
          <Video
            src={staticFile(VIDEO_SRC)}
            muted
            durationInFrames={VIDEO_END_FRAME}
            trimAfter={VIDEO_END_FRAME}
            objectFit="cover"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          />

          <Sequence
            name="Held final street frame"
            from={FINAL_HOLD_START_FRAME}
            durationInFrames={
              SCENE_DURATION_IN_FRAMES - FINAL_HOLD_START_FRAME
            }
            layout="none"
          >
            <Video
              src={staticFile(VIDEO_SRC)}
              muted
              durationInFrames={
                SCENE_DURATION_IN_FRAMES - FINAL_HOLD_START_FRAME
              }
              trimBefore={238.8}
              playbackRate={0.01}
              objectFit="cover"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Sequence>

          <AbsoluteFill
            style={{
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.06) 30%, rgba(10,10,10,0.02) 61%, rgba(10,10,10,0.38) 100%)",
            }}
          />
        </Interactive.Div>
      </Interactive.Div>

      <BackgroundTreatment variant="spotlight" />
      <MovingGrain />

      <Sequence
        name="Left storefront pointer"
        from={FIRST_POINTER_START_FRAME}
        durationInFrames={149}
        layout="none"
      >
        <AnnotationLine
          name="Pointer to left storefront cluster"
          path="M124 338 C146 405 177 500 272 633"
          targetX={272}
          targetY={633}
          holdFrames={149}
          phase={2}
        />
      </Sequence>

      <Sequence
        name="Continuous storefront label"
        from={FIRST_LABEL_START_FRAME}
        durationInFrames={120}
        layout="none"
      >
        <AnnotationLabel
          name="One continuous row label"
          text="MỘT DÃY LIÊN TỤC"
          top={245}
          left={68}
          holdFrames={120}
          tilt={-1.1}
          phase={13}
        />
      </Sequence>

      <Sequence
        name="Middle destination pointer"
        from={SECOND_POINTER_START_FRAME}
        durationInFrames={144}
        layout="none"
      >
        <AnnotationLine
          name="Pointer to central signs and destinations"
          path="M852 354 C800 421 698 510 548 642"
          targetX={548}
          targetY={642}
          holdFrames={144}
          phase={29}
        />
      </Sequence>

      <Sequence
        name="Right storefront pointer"
        from={THIRD_POINTER_START_FRAME}
        durationInFrames={
          SCENE_DURATION_IN_FRAMES - THIRD_POINTER_START_FRAME
        }
        layout="none"
      >
        <AnnotationLine
          name="Pointer to right restaurant and bar row"
          path="M958 493 C930 557 881 628 795 704"
          targetX={795}
          targetY={704}
          holdFrames={
            SCENE_DURATION_IN_FRAMES - THIRD_POINTER_START_FRAME
          }
          phase={47}
        />
      </Sequence>

      <Sequence
        name="International communities label"
        from={COMMUNITY_LABEL_START_FRAME}
        durationInFrames={
          SCENE_DURATION_IN_FRAMES - COMMUNITY_LABEL_START_FRAME
        }
        layout="none"
      >
        <AnnotationLabel
          name="Many communities label"
          text="NHIỀU CỘNG ĐỒNG"
          top={1042}
          left={566}
          holdFrames={
            SCENE_DURATION_IN_FRAMES - COMMUNITY_LABEL_START_FRAME
          }
          tilt={0.9}
          phase={61}
          community
        />
      </Sequence>
    </AbsoluteFill>
  );
};