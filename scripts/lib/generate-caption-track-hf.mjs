// Sinh compositions/caption-track.html TẤT ĐỊNH (không AI) từ public/videos/<slug>/captions/
// captions.json — tổng quát hoá đúng bản viết tay + đã kiểm chứng ở Giai đoạn A
// (hyperframes/videos/an-le-64/compositions/caption-track.html, style/timing đã qua vision-agent
// Checkpoint A), để MỌI video mới tự có phụ đề mà KHÔNG cần viết tay lại.
//
// Lỗi thật đã phát hiện (video "ban-an-473-phan-1", 2026-09-21): file caption-track.html của
// Giai đoạn A trước đây CHỈ tồn tại thủ công, hard-code riêng cho an-le-64 (chữ/mốc thời gian/tween
// viết cứng trong HTML) — chưa từng được tổng quát hoá thành 1 bước sinh tất định trong pipeline
// sản xuất thật, nên video mới hoàn toàn KHÔNG có phụ đề dù mọi stage khác PASS. Đây đúng loại lỗi
// "POC đã kiểm chứng nhưng chưa generalize" (xem memory feedback_incremental_buildout).
//
// Thuật toán PORT 1:1 từ src/components/Captions.tsx (bản Remotion, đã qua Checkpoint A đối chiếu
// vision-agent với video gốc): applyFourWordPageBreaks() ngắt trang mỗi CAPTION_STYLE.wordsPerLine
// (4) từ hoặc hết câu, sau đó dùng ĐÚNG hàm createTikTokStyleCaptions() thật của package
// @remotion/captions (không tự viết lại logic gộp trang — script Node này chạy ở pipeline time nên
// dùng thẳng package được; khác với composition HTML runtime trong trình duyệt, nơi KHÔNG được phép
// phụ thuộc package ngoài).
//
// Thời lượng mỗi trang: khác bản Remotion (frame-quantized theo fps), bản GSAP dùng thời gian liên
// tục nên đơn giản hoá đúng theo giá trị ĐÃ kiểm chứng ở bản viết tay an-le-64: mỗi trang kéo dài
// tới đúng lúc trang KẾ TIẾP bắt đầu (không phải tới hết token cuối của chính nó — lệch vài ms giữa
// 2 mốc chỉ là nhiễu bình thường của timestamp align, ưu tiên mốc trang sau để không hở khoảng
// trắng giữa 2 trang); trang CUỐI kéo dài tới hết composition.
import fs from "node:fs";
import path from "node:path";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { videoPaths } from "./video-paths.mjs";

const WORDS_PER_LINE = 4; // CAPTION_STYLE.wordsPerLine trong src/styles/theme.ts (dùng chung mọi video)
const PAGE_WINDOW_MS = 10_000; // PAGE_WINDOW_MS trong Captions.tsx (combineTokensWithinMilliseconds)

function applyFourWordPageBreaks(captions) {
  let wordsOnPage = 0;
  return captions.map((caption) => {
    const trimmed = caption.text.trim();
    const wordCount = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
    wordsOnPage += wordCount;
    const endsSentence = /[.!?…]["”']?$/.test(trimmed);
    const pageBreakAfter = caption.pageBreakAfter === true || endsSentence || wordsOnPage >= WORDS_PER_LINE;
    if (pageBreakAfter) wordsOnPage = 0;
    return { ...caption, pageBreakAfter };
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Sinh (ghi đè tất định) compositions/caption-track.html cho video `slug`. `totalDurationMs`
 * phải là tổng thời lượng thật của composition (vd tính từ scene plan, xem syncRootHf()).
 * Bỏ qua (trả về null) nếu video chưa có captions.json — video vẫn ráp được, chỉ thiếu phụ đề. */
export function generateCaptionTrackHf(slug, totalDurationMs, root = process.cwd()) {
  const vp = videoPaths(slug, root);
  if (!fs.existsSync(vp.captionsFile)) return null;

  const rawCaptions = JSON.parse(fs.readFileSync(vp.captionsFile, "utf8"));
  const captions = Array.isArray(rawCaptions) ? rawCaptions : rawCaptions.captions;
  const withBreaks = applyFourWordPageBreaks(captions);
  const { pages } = createTikTokStyleCaptions({
    captions: withBreaks,
    combineTokensWithinMilliseconds: PAGE_WINDOW_MS,
  });

  const totalDurationSec = totalDurationMs / 1000;

  const pageBlocks = pages.map((page, i) => {
    const startSec = page.startMs / 1000;
    const endMs = i < pages.length - 1 ? pages[i + 1].startMs : totalDurationMs;
    const durationSec = endMs / 1000 - startSec;
    const wordsHtml = page.tokens
      .map((t) => `<span class="word" data-from-ms="${t.fromMs}" data-to-ms="${t.toMs}">${escapeHtml(t.text)}</span>`)
      .join("");
    return {
      index: i,
      startSec,
      html: `      <div class="clip caption-page" data-start="${startSec.toFixed(6)}" data-duration="${durationSec.toFixed(6)}">
        <div class="caption-card">${wordsHtml}</div>
      </div>`,
    };
  });

  const entranceLines = pageBlocks
    .map(
      (p) =>
        `      tl.fromTo(pages[${p.index}].querySelector(".caption-card"), {opacity: 0, y: 12}, {opacity: 1, y: 0, duration: 0.166667, ease: "expo.out", immediateRender: false}, ${p.startSec.toFixed(6)});`,
    )
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
${pageBlocks.map((p) => p.html).join("\n")}
      </div>

      <script>
        const pages = Array.from(document.querySelectorAll(".caption-page"));
        const words = Array.from(document.querySelectorAll(".word"));

        const tl = gsap.timeline({ paused: true });

        // Driver tuyến tính DUY NHẤT cho toàn bộ track (khuyến nghị của
        // hyperframes-animation/rules/asr-keyword-glow.md: "one driver looping all words",
        // không tạo 1 tween/từ). Port đúng logic isActive của Captions.tsx: token.fromMs <=
        // absoluteTimeMs && token.toMs > absoluteTimeMs.
        const driver = { ms: 0 };
        tl.to(
          driver,
          {
            ms: ${totalDurationMs},
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

        // Entrance mỗi page: opacity+translate 0->1 / 12px->0 trong 5 frame đầu (Captions.tsx),
        // dùng "expo.out" của GSAP để khớp cubic-bezier(0.16,1,0.3,1) gốc — đã đối chiếu bằng
        // vision agent thật ở Checkpoint A.
${entranceLines}

        window.__timelines["caption-track"] = tl;
      </script>
    </template>
  </body>
</html>
`;

  fs.mkdirSync(vp.hfCompositionsDir, { recursive: true });
  fs.writeFileSync(path.join(vp.hfCompositionsDir, "caption-track.html"), html, "utf8");
  return { pageCount: pages.length };
}
