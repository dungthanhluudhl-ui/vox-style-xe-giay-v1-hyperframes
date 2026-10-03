// Test builder CHỮ A-ROLL (key-text): treatment × hình thức × loại asset × chữ ngắn/dài — builder không ném lỗi, không xoay, chỉ đúng 1 khối chữ,
// một writer/thuộc tính, morph/restore đúng, chữ không chồng asset (shrink/band) và y≤1390; bộ chọn treatment; ca cố ý vi phạm bị bắt.
import { buildAssetSceneHtml, finalizeAssetShots } from "./overrides/scripts/lib/asset-scene.mjs";
import { TEXT_FORMATS, TREATMENTS, treatmentLayout, chooseTreatment, holdFor, renderKeyText, keyTextLayoutProblems, MORPH_SEC, countWords, MAX_TEXT_CHARS, MAX_WORDS } from "./overrides/scripts/lib/key-text.mjs";
import { rotationProblems, checkAssetScene, keyTextTimingProblems, validatePlanAndShots } from "./overrides/scripts/lib/v2-checks.mjs";

let fail = 0, cases = 0, skipped = 0;
const ok = (c, m) => { if (!c) { fail++; console.log("FAIL:", m); } };

const MEDIA = {
  cover: { id: "img-c", type: "image", file: "x/img-c.png", width: 768, height: 1376 },
  landscape: { id: "img-l", type: "image", file: "x/img-l.png", width: 1600, height: 900 },
  doc: { id: "doc-01", type: "image", file: "x/doc-01.png", width: 900, height: 1272, source: "pdf" },
};
const SHORT = "Vì sao?";
const LONG = "Ai thật sự phải chịu trách nhiệm đây?"; // 8 từ, 37 ký tự

function tweens(html) {
  const out = [];
  const re = /tl\.(?:fromTo|to|set)\("#([\w-]+)",\{([^}]*)\}(?:,\{([^}]*)\})?,([\d.]+)\)/g;
  let m;
  while ((m = re.exec(html))) {
    const body = m[3] ?? m[2];
    const props = [...body.matchAll(/(\w+):/g)].map((x) => x[1]).filter((k) => !["duration", "ease", "immediateRender", "yoyo", "repeat", "stagger"].includes(k));
    const dur = +(/duration:([\d.]+)/.exec(body)?.[1] ?? 0), rep = +(/repeat:(\d+)/.exec(body)?.[1] ?? 0);
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
  for (const treatment of TREATMENTS) {
    for (const format of TEXT_FORMATS) {
      for (const [lab, text] of [["ngắn", SHORT], ["dài", LONG]]) {
        const tag = `${kind}/${treatment}/${format}/${lab}`;
        const mediaById = { [media.id]: media };
        const shots = finalizeAssetShots([{ id: "S1-1", sceneId: "S1", assetId: media.id, startMs: 0, endMs: 14000 }], mediaById, { k: 0, prev: null, lastTransition: "cut" });
        const sh = shots[0];
        const box = sh.mediaFit === "contain" ? sh.containBox : { x: 0, y: 0, w: 1080, h: 1920 };
        if (!treatmentLayout(treatment, box, sh.mediaFit).valid) { skipped++; continue; }
        cases++;
        const holdMs = Math.round(holdFor(text, format) * 1000), atMs = 2000;
        sh.keyText = { text, format, treatment, atMs, holdMs, anchorStartMs: atMs, bgVariant: "grid-moving", driftDir: "left" };
        let html;
        try { html = buildAssetSceneHtml({ scene: { id: "S1", startMs: 0, endMs: 14000 }, shots, mediaById, bgVariant: "grid-moving", driftDir: "left" }); } catch (e) { ok(false, `${tag}: builder ném lỗi: ${e.message}`); continue; }
        ok(countWords(text) <= MAX_WORDS && text.length <= MAX_TEXT_CHARS, `${tag}: chữ quá dài`);
        ok(!rotationProblems(html).length, `${tag}: có xoay: ${rotationProblems(html).join("|")}`);
        const cp = checkAssetScene(html, { keyText: true });
        ok(!cp.length, `${tag}: checkAssetScene(keyText): ${cp.join("|")}`);
        ok(checkAssetScene(html).length > 0, `${tag}: không có cờ keyText thì phải bị báo (có chữ trên cảnh asset)`);
        const sw = singleWriter(html);
        ok(!sw.length, `${tag}: ${sw.join("|")}`);
        ok((html.match(/id="kt-1"/g) ?? []).length === 1, `${tag}: phải đúng 1 khối #kt-1`);
        ok(!/class="[^"]*(card|frame|box)[^"]*"|border:/.test(html.split('<div id="kt-1"')[1]?.split("</div>")[0] ?? ""), `${tag}: chữ không được có thẻ/viền/khung`);
        ok(!keyTextTimingProblems({ ...sh.keyText }, { shotEndMs: 14000 }).length, `${tag}: thời gian chữ: ${keyTextTimingProblems({ ...sh.keyText }, { shotEndMs: 14000 }).join("|")}`);
        const t = tweens(html);
        if (treatment === "shrink-top") {
          const morph = t.filter((x) => x.id === "shrink-1");
          ok(morph.length === 2 && morph.every((x) => x.props.join() === "x,y,scale"), `${tag}: shrink phải có 2 tween x,y,scale (vào + trở lại), có ${morph.length}`);
          ok(Math.abs(morph[0].start - atMs / 1000) < 1e-6 && Math.abs(morph[0].end - morph[0].start - MORPH_SEC) < 1e-6, `${tag}: morph phải bắt đầu đúng lúc chữ`);
          ok(Math.abs(morph[1].start - (atMs + holdMs) / 1000) < 1e-3, `${tag}: asset phải trở lại ngay sau chữ`);
        } else {
          ok(!html.includes('id="shrink-1"'), `${tag}: ${treatment} không được thu nhỏ asset`);
        }
        if (treatment.startsWith("dim")) ok(html.includes('id="kt-scrim"'), `${tag}: thiếu lớp tối`);
        else ok(!html.includes('id="kt-scrim"'), `${tag}: ${treatment} không dùng lớp tối`);
        ok(html.includes(`data-start="${atMs / 1000}"`), `${tag}: chữ phải bắt đầu đúng ${atMs / 1000}s`);
      }
    }
  }
}

// Bộ chọn treatment: không trùng liền kề khi còn lựa chọn; cover không band-free, contain không shrink-top; doc-NN CHỈ band-free (không bao giờ dim-*)
for (const [lab, fit, content, isDoc] of [["cover", "cover", { x: 0, y: 0, w: 1080, h: 1920 }, false], ["contain ngang", "contain", { x: 40, y: 640, w: 1000, h: 563 }, false], ["doc ngang (dải chữ)", "contain", { x: 40, y: 588, w: 1000, h: 374 }, true]]) {
  cases++;
  const seq = []; let prev = null;
  for (let k = 0; k < 12; k++) {
    const t = chooseTreatment({ content, fit, prev, k, isDoc });
    seq.push(t);
    ok(t && treatmentLayout(t, content, fit).valid, `chooser ${lab}: chọn treatment không hợp lệ ${t}`);
    if (!isDoc) ok(t !== prev, `chooser ${lab}: k=${k} trùng ${prev}`);
    prev = t;
  }
  if (fit === "cover") { ok(!seq.includes("band-free") && !seq.includes("dim-center"), "cover không được band-free/dim-center"); ok(new Set(seq).size === 2, `cover phải xoay 2 treatment, có ${new Set(seq).size}`); }
  if (fit === "contain" && !isDoc) { ok(!seq.includes("shrink-top"), "contain không được shrink-top"); ok(new Set(seq).size === 2, "contain phải xoay band-free/dim-lower"); }
  if (isDoc) ok(seq.every((t) => t === "band-free"), `doc-NN chỉ được band-free, có ${[...new Set(seq)]}`);
  console.log(`  chooser ${lab}: ${seq.slice(0, 5).join(" → ")} …`);
}
ok(chooseTreatment({ content: { x: 105, y: 160, w: 870, h: 1230 }, fit: "contain", isDoc: true }) === null, "doc-NN không còn dải trống phải trả null (BỎ chữ), không được rơi về dim-*");
ok(!TREATMENTS.includes("dim-center"), "dim-center phải đã bị bỏ");

// Ca CỐ Ý vi phạm: phải bị bắt
const cover = treatmentLayout("shrink-top", { x: 0, y: 0, w: 1080, h: 1920 }, "cover");
const rBox = renderKeyText({ kt: { text: LONG, format: "stamp", atSec: 1, holdSec: 4 }, layout: cover }).box;
ok(!keyTextLayoutProblems(cover, rBox).length, "chữ shrink-top hợp lệ bị báo: " + keyTextLayoutProblems(cover, rBox).join("|"));
ok(keyTextLayoutProblems(cover, { x: 70, y: 600, w: 940, h: 200 }).some((m) => m.includes("CHỒNG")), "không bắt chữ chồng asset thu nhỏ");
ok(keyTextLayoutProblems(treatmentLayout("dim-lower", { x: 0, y: 0, w: 1080, h: 1920 }, "cover"), { x: 70, y: 1200, w: 940, h: 300 }).some((m) => m.includes("1390")), "không bắt chữ chạm vùng phụ đề");
ok(!treatmentLayout("shrink-top", { x: 40, y: 640, w: 1000, h: 563 }, "contain").valid, "shrink-top cho asset contain phải không hợp lệ");
ok(!treatmentLayout("band-free", { x: 0, y: 0, w: 1080, h: 1920 }, "cover").valid, "band-free cho asset cover phải không hợp lệ");
ok(!treatmentLayout("band-free", { x: 105, y: 160, w: 870, h: 1230 }, "contain").valid, "band-free khi dải trống <190px phải không hợp lệ");
{ // cửa sổ chữ vượt hết shot → builder chặn
  const mediaById = { "img-c": MEDIA.cover };
  const shots = finalizeAssetShots([{ id: "S1-1", sceneId: "S1", assetId: "img-c", startMs: 0, endMs: 5000 }], mediaById, { k: 0, prev: null, lastTransition: "cut" });
  shots[0].keyText = { text: LONG, format: "typewriter", treatment: "dim-lower", atMs: 3500, holdMs: 4000 };
  let threw = false; try { buildAssetSceneHtml({ scene: { id: "S1", startMs: 0, endMs: 5000 }, shots, mediaById }); } catch (e) { threw = /sát\/vượt hết shot/.test(e.message); }
  ok(threw, "cửa sổ chữ vượt hết shot phải bị chặn");
}
ok(keyTextTimingProblems({ text: "Vì sao?", format: "stamp", atMs: 2300, holdMs: 3600, anchorStartMs: 2000 }, { shotEndMs: 20000 }).some((m) => m.includes("cùng lúc")), "không bắt chữ lệch neo >1 khung");
ok(keyTextTimingProblems({ text: LONG, format: "stamp", atMs: 2000, holdMs: 1500, anchorStartMs: 2000 }, { shotEndMs: 20000 }).some((m) => m.includes("không kịp đọc")), "không bắt chữ hiện quá ngắn");

{ // doc-NN không được dim (validatePlanAndShots)
  const sc = [{ id: "S1", kind: "asset", startMs: 0, endMs: 14000, assetIds: ["doc-01"], keyText: { text: "Vì sao?" }, presentationStyle: "drift-in" }];
  const mk = (treatment) => [{ id: "S1-1", sceneId: "S1", assetId: "doc-01", startMs: 0, endMs: 14000, overlays: [], mediaFit: "contain", containBox: { x: 40, y: 588, w: 1000, h: 374 }, keyText: { text: "Vì sao?", format: "stamp", treatment, atMs: 2000, holdMs: 3600, anchorStartMs: 2000 } }];
  const med = { "doc-01": { id: "doc-01", source: "pdf" } };
  ok(validatePlanAndShots(sc, mk("dim-lower"), med).some((m) => m.includes("doc-NN")), "doc-NN + dim-lower phải bị chặn");
  ok(!validatePlanAndShots(sc, mk("band-free"), med).some((m) => m.includes("doc-NN")), "doc-NN + band-free phải được phép");
}
console.log(`${cases} ca (bỏ qua ${skipped} tổ hợp treatment không áp dụng cho asset đó) — ${fail ? fail + " LỖI" : "ĐẠT"}`);
process.exit(fail ? 1 : 0);
