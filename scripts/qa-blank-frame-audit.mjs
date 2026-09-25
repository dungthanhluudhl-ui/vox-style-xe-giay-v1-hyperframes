// QA: soát scene trống/mất nội dung trên video ĐÃ RENDER, theo TỪNG SHOT (3 frame/shot tại 20/50/80%)
// + vision QA qua 9router. Claude không tự xem ảnh — chỉ đọc report.md (text) script này ghi ra.
// Soát theo shot thay vì 1 frame/scene: lỗi có thể chỉ nằm ở 1 shot, hoặc bị che bởi 1 phần tử khác
// vẫn hiển thị đúng lúc lấy frame giữa scene (vd nvidia-phu-song-viet-nam S03, 2026-09-26).
// Usage: node scripts/qa-blank-frame-audit.mjs --video=<slug> [--input=<mp4>] [--shots-per-sheet=3]
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
const model = loadModelRouting().vision_qa;
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const videoFile = path.resolve(arg("input") || vp.finalOutput);
const SHOTS_PER_SHEET = parseInt(arg("shots-per-sheet") || "3", 10);
const FRACS = [0.2, 0.5, 0.8];
const THUMB_WIDTH = 300;

for (const f of [videoFile, vp.shotlistJson]) {
  if (!fs.existsSync(f)) {
    console.error(`Không tìm thấy: ${f}`);
    process.exit(1);
  }
}

const outDir = vp.contactSheetDir;
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
// drawtext cần font ở đường dẫn TƯƠNG ĐỐI: dấu ":" của ổ đĩa Windows phá cú pháp filter ffmpeg.
const fontSrc = ["C:\\Windows\\Fonts\\arialbd.ttf", "C:\\Windows\\Fonts\\arial.ttf"].find((c) => fs.existsSync(c));

const shots = JSON.parse(fs.readFileSync(vp.shotlistJson, "utf8"));

function buildSheet(sheetShots, dir) {
  fs.mkdirSync(dir, { recursive: true });
  if (fontSrc) fs.copyFileSync(fontSrc, path.join(dir, "font.ttf"));
  let i = 0;
  for (const s of sheetShots) {
    for (const f of FRACS) {
      i++;
      const t = (s.startMs + (s.endMs - s.startMs) * f) / 1000;
      const cell = `${String(i).padStart(2, "0")}.jpg`;
      execSync(`ffmpeg -y -v error -ss ${t.toFixed(3)} -i "${videoFile}" -frames:v 1 -vf "scale=${THUMB_WIDTH}:-2" "raw.jpg"`, { cwd: dir });
      // Nhãn không dùng "%" — drawtext hiểu "%" là cú pháp mở rộng và lỗi.
      const label = `${s.id} ${Math.round(f * 100)}`;
      const vf = fontSrc
        ? `drawtext=fontfile=font.ttf:text='${label}':x=6:y=6:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.7:boxborderw=5`
        : "null";
      execSync(`ffmpeg -y -v error -i raw.jpg -vf "${vf}" "${cell}"`, { cwd: dir });
    }
  }
  fs.rmSync(path.join(dir, "raw.jpg"), { force: true });
  // Lưới 3 cột (20/50/80%) x N hàng (shot): cols*rows luôn khớp đúng số ô, kể cả sheet cuối ít shot.
  execSync(`ffmpeg -y -v error -framerate 1 -i "%02d.jpg" -vf "tile=${FRACS.length}x${sheetShots.length}" -frames:v 1 sheet.jpg`, { cwd: dir });
  return path.join(dir, "sheet.jpg");
}

async function visionCheck(sheetFile, shotIds) {
  const systemPrompt = `Ảnh là lưới frame trích từ video đã render: mỗi HÀNG là 1 shot, 3 cột là 20%, 50%, 80% thời lượng shot; nhãn góc trên-trái mỗi ô ghi "<shotId> <phần trăm>". Thứ tự hàng: ${shotIds.join(", ")}.
Với TỪNG ô: nội dung chính của cảnh (hình minh hoạ, nhân vật, video, biểu đồ, thẻ chữ lớn) có hiển thị không, hay chỉ còn nền (nền phẳng/gradient/giấy kẻ ô) + phụ đề dưới đáy? Phụ đề và thanh cam dưới đáy KHÔNG tính là nội dung chính. Trả JSON đủ ${shotIds.length * FRACS.length} ô, không giải thích ngoài JSON:
{"cells":[{"shot":"S01-1","pct":20,"status":"ok"|"blank"|"partial","note":"mô tả ngắn bằng tiếng Việt"}]}
"blank" = chỉ còn nền; "partial" = thiếu rõ 1 phần nội dung lớn, hoặc lớp nền/lưới đè lên nội dung.`;
  const response = await callModel({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: [{ type: "text", text: "Kiểm tra lưới frame." }, imageContentFromFile(sheetFile, "image/jpeg")] },
    ],
    temperature: 0.1,
    maxTokens: 2500,
    responseFormat: { type: "json_object" },
    timeoutMs: 240000,
  });
  return extractJson(extractText(response)).cells || [];
}

async function main() {
  console.log(`[qa-audit] ${slug}: ${shots.length} shot, video=${videoFile}`);
  const cells = [];
  for (let g = 0; g * SHOTS_PER_SHEET < shots.length; g++) {
    const sheetShots = shots.slice(g * SHOTS_PER_SHEET, (g + 1) * SHOTS_PER_SHEET);
    const name = `sheet-${String(g + 1).padStart(2, "0")}`;
    const ids = sheetShots.map((s) => s.id);
    console.log(`[qa-audit] ${name}: ${ids.join(", ")}`);
    const sheet = buildSheet(sheetShots, path.join(outDir, name));
    fs.copyFileSync(sheet, path.join(outDir, `${name}.jpg`));
    for (const c of await visionCheck(sheet, ids)) cells.push({ ...c, sheet: `${name}.jpg` });
  }

  // Gom theo shot: shot "blank" nếu cả 3 frame blank; "partial" nếu có frame không ok.
  const byShot = shots.map((s) => {
    const cs = cells.filter((c) => c.shot === s.id);
    const bad = cs.filter((c) => c.status !== "ok");
    const status = cs.length && bad.length === cs.length && bad.every((c) => c.status === "blank") ? "blank" : bad.length ? "partial" : "ok";
    return { shot: s.id, sceneId: s.sceneId, status, cells: cs };
  });

  const lines = [`# QA blank-frame audit — ${slug}`, "", `Video: \`${videoFile}\``, `Model: \`${model}\``, `Soát: ${shots.length} shot × ${FRACS.length} frame (20/50/80%)`, ""];
  lines.push("| shot | 20% | 50% | 80% | ghi chú (ô không ok) |", "|---|---|---|---|---|");
  for (const s of byShot) {
    const st = (p) => s.cells.find((c) => Number(c.pct) === p)?.status ?? "?";
    const notes = s.cells.filter((c) => c.status !== "ok").map((c) => `${c.pct}%: ${String(c.note || "").replace(/\|/g, "/")}`).join("; ");
    lines.push(`| ${s.shot} | ${st(20)} | ${st(50)} | ${st(80)} | ${notes} |`);
  }
  const flagged = byShot.filter((s) => s.status !== "ok");
  lines.push("", `## Tổng kết: ${flagged.length}/${byShot.length} shot bị flag`, "");
  for (const s of flagged) lines.push(`- **${s.shot}** (${s.status})`);
  lines.push("", "Flag từ vision có thể là báo nhầm (vd nội dung xuất hiện muộn, nhiễu nén video) — xác minh lại trước khi sửa.");

  const reportPath = path.join(outDir, "report.md");
  fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
  console.log(`[qa-audit] ${flagged.length}/${byShot.length} shot bị flag${flagged.length ? `: ${flagged.map((s) => `${s.shot}(${s.status})`).join(", ")}` : ""}`);
  console.log(`[qa-audit] report: ${reportPath}`);
  appendRunLog(
    `qa-blank-frame-audit (theo shot): ${byShot.length} shot, ${flagged.length} bị flag (${flagged.map((s) => `${s.shot}:${s.status}`).join(", ") || "none"}) — video \`${videoFile}\`, report \`${reportPath}\``,
    vp.runLog,
  );
}

main().catch((e) => {
  console.error("[qa-audit] LỖI:", e);
  process.exit(1);
});
