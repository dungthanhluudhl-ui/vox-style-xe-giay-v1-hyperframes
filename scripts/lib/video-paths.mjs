// Quy ước đường dẫn dùng chung cho mọi script pipeline khi làm việc với MỘT video cụ thể
// (xác định bằng --video=<slug>). Tập trung quy ước ở đây để mọi script suy ra đường dẫn
// giống hệt nhau, tránh lệch convention giữa các script khi thêm video mới.
import path from "node:path";

export function getVideoSlug(argv = process.argv) {
  const arg = argv.find((a) => a.startsWith("--video="));
  if (!arg) {
    console.error("Thiếu tham số bắt buộc --video=<slug>, ví dụ: --video=an-le-64");
    process.exit(1);
  }
  return arg.slice("--video=".length);
}

/** "an-le-64" -> "AnLe64" (dùng làm composition id + tên component React) */
export function toPascalCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function videoPaths(slug, root = process.cwd()) {
  const pascal = toPascalCase(slug);
  return {
    slug,
    compositionId: pascal,
    componentName: `${pascal}Timeline`,
    scriptFile: path.join(root, "content", "videos", slug, "script.txt"),
    audioFile: path.join(root, "public", "videos", slug, "audio", "narration.mp3"),
    audioStaticPath: `videos/${slug}/audio/narration.mp3`,
    captionsFile: path.join(root, "public", "videos", slug, "captions", "captions.json"),
    captionsStaticPath: `videos/${slug}/captions/captions.json`,
    imagesDir: path.join(root, "public", "videos", slug, "media", "images"),
    videosDir: path.join(root, "public", "videos", slug, "media", "videos"),
    scenePlanJson: path.join(root, "planning", "videos", slug, "scene-plan.json"),
    scenePlanMd: path.join(root, "planning", "videos", slug, "scene-plan.md"),
    shotlistJson: path.join(root, "planning", "videos", slug, "shotlist.json"),
    shotlistMd: path.join(root, "planning", "videos", slug, "shotlist.md"),
    manifestJson: path.join(root, "pipeline", "videos", slug, "media-analysis", "manifest.json"),
    transcriptsDir: path.join(root, "pipeline", "videos", slug, "transcripts"),
    contactSheetDir: path.join(root, "pipeline", "videos", slug, "contact-sheet"),
    runLog: path.join(root, "pipeline", "videos", slug, "run-log.md"),
    scenesDir: path.join(root, "src", "videos", slug, "scenes"),
  };
}
