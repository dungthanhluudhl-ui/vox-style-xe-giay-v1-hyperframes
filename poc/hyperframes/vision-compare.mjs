// So sánh hình ảnh qua model vision của 9router (KHÔNG để Claude tự xem ảnh trực tiếp —
// đúng nguyên tắc kiến trúc repo này, giống scripts/03-media-analyze.router.mjs). Claude chỉ
// đọc mô tả/kết luận dạng text mà script này in ra.
// Usage: node poc/hyperframes/vision-compare.mjs <label1>=<path1> <label2>=<path2> ["câu hỏi tuỳ chọn"]
import path from "node:path";
import {
  callModel,
  extractText,
  imageContentFromFile,
  loadModelRouting,
} from "../../scripts/lib/router-client.mjs";

const root = process.cwd();
const routing = loadModelRouting(root);
const VISION_MODEL = routing.vision_standard;

const pairs = process.argv.slice(2).filter((a) => a.includes("="));
const question = process.argv.slice(2).find((a) => !a.includes("="));

if (pairs.length === 0) {
  console.error('Usage: node vision-compare.mjs label1=path1.png label2=path2.png ["câu hỏi"]');
  process.exit(1);
}

const images = pairs.map((p) => {
  const idx = p.indexOf("=");
  const label = p.slice(0, idx);
  const filePath = p.slice(idx + 1);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
  return { label, filePath, content: imageContentFromFile(path.join(root, filePath), mime) };
});

const defaultQuestion = `So sánh các hình ảnh trên (đã đánh nhãn theo thứ tự). Đánh giá theo Style DNA của dự án (màu ink/cam, font Be Vietnam Pro đậm, box nhãn viền cam, background treatment): có giữ đúng tông màu/bố cục/typography không? Khác biệt cụ thể nào đáng chú ý (vị trí overlay, kiểu box, độ đậm vignette, độ khớp với ý đồ biên tập)? Trả lời ngắn gọn, có cấu trúc, khách quan.`;

const content = [
  { type: "text", text: (question || defaultQuestion) + "\n\nThứ tự ảnh: " + images.map((i) => i.label).join(", ") },
  ...images.map((i) => i.content),
];

const response = await callModel({
  model: VISION_MODEL,
  messages: [{ role: "user", content }],
  temperature: 0.2,
  maxTokens: 1200,
});

console.log(extractText(response));
