// POC mascot-aroll (ADN v2, vòng 3): dựng cảnh ASSET TẤT ĐỊNH — camera LIÊN TỤC, không giật cục.
// Học từ v1 + skill HyperFrames (hyperframes-animation: "Slow zoom (Ken Burns): scale 1→1.04 over beat, ease none";
// multi-phase-camera: MỘT writer camera, camera không bao giờ đứng yên rồi bật lại):
//  - mỗi shot đúng 1 tween camera phủ trọn shot, ease "none", KHÔNG reset khung, KHÔNG punch-entrance;
//  - ngân sách zoom theo độ phân giải thật (nguồn raster nhỏ → gần như chỉ pan);
//  - sự kiện thị giác = đổi asset (cắt hoặc crossfade 0,25s); một asset không bị tách thành nhiều shot liền kề.
import path from "node:path";
import { fitForAsset, bgBlock } from "./mascot-scene.mjs";

export const CAMERA_PRESETS = ["drift-in", "drift-out", "pan-left", "pan-right", "pan-up", "pan-down", "diag-dr", "diag-ul"];
export const ASSET_STYLES = ["drift-in", "drift-out", "pan", "diag", "doc-card"];
// Thứ tự xoay vòng khi cần đổi kiểu để không trùng shot liền kề (đa dạng giữa các cảnh)
const ROTATION = ["drift-in", "pan-right", "drift-out", "pan-left", "diag-dr", "pan-up", "diag-ul", "pan-down"];
const DELTAS = [0.06, 0.08, 0.1, 0.07, 0.09]; // biên độ zoom cơ sở (v1: TB ×1,10)
const JITTER = [[0, 0], [-1, -0.6], [1.2, -0.8], [-0.8, 1], [1, 0.8]]; // lệch tiêu điểm tương đối, rất nhẹ
const RASTER_CAP = 2.0; // tổng phóng hiệu dụng tối đa trên nguồn raster (cover)
const CONTAIN_CAP = 2.6; // media contain đã phóng tới ×2,5 → gần như không zoom thêm
const CROSSFADE_SEC = 0.25;
const W = 1080, H = 1920;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const r3 = (v) => Math.round(v * 1000) / 1000;

/** Từ khoá camera do model/kế hoạch cũ viết → preset v2 (từ vựng v1). */
export function canonicalPreset(m) {
  const t = String(m ?? "").toLowerCase();
  if (CAMERA_PRESETS.includes(t)) return t;
  if (/zoom-?in|push|drift-?in/.test(t)) return "drift-in";
  if (/zoom-?out|pull|drift-?out/.test(t)) return "drift-out";
  if (/pan-?left/.test(t)) return "pan-left";
  if (/pan-?right/.test(t)) return "pan-right";
  if (/pan-?up/.test(t)) return "pan-up";
  if (/pan-?down/.test(t)) return "pan-down";
  if (/^pan$/.test(t)) return "pan-left";
  if (/diag|crop|parallax/.test(t)) return "diag-dr";
  return "drift-in"; // static/split/reveal/lạ: drift rất nhẹ thay vì đứng yên chết
}

/** Ngân sách chuyển động theo độ phân giải THẬT của asset và cách đặt (cover/contain). */
export function motionBudget(asset, fit) {
  const isVideo = asset?.type === "video";
  if (fit.fit === "contain") {
    const U = fit.box.w / asset.width; // hệ số phóng của hộp contain
    return { deltaMax: clamp(CONTAIN_CAP / U - 1, 0, 0.03), panMax: 30, U, contain: true, isVideo };
  }
  const U = Math.max(W / asset.width, H / asset.height);
  let deltaMax = clamp(RASTER_CAP / U - 1, 0.04, 0.1);
  if (isVideo) deltaMax = Math.min(deltaMax, 0.05); // video thật: zoom mỏng hơn
  return { deltaMax, panMax: null, U, contain: false, isVideo };
}

/** Một tween camera duy nhất cho shot: {scale0,scale1,x0,y0,x1,y1} — tất định theo (preset, ngân sách, thời lượng, chỉ số). */
export function cameraFor(preset, budget, durSec, k) {
  const d = Math.min(DELTAS[k % DELTAS.length] * clamp(durSec / 6, 0.8, 1.25), budget.deltaMax);
  const j = JITTER[k % JITTER.length];
  // biên an toàn để không lộ mép: |x(t)| ≤ (scale(t)-1)·W/2 (cover); contain thì nền nhìn thấy nên chỉ giới hạn pan
  const mx = budget.contain ? Math.min(budget.panMax / 2, 15) : 0.8 * d * (W / 2);
  const my = budget.contain ? Math.min(budget.panMax / 2, 15) : 0.8 * d * (H / 2);
  const o = (a, b, c, e, f, g) => ({ scale0: r3(a), scale1: r3(b), x0: r3(c), y0: r3(e), x1: r3(f), y1: r3(g) });
  if (preset === "drift-in") return o(1, 1 + d, 0, 0, j[0] * mx, j[1] * my);
  if (preset === "drift-out") return o(1 + d, 1, j[0] * mx, j[1] * my, 0, 0);
  if (preset.startsWith("pan-")) {
    const s = budget.contain ? 1 + d : 1 + Math.max(d, Math.min(0.08, budget.deltaMax));
    const horiz = preset === "pan-left" || preset === "pan-right";
    const m = budget.contain ? budget.panMax : 0.9 * ((s - 1) / 2) * (horiz ? W : H);
    const sign = preset === "pan-left" || preset === "pan-up" ? 1 : -1; // pan-left: nội dung trôi sang trái (+m → -m)
    return horiz ? o(s, s, sign * m, 0, -sign * m, 0) : o(s, s, 0, sign * m, 0, -sign * m);
  }
  // diag-dr / diag-ul: zoom nhẹ + trôi chéo
  const sg = preset === "diag-dr" ? 1 : -1;
  return o(1, 1 + d, 0, 0, sg * 0.8 * mx, sg * 0.8 * my);
}

/** Gộp shot LIỀN KỀ cùng asset thành 1 shot (v1: mỗi lần cắt lại cùng ảnh = reset khung). Đánh số lại id. */
export function mergeAdjacentSameAsset(shots) {
  const sorted = [...shots].sort((a, b) => a.startMs - b.startMs);
  const out = [];
  for (const s of sorted) {
    const last = out[out.length - 1];
    if (last && s.assetId && last.assetId === s.assetId) { last.endMs = s.endMs; continue; }
    out.push({ ...s });
  }
  out.forEach((s, i) => { s.id = `${s.sceneId}-${i + 1}`; });
  return out;
}

/** Hoàn thiện shot của MỘT cảnh asset (tất định): gộp, đặt fit/ngân sách, gán preset không trùng liền kề + camera + chuyển shot.
 * `seq` = trạng thái xuyên cảnh { k: 0, prev: null, lastTransition: "cut" } — truyền cùng đối tượng cho mọi cảnh theo thứ tự. */
export function finalizeAssetShots(sceneShots, mediaById, seq) {
  const merged = mergeAdjacentSameAsset(sceneShots);
  merged.forEach((s, i) => {
    const a = mediaById[s.assetId];
    const fit = fitForAsset(a);
    const budget = motionBudget(a, fit);
    let preset = canonicalPreset(s.camera?.preset ?? s.cameraMotion);
    if (seq.prev && preset === seq.prev) preset = ROTATION[(ROTATION.indexOf(preset) + 1 + (seq.k % 3)) % ROTATION.length];
    if (preset === seq.prev) preset = ROTATION[(ROTATION.indexOf(preset) + 1) % ROTATION.length];
    const dur = (s.endMs - s.startMs) / 1000;
    s.mediaFit = fit.fit; s.mediaFitReason = fit.reason;
    if (fit.fit === "contain") s.containBox = fit.box; else delete s.containBox;
    s.cameraMotion = preset;
    s.camera = { preset, ...cameraFor(preset, budget, dur, seq.k) };
    if (i === 0) s.transitionIn = "cut";
    else {
      seq.lastTransition = seq.lastTransition === "cut" ? "crossfade" : "cut";
      s.transitionIn = seq.lastTransition;
    }
    seq.prev = preset;
    seq.k++;
  });
  return merged;
}

/** Cảnh báo mềm shot (không chặn): shot <3s hoặc >10s, cảnh >10s chỉ 1 asset. */
export function assetShotWarnings(scene, shots) {
  const w = [];
  for (const s of shots) {
    const d = (s.endMs - s.startMs) / 1000;
    if (d < 3) w.push(`${s.id} chỉ ${d.toFixed(1)}s (<3s): shot quá ngắn.`);
    if (d > 10.5) w.push(`${s.id} dài ${d.toFixed(1)}s (>10s) trên 1 asset: nên dùng thêm asset khác ở Stage 5.`);
  }
  return w;
}

/** Dựng HTML standalone cảnh asset. shots: shot đã qua finalizeAssetShots (startMs/endMs tuyệt đối). */
export function buildAssetSceneHtml({ scene, shots, mediaById, bgVariant, driftDir }) {
  const sceneStart = scene.startMs;
  const durationSec = +((scene.endMs - sceneStart) / 1000).toFixed(3);
  const hasContain = shots.some((s) => s.mediaFit === "contain");
  const bg = hasContain ? bgBlock(bgVariant ?? "grid-moving", driftDir ?? "left", durationSec) : { html: "", css: "", js: "" };
  const items = shots.map((s, i) => {
    const a = mediaById[s.assetId];
    if (!a?.file) throw new Error(`Shot ${s.id}: không có asset "${s.assetId}" trong manifest`);
    const next = shots[i + 1];
    const start = +((s.startMs - sceneStart) / 1000).toFixed(3);
    const dur = +((s.endMs - s.startMs) / 1000).toFixed(3);
    const ext = next?.transitionIn === "crossfade" ? CROSSFADE_SEC : 0;
    const winDur = +Math.min(dur + ext, durationSec - start).toFixed(3);
    const box = s.mediaFit === "contain" ? s.containBox : { x: 0, y: 0, w: W, h: H };
    const file = `assets/${path.basename(a.file)}`;
    const camStyle = `position:absolute;left:${box.x}px;top:${box.y}px;width:${box.w}px;height:${box.h}px;transform-origin:50% 50%;will-change:transform`;
    const media = a.type === "video"
      ? `<video id="m-${i + 1}" src="${file}" muted playsinline data-start="${start}" data-duration="${winDur}" data-media-start="${Number.isFinite(s.trimStartSec) ? s.trimStartSec : 0}" style="display:block;width:${box.w}px;height:${box.h}px;object-fit:cover"></video>`
      : `<img id="m-${i + 1}" class="clip" data-start="${start}" data-duration="${winDur}" data-track-index="${i}" src="${file}" alt="" width="${box.w}" height="${box.h}" style="display:block;width:${box.w}px;height:${box.h}px;object-fit:cover">`;
    const fadeIn = i > 0 && s.transitionIn === "crossfade";
    const open = fadeIn ? `<div id="fade-${i + 1}" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px">` : "";
    const close = fadeIn ? "</div>" : "";
    const c = s.camera;
    let js = `tl.fromTo("#cam-${i + 1}",{scale:${c.scale0},x:${c.x0},y:${c.y0}},{scale:${c.scale1},x:${c.x1},y:${c.y1},duration:${dur},ease:"none",immediateRender:false},${start});`;
    if (fadeIn) js += `\n tl.fromTo("#fade-${i + 1}",{opacity:0},{opacity:1,duration:${CROSSFADE_SEC},ease:"none",immediateRender:false},${start});`;
    return { html: `${open}<div id="cam-${i + 1}" style="${camStyle}">${media}</div>${close}`, js };
  });
  return `<!doctype html>
<html lang="vi" data-resolution="portrait"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden}
#root{position:relative;width:1080px;height:1920px;background:#E7E3D9;overflow:hidden}
${bg.css}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${durationSec}" data-width="1080" data-height="1920">
 ${bg.html}
 ${items.map((x) => x.html).join("\n ")}
</div>
<script>
(() => {
 const tl = gsap.timeline({ paused: true });
 ${bg.js}
 ${items.map((x) => x.js).join("\n ")}
 window.__timelines = window.__timelines || {};
 window.__timelines["main"] = tl;
})();
</script></body></html>
`;
}

/** Tên file asset cần copy vào assets/ cho các shot. */
export function assetFilesFor(shots, mediaById) {
  return [...new Set(shots.map((s) => mediaById[s.assetId]?.file).filter(Boolean))];
}
