// Logic ráp hyperframes/videos/<slug>/index.html — LOCAL, TẤT ĐỊNH, KHÔNG gọi AI. Mirror đúng
// vai trò của archive/remotion-legacy/scripts/lib/sync-root-lib.mjs (bản Remotion): dùng chung bởi
// scripts/07-codegen.hf.router.mjs (gọi sau mỗi scene, để verify() luôn `hyperframes check`
// được trên index.html mới nhất — trừ khi --no-root-sync) và scripts/08-sync-root.hf.mjs
// (CLI ráp thủ công, vd sau khi các tiến trình --no-root-sync chạy song song xong).
//
// Giai đoạn C: mount thêm <audio> (narration.mp3, copy tất định từ public/videos/<slug>/audio/)
// + compositions/caption-track.html — SINH TẤT ĐỊNH mỗi lần ráp từ captions.json (xem
// generate-caption-track-hf.mjs) rồi mount, bỏ qua im lặng nếu video chưa có captions.json —
// tổng quát hoá đúng logic đã kiểm chứng ở poc/hyperframes/assemble-poc.mjs (hoistedLinks, mount
// 1 lần tất định).
import fs from "node:fs";
import path from "node:path";
import { videoPaths } from "./video-paths.mjs";
import { generateCaptionTrackHf } from "./generate-caption-track-hf.mjs";

// Dedup theo href (không theo chuỗi thô) — 2 scene có thể viết cùng 1 link font với cú pháp
// hơi khác (tự đóng "/>" hay không), vẫn phải coi là trùng. Mirror đúng logic hoistedLinks đã
// kiểm chứng ở poc/hyperframes/assemble-poc.mjs.
function extractLinkHrefs(html) {
  const hrefs = [];
  for (const m of html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/g)) {
    const href = m[0].match(/href=["']([^"']+)["']/)?.[1];
    if (href) hrefs.push(href);
  }
  return hrefs;
}

function extractBetween(text, startTag, endTag) {
  const s = text.indexOf(startTag);
  const e = text.indexOf(endTag, s);
  if (s === -1 || e === -1) throw new Error(`Không tìm thấy ${startTag}...${endTag} trong file standalone`);
  return text.slice(s + startTag.length, e);
}

/** Chuyển đổi TẤT ĐỊNH (không AI) 1 composition STANDALONE (composition-id "main", không có
 * <template>) thành 1 sub-composition (compId truyền vào, vd "scene-s01") — tổng quát hoá đúng
 * logic đã kiểm chứng đúng ở poc/hyperframes/assemble-poc.mjs: trích <style>/<body>, hoist
 * <link> font (nguyên trạng, không dedup — dedup theo href đã làm ở tầng syncRootHf khi ráp
 * nhiều scene lại), đổi mọi chỗ dùng chuỗi `"main"` (data-composition-id trên root div VÀ key
 * window.__timelines) sang đúng compId. Xem ghi chú "bài học POC assemble-poc.mjs": <head> gốc
 * và mọi thứ ngoài <template> bị runtime bỏ qua khi mount làm sub-composition, nên <link> font
 * phải nằm TRONG <template>. */
export function standaloneToSubComposition(standaloneHtml, compId) {
  const headContent = extractBetween(standaloneHtml, "<head>", "<style>");
  const sceneLinks = [...headContent.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/g)].map((m) => m[0]);
  const styleContent = extractBetween(standaloneHtml, "<style>", "</style>");
  const bodyContent = extractBetween(standaloneHtml, "<body>", "</body>");
  const renamedBody = bodyContent.split('"main"').join(`"${compId}"`);

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <template>
      ${sceneLinks.join("\n      ")}
      <style>${styleContent}</style>
${renamedBody}
    </template>
  </body>
</html>
`;
}

/** Ráp lại hyperframes/videos/<slug>/index.html từ scene-plan.json thật + các file
 * compositions/scene-sNN.html ĐÃ CÓ trên đĩa (bỏ qua scene chưa được code). */
export function syncRootHf(slug, root = process.cwd()) {
  const vp = videoPaths(slug, root);
  const scenePlanRaw = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
  const allPlanned = Array.isArray(scenePlanRaw) ? scenePlanRaw : scenePlanRaw.scenes;

  const existingSceneIds = fs.existsSync(vp.hfCompositionsDir)
    ? new Set(
        fs
          .readdirSync(vp.hfCompositionsDir)
          // scene ID có thể có hậu tố chữ cái khi 1 scene plan gốc bị tách thành scene con
          // (vd "S17a"/"S17b"/"S17c") — regex phải chấp nhận hậu tố đó, không chỉ số thuần.
          .filter((f) => /^scene-s\d+[a-z]*\.html$/i.test(f))
          .map((f) => f.replace(/^scene-/i, "").replace(/\.html$/i, "").toLowerCase()),
      )
    : new Set();

  const scenes = allPlanned.filter((s) => existingSceneIds.has(s.id.toLowerCase()));
  const missing = allPlanned.filter((s) => !existingSceneIds.has(s.id.toLowerCase()));
  if (missing.length > 0) {
    console.warn(
      `(video "${slug}") chưa có code HyperFrames cho scene: ${missing.map((s) => s.id).join(", ")} — index.html tạm thời chỉ gồm ${scenes.length}/${allPlanned.length} scene đã có.`,
    );
  }
  if (scenes.length === 0) {
    throw new Error(`Video "${slug}" chưa có scene HyperFrames nào trên đĩa — không có gì để ráp vào index.html.`);
  }

  const totalDurationSec = scenes[scenes.length - 1].endMs / 1000;

  const hoistedLinks = new Set();
  const slots = scenes.map((scene) => {
    const compId = `scene-${scene.id.toLowerCase()}`;
    const srcHtml = fs.readFileSync(path.join(vp.hfCompositionsDir, `${compId}.html`), "utf8");
    for (const href of extractLinkHrefs(srcHtml)) hoistedLinks.add(href);

    return {
      compId,
      startSec: scene.startMs / 1000,
      durationSec: (scene.endMs - scene.startMs) / 1000,
    };
  });

  // Caption-track (Giai đoạn A) — sinh TẤT ĐỊNH từ captions.json mỗi lần ráp (idempotent, ghi đè)
  // rồi mount, thay vì chỉ mount NẾU file đã có sẵn (lỗ hổng thật đã gây video hoàn toàn không có
  // phụ đề — xem generate-caption-track-hf.mjs). Bỏ qua im lặng nếu video chưa có captions.json.
  generateCaptionTrackHf(slug, totalDurationSec * 1000, root);
  const captionTrackPath = path.join(vp.hfCompositionsDir, "caption-track.html");
  const hasCaptionTrack = fs.existsSync(captionTrackPath);
  if (hasCaptionTrack) {
    const captionHtml = fs.readFileSync(captionTrackPath, "utf8");
    for (const href of extractLinkHrefs(captionHtml)) hoistedLinks.add(href);
  }

  // Audio narration — copy tất định vào assets/ (idempotent), mount <audio id=...> bắt buộc có id
  // (lint: media_missing_id). Bỏ qua nếu video chưa có narration.mp3 (vd project test thiếu audio).
  const hasAudio = fs.existsSync(vp.audioFile);
  if (hasAudio) {
    fs.mkdirSync(vp.hfAssetsDir, { recursive: true });
    const audioDest = path.join(vp.hfAssetsDir, "narration.mp3");
    if (!fs.existsSync(audioDest)) fs.copyFileSync(vp.audioFile, audioDest);
  }

  const bodySlots = slots
    .map(
      (s) => `      <div
        id="slot-${s.compId}"
        class="hf-slot"
        data-composition-id="${s.compId}"
        data-composition-src="compositions/${s.compId}.html"
        data-start="${s.startSec.toFixed(6)}"
        data-duration="${s.durationSec.toFixed(6)}"
        data-track-index="0"
        data-width="1080"
        data-height="1920"
      ></div>`,
    )
    .join("\n");

  const captionSlot = hasCaptionTrack
    ? `      <div
        id="slot-caption-track"
        class="hf-slot"
        data-composition-id="caption-track"
        data-composition-src="compositions/caption-track.html"
        data-start="0.000000"
        data-duration="${totalDurationSec.toFixed(6)}"
        data-track-index="1"
        data-width="1080"
        data-height="1920"
      ></div>`
    : "";

  const audioTag = hasAudio
    ? `      <audio
        id="narration"
        data-start="0"
        src="assets/narration.mp3"
      ></audio>`
    : "";

  const html = `<!doctype html>
<html lang="vi" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    ${[...hoistedLinks].map((href) => `<link rel="stylesheet" href="${href}" />`).join("\n    ")}
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #0a0a0a; }
      #root { width: 100%; height: 100%; position: relative; }
      /* Slot dùng class RIÊNG .hf-slot, KHÔNG dùng .clip: CSS của root và mọi sub-composition
         nằm chung 1 trang, nên selector .clip ở đây sẽ áp cả lên các phần tử class="clip" BÊN
         TRONG scene (quy ước HyperFrames cho mọi timed element) — isolation làm nội dung shot
         bị vẽ dưới lớp nền z-index>0 của scene (trống hình), inset:0 kéo giãn thẻ chỉ neo 1
         cạnh; ngược lại rule .clip do scene tự khai cũng áp lên slot. isolation vẫn bắt buộc
         trên slot để z-index nội bộ 1 scene không đè lên slot khác/caption-track (track-index
         không quyết định layering). Chi tiết + bằng chứng: planning/incident-log.md. */
      .hf-slot { position: absolute; inset: 0; isolation: isolate; }
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${totalDurationSec.toFixed(6)}"
      data-width="1080"
      data-height="1920"
    >
${audioTag}
${bodySlots}
${captionSlot}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;

  fs.mkdirSync(vp.hfProjectDir, { recursive: true });
  fs.writeFileSync(vp.hfIndexHtml, html, "utf8");

  return {
    slug,
    sceneCount: scenes.length,
    totalPlanned: allPlanned.length,
    totalDurationSec,
    hasAudio,
    hasCaptionTrack,
  };
}
