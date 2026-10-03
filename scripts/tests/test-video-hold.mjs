// Test giữ KHUNG CUỐI video ngắn hơn shot (lỗi "màn hình trống sau khi video hết", chế độ capture drawElement).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { buildAssetSceneHtml, finalizeAssetShots, ensureHoldFrames, videoAvailSec, holdFrameName } from "../lib/asset-scene.mjs";

const run = path.resolve(import.meta.dirname, "..", ".."); // gốc repo (video thật ở public/videos/<slug>/media)
let fail = 0;
const ok = (c, m) => { if (!c) { fail++; console.log("FAIL:", m); } };

const vid = { id: "vid-03", type: "video", file: "x/vid-03-tense.mp4", width: 720, height: 1280, durationSec: 8 };
const mediaById = { "vid-03": vid };
const mk = (endMs, trimStartSec) => finalizeAssetShots([{ id: "S1-1", sceneId: "S1", assetId: "vid-03", startMs: 0, endMs, trimStartSec }], mediaById, { k: 0, prev: null, lastTransition: "cut" });
const html = (shots, extra = {}) => buildAssetSceneHtml({ scene: { id: "S1", startMs: 0, endMs: shots.at(-1).endMs, ...extra }, shots, mediaById });

// 1) shot 11s, nguồn 8s → video 8s + ảnh giữ khung 3s, nằm TRONG #cam-1
{
  const h = html(mk(11000));
  ok(/<video id="m-1"[^>]*data-duration="8"/.test(h), "video phải data-duration=8 (đúng độ dài nguồn)");
  const m = /<img id="m-1-hold"[^>]*data-start="8"[^>]*data-duration="3"[^>]*src="assets\/vid-03-tense-last\.png"/.exec(h);
  ok(!!m, "thiếu ảnh giữ khung cuối từ 8s dài 3s");
  const cam = /<div id="cam-1"[\s\S]*?<\/video>([\s\S]*?)<\/div>/.exec(h);
  ok(cam && cam[1].includes("m-1-hold"), "ảnh giữ khung phải nằm trong cùng lớp camera #cam-1");
  ok(holdFrameName(vid) === "vid-03-tense-last.png", "tên file giữ khung");
}
// 2) shot ≤ nguồn → KHÔNG ảnh giữ khung
{
  const h = html(mk(7500));
  ok(!h.includes("m-1-hold") && /<video id="m-1"[^>]*data-duration="7.5"/.test(h), "shot 7,5s ≤ nguồn 8s không được có ảnh giữ khung");
}
// 3) trimStart 5s: còn 3s video, shot 5s → hold 2s bắt đầu 3s
{
  const sh = mk(5000, 5);
  ok(Math.abs(videoAvailSec(vid, sh[0]) - 3) < 1e-9, "videoAvailSec trimStart=5");
  const h = html(sh);
  ok(/<video id="m-1"[^>]*data-duration="3"[^>]*data-media-start="5"/.test(h) && /id="m-1-hold"[^>]*data-start="3"[^>]*data-duration="2"/.test(h), "trim 5s: video 3s + hold 2s từ 3s");
}
// 4) có chữ A-roll kiểu shrink-top: ảnh giữ khung phải nằm TRONG #shrink-1 (thu nhỏ cùng asset)
{
  const shots = mk(11000);
  shots[0].keyText = { text: "Vì sao?", format: "stamp", treatment: "shrink-top", atMs: 2000, holdMs: 3500, bgVariant: "grid-moving", driftDir: "left" };
  const h = html(shots);
  const sh = /<div id="shrink-1"[\s\S]*?<\/div>\s*<div id="kt-1"|<div id="shrink-1"[\s\S]*?<\/div>\s*<div id="kt-scrim"/.exec(h);
  ok(sh && sh[0].includes("m-1-hold") && sh[0].includes("<video id=\"m-1\""), "với chữ shrink-top: video và ảnh giữ khung phải nằm trong #shrink-1");
}
// 5) Trích khung THẬT từ file video thật
{
  const src = path.join(run, "public", "videos", "su-kien-thien-an-mon", "media", "videos");
  const f = fs.existsSync(src) ? fs.readdirSync(src).find((x) => x.endsWith(".mp4")) : null;
  if (!f) { console.log("  (bỏ qua ca 5: không có video thật trong public/videos/su-kien-thien-an-mon)"); }
  else {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hold-"));
    const real = { id: "vid-x", type: "video", file: path.join("public", "videos", "su-kien-thien-an-mon", "media", "videos", f), durationSec: 8 };
    const shots = [{ id: "S1-1", sceneId: "S1", assetId: "vid-x", startMs: 0, endMs: 11000 }];
    const made = ensureHoldFrames(shots, { "vid-x": real }, run, [tmp]);
    ok(made.length === 1 && fs.statSync(made[0]).size > 20000, `khung cuối phải trích được (size ${made[0] ? fs.statSync(made[0]).size : 0})`);
    const dim = execFileSync("ffprobe", ["-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", made[0]], { encoding: "utf8" }).trim();
    ok(dim === "720,1280", `kích thước khung cuối ${dim} ≠ 720,1280`);
    ok(ensureHoldFrames(shots, { "vid-x": real }, run, [tmp]).length === 0, "chạy lần 2 phải idempotent");
    ok(ensureHoldFrames([{ ...shots[0], endMs: 7000 }], { "vid-x": real }, run, [fs.mkdtempSync(path.join(os.tmpdir(), "hold-"))]).length === 0, "shot ngắn hơn nguồn không được trích");
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
console.log(`test giữ khung cuối video — ${fail ? fail + " LỖI" : "ĐẠT"}`);
process.exit(fail ? 1 : 0);
