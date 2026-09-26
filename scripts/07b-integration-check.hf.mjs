// Stage 7b — Assembled Integration Check: verify project HyperFrames ĐÃ RÁP (hyperframes/videos/<slug>/,
// gồm mọi scene + audio + caption-track), khác với verify() trong 07-codegen.hf.router.mjs (chỉ check
// 1 scene standalone tạm). Vấn đề thật đã xảy ra (video "ban-an-35-phan-1"): 24 scene PASS riêng lẻ,
// nhưng project ráp chung vẫn có lỗi contrast/va chạm caption-track (S02/S16) — không script nào từng
// verify lại SAU KHI ráp, chỉ syncRootHf() ghi file, không check gì.
// Sample theo shot (3 mốc/shot, từ 2026-09-26) — 9 sample mặc định để lọt lỗi gọn trong 1 scene,
// xem buildShotSampleArgs() + planning/incident-log.md mục 2026-09-26.
//
// Usage: node scripts/07b-integration-check.hf.mjs --video=<slug>
import fs from "node:fs";
import path from "node:path";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { syncRootHf } from "./lib/sync-root-hf-lib.mjs";
import { runHyperframesCheck, findRootLayoutFlagsInProject, buildShotSampleArgs } from "./lib/hf-check.mjs";
import { getCaptionZoneArg } from "./lib/caption-zone.mjs";
import { appendRunLog } from "./lib/router-client.mjs";

const root = process.cwd();
const slug = getVideoSlug();
const vp = videoPaths(slug, root);

// Ráp lại trước khi check — TẤT ĐỊNH, idempotent — không giả định caller đã ráp đúng bản mới nhất.
const syncResult = syncRootHf(slug, root);

// Sample theo shot (3 mốc/shot) thay vì 9 mốc mặc định cho cả video — xem buildShotSampleArgs().
const shotSamples = buildShotSampleArgs(vp.shotlistJson);
if (!shotSamples) console.warn(`(video "${slug}") không đọc được ${vp.shotlistJson} — fallback về sample mặc định của hyperframes check.`);
const sampleNote = shotSamples ? `${shotSamples.sampleCount} mốc/${shotSamples.shotCount} shot` : "sample mặc định (không có shotlist)";

const t0 = Date.now();
const check = runHyperframesCheck(vp.hfProjectDir, {
  extraArgs: [getCaptionZoneArg(root), ...(shotSamples?.args ?? [])],
  ...(shotSamples ? { timeoutMs: shotSamples.timeoutMs } : {}),
});
const checkSec = ((Date.now() - t0) / 1000).toFixed(1);

const errors = [];
if (!check.passed) {
  errors.push(`hyperframes check ${check.infraError ? "TREO/LỖI HẠ TẦNG" : "FAILED (nội dung)"}:\n${check.raw}`);
}
if (syncResult.sceneCount !== syncResult.totalPlanned) {
  errors.push(`Thiếu scene: ${syncResult.sceneCount}/${syncResult.totalPlanned} đã có code.`);
}
if (!syncResult.hasAudio) errors.push(`Chưa có audio narration.mp3 (${vp.audioFile}).`);
if (!syncResult.hasCaptionTrack) errors.push(`Chưa có caption-track (thiếu ${vp.captionsFile}?).`);
const rootFlagViolations = findRootLayoutFlagsInProject(vp.hfProjectDir);
if (rootFlagViolations.length > 0) {
  errors.push(
    `Cờ layout đặt sai chỗ trên root: ${rootFlagViolations.map((v) => `${v.file} (${v.flags.join(", ")})`).join("; ")} — di chuyển xuống đúng phần tử con cụ thể.`,
  );
}

const passed = errors.length === 0;

// Ghi log bằng fs.writeFileSync(..., "utf8") qua Node — KHÔNG dùng PowerShell `>` redirect thủ công
// (sự cố thật trước đây: pipeline-check-final.log bị ghi sai chỗ + sai encoding UTF-16LE vì agent tự
// gõ tay lệnh, xem planning/responsibility-matrix.md mục P2.1).
fs.mkdirSync(path.dirname(vp.integrationCheckLog), { recursive: true });
fs.writeFileSync(vp.integrationCheckLog, check.raw, "utf8");

const summary = passed
  ? `Stage 7b integration check PASS — ${syncResult.sceneCount}/${syncResult.totalPlanned} scene, có audio, có caption-track, hyperframes check ok=true (${sampleNote}, ${checkSec}s).`
  : `Stage 7b integration check FAIL (${sampleNote}, ${checkSec}s):\n${errors.join("\n")}`;

console.log(summary);
appendRunLog(`\`scripts/07b-integration-check.hf.mjs --video=${slug}\` — ${summary}`, vp.runLog);

if (!passed) process.exit(1);
