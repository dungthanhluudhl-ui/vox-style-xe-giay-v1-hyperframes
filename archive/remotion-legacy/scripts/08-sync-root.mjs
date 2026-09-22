// Ráp lại src/Root.tsx cho MỘT video (giữ nguyên khối của mọi video khác đã có trong file).
// LOCAL, TẤT ĐỊNH, KHÔNG gọi AI — việc ráp Sequence từ frame number là thuần cơ học.
// scripts/07-codegen.router.mjs tự gọi lại logic này sau MỖI scene ở chế độ tuần tự; script
// này dùng khi cần ráp thủ công (vd sau khi các tiến trình --no-root-sync chạy song song xong).
// Usage: node scripts/08-sync-root.mjs --video=<slug>
import { getVideoSlug } from "../../../scripts/lib/video-paths.mjs";
import { syncRoot } from "./lib/sync-root-lib.mjs";

const slug = getVideoSlug();
const result = syncRoot(slug);
console.log(
  `Đã ráp Root.tsx: video "${slug}" (composition id "${result.compositionId}") — ${result.sceneCount} scene, ${result.totalFrames} frame (${(result.totalFrames / 30).toFixed(2)}s).`,
);
