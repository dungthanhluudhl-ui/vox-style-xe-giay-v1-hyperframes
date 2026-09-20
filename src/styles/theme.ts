import {loadFont} from "@remotion/google-fonts/BeVietnamPro";

const loadedFont = loadFont("normal", {
  weights: ["700", "900"],
  subsets: ["vietnamese", "latin"],
});

export const fontFamily = loadedFont.fontFamily;

export const CANVAS = {
  width: 1080,
  height: 1920,
  fps: 30,
  aspectRatio: "9:16",
} as const;

export const COLORS = {
  background: "#E7E3D9",
  backgroundCard: "#F5F0E4",
  ink: "#141414",
  orange: "#FF6A1A",
  gridLine: "rgba(20,20,20,0.32)",
  onDarkText: "#F7F4EC",
  shadowOrange: "#ff7a1a",
} as const;

export const FONT = {
  family: fontFamily,
  weights: {
    bold: 700,
    black: 900,
  },
  headline: {
    fontSize: 70,
    fontWeight: 900,
    lineHeight: 1.34,
  },
} as const;

export const SAFE_ZONE = {
  top: 160,
  bottom: 460,
  left: 40,
  right: 40,
} as const;

export const CAPTION_STYLE = {
  wordsPerLine: 4,
  left: 60,
  right: 60,
  bottom: 440,
  background: "rgba(10,10,10,0.8)",
  borderRadius: 14,
  padding: "12px 24px",
} as const;

export const PACING = {
  averageSceneLengthSeconds: [6, 9],
  avoidSceneLengthSeconds: 13,
  punchPhraseMinimumHoldFrames: 48,
  maximumSecondsWithoutVisualEvent: 3,
} as const;

export const BACKGROUND = {
  gridCellPx: 84,
  gridStrokeWidth: 1.5,
  gridStrokeColor: COLORS.gridLine,
  grainOpacity: 0.18,
} as const;

export type BackgroundVariant = "grid" | "chart" | "card" | "spotlight";

export type CameraMotion = "none" | "zoom-in" | "pan-right";

export type EntranceAnimation = "zoom-through" | "dissolve";

export type OverlayVariant = "amount" | "label" | "punch";

export type SimpleIconName = "money" | "phone" | "warning";