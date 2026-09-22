// Điều phối chạy SONG SONG scripts/07-codegen.router.mjs cho nhiều scene của CÙNG 1 video,
// theo mô hình hàng đợi (worker pool) — không gọi AI trực tiếp, chỉ quản lý tiến trình con.
// Đây là cách MẶC ĐỊNH để chạy Stage 7 cho video từ 2 scene trở lên (xem
// planning/responsibility-matrix.md mục 6) — chỉ chạy scripts/07-codegen.router.mjs tuần tự
// thủ công khi có lý do cụ thể (vd đang debug 1 scene riêng lẻ).
//
// Ngay khi 1 tiến trình con xong (dù pass/fail), lập tức lấy scene tiếp theo trong hàng đợi
// vào đúng chỗ trống đó — không đợi cả nhóm cùng đợt xong mới cấp việc mới (loại bỏ khoảng
// thời gian chết khi các scene có độ phức tạp/thời gian sinh khác nhau).
//
// Phân loại lỗi để quyết định có tự chạy lại hay không:
// - "network": cả 3 lần thử nội bộ đều lỗi mạng/timeout thuần tuý (không có Verify/Review nào
//   chạy được) -> an toàn để TỰ ĐỘNG xếp lại hàng đợi chạy 1 lượt mới (tối đa 1 lần/scene).
// - "content" (reviewer bắt VERDICT: FAIL) / "verify-error" (tsc/eslint lỗi thật) / "unknown":
//   đều là dấu hiệu model đã thử nhiều lần với cùng 1 vấn đề, có thêm 1 lượt chạy y hệt cũng khó
//   tự sửa được -> KHÔNG tự chạy lại, in đầy đủ verdict/lỗi ra NGAY để Claude đọc và sửa targeted
//   bằng `scripts/07-codegen.router.mjs --scenes=SNN --issue-file=...` (cách đã chứng minh hiệu
//   quả), trong khi các scene khác vẫn tiếp tục chạy song song.
//
// Usage: node scripts/07-codegen-parallel.mjs --video=<slug> --scenes=S01,S02,S03,... [--concurrency=3]
import { spawn } from "node:child_process";
import { getVideoSlug } from "../../../scripts/lib/video-paths.mjs";
import { syncRoot } from "./lib/sync-root-lib.mjs";

const slug = getVideoSlug();

const scenesArg = process.argv.find((a) => a.startsWith("--scenes="));
if (!scenesArg) {
  console.error("Thiếu --scenes=S01,S02,... (danh sách scene cần code cho video này)");
  process.exit(1);
}
const sceneIds = scenesArg.split("=")[1].split(",");

const concurrencyArg = process.argv.find((a) => a.startsWith("--concurrency="));
// Mặc định 10 (nâng từ 3, đã kiểm chứng thật 2026-09-20 trên slug test riêng dùng 1 lần, không
// đụng video thật): chạy đủ 16 scene ở concurrency=10, 15/16 PASS, 0 lỗi mạng/timeout với
// 9router — 9router chịu tải tốt ở mức này. Có phát hiện phụ: ~30% scene (5/16) bị lỗi
// `tsc: Cannot find module` sai ở lần thử đầu (file thực ra tồn tại), tự PASS ở lần thử 2 —
// nhiều khả năng do tranh chấp tiến trình/I/O cục bộ trên Windows khi nhiều `npx tsc`/`npx
// eslint` chạy đồng thời, KHÔNG phải giới hạn 9router. Người dùng đã xem chi phí này và quyết
// định chấp nhận đổi lấy tốc độ. Nếu sau này thấy tần suất lỗi cục bộ này tăng đáng kể, xem
// pipeline/codegen-issues.jsonl (stage=verify-tsc/verify-eslint) để cân nhắc giảm lại.
const CONCURRENCY = concurrencyArg ? parseInt(concurrencyArg.split("=")[1], 10) : 10;
const MAX_AUTO_RELAUNCH = 1;

function runScene(sceneId) {
  return new Promise((resolve) => {
    const args = ["scripts/07-codegen.router.mjs", `--video=${slug}`, `--scenes=${sceneId}`, "--no-root-sync"];
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
  if (/Verify FAILED/i.test(stdout)) return "verify-error";
  if (/Lỗi khi gọi 9router/i.test(stdout)) return "network";
  return "unknown";
}

function excerptFor(kind, stdout) {
  const marker = kind === "content" ? "VERDICT:" : kind === "verify-error" ? "Verify FAILED" : null;
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
  console.log("\nTất cả scene PASS — ráp Root.tsx...");
  const r = syncRoot(slug);
  console.log(
    `Đã ráp Root.tsx: video "${slug}" (composition id "${r.compositionId}") — ${r.sceneCount} scene, ${r.totalFrames} frame (${(r.totalFrames / 30).toFixed(2)}s).`,
  );
} else {
  console.log(
    `\n${failedIds.length} scene chưa PASS: ${failedIds.join(", ")} — xem log lỗi ở trên, sửa bằng --issue-file rồi chạy lại đúng scene đó. Chưa ráp Root.tsx (tránh thiếu scene). Sau khi tất cả PASS, chạy \`node scripts/08-sync-root.mjs --video=${slug}\` để ráp.`,
  );
  process.exit(1);
}
