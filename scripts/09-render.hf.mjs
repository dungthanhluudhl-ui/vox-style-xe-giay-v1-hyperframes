// Render tất định video HyperFrames cuối cùng — wrapper cố định convention RIÊNG của repo này
// (quality="looks", output="out/<slug>-full.mp4"), thay cho việc gõ tay lệnh `npx hyperframes
// render` mỗi lần. Sự cố thật đã xảy ra (video "ban-an-35-phan-1", 2026-09-23): gõ tay lệnh raw đã
// lệch cả preset (--quality delivery thay vì looks) lẫn đường dẫn (renders/<slug>.mp4 thay vì
// out/<slug>-full.mp4) — xem planning/responsibility-matrix.md mục 8. Script này KHÔNG cho phép
// lệch convention một cách âm thầm: mọi override phải đi kèm --force-non-default tường minh.
// Usage: node scripts/09-render.hf.mjs --video=<slug> [--quality=<q>] [--output=<path>] [--fps=<n>] [--force-non-default]
//   --quality=<q>        Mặc định "looks" (chuẩn repo). Giá trị khác BẮT BUỘC đi kèm --force-non-default.
//   --output=<path>      Mặc định out/<slug>-full.mp4 (vp.finalOutput). Giá trị khác BẮT BUỘC đi
//                        kèm --force-non-default.
//   --fps=<n>            Truyền thẳng qua CLI hyperframes render (không có preflight riêng).
//   --no-qa              Bỏ QA tất định sau render (khung đen + khung phẳng/trống). Mặc định BẬT.
//   --force-non-default  Xác nhận CHỦ ĐÍCH override quality/output khác convention repo — thiếu cờ
//                        này, script TỪ CHỐI chạy nếu --quality/--output khác mặc định.
import fs from "node:fs";
import path from "node:path";
import { execSync, spawn } from "node:child_process";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { appendRunLog } from "./lib/router-client.mjs";
import { syncRootHf } from "./lib/sync-root-hf-lib.mjs";
import { HF_VERSION } from "./lib/hf-check.mjs";
import { findBlackIntervals, findFlatRuns } from "./lib/render-qa.mjs";

const root = process.cwd();
const slug = getVideoSlug();
const vp = videoPaths(slug, root);

const flags = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--") && a.includes("="))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split(/=(.*)/s);
      return [k, v];
    }),
);
const forceNonDefault = process.argv.includes("--force-non-default");

const DEFAULT_QUALITY = "looks";
const quality = flags.quality || DEFAULT_QUALITY;
const outputPath = flags.output ? path.resolve(root, flags.output) : vp.finalOutput;

// Preflight assertion — KHÔNG cho phép lệch convention repo âm thầm (nguyên nhân sự cố thật: nghĩ
// "final delivery" nên tự đổi sang quality="delivery"/"high", ghi nhầm vào renders/<slug>.mp4).
const deviations = [];
if (quality !== DEFAULT_QUALITY) deviations.push(`quality="${quality}" (chuẩn repo: "${DEFAULT_QUALITY}")`);
if (outputPath !== vp.finalOutput) deviations.push(`output="${outputPath}" (chuẩn repo: "${vp.finalOutput}")`);
if (deviations.length && !forceNonDefault) {
  console.error(
    `\n⚠ TỪ CHỐI render: lệch convention repo mà không có --force-non-default xác nhận chủ đích:\n` +
      deviations.map((d) => `  - ${d}`).join("\n") +
      `\n\nNếu đây THẬT SỰ là ý muốn (vd 1 bản xuất đặc biệt theo yêu cầu người dùng), thêm cờ ` +
      `--force-non-default để xác nhận. Mặc định LUÔN dùng quality="${DEFAULT_QUALITY}" và ` +
      `output="${vp.finalOutput}".`,
  );
  process.exit(1);
}

// Preflight BẮT BUỘC — Stage 7b (assembled integration check): 24 scene PASS riêng lẻ vẫn từng lọt
// lỗi contrast/va chạm caption-track khi ráp chung (video "ban-an-35-phan-1", S02/S16) vì trước đây
// không có bước nào verify LẠI project đã ráp trước khi render. Không cho --force bỏ qua bước này —
// khác preflight quality/output ở trên (chọn thẩm mỹ), đây là gate đúng/sai nội dung thật.
console.log(`Chạy Stage 7b integration check (bắt buộc trước khi render)...`);
try {
  execSync(`node scripts/07b-integration-check.hf.mjs --video=${slug}`, { cwd: root, stdio: "inherit" });
} catch {
  console.error(
    `\n⚠ TỪ CHỐI render: Stage 7b integration check CHƯA PASS — xem log ở trên hoặc ` +
      `${path.relative(root, vp.integrationCheckLog)}. Sửa lỗi rồi chạy lại, không có cờ bỏ qua bước này.`,
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const extraArgs = [];
if (flags.fps) extraArgs.push(`--fps=${flags.fps}`);

// Pin CÙNG version với check (Stage 7/7b): bản không pin tự trôi theo bản mới nhất (0.8.60 → 0.8.75 →
// 0.8.77 chỉ trong 4 ngày) nên code được kiểm tra bằng 1 engine nhưng render bằng engine khác.
const cmd = `npx --yes hyperframes@${HF_VERSION} render --quality ${quality} -o "${outputPath}" ${extraArgs.join(" ")} "${vp.hfProjectDir}"`;
console.log(`Đang render: ${cmd}`);

// spawn() (thay vì execSync stdio:"inherit") — vừa in log live ra terminal (process.stdout.write
// từng chunk) vừa giữ lại toàn bộ log để parse capture mode/GPU mode/stage timing sau khi xong.
function runRenderCaptured(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { cwd: root, shell: true, stdio: ["ignore", "pipe", "pipe"] });
    let output = "";
    child.stdout.on("data", (d) => {
      process.stdout.write(d);
      output += d.toString();
    });
    child.stderr.on("data", (d) => {
      process.stderr.write(d);
      output += d.toString();
    });
    child.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`Lệnh render thoát mã ${code}`));
    });
  });
}

// Parse 3 loại dòng log thật đã xác nhận từ 1 lần render thật trước đây (xem
// planning/responsibility-matrix.md mục "Backlog" P1.5) — không suy đoán thêm loại dòng nào khác.
function parseRenderLog(log) {
  const disableMatch = log.match(/Fast capture: composition uses ([^\n]+?)\s*—\s*disabling drawElementImage/);
  const captureMode = disableMatch
    ? `screenshot (tắt fast-capture do: ${disableMatch[1].trim()})`
    : "không thấy dòng disable fast-capture — giả định fast-capture đang BẬT, CHƯA xác nhận được dòng log khi bật trông ra sao, cần đối chiếu thêm ở lần render tới";

  // Dùng .* tham lam (không phải [^)]*) — dòng log thật có ngoặc LỒNG NHAU bên trong phần chi tiết
  // (vd `vendor="Google Inc. (NVIDIA)"`), [^)]* sẽ cắt cụt ở dấu ")" đầu tiên gặp phải, sai dữ liệu.
  const gpuMatch = log.match(/browserGpuMode probe → (\w+)\s*(\(.*\))?\s*$/m);
  const gpuMode = gpuMatch
    ? `${gpuMatch[1]}${gpuMatch[2] ? ` ${gpuMatch[2]}` : ""}`
    : "không xác định (không thấy dòng browserGpuMode probe trong log)";

  const phaseDurations = {};
  for (const line of log.split("\n")) {
    const m = line.match(/\[Render:trace\]\s*(\{.*\})/);
    if (!m) continue;
    try {
      const evt = JSON.parse(m[1]);
      if (evt.status === "end" && evt.phase && typeof evt.durationMs === "number") {
        phaseDurations[evt.phase] = (phaseDurations[evt.phase] || 0) + evt.durationMs;
      }
    } catch {
      // dòng không phải JSON hợp lệ (log khác lẫn vào) — bỏ qua, không phải lỗi
    }
  }
  return { captureMode, gpuMode, phaseDurations };
}

const startedAt = Date.now();
const renderLog = await runRenderCaptured(cmd);
const renderSeconds = (Date.now() - startedAt) / 1000;
const parsedLog = parseRenderLog(renderLog);

if (!fs.existsSync(outputPath)) {
  console.error(`\n⚠ Render báo xong nhưng KHÔNG thấy file output tại ${outputPath} — kiểm tra tay.`);
  process.exit(1);
}

// Xác minh TẤT ĐỊNH bằng ffprobe — không chỉ tin log CLI "render thành công".
function ffprobeField(file, entries, selectStreams) {
  const sel = selectStreams ? `-select_streams ${selectStreams} ` : "";
  // Windows ffprobe trả \r\n — bắt buộc bỏ \r trước khi ghép nhiều dòng (vd width+height), nếu
  // không "\r" ẩn giữa 2 giá trị sẽ làm hỏng chuỗi hiển thị (con trỏ terminal nhảy về đầu dòng).
  return execSync(`ffprobe -v error ${sel}-show_entries ${entries} -of default=noprint_wrappers=1:nokey=1 "${file}"`)
    .toString()
    .replace(/\r/g, "")
    .trim();
}

const videoDurationSec = parseFloat(ffprobeField(outputPath, "format=duration"));
const sizeBytes = fs.statSync(outputPath).size;
const resolution = ffprobeField(outputPath, "stream=width,height", "v:0").replace(/\n/g, "x");
const codec = ffprobeField(outputPath, "stream=codec_name", "v:0");

let audioCompareNote = "không có narration.mp3 để đối chiếu";
let ffprobeOk = true; // không có audio để đối chiếu thì không tự coi là lỗi (video có thể chưa có audio)
if (fs.existsSync(vp.audioFile)) {
  const audioDurationSec = parseFloat(ffprobeField(vp.audioFile, "format=duration"));
  const diff = Math.abs(videoDurationSec - audioDurationSec);
  ffprobeOk = diff <= 1;
  audioCompareNote = ffprobeOk
    ? `khớp audio thật ${audioDurationSec.toFixed(3)}s`
    : `⚠ LỆCH ${diff.toFixed(3)}s so với audio thật ${audioDurationSec.toFixed(3)}s — KIỂM TRA LẠI`;
}

// QA TẤT ĐỊNH sau render (không model/vision; chỉ báo — render đã xong): khung ĐEN và khung PHẲNG/TRỐNG giữa 2 scene hoặc khi video hết nguồn (lib/render-qa.mjs).
// Ghi vào completion-manifest như mọi field *Ok khác: false = chưa được coi là "hoàn tất". QA không chạy được (thiếu ffmpeg…) cũng là false, KHÔNG bỏ qua im lặng.
let blackFramesOk = true, flatFramesOk = true, qaNote = "bỏ qua (--no-qa)", qaDetail = null;
if (!process.argv.includes("--no-qa")) {
  try {
    const planRaw = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
    const plan = Array.isArray(planRaw) ? planRaw : planRaw.scenes;
    const black = findBlackIntervals(outputPath);
    const flat = findFlatRuns(outputPath, plan);
    blackFramesOk = black.length === 0;
    flatFramesOk = flat.hard.length === 0;
    qaDetail = { black, flatHard: flat.hard, flatInfo: flat.info.length };
    qaNote = `khung đen ${black.length} khoảng, khung phẳng/trống bất thường ${flat.hard.length} đoạn${flat.info.length ? ` (+${flat.info.length} nền trống đầu cảnh đồ hoạ, chỉ ghi nhận)` : ""}`;
    for (const b of black) console.warn(`  ⚠ KHUNG ĐEN ${b.dur.toFixed(2)}s tại t=${b.start.toFixed(2)}–${b.end.toFixed(2)}s (thường do khe hở giữa 2 scene trong scene-plan)`);
    for (const f of flat.hard) console.warn(`  ⚠ KHUNG PHẲNG/TRỐNG ${f.dur.toFixed(1)}s tại t=${f.start.toFixed(1)}–${f.end.toFixed(1)}s${f.scene ? ` — ${f.scene} (${f.kind}) +${f.rel.toFixed(1)}s/${f.sceneDur.toFixed(1)}s` : ""}`);
  } catch (e) {
    blackFramesOk = flatFramesOk = false;
    qaNote = `⚠ QA KHÔNG chạy được: ${String(e.message ?? e).slice(0, 160)}`;
    console.warn(qaNote);
  }
}

const phaseBreakdown =
  Object.entries(parsedLog.phaseDurations)
    .map(([phase, ms]) => `${phase}=${(ms / 1000).toFixed(1)}s`)
    .join(", ") || "(không parse được dòng stage timing nào từ log)";

const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1);
const summary =
  `Render bản đầy đủ: ${path.relative(root, outputPath)}, ${sizeBytes} bytes (${sizeMB}MB), ` +
  `${renderSeconds.toFixed(1)}s render time, quality=${quality}. Xác minh ffprobe: ` +
  `duration=${videoDurationSec.toFixed(3)}s (${audioCompareNote}), ${resolution} ${codec}. ` +
  `Capture mode: ${parsedLog.captureMode}. GPU mode: ${parsedLog.gpuMode}. ` +
  `Stage timing: ${phaseBreakdown}. QA tất định: ${qaNote}.`;

console.log(`\n${summary}`);
appendRunLog(`\`scripts/09-render.hf.mjs\` — ${summary}`, vp.runLog);

// Completion manifest — P2.3: quy ước chỉ được tuyên bố video "hoàn tất" khi file này tồn tại và
// mọi field *Ok đều true (tránh lặp lại sự cố "báo xong" chỉ vì có 1 MP4 bất kỳ, đã xảy ra thật với
// ban-an-473-phan-2/ban-an-35-phan-1). assembledCheckOk luôn true tới được đây — preflight Stage 7b
// ở trên đã exit 1 nếu FAIL, script không chạy tiếp được nếu chưa PASS.
const syncResult = syncRootHf(slug, root);
const manifest = {
  assembledCheckOk: true,
  sceneCount: syncResult.sceneCount,
  totalPlanned: syncResult.totalPlanned,
  renderOk: true,
  ffprobeOk,
  blackFramesOk,
  flatFramesOk,
  outputPath: path.relative(root, outputPath),
  quality,
  timestamp: new Date().toISOString(),
  ...(qaDetail ? { qa: qaDetail } : {}),
};
fs.mkdirSync(path.dirname(vp.completionManifest), { recursive: true });
fs.writeFileSync(vp.completionManifest, JSON.stringify(manifest, null, 2), "utf8");
console.log(`Đã ghi ${path.relative(root, vp.completionManifest)}.`);
