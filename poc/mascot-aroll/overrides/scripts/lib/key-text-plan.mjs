// POC mascot-aroll (ADN v2, vòng 5): ĐIỂM NEO + KHẢ THI của chữ A-roll — tất định, không AI.
// Model (Stage 5) chỉ đề xuất {anchorPhrase, text, format, purpose, why}; script khớp `anchorPhrase` (cụm NGUYÊN VĂN trong lời thoại) với mốc TỪNG TỪ của
// captions.json để lấy lúc từ đầu cụm bắt đầu được nói = lúc chữ phải hiện (cùng lúc narration — không trước/sau), rồi kiểm: cửa sổ chữ đủ thời gian đọc và
// nằm trọn trong một shot. Không đủ chỗ (narration nói nhanh / sát hết shot) → BỎ chữ đó, trả lý do (người gọi in ra log, không im lặng).
import { holdFor, countWords, wordTimes, MAX_WORDS, MAX_TEXT_CHARS, MAX_HOLD_SEC, TEXT_FORMATS, TEXT_PURPOSES } from "./key-text.mjs";

export const normTok = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9]/g, "");
export const normText = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
export const LATE_GUARD_MS = 200; // chữ phải kết thúc ≥200ms trước hết shot
export const MIN_SCENE_GAP = 3; // hai cảnh có chữ cách nhau ≥3 cảnh

/** Khớp cụm neo (nguyên văn) với mốc từng từ trong khoảng cảnh. Trả {startMs,endMs,words:[{startMs,endMs}]} hoặc {error}. Phải khớp DUY NHẤT một chỗ. */
export function matchAnchor(captions, scene, phrase) {
  const toks = String(phrase ?? "").split(/\s+/).map(normTok).filter(Boolean);
  if (!toks.length) return { error: "anchorPhrase rỗng" };
  const ws = captions.filter((c) => c.startMs >= scene.startMs - 80 && c.startMs < scene.endMs).map((c) => ({ t: normTok(c.text), startMs: c.startMs, endMs: c.endMs }));
  const hits = [];
  for (let i = 0; i + toks.length <= ws.length; i++) if (toks.every((t, k) => ws[i + k].t === t)) hits.push(i);
  if (!hits.length) return { error: `anchorPhrase "${phrase}" KHÔNG khớp nguyên văn lời thoại của cảnh (phải là cụm liên tiếp đúng như narration nói)` };
  if (hits.length > 1) return { error: `anchorPhrase "${phrase}" khớp ${hits.length} chỗ trong cảnh — nối dài cụm cho duy nhất` };
  const seq = ws.slice(hits[0], hits[0] + toks.length);
  return { startMs: seq[0].startMs, endMs: seq[seq.length - 1].endMs, words: seq.map((w) => ({ startMs: w.startMs, endMs: w.endMs })) };
}

/** Nếu chữ khớp TỪNG TỪ với cụm neo → mốc từng từ (giây, tương đối lúc chữ bắt đầu) để từng từ hiện đúng lúc narration nói; không thì null. */
export function wordOffsetsFor(text, anchor) {
  const tw = String(text).split(/\s+/).map(normTok).filter(Boolean);
  if (tw.length !== anchor.words.length) return null;
  const aw = anchor.words;
  // so khớp theo từ narration (cần token narration — phía gọi truyền anchorTokens khi có); ở đây dựa vào số từ bằng nhau + thứ tự
  return aw.map((w) => Math.max(0, (w.startMs - anchor.startMs) / 1000));
}

/**
 * Tính cửa sổ chữ cho 1 cảnh. kt = {anchorPhrase,text,format}; shots = shot của cảnh (đã sắp theo thời gian; Stage 5 truyền 1 "shot" giả = cả cảnh).
 * Trả { ok:true, atMs, holdMs, shotId, anchorStartMs, anchorEndMs, wordOffsets } | { ok:false, error } (anchor sai: lỗi cứng) | { ok:false, drop:true, reason } (không khả thi: BỎ).
 */
export function planKeyText({ scene, shots, captions, kt }) {
  const a = matchAnchor(captions, scene, kt.anchorPhrase);
  if (a.error) return { ok: false, error: a.error };
  // chữ khớp từng từ với cụm neo (cùng token) → từng từ hiện đúng lúc narration; không thì đều đặn
  const same = String(kt.text).split(/\s+/).map(normTok).join(" ") === String(kt.anchorPhrase).split(/\s+/).map(normTok).join(" ");
  const wordOffsets = same ? wordOffsetsFor(kt.text, a) : null;
  const atMs = a.startMs;
  const minHoldMs = Math.round(holdFor(kt.text, kt.format, wordOffsets) * 1000);
  const holdMs = Math.min(Math.round(MAX_HOLD_SEC * 1000), Math.max(minHoldMs, a.endMs - a.startMs + 600)); // phủ cả cụm neo + 0,6s
  const shot = shots.find((s) => atMs >= s.startMs && atMs < s.endMs);
  if (!shot) return { ok: false, drop: true, reason: `mốc neo ${atMs}ms không nằm trong shot nào của cảnh` };
  const room = shot.endMs - LATE_GUARD_MS - atMs;
  if (holdMs > room) return { ok: false, drop: true, reason: `narration nói nhanh/sát hết ${shot.id}: từ neo "${String(kt.anchorPhrase).split(/\s+/)[0]}" ở ${(atMs / 1000).toFixed(2)}s chỉ còn ${(room / 1000).toFixed(2)}s tới hết shot, cần ${(holdMs / 1000).toFixed(2)}s để đọc kịp` };
  return { ok: true, atMs, holdMs, shotId: shot.id, anchorStartMs: a.startMs, anchorEndMs: a.endMs, wordOffsets };
}

const SENT_SPLIT = /(?<=[.!?…])\s+/;
/** Kiểm nội dung chữ (lỗi cứng; Stage 5). scriptAll = toàn bộ script (số/tên riêng phải có trong đó); scene.scriptText = lời thoại cảnh. */
export function keyTextProblems(kt, scene, scriptAll) {
  const sid = scene.id, p = [];
  const text = String(kt?.text ?? "").trim();
  if (!text) return [`${sid}: keyText.text rỗng.`];
  if (!String(kt.anchorPhrase ?? "").trim()) p.push(`${sid}: keyText thiếu anchorPhrase (cụm nguyên văn trong lời thoại làm điểm neo).`);
  if (!TEXT_FORMATS.includes(kt.format)) p.push(`${sid}: keyText.format "${kt.format}" không thuộc ${TEXT_FORMATS.join("|")}.`);
  if (!TEXT_PURPOSES.includes(kt.purpose)) p.push(`${sid}: keyText.purpose "${kt.purpose}" không thuộc ${TEXT_PURPOSES.join("|")}.`);
  if (!String(kt.why ?? "").trim()) p.push(`${sid}: keyText thiếu "why" (lý do biên tập: vì sao đây là câu hỏi/khẳng định mấu chốt).`);
  const n = countWords(text);
  if (n > MAX_WORDS) p.push(`${sid}: chữ dài ${n} từ (tối đa ${MAX_WORDS}): "${text}".`);
  if (text.length > MAX_TEXT_CHARS) p.push(`${sid}: chữ dài ${text.length} ký tự (tối đa ${MAX_TEXT_CHARS}): "${text}".`);
  if (/\p{Extended_Pictographic}/u.test(text)) p.push(`${sid}: chữ có emoji.`);
  const ns = normText(scriptAll), nt = normText(text);
  for (const d of text.match(/\d[\d.,]*/g) ?? []) if (!ns.includes(normText(d))) p.push(`${sid}: chữ có số "${d}" không có trong kịch bản (không được bịa).`);
  const toks = text.split(/\s+/).slice(1).map((t) => t.replace(/[^\p{L}\p{N}]/gu, "")).filter((t) => t.length >= 2 && /^\p{Lu}/u.test(t) && t !== t.toUpperCase());
  for (const t of toks) if (!ns.includes(normText(t))) p.push(`${sid}: chữ có tên riêng "${t}" không có trong kịch bản (không được bịa).`);
  // "ngắn gọn, không nhắc lại toàn bộ": nếu chữ là bản CHÉP của câu chứa neo thì phải ngắn hơn hẳn câu đó
  const sentences = String(scene.scriptText ?? "").split(SENT_SPLIT).filter(Boolean);
  const na = normText(kt.anchorPhrase);
  const sent = sentences.find((s) => normText(s).includes(na)) ?? scene.scriptText ?? "";
  const ntSent = normText(sent);
  if (nt === ntSent) p.push(`${sid}: chữ "${text}" nhắc lại TOÀN BỘ câu lời thoại — phải rút gọn.`);
  else if (ntSent.includes(nt) && nt.split(" ").length > 0.6 * ntSent.split(" ").length) p.push(`${sid}: chữ "${text}" chép gần hết câu lời thoại (${nt.split(" ").length}/${ntSent.split(" ").length} từ) — chỉ lấy cụm nhấn mạnh ngắn.`);
  return p;
}

/** Hạn mức/đa dạng cấp video (lỗi cứng; Stage 5): ≤1 chữ/cảnh (cấu trúc), chỉ cảnh asset, ≤ max(1,⌊n/8⌋) chữ/video, cách nhau ≥3 cảnh, format không lặp liền kề. */
export function keyTextQuotaProblems(scenes) {
  const p = [];
  const idx = scenes.map((s, i) => (s.keyText ? i : -1)).filter((i) => i >= 0);
  const cap = Math.max(1, Math.floor(scenes.length / 8));
  if (idx.length > cap) p.push(`Có ${idx.length} cảnh có chữ A-roll, tối đa ${cap} cho ${scenes.length} cảnh — chỉ giữ những câu hỏi/khẳng định MẤU CHỐT nhất.`);
  for (const i of idx) if (scenes[i].kind !== "asset") p.push(`${scenes[i].id}: chữ A-roll chỉ được ở cảnh asset.`);
  for (let a = 1; a < idx.length; a++) {
    if (idx[a] - idx[a - 1] < MIN_SCENE_GAP) p.push(`${scenes[idx[a - 1]].id} và ${scenes[idx[a]].id}: hai cảnh có chữ quá gần (cần cách ≥${MIN_SCENE_GAP} cảnh).`);
    if (scenes[idx[a]].keyText.format === scenes[idx[a - 1]].keyText.format) p.push(`${scenes[idx[a]].id}: hình thức chữ "${scenes[idx[a]].keyText.format}" trùng lần chữ liền trước.`);
  }
  return p;
}

/** Stage 5: BỎ (kèm lý do, không im lặng) các keyText đã khớp neo nhưng KHÔNG đủ chỗ đọc trong cảnh (narration nói nhanh/sát hết cảnh). Neo SAI không bị bỏ ở đây
 * (validatePlan báo lỗi cứng để gọi lại model). Sửa tại chỗ: sc.keyText = null, sc.keyTextDropped = lý do. Trả mảng thông báo. */
export function dropInfeasibleKeyTexts(scenes, captions) {
  const msgs = [];
  for (const sc of scenes) {
    if (!sc.keyText || sc.kind !== "asset") continue;
    const r = planKeyText({ scene: sc, shots: [{ id: sc.id, startMs: sc.startMs, endMs: sc.endMs }], captions, kt: sc.keyText });
    if (r.ok || r.error) continue;
    sc.keyTextDropped = r.reason;
    sc.keyText = null;
    msgs.push(`${sc.id}: BỎ chữ A-roll — ${r.reason}`);
  }
  return msgs;
}
