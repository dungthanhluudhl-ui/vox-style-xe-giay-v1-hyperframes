// Chấm MÙ theo cặp 2 phiên bản của CÙNG 1 scene qua vision model (routing.vision_qa) — không có baseline
// "đã duyệt", không cho biết phiên bản nào là mới. Gọi 2 lần với thứ tự A/B đảo nhau để khử thiên vị vị
// trí. Claude KHÔNG xem ảnh, chỉ đọc JSON kết quả.
// Usage: node judge-pair.mjs <framesDirX> <framesDirY> <context> <outJson>
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
process.chdir(R); // router-client đọc .env theo cwd
const { callModel, extractText, extractJson, imageContentFromFile, loadModelRouting } = await import(pathToFileURL(path.join(R, "scripts/lib/router-client.mjs")).href);
const [dirX, dirY, context, outJson] = process.argv.slice(2);
const MODEL = loadModelRouting(R).vision_qa;

function smallFrames(dir) {
  const snap = path.join(dir, "snapshots");
  const out = path.join(dir, "small"); fs.mkdirSync(out, { recursive: true });
  return fs.readdirSync(snap).filter((f) => /^frame-.*\.png$/.test(f)).sort().map((f) => {
    const dst = path.join(out, f.replace(/\.png$/, ".jpg"));
    if (!fs.existsSync(dst)) execSync(`ffmpeg -y -loglevel error -i "${path.join(snap, f)}" -vf scale=540:-1 -q:v 4 "${dst}"`);
    return dst;
  });
}

const RUBRIC = `Bạn là giám khảo độc lập chấm 2 phiên bản (A và B) của CÙNG 1 scene video dọc 9:16 phong cách "xé giấy" Vox-style. STYLE DNA: nền giấy ngà #E7E3D9, mực #141414, cam nhấn DUY NHẤT #FF6A1A, font Be Vietnam Pro đậm, ảnh người grayscale, bố cục collage giấy xé. Mỗi phiên bản là vài khung hình trích theo thứ tự thời gian.
BỐI CẢNH SCENE: ${context}

Chấm TỪNG phiên bản thang 1-10 cho 4 tiêu chí:
- style: khớp Style DNA (bảng màu, font, cảm giác giấy xé/collage).
- clarity: dễ đọc, không lỗi hiển thị (chữ bị che/đè, tràn khung, vỡ layout, ảnh/video mất hoặc méo, khung trống).
- creativity: bố cục/cách dàn dựng sáng tạo, đa dạng, hấp dẫn thị giác, KHÔNG rập khuôn nhàm chán.
- overall: chất lượng tổng thể như 1 cảnh trong video thật.
Rồi chọn winner: "A", "B" hoặc "tie" (chỉ tie khi thật sự ngang nhau).
Trả DUY NHẤT JSON: {"A":{"style":n,"clarity":n,"creativity":n,"overall":n},"B":{...},"winner":"A|B|tie","reason":"1-2 câu","issuesA":["..."],"issuesB":["..."]}`;

async function judge(first, second) {
  const content = [{ type: "text", text: `${RUBRIC}\n\nThứ tự ảnh: ${first.length} ảnh phiên bản A, sau đó ${second.length} ảnh phiên bản B.` },
    ...first.map((p) => imageContentFromFile(p, "image/jpeg")), ...second.map((p) => imageContentFromFile(p, "image/jpeg"))];
  const res = await callModel({ model: MODEL, messages: [{ role: "user", content }], temperature: 0.1, maxTokens: 900, responseFormat: { type: "json_object" } });
  return extractJson(extractText(res));
}

const fx = smallFrames(dirX), fy = smallFrames(dirY);
const r1 = await judge(fx, fy); // X = A
const r2 = await judge(fy, fx); // Y = A
const avg = (k, who) => ((who === "X" ? r1.A[k] + r2.B[k] : r1.B[k] + r2.A[k]) / 2);
const keys = ["style", "clarity", "creativity", "overall"];
const result = {
  model: MODEL, context, dirX, dirY,
  X: Object.fromEntries(keys.map((k) => [k, avg(k, "X")])),
  Y: Object.fromEntries(keys.map((k) => [k, avg(k, "Y")])),
  winners: [r1.winner === "A" ? "X" : r1.winner === "B" ? "Y" : "tie", r2.winner === "A" ? "Y" : r2.winner === "B" ? "X" : "tie"],
  raw: [r1, r2],
};
fs.writeFileSync(outJson, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ X: result.X, Y: result.Y, winners: result.winners }));
