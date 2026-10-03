// Test ĐIỂM NEO + KHẢ THI + nội dung + hạn mức của chữ A-roll, trên captions/plan THẬT của su-kien-thien-an-mon (run-thien-an-mon; bỏ qua nếu chưa dựng run).
import fs from "node:fs";
import path from "node:path";
import { matchAnchor, planKeyText, keyTextProblems, keyTextQuotaProblems, dropInfeasibleKeyTexts, normTok } from "./overrides/scripts/lib/key-text-plan.mjs";
import { holdFor, minReadSec } from "./overrides/scripts/lib/key-text.mjs";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const slug = "su-kien-thien-an-mon", run = path.join(here, "run-thien-an-mon");
const capF = path.join(run, "public", "videos", slug, "captions", "captions.json"), planF = path.join(run, "planning", "videos", slug, "scene-plan.json");
if (!fs.existsSync(capF) || !fs.existsSync(planF)) { console.log("(bỏ qua: chưa có run-thien-an-mon — dựng bằng setup-run.mjs)"); process.exit(0); }
const caps = JSON.parse(fs.readFileSync(capF, "utf8"));
const scenes = JSON.parse(fs.readFileSync(planF, "utf8"));
const script = fs.readFileSync(path.join(run, "content", "videos", slug, "script.txt"), "utf8");
let fail = 0;
const ok = (c, m) => { if (!c) { fail++; console.log("FAIL:", m); } };

const sc = scenes.find((s) => s.id === "S03");
const inScene = caps.filter((c) => c.startMs >= sc.startMs - 80 && c.startMs < sc.endMs);
const phraseAt = (i, n) => inScene.slice(i, i + n).map((c) => c.text.trim()).join(" ");

// 1) khớp đúng + mốc đúng lúc từ đầu cụm được nói
{
  const i = 6, ph = phraseAt(i, 4);
  const a = matchAnchor(caps, sc, ph);
  ok(!a.error && a.startMs === inScene[i].startMs && a.endMs === inScene[i + 3].endMs && a.words.length === 4, `khớp neo "${ph}": ${JSON.stringify(a).slice(0, 160)}`);
  const withPunct = matchAnchor(caps, sc, ph.toUpperCase() + "!!");
  ok(!withPunct.error && withPunct.startMs === a.startMs, "khớp phải bỏ qua hoa/thường/dấu câu");
}
// 2) cụm bịa / không có trong cảnh → lỗi cứng
ok(!!matchAnchor(caps, sc, "con cá voi bay lên trời").error, "cụm bịa phải bị bắt");
ok(!!matchAnchor(caps, sc, phraseAt(0, 3) + " xyz").error, "cụm đúng đầu nhưng sai đuôi phải bị bắt");
ok(!!matchAnchor(caps, sc, "").error, "cụm rỗng phải bị bắt");
// 3) mơ hồ: tìm 1 từ xuất hiện ≥2 lần trong cảnh
{
  const cnt = {}; for (const c of inScene) cnt[normTok(c.text)] = (cnt[normTok(c.text)] ?? 0) + 1;
  const rep = Object.entries(cnt).find(([, n]) => n >= 2)?.[0];
  ok(!!rep, "kỳ vọng có từ lặp trong cảnh S03");
  if (rep) ok(/khớp \d+ chỗ/.test(matchAnchor(caps, sc, rep).error ?? ""), `từ lặp "${rep}" phải báo mơ hồ`);
}
// 4) khả thi: neo SỚM đủ chỗ → ok; neo SÁT HẾT cảnh → BỎ có lý do; atMs = đúng mốc neo
{
  const shots = [{ id: "S03-1", startMs: sc.startMs, endMs: sc.endMs }];
  const early = phraseAt(2, 3);
  const r = planKeyText({ scene: sc, shots, captions: caps, kt: { anchorPhrase: early, text: "Mất kiểm soát?", format: "stamp" } });
  ok(r.ok && r.atMs === inScene[2].startMs, `neo sớm phải khả thi, atMs = mốc neo: ${JSON.stringify(r)}`);
  ok(r.ok && r.holdMs >= holdFor("Mất kiểm soát?", "stamp") * 1000 - 1, "hold phải ≥ holdFor");
  const lateI = inScene.length - 3;
  const late = planKeyText({ scene: sc, shots, captions: caps, kt: { anchorPhrase: phraseAt(lateI, 3), text: "Ai chịu trách nhiệm đây?", format: "typewriter" } });
  ok(!late.ok && late.drop && /nói nhanh|sát hết/.test(late.reason), `neo sát hết cảnh phải BỎ có lý do: ${JSON.stringify(late)}`);
  const wrong = planKeyText({ scene: sc, shots, captions: caps, kt: { anchorPhrase: "không có thật", text: "x", format: "stamp" } });
  ok(!wrong.ok && !!wrong.error && !wrong.drop, "neo sai là LỖI cứng, không phải bỏ");
  // chữ trùng đúng cụm neo → từng từ hiện theo mốc narration
  const ph = phraseAt(5, 3);
  const w = planKeyText({ scene: sc, shots, captions: caps, kt: { anchorPhrase: ph, text: ph, format: "wordpop" } });
  ok(w.ok && w.wordOffsets && w.wordOffsets.length === 3 && w.wordOffsets[0] === 0 && w.wordOffsets[2] > w.wordOffsets[1], `wordpop phải theo mốc từng từ: ${JSON.stringify(w.wordOffsets)}`);
  // cửa sổ phải nằm trong SHOT: shot kết thúc giữa chừng → bỏ
  const cut = [{ id: "S03-1", startMs: sc.startMs, endMs: inScene[2].startMs + 1500 }, { id: "S03-2", startMs: inScene[2].startMs + 1500, endMs: sc.endMs }];
  const sp = planKeyText({ scene: sc, shots: cut, captions: caps, kt: { anchorPhrase: early, text: "Mất kiểm soát?", format: "stamp" } });
  ok(!sp.ok && sp.drop, "cửa sổ chữ vắt qua ranh giới shot phải bị bỏ");
}
// 5) nội dung chữ
{
  const sentence = sc.scriptText.split(/(?<=[.!?…])\s+/)[1];
  const base = { anchorPhrase: phraseAt(6, 4), text: "Mất kiểm soát?", format: "stamp", purpose: "câu hỏi mấu chốt", why: "đặt vấn đề cốt lõi" };
  ok(!keyTextProblems(base, sc, script).length, "chữ hợp lệ bị báo: " + keyTextProblems(base, sc, script).join("|"));
  ok(keyTextProblems({ ...base, text: "Một hai ba bốn năm sáu bảy tám chín" }, sc, script).some((m) => m.includes("từ")), "không bắt >8 từ");
  ok(keyTextProblems({ ...base, text: "Aaaaaaaaaa bbbbbbbbbb cccccccccc dddddddddd eeeeeeee" }, sc, script).some((m) => m.includes("ký tự")), "không bắt >44 ký tự");
  ok(keyTextProblems({ ...base, text: "Có 99999 người" }, sc, script).some((m) => m.includes("số")), "không bắt số bịa");
  ok(keyTextProblems({ ...base, text: "Do Zorgblatt gây ra" }, sc, script).some((m) => m.includes("tên riêng")), "không bắt tên riêng bịa");
  ok(keyTextProblems({ ...base, format: "thought" }, sc, script).some((m) => m.includes("format")), "không bắt hình thức cũ (thought)");
  ok(keyTextProblems({ ...base, purpose: "ví von" }, sc, script).some((m) => m.includes("purpose")), "không bắt purpose cũ");
  ok(keyTextProblems({ ...base, why: "" }, sc, script).some((m) => m.includes("why")), "không bắt thiếu why");
  ok(keyTextProblems({ ...base, anchorPhrase: sentence.split(" ").slice(0, 4).join(" "), text: sentence }, sc, script).some((m) => m.includes("TOÀN BỘ") || m.includes("chép gần hết")), "không bắt chữ nhắc lại toàn bộ câu");
}
// 6) hạn mức
{
  const mk = (n, withKt) => Array.from({ length: n }, (_, i) => ({ id: `S${i + 1}`, kind: "asset", keyText: withKt.includes(i) ? { format: i % 2 ? "stamp" : "sweep" } : null }));
  ok(keyTextQuotaProblems(mk(16, [0, 5])).length === 0, "16 cảnh, 2 chữ cách ≥3 cảnh phải hợp lệ (quota 2)");
  ok(keyTextQuotaProblems(mk(16, [0, 5, 10])).some((m) => m.includes("tối đa 2")), "3 chữ/16 cảnh phải vượt quota");
  ok(keyTextQuotaProblems(mk(16, [0, 2])).some((m) => m.includes("quá gần")), "hai chữ cách <3 cảnh phải bị bắt");
  { const s = mk(16, [0, 4]); s[0].keyText.format = "stamp"; s[4].keyText.format = "stamp"; ok(keyTextQuotaProblems(s).some((m) => m.includes("trùng")), "hình thức trùng liền trước phải bị bắt"); }
  { const s = mk(14, [3]); s[3].kind = "graphics"; ok(keyTextQuotaProblems(s).some((m) => m.includes("chỉ được ở cảnh asset")), "chữ ở cảnh đồ hoạ phải bị bắt"); }
  ok(keyTextQuotaProblems(mk(6, [2])).length === 0, "6 cảnh vẫn được tối thiểu 1 chữ");
}
// 7) tự bỏ chữ không khả thi (Stage 5): bỏ có lý do, neo sai KHÔNG bị bỏ (để validatePlan báo)
{
  const s2 = JSON.parse(JSON.stringify(scenes)).map((x) => ({ ...x }));
  const t = s2.find((x) => x.id === "S03");
  const lateI = inScene.length - 3;
  t.keyText = { anchorPhrase: phraseAt(lateI, 3), text: "Ai chịu trách nhiệm đây?", format: "typewriter" };
  const t2 = s2.find((x) => x.id === "S09"); t2.keyText = { anchorPhrase: "cụm không có thật", text: "x", format: "stamp" };
  const msgs = dropInfeasibleKeyTexts(s2, caps);
  ok(msgs.length === 1 && /S03/.test(msgs[0]) && t.keyText === null && !!t.keyTextDropped, `phải bỏ S03 có lý do: ${msgs.join("|")}`);
  ok(!!t2.keyText, "neo sai không được tự bỏ (phải còn để validatePlan báo lỗi)");
}
ok(minReadSec("Vì sao?") === 2.0, "chuẩn đọc tối thiểu 2,0s");
console.log(`test neo + khả thi chữ A-roll — ${fail ? fail + " LỖI" : "ĐẠT"}`);
process.exit(fail ? 1 : 0);
