// Điều phối chạy SONG SONG scripts/07-codegen.hf.router.mjs cho nhiều scene của CÙNG 1 video,
// theo đúng mô hình hàng đợi (worker pool) đã kiểm chứng ở bản Remotion
// (archive/remotion-legacy/scripts/07-codegen-parallel.mjs) — không gọi AI trực tiếp, chỉ quản lý tiến trình con.
//
// Khác biệt an toàn so với bản Remotion: mỗi scene HyperFrames sinh trong 1 project STANDALONE
// TẠM RIÊNG (hyperframes/.gen-tmp/<slug>-<sceneId>/, xem 07-codegen.hf.router.mjs) nên
// generate+verify+review hoàn toàn cách ly theo thư mục — không còn race kiểu "verify() quét
// nhầm file scene khác" đã từng xảy ra ở bản Remotion (xem responsibility-matrix.md mục 6).
// `--no-root-sync` ở đây chỉ có nghĩa "đừng ráp index.html chung ngay" (mirror đúng ý nghĩa đã
// đổi của flag này trong 07-codegen.hf.router.mjs).
//
// Ngay khi 1 tiến trình con xong (dù pass/fail), lập tức lấy scene tiếp theo trong hàng đợi vào
// đúng chỗ trống đó — không đợi cả nhóm cùng đợt xong (loại bỏ khoảng thời gian chết).
//
// Phân loại lỗi để quyết định có tự chạy lại hay không (y hệt bản Remotion):
// - "network": lỗi mạng/timeout thuần tuý (không có Verify/Review nào chạy được) -> tự động xếp
//   lại hàng đợi chạy 1 lượt mới (tối đa 1 lần/scene).
// - "content" (reviewer bắt VERDICT: FAIL) / "verify-error" (hyperframes check lỗi thật) /
//   "unknown": không tự chạy lại, in đầy đủ verdict/lỗi ra để Claude sửa targeted bằng
//   `scripts/07-codegen.hf.router.mjs --scenes=SNN --issue-file=...`, trong khi scene khác vẫn
//   tiếp tục chạy song song.
//
// Usage: node scripts/07-codegen-hf-parallel.mjs --video=<slug> --scenes=S01,S02,S03,... [--concurrency=10]
import { spawn } from "node:child_process";
import { getVideoSlug } from "./lib/video-paths.mjs";
import { syncRootHf } from "./lib/sync-root-hf-lib.mjs";

const slug = getVideoSlug();

const scenesArg = process.argv.find((a) => a.startsWith("--scenes="));
if (!scenesArg) {
  console.error("Thiếu --scenes=S01,S02,... (danh sách scene cần code cho video này)");
  process.exit(1);
}
const sceneIds = scenesArg.split("=")[1].split(",");

const concurrencyArg = process.argv.find((a) => a.startsWith("--concurrency="));
// Mặc định 10 — cùng mức đã kiểm chứng thật ở bản Remotion (video "tham-hoa-itaewon-phan-2",
// 16 scene, 15/16 PASS, 0 lỗi mạng/timeout với 9router). Đây là LẦN ĐẦU áp dụng mức này cho
// nhánh HyperFrames — quy mô 13-16 scene thật vẫn là rủi ro mở đã ghi nhận trong kế hoạch di trú
// (planning/style-dna-integration.md và memory dự án), theo dõi qua kết quả TỔNG KẾT bên dưới.
const CONCURRENCY = concurrencyArg ? parseInt(concurrencyArg.split("=")[1], 10) : 10;
const MAX_AUTO_RELAUNCH = 1;

function runScene(sceneId) {
  return new Promise((resolve) => {
    const args = ["scripts/07-codegen.hf.router.mjs", `--video=${slug}`, `--scenes=${sceneId}`, "--no-root-sync"];
    const child = spawn("node", args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    child.stdout.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d) => {
      stdout += d.toString();
    });
    child.on("close", (code) => resolve({ sceneId, code, stdout }));
  });
}

function classifyFailure(stdout) {
  if (/VERDICT:\s*FAIL/i.test(stdout)) return "content";
  if (/Verify \(hyperframes check\) FAILED/i.test(stdout)) return "verify-error";
  if (/Lỗi khi gọi 9router/i.test(stdout)) return "network";
  return "unknown";
}

function excerptFor(kind, stdout) {
  const marker = kind === "content" ? "VERDICT:" : kind === "verify-error" ? "Verify (hyperframes check) FAILED" : null;
  if (marker) {
    const idx = stdout.lastIndexOf(marker);
    if (idx !== -1) return stdout.slice(idx).trim();
  }
  return stdout.trim().split("\n").slice(-20).join("\n");
}

async function run() {
  const queue = [...sceneIds];
  const relaunchCount = {};
  const results = {};
  let active = 0;

  await new Promise((resolveAll) => {
    function pump() {
      while (active < CONCURRENCY && queue.length > 0) {
        const sceneId = queue.shift();
        active++;
        console.log(`[bắt đầu] ${sceneId} (${active} đang chạy, ${queue.length} chờ trong hàng đợi)`);
        runScene(sceneId).then((result) => {
          active--;
          if (result.code === 0) {
            results[sceneId] = "pass";
            console.log(`[PASS] ${sceneId}`);
          } else {
            const kind = classifyFailure(result.stdout);
            if (kind === "network" && (relaunchCount[sceneId] || 0) < MAX_AUTO_RELAUNCH) {
              relaunchCount[sceneId] = (relaunchCount[sceneId] || 0) + 1;
              console.log(`[FAIL-mạng] ${sceneId} — lỗi kỹ thuật thuần tuý, tự chạy lại (lần ${relaunchCount[sceneId]})...`);
              queue.push(sceneId);
            } else {
              results[sceneId] = `fail-${kind}`;
              console.log(
                `\n[FAIL-${kind.toUpperCase()}] ${sceneId} — cần Claude can thiệp, KHÔNG tự chạy lại:\n${excerptFor(kind, result.stdout)}\n`,
              );
            }
          }
          pump();
          if (active === 0 && queue.length === 0) resolveAll();
        });
      }
    }
    pump();
  });

  return results;
}

const results = await run();

console.log("\n=== TỔNG KẾT ===");
for (const id of sceneIds) {
  console.log(`${id}: ${results[id] ?? "?"}`);
}

const failedIds = sceneIds.filter((id) => results[id] !== "pass");
if (failedIds.length === 0) {
  console.log("\nTất cả scene PASS — ráp index.html...");
  const r = syncRootHf(slug);
  console.log(
    `Đã ráp index.html: video "${slug}" — ${r.sceneCount}/${r.totalPlanned} scene, ${r.totalDurationSec.toFixed(2)}s.`,
  );
} else {
  console.log(
    `\n${failedIds.length} scene chưa PASS: ${failedIds.join(", ")} — xem log lỗi ở trên, sửa bằng --issue-file rồi chạy lại đúng scene đó. Chưa ráp index.html (tránh thiếu scene). Sau khi tất cả PASS, ráp bằng: node -e "import('./scripts/lib/sync-root-hf-lib.mjs').then(m => console.log(m.syncRootHf('${slug}')))"`,
  );
  process.exit(1);
}
