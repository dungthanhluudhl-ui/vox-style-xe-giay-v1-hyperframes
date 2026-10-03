// QA bố cục bằng vision qua 9router[vision_qa] — Claude KHÔNG tự xem ảnh. Chỉ hỏi về BỐ CỤC (không bắt chép chữ).
// Chạy từ gốc repo (nạp .env qua biến môi trường):
//   node scripts/qa/vision-qa.mjs --video=<slug> --frames=S01:1,3,5.5;S02:7.5,9,10.5,11.5;...
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { callModel, extractText, extractJson, imageContentFromFile, loadModelRouting } from "../lib/router-client.mjs";

const slug = process.argv.find((a) => a.startsWith("--video="))?.slice(8);
let spec = process.argv.find((a) => a.startsWith("--frames="))?.slice(9);
// --auto: lấy khung GIỮA mỗi shot từ scene-plan/shotlist của thư mục run (kèm kind của scene)
if (!spec && process.argv.includes("--auto")) {
  const plan = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
  const shots = JSON.parse(fs.readFileSync(`planning/videos/${slug}/shotlist.json`, "utf8"));
  const kindOf = Object.fromEntries(plan.map((s) => [s.id, s.kind]));
  const by = {};
  for (const sh of shots) (by[sh.sceneId] ??= []).push(((sh.startMs + sh.endMs) / 2000).toFixed(1));
  spec = Object.entries(by).map(([id, ts]) => `${id}:${ts.join(",")}`).join(";");
  globalThis.__kindOf = kindOf;
}
if (!slug || !spec) { console.error("Thiếu --video= hoặc --frames=/--auto"); process.exit(1); }
const video = path.join("out", `${slug}-full.mp4`);
const outDir = path.join("out", "vqa");
fs.mkdirSync(outDir, { recursive: true });
const model = loadModelRouting().vision_qa;

const items = spec.split(";").flatMap((g) => {
  const [scene, ts] = g.split(":");
  return ts.split(",").map((t) => ({ scene, t: Number(t) }));
});

const QUESTION = `Đây là 1 khung hình dọc 1080x1920 của video giải thích kiểu giấy xé. Dải phụ đề (nền đen mờ, chữ trắng) nằm quanh y≈1500-1550 là phụ đề hợp lệ của video — KHÔNG tính là lỗi. Hãy đánh giá BỐ CỤC (không cần đọc/chép nội dung chữ). Trả về DUY NHẤT JSON:
{"textOutsideCaption": true/false (có chữ/nhãn/tiêu đề/thẻ nào ngoài dải phụ đề, KỂ CẢ chữ nằm trong ảnh minh hoạ gốc? hãy phân biệt: "textOverlayAdded": có lớp chữ/thẻ do dựng thêm đặt lên hình hay không),
 "textOverlayAdded": true/false,
 "overlappingElements": true/false (có phần tử chữ/thẻ/nhân vật/hình chồng đè nhau gây khó nhìn),
 "tiltedElements": true/false (có chữ/thẻ/khung bị nghiêng/xoay),
 "blackBarsOrOverflow": true/false (có mảng đen, viền trống bất thường, media tràn/cắt lệch khung),
 "subjectCutOff": true/false (nhân vật/chủ thể chính bị cắt mất đầu/tay/chân),
 "overlapsCaption": true/false (nhân vật/hình đè lên dải phụ đề làm khó đọc),
 "looksProfessional": 1-5 (độ gọn gàng, chuyên nghiệp của bố cục),
 "issues": ["mô tả ngắn từng lỗi bố cục nếu có, tiếng Việt"]}`;

async function one({ scene, t }) {
  const jpg = path.join(outDir, `${scene}_${t}.jpg`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(t), "-i", video, "-frames:v", "1", "-vf", "scale=540:960", "-q:v", "4", jpg]);
  const r = await callModel({
    model,
    messages: [{ role: "user", content: [{ type: "text", text: QUESTION }, imageContentFromFile(jpg, "image/jpeg")] }],
    temperature: 0.1, maxTokens: 1200, timeoutMs: 300000, responseFormat: { type: "json_object" },
  });
  let j; try { j = extractJson(extractText(r)); } catch { j = { parseError: extractText(r).slice(0, 300) }; }
  return { scene, kind: globalThis.__kindOf?.[scene] ?? null, t, ...j };
}

const results = [];
const queue = [...items];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) results.push(await one(queue.shift())); }));
results.sort((a, b) => a.t - b.t);
fs.writeFileSync(path.join(outDir, "vision-qa.json"), JSON.stringify({ model, results }, null, 2));
for (const r of results) {
  console.log(`${r.scene}[${r.kind ?? "?"}] @${r.t}s: overlay=${r.textOverlayAdded} chồng=${r.overlappingElements} nghiêng=${r.tiltedElements} đen/tràn=${r.blackBarsOrOverflow} cắt=${r.subjectCutOff} đèCaption=${r.overlapsCaption} điểm=${r.looksProfessional}${r.issues?.length ? " | " + r.issues.join("; ") : ""}${r.parseError ? " | PARSE: " + r.parseError : ""}`);
}

// Thống kê theo loại cảnh
const agg = {};
for (const r of results) {
  const a = (agg[r.kind ?? "?"] ??= { n: 0, overlay: 0, overlap: 0, tilt: 0, blackOverflow: 0, cut: 0, overlapsCaption: 0, score: 0 });
  a.n++; a.overlay += r.textOverlayAdded ? 1 : 0; a.overlap += r.overlappingElements ? 1 : 0; a.tilt += r.tiltedElements ? 1 : 0;
  a.blackOverflow += r.blackBarsOrOverflow ? 1 : 0; a.cut += r.subjectCutOff ? 1 : 0; a.overlapsCaption += r.overlapsCaption ? 1 : 0; a.score += Number(r.looksProfessional) || 0;
}
console.log("\nTHỐNG KÊ THEO LOẠI CẢNH (số khung có cờ / tổng khung | điểm TB):");
for (const [k, a] of Object.entries(agg)) console.log(`  ${k}: ${a.n} khung | overlay=${a.overlay} chồng=${a.overlap} nghiêng=${a.tilt} đen/tràn=${a.blackOverflow} cắt=${a.cut} đèCaption=${a.overlapsCaption} | điểm TB=${(a.score / a.n).toFixed(2)}`);
