// Giai đoạn A — sinh caption-track.html (sub-composition HyperFrames) từ Caption[] JSON hiện có,
// port 1:1 thuật toán của src/components/Captions.tsx (applyFourWordPageBreaks +
// createTikTokStyleCaptions của @remotion/captions, xem node_modules/@remotion/captions/dist/
// create-tiktok-style-captions.js) — TẤT ĐỊNH, KHÔNG AI. Việc tính page-break/token chạy Ở ĐÂY
// (Node, lúc build), kết quả bake thẳng vào HTML tĩnh; phần script còn lại trong HTML chỉ là 1
// driver GSAP tuyến tính duy nhất tô màu cam từ đang phát (đúng khuyến nghị "one driver looping
// all words" của .agents/skills/hyperframes-animation/rules/asr-keyword-glow.md) — không fetch()
// runtime (vi phạm determinism-rules.md), không tính lại thuật toán trong browser.
//
// Usage: node poc/hyperframes/build-caption-track-poc.mjs

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const SLUG = "an-le-64";
const FPS = 30;
const WORDS_PER_LINE = 4; // CAPTION_STYLE.wordsPerLine (src/styles/theme.ts)
const PAGE_WINDOW_MS = 10_000; // combineTokensWithinMilliseconds (src/components/Captions.tsx)
const AUDIO_DURATION_SEC = 49.342917; // đo bằng ffprobe, public/videos/an-le-64/audio/narration.mp3

const CAPTIONS_JSON = path.join(root, "public", "videos", SLUG, "captions", "captions.json");
const OUT_HTML = path.join(root, "hyperframes", "videos", SLUG, "compositions", "caption-track.html");

// ---------------------------------------------------------------------------
// 1. Port applyFourWordPageBreaks (src/components/Captions.tsx dòng 32-59) — y hệt, không đổi.
// ---------------------------------------------------------------------------
function applyFourWordPageBreaks(captions) {
  let wordsOnPage = 0;
  return captions.map((caption) => {
    const trimmedText = caption.text.trim();
    const wordCount = trimmedText.length === 0 ? 0 : trimmedText.split(/\s+/).filter(Boolean).length;
    wordsOnPage += wordCount;

    const endsSentence = /[.!?…]["”']?$/.test(trimmedText);
    const pageBreakAfter =
      caption.pageBreakAfter === true || endsSentence || wordsOnPage >= WORDS_PER_LINE;

    if (pageBreakAfter) wordsOnPage = 0;

    return { ...caption, pageBreakAfter };
  });
}

// ---------------------------------------------------------------------------
// 2. Port createTikTokStyleCaptions (node_modules/@remotion/captions/dist/create-tiktok-style-
//    captions.js) — y hệt logic gốc, chỉ đổi tên biến cho rõ.
// ---------------------------------------------------------------------------
function createTikTokStyleCaptions(captions, combineTokensWithinMilliseconds) {
  const pages = [];
  let currentText = "";
  let currentTokens = [];
  let currentFrom = 0;
  let currentTo = 0;

  const add = () => {
    const text = currentText.endsWith("\n") ? currentText.slice(0, -1) : currentText;
    pages.push({ text: text.trimStart(), startMs: currentFrom, tokens: currentTokens, durationMs: Infinity });
    if (pages.length > 1) {
      pages[pages.length - 2].durationMs = currentFrom - pages[pages.length - 2].startMs;
    }
  };

  captions.forEach((item, index) => {
    const { text } = item;
    const exceedsDuration = currentTo - currentFrom > combineTokensWithinMilliseconds;
    const shouldBreakOnSilence = false; // breakOnSilenceAfterMilliseconds không dùng ở Captions.tsx

    if (text.startsWith(" ") && (exceedsDuration || shouldBreakOnSilence)) {
      if (currentText !== "") add();
      currentText = text.trimStart();
      currentTokens = [
        { text: text.trimStart(), fromMs: item.startMs, toMs: item.endMs, ...(item.pageBreakAfter ? { pageBreakAfter: true } : {}) },
      ].filter((t) => t.text !== "");
      currentFrom = item.startMs;
      currentTo = item.endMs;
    } else {
      if (currentText === "") currentFrom = item.startMs;
      const textToAppend = text;
      currentText += textToAppend;
      currentText = currentText.trimStart();
      if (text.trim() !== "") {
        currentTokens.push({
          text: currentTokens.length === 0 ? currentText.trimStart() : textToAppend,
          fromMs: item.startMs,
          toMs: item.endMs,
          ...(item.pageBreakAfter ? { pageBreakAfter: true } : {}),
        });
      }
      currentTo = item.endMs;
    }

    if (item.pageBreakAfter && currentText !== "") {
      add();
      currentText = "";
      currentTokens = [];
    }

    if (index === captions.length - 1 && currentText !== "") {
      add();
      pages[pages.length - 1].durationMs = currentTo - pages[pages.length - 1].startMs;
    }
  });

  const lastPage = pages[pages.length - 1];
  if (lastPage && lastPage.durationMs === Infinity) {
    lastPage.durationMs = currentTo - lastPage.startMs;
  }

  return pages;
}

// ---------------------------------------------------------------------------
// 3. Port đoạn tính startFrame/durationInFrames trong Captions.tsx (dòng 229-256) — CÓ 1 SỬA LỖI
//    so với bản gốc (đã xác nhận với người dùng ở Checkpoint A, bằng chứng vision agent thật):
//    bản gốc tính endFrame bằng Math.ceil(...) trong khi startFrame của trang KẾ lại dùng
//    Math.round(...) — khi phần thập phân của frame rơi vào khoảng (0, 0.5), 2 giá trị này lệch
//    nhau đúng 1 frame, khiến trang hiện tại "che" sang 1 frame đầu của trang kế (chồng chữ
//    thoáng qua 1/30s, không thấy khi phát video liên tục nhưng snapshot tĩnh của HyperFrames
//    bắt được rõ — xem báo cáo Checkpoint A). Ở ĐÂY endFrame của 1 trang (khi có trang kế) LUÔN
//    LẤY ĐÚNG startFrame đã làm tròn của trang kế, đảm bảo 2 trang luôn khít nhau tuyệt đối,
//    không chồng không hở. KHÔNG sửa src/components/Captions.tsx (ngoài phạm vi Giai đoạn A-E).
// ---------------------------------------------------------------------------
function computePageFrames(pages, compositionDurationFrames, fps) {
  const withStartFrame = pages.map((page) => ({
    ...page,
    startFrame: Math.max(0, Math.round((page.startMs / 1000) * fps)),
  }));

  return withStartFrame
    .map((page, index) => {
      const nextPage = withStartFrame[index + 1] ?? null;
      const lastToken = page.tokens[page.tokens.length - 1];
      const naturalEndMs = lastToken?.toMs ?? page.startMs + PAGE_WINDOW_MS;

      const endFrame = nextPage
        ? Math.min(compositionDurationFrames, nextPage.startFrame)
        : Math.min(compositionDurationFrames, Math.ceil((naturalEndMs / 1000) * fps));

      const durationInFrames = Math.max(1, endFrame - page.startFrame);

      if (page.startFrame >= compositionDurationFrames) return null;

      return { ...page, durationInFrames };
    })
    .filter(Boolean);
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// 4. Chạy pipeline tính toán.
// ---------------------------------------------------------------------------
const rawCaptions = JSON.parse(fs.readFileSync(CAPTIONS_JSON, "utf8"));
const withPageBreaks = applyFourWordPageBreaks(rawCaptions);
const pages = createTikTokStyleCaptions(withPageBreaks, PAGE_WINDOW_MS);

const compositionDurationFrames = Math.round(AUDIO_DURATION_SEC * FPS);
const pagesWithFrames = computePageFrames(pages, compositionDurationFrames, FPS);

console.log(`Đọc ${rawCaptions.length} caption -> ${pages.length} page (trước clamp) -> ${pagesWithFrames.length} page (sau clamp compositionDuration=${compositionDurationFrames} frame).`);

// ---------------------------------------------------------------------------
// 5. Sinh HTML — CSS lấy nguyên giá trị từ src/styles/theme.ts (CAPTION_STYLE/COLORS/FONT), vì
//    plan yêu cầu style-tokens.json dùng lại nguyên vẹn (planning/style-dna/style-tokens.json
//    mục "caption").
// ---------------------------------------------------------------------------
const totalDurationSec = compositionDurationFrames / FPS;

const pageDivs = pagesWithFrames
  .map((page) => {
    const startSec = page.startFrame / FPS;
    const durationSec = page.durationInFrames / FPS;
    const spans = page.tokens
      .map((t) => `<span class="word" data-from-ms="${t.fromMs}" data-to-ms="${t.toMs}">${escapeHtml(t.text)}</span>`)
      .join("");
    return `      <div class="clip caption-page" data-start="${startSec.toFixed(6)}" data-duration="${durationSec.toFixed(6)}">
        <div class="caption-card">${spans}</div>
      </div>`;
  })
  .join("\n");

const entranceTweens = pagesWithFrames
  .map((page) => {
    const startSec = (page.startFrame / FPS).toFixed(6);
    return `      tl.fromTo(pages[${pagesWithFrames.indexOf(page)}].querySelector(".caption-card"), {opacity: 0, y: 12}, {opacity: 1, y: 0, duration: ${(5 / FPS).toFixed(6)}, ease: "expo.out", immediateRender: false}, ${startSec});`;
  })
  .join("\n");

const html = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- head chỉ để tham khảo khi mở file trực tiếp — runtime bỏ qua, xem sub-compositions.md -->
  </head>
  <body>
    <template>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap" />
      <style>
        #root {
          position: absolute;
          inset: 0;
        }
        .caption-page {
          position: absolute;
          top: auto;
          left: 60px;
          right: 60px;
          bottom: 440px;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }
        .caption-card {
          max-width: 930px;
          padding: 12px 24px;
          border-radius: 14px;
          background: rgba(10, 10, 10, 0.8);
          color: #F7F4EC;
          font-family: "Be Vietnam Pro", sans-serif;
          font-weight: 900;
          font-size: 49px;
          line-height: 1.25;
          text-align: center;
          white-space: pre-wrap;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .caption-card .word.active {
          color: #FF6A1A;
        }
      </style>

      <div
        id="root"
        data-composition-id="caption-track"
        data-start="0"
        data-width="1080"
        data-height="1920"
        data-duration="${totalDurationSec.toFixed(6)}"
      >
${pageDivs}
      </div>

      <script>
        const pages = Array.from(document.querySelectorAll(".caption-page"));
        const words = Array.from(document.querySelectorAll(".word"));

        const tl = gsap.timeline({ paused: true });

        // Driver tuyến tính DUY NHẤT cho toàn bộ track (khuyến nghị của
        // hyperframes-animation/rules/asr-keyword-glow.md: "one driver looping all words",
        // không tạo 1 tween/từ). Port đúng logic isActive của Captions.tsx dòng 106-108:
        // token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs.
        const driver = { ms: 0 };
        tl.to(
          driver,
          {
            ms: ${(totalDurationSec * 1000).toFixed(3)},
            duration: ${totalDurationSec.toFixed(6)},
            ease: "none",
            onUpdate: () => {
              for (const w of words) {
                const fromMs = Number(w.dataset.fromMs);
                const toMs = Number(w.dataset.toMs);
                const isActive = fromMs <= driver.ms && toMs > driver.ms;
                w.classList.toggle("active", isActive);
              }
            },
          },
          0,
        );

        // Entrance mỗi page: opacity+translate 0->1 / 12px->0 trong 5 frame đầu (Captions.tsx
        // dòng 77-86, dùng easing built-in "expo.out" của GSAP để khớp cubic-bezier(0.16,1,0.3,1)
        // gốc — đây chính là "easeOutExpo" kinh điển (easings.net), không cần plugin CustomEase.
        // Đã đối chiếu bằng vision agent thật ở Checkpoint A: power2.out cho fade chậm hơn rõ rệt
        // ở khung hình đầu trang so với bản Remotion gốc, expo.out khớp sát hơn.
${entranceTweens}

        window.__timelines["caption-track"] = tl;
      </script>
    </template>
  </body>
</html>
`;

fs.mkdirSync(path.dirname(OUT_HTML), { recursive: true });
fs.writeFileSync(OUT_HTML, html, "utf8");
console.log(`Đã ghi ${OUT_HTML}`);
console.log(`Tổng thời lượng: ${totalDurationSec.toFixed(3)}s (${compositionDurationFrames} frame @ ${FPS}fps)`);
