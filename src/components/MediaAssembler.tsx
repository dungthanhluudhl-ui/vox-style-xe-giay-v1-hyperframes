import {Video} from "@remotion/media";
import {
  CanvasImage,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import type {CameraMotion} from "../styles/theme";

type SharedMediaProps = {
  src: string;
  durationInFrames: number;
  cameraMotion?: CameraMotion;
  objectPosition?: string;
  contrast?: number;
  cropLeft?: number;
  cropRight?: number;
  cropTop?: number;
  cropBottom?: number;
};

type ImageMediaProps = SharedMediaProps & {
  kind: "image";
};

type VideoMediaProps = SharedMediaProps & {
  kind: "video";
  trimBefore?: number;
  trimAfter?: number;
  playbackRate?: number;
};

export type MediaAssemblerProps = ImageMediaProps | VideoMediaProps;

export const MediaAssembler: React.FC<MediaAssemblerProps> = (props) => {
  const frame = useCurrentFrame();
  const {
    src,
    durationInFrames,
    cameraMotion = "none",
    objectPosition = "50% 50%",
    contrast = 1.08,
    cropLeft = 0,
    cropRight = 0,
    cropTop = 0,
    cropBottom = 0,
  } = props;

  const commonStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectPosition,
    filter: `contrast(${contrast})`,
    scale:
      cameraMotion === "zoom-in"
        ? interpolate(
            frame,
            [0, Math.max(1, durationInFrames - 1)],
            [1.03, 1.11],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: "perceptual-scale",
            },
          )
        : cameraMotion === "pan-right"
          ? interpolate(
              frame,
              [0, Math.max(1, durationInFrames - 1)],
              [1.16, 1.1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                output: "perceptual-scale",
              },
            )
          : 1,
    translate:
      cameraMotion === "pan-right"
        ? interpolate(
            frame,
            [0, Math.max(1, durationInFrames - 1)],
            ["-54px 0px", "34px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          )
        : "0px 0px",
  };

  if (props.kind === "video") {
    return (
      <Video
        src={src}
        muted
        durationInFrames={durationInFrames}
        trimBefore={props.trimBefore}
        trimAfter={props.trimAfter}
        playbackRate={props.playbackRate}
        objectFit="cover"
        cropLeft={cropLeft}
        cropRight={cropRight}
        cropTop={cropTop}
        cropBottom={cropBottom}
        style={commonStyle}
      />
    );
  }

  return (
    <CanvasImage
      src={src}
      cropLeft={cropLeft}
      cropRight={cropRight}
      cropTop={cropTop}
      cropBottom={cropBottom}
      style={{
        ...commonStyle,
        objectFit: "cover",
      }}
    />
  );
};