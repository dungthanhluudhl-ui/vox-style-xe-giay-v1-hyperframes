// POC: ráp 2 scene HyperFrames đã sinh (S01, S07) thành 1 composition duy nhất qua cơ chế
// sub-composition (data-composition-src) — TẤT ĐỊNH, KHÔNG AI, mirror đúng vai trò của
// archive/remotion-legacy/scripts/lib/sync-root-lib.mjs (ráp Root.tsx) bên Remotion.
//
// Usage: node poc/hyperframes/assemble-poc.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const HF_DIR = path.join(root, "poc", "hyperframes");
const HOST_DIR = path.join(HF_DIR, "an-le-64-assembly");

// Thời lượng thật đã render từng scene (đo bằng ffprobe) — dùng để tính data-start/data-duration
// của từng slot trong host, giống cách sync-root-lib.mjs tính frame từ startMs/endMs.
const SCENES = [
  { id: "S01", dir: "an-le-64-s01", compId: "scene-s01", duration: 7.8 },
  { id: "S07", dir: "an-le-64-s07", compId: "scene-s07", duration: 6.566667 },
];

function extractBetween(text, startTag, endTag) {
  const s = text.indexOf(startTag);
  const e = text.indexOf(endTag, s);
  if (s === -1 || e === -1) throw new Error(`Không tìm thấy ${startTag}...${endTag}`);
  return text.slice(s + startTag.length, e);
}

// 1. Scaffold host project (nếu chưa có) — deterministic CLI action.
if (!fs.existsSync(path.join(HOST_DIR, "hyperframes.json"))) {
  const { execSync } = await import("node:child_process");
  execSync(`npx hyperframes init "an-le-64-assembly" --resolution portrait --non-interactive`, {
    cwd: HF_DIR,
    stdio: "inherit",
    env: { ...process.env, HYPERFRAMES_SKIP_SKILLS: "1" },
  });
}
fs.mkdirSync(path.join(HOST_DIR, "compositions"), { recursive: true });
fs.mkdirSync(path.join(HOST_DIR, "assets"), { recursive: true });

let offset = 0;
const slots = [];
const hoistedLinks = new Set();

for (const scene of SCENES) {
  const srcHtml = fs.readFileSync(path.join(HF_DIR, scene.dir, "index.html"), "utf8");

  // BÀI HỌC rút ra từ lần chạy check() đầu tiên: <template> chỉ mang theo nội dung bên trong
  // nó — mọi thứ trong <head> gốc (vd <link> Google Fonts) bị runtime bỏ qua khi dùng làm
  // sub-composition (đúng như hyperframes-core/references/sub-compositions.md cảnh báo). Phải
  // tự hoist các <link rel="stylesheet"> cần thiết (font CDN) lên <head> của host, dedup theo href.
  const headContent = extractBetween(srcHtml, "<head>", "<style>");
  for (const m of headContent.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/g)) {
    const href = m[0].match(/href=["']([^"']+)["']/)?.[1];
    hoistedLinks.add(href ? `<link rel="stylesheet" href="${href}" />` : m[0]);
  }

  // Trích style (trong <head>) và toàn bộ nội dung <body> (root div + script đăng ký timeline).
  const styleContent = extractBetween(srcHtml, "<style>", "</style>");
  const bodyContent = extractBetween(srcHtml, "<body>", "</body>");

  // Đổi composition-id "main" -> id riêng cho từng scene để không đụng nhau trong host (chỉ có
  // đúng 2 chỗ dùng "main": data-composition-id trên root div, và key window.__timelines).
  const renamedStyle = styleContent; // style không tham chiếu id, giữ nguyên
  const renamedBody = bodyContent.split('"main"').join(`"${scene.compId}"`);

  // Font <link> phải nằm TRONG <template> (không phải <head>) để được clone vào DOM sống khi
  // runtime mount sub-composition — <head> gốc bị bỏ qua hoàn toàn (xem sub-compositions.md).
  const sceneLinks = [...headContent.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/g)].map((m) => m[0]);

  const subCompositionHtml = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <template>
      ${sceneLinks.join("\n      ")}
      <style>${renamedStyle}</style>
${renamedBody}
    </template>
  </body>
</html>
`;
  fs.writeFileSync(path.join(HOST_DIR, "compositions", `${scene.compId}.html`), subCompositionHtml, "utf8");

  // Copy asset (không trùng tên file giữa 2 scene đã kiểm tra trước).
  const assetsDir = path.join(HF_DIR, scene.dir, "assets");
  if (fs.existsSync(assetsDir)) {
    for (const f of fs.readdirSync(assetsDir)) {
      const dest = path.join(HOST_DIR, "assets", f);
      if (!fs.existsSync(dest)) fs.copyFileSync(path.join(assetsDir, f), dest);
    }
  }

  slots.push({ ...scene, start: offset });
  offset += scene.duration;
}

const totalDuration = offset;

const hostHtml = `<!doctype html>
<html lang="en" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    ${[...hoistedLinks].join("\n    ")}
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #0a0a0a; }
      #root { width: 100%; height: 100%; position: relative; }
      .clip { position: absolute; inset: 0; }
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="assembly"
      data-start="0"
      data-duration="${totalDuration}"
      data-width="1080"
      data-height="1920"
    >
${slots
  .map(
    (s, i) => `      <div
        id="slot-${s.id.toLowerCase()}"
        class="clip"
        data-composition-id="${s.compId}"
        data-composition-src="compositions/${s.compId}.html"
        data-start="${s.start}"
        data-duration="${s.duration}"
        data-track-index="0"
        data-width="1080"
        data-height="1920"
      ></div>`,
  )
  .join("\n")}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      window.__timelines["assembly"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(HOST_DIR, "index.html"), hostHtml, "utf8");
console.log(`Ráp xong ${SCENES.length} scene vào ${HOST_DIR}/index.html`);
console.log(`Slots: ${slots.map((s) => `${s.id}@${s.start.toFixed(3)}s+${s.duration}s`).join(", ")}`);
console.log(`Tổng thời lượng: ${totalDuration.toFixed(3)}s`);
