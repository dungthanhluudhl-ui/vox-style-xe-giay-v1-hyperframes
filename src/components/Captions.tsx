import {
  createTikTokStyleCaptions,
  type Caption,
  type TikTokPage,
} from "@remotion/captions";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import {
  CAPTION_STYLE,
  COLORS,
  FONT,
  fontFamily,
} from "../styles/theme";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const CAPTIONS_FILE = "captions/an-le-64-captions.json";
const PAGE_WINDOW_MS = 10_000;

const applyFourWordPageBreaks = (captions: Caption[]): Caption[] => {
  let wordsOnPage = 0;

  return captions.map((caption) => {
    const trimmedText = caption.text.trim();
    const wordCount =
      trimmedText.length === 0
        ? 0
        : trimmedText.split(/\s+/).filter(Boolean).length;

    wordsOnPage += wordCount;

    const endsSentence = /[.!?…]["”']?$/.test(trimmedText);
    const pageBreakAfter =
      caption.pageBreakAfter === true ||
      endsSentence ||
      wordsOnPage >= CAPTION_STYLE.wordsPerLine;

    if (pageBreakAfter) {
      wordsOnPage = 0;
    }

    return {
      ...caption,
      pageBreakAfter,
    };
  });
};

const CaptionPage: React.FC<{page: TikTokPage}> = ({page}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;

  return (
    <Interactive.Div
      name="Synchronized caption"
      style={{
        position: "absolute",
        left: CAPTION_STYLE.left,
        right: CAPTION_STYLE.right,
        bottom: CAPTION_STYLE.bottom,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: interpolate(frame, [0, 3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(frame, [0, 5], ["0px 12px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      <div
        style={{
          maxWidth: 930,
          padding: CAPTION_STYLE.padding,
          borderRadius: CAPTION_STYLE.borderRadius,
          backgroundColor: CAPTION_STYLE.background,
          color: COLORS.onDarkText,
          fontFamily,
          fontWeight: FONT.weights.black,
          fontSize: 49,
          lineHeight: 1.25,
          textAlign: "center",
          whiteSpace: "pre-wrap",
          boxDecorationBreak: "clone",
        }}
      >
        {page.tokens.map((token, tokenIndex) => {
          const isActive =
            token.fromMs <= absoluteTimeMs &&
            token.toMs > absoluteTimeMs;

          return (
            <span
              key={`${token.fromMs}-${token.toMs}-${tokenIndex}`}
              style={{
                color: isActive ? COLORS.orange : COLORS.onDarkText,
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </Interactive.Div>
  );
};

type CaptionSequenceProps = {
  page: TikTokPage;
  index: number;
  startFrame: number;
  durationInFrames: number;
};

const CaptionSequence: React.FC<CaptionSequenceProps> = ({
  page,
  index,
  startFrame,
  durationInFrames,
}) => {
  if (startFrame === 0) {
    return (
      <Sequence
        name={`Caption ${index + 1}`}
        durationInFrames={durationInFrames}
      >
        <CaptionPage page={page} />
      </Sequence>
    );
  }

  return (
    <Sequence
      name={`Caption ${index + 1}`}
      from={startFrame}
      durationInFrames={durationInFrames}
    >
      <CaptionPage page={page} />
    </Sequence>
  );
};

export const Captions: React.FC = () => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [renderHandle] = useState(() =>
    delayRender("Loading synchronized captions"),
  );
  const {fps, durationInFrames: compositionDuration} = useVideoConfig();

  const fetchCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(CAPTIONS_FILE));

      if (!response.ok) {
        throw new Error(
          `Unable to load captions: ${response.status} ${response.statusText}`,
        );
      }

      const json: unknown = await response.json();
      const parsedCaptions = Array.isArray(json)
        ? (json as Caption[])
        : (
            json as {
              captions?: Caption[];
            }
          ).captions;

      if (!parsedCaptions) {
        throw new Error("Caption JSON does not contain a captions array.");
      }

      setCaptions(applyFourWordPageBreaks(parsedCaptions));
      continueRender(renderHandle);
    } catch (error) {
      cancelRender(
        error instanceof Error
          ? error
          : new Error("Unknown error while loading captions."),
      );
    }
  }, [cancelRender, continueRender, renderHandle]);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const pages = useMemo(() => {
    if (!captions) {
      return [];
    }

    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: PAGE_WINDOW_MS,
    }).pages;
  }, [captions]);

  if (!captions) {
    return null;
  }

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      {pages.map((page, index) => {
        const nextPage = pages[index + 1] ?? null;
        const startFrame = Math.max(
          0,
          Math.round((page.startMs / 1000) * fps),
        );
        const lastToken = page.tokens[page.tokens.length - 1];
        const naturalEndMs = lastToken?.toMs ?? page.startMs + PAGE_WINDOW_MS;
        const nextStartMs = nextPage?.startMs ?? naturalEndMs;
        const endFrame = Math.min(
          compositionDuration,
          Math.ceil((Math.max(naturalEndMs, nextStartMs) / 1000) * fps),
        );
        const durationInFrames = Math.max(1, endFrame - startFrame);

        if (startFrame >= compositionDuration) {
          return null;
        }

        return (
          <CaptionSequence
            key={`${page.startMs}-${index}`}
            page={page}
            index={index}
            startFrame={startFrame}
            durationInFrames={durationInFrames}
          />
        );
      })}
    </AbsoluteFill>
  );
};