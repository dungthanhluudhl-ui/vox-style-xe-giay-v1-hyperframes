// POC: so sánh chất lượng prompt ảnh (tiếng Anh) sinh bởi generateScenePrompts() trong
// scripts/02b-media-generate.router.mjs khi đổi tier scene_image_prompt_writer sang model rẻ
// hơn — duplicate tối thiểu phần system prompt gốc (chấp nhận trùng lặp tạm cho 1 lần audit,
// không tách hàm dùng chung để tránh đụng CLI chính đang chạy production).
//
// Usage: node poc/model-swap/compare-scene-prompts.mjs --video=<slug> --model=<model-id> [--style-notes="..."]
import fs from "node:fs";
import { callModel, extractText, extractJson } from "../../scripts/lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "../../scripts/lib/video-paths.mjs";

const modelArg = (process.argv.find((a) => a.startsWith("--model=")) || "").slice("--model=".length);
if (!modelArg) {
  console.error("Usage: node poc/model-swap/compare-scene-prompts.mjs --video=<slug> --model=<model-id> [--style-notes=\"...\"]");
  process.exit(1);
}
const styleNotes = (process.argv.find((a) => a.startsWith("--style-notes=")) || "").slice("--style-notes=".length);

const slug = getVideoSlug();
const vp = videoPaths(slug);
const scriptText = fs.readFileSync(vp.scriptFile, "utf8");

// --- duplicate tối thiểu từ scripts/02b-media-generate.router.mjs (IMAGE_STYLE + generateScenePrompts) ---
const IMAGE_STYLE = {
  aspectRatio: "9:16 vertical composition",
  defaultSetting: "Việt Nam",
  examplePrompts: [
    "Vox-style paper-tear animation aesthetic. Scene 5: The same middle-aged Vietnamese man (Trần Văn N) standing pale and shocked in the defendant's box of a formal wood-paneled Vietnamese courtroom. The composition uses layered paper collage with wood grain textures and sharp paper borders. Realistic Vietnamese courtroom and features. High contrast 2D illustration. 9:16 vertical composition",
    "Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 1: A middle-aged Vietnamese man (Trần Văn N) with short black hair and a rugged face, wearing a dark navy polo shirt. He is slamming a paper with '150 TRIỆU' written on it onto a wooden table. Background shows a typical Vietnamese house interior. Tactile paper textures, torn edges, high-contrast flat 2D illustration. Realistic Vietnamese features. 9:16 vertical composition",
  ],
};

async function generateScenePrompts(model, script, styleNotesArg) {
  const systemPrompt = `Bạn là chuyên gia viết prompt tạo ảnh AI theo phong cách "Vox-style" (xé giấy/cắt dán — paper cutout/collage) cho video ngắn dạng phóng sự/kể chuyện.

Nhiệm vụ: đọc kịch bản dưới đây, tự chia thành các phân cảnh hợp lý — SỐ LƯỢNG PHÂN CẢNH TỈ LỆ THUẬN VỚI ĐỘ DÀI KỊCH BẢN (kịch bản dài cần nhiều phân cảnh hơn để bao quát đủ nội dung, KHÔNG giới hạn cố định ở 5-6 cảnh) — rồi viết ĐÚNG 1 prompt tạo ảnh tiếng Anh cho mỗi phân cảnh.

Mỗi prompt PHẢI theo đúng cấu trúc đã chứng minh hiệu quả qua các ví dụ thật sau:
"""
${IMAGE_STYLE.examplePrompts.join("\n\n")}
"""

Quy tắc bắt buộc cho MỖI prompt:
- Luôn mở đầu bằng "Vox-style paper-tear animation aesthetic." hoặc "Vox-style paper cutout collage."
- Luôn kết thúc bằng "${IMAGE_STYLE.aspectRatio}"
- Luôn có cụm mô tả chất liệu giấy (vd "layered paper collage", "torn edges", "tactile paper textures", "high contrast 2D illustration")
- Bối cảnh: đọc kỹ kịch bản để xác định đúng địa điểm; nếu kịch bản không nêu rõ, mặc định lấy bối cảnh là ${IMAGE_STYLE.defaultSetting}
- QUAN TRỌNG NHẤT — nhất quán nhân vật: lần đầu một nhân vật xuất hiện, mô tả rõ ngoại hình (tuổi, kiểu tóc, trang phục...) gắn liền với tên; mọi prompt SAU đó nhắc lại nhân vật đó PHẢI DÙNG LẠI Y HỆT cụm mô tả ngoại hình đã dùng ở lần đầu (không đổi cách diễn đạt) để Flow tạo hình ảnh đồng nhất xuyên suốt. Áp dụng tương tự cho bối cảnh/địa điểm lặp lại.${
    styleNotesArg ? `\n- Ghi chú thêm cho video này: ${styleNotesArg}` : ""
  }

Trả về JSON đúng format: {"prompts": ["prompt phân cảnh 1 bằng tiếng Anh...", "prompt phân cảnh 2...", ...]}`;

  const startedAt = Date.now();
  const response = await callModel({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Kịch bản:\n"""${script.trim()}"""` },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.4,
    maxTokens: 4000,
  });
  const elapsedMs = Date.now() - startedAt;
  const parsed = extractJson(extractText(response));
  return { prompts: parsed.prompts, elapsedMs };
}

const { prompts, elapsedMs } = await generateScenePrompts(modelArg, scriptText, styleNotes);
console.log(`\n=== ${modelArg} — ${prompts.length} prompt, ${(elapsedMs / 1000).toFixed(1)}s ===\n`);
prompts.forEach((p, i) => console.log(`[Scene ${i + 1}]\n${p}\n`));
