import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type TransitionWrapperProps = {
  children: React.ReactNode;
  name?: string;
};

export const ZoomThroughEntrance: React.FC<TransitionWrapperProps> = ({
  children,
  name = "Zoom-through entrance",
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 0.24 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 0.7 * fps], [1.28, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};

export const DissolveEntrance: React.FC<TransitionWrapperProps> = ({
  children,
  name = "Dissolve entrance",
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Interactive.Div
      name={name}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: interpolate(frame, [0, 0.3 * fps], [0.35, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 0.4 * fps], [1.06, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};