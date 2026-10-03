// ADN v2 (, vòng 3): dựng cảnh ASSET TẤT ĐỊNH — camera LIÊN TỤC, không giật cục.
// Học từ v1 + skill HyperFrames (hyperframes-animation: "Slow zoom (Ken Burns): scale 1→1.04 over beat, ease none";
// multi-phase-camera: MỘT writer camera, camera không bao giờ đứng yên rồi bật lại):
//  - mỗi shot đúng 1 tween camera phủ trọn shot, ease "none", KHÔNG reset khung, KHÔNG punch-entrance;
//  - ngân sách zoom theo độ phân giải thật (nguồn raster nhỏ → gần như chỉ pan);
//  - sự kiện thị giác = đổi asset (cắt hoặc crossfade 0,25s); một asset không bị tách thành nhiều shot liền kề.
import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fitForAsset, bgBlock } from "./media-layout.mjs";
import { treatmentLayout, renderKeyText, keyTextLayoutProblems, MORPH_SEC, SCRIM_SEC } from "./key-text.mjs";

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

/** Dựng HTML standalone cảnh asset. shots: shot đã qua finalizeAssetShots (startMs/endMs tuyệt đối).
 * [vòng 5] shot có thể mang `keyText` = { text, format, treatment, atMs, holdMs, wordOffsets? } (chữ A-roll do Stage 6 tính tất định từ mốc từng từ narration):
 *  - dim-lower: gradient tối (scrim) mờ vào nửa dưới, chữ lower-third, asset giữ nguyên toàn khung;
 *  - shrink-top: asset thu nhỏ ×0,8 (chỉ transform x/y/scale trên #shrink) dồn xuống, nền giấy hiện ở dải trên cho chữ; hết chữ asset TRỞ LẠI (nếu còn chỗ);
 *  - band-free: asset contain đã có dải trống trên/dưới → chữ vào dải đó, asset không đổi.
 * Chữ KHÔNG thẻ/khung. Camera trôi bên trong (#cam) chạy tiếp suốt; một writer cho mỗi thuộc tính. */
export function buildAssetSceneHtml({ scene, shots, mediaById, bgVariant, driftDir }) {
  const sceneStart = scene.startMs;
  const durationSec = +((scene.endMs - sceneStart) / 1000).toFixed(3);
  const hasContain = shots.some((s) => s.mediaFit === "contain");
  const bg = hasContain ? bgBlock(bgVariant ?? "grid-moving", driftDir ?? "left", durationSec) : { html: "", css: "", js: "" };
  const rel = (ms) => +((ms - sceneStart) / 1000).toFixed(3);
  const ktIdx = shots.findIndex((s) => s.keyText);
  let kx = null;
  if (ktIdx >= 0) {
    const sh = shots[ktIdx], k = sh.keyText;
    const box = sh.mediaFit === "contain" ? sh.containBox : { x: 0, y: 0, w: W, h: H };
    const layout = treatmentLayout(k.treatment, box, sh.mediaFit);
    const atSec = rel(k.atMs), holdSec = +(k.holdMs / 1000).toFixed(3);
    const shotStartSec = rel(sh.startMs), shotEndSec = rel(sh.endMs);
    const text = layout.valid ? renderKeyText({ kt: { text: k.text, format: k.format, atSec, holdSec, wordOffsets: k.wordOffsets ?? null }, layout }) : null;
    const probs = layout.valid ? keyTextLayoutProblems(layout, text.box) : [layout.why];
    if (text?.overflow) probs.push("khối chữ vượt chiều cao vùng cho phép");
    if (atSec < shotStartSec - 0.001) probs.push(`chữ bắt đầu ${atSec}s trước shot ${sh.id} (${shotStartSec}s)`);
    if (atSec + holdSec > shotEndSec - 0.15) probs.push(`chữ kết thúc ${(atSec + holdSec).toFixed(2)}s, sát/vượt hết shot ${sh.id} (${shotEndSec}s)`);
    if (probs.length) throw new Error(`Chữ A-roll ${scene.id}: ${probs.join(" ")}`);
    const endText = +(atSec + holdSec).toFixed(3);
    const restore = !!layout.shrink && shotEndSec - endText >= MORPH_SEC + 0.1;
    const bgEnd = restore ? endText + MORPH_SEC : durationSec;
    const paperBg = layout.needBg && !hasContain ? bgBlock(k.bgVariant ?? bgVariant ?? "grid-moving", k.driftDir ?? driftDir ?? "left", +(bgEnd - atSec).toFixed(3), atSec) : null;
    kx = { sh, k, box, layout, atSec, holdSec, endText, restore, bgEnd, paperBg, text };
  }
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
    const avail = a.type === "video" ? videoAvailSec(a, s) : Infinity;
    const needHold = a.type === "video" && winDur - avail > HOLD_EPS_SEC;
    const vidDur = needHold ? +avail.toFixed(3) : winDur;
    const holdImg = needHold
      ? `<img id="m-${i + 1}-hold" class="clip" data-start="${+(start + vidDur).toFixed(3)}" data-duration="${+(winDur - vidDur).toFixed(3)}" data-track-index="${i + 20}" src="assets/${holdFrameName(a)}" alt="" width="${box.w}" height="${box.h}" style="position:absolute;left:0;top:0;display:block;width:${box.w}px;height:${box.h}px;object-fit:cover">`
      : "";
    const media = a.type === "video"
      ? `<video id="m-${i + 1}" src="${file}" muted playsinline data-start="${start}" data-duration="${vidDur}" data-media-start="${Number.isFinite(s.trimStartSec) ? s.trimStartSec : 0}" style="display:block;width:${box.w}px;height:${box.h}px;object-fit:cover"></video>${holdImg}`
      : `<img id="m-${i + 1}" class="clip" data-start="${start}" data-duration="${winDur}" data-track-index="${i}" src="${file}" alt="" width="${box.w}" height="${box.h}" style="display:block;width:${box.w}px;height:${box.h}px;object-fit:cover">`;
    const fadeIn = i > 0 && s.transitionIn === "crossfade";
    const open = fadeIn ? `<div id="fade-${i + 1}" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px">` : "";
    const close = fadeIn ? "</div>" : "";
    const c = s.camera;
    let js = `tl.fromTo("#cam-${i + 1}",{scale:${c.scale0},x:${c.x0},y:${c.y0}},{scale:${c.scale1},x:${c.x1},y:${c.y1},duration:${dur},ease:"none",immediateRender:false},${start});`;
    if (fadeIn) js += `\n tl.fromTo("#fade-${i + 1}",{opacity:0},{opacity:1,duration:${CROSSFADE_SEC},ease:"none",immediateRender:false},${start});`;
    if (kx?.layout.shrink && i === ktIdx) {
      const t = kx.layout.shrink;
      const inner = `<div id="cam-${i + 1}" style="position:absolute;left:0;top:0;width:${box.w}px;height:${box.h}px;transform-origin:50% 50%;will-change:transform">${media}</div>`;
      const shrink = `<div id="shrink-${i + 1}" style="position:absolute;left:${box.x}px;top:${box.y}px;width:${box.w}px;height:${box.h}px;overflow:hidden;transform-origin:0 0;will-change:transform">${inner}</div>`;
      js += `\n tl.fromTo("#shrink-${i + 1}",{x:0,y:0,scale:1},{x:${t.x - box.x},y:${t.y - box.y},scale:${t.scale},duration:${MORPH_SEC},ease:"power2.inOut",immediateRender:false},${kx.atSec});`;
      if (kx.restore) js += `\n tl.fromTo("#shrink-${i + 1}",{x:${t.x - box.x},y:${t.y - box.y},scale:${t.scale}},{x:0,y:0,scale:1,duration:${MORPH_SEC},ease:"power2.inOut",immediateRender:false},${kx.endText});`;
      return { html: `${open}${shrink}${close}`, js };
    }
    return { html: `${open}<div id="cam-${i + 1}" style="${camStyle}">${media}</div>${close}`, js };
  });
  // lớp tối (dim) + chữ nằm TRÊN mọi shot; nền giấy phụ (cảnh cover dùng shrink-top) nằm DƯỚI mọi shot
  let scrimHtml = "", scrimJs = "", paperBgHtml = "";
  if (kx?.layout.scrim) {
    const sc = kx.layout.scrim;
    const style = sc.type === "full"
      ? `top:0;height:${H}px;background:rgba(20,20,20,${sc.alpha})`
      : `top:700px;height:${H - 700}px;background:linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,${sc.alpha}) 45%,rgba(20,20,20,${sc.alpha}) 100%)`;
    scrimHtml = `<div id="kt-scrim" style="position:absolute;left:0;width:${W}px;opacity:0;${style}"></div>`;
    scrimJs = `tl.fromTo("#kt-scrim",{opacity:0},{opacity:1,duration:${SCRIM_SEC},ease:"power1.out",immediateRender:false},${kx.atSec});
 tl.fromTo("#kt-scrim",{opacity:1},{opacity:0,duration:0.3,ease:"power1.in",immediateRender:false},${+(kx.endText - 0.3).toFixed(3)});`;
  }
  if (kx?.paperBg) {
    paperBgHtml = `<div id="kt-bg" style="position:absolute;left:0;top:0;width:1080px;height:1920px;opacity:0">${kx.paperBg.html}</div>`;
  }
  const paperBgJs = kx?.paperBg
    ? `${kx.paperBg.js}\n tl.fromTo("#kt-bg",{opacity:0},{opacity:1,duration:0.3,ease:"none",immediateRender:false},${kx.atSec});${kx.restore ? `\n tl.fromTo("#kt-bg",{opacity:1},{opacity:0,duration:0.3,ease:"none",immediateRender:false},${+(kx.endText + 0.15).toFixed(3)});` : ""}`
    : "";
  return `<!doctype html>
<html lang="vi" data-resolution="portrait"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>${kx ? `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">` : ""}
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden}
#root{position:relative;width:1080px;height:1920px;background:#E7E3D9;overflow:hidden}
${bg.css}${kx?.paperBg ? "\n" + kx.paperBg.css : ""}${kx ? "\n" + kx.text.css : ""}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${durationSec}" data-width="1080" data-height="1920">
 ${bg.html}${paperBgHtml ? "\n " + paperBgHtml : ""}
 ${items.map((x) => x.html).join("\n ")}${scrimHtml ? "\n " + scrimHtml : ""}${kx ? "\n " + kx.text.html : ""}
</div>
<script>
(() => {
 const tl = gsap.timeline({ paused: true });
 ${bg.js}${paperBgJs ? "\n " + paperBgJs : ""}
 ${items.map((x) => x.js).join("\n ")}${scrimJs ? "\n " + scrimJs : ""}${kx ? "\n " + kx.text.js : ""}
 window.__timelines = window.__timelines || {};
 window.__timelines["main"] = tl;
})();
</script></body></html>
`;
}

// === Video ngắn hơn shot → GIỮ KHUNG CUỐI bằng ẢNH TĨNH (không dựa vào engine) ===
// Đo 03/10 (su-kien-thien-an-mon): ở chế độ capture `drawElement` (tự bật khi cảnh không có drop-shadow/filter — đúng như cảnh ADN v2), <video> có
// data-duration dài hơn nguồn KHÔNG được giữ khung cuối → MÀN HÌNH TRỐNG tới hết shot (S04: 3s phẳng σ=0,3; log render: 37 cảnh báo "drawElement
// blank-frame suspect" trùng đúng các khung đó). Phép đo cũ "tự giữ khung cuối" (SSIM 0,985) làm khi style cũ còn ép chế độ screenshot.
// Cách vá tất định: trích khung cuối của video (ffmpeg) thành PNG; builder đặt ảnh này nối ngay khi video hết, TRONG CÙNG lớp camera/thu nhỏ.
export const HOLD_EPS_SEC = 0.1; // shot dài hơn phần video còn lại > ngưỡng này mới cần ảnh giữ khung
export const holdFrameName = (a) => `${path.basename(a.file, path.extname(a.file))}-last.png`;
/** Số giây video thật sự phát được cho shot (từ trimStart tới hết nguồn). */
export function videoAvailSec(a, shot) {
  const start = Number.isFinite(shot.trimStartSec) ? shot.trimStartSec : 0;
  return Math.max(0.5, (a.durationSec ?? 1e9) - start);
}
/** Trích khung cuối các video CẦN giữ khung vào các thư mục assets đích (idempotent). Trả danh sách file đã tạo. */
export function ensureHoldFrames(shots, mediaById, root, destDirs) {
  const made = [];
  for (const s of shots) {
    const a = mediaById[s.assetId];
    if (a?.type !== "video" || !a.durationSec) continue;
    if ((s.endMs - s.startMs) / 1000 - videoAvailSec(a, s) <= HOLD_EPS_SEC) continue;
    const name = holdFrameName(a);
    for (const d of destDirs) {
      const out = path.join(d, name);
      if (fs.existsSync(out)) continue;
      fs.mkdirSync(d, { recursive: true });
      execFileSync("ffmpeg", ["-v", "error", "-y", "-sseof", "-0.12", "-i", path.join(root, a.file), "-frames:v", "1", "-update", "1", out]);
      if (!fs.existsSync(out) || fs.statSync(out).size < 1000) throw new Error(`Không trích được khung cuối của ${a.file}`);
      made.push(out);
    }
  }
  return made;
}

/** Tên file asset cần copy vào assets/ cho các shot. */
export function assetFilesFor(shots, mediaById) {
  return [...new Set(shots.map((s) => mediaById[s.assetId]?.file).filter(Boolean))];
}
