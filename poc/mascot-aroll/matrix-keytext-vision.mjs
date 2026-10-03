// A1 (phần 2): vision QA (9router, Claude KHÔNG tự xem ảnh) trên MỌI ảnh chụp của ma trận chữ A-roll — chỉ hỏi những gì `hyperframes check` không biết:
// chữ có đọc RÕ không, có che mặt/chủ thể không, ảnh nền còn nhận ra không, chữ có bị cắt/tràn không. Chạy từ thư mục run sau matrix-keytext.mjs:
//   node ../matrix-keytext-vision.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const cwd = process.cwd();
const { callModel, extractText, extractJson, imageContentFromFile, loadModelRouting } = await import(pathToFileURL(path.join(cwd, "scripts", "lib", "router-client.mjs")).href);
const model = loadModelRouting().vision_qa;
const dir = path.join(cwd, "out", "matrix");
// chỉ các tổ hợp trong kết quả ma trận MỚI NHẤT (thư mục ảnh của tổ hợp đã bỏ vẫn còn trên đĩa, không đụng tới)
const ids = JSON.parse(fs.readFileSync(path.join(cwd, "out", "matrix-results.json"), "utf8")).filter((r) => r.png).map((r) => r.id).sort();
const jpgDir = path.join(dir, "_jpg");
fs.mkdirSync(jpgDir, { recursive: true });
const Q = `Khung dọc 1080x1920 của video giải thích. Có MỘT dòng CHỮ lớn nhấn mạnh (không thẻ/khung) hiện trên/cạnh ảnh nền (ảnh có thể đã bị làm mờ-tối, hoặc thu nhỏ để chừa dải giấy cho chữ). Dải phụ đề (nền đen mờ, chữ trắng) quanh y≈1500-1550 nếu có là phụ đề riêng, KHÔNG tính. Chỉ trả JSON:
{"textReadable": 1-5 (chữ lớn đọc RÕ, tương phản và cỡ đủ), "textClippedOrOverflow": true/false (chữ bị cắt/tràn mép khung/bị che một phần), "textCoversFaces": true/false, "textCoversKeySubject": true/false (chữ che chủ thể quan trọng của ảnh), "backgroundRecognizable": true/false, "looksPolished": 1-5, "issues": ["lỗi ngắn, tiếng Việt"]}`;
const results = [];
const queue = [...ids];
async function one(id) {
  const png = fs.readdirSync(path.join(dir, id)).find((f) => f.endsWith(".png"));
  if (!png) return { id, error: "không có ảnh" };
  const jpg = path.join(jpgDir, `${id}.jpg`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", path.join(dir, id, png), "-vf", "scale=540:960", "-q:v", "4", jpg]);
  const r = await callModel({ model, messages: [{ role: "user", content: [{ type: "text", text: Q }, imageContentFromFile(jpg, "image/jpeg")] }], temperature: 0.1, maxTokens: 900, timeoutMs: 300000, responseFormat: { type: "json_object" } });
  let j; try { j = extractJson(extractText(r)); } catch { j = { parseError: extractText(r).slice(0, 200) }; }
  return { id, ...j };
}
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) results.push(await one(queue.shift())); }));
results.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(path.join(cwd, "out", "matrix-vision.json"), JSON.stringify({ model, results }, null, 2));
const by = (k) => { const o = {}; for (const r of results) { const key = k(r); (o[key] ??= []).push(r); } return o; };
const avg = (a, f) => (a.reduce((s, r) => s + (Number(f(r)) || 0), 0) / a.length).toFixed(2);
console.log("THEO TREATMENT (số ảnh | đọc rõ TB | đẹp TB | chữ cắt/tràn | che mặt | che chủ thể):");
for (const [t, a] of Object.entries(by((r) => r.id.split("__")[1]))) console.log(`  ${t.padEnd(11)} ${a.length} | ${avg(a, (r) => r.textReadable)} | ${avg(a, (r) => r.looksPolished)} | ${a.filter((r) => r.textClippedOrOverflow).length} | ${a.filter((r) => r.textCoversFaces).length} | ${a.filter((r) => r.textCoversKeySubject).length}`);
console.log("THEO HÌNH THỨC:");
for (const [t, a] of Object.entries(by((r) => r.id.split("__")[2]))) console.log(`  ${t.padEnd(11)} ${a.length} | ${avg(a, (r) => r.textReadable)} | ${avg(a, (r) => r.looksPolished)} | cắt/tràn ${a.filter((r) => r.textClippedOrOverflow).length}`);
console.log("ẢNH CÓ VẤN ĐỀ (đọc rõ ≤3, hoặc chữ cắt/tràn, hoặc ảnh nền không nhận ra):");
let n = 0;
for (const r of results) if (r.error || r.parseError || r.textReadable <= 3 || r.textClippedOrOverflow || r.backgroundRecognizable === false) { n++; console.log(`  ${r.id}: đọc rõ ${r.textReadable} | cắt/tràn ${r.textClippedOrOverflow} | nền nhận ra ${r.backgroundRecognizable} | ${(r.issues ?? [r.error ?? r.parseError]).join("; ").slice(0, 160)}`); }
console.log(`${results.length} ảnh, ${n} có vấn đề`);
