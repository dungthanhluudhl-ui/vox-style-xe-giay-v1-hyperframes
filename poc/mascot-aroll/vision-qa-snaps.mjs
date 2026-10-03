// Vision QA (9router) cho snapshot test định dạng chữ mascot. Claude KHÔNG tự xem ảnh. Chạy từ thư mục run (cần .env qua biến môi trường).
//   node ../vision-qa-snaps.mjs ../c-text-test/snaps
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { callModel, extractText, extractJson, imageContentFromFile, loadModelRouting } from "./run-v2/scripts/lib/router-client.mjs";

const dir = path.resolve(process.argv[2]);
const model = loadModelRouting().vision_qa;
const outDir = path.join(process.cwd(), "out", "vqa-snaps");
fs.mkdirSync(outDir, { recursive: true });
const cases = fs.readdirSync(dir).filter((d) => fs.statSync(path.join(dir, d)).isDirectory());
const Q = `Khung dọc 1080x1920 của video giải thích kiểu giấy xé: nền giấy be có lưới ô vuông mờ, nhân vật capybara NHỎ đứng ở phần dưới (lệch trái hoặc phải), phía trên nhân vật có MỘT khối chữ ngắn bổ trợ (bong bóng suy nghĩ / trích dẫn / cụm nhấn / thẻ câu hỏi / giấy ghi chú / dấu đóng). Dải phụ đề (nếu có) ở y≈1500 không tính. Đánh giá BỐ CỤC, không cần chép chữ. Trả về DUY NHẤT JSON:
{"textOverlapsMascot": true/false, "textClippedOrOverflow": true/false, "textReadable": true/false (cỡ chữ đủ lớn, tương phản đủ), "tiltedElements": true/false, "mascotSizeFeel": "quá nhỏ|vừa phải|vẫn quá to", "textMascotRelation": "gắn kết|rời rạc", "looksProfessional": 1-5, "issues": ["lỗi bố cục ngắn gọn, tiếng Việt"]}`;
const results = [];
const queue = [...cases];
async function one(name) {
  const png = fs.readdirSync(path.join(dir, name)).find((f) => f.endsWith(".png"));
  const jpg = path.join(outDir, `${name}.jpg`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", path.join(dir, name, png), "-vf", "scale=540:960", "-q:v", "4", jpg]);
  const r = await callModel({ model, messages: [{ role: "user", content: [{ type: "text", text: Q }, imageContentFromFile(jpg, "image/jpeg")] }], temperature: 0.1, maxTokens: 900, timeoutMs: 300000, responseFormat: { type: "json_object" } });
  let j; try { j = extractJson(extractText(r)); } catch { j = { parseError: extractText(r).slice(0, 200) }; }
  return { name, ...j };
}
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) results.push(await one(queue.shift())); }));
results.sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync(path.join(outDir, "vision-qa-snaps.json"), JSON.stringify({ model, results }, null, 2));
for (const r of results) console.log(`${r.name.padEnd(20)} đèMascot=${r.textOverlapsMascot} cắt/tràn=${r.textClippedOrOverflow} đọcĐược=${r.textReadable} nghiêng=${r.tiltedElements} cỡMascot=${r.mascotSizeFeel} gắnKết=${r.textMascotRelation} điểm=${r.looksProfessional}${r.issues?.length ? " | " + r.issues.join("; ") : ""}${r.parseError ? " | PARSE " + r.parseError : ""}`);
const avg = results.reduce((a, r) => a + (Number(r.looksProfessional) || 0), 0) / results.length;
console.log(`\nTB điểm ${avg.toFixed(2)} | đè mascot ${results.filter((r) => r.textOverlapsMascot).length} | cắt/tràn ${results.filter((r) => r.textClippedOrOverflow).length} | không đọc được ${results.filter((r) => r.textReadable === false).length} | nghiêng ${results.filter((r) => r.tiltedElements).length}`);
