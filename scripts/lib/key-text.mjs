// ADN v2 (, vòng 5): CHỮ A-ROLL nhấn mạnh narration trong cảnh asset — thay mascot + chữ trong thẻ (người dùng bỏ 03/10).
// Chữ KHÔNG nằm trong thẻ/khung: chỉ là CHỮ (5 hình thức vào khác nhau) trên asset đã mờ đi (dim) hoặc trên dải giấy do asset thu nhỏ/có sẵn chừa ra.
// Mọi thứ TẤT ĐỊNH (không xoay, không ngẫu nhiên, không repeat:-1): thời điểm do lib/key-text-plan.mjs tính từ mốc TỪNG TỪ của narration.
export const TEXT_FORMATS = ["typewriter", "stamp", "wordpop", "maskrise", "sweep"];
// Ma trận A1 (03/10, 60 tổ hợp vision): `dim-center` BỎ — chữ giữa khung che chủ thể quan trọng 13/20 ảnh, che mặt 5/20 (dim-lower 5/20, shrink-top/band-free 0).
export const TREATMENTS = ["dim-lower", "shrink-top", "band-free"];
export const TEXT_PURPOSES = ["câu hỏi mấu chốt", "khẳng định quyết định"];
export const MAX_WORDS = 8;
export const MAX_TEXT_CHARS = 44;
export const EXIT_SEC = 0.25; // fade-out cuối khối chữ
export const READ_MARGIN_SEC = 0.3;
export const MAX_HOLD_SEC = 6;
export const MORPH_SEC = 0.45; // asset thu nhỏ / trở lại
export const SCRIM_SEC = 0.35;
const INK = "#141414", CREAM = "#F7F4EC", ORANGE = "#FF6A1A";

export const countWords = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const r3 = (v) => Math.round(v * 1000) / 1000;

// === Thời gian đọc (một nguồn duy nhất; chuẩn đã nới 03/10 sau khi người dùng thấy chữ vào/ra nhanh) ===
/** Thời gian chữ phải hiện ĐẦY ĐỦ để đọc kịp: max(2,0s; 0,7s + 80ms × ký tự). */
export const minReadSec = (text) => r3(Math.max(2.0, 0.7 + 0.08 * String(text ?? "").length));

/** Thời điểm (giây, tương đối lúc chữ bắt đầu) từng từ hiện ra. wordOffsets = mốc từng từ của narration (nếu chữ khớp từng từ với cụm neo). */
export function wordTimes(text, wordOffsets = null) {
  const n = countWords(text);
  if (wordOffsets && wordOffsets.length === n && wordOffsets.every((o) => o >= 0 && o <= 2.5)) return wordOffsets.map(r3);
  const step = n > 1 ? Math.min(0.12, 0.9 / (n - 1)) : 0;
  return Array.from({ length: n }, (_, i) => r3(i * step));
}
const typeStep = (text) => Math.min(0.045, 1.2 / Math.max(String(text).length, 1));

/** Thời gian từ lúc bắt đầu tới khi MỌI phần của chữ hiện đủ. */
export function enterSec(format, text, wordOffsets = null) {
  if (format === "typewriter") return r3(String(text).length * typeStep(text) + 0.1);
  if (format === "stamp") return 0.45;
  if (format === "wordpop") return r3(Math.max(...wordTimes(text, wordOffsets)) + 0.26);
  if (format === "maskrise") return r3(0.45 + (Math.max(countWords(text), 1) - 1) * 0.07);
  return 0.75; // sweep
}
/** Tổng thời gian giữ khối (từ lúc bắt đầu hiện tới hết fade-out): ≥ chuẩn đọc + vào + ra + dư. */
export function holdFor(text, format, wordOffsets = null) {
  return r3(Math.min(MAX_HOLD_SEC, Math.max(2.4, minReadSec(text) + enterSec(format, text, wordOffsets) + EXIT_SEC + READ_MARGIN_SEC)));
}
export const fullyVisibleSec = (text, format, holdSec, wordOffsets = null) => r3(holdSec - enterSec(format, text, wordOffsets) - EXIT_SEC);

// === Cỡ chữ vừa vùng ===
const SIZES = [112, 100, 92, 84, 76, 68, 60, 54];
export function fitText(text, widthPx, maxH, lineHeight = 1.14, upper = false) {
  for (const fs of SIZES) {
    const cpl = Math.max(4, Math.floor(widthPx / (fs * (upper ? 0.74 : 0.62))));
    let lines = 1, cur = 0;
    for (const w of String(text).split(/\s+/)) { const L = w.length + (cur ? 1 : 0); if (cur + L > cpl) { lines++; cur = w.length; } else cur += L; }
    const h = Math.ceil(lines * fs * lineHeight);
    if (h <= maxH) return { fontSize: fs, lines, height: h };
  }
  const fs = SIZES[SIZES.length - 1];
  return { fontSize: fs, lines: Math.ceil(String(text).length / 14), height: maxH, overflow: true };
}

// === Treatment: asset phản ứng thế nào khi chữ xuất hiện ===
/** content = hộp media của shot {x,y,w,h} (cover: 0,0,1080,1920; contain: containBox); fit = "cover"|"contain".
 * Trả { treatment, valid, why?, shrink:{x,y,scale}|null, scrim:null|{type,alpha}, needBg, zone, ink, assetRect }. zone = vùng chữ. */
export function treatmentLayout(treatment, content, fit) {
  const full = { x: content.x, y: content.y, w: content.w, h: content.h };
  if (treatment === "dim-lower") {
    return { treatment, valid: true, shrink: null, scrim: { type: "lower", alpha: 0.84 }, needBg: false, zone: { x: 70, w: 940, bottom: 1350, maxH: 420 }, ink: "cream", assetRect: full };
  }
  if (treatment === "shrink-top") {
    if (fit !== "cover") return { treatment, valid: false, why: "shrink-top chỉ cho asset cover toàn khung" };
    const s = 0.72, w = Math.round(1080 * s), h = Math.round(1920 * s);
    const x = Math.round((1080 - w) / 2), y = 1920 - h; // dồn xuống đáy, nhường dải trên (y≈176..y-16)
    const top = 176, bot = y - 16;
    return { treatment, valid: true, shrink: { x, y, scale: s }, scrim: null, needBg: true, zone: { x: 70, w: 940, cy: Math.round((top + bot) / 2), maxH: bot - top }, ink: "ink", assetRect: { x, y, w, h } };
  }
  if (treatment === "band-free") {
    if (fit !== "contain") return { treatment, valid: false, why: "band-free chỉ cho asset contain (còn dải trống quanh hộp)" };
    const above = { top: 176, bot: content.y - 24 }, below = { top: content.y + content.h + 24, bot: 1366 };
    const hA = above.bot - above.top, hB = below.bot - below.top;
    const band = hA >= hB ? above : below, hh = Math.max(hA, hB);
    if (hh < 190) return { treatment, valid: false, why: `dải trống chỉ ${hh}px (<190)` };
    return { treatment, valid: true, shrink: null, scrim: null, needBg: false, zone: { x: 70, w: 940, cy: Math.round((band.top + band.bot) / 2), maxH: Math.min(hh - 10, 400) }, ink: "ink", assetRect: full };
  }
  return { treatment, valid: false, why: `treatment "${treatment}" không hợp lệ` };
}

/** Chọn treatment TẤT ĐỊNH theo hình học + loại asset, KHÔNG trùng treatment lần chữ liền trước (nếu còn lựa chọn khác), xoay vòng theo k.
 * Ưu tiên theo đo ma trận A1: cover → shrink-top (đọc 4,0/đẹp 4,0, không che gì) rồi dim-lower; contain → band-free rồi dim-lower;
 * `isDoc` (doc-NN = BẰNG CHỨNG, DNA cấm làm mờ/lớp tối + chữ trắng trên trang sáng khó đọc 3/5) → CHỈ band-free (dải trống quanh thẻ).
 * Trả null khi không treatment nào hợp lệ (người gọi BỎ chữ, ghi lý do). */
export function chooseTreatment({ content, fit, prev = null, k = 0, isDoc = false }) {
  const pref = isDoc ? ["band-free"] : fit === "contain" ? ["band-free", "dim-lower"] : ["shrink-top", "dim-lower"];
  const ok = pref.filter((t) => treatmentLayout(t, content, fit).valid);
  if (!ok.length) return null;
  for (let j = 0; j < ok.length; j++) {
    const t = ok[(k + j) % ok.length];
    if (t !== prev) return t;
  }
  return ok[k % ok.length]; // chỉ còn đúng 1 lựa chọn hợp lệ (vd doc-NN): chấp nhận lặp
}

const rectOf = (r) => ({ l: r.x, t: r.y, r: r.x + r.w, b: r.y + r.h });
const overlap = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
/** Kiểm hình học chữ (lỗi cứng): trong khung, y ≤1390 (không vào vùng phụ đề), và với treatment shrink/band chữ KHÔNG chồng asset. */
export function keyTextLayoutProblems(layout, box) {
  const p = [];
  if (!layout.valid) return [layout.why ?? "treatment không hợp lệ"];
  const r = rectOf(box);
  if (r.l < 20 || r.r > 1060 || r.t < 100) p.push(`chữ ra ngoài khung an toàn (${r.l},${r.t})–(${r.r},${r.b}).`);
  if (r.b > 1390) p.push(`chữ chạm dưới y=1390 (${r.b}) — vào vùng phụ đề.`);
  if (layout.treatment === "shrink-top" || layout.treatment === "band-free") {
    if (overlap(r, rectOf(layout.assetRect))) p.push(`chữ CHỒNG asset (treatment ${layout.treatment}).`);
  }
  return p;
}

/**
 * Dựng khối chữ. kt = { text, format, atSec, holdSec, wordOffsets? } (thời gian TƯƠNG ĐỐI đầu cảnh). Trả { html, css, js, box, overflow }.
 * Hình thức: typewriter (gõ từng ký tự + con trỏ), stamp (đóng dấu: phóng to→chạm→rung dịch chuyển, KHÔNG xoay), wordpop (từng từ bật
 * theo mốc narration), maskrise (từng từ trượt lên trong mặt nạ), sweep (chữ hiện + vạch gạch chân quét). Không thẻ, không viền, không nền.
 */
export function renderKeyText({ kt, layout, trackIndex = 40 }) {
  const { text, format } = kt;
  const T = kt.atSec, H = kt.holdSec, z = layout.zone;
  const color = layout.ink === "cream" ? CREAM : INK;
  const upper = format === "stamp";
  const shown = upper ? String(text).toUpperCase() : String(text);
  const barH = format === "sweep" ? 22 : 0;
  const f = fitText(shown, z.w, z.maxH - barH, 1.14, upper);
  const h = f.height + barH;
  const top = z.bottom != null ? Math.round(z.bottom - h) : Math.round(z.cy - h / 2);
  const words = shown.split(/\s+/).filter(Boolean);
  const exit = `tl.fromTo("#kt-1",{opacity:1},{opacity:0,duration:${EXIT_SEC},ease:"power1.in",immediateRender:false},${r3(T + H - EXIT_SEC)});`;
  const shadow = layout.ink === "cream" ? "text-shadow:0 4px 0 rgba(20,20,20,0.55);" : "";
  const wordSpan = (w, i, cls = "w") => `<span class="${cls}" id="kt-w${i}">${esc(w)}</span>`;
  let inner = "", js = "", extraCss = "";
  const times = wordTimes(text, kt.wordOffsets);
  if (format === "typewriter") {
    const step = typeStep(text), typeDur = r3(String(text).length * step);
    inner = words.map((w) => `<span class="w">${[...w].map((c) => `<span class="c">${esc(c)}</span>`).join("")}</span>`).join(" ") + `<span id="kt-caret" class="caret"></span>`;
    extraCss = `#kt-1 .w{display:inline-block;white-space:nowrap}#kt-1 .c{opacity:0}#kt-1 .caret{display:inline-block;width:0.07em;height:0.86em;margin-left:0.06em;background:${color};vertical-align:-0.06em;opacity:0}`;
    const blinks = Math.max(0, Math.floor((H - typeDur - EXIT_SEC) / 0.3) - 1);
    js = `tl.fromTo("#kt-1 .c",{opacity:0},{opacity:1,duration:0.01,ease:"none",stagger:${r3(step)},immediateRender:false},${T});
 tl.set("#kt-caret",{opacity:1},${T});
 tl.fromTo("#kt-caret",{opacity:1},{opacity:0,duration:0.3,ease:"steps(1)",yoyo:true,repeat:${blinks},immediateRender:false},${r3(T + typeDur + 0.05)});
 ${exit}`;
  } else if (format === "stamp") {
    inner = esc(shown);
    extraCss = `#kt-1{letter-spacing:2px;transform-origin:50% 50%}`;
    js = `tl.fromTo("#kt-1",{opacity:0,scale:1.6},{opacity:1,scale:1,duration:0.22,ease:"power4.out",immediateRender:false},${T});
 tl.fromTo("#kt-1",{x:0,y:0},{x:7,y:-5,duration:0.05,ease:"none",yoyo:true,repeat:3,immediateRender:false},${r3(T + 0.22)});
 ${exit}`;
  } else if (format === "wordpop") {
    inner = words.map((w, i) => wordSpan(w, i)).join(" ");
    extraCss = `#kt-1 .w{display:inline-block;opacity:0}`;
    js = words.map((_, i) => `tl.fromTo("#kt-w${i}",{opacity:0,y:28,scale:0.82},{opacity:1,y:0,scale:1,duration:0.24,ease:"back.out(1.6)",immediateRender:false},${r3(T + times[i])});`).join("\n ") + `\n ${exit}`;
  } else if (format === "maskrise") {
    // Lộ từng từ bằng clip-path (mép lộ trượt từ dưới lên) + dịch chuyển nhỏ 28px — KHÔNG đẩy từ xuống 115% dòng như bản đầu: phần tử đang dịch nằm
    // dưới vùng chữ làm `hyperframes check` báo caption_zone_collision ở treatment dim-lower (ma trận A1: 3/60 tổ hợp lỗi) dù bị mặt nạ che.
    inner = words.map((w, i) => `<span class="m"><span class="mi" id="kt-w${i}">${esc(w)}</span></span>`).join(" ");
    extraCss = `#kt-1 .m{display:inline-block;vertical-align:top}#kt-1 .mi{display:inline-block;clip-path:inset(120% -10% -20% -10%)}`;
    js = `tl.fromTo("#kt-1 .mi",{clipPath:"inset(120% -10% -20% -10%)",y:28},{clipPath:"inset(-20% -10% -20% -10%)",y:0,duration:0.45,ease:"power3.out",stagger:0.07,immediateRender:false},${T});
 ${exit}`;
  } else { // sweep
    inner = `<div id="kt-t">${esc(shown)}</div><div id="kt-bar"></div>`;
    extraCss = `#kt-1 #kt-bar{position:absolute;left:0;bottom:0;width:100%;height:10px;background:${ORANGE};transform-origin:0 50%}`;
    js = `tl.fromTo("#kt-t",{opacity:0,y:16},{opacity:1,y:0,duration:0.3,ease:"power2.out",immediateRender:false},${T});
 tl.fromTo("#kt-bar",{scaleX:0},{scaleX:1,duration:0.5,ease:"power3.out",immediateRender:false},${r3(T + 0.25)});
 ${exit}`;
  }
  const html = `<div id="kt-1" class="clip" data-start="${T}" data-duration="${H}" data-track-index="${trackIndex}" style="left:${z.x}px;top:${top}px;width:${z.w}px;height:${h}px">${inner}</div>`;
  const css = `#kt-1{position:absolute;font-family:"Be Vietnam Pro",sans-serif;font-weight:900;color:${color};text-align:center;font-size:${f.fontSize}px;line-height:1.14;${shadow}}${format === "sweep" ? `#kt-1 #kt-t{padding-bottom:${barH}px}` : ""}\n${extraCss}`;
  return { html, css, js, box: { x: z.x, y: top, w: z.w, h }, overflow: !!f.overflow, fontSize: f.fontSize };
}
