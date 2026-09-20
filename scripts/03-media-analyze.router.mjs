// Phân tích ảnh/video nguồn qua 9router[vision]: mô tả, gắn tag, đề xuất visual language.
// Đồng thời CHUẨN HOÁ tên file (slug ngắn theo nội dung thật) + ghi manifest tổng hợp để các
// giai đoạn sau (scene plan, shotlist, code-gen) dễ tra cứu bằng ID thay vì tên file gốc dài.
// Claude không mở ảnh/video này — toàn bộ việc "nhìn" do model qua 9router đảm nhiệm.
// Usage: node scripts/03-media-analyze.router.mjs --video=<slug>
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  callModel,
  extractText,
  extractJson,
  imageContentFromFile,
  loadModelRouting,
  appendRunLog,
} from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";

const routing = loadModelRouting();
const model = routing.vision_standard;

const slug = getVideoSlug();
const vp = videoPaths(slug);
const IMAGES_DIR = vp.imagesDir;
const VIDEOS_DIR = vp.videosDir;

const VISUAL_LANGUAGES = [
  "cutout",
  "map",
  "diagram",
  "timeline",
  "flow",
  "data",
  "background-photo",
  "split",
  "quote",
  "document",
  "annotated",
  "mockup",
  "text-only",
];

function slugify(s) {
  return (s || "asset")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function ffprobeJson(file) {
  const out = execSync(`ffprobe -v error -print_format json -show_format -show_streams "${file}"`).toString();
  return JSON.parse(out);
}

async function callAnalysis(userContent) {
  const systemPrompt = `Bạn phân tích 1 asset media (ảnh hoặc frame trích từ video) nguồn cho video giải thích pháp luật kiểu "Vox-style" (grayscale + cam, khung dọc 9:16, chủ đề vụ án hình sự). Trả về JSON object đúng format:
{
  "description": "mô tả ngắn gọn bằng tiếng Việt: đối tượng, hành động, bối cảnh, tông màu/ánh sáng",
  "tags": ["3-6 từ khoá ngắn, tiếng Việt"],
  "suggested_slug": "3-5 từ tiếng Anh không dấu, kebab-case, mô tả đúng nội dung chính, dùng làm tên file",
  "visual_language": "một giá trị trong [${VISUAL_LANGUAGES.join(", ")}] phù hợp nhất, hoặc null nếu không rõ",
  "suitability_notes": "gợi ý ngắn nên dùng minh hoạ cho loại cảnh/ý nào trong 1 video vụ án hình sự (vd: cảnh mở đầu, cảnh nạn nhân lo lắng, cảnh ra toà...)"
}
Chỉ trả JSON object, không giải thích gì thêm ngoài JSON.`;

  const response = await callModel({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    temperature: 0.3,
    maxTokens: 1000,
    responseFormat: { type: "json_object" },
  });
  const text = extractText(response);
  return extractJson(text);
}

async function analyzeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  return callAnalysis([
    { type: "text", text: "Đây là 1 ảnh nguồn. Mô tả và phân loại nó theo đúng format yêu cầu." },
    imageContentFromFile(filePath, mime),
  ]);
}

async function analyzeVideo(filePath) {
  const tmpDir = path.join(process.cwd(), "pipeline", ".cache", "frames");
  fs.mkdirSync(tmpDir, { recursive: true });
  const base = slugify(path.basename(filePath, path.extname(filePath)));
  const frame1 = path.join(tmpDir, `${base}-f1.jpg`);
  const frame2 = path.join(tmpDir, `${base}-f2.jpg`);
  execSync(`ffmpeg -y -v error -ss 1 -i "${filePath}" -frames:v 1 "${frame1}"`);
  execSync(`ffmpeg -y -v error -ss 4 -i "${filePath}" -frames:v 1 "${frame2}"`);
  try {
    return await callAnalysis([
      {
        type: "text",
        text: "Đây là 2 khung hình đại diện (giây thứ 1 và giây thứ 4) trích từ 1 video nguồn dài 8 giây. Mô tả nội dung/chuyển động chung của video và phân loại nó theo đúng format yêu cầu.",
      },
      imageContentFromFile(frame1, "image/jpeg"),
      imageContentFromFile(frame2, "image/jpeg"),
    ]);
  } finally {
    fs.rmSync(frame1, { force: true });
    fs.rmSync(frame2, { force: true });
  }
}

const manifest = [];

const imageFiles = fs.readdirSync(IMAGES_DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));
let imgIndex = 1;
for (const file of imageFiles) {
  const fullPath = path.join(IMAGES_DIR, file);
  console.log(`[${imgIndex}/${imageFiles.length}] Đang phân tích ảnh: ${file}`);
  const analysis = await analyzeImage(fullPath);
  const ext = path.extname(file);
  const id = `img-${String(imgIndex).padStart(2, "0")}`;
  const newName = `${id}-${slugify(analysis.suggested_slug || analysis.tags?.[0])}${ext}`;
  const newPath = path.join(IMAGES_DIR, newName);
  fs.renameSync(fullPath, newPath);
  const meta = ffprobeJson(newPath);
  const stream = meta.streams.find((s) => s.codec_type === "video");
  manifest.push({
    id,
    type: "image",
    file: `public/videos/${slug}/media/images/${newName}`,
    originalFilename: file,
    width: stream?.width,
    height: stream?.height,
    ...analysis,
  });
  imgIndex++;
}

const videoFiles = fs.readdirSync(VIDEOS_DIR).filter((f) => /\.mp4$/i.test(f));
let vidIndex = 1;
for (const file of videoFiles) {
  const fullPath = path.join(VIDEOS_DIR, file);
  console.log(`[${vidIndex}/${videoFiles.length}] Đang phân tích video: ${file}`);
  const analysis = await analyzeVideo(fullPath);
  const ext = path.extname(file);
  const id = `vid-${String(vidIndex).padStart(2, "0")}`;
  const newName = `${id}-${slugify(analysis.suggested_slug || analysis.tags?.[0])}${ext}`;
  const newPath = path.join(VIDEOS_DIR, newName);
  fs.renameSync(fullPath, newPath);
  const meta = ffprobeJson(newPath);
  const vStream = meta.streams.find((s) => s.codec_type === "video");
  manifest.push({
    id,
    type: "video",
    file: `public/videos/${slug}/media/videos/${newName}`,
    originalFilename: file,
    width: vStream?.width,
    height: vStream?.height,
    durationSec: Number(meta.format.duration),
    fps: vStream?.r_frame_rate,
    ...analysis,
  });
  vidIndex++;
}

fs.mkdirSync(path.dirname(vp.manifestJson), { recursive: true });
fs.writeFileSync(vp.manifestJson, JSON.stringify(manifest, null, 2), "utf8");

const summary = `Phân tích ${manifest.length} asset (${imageFiles.length} ảnh, ${videoFiles.length} video) bằng ${model}, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/${slug}/media-analysis/manifest.json`;
console.log(summary);
appendRunLog(`\`scripts/03-media-analyze.router.mjs\` — ${summary}`, vp.runLog);
