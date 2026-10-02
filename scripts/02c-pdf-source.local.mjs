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
import { appendRunLog, callModel, extractText, imageContentFromFile, loadModelRouting } from "./lib/router-client.mjs";

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

// --- OCR qua vision model cho trang scan (không có text-layer) — bổ sung 2026-10-01.
// Giới hạn THẬT đã xác nhận: vision-LLM chỉ trả về VĂN BẢN, không cho toạ độ bbox theo từng từ như
// Tesseract thật, nên KHÔNG thể tái dùng render_crop() để cắt crop tập trung (targeted crop quanh
// đúng dòng chữ) như luồng PDF có text-layer (header/verdict/law). Ảnh dùng để dựng video VẪN LÀ
// nguyên trang scan-page đã render sẵn (pdf_extract.py) — OCR ở đây chỉ nâng cấp description/
// provenance để Stage 5 biết đúng nội dung trang mà quyết định gán scene, KHÔNG đổi verified=true
// (AI đọc ảnh scan mờ có thể sai/hallucinate, khác đảm bảo tất định "quote ⊂ text trang thật").
let ocrCount = 0;
const caseFactsPath = path.join(vp.caseSourceDir, "case-facts.json");
const caseFacts = JSON.parse(fs.readFileSync(caseFactsPath, "utf8"));
const scanAssets = (caseFacts.assets || []).filter((a) => a.kind === "scan-page");
if (scanAssets.length) {
  const routing = loadModelRouting(root);
  const ocrModel = routing.vision_ocr;
  console.log(`02c: OCR qua vision (${ocrModel}) cho ${scanAssets.length} trang scan...`);
  for (const a of scanAssets) {
    const abs = path.join(root, a.file);
    const response = await callModel({
      model: ocrModel,
      messages: [
        {
          role: "system",
          content:
            "Bạn đọc văn bản tiếng Việt trong ảnh chụp 1 trang tài liệu (bản scan, không có text layer). " +
            "Chép lại NGUYÊN VĂN toàn bộ chữ đọc được trên trang, đúng thứ tự đọc, không diễn giải/tóm tắt thêm. " +
            "Đoạn nào mờ không chắc thì ghi [không đọc được] thay vì đoán. KHÔNG bịa nội dung không có trên ảnh.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Đọc toàn bộ chữ trên trang 1 của tài liệu "${a.provenance.pdf}".` },
            imageContentFromFile(abs, "image/png"),
          ],
        },
      ],
      temperature: 0,
      timeoutMs: 180000,
    });
    const ocrText = extractText(response)
      .replace(/^\s*(Dưới đây|Đây là)[^\n]*:\s*\n+(?:-{3,}\s*\n+)?/i, "")
      .trim();
    a.ocrText = ocrText;
    a.provenance.ocr = { model: ocrModel, verified: false };
    const snippet = ocrText.length > 240 ? ocrText.slice(0, 240) + "…" : ocrText;
    a.description = `Trang 1 của tài liệu (${a.provenance.pdf}) — bản scan, đọc qua vision OCR (CHƯA xác thực tuyệt đối, có thể sai sót): «${snippet}»`;
    ocrCount++;
  }
  fs.writeFileSync(caseFactsPath, JSON.stringify(caseFacts, null, 2), "utf8");
}

const summary =
  `Xử lý ${pdfs.length} PDF (${out.pages} trang): ${out.assets} ảnh trích dẫn doc-NN → media/documents/` +
  (ocrCount ? `; đã OCR qua vision ${ocrCount} trang scan, cập nhật description/ocrText (chưa xác thực tuyệt đối)` : "") +
  (out.highlightsNotFound?.length ? `; ${out.highlightsNotFound.length} cụm highlights.txt KHÔNG tìm thấy: ${out.highlightsNotFound.join(" | ")}` : "") +
  (cc.found != null ? `; đối chiếu script: khớp ${cc.found}, gần khớp ${cc.near}, không thấy ${cc.missing} (xem case-source/crosscheck.md)` : "");
console.log(summary);
appendRunLog(`\`scripts/02c-pdf-source.local.mjs\` — ${summary}`, vp.runLog);
