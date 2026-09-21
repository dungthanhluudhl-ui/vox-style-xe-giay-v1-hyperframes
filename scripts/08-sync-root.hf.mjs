// Ráp lại hyperframes/videos/<slug>/index.html cho MỘT video — bản HyperFrames của
// scripts/08-sync-root.mjs. LOCAL, TẤT ĐỊNH, KHÔNG gọi AI.
// scripts/07-codegen.hf.router.mjs tự gọi lại logic này sau MỖI scene ở chế độ tuần tự; script
// này dùng khi cần ráp thủ công (vd sau khi các tiến trình --no-root-sync chạy song song xong,
// hoặc để mount audio+caption-track lần đầu sau khi đủ scene).
// Usage: node scripts/08-sync-root.hf.mjs --video=<slug>
import { getVideoSlug } from "./lib/video-paths.mjs";
import { syncRootHf } from "./lib/sync-root-hf-lib.mjs";

const slug = getVideoSlug();
const result = syncRootHf(slug);
console.log(
  `Đã ráp hyperframes/videos/${slug}/index.html — ${result.sceneCount}/${result.totalPlanned} scene, ${result.totalDurationSec.toFixed(2)}s` +
    `${result.hasAudio ? ", có audio" : ", CHƯA có audio (thiếu public/videos/" + slug + "/audio/narration.mp3)"}` +
    `${result.hasCaptionTrack ? ", có caption-track" : ", CHƯA có caption-track"}.`,
);
