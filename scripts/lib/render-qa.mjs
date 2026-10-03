// QA TẤT ĐỊNH trên mp4 ĐÃ RENDER (không model, không vision): bắt lỗi "màn hình đen/trắng ngắn giữa 2 scene" và "video hết thì trống".
// Dùng chung bởi scripts/09-render.hf.mjs (ghi blackFramesOk/flatFramesOk vào completion-manifest) và scripts/qa/measure-flat-frames.mjs (CLI).
//  - Khung ĐEN: `ffmpeg blackdetect` (đo 03/10: mọi khoảng đen trùng đúng khe hở của scene-plan).
//  - Khung PHẲNG/TRỐNG: `blackdetect` bỏ lọt khung trống màu giấy SÁNG → quét độ lệch chuẩn pixel (σ<3 ở 10 khung/giây, vùng y<1390 bỏ dải phụ đề).
//    Đoạn phẳng ≤0,5s NGAY đầu cảnh đồ hoạ (nền giấy trước khi phần tử vào) chỉ ghi nhận (info), không tính lỗi — Stage 7 đã chặn bằng lib/blank-start.mjs.
import { spawnSync } from "node:child_process";

export const FLAT_SIGMA = 3;
export const FLAT_MIN_SEC = 0.2;
export const BLACK_MIN_SEC = 0.04;

/** Các khoảng đen ≥ minSec: [{start,end,dur}] (giây). */
export function findBlackIntervals(mp4, { minSec = BLACK_MIN_SEC } = {}) {
  const r = spawnSync("ffmpeg", ["-v", "info", "-i", mp4, "-vf", `scale=270:480,blackdetect=d=${minSec}:pix_th=0.12`, "-an", "-f", "null", "-"], { maxBuffer: 1 << 26, encoding: "utf8" });
  if (r.error) throw r.error;
  return [...(r.stderr ?? "").matchAll(/black_start:([\d.]+) black_end:([\d.]+) black_duration:([\d.]+)/g)].map((m) => ({ start: +m[1], end: +m[2], dur: +m[3] }));
}

/** Đoạn phẳng/trống ≥ minSec. plan = mảng scene (startMs/endMs/kind/id) để gán cảnh. Trả { hard:[…], info:[…], samples }. */
export function findFlatRuns(mp4, plan, { minSec = FLAT_MIN_SEC, sigma = FLAT_SIGMA } = {}) {
  const W = 108, H = 139, FR = W * H, FPS = 10;
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", mp4, "-vf", `fps=${FPS},crop=1080:1390:0:0,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 30 });
  if (r.error) throw r.error;
  const b = r.stdout, n = Math.floor(b.length / FR);
  if (!n) throw new Error(`không đọc được khung nào từ ${mp4}`);
  const sig = [];
  for (let i = 0; i < n; i++) { let m = 0; for (let k = 0; k < FR; k++) m += b[i * FR + k]; m /= FR; let s = 0; for (let k = 0; k < FR; k++) s += (b[i * FR + k] - m) ** 2; sig.push(Math.sqrt(s / FR)); }
  const sceneAt = (t) => plan.find((s) => t >= s.startMs / 1000 - 1e-6 && t < s.endMs / 1000 - 1e-6);
  const hard = [], info = [];
  for (let i = 0; i < n;) {
    if (sig[i] >= sigma) { i++; continue; }
    let j = i; while (j < n && sig[j] < sigma) j++;
    const a = i / FPS, c = j / FPS, dur = c - a;
    i = j;
    if (dur < minSec - 1e-9) continue;
    const s = sceneAt(a), rel = s ? a - s.startMs / 1000 : null;
    const row = { start: a, end: c, dur, scene: s?.id ?? null, kind: s?.kind ?? null, rel, sceneDur: s ? (s.endMs - s.startMs) / 1000 : null };
    (s && s.kind === "graphics" && rel <= 0.1 && dur <= 0.5 ? info : hard).push(row);
  }
  return { hard, info, samples: n };
}
