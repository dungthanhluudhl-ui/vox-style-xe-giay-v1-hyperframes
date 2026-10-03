// Lập Scene Plan: chia audio/script thành các scene theo đúng Style DNA (Vox-style).
// Script tự đọc toàn bộ ngữ cảnh cần thiết từ đĩa (script, transcript+timestamp, style DNA,
// manifest media) và gửi cho 9router — Claude không cần đọc lại các file nặng này để tạo
// scene plan, chỉ đọc kết quả markdown ngắn gọn sau khi xong.
// Usage: node scripts/05-scene-plan.router.mjs --video=<slug>
//        node scripts/05-scene-plan.router.mjs --video=<slug> --from=S05   (giữ nguyên scene trước S05, chỉ tạo lại từ S05 trở đi)
import fs from "node:fs";
import path from "node:path";
import { callModel, extractText, extractJson, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
// [POC mascot-aroll / ADN v2] kit mascot + kiểm tra tất định v2
import { loadKit, kitSummaryForPrompt, driftDirForIndex, BG_VARIANTS, fitForAsset } from "./lib/mascot-scene.mjs";
import { validatePlan, softPlanWarnings } from "./lib/v2-checks.mjs";

const root = process.cwd();
const kit = loadKit(root);
const routing = loadModelRouting();
const model = routing.reasoning_planning;

const slug = getVideoSlug();
const vp = videoPaths(slug);

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8");
}

const scriptText = fs.readFileSync(vp.scriptFile, "utf8").trim();
const captions = JSON.parse(fs.readFileSync(vp.captionsFile, "utf8"));
const mediaManifest = JSON.parse(fs.readFileSync(vp.manifestJson, "utf8"));

const styleDnaFiles = [
  "planning/style-dna/STYLE_DNA.md",
  "planning/style-dna/references/editorial-framework.md",
  "planning/style-dna/references/worked-examples.md",
  "planning/style-dna/references/visual-languages.md",
  "planning/style-dna/references/animation-variants.md",
  "planning/style-dna/references/quality-bars.md",
  "planning/style-dna/references/lessons.md",
];
const styleDna = styleDnaFiles.map((f) => `### ${f}\n\n${read(f)}`).join("\n\n---\n\n");
const styleTokens = read("planning/style-dna/style-tokens.json");

// Rút gọn manifest cho gọn prompt: bỏ originalFilename (không cần cho việc lập kế hoạch)
const mediaForPrompt = mediaManifest.map(({ originalFilename, ...rest }) => rest);

// Ảnh trích dẫn từ PDF bản án (source:"pdf", Stage 2c) là BẰNG CHỨNG, khác ảnh minh hoạ AI: không tính vào
// số media "tạo riêng" và có luật chọn riêng (chỉ có khối này khi manifest thật sự có doc-NN).
const aiMediaCount = mediaManifest.filter((m) => m.source !== "pdf").length;
const pdfDocs = mediaManifest.filter((m) => m.source === "pdf");
const PDF_EVIDENCE_RULES = pdfDocs.length
  ? `
QUY TẮC ẢNH TRÍCH DẪN BẢN ÁN (${pdfDocs.length} asset có source="pdf", id dạng doc-NN) — ĐÂY LÀ BẰNG CHỨNG THẬT, không phải ảnh minh hoạ:
- Mỗi doc-NN là một đoạn CHỤP NGUYÊN VĂN từ bản án; "description" ghi đúng đoạn chữ trong ảnh (kèm trang). Chỉ gán doc-NN cho scene mà LỜI THOẠI nói trực tiếp về đúng nội dung đó (nhắc bản án/toà tuyên/hình phạt/điều luật/số liệu khớp câu trích). Nếu không có scene nào khớp thật sự thì KHÔNG dùng — không ép, không cần dùng hết doc.
- Mỗi doc-NN dùng tối đa 1 lần. Có thể đặt doc-NN CÙNG scene với ảnh minh hoạ (nối tiếp, mỗi asset 1 shot) hoặc scene riêng nhưng vẫn ≥5 giây. Với scene có doc-NN, visualLanguages nên gồm "document".
- doc-NN là dải chữ ngang, sẽ hiển thị dạng THẺ TÀI LIỆU giữa khung (không phủ toàn khung, không làm nền) — không gán doc-NN làm ảnh nền duy nhất của scene khi scene đó còn cần hình minh hoạ cảm xúc.
- Ghi trong "notes" câu trích/đoạn lời thoại nào khớp với doc-NN.
`
  : "";

const totalDurationMs = captions[captions.length - 1]?.endMs ?? 0;

const fromArg = process.argv.find((a) => a.startsWith("--from="));
const fromSceneId = fromArg ? fromArg.split("=")[1] : null;
let keptScenes = [];
let regenFromMs = 0;
if (fromSceneId) {
  const existing = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
  const fromIndex = existing.findIndex((s) => s.id === fromSceneId);
  if (fromIndex === -1) {
    console.error(`Không tìm thấy scene ${fromSceneId} trong scene-plan.json hiện có.`);
    process.exit(1);
  }
  keptScenes = existing.slice(0, fromIndex);
  regenFromMs = keptScenes.length > 0 ? keptScenes[keptScenes.length - 1].endMs : 0;
  console.log(`Giữ nguyên ${keptScenes.length} scene (${keptScenes.map((s) => s.id).join(",")}), tạo lại từ ${fromSceneId} (${regenFromMs}ms trở đi).`);
}

const systemPrompt = `Bạn là Đạo diễn biên tập (Editorial Director) cho video giải thích pháp luật ngắn kiểu "Vox-style" (xem đầy đủ style DNA bên dưới — đây là quy tắc BẮT BUỘC tuân theo, không phải gợi ý).

STYLE DNA ĐẦY ĐỦ:
${styleDna}

STYLE TOKENS (số liệu chính xác):
${styleTokens}

NHIỆM VỤ: chia audio/script thành các SCENE theo đúng khung tư duy editorial-framework.md ("ý nghĩa trước, component sau"). Với mỗi scene, PHẢI trả lời được quan hệ hình ảnh cụ thể người xem cần THẤY HÌNH THÀNH — không phải chỉ minh hoạ chủ đề chung chung.

QUY TẮC ƯU TIÊN MEDIA — QUAN TRỌNG NHẤT, GHI ĐÈ LÊN XU HƯỚNG MẶC ĐỊNH CHỌN DIAGRAM CỦA STYLE DNA:
Toàn bộ ${aiMediaCount} media (không tính ảnh trích dẫn bản án PDF, nếu có) trong manifest bên dưới được TẠO RIÊNG bằng AI dựa trên đúng kịch bản này (không phải stock chung chung, không phải ảnh minh hoạ đại diện). Vì vậy với MỖI scene, việc đầu tiên phải làm là kiểm tra manifest xem có asset nào (chưa dùng cho scene khác) khớp nội dung/cảm xúc của scene đó không.
- [ADN v2] Nếu CÓ asset khớp: BẮT BUỘC dùng nó làm CẢNH ASSET (kind="asset", assetIds khai báo asset đó). Cảnh asset là media thuần + phụ đề: TUYỆT ĐỐI KHÔNG overlay, chữ, thẻ, icon, diagram lên media. Quan hệ ý nghĩa được truyền tải bằng CÁCH TRÌNH BÀY chính asset (xem bảng "Quan hệ cần thấy → cách trình bày asset" ở STYLE_DNA.md mục 4) và lời thoại/phụ đề, không bằng lớp chồng.
- CHỈ được dựng CẢNH ĐỒ HOẠ (kind="graphics", không asset) khi: (a) không còn asset nào (trong ${aiMediaCount} asset) khớp nội dung cảnh đó, HOẶC (b) asset có sẵn không truyền tải được quan hệ chính xác cần thể hiện (số liệu/cấu trúc/vị trí) — khi đó dựng MỘT cảnh đồ hoạ RIÊNG, KHÔNG đặt overlay lên asset.
- Cố gắng dùng hết/gần hết ${aiMediaCount} asset đã phân tích nếu nội dung cho phép, tránh để phần lớn media không được dùng.

[ADN v2] MASCOT CAPYBARA (người kể chuyện) — thư viện v1, CHỈ các ID sau là có thật (không tự bịa trang phục/biểu cảm):
${JSON.stringify(kitSummaryForPrompt(kit))}
- Mascot là cảnh RIÊNG (kind="mascot"), shot riêng toàn khung (nhân vật + nền), KHÔNG ghép ảnh/video/đồ hoạ/chữ. Mascot là NGƯỜI KỂ (đặt câu hỏi, bình luận/bóc tách giả định, ví von nhẹ, chuyển ý, chốt ý, đoạn nhạy cảm), KHÔNG phải hình chứng minh sự kiện. KHÔNG có quota; KHÔNG dùng mascot để lấp chỗ thiếu asset (thiếu asset → cảnh đồ hoạ). Chỉ dùng khi một nhịp "người kể xuất hiện" cải thiện cảnh; phải gắn narrativeFunction thật và khác nhịp cảnh liền trước (contrastWithPrevious).
- Cảnh mascot dài 3–5 giây, do ý đồ quyết định: nhấn mạnh dứt khoát (câu hỏi, chốt ý) ~3s; bình luận/giải thích/ví von/chỗ thở dài hơn tới ~5s. Điểm cắt bám khoảng nghỉ hơi/ranh giới câu; mascot không dồn vào một đoạn và không biến mất ở 1/3 cuối; hai cảnh liên tiếp không có độ dài gần bằng nhau (±15%). Ngưỡng ~5s KHÔNG áp cho cảnh mascot (chỉ áp cho cảnh asset).
- mascotIntent = {"narrativeRole": một narrativeRole CÓ TRONG kit (opening/question/analysis/explanation/consequence/sensitive_fact/empathy/positive_outcome/light_analogy/established_point/uncertainty/takeaway/closing/narration/reporting), "outfit": "host" (mặc định; "reporter" chỉ cho đoạn tường thuật), "tone": ngắn}.
- [ADN v2, vòng 3] CHỮ BỔ TRỢ CHO MASCOT: mascotIntent.textIntent = {"format": một trong thought|quote|punch|question|sticky|stamp, "purpose": một trong hỏi|khẳng định|cảm thán|ví von|chốt, "text": chữ ngắn gọn, cô đọng}. Chữ là SUY NGHĨ/PHẢN ỨNG của nhân vật và phải BỔ SUNG một ý hoặc cảm xúc mà lời thoại CHƯA nói (đặt câu hỏi cho người xem, khẳng định, cảm thán, ví von, chốt ý); TUYỆT ĐỐI không đọc lại hoặc chép nguyên văn lời thoại. Tối đa 9 từ, tiếng Việt, đúng 1 khối chữ/cảnh, không emoji, KHÔNG tự bịa con số/tên riêng/mốc thời gian không có trong kịch bản. Chọn format hợp purpose: thought=lẩm bẩm/ví von nhẹ; quote=câu cô đọng đáng nhớ; punch=cụm nhấn mạnh 1–3 từ; question=câu hỏi hướng tới người xem; sticky=ghi chú nhắc ý; stamp=chốt/kết luận dứt khoát. Hai cảnh mascot liền nhau KHÔNG cùng format. Chữ phải có ý đồ biên tập gắn với narrativeFunction của cảnh, không chèn cho có.
- [ADN v2, vòng 3] TÔNG BIỂU CẢM mascot: đa dạng, đừng mặc định nghiêm. serious/concerned/sad CHỈ cho đoạn nhạy cảm thật sự; mở đầu/chuyển ý/ví von/chốt nên dùng welcome, amused, confident, happy, explain, think, question… Không quá 2 cảnh mascot liên tiếp cùng nhóm nghiêm (serious/concerned/sad).
- [ADN v2, camera liên tục] Cảnh asset: điền "presentationStyle" — MỘT trong: drift-in (zoom-in chậm), drift-out, pan, diag, doc-card. Mỗi shot chỉ có MỘT chuyển động camera liền mạch suốt shot; SỰ KIỆN THỊ GIÁC của cảnh asset = ĐỔI ASSET bám cue lời thoại (giữa hai lần đổi camera luôn trôi, không tính dead-air — luật "≤3s không sự kiện" KHÔNG áp cho cảnh asset). Mỗi asset dùng đúng 1 lần liền mạch trong scene (CẤM tách 1 ảnh thành nhiều shot re-crop); shot ~4–8s: scene dài (>8s) hãy gán NHIỀU asset khác nhau thay vì kéo dài một ảnh. Hai cảnh asset liền nhau KHÔNG cùng presentationStyle (đa dạng kiểu/hướng giữa các cảnh).
- Kiểu vào cảnh (entranceAnimation) chỉ trong bộ KHÔNG XOAY: rise, grow, punch, shatter, unfold, zoom-through, strike (BỎ flip/peel/spiral/wobble-drop). Không trùng cảnh liền trước.
- backgroundVariant chỉ cho cảnh mascot/graphics: một trong grid-moving/chart/card/spotlight (cảnh asset: null). Hai cảnh liền nhau có nền nhìn thấy không cùng biến thể.

QUY TẮC NGƯỠNG NHỊP ĐỘ — ÁP DỤNG ĐỒNG THỜI VỚI QUY TẮC ƯU TIÊN MEDIA Ở TRÊN, KHÔNG ĐƯỢC HY SINH CÁI NÀY ĐỂ LẤY CÁI KIA:
- TUYỆT ĐỐI KHÔNG được tách một scene thành nhiều scene con chỉ để mỗi asset có một scene riêng nếu việc tách khiến scene ngắn hơn ~5 giây. Ngắn hơn 5 giây khiến người xem không kịp đọc/hiểu, dù đúng asset vẫn là một lỗi.
- Nếu một beat lời thoại quá ngắn để tách thành scene ≥5s riêng: (a) GỘP nhiều asset liên quan vào chung 1 scene (asset này có thể xuất hiện nối tiếp nhau bên trong cùng 1 scene, không cần tách scene mới cho từng cái), hoặc (b) giữ hình ảnh hiển thị LÂU HƠN đúng khoảng lời thoại đã giới thiệu nó — thời lượng trên màn hình không bắt buộc bằng đúng thời lượng câu nói (nguyên tắc comprehensionLoad ở editorial-framework.md).
- Trước khi chốt danh sách scene cuối cùng, tự kiểm tra: có scene nào < 5 giây không? Nếu có, quay lại gộp/kéo dài thay vì giữ nguyên.

${PDF_EVIDENCE_RULES}
LƯU Ý: theo quyết định dự án hiện tại, ảnh (type="image") chỉ dùng làm ẢNH NỀN (background-photo), KHÔNG áp dụng xử lý cutout (grayscale+bóng cam) — dù mô tả có ghi "cutout style" (đó là style của chính ảnh AI tạo sẵn, không phải chỉ định phải xử lý cutout thêm). Nguồn: STYLE_DNA.md §2 "Ngoại lệ chính thức".
${
  fromSceneId
    ? `\nCHẾ ĐỘ SINH LẠI MỘT PHẦN: các scene sau ĐÃ CHỐT, KHÔNG được sửa/viết lại, KHÔNG đưa vào output — chỉ dùng để biết asset nào đã dùng rồi (không gán lại cho scene mới) và để nối tiếp đúng văn phong/id:\n${JSON.stringify(keptScenes, null, 2)}\nNhiệm vụ của bạn CHỈ là tạo các scene MỚI bắt đầu từ mốc ${regenFromMs}ms cho đến hết audio (${totalDurationMs}ms), đánh số id tiếp theo dạng S+2 chữ số (nếu scene cuối giữ nguyên là S${String(keptScenes.length).padStart(2, "0")}, scene mới bắt đầu từ S${String(keptScenes.length + 1).padStart(2, "0")}). Output CHỈ gồm các scene MỚI này, không lặp lại scene đã chốt ở trên.\n`
    : ""
}
QUY TẮC ĐẶT ID SCENE — TẤT ĐỊNH, KHÔNG ĐƯỢC TỰ SÁNG TẠO:
- id PHẢI là "S" + đúng 2 chữ số trở lên, đánh số TUẦN TỰ theo đúng thứ tự xuất hiện trong mảng "scenes" (scene đầu tiên trong output này là S01, kế tiếp S02, ...).${
  fromSceneId
    ? ` Ở chế độ sinh lại một phần này, scene đầu tiên bạn trả về PHẢI là S${String(keptScenes.length + 1).padStart(2, "0")}, tăng dần đúng 1 đơn vị mỗi scene sau đó.`
    : ""
}
- TUYỆT ĐỐI KHÔNG ghép chuỗi kiểu "S0" + số (sẽ ra "S010", "S011" sai) — luôn zero-pad đúng 2 chữ số trở lên (từ scene thứ 100 trở đi viết đủ "S100", KHÔNG rút gọn).
- TUYỆT ĐỐI KHÔNG thêm hậu tố chữ cái để tách 1 beat thành nhiều scene con (KHÔNG dùng "S17a"/"S17b"/"S17c") — mỗi scene con vẫn phải có id số tuần tự bình thường của riêng nó (S17, S18, S19...).
- LƯU Ý: pipeline có bước hậu-xử lý ghi đè id theo vị trí mảng bất kể bạn viết gì, nhưng vẫn phải tuân thủ đúng quy tắc trên để id trong output nhất quán, tránh nhầm lẫn khi bạn tự tham chiếu id giữa các scene trong cùng lần trả lời.

Trả về DUY NHẤT một JSON object đúng schema:
{
  "scenes": [
    {
      "id": "S01",
      "startMs": 0,
      "endMs": 3920,
      "scriptText": "câu/đoạn lời thoại của scene này, trích nguyên văn từ script gốc",
      "narrativeFunction": "một trong: hook/question/paradox/cause/causal-chain/list/definition/mechanism/evidence/reversal/conclusion",
      "visualRelationship": "câu trả lời cụ thể cho 'quan hệ nào người xem phải THẤY HÌNH THÀNH' — không phải mô tả chủ đề chung chung",
      "kind": "asset | mascot | graphics",
      "visualLanguages": ["cảnh asset: 1 trong background-photo/cutout/split/document; cảnh mascot: [\"mascot-narrator\"]; cảnh graphics: 1-2 giá trị từ 13 ngôn ngữ thị giác"],
      "presentationStyle": "chỉ cảnh asset: drift-in/drift-out/pan/diag/doc-card; cảnh khác: null",
      "mascotIntent": "chỉ cảnh mascot: {narrativeRole, outfit, tone, textIntent:{format, purpose, text}}; cảnh khác: null",
      "backgroundVariant": "cảnh mascot/graphics: grid-moving/chart/card/spotlight; cảnh asset: null",
      "assetIds": ["id từ media manifest — BẮT BUỘC có ở cảnh asset; RỖNG ở cảnh mascot/graphics"],
      "entranceAnimation": "một trong bộ KHÔNG XOAY (rise/grow/punch/shatter/unfold/zoom-through/strike), KHÔNG trùng với scene liền trước",
      "notes": "lý do chọn (với cảnh mascot: vì sao người kể xuất hiện ở nhịp này), cảnh báo nếu cần fallback"
    }
  ]
}
Không viết giải thích/suy luận nào ngoài JSON object này.`;

const captionsForPrompt = fromSceneId ? captions.filter((c) => c.endMs > regenFromMs) : captions;
const usedAssetIds = new Set(keptScenes.flatMap((s) => s.assetIds || []));
const mediaAvailable = mediaForPrompt.filter((m) => !usedAssetIds.has(m.id));

const userPrompt = `SCRIPT GỐC (10 câu, khớp 100% với audio):
${scriptText}

TỔNG THỜI LƯỢNG AUDIO: ${totalDurationMs}ms (${(totalDurationMs / 1000).toFixed(2)}s)

TRANSCRIPT VỚI TIMESTAMP CẤP TỪ${fromSceneId ? ` (CHỈ phần còn lại, từ ${regenFromMs}ms trở đi)` : ""}:
${JSON.stringify(captionsForPrompt)}

MEDIA MANIFEST (asset ${fromSceneId ? "CHƯA dùng, còn lại để chọn" : "nguồn có sẵn"}):
${JSON.stringify(mediaAvailable, null, 2)}

Hãy lập Scene Plan ${fromSceneId ? `phần còn lại (từ ${fromSceneId} trở đi)` : "đầy đủ"} theo đúng schema đã yêu cầu.`;

console.log(`Gọi ${model} để lập scene plan (script ${scriptText.length} ký tự, ${captions.length} từ có timestamp, ${mediaForPrompt.length} media asset)...`);

// [ADN v2] Chuẩn hoá TẤT ĐỊNH sau khi model trả về (kind/nền/hướng trôi) rồi kiểm tra v2; lỗi → gọi lại 1 lần kèm lỗi.
const mediaById05 = Object.fromEntries(mediaManifest.map((m) => [m.id, m]));
const renormalize = process.argv.includes("--renormalize"); // chuẩn hoá lại scene-plan.json ĐÃ CÓ (kind/nền/containAssets), KHÔNG gọi model

function normalizeScenes(newScenes) {
  // Chuẩn hoá id TẤT ĐỊNH theo vị trí mảng — KHÔNG tin id do LLM tự đặt (đã từng sinh sai
  // "S010/S011..." khi ghép chuỗi thay vì zero-pad, và từng tự tách 1 beat thành "S17a/S17b/S17c").
  // Ghi đè hoàn toàn field "id". CHỈ áp dụng cho scene MỚI — keptScenes giữ nguyên id cũ.
  newScenes.forEach((s, i) => {
    s.id = `S${String(keptScenes.length + i + 1).padStart(2, "0")}`;
    if (!["asset", "mascot", "graphics"].includes(s.kind)) s.kind = (s.assetIds ?? []).length ? "asset" : "graphics";
    if (s.kind === "mascot") s.assetIds = [];
    if (s.kind !== "mascot") s.mascotIntent = null;
    if (s.kind !== "asset") s.presentationStyle = null;
  });
  // [ADN v2, vòng 3] từ vựng presentationStyle = camera liên tục; ánh xạ kiểu cũ (push-in/pull-out/crop-reframe/split/reveal/multi-shot-cut)
  // và chống trùng với cảnh asset liền trước (xoay vòng tất định).
  const STYLE_MAP = { "push-in": "drift-in", "pull-out": "drift-out", pan: "pan", "crop-reframe": "diag", split: "drift-in", reveal: "drift-in", "multi-shot-cut": "drift-in" };
  const STYLES = ["drift-in", "pan", "drift-out", "diag"];
  let prevStyle = null;
  for (const s of [...keptScenes, ...newScenes]) {
    if (s.kind !== "asset") continue;
    let st = STYLE_MAP[s.presentationStyle] ?? s.presentationStyle;
    if (![...STYLES, "doc-card"].includes(st)) st = "drift-in";
    if (st !== "doc-card" && st === prevStyle) st = STYLES[(STYLES.indexOf(st) + 1) % STYLES.length];
    s.presentationStyle = st;
    prevStyle = st;
  }
  // Nền + hướng trôi (TẤT ĐỊNH). Cảnh asset che kín nền (null) TRỪ khi có media "contain" (nằm ngang / phân giải thấp / doc-NN) —
  // khi đó cần nền nhìn thấy. Cảnh đã được gán nền+hướng từ trước (--from/--renormalize) được GIỮ NGUYÊN để không lệch với scene đã dựng;
  // chỉ gán cho cảnh chưa có, tránh trùng biến thể/hướng với cảnh có nền nhìn thấy liền kề (trước và sau).
  const all = [...keptScenes, ...newScenes];
  for (const s of all) {
    if (s.kind === "asset") {
      s.containAssets = (s.assetIds ?? []).filter((id) => fitForAsset(mediaById05[id]).fit === "contain");
      if (!s.containAssets.length) { s.backgroundVariant = null; s.driftDir = null; }
    }
  }
  const visible = (s) => s && (s.kind !== "asset" || s.containAssets.length > 0);
  const isAssigned = (s) => !!s.driftDir && BG_VARIANTS.includes(s.backgroundVariant);
  let visibleIdx = 0;
  all.forEach((s, i) => {
    if (!visible(s)) return;
    const prev = visible(all[i - 1]) ? all[i - 1] : null;
    const next = visible(all[i + 1]) && isAssigned(all[i + 1]) ? all[i + 1] : null;
    if (isAssigned(s)) { visibleIdx++; return; }
    let v = BG_VARIANTS.includes(s.backgroundVariant) ? s.backgroundVariant : "grid-moving";
    for (let k = 0; k < BG_VARIANTS.length && (v === prev?.backgroundVariant || v === next?.backgroundVariant); k++) v = BG_VARIANTS[(BG_VARIANTS.indexOf(v) + 1) % BG_VARIANTS.length];
    let d = driftDirForIndex(visibleIdx);
    for (let k = 0; k < 6 && (d === prev?.driftDir || d === next?.driftDir); k++) d = driftDirForIndex(visibleIdx + k + 1);
    s.backgroundVariant = v;
    s.driftDir = d;
    visibleIdx++;
  });
}

let feedbackForRetry = "";
let newScenes;
if (renormalize) {
  newScenes = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
  normalizeScenes(newScenes);
  const problems = validatePlan(newScenes, kit, scriptText);
  console.log(`[ADN v2] --renormalize: ${newScenes.length} scene, ${newScenes.filter((x) => x.containAssets?.length).length} cảnh asset có media contain, ${problems.length} lỗi chặn.`);
  if (problems.length) { console.error("- " + problems.join("\n- ")); process.exit(1); }
}
for (let planAttempt = 1; !renormalize && planAttempt <= 2; planAttempt++) {
  const response = await callModel({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt + feedbackForRetry },
    ],
    temperature: 0.4,
    maxTokens: 16000,
    timeoutMs: 900000,
    responseFormat: { type: "json_object" },
  });

  const text = extractText(response);
  let result;
  try {
    result = extractJson(text);
  } catch (e) {
    console.error("Không parse được JSON trả về từ model:\n", text.slice(0, 2000));
    process.exit(1);
  }

  newScenes = result.scenes;
  if (!Array.isArray(newScenes) || newScenes.length === 0) {
    console.error("Cảnh báo: 'scenes' không phải array hợp lệ hoặc rỗng.");
    process.exit(1);
  }
  normalizeScenes(newScenes);
  const problems = validatePlan([...keptScenes, ...newScenes], kit, scriptText);
  const soft = softPlanWarnings([...keptScenes, ...newScenes]);
  if (!problems.length && (!soft.length || planAttempt === 2)) {
    if (soft.length) console.log(`[ADN v2] Cảnh báo mềm còn lại (không chặn):\n- ${soft.join("\n- ")}`);
    break;
  }
  console.log(`[ADN v2] Kiểm tra scene plan lần ${planAttempt}: ${problems.length} lỗi chặn, ${soft.length} cảnh báo mềm:\n- ${[...problems, ...soft].join("\n- ")}`);
  if (planAttempt === 2) { console.error("Scene plan vẫn vi phạm ADN v2 sau 2 lần — dừng để người xem xét."); process.exit(1); }
  feedbackForRetry = `\n\nLẦN TRƯỚC SAI QUY TẮC (sửa đúng các điểm sau, giữ nguyên phần còn lại):\n- ${[...problems, ...soft].join("\n- ")}`;
}

const scenes = [...keptScenes, ...newScenes];

// Ghi JSON (nguồn dữ liệu chính cho bước Shotlist/code-gen sau)
fs.mkdirSync(path.dirname(vp.scenePlanJson), { recursive: true });
fs.writeFileSync(vp.scenePlanJson, JSON.stringify(scenes, null, 2), "utf8");

// Render markdown dễ đọc (deterministic, không gọi model lần 2)
const fmtMs = (ms) => `${Math.floor(ms / 1000)}.${String(ms % 1000).padStart(3, "0")}s`;
const md = [
  `# Scene Plan — ${slug}`,
  "",
  `> Sinh bởi \`scripts/05-scene-plan.router.mjs\` qua ${model}. Nguồn dữ liệu: \`planning/videos/${slug}/scene-plan.json\`. Sửa tay thì sửa cả 2 file cho khớp.`,
  "",
  `Tổng thời lượng: ${fmtMs(totalDurationMs)} · ${scenes.length} scene`,
  "",
  "| # | Loại | Thời gian | Lời thoại | Chức năng | Quan hệ hình ảnh | Trình bày/Mascot | Nền (hướng) | Asset | Vào cảnh |",
  "|---|---|---|---|---|---|---|---|---|---|",
  ...scenes.map(
    (s) =>
      `| ${s.id} | ${s.kind} | ${fmtMs(s.startMs)}–${fmtMs(s.endMs)} | ${s.scriptText} | ${s.narrativeFunction} | ${s.visualRelationship} | ${s.kind === "mascot" ? `mascot:${s.mascotIntent?.narrativeRole}/${s.mascotIntent?.tone ?? ""}` : s.presentationStyle ?? "—"} | ${s.backgroundVariant ?? "—"}${s.driftDir ? ` (${s.driftDir})` : ""} | ${(s.assetIds || []).join(", ") || "—"} | ${s.entranceAnimation} |`,
  ),
  "",
  "## Ghi chú từng scene",
  "",
  ...scenes.map((s) => `- **${s.id}**: ${s.notes || "—"}`),
].join("\n");

fs.writeFileSync(vp.scenePlanMd, md, "utf8");

const summary = `Scene Plan: ${scenes.length} scene bằng ${model}, ghi planning/videos/${slug}/scene-plan.json + scene-plan.md`;
console.log(summary);
appendRunLog(`\`scripts/05-scene-plan.router.mjs\` — ${summary}`, vp.runLog);
