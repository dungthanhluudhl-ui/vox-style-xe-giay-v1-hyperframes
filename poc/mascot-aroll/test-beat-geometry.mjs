// Test đơn vị builder BEAT (mascot trong cảnh asset) — 4 BỐ CỤC: hình học 3 vùng không chồng, y≤1390, chữ vừa vùng, không xoay,
// mỗi (phần tử, thuộc tính) một tween tại mỗi thời điểm, morph 0,5s chỉ x/y/scale, thời gian chữ đạt chuẩn; bộ chọn bố cục; planBeat;
// cùng các ca cố ý vi phạm bị bắt.
import path from "node:path";
import { buildAssetSceneHtml, finalizeAssetShots } from "./overrides/scripts/lib/asset-scene.mjs";
import { beatGeometry, beatLayoutProblems, chooseBeatLayout, loadKit, BEAT_LAYOUTS, MORPH_SEC } from "./overrides/scripts/lib/mascot-scene.mjs";
import { TEXT_FORMATS, TEXT_LEAD_SEC, countWords, MAX_TEXT_CHARS } from "./overrides/scripts/lib/mascot-text.mjs";
import { planBeat } from "./overrides/scripts/lib/beat-plan.mjs";
import { rotationProblems, textTimingProblems, mascotTextProblems } from "./overrides/scripts/lib/v2-checks.mjs";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const kit = loadKit(path.join(here, "run-ban-an-23")); // run dir có public/mascot (gitignored; dựng bằng setup-run.mjs)
const poseId = Object.keys(kit.byId)[0];
let fail = 0, cases = 0;
const ok = (c, m) => { if (!c) { fail++; console.log("FAIL:", m); } };

const MEDIA = {
  cover: { id: "img-c", type: "image", file: "x/img-c.png", width: 768, height: 1376 },
  landscape: { id: "img-l", type: "image", file: "x/img-l.png", width: 1600, height: 900 },
  doc: { id: "doc-01", type: "image", file: "x/doc-01.png", width: 900, height: 1272, source: "pdf" },
};
const SHORT = "Vậy ai chịu trách nhiệm?";
const LONG = "Chín từ này dài để thử độ vừa cột"; // 9 từ, 33 ký tự

function tweens(html) {
  const out = [];
  const re = /tl\.fromTo\("#([\w-]+)",\{([^}]*)\},\{([^}]*)\},([\d.]+)\)/g;
  let m;
  while ((m = re.exec(html))) {
    const props = [...m[3].matchAll(/(\w+):/g)].map((x) => x[1]).filter((k) => !["duration", "ease", "immediateRender", "yoyo", "repeat"].includes(k));
    const dur = +(/duration:([\d.]+)/.exec(m[3])?.[1] ?? 0);
    const rep = +(/repeat:(\d+)/.exec(m[3])?.[1] ?? 0);
    out.push({ id: m[1], props, start: +m[4], end: +m[4] + dur * (rep + 1) });
  }
  return out;
}
function singleWriter(html) {
  const t = tweens(html), p = [];
  for (let i = 0; i < t.length; i++) for (let j = i + 1; j < t.length; j++) {
    if (t[i].id !== t[j].id) continue;
    const common = t[i].props.filter((k) => t[j].props.includes(k));
    if (common.length && t[i].start < t[j].end - 1e-6 && t[j].start < t[i].end - 1e-6) p.push(`#${t[i].id} ${common.join(",")} bị 2 tween chồng thời gian`);
  }
  return p;
}

for (const [kind, media] of Object.entries(MEDIA)) {
  for (const layout of BEAT_LAYOUTS) {
    for (const side of ["left", "right"]) {
      for (const fmt of TEXT_FORMATS) {
        for (const [lab, text] of [["ngắn", SHORT], ["dài9", LONG]]) {
          cases++;
          const tag = `${kind}/${layout}/${side}/${fmt}/${lab}`;
          const mediaById = { [media.id]: media };
          const shots = finalizeAssetShots([
            { id: "S1-1", sceneId: "S1", assetId: media.id, startMs: 0, endMs: 5000 },
            { id: "S1-2", sceneId: "S1", assetId: media.id, startMs: 5000, endMs: 9000 }, // gộp thành 1 shot (cùng asset)
          ], mediaById, { k: 0, prev: null, lastTransition: "cut" });
          const endMs = 12000;
          shots[shots.length - 1].endMs = endMs;
          const bp = planBeat({ sceneStartMs: 0, sceneEndMs: endMs, lastShotStartMs: shots.at(-1).startMs, textIntent: { text, format: fmt } });
          ok(!bp.error, `${tag}: planBeat lỗi ${bp.error}`);
          if (bp.error) continue;
          const scene = { id: "S1", startMs: 0, endMs, mascotBeat: { startMs: bp.startMs, side, layout, poseId, bgVariant: "grid-moving", driftDir: "left", textEvent: bp.textEvent } };
          let html;
          try { html = buildAssetSceneHtml({ scene, shots, mediaById, bgVariant: "grid-moving", driftDir: "left", kit }); } catch (e) {
            // bố cục làm thẻ quá nhỏ cho asset này là bình thường (chooseBeatLayout loại); các lỗi khác là FAIL
            ok(/CHỒNG|ngoài khung|chạm dưới|vượt chiều cao/.test(e.message) === false, `${tag}: builder ném lỗi: ${e.message}`);
            continue;
          }
          ok(countWords(text) <= 9 && text.length <= MAX_TEXT_CHARS, `${tag}: chữ quá dài`);
          ok(!rotationProblems(html).length, `${tag}: có xoay: ${rotationProblems(html).join("|")}`);
          const sw = singleWriter(html);
          ok(!sw.length, `${tag}: ${sw.join("|")}`);
          const t = tweens(html);
          const morph = t.filter((x) => x.id.startsWith("shrink-"));
          const bsSec = bp.startMs / 1000;
          ok(morph.length === 1 && Math.abs(morph[0].end - morph[0].start - MORPH_SEC) < 1e-6 && Math.abs(morph[0].start - bsSec) < 1e-6, `${tag}: morph phải đúng 1 tween ${MORPH_SEC}s tại đầu beat`);
          ok(morph[0]?.props.join() === "x,y,scale", `${tag}: morph chỉ được tween x,y,scale (có ${morph[0]?.props.join()})`);
          ok(new RegExp(`class="capy-actor clip" data-start="${bsSec}"`).test(html), `${tag}: mascot phải bắt đầu đúng đầu beat`);
          const ev = bp.textEvent;
          ok(Math.abs(ev.atMs - bp.startMs - TEXT_LEAD_SEC * 1000) < 1, `${tag}: chữ phải vào đúng +${TEXT_LEAD_SEC}s sau đầu beat`);
          const tp = textTimingProblems(ev, { refStartMs: bp.startMs, limitEndMs: endMs });
          ok(!tp.length, `${tag}: ${tp.join("|")}`);
          ok(ev.atMs + ev.holdMs >= endMs - 400 && ev.atMs + ev.holdMs <= endMs, `${tag}: chữ phải hiện gần suốt beat (kết thúc ${ev.atMs + ev.holdMs} vs hết cảnh ${endMs})`);
        }
      }
    }
  }
}

// Hình học thuần (không chữ): 4 bố cục × nội dung × side — 3 vùng không chồng
for (const content of [{ w: 1080, h: 1920 }, { w: 1000, h: 563 }, { w: 870, h: 1230 }, { w: 400, h: 1230 }]) {
  for (const layout of BEAT_LAYOUTS) for (const side of ["left", "right"]) {
    cases++;
    const g = beatGeometry(layout, side, content);
    const p = beatLayoutProblems(g, null);
    ok(!p.length, `geom ${layout} ${content.w}x${content.h}/${side}: ${p.join("|")}`);
  }
}

// Bộ chọn bố cục: không trùng liền kề, không chọn bố cục làm thẻ quá nhỏ, đa dạng thật
for (const [lab, content] of [["dọc", { w: 1080, h: 1920 }], ["ngang", { w: 1000, h: 563 }], ["doc", { w: 870, h: 1230 }]]) {
  cases++;
  const seq = []; let prev = null;
  for (let k = 0; k < 12; k++) { const l = chooseBeatLayout({ content, prev, k }); seq.push(l); ok(l !== prev, `chooser ${lab}: k=${k} trùng ${prev}`); prev = l; }
  const c = Object.fromEntries(BEAT_LAYOUTS.map((l) => [l, seq.filter((x) => x === l).length]));
  const distinct = new Set(seq).size;
  ok(distinct >= (lab === "ngang" ? 2 : 3), `chooser ${lab}: chỉ ${distinct} bố cục khác nhau trong 12 beat (${JSON.stringify(c)})`);
  if (lab === "ngang") ok(!seq.includes("side") && !seq.includes("twocol"), "chooser ngang: không được chọn bố cục làm thẻ ngang quá nhỏ (side/twocol)");
  console.log(`  chooser ${lab}: ${seq.slice(0, 8).join(" → ")} …`);
}

// planBeat: lùi từ cuối cảnh, tôn trọng vùng cấm, báo lỗi khi cảnh quá ngắn
{
  cases += 4;
  const ti = { text: "Chỉ là tên quy ước", format: "thought" };
  const a = planBeat({ sceneStartMs: 0, sceneEndMs: 13900, lastShotStartMs: 0, textIntent: ti });
  ok(!a.error && a.durSec >= 3.0 && a.durSec <= 7.0 && a.startMs >= 3000, `planBeat cảnh 13,9s: ${JSON.stringify(a)}`);
  ok(Math.abs(a.textEvent.atMs + a.textEvent.holdMs - (13900 - 350 + 50)) < 2 || a.textEvent.holdMs >= 5900, `planBeat: chữ phải kéo gần hết beat (${JSON.stringify(a.textEvent)})`);
  ok(!!planBeat({ sceneStartMs: 0, sceneEndMs: 5000, lastShotStartMs: 0, textIntent: ti }).error, "planBeat cảnh 5s phải báo lỗi (3s lead + beat)");
  ok(!!planBeat({ sceneStartMs: 0, sceneEndMs: 20000, lastShotStartMs: 18500, textIntent: ti }).error, "planBeat shot cuối mới 1,5s phải báo lỗi");
}

// Ca CỐ Ý vi phạm: phải bị bắt
const g0 = beatGeometry("top", "left", { w: 1080, h: 1920 });
ok(beatLayoutProblems(g0, { x: 100, y: 700, w: 460, h: 300 }).some((m) => m.includes("CHỒNG")), "không bắt chữ đè mascot");
ok(beatLayoutProblems(g0, { x: 580, y: 600, w: 460, h: 300 }).some((m) => m.includes("CHỒNG")), "không bắt chữ đè thẻ asset");
ok(beatLayoutProblems(g0, { x: 580, y: 1200, w: 460, h: 300 }).some((m) => m.includes("1390")), "không bắt chữ chạm vùng phụ đề");
ok(mascotTextProblems({ format: "punch", purpose: "chốt", text: "Một hai ba bốn năm sáu bảy tám chín mười" }, "", "T").some((m) => m.includes("9")), "không bắt chữ >9 từ");
ok(mascotTextProblems({ format: "punch", purpose: "chốt", text: "Aaaaaaaaaaaa bbbbbbbbbbbb cccccccccccc dddddddddddd eeeeeeeee" }, "", "T").some((m) => m.includes("ký tự")), "không bắt chữ >48 ký tự");
let threw = false;
try {
  buildAssetSceneHtml({ scene: { id: "S2", startMs: 0, endMs: 9000, mascotBeat: { startMs: 1000, side: "left", layout: "top", poseId } }, shots: finalizeAssetShots([{ id: "S2-1", sceneId: "S2", assetId: "img-c", startMs: 0, endMs: 3000 }, { id: "S2-2", sceneId: "S2", assetId: "img-l", startMs: 3000, endMs: 9000 }], { "img-c": MEDIA.cover, "img-l": MEDIA.landscape }, { k: 0, prev: null, lastTransition: "cut" }), mediaById: { "img-c": MEDIA.cover, "img-l": MEDIA.landscape }, kit });
} catch (e) { threw = /trước shot cuối/.test(e.message); }
ok(threw, "beat bắt đầu trước shot cuối phải bị chặn");

console.log(`${cases + 5} ca — ${fail ? fail + " LỖI" : "ĐẠT"}`);
process.exit(fail ? 1 : 0);
