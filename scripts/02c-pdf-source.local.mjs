// Stage 2c (OPT-IN): xử lý PDF bản án do người dùng cung cấp — TẤT ĐỊNH, không AI, Claude không
// xem ảnh. Trích dữ kiện có truy nguồn (trang + quote), cắt ảnh trích dẫn có tô cam vào
// public/videos/<slug>/media/documents/doc-NN-*.png, đối chiếu script ↔ PDF (chỉ cảnh báo).
// Không có content/videos/<slug>/source/*.pdf => thoát exit 0 ngay, KHÔNG đổi gì (pipeline cũ y nguyên).
// Stage 3 (03-media-analyze) đọc case-facts.json và append các doc-NN vào manifest.
// Usage: node scripts/02c-pdf-source.local.mjs --video=<slug> [--root=<dir>]  (--root chỉ để test)
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { appendRunLog } from "./lib/router-client.mjs";

const slug = getVideoSlug();
const rootArg = process.argv.find((a) => a.startsWith("--root="));
const root = rootArg ? path.resolve(rootArg.slice("--root=".length)) : process.cwd();
const vp = videoPaths(slug, root);

const pdfs = fs.existsSync(vp.pdfSourceDir) ? fs.readdirSync(vp.pdfSourceDir).filter((f) => /\.pdf$/i.test(f)) : [];
if (pdfs.length === 0) {
  console.log(`02c: không có PDF trong ${path.relative(root, vp.pdfSourceDir)} — bỏ qua (không đổi gì).`);
  process.exit(0);
}

const py = path.join(path.dirname(fileURLToPath(import.meta.url)), "lib", "pdf_extract.py");
const args = [
  py,
  "--pdf-dir", vp.pdfSourceDir,
  "--out-dir", vp.caseSourceDir,
  "--docs-dir", vp.documentsDir,
  "--docs-rel", `public/videos/${slug}/media/documents`,
];
if (fs.existsSync(vp.pdfHighlightsFile)) args.push("--highlights", vp.pdfHighlightsFile);
if (fs.existsSync(vp.scriptFile)) args.push("--script", vp.scriptFile);

const r = spawnSync("python", args, { encoding: "utf8", env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
if (r.status !== 0) {
  console.error(`02c THẤT BẠI (mã ${r.status}):\n${r.stderr || r.stdout}`);
  process.exit(1);
}
const out = JSON.parse(r.stdout.trim().split("\n").pop());
const cc = out.crosscheck || {};
const summary =
  `Xử lý ${pdfs.length} PDF (${out.pages} trang): ${out.assets} ảnh trích dẫn doc-NN → media/documents/` +
  (out.needsOcr ? "; CÓ trang scan chưa OCR (nội dung chữ chưa xác thực)" : "") +
  (out.highlightsNotFound?.length ? `; ${out.highlightsNotFound.length} cụm highlights.txt KHÔNG tìm thấy: ${out.highlightsNotFound.join(" | ")}` : "") +
  (cc.found != null ? `; đối chiếu script: khớp ${cc.found}, gần khớp ${cc.near}, không thấy ${cc.missing} (xem case-source/crosscheck.md)` : "");
console.log(summary);
appendRunLog(`\`scripts/02c-pdf-source.local.mjs\` — ${summary}`, vp.runLog);
