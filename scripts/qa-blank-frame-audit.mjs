// QA: audit bug "trống hình" bằng contact sheet trích từ video ĐÃ RENDER (out/<slug>-full.mp4)
// + vision QA qua 9router. Claude không tự xem ảnh — chỉ đọc report.md (text) do script này ghi ra.
// Usage: node scripts/qa-blank-frame-audit.mjs --video=<slug> [--scenes-per-sheet=8]
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

const slug = getVideoSlug();
const vp = videoPaths(slug);
const routing = loadModelRouting();
const model = routing.vision_qa;

const perSheetArg = process.argv.find((a) => a.startsWith("--scenes-per-sheet="));
const SCENES_PER_SHEET = perSheetArg ? parseInt(perSheetArg.split("=")[1], 10) : 8;
const THUMB_WIDTH = 320;

const videoFile = vp.finalOutput;
if (!fs.existsSync(videoFile)) {
  console.error(`Không tìm thấy video đã render: ${videoFile}`);
  process.exit(1);
}
if (!fs.existsSync(vp.shotlistJson)) {
  console.error(`Không tìm thấy shotlist: ${vp.shotlistJson}`);
  process.exit(1);
}

const contactSheetDir = vp.contactSheetDir;
fs.rmSync(contactSheetDir, { recursive: true, force: true });
fs.mkdirSync(contactSheetDir, { recursive: true });

function ensureFont(dir) {
  const dest = path.join(dir, "font.ttf");
  const candidates = ["C:\\Windows\\Fonts\\arialbd.ttf", "C:\\Windows\\Fonts\\arial.ttf"];
  const src = candidates.find((c) => fs.existsSync(c));
  if (src) fs.copyFileSync(src, dest);
  return fs.existsSync(dest);
}
const hasFont = ensureFont(contactSheetDir);

function loadScenes(shotlistPath) {
  const shots = JSON.parse(fs.readFileSync(shotlistPath, "utf8"));
  const bySceneId = new Map();
  for (const shot of shots) {
    const id = shot.sceneId;
    if (!id) continue;
    if (!bySceneId.has(id)) {
      bySceneId.set(id, { sceneId: id, startMs: shot.startMs, endMs: shot.endMs });
    } else {
      const cur = bySceneId.get(id);
      cur.startMs = Math.min(cur.startMs, shot.startMs);
      cur.endMs = Math.max(cur.endMs, shot.endMs);
    }
  }
  return [...bySceneId.values()];
}

function extractFrame(midSec, outFile) {
  execSync(
    `ffmpeg -y -v error -ss ${midSec.toFixed(3)} -i "${videoFile}" -frames:v 1 -vf "scale=${THUMB_WIDTH}:-2" "${outFile}"`,
  );
}

// Số liệu tất định phụ trợ (không dùng để loại scene khỏi vision QA — chỉ ghi kèm report để đối
// chiếu). Bài học từ planning/incident-log.md: signalstats một mình chưa được kiểm chứng là filter
// đáng tin cậy cho mọi biến thể lỗi trống hình.
function signalStats(frameFile) {
  let text = "";
  try {
    text = execSync(`ffmpeg -v info -i "${frameFile}" -vf signalstats,metadata=print -f null - 2>&1`).toString();
  } catch (e) {
    text = `${e.stdout || ""}${e.stderr || ""}`;
  }
  const ymin = text.match(/lavfi\.signalstats\.YMIN=([\d.]+)/);
  const ymax = text.match(/lavfi\.signalstats\.YMAX=([\d.]+)/);
  const yavg = text.match(/lavfi\.signalstats\.YAVG=([\d.]+)/);
  return {
    ymin: ymin ? parseFloat(ymin[1]) : null,
    ymax: ymax ? parseFloat(ymax[1]) : null,
    yavg: yavg ? parseFloat(yavg[1]) : null,
  };
}

function labelFrame(inBasename, outBasename, label, dir) {
  if (!hasFont) {
    fs.copyFileSync(path.join(dir, inBasename), path.join(dir, outBasename));
    return;
  }
  const filter = `drawtext=fontfile=font.ttf:text='${label}':x=8:y=8:fontsize=22:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=6`;
  execSync(`ffmpeg -y -v error -i "${inBasename}" -vf "${filter}" "${outBasename}"`, { cwd: dir });
}

function buildContactSheet(n, dir, outFile) {
  // Layout 1 hàng (cols=n, rows=1) — tránh phải factorize n thành lưới vuông khớp chính xác
  // cols*rows (batch cuối thường có ít scene hơn SCENES_PER_SHEET).
  execSync(
    `ffmpeg -y -v error -framerate 1 -i "%02d.jpg" -vf "tile=${n}x1" -frames:v 1 "${outFile}"`,
    { cwd: dir },
  );
}

async function visionCheck(sheetFile, sceneIds) {
  const systemPrompt = `Bạn là vision QA cho video HyperFrames. Ảnh gửi lên là 1 "contact sheet" — dải ${sceneIds.length} ô ảnh xếp ngang, mỗi ô là 1 frame đại diện trích từ 1 scene của video đã render, có nhãn scene ID góc trên-trái mỗi ô (đúng theo thứ tự: ${sceneIds.join(", ")}).
Nhiệm vụ: xem TỪNG ô, xác định ô nào bị lỗi "trống hình" — nghĩa là nền trống/phẳng màu đơn sắc (đen/trắng/xám/màu nền thuần), KHÔNG có nội dung hình ảnh/nhân vật/chữ nào hiển thị, dù theo kịch bản scene đó phải có nội dung. Không tính là lỗi nếu ô chỉ đơn giản là 1 khung hình có nền màu chủ đích (card nền cam/xám của style DNA) NHƯNG vẫn có chữ/icon/hình minh hoạ hiển thị bình thường.
Trả về JSON đúng format, không giải thích gì thêm ngoài JSON:
{"findings": [{"sceneId": "S01", "status": "ok" | "suspect_blank" | "other_issue", "note": "mô tả ngắn những gì thấy trong ô, bằng tiếng Việt"}]}
Liệt kê đủ tất cả ${sceneIds.length} sceneId theo đúng thứ tự đã cho, không bỏ sót.`;

  const response = await callModel({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: [
          { type: "text", text: "Đây là contact sheet cần kiểm tra." },
          imageContentFromFile(sheetFile, "image/jpeg"),
        ],
      },
    ],
    temperature: 0.1,
    maxTokens: 2000,
    responseFormat: { type: "json_object" },
  });
  return extractJson(extractText(response));
}

async function main() {
  const scenes = loadScenes(vp.shotlistJson);
  console.log(`[qa-audit] ${slug}: ${scenes.length} scene, video=${videoFile}`);

  const perScene = [];
  for (const scene of scenes) {
    const midSec = (scene.startMs + scene.endMs) / 2 / 1000;
    perScene.push({ ...scene, midSec });
  }

  const batches = [];
  for (let i = 0; i < perScene.length; i += SCENES_PER_SHEET) {
    batches.push(perScene.slice(i, i + SCENES_PER_SHEET));
  }

  const allFindings = [];
  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    const batchDir = path.join(contactSheetDir, `batch-${String(b + 1).padStart(2, "0")}`);
    fs.mkdirSync(batchDir, { recursive: true });
    if (hasFont) fs.copyFileSync(path.join(contactSheetDir, "font.ttf"), path.join(batchDir, "font.ttf"));

    console.log(`[qa-audit] batch ${b + 1}/${batches.length}: ${batch.map((s) => s.sceneId).join(", ")}`);
    const statsMap = {};
    batch.forEach((scene, idx) => {
      const raw = path.join(batchDir, `raw-${idx}.jpg`);
      extractFrame(scene.midSec, raw);
      statsMap[scene.sceneId] = signalStats(raw);
      const numbered = `${String(idx + 1).padStart(2, "0")}.jpg`;
      labelFrame(path.basename(raw), numbered, scene.sceneId, batchDir);
      fs.unlinkSync(raw);
    });

    const sheetFile = `sheet-${String(b + 1).padStart(2, "0")}.jpg`;
    buildContactSheet(batch.length, batchDir, sheetFile);
    const sheetPath = path.join(batchDir, sheetFile);
    // Copy contact sheet lên thư mục gốc contact-sheet/ để dễ tra cứu (report chỉ trỏ path text).
    fs.copyFileSync(sheetPath, path.join(contactSheetDir, sheetFile));

    const sceneIds = batch.map((s) => s.sceneId);
    const result = await visionCheck(sheetPath, sceneIds);
    for (const f of result.findings || []) {
      allFindings.push({ ...f, ...statsMap[f.sceneId], sheet: sheetFile });
    }
  }

  const lines = [`# QA blank-frame audit — ${slug}`, "", `Video: \`${videoFile}\``, `Model: \`${model}\``, ""];
  lines.push("| sceneId | status | YMIN | YMAX | YAVG | sheet | note |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const f of allFindings) {
    lines.push(
      `| ${f.sceneId} | ${f.status} | ${f.ymin ?? ""} | ${f.ymax ?? ""} | ${f.yavg ?? ""} | ${f.sheet} | ${(f.note || "").replace(/\|/g, "/")} |`,
    );
  }
  const suspects = allFindings.filter((f) => f.status !== "ok");
  lines.push("", `## Tổng kết: ${suspects.length}/${allFindings.length} scene bị flag khác "ok"`, "");
  for (const f of suspects) lines.push(`- **${f.sceneId}** (${f.status}): ${f.note}`);

  const reportPath = path.join(contactSheetDir, "report.md");
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
  console.log(`[qa-audit] report: ${reportPath}`);

  appendRunLog(
    `qa-blank-frame-audit: ${allFindings.length} scene kiểm tra, ${suspects.length} bị flag (${suspects.map((s) => s.sceneId).join(", ") || "none"}) — report tại \`${reportPath}\``,
    vp.runLog,
  );
}

main().catch((e) => {
  console.error("[qa-audit] LỖI:", e);
  process.exit(1);
});
