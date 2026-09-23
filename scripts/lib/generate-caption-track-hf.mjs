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

// Đọc toạ độ khung caption từ style-tokens.json thay vì hardcode literal — 1 nguồn xác thực duy
// nhất, tránh lệch giữa file này/STYLE_DNA.md/caption-zone.mjs mỗi lần đổi vị trí caption (bài học
// thật: trước khi sửa chỗ này, 440px bị lặp lại thủ công ở 4 nơi khác nhau trong repo).
function readCaptionPosition(root) {
  const tokens = JSON.parse(fs.readFileSync(path.join(root, "planning", "style-dna", "style-tokens.json"), "utf8"));
  return tokens.caption.position;
}

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

  const captionPosition = readCaptionPosition(root);
  const rawCaptions = JSON.parse(fs.readFileSync(vp.captionsFile, "utf8"));
  const captions = Array.isArray(rawCaptions) ? rawCaptions : rawCaptions.captions;
  const withBreaks = applyFourWordPageBreaks(captions);
  const { pages } = createTikTokStyleCaptions({
    captions: withBreaks,
    combineTokensWithinMilliseconds: PAGE_WINDOW_MS,
  });

  const totalDurationSec = totalDurationMs / 1000;

  // Lỗi thật đã phát hiện (video "vua-chuot-ratking-phan-1", 2026-09-23): khi từ cuối 1 câu bị
  // Stage 2 (align qua 9router) gán startMs===endMs (0 độ dài, thường do nội suy timestamp sát
  // đúng mốc từ đầu câu kế tiếp), trang chứa từ đó nhận durationSec<=0 (endMs của trang này =
  // startMs của trang kế tiếp = chính startMs của nó). Một `.clip` với `data-duration="0"` KHÔNG
  // được HyperFrames runtime coi là "không bao giờ hiển thị" như kỳ vọng — quan sát thật: nó bị
  // kẹt hiển thị đè lên mọi trang sau đó suốt phần còn lại video (`hyperframes check` báo
  // content_overlap, heldMs~17.7s). Lọc bỏ hẳn các trang duration<=0 trước khi sinh HTML — trang
  // liền trước đã tự kết thúc đúng ngay mốc này (endMs tính từ startMs của trang kế tiếp trong
  // mảng `pages` gốc, không đổi dù trang 0-độ-dài có được lọc hay không) nên không tạo khoảng hở,
  // và nội dung 0ms này vốn dĩ không thể hiển thị được ở bất kỳ frame rời rạc nào nên không mất gì.
  const pageBlocksRaw = pages.map((page, i) => {
    const startSec = page.startMs / 1000;
    const endMs = i < pages.length - 1 ? pages[i + 1].startMs : totalDurationMs;
    const durationSec = endMs / 1000 - startSec;
    return { page, startSec, durationSec };
  });

  const pageBlocks = pageBlocksRaw
    .filter((p) => p.durationSec > 0)
    .map((p, i) => {
      const wordsHtml = p.page.tokens
        .map((t) => `<span class="word" data-from-ms="${t.fromMs}" data-to-ms="${t.toMs}">${escapeHtml(t.text)}</span>`)
        .join("");
      return {
        index: i,
        startSec: p.startSec,
        // data-layout-allow-caption-zone: caption-track LÀ nội dung thật sự thuộc caption band —
        // không có attribute này, `hyperframes check --caption-zone` tự báo caption_zone_collision
        // trên CHÍNH text caption của nó (xác nhận bằng test thật trên ban-an-473-phan-3: 4 finding
        // giả, source `compositions/caption-track.html`, text là chính các từ phụ đề như "là"/"tháng").
        // Áp dụng cho phần tử + mọi con cháu qua `closest` (data-attributes.md:69), nên đặt ở
        // .caption-page là đủ, không cần lặp lại trên từng <span class="word">.
        html: `      <div class="clip caption-page" data-start="${p.startSec.toFixed(6)}" data-duration="${p.durationSec.toFixed(6)}" data-layout-allow-caption-zone>
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
          left: ${captionPosition.left}px;
          right: ${captionPosition.right}px;
          bottom: ${captionPosition.bottom}px;
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
