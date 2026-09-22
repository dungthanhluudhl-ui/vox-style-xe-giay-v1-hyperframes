// Tạo ảnh + video minh hoạ tự động qua Google Flow (flow.google.com), thay bước tự tay copy
// file vào public/videos/<slug>/media/{images,videos}/. "Não" quyết định hành động là 9router
// (tier browser_agent, vòng lặp vision-agent), "tay" thực thi là agent-browser (Vercel Labs) —
// chụp screenshot đánh số [N] khớp ref @eN (accessibility snapshot), model chọn theo ref thay
// vì đoán toạ độ pixel. Đây là bản chính thức, port từ MVP đã kiểm chứng nhiều lần tại
// experiments/flow-media-agent/agent.mjs — xem planning/responsibility-matrix.md mục "2b" để
// biết đầy đủ các gotcha môi trường thật đã gặp khi setup, tóm tắt ngắn ngay dưới đây:
//   - Binary agent-browser Windows-only, hardcoded (giới hạn đã biết, repo này chỉ chạy Windows).
//   - Đăng nhập Google Flow lần ĐẦU TIÊN cho MỖI tài khoản (--flow-account=) phải làm THỦ CÔNG:
//     đóng HẾT Chrome đang chạy (kể cả chạy nền không cửa sổ — Chrome Settings > "Continue
//     running background apps"), rồi mở Chrome thường (KHÔNG qua agent-browser) trỏ đúng
//     --user-data-dir vào PROFILE_DIR của tài khoản đó, đăng nhập, đóng lại. Từ đó agent-browser
//     tái dùng session đã đăng nhập, không bao giờ tự đăng nhập (Google chặn đăng nhập tương
//     tác qua Chrome bị automation điều khiển). Đây là chi phí một lần cho mỗi tài khoản MỚI —
//     KHÔNG cần lặp lại cho các lần chạy sau hay khi đổi qua lại giữa các tài khoản đã thiết
//     lập sẵn. ĐÃ THỬ VÀ KHÔNG DÙNG ĐƯỢC (2026-09-22): tái sử dụng profile Chrome thật đã đăng
//     nhập sẵn qua `agent-browser --profile <tên>` để bỏ qua bước này — cookie/session copy
//     KHÔNG mang theo được trạng thái đăng nhập Google thật trên máy này (xem
//     responsibility-matrix.md mục 2b để biết chi tiết đã kiểm chứng). Không thử lại hướng đó.
//     Tiện ích double-click thay vì gõ lệnh tay: scripts/flow-profile-open.bat [tên-account]
//     (mặc định "default") — tự tạo thư mục profile nếu chưa có, mở đúng Chrome+profile đó tại
//     flow.google.com. Vẫn phải tự đóng hết Chrome trước khi chạy nếu là lần đăng nhập ĐẦU TIÊN.
//   - Hết credit/hạn mức tạo ảnh ở 1 tài khoản: thiết lập thêm 1 tài khoản Flow khác (đăng nhập
//     thủ công 1 lần như trên vào 1 --flow-account=<tên khác>), thêm tên đó vào "priority" của
//     scripts/flow-accounts.json — từ đó script TỰ ĐỘNG chuyển sang account dự phòng khi gặp lỗi
//     đáng fallback (hết credit/lỗi kỹ thuật/timeout), không cần tự tay đổi --flow-account= hay
//     canh chừng nữa. Xem classifyBlockedReason()/shouldFallback() bên dưới và
//     planning/responsibility-matrix.md mục 2b để biết đầy đủ điều kiện kích hoạt.
//   - Trang project Flow có 2 nút "More options" dễ nhầm: nút cạnh mỗi ảnh ("More options for
//     the project" → Rename/Trash/Delete, SAI cho việc tải file) và nút ở thanh trên cùng gần
//     avatar account ("More options" → Download project/Product help/..., ĐÚNG — dùng ở giai
//     đoạn 3 để tải cả project 1 lần dạng zip).
//   - Quy ước đặt tên account dự phòng (scripts/flow-accounts.json, xem scripts/lib/flow-accounts.mjs):
//     giữ nguyên "default" (không đổi tên thư mục đang hoạt động thật), account mới từ nay đặt
//     tên tuần tự "flow-02", "flow-03", ... (bắt đầu từ 02 vì "default" coi như #1). Mỗi tên MỚI
//     vẫn cần đăng nhập thủ công 1 lần như hướng dẫn trên trước khi thêm vào "priority" của
//     flow-accounts.json — file này chỉ nên liệt kê account THẬT SỰ đã đăng nhập xong.
//
// Usage: node scripts/02b-media-generate.router.mjs --video=<slug> [--flow-account=<tên>] [--style-notes="..."] [--resume-project=<url>] [--retry-animate]
//   --flow-account=<tên>     Tài khoản Flow để THỬ TRƯỚC TIÊN (mặc định "default") — mỗi tên có
//                            profile Chrome/session đăng nhập riêng dưới pipeline/.flow-profile/<tên>/.
//                            Nếu account này fail đáng fallback, script tự chuyển sang account kế
//                            tiếp trong scripts/flow-accounts.json (nếu có).
//   --resume-project=<url>   Mở lại project Flow đã tạo trước đó (URL tự lưu vào
//                            pipeline/videos/<slug>/flow-project.json sau Giai đoạn 1 mỗi lần
//                            chạy) thay vì tạo project/ảnh/video mới — bỏ qua hẳn Giai đoạn 1+2,
//                            chỉ chạy Giai đoạn 3 (tải file). Dùng khi Giai đoạn 3 lỗi (vd tải
//                            thiếu file) hoặc muốn tải lại mà không tốn credit tạo lại từ đầu.
//                            CHỈ áp dụng cho account đầu tiên (--flow-account=) — account fallback
//                            không có quyền truy cập project do account khác tạo, tự bỏ qua cờ
//                            này và bắt đầu lại từ Giai đoạn 1.
//   --retry-animate          Kết hợp với --resume-project=<url>: ảnh Giai đoạn 1 đã đúng, chỉ
//                            chạy lại Giai đoạn 2 (tạo chuyển động) rồi Giai đoạn 3, KHÔNG tạo
//                            ảnh mới. Dùng khi Giai đoạn 2 lỗi (vd Flow báo "video failed to
//                            generate") nhưng ảnh vẫn tốt — tránh tốn credit tạo lại ảnh.
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import AdmZip from "adm-zip";
import {
  callModel,
  imageContentFromFile,
  extractText,
  extractJson,
  loadModelRouting,
  appendRunLog,
} from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { loadFlowAccounts } from "./lib/flow-accounts.mjs";

const execFileAsync = promisify(execFile);
const root = process.cwd();

const slug = getVideoSlug();
const vp = videoPaths(slug);
const styleNotesArg = (process.argv.find((a) => a.startsWith("--style-notes=")) || "").slice(
  "--style-notes=".length,
);
// Account Flow được CHỈ ĐỊNH qua CLI (hoặc "default") — luôn là candidate ĐẦU TIÊN được thử ở
// main(). Nếu account này fail theo hướng đáng fallback (xem shouldFallback() bên dưới) và
// scripts/flow-accounts.json có thêm account dự phòng, vòng lặp tự chuyển sang account kế tiếp.
const cliFlowAccountArg = (process.argv.find((a) => a.startsWith("--flow-account=")) || "--flow-account=default").slice(
  "--flow-account=".length,
);
// Truy cập lại project Flow đã tạo trước đó (vd sau lỗi tải thiếu file, hoặc muốn tải lại) thay
// vì tạo project mới + tạo lại ảnh/video từ đầu — tốn thời gian/credit không cần thiết. Bỏ qua
// hẳn Giai đoạn 1+2 (tạo ảnh/chuyển động), mở thẳng URL này rồi vào ngay Giai đoạn 3 (tải file).
// CHỈ áp dụng cho account ĐẦU TIÊN được thử — xem attemptWithAccount()/skipResume bên dưới.
const resumeProjectArg = (process.argv.find((a) => a.startsWith("--resume-project=")) || "").slice(
  "--resume-project=".length,
);
// Kết hợp với --resume-project=<url>: chạy LẠI Giai đoạn 2 (tạo chuyển động) trên project đã có
// sẵn ảnh đúng, thay vì bỏ qua thẳng tới Giai đoạn 3 (tải file) như mặc định của --resume-project.
// Dùng khi Giai đoạn 2 bị lỗi/fail (vd Flow báo "video failed to generate") nhưng ảnh ở Giai đoạn
// 1 đã đúng — tránh tốn credit tạo lại ảnh từ đầu.
const retryAnimateArg = process.argv.includes("--retry-animate");

if (!fs.existsSync(vp.scriptFile)) {
  console.error(`Không tìm thấy kịch bản tại ${vp.scriptFile}. Tạo file này trước khi chạy.`);
  process.exit(1);
}
const scriptText = fs.readFileSync(vp.scriptFile, "utf8");

const routing = loadModelRouting();
const MODEL = routing.browser_agent;

// Binary native, gọi thẳng — KHÔNG qua `npx`/shell (shell:true + mảng tham số không escape
// đúng, có thể làm hỏng lệnh hoặc mất an toàn khi tham số chứa nội dung do model sinh ra).
const AGENT_BROWSER_BIN = path.join(root, "node_modules", "agent-browser", "bin", "agent-browser-win32-x64.exe");
// Thư mục tải tạm theo từng slug (KHÔNG theo account — dùng chung cho mọi account thử của cùng
// video này) — dọn sạch sau khi phân loại xong vào imagesDir/videosDir, và dọn lại khi chuyển
// account để tránh lẫn file dở dang của account trước vào lần thử kế tiếp.
const STAGE_DIR = path.join(root, "pipeline", ".cache", `flow-media-${slug}`);
// Lưu URL project Flow của lần chạy gần nhất cho slug này — dùng với --resume-project=<url>
// để truy cập lại nhanh khi cần (vd lỗi tải thiếu file), không phải file bí mật (chỉ 1 URL).
const FLOW_PROJECT_FILE = path.join(path.dirname(vp.mediaGenerateLog), "flow-project.json");
const FLOW_HOME_URL = "https://flow.google.com/";

// ---- Mutable, gắn với account ĐANG THỬ — gán lại ở đầu mỗi attemptWithAccount(). Các hàm bên
// dưới (ab(), hintBrowserOpen(), reportStop()) đọc 3 biến này tại THỜI ĐIỂM GỌI (không phải lúc
// định nghĩa), nên luôn phản ánh đúng account đang chạy — an toàn vì các attempt luôn chạy TUẦN
// TỰ, không bao giờ song song. ----
let flowAccount = cliFlowAccountArg;
let PROFILE_DIR = path.join(root, "pipeline", ".flow-profile", flowAccount);
let SESSION_NAME = `flow-media-agent-${flowAccount}`;

// ---- Log chi tiết từng bước (verbose) → vp.mediaGenerateLog. Log tóm tắt 1 dòng cuối cùng →
// vp.runLog qua appendRunLog(), đúng convention mọi stage khác đang dùng. ----
function logLine(text) {
  console.log(text);
  fs.appendFileSync(vp.mediaGenerateLog, `${text}\n`, "utf8");
}
function logStep({ phase, step, action, reasoning, extra, modelMs }) {
  const time = new Date().toISOString();
  const extras = [extra, modelMs != null ? `model: ${modelMs}ms` : null].filter(Boolean).join(", ");
  logLine(
    `- [${time}] [${phase}][bước ${step}] ${action}${reasoning ? ` — ${reasoning}` : ""}${extras ? ` (${extras})` : ""}`,
  );
}
function hintBrowserOpen() {
  logLine(
    `Trình duyệt do agent-browser quản lý (session "${SESSION_NAME}") vẫn có thể đang mở — dùng "${AGENT_BROWSER_BIN} --session ${SESSION_NAME} close" để đóng khi xong.`,
  );
}

// ---- Lớp "tay": gọi agent-browser CLI, luôn --session + --json ----
async function ab(args) {
  const fullArgs = ["--session", SESSION_NAME, ...args, "--json"];
  try {
    const { stdout } = await execFileAsync(AGENT_BROWSER_BIN, fullArgs, {
      cwd: root,
      maxBuffer: 32 * 1024 * 1024,
      timeout: 60000,
    });
    return JSON.parse(stdout);
  } catch (e) {
    // agent-browser trả JSON lỗi qua stdout ngay cả khi exit code != 0
    const out = e.stdout || "";
    try {
      return JSON.parse(out);
    } catch {
      return { success: false, error: e.message || String(e) };
    }
  }
}

// ---- Tham số phong cách — độc lập với planning/style-dna/ (đây là 2 pipeline hình ảnh có
// chủ đích khác nhau: style-dna mô tả xử lý cutout ảnh thật grayscale+cam cho video đã làm,
// còn đây là minh hoạ AI kiểu paper-collage cho hướng Flow — quyết định giữ tách biệt,
// 2026-09-20). Đổi/mở rộng phong cách sau này chỉ cần sửa object này, không cần viết lại prompt.
const IMAGE_STYLE = {
  aspectRatio: "9:16 vertical composition",
  defaultSetting: "Việt Nam",
  examplePrompts: [
    "Vox-style paper-tear animation aesthetic. Scene 5: The same middle-aged Vietnamese man (Trần Văn N) standing pale and shocked in the defendant's box of a formal wood-paneled Vietnamese courtroom. The composition uses layered paper collage with wood grain textures and sharp paper borders. Realistic Vietnamese courtroom and features. High contrast 2D illustration. 9:16 vertical composition",
    "Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 1: A middle-aged Vietnamese man (Trần Văn N) with short black hair and a rugged face, wearing a dark navy polo shirt. He is slamming a paper with '150 TRIỆU' written on it onto a wooden table. Background shows a typical Vietnamese house interior. Tactile paper textures, torn edges, high-contrast flat 2D illustration. Realistic Vietnamese features. 9:16 vertical composition",
  ],
};

// ---- Tự chia cảnh + viết sẵn 1 prompt/ảnh bằng 9router, KHÔNG để Flow's Agent tự chia cảnh —
// phát hiện thật: khi giao Flow tự chia kịch bản thành phân cảnh, nó luôn chỉ tạo ~5-6 ảnh bất
// kể kịch bản dài hay ngắn. Khi đưa sẵn 1 DANH SÁCH prompt (mỗi dòng 1 ảnh, không đánh số/gạch
// đầu dòng), Flow tạo đúng số ảnh khớp danh sách. Prompt mẫu trong IMAGE_STYLE.examplePrompts
// trích từ chính các lượt tạo ảnh THÀNH CÔNG thật của người dùng.
async function generateScenePrompts(script, styleNotes) {
  const systemPrompt = `Bạn là chuyên gia viết prompt tạo ảnh AI theo phong cách "Vox-style" (xé giấy/cắt dán — paper cutout/collage) cho video ngắn dạng phóng sự/kể chuyện.

Nhiệm vụ: đọc kịch bản dưới đây, tự chia thành các phân cảnh hợp lý — SỐ LƯỢNG PHÂN CẢNH TỈ LỆ THUẬN VỚI ĐỘ DÀI KỊCH BẢN (kịch bản dài cần nhiều phân cảnh hơn để bao quát đủ nội dung, KHÔNG giới hạn cố định ở 5-6 cảnh) — rồi viết ĐÚNG 1 prompt tạo ảnh tiếng Anh cho mỗi phân cảnh.

Mỗi prompt PHẢI theo đúng cấu trúc đã chứng minh hiệu quả qua các ví dụ thật sau:
"""
${IMAGE_STYLE.examplePrompts.join("\n\n")}
"""

Quy tắc bắt buộc cho MỖI prompt:
- Luôn mở đầu bằng "Vox-style paper-tear animation aesthetic." hoặc "Vox-style paper cutout collage."
- Luôn kết thúc bằng "${IMAGE_STYLE.aspectRatio}"
- Luôn có cụm mô tả chất liệu giấy (vd "layered paper collage", "torn edges", "tactile paper textures", "high contrast 2D illustration")
- Bối cảnh: đọc kỹ kịch bản để xác định đúng địa điểm; nếu kịch bản không nêu rõ, mặc định lấy bối cảnh là ${IMAGE_STYLE.defaultSetting}
- QUAN TRỌNG NHẤT — nhất quán nhân vật: lần đầu một nhân vật xuất hiện, mô tả rõ ngoại hình (tuổi, kiểu tóc, trang phục...) gắn liền với tên; mọi prompt SAU đó nhắc lại nhân vật đó PHẢI DÙNG LẠI Y HỆT cụm mô tả ngoại hình đã dùng ở lần đầu (không đổi cách diễn đạt) để Flow tạo hình ảnh đồng nhất xuyên suốt. Áp dụng tương tự cho bối cảnh/địa điểm lặp lại.${
    styleNotes ? `\n- Ghi chú thêm cho video này: ${styleNotes}` : ""
  }

Trả về JSON đúng format: {"prompts": ["prompt phân cảnh 1 bằng tiếng Anh...", "prompt phân cảnh 2...", ...]}`;

  const response = await callModel({
    model: routing.scene_image_prompt_writer,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Kịch bản:\n"""${script.trim()}"""` },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.4,
    maxTokens: 4000,
  });
  const parsed = extractJson(extractText(response));
  return parsed.prompts;
}

// ---- Cache lười (chỉ sinh 1 LẦN DUY NHẤT, dùng chung cho mọi account thử) — prompt ảnh không
// phụ thuộc account nào đang chạy, chỉ phụ thuộc kịch bản. Không sinh trước nếu --resume-project
// đang dùng (account đầu có thể resume thành công, không cần prompt); nếu account đó fail đáng
// fallback và account kế tiếp phải bắt đầu lại từ Giai đoạn 1, hàm này tự sinh đúng lúc cần.
let scenePromptsCache = null;
async function getScenePrompts() {
  if (!scenePromptsCache) {
    logLine(`Đang chia kịch bản thành các phân cảnh + viết prompt ảnh (qua ${routing.scene_image_prompt_writer})...`);
    scenePromptsCache = await generateScenePrompts(scriptText, styleNotesArg);
    logLine(`Đã sinh ${scenePromptsCache.length} prompt ảnh:`);
    scenePromptsCache.forEach((p, i) => logLine(`  ${i + 1}. ${p}`));
  }
  return scenePromptsCache;
}

function buildScenePromptListMessage(prompts) {
  return `Hãy tạo ĐÚNG ${prompts.length} ẢNH RIÊNG BIỆT, mỗi ảnh là MỘT FILE ảnh độc lập, khổ dọc 9:16 (vertical), theo đúng ${prompts.length} prompt dưới đây (mỗi dòng = một ảnh, theo đúng thứ tự):
${prompts.join("\n")}

QUAN TRỌNG: TUYỆT ĐỐI KHÔNG gộp nhiều cảnh vào chung 1 ảnh duy nhất (không tạo dạng lưới/collage/contact-sheet/storyboard nhiều ô trong 1 ảnh, không vẽ minh hoạ "danh sách prompt"). Phải có đủ ${prompts.length} ảnh riêng biệt xuất hiện trong khu vực media, mỗi ảnh khổ dọc 9:16, không phải khổ ngang.`;
}

function buildAnimatePrompt() {
  return `Tiếp theo, bạn hãy tạo chuyển động kiểu vox style cho các hình ảnh bạn vừa tạo nêu trên để tôi dùng nó để ghép lại thành video hoàn chỉnh. Sử dụng model lite để tiết kiệm tối đa chi phí và không cần có âm thanh cho video.`;
}

// ---- Schema hành động dùng chung cho mọi phase ----
function buildSystemPrompt({ phaseGoal, messageToSend }) {
  return `Bạn là một agent điều khiển trình duyệt để thao tác với Google Flow (flow.google.com) — công cụ tạo ảnh/video AI.

Mỗi bước bạn nhận: (1) một ảnh chụp màn hình có đánh số [N] lên từng phần tử tương tác được, (2) danh sách text liệt kê các phần tử đó theo dạng "[N] @eN role \\"tên\\"". Số [N] trong ảnh khớp đúng với @eN trong danh sách — dùng ảnh để hiểu bối cảnh/trạng thái trực quan (đang xử lý, tiến độ %...), dùng danh sách để chọn CHÍNH XÁC phần tử cần thao tác bằng ref (@eN), KHÔNG đoán toạ độ pixel.

MỤC TIÊU CỦA GIAI ĐOẠN NÀY:
${phaseGoal}
${
  messageToSend
    ? `\nNếu giai đoạn này cần gửi tin nhắn cho Flow, đây là nội dung cần gửi (chỉ gửi nếu bạn thấy nó CHƯA xuất hiện trong lịch sử chat — nhìn ảnh/danh sách để xác nhận, không gửi lặp lại):\n"""\n${messageToSend}\n"""\n`
    : ""
}
Ở mỗi lượt, trả về DUY NHẤT một object JSON (không markdown, không giải thích ngoài JSON) đúng schema:
{
  "reasoning": "1 câu ngắn giải thích vì sao chọn hành động này",
  "action": "click" | "fill" | "key" | "scroll" | "wait" | "download" | "done" | "blocked",
  "ref": "@eN — bắt buộc khi action=click, fill, hoặc download, lấy đúng từ danh sách phần tử",
  "text": "chuỗi cần điền, chỉ cần khi action=fill",
  "key": "tên phím vd Enter/Escape/Tab, chỉ cần khi action=key (áp dụng lên phần tử đang focus)",
  "direction": "up" | "down" (chỉ cần khi action=scroll),
  "amount": số pixel cuộn (chỉ cần khi action=scroll, mặc định hợp lý nếu bỏ trống),
  "ms": số mili-giây chờ (chỉ cần khi action=wait),
  "reason": "lý do, chỉ cần khi action=done hoặc blocked"
}

Quy tắc bắt buộc:
- action=fill: điền "text" trực tiếp vào phần tử "ref" (tự động click + xoá + gõ trong 1 bước) — LUÔN dùng fill để nhập nội dung dài/kịch bản, không cần click riêng để lấy focus trước.
- action=click: bấm vào đúng phần tử "ref".
- action=download: chỉ dùng khi thấy RÕ một nút/icon tải xuống cho một item media cụ thể trong danh sách phần tử.
- action=wait: dùng khi thấy dấu hiệu Flow đang xử lý (spinner, "Generating...", %). Flow's Agent thường tự trả lời báo cáo bằng text khi xong (vd "Đã tạo xong...") — kết hợp dấu hiệu đó với việc không còn spinner để xác nhận đã xong, đừng chỉ dựa vào 1 dấu hiệu. LUÔN chọn "ms" NGẮN (2-4 giây, KHÔNG cần chờ lâu 1 lần) rồi kiểm tra lại bằng ảnh chụp ở bước sau — mỗi bước vốn đã tự chụp ảnh mới, chờ ngắn nhưng kiểm tra thường xuyên rẻ hơn đoán 1 khoảng chờ dài và giúp phát hiện đúng lúc hoàn tất sớm hơn.
- action=done: CHỈ trả về khi mục tiêu của giai đoạn này (nêu trên) đã đạt được thật sự, không phải mới vừa gửi xong yêu cầu. TRƯỚC KHI trả done cho việc liên quan tới "toàn bộ ảnh/video đã tạo xong": PHẢI cuộn (scroll) qua HẾT khu vực media để xác nhận KHÔNG còn item nào hiển thị dấu hiệu đang xử lý (spinner/%/nút Stop) — chỉ 1 item còn dang dở cũng KHÔNG được trả done. Đây là lỗi thật từng xảy ra: bấm tải cả project khi 1 video chưa render xong, dẫn tới thiếu file.
- action=blocked: khi thấy trang đăng nhập Google, CAPTCHA/xác minh bảo mật, thông báo lỗi, hoặc bất kỳ trạng thái nào bạn KHÔNG chắc chắn nên làm gì tiếp theo. Nêu rõ "reason". TUYỆT ĐỐI không tự đoán bừa khi không chắc — luôn ưu tiên blocked.
- Nếu danh sách phần tử không có gì phù hợp với việc bạn muốn làm, dùng action=scroll để tìm thêm thay vì đoán một ref không chắc chắn.`;
}

function formatAnnotations(annotations) {
  if (!annotations?.length) return "  (không có phần tử tương tác nào được phát hiện)";
  return annotations.map((a) => `  [${a.number}] @${a.ref} ${a.role} "${a.name}"`).join("\n");
}

async function runPhase({ phaseName, phaseGoal, messageToSend, maxSteps, downloadedRef }) {
  logLine(`\n== ${phaseName} (tối đa ${maxSteps} bước) ==`);
  const history = []; // {step, action, ref, reasoning}
  for (let step = 1; step <= maxSteps; step++) {
    const screenshotResult = await ab(["screenshot", "--annotate"]);
    if (!screenshotResult.success) {
      logLine(`\n⚠ Không chụp được màn hình ở giai đoạn "${phaseName}", bước ${step}: ${screenshotResult.error}`);
      return { status: "page-closed", reason: screenshotResult.error };
    }
    const screenshotPath = screenshotResult.data.path;
    const annotations = screenshotResult.data.annotations || [];

    const recent = history.slice(-6);
    const historyText = recent.length
      ? recent.map((h) => `  bước ${h.step}: ${h.action}${h.ref ? ` ${h.ref}` : ""}${h.reasoning ? ` (${h.reasoning})` : ""}`).join("\n")
      : "  (chưa có hành động nào trước đó trong giai đoạn này)";
    const last3 = history.slice(-3);
    const stuckWarning =
      last3.length === 3 && last3.every((h) => h.action === last3[0].action && h.ref === last3[0].ref)
        ? `\n⚠ BẠN ĐÃ LẶP LẠI HÀNH ĐỘNG "${last3[0].action} ${last3[0].ref || ""}" ${last3.length} LẦN LIÊN TIẾP MÀ KHÔNG TIẾN TRIỂN. Bước này BẮT BUỘC phải thử một hành động khác hẳn (ref khác, action khác, hoặc scroll).`
        : "";

    const userText = `Bước ${step}/${maxSteps} của giai đoạn "${phaseName}". Số file đã tải được tính tới giờ trong toàn bộ phiên chạy: ${downloadedRef.count}.\n\nDanh sách phần tử tương tác hiện tại:\n${formatAnnotations(annotations)}\n\nLịch sử hành động gần đây trong giai đoạn này:\n${historyText}${stuckWarning}\n\nQuan sát ảnh chụp màn hình mới nhất và danh sách trên, cho biết hành động tiếp theo.`;

    let action;
    let modelCallMs;
    const modelCallStart = Date.now();
    try {
      const response = await callModel({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt({ phaseGoal, messageToSend }) },
          {
            role: "user",
            content: [
              { type: "text", text: userText },
              imageContentFromFile(screenshotPath, "image/png"),
            ],
          },
        ],
        responseFormat: { type: "json_object" },
        temperature: 0,
      });
      modelCallMs = Date.now() - modelCallStart;
      action = extractJson(extractText(response));
    } catch (e) {
      logStep({
        phase: phaseName,
        step,
        action: "lỗi-gọi-model",
        reasoning: e.message || String(e),
        modelMs: Date.now() - modelCallStart,
      });
      return { status: "error", reason: e.message || String(e) };
    }

    logStep({
      phase: phaseName,
      step,
      action: action.action,
      reasoning: action.reasoning || action.reason,
      extra: action.ref,
      modelMs: modelCallMs,
    });
    history.push({ step, action: action.action, ref: action.ref, reasoning: action.reasoning || action.reason });

    if (action.action === "blocked") return { status: "blocked", reason: action.reason };
    if (action.action === "done") return { status: "done", reason: action.reason };

    const ref = action.ref?.replace(/^@/, "");
    let execResult = { success: true };
    if (action.action === "click") {
      execResult = await ab(["click", `@${ref}`]);
    } else if (action.action === "fill") {
      execResult = await ab(["fill", `@${ref}`, String(action.text ?? "")]);
    } else if (action.action === "key") {
      execResult = await ab(["press", action.key]);
    } else if (action.action === "scroll") {
      execResult = await ab(["scroll", action.direction === "up" ? "up" : "down", String(action.amount || 600)]);
    } else if (action.action === "wait") {
      // Rút ngắn mặc định/trần thời gian chờ (trước: mặc định 3000ms, trần 15000ms) — phát hiện
      // thật (2026-09-20): mỗi bước wait đã cộng thêm ~7-10s độ trễ gọi model cho bước kiểm tra
      // tiếp theo, nên chờ dài (gần trần cũ) mỗi lần khiến tổng thời gian chết lớn (đo thực tế
      // ~16-23s/lần wait). Chờ ngắn + kiểm tra lại thường xuyên hơn (mỗi bước vốn đã tự chụp ảnh
      // mới) rẻ hơn đoán 1 khoảng chờ dài — xem hướng dẫn tương ứng trong buildSystemPrompt().
      await new Promise((r) => setTimeout(r, Math.min(action.ms || 2000, 6000)));
    } else if (action.action === "download") {
      const before = new Set(fs.existsSync(STAGE_DIR) ? fs.readdirSync(STAGE_DIR) : []);
      execResult = await ab(["click", `@${ref}`]);
      await new Promise((r) => setTimeout(r, 2000));
      const after = fs.existsSync(STAGE_DIR) ? fs.readdirSync(STAGE_DIR) : [];
      const newFiles = after.filter((f) => !before.has(f));
      if (newFiles.length) {
        downloadedRef.count += newFiles.length;
        logLine(`  → đã tải: ${newFiles.join(", ")}`);
      } else {
        logLine("  → không thấy file mới sau khi bấm — có thể chưa đúng nút tải.");
      }
    } else {
      logLine(`  → hành động không xác định "${action.action}", bỏ qua bước này.`);
    }

    if (!execResult.success) {
      logLine(`  → lỗi khi thực thi hành động: ${execResult.error}`);
      if (/closed|not found|no such session|connection/i.test(String(execResult.error))) {
        return { status: "page-closed", reason: execResult.error };
      }
    }
  }
  return { status: "timeout" };
}

// ---- Phân loại lý do "blocked" — mirror classifyFailure() ở 07-codegen-hf-parallel.mjs.
// Danh sách từ khoá là SUY ĐOÁN hợp lý, chưa có case thật nào xác nhận câu "reason" thật khi
// Flow báo hết credit (xem planning/responsibility-matrix.md mục 2b) — tinh chỉnh khi gặp case
// thật đầu tiên thay vì đoán thêm bây giờ.
function classifyBlockedReason(reason) {
  const r = (reason || "").toLowerCase();
  const quotaHints = ["credit", "quota", "hạn mức", "hết", "limit", "exceeded", "insufficient", "usage"];
  const humanNeededHints = [
    "captcha",
    "verify",
    "xác minh",
    "đăng nhập",
    "sign in",
    "login",
    "security",
    "bảo mật",
    "suspicious",
    "2fa",
    "two-factor",
    "otp",
  ];
  if (humanNeededHints.some((h) => r.includes(h))) return "human-needed"; // kiểm tra trước quota
  if (quotaHints.some((h) => r.includes(h))) return "quota";
  return "unknown";
}

// ---- Quyết định có đáng chuyển sang account dự phòng khác hay không, dựa trên status/reason
// của 1 lần thử (xem planning/responsibility-matrix.md mục 2b để biết đầy đủ lý do từng nhánh):
// - blocked + quota → fallback (tài khoản khác không bị chung giới hạn credit).
// - blocked + human-needed (CAPTCHA/đăng nhập) → KHÔNG fallback, account khác cũng cần xử lý tay.
// - blocked + unknown → KHÔNG fallback (an toàn hơn khi chưa chắc account khác giải quyết được).
// - error/timeout → fallback (có thể do session/account cụ thể, đáng thử account khác).
// - page-closed → KHÔNG fallback (người dùng tự đóng hoặc lỗi kết nối nghiêm trọng, cần xem tay).
function shouldFallback(result) {
  if (result.status === "blocked") return classifyBlockedReason(result.reason) === "quota";
  if (result.status === "error") return true;
  if (result.status === "timeout") return true;
  return false;
}

function reportStop(result, phaseName) {
  if (result.status === "blocked") {
    const kind = classifyBlockedReason(result.reason);
    logLine(`\n⚠ AGENT BỊ CHẶN ở giai đoạn "${phaseName}" (account "${flowAccount}"): ${result.reason || "(không rõ lý do)"}`);
    if (kind === "human-needed") {
      logLine(
        "Cần CAPTCHA/xác minh/đăng nhập — KHÔNG tự động chuyển account (account khác cũng cần xử lý thủ công riêng). Kiểm tra cửa sổ Chrome đang mở và tự xử lý.",
      );
    } else if (kind === "quota") {
      logLine("Có vẻ hết credit/hạn mức — sẽ tự động thử account dự phòng tiếp theo trong scripts/flow-accounts.json (nếu có).");
    } else {
      logLine(
        "Lý do chưa khớp từ khoá quota/human-needed đã biết — KHÔNG tự động chuyển account để an toàn. Kiểm tra cửa sổ Chrome đang mở và tự xử lý.",
      );
    }
    logLine("Nếu là lỗi khác, xử lý xong rồi chạy lại lệnh này — session đã lưu trong profile nên không cần đăng nhập lại lần sau.");
  } else if (result.status === "page-closed") {
    logLine(
      `\n⚠ TRÌNH DUYỆT/PHIÊN ĐÃ ĐÓNG giữa giai đoạn "${phaseName}" (account "${flowAccount}", người dùng tự đóng, hoặc lỗi kết nối nghiêm trọng): ${result.reason}. KHÔNG tự động chuyển account.`,
    );
  } else if (result.status === "timeout") {
    logLine(
      `\n⚠ HẾT SỐ BƯỚC cho phép ở giai đoạn "${phaseName}" (account "${flowAccount}") mà chưa xong — sẽ tự động thử account dự phòng tiếp theo (nếu có).`,
    );
  } else if (result.status === "error") {
    logLine(`\n⚠ LỖI ở giai đoạn "${phaseName}" (account "${flowAccount}"): ${result.reason} — sẽ tự động thử account dự phòng tiếp theo (nếu có).`);
  }
}

function stopEarly(result, phaseName) {
  reportStop(result, phaseName);
  logLine(`\nLog chi tiết: ${vp.mediaGenerateLog}`);
  hintBrowserOpen();
}

// ---- Chờ TẤT ĐỊNH (poll hệ thống file, không hỏi/tin model) cho tới khi file tải về thực sự
// ổn định — phát hiện thật (2026-09-20): model thấy thông báo "Downloading project..." là trả
// done NGAY, trong khi file zip/video thật vẫn còn đang tải vài giây sau đó (tải xuống của
// trình duyệt không hiển thị trong page DOM/screenshot nên model không thể tự phán đoán chính
// xác lúc nào xong). Đúng nguyên tắc ưu tiên tất định hơn AI khi có thể: dùng dấu hiệu file hệ
// thống (.crdownload còn tồn tại = chưa xong; danh sách file không đổi trong quietMs = coi như
// ổn định) thay vì tin lời model.
async function waitForDownloadsToSettle(stagingDir, log, { timeoutMs = 60000, quietMs = 3000, pollMs = 1000 } = {}) {
  const start = Date.now();
  let lastSnapshot = null;
  let lastChangeAt = Date.now();
  while (Date.now() - start < timeoutMs) {
    const files = fs.existsSync(stagingDir) ? fs.readdirSync(stagingDir) : [];
    const hasPartial = files.some((f) => /\.(crdownload|part|tmp)$/i.test(f));
    const snapshot = files
      .filter((f) => !/\.(crdownload|part|tmp)$/i.test(f))
      .sort()
      .join("|");
    if (snapshot !== lastSnapshot) {
      lastSnapshot = snapshot;
      lastChangeAt = Date.now();
    }
    if (!hasPartial && files.length > 0 && Date.now() - lastChangeAt >= quietMs) {
      log(`  → xác nhận tải xong: ${files.length} file trong thư mục tạm, không đổi trong ${quietMs}ms.`);
      return true;
    }
    await new Promise((r) => setTimeout(r, pollMs));
  }
  log(`  ⚠ Hết thời gian chờ (${timeoutMs}ms) mà chưa xác nhận tải xong (thư mục tạm hiện có ${fs.existsSync(stagingDir) ? fs.readdirSync(stagingDir).length : 0} file) — vẫn thử phân loại với những gì đang có.`);
  return false;
}

// ---- Giải nén zip (nếu có, từ "Download project") + phân loại MỌI file trong stagingDir theo
// đuôi vào đúng imagesDir/videosDir. KHÔNG ghi đè file đã có sẵn (thêm hậu tố nếu trùng tên) —
// không phá dữ liệu cũ. Xử lý đồng nhất cả 2 đường tải: zip (giải nén trước) và tải từng item
// lẻ (fallback khi không tìm thấy "Download project" — file đã nằm phẳng sẵn trong stagingDir).
function sortDownloadsIntoMedia(stagingDir, imagesDir, videosDir, log) {
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  const extractDir = path.join(stagingDir, "_extracted");
  for (const f of fs.readdirSync(stagingDir)) {
    if (/\.zip$/i.test(f)) {
      const zip = new AdmZip(path.join(stagingDir, f));
      zip.extractAllTo(extractDir, true);
      log(`  → giải nén ${f} vào ${extractDir}`);
    }
  }

  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (!/\.zip$/i.test(entry.name) && !/\.(crdownload|part)$/i.test(entry.name)) files.push(full);
    }
  })(stagingDir);

  const result = { imagesAdded: [], videosAdded: [], skipped: [] };
  for (const full of files) {
    const ext = path.extname(full).toLowerCase();
    const destDir = /\.(jpe?g|png)$/i.test(ext) ? imagesDir : /\.(mp4|mov|webm)$/i.test(ext) ? videosDir : null;
    if (!destDir) {
      result.skipped.push(path.basename(full));
      continue;
    }
    let destName = path.basename(full);
    let i = 2;
    while (fs.existsSync(path.join(destDir, destName))) {
      destName = `${path.basename(full, ext)}-flow${i}${ext}`;
      i++;
    }
    fs.copyFileSync(full, path.join(destDir, destName));
    (destDir === imagesDir ? result.imagesAdded : result.videosAdded).push(destName);
    if (/\.(mov|webm)$/i.test(ext)) {
      log(
        `  ⚠ ${destName}: định dạng video KHÔNG phải .mp4 — scripts/03-media-analyze.router.mjs chỉ tự nhận đuôi .mp4, cần convert/đổi tên tay trước khi chạy Stage 3.`,
      );
    }
  }
  return result;
}

// ---- Thử toàn bộ pipeline (Giai đoạn 1-3) với 1 account cụ thể. Trả về { ok: true } khi thành
// công, hoặc { ok: false, result, phaseName } khi fail — KHÔNG process.exit()/throw trực tiếp,
// để main() quyết định có fallback account tiếp theo hay dừng hẳn. accountName gán vào các biến
// mutable flowAccount/PROFILE_DIR/SESSION_NAME ở đầu hàm — mọi hàm dùng chung ở trên (ab(),
// reportStop(), hintBrowserOpen()) tự động dùng đúng giá trị của account này trong suốt attempt.
async function attemptWithAccount(accountName, { skipResume }) {
  flowAccount = accountName;
  PROFILE_DIR = path.join(root, "pipeline", ".flow-profile", flowAccount);
  SESSION_NAME = `flow-media-agent-${flowAccount}`;

  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  fs.mkdirSync(STAGE_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(vp.mediaGenerateLog), { recursive: true });

  logLine(`\n# Phiên chạy ${new Date().toISOString()} — video=${slug} — account="${flowAccount}" — model điều khiển: ${MODEL} (qua agent-browser)`);

  const downloadedRef = { count: 0 };
  const useResume = Boolean(resumeProjectArg) && !skipResume;

  if (resumeProjectArg && skipResume) {
    logLine(
      `\nAccount "${flowAccount}" không phải account đã tạo project Flow ban đầu — bỏ qua --resume-project` +
        `${retryAnimateArg ? "/--retry-animate" : ""}, bắt đầu lại từ Giai đoạn 1 (project Flow gắn quyền theo` +
        ` tài khoản Google đã tạo nó, account khác không truy cập được).`,
    );
  }

  if (useResume) {
    // ---- Chế độ truy cập lại project đã có sẵn (vd sau lỗi tải thiếu file) — bỏ qua hẳn
    // Giai đoạn 1 (tạo ảnh) + Giai đoạn 2 (tạo chuyển động), không tốn thời gian/credit tạo lại.
    // Trừ khi --retry-animate: vẫn chạy lại Giai đoạn 2 (ảnh Giai đoạn 1 đã đúng, chỉ cần tạo
    // lại chuyển động, vd sau khi Flow báo "video failed to generate").
    logLine(
      `\nChế độ --resume-project: mở lại ${resumeProjectArg}, bỏ qua Giai đoạn 1${retryAnimateArg ? "" : "+2"}.`,
    );
    const openResult = await ab(["--profile", PROFILE_DIR, "--headed", "--download-path", STAGE_DIR, "open", resumeProjectArg]);
    if (!openResult.success) {
      logLine(`\n⚠ Không mở được project (account "${flowAccount}"): ${openResult.error}`);
      return { ok: false, result: { status: "error", reason: openResult.error }, phaseName: "mo-project-resume" };
    }
    logLine(`Đã vào: ${openResult.data.title} (${openResult.data.url})`);

    if (retryAnimateArg) {
      const phase2 = await runPhase({
        phaseName: "2-tao-chuyen-dong",
        phaseGoal:
          "Điền (fill) đúng tin nhắn được cung cấp bên dưới vào ô chat Agent của project đang mở và gửi đi, để yêu cầu Flow tạo chuyển động/video từ các ảnh đã có sẵn trong project. Đợi Flow tạo xong các clip video. Chỉ được trả done khi video ĐÃ xuất hiện trong khu vực media và không còn dấu hiệu đang xử lý.",
        messageToSend: buildAnimatePrompt(),
        maxSteps: 25,
        downloadedRef,
      });
      if (phase2.status !== "done") {
        stopEarly(phase2, "2-tao-chuyen-dong");
        return { ok: false, result: phase2, phaseName: "2-tao-chuyen-dong" };
      }
      logLine(`✓ Giai đoạn 2 xong: ${phase2.reason || ""}`);
    }
  } else {
    const scenePrompts = await getScenePrompts();

    logLine(`\nMở ${FLOW_HOME_URL} (profile: ${PROFILE_DIR}) ...`);
    const openResult = await ab(["--profile", PROFILE_DIR, "--headed", "--download-path", STAGE_DIR, "open", FLOW_HOME_URL]);
    if (!openResult.success) {
      logLine(`\n⚠ Không mở được Flow (tài khoản "${flowAccount}"): ${openResult.error}`);
      logLine(
        `Nếu đây là lần đầu dùng tài khoản "${flowAccount}": chạy scripts/flow-profile-open.bat ${flowAccount} ` +
          `(double-click được) để đăng nhập thủ công 1 lần. Xem planning/responsibility-matrix.md mục 2b.`,
      );
      const result = { status: "error", reason: openResult.error };
      return { ok: false, result, phaseName: "mo-flow" };
    }
    logLine(`Đã vào: ${openResult.data.title} (${openResult.data.url})`);

    const phase1 = await runPhase({
      phaseName: "1-tao-anh",
      phaseGoal:
        'Nếu chưa ở trong một project, hãy tạo MỘT PROJECT MỚI trên Flow (dùng phần tử "New project" trên trang chủ). Sau đó tìm ô nhập chat "Agent" (thường có placeholder dạng "What do you want to create?"), điền (fill) đúng tin nhắn được cung cấp bên dưới, gửi đi (thường bằng phím Enter hoặc nút gửi dạng mũi tên), rồi đợi Flow tạo xong TOÀN BỘ ảnh theo đúng danh sách prompt (đã có sẵn số lượng cố định trong tin nhắn — không cần Flow tự chia cảnh). Chỉ được trả done khi ảnh ĐÃ xuất hiện đầy đủ trong khu vực media của project và không còn dấu hiệu đang xử lý.',
      messageToSend: buildScenePromptListMessage(scenePrompts),
      maxSteps: 25,
      downloadedRef,
    });
    if (phase1.status !== "done") {
      stopEarly(phase1, "1-tao-anh");
      return { ok: false, result: phase1, phaseName: "1-tao-anh" };
    }
    logLine(`✓ Giai đoạn 1 xong: ${phase1.reason || ""}`);

    // Lưu URL project ngay sau khi tạo xong — dùng --resume-project="<url>" để quay lại nhanh
    // nếu Giai đoạn 3 gặp lỗi (vd tải thiếu file), không cần tạo project + ảnh/video mới.
    const urlResult = await ab(["get", "url"]);
    if (urlResult.success && urlResult.data?.url) {
      fs.writeFileSync(
        FLOW_PROJECT_FILE,
        JSON.stringify({ url: urlResult.data.url, slug, flowAccount, capturedAt: new Date().toISOString() }, null, 2),
      );
      logLine(
        `Đã lưu URL project vào ${FLOW_PROJECT_FILE}. Nếu cần chạy lại chỉ từ Giai đoạn 3: --video=${slug} --flow-account=${flowAccount} --resume-project="${urlResult.data.url}"`,
      );
    } else {
      logLine(`  ⚠ Không lấy được URL project hiện tại (${urlResult.error || "không rõ lý do"}) — bỏ qua bước lưu resume, không ảnh hưởng phần còn lại.`);
    }

    const phase2 = await runPhase({
      phaseName: "2-tao-chuyen-dong",
      phaseGoal:
        "Điền (fill) đúng tin nhắn được cung cấp bên dưới vào ô chat Agent của project đang mở và gửi đi, để yêu cầu Flow tạo chuyển động/video từ các ảnh vừa tạo ở giai đoạn trước. Đợi Flow tạo xong các clip video. Chỉ được trả done khi video ĐÃ xuất hiện trong khu vực media và không còn dấu hiệu đang xử lý.",
      messageToSend: buildAnimatePrompt(),
      maxSteps: 25,
      downloadedRef,
    });
    if (phase2.status !== "done") {
      stopEarly(phase2, "2-tao-chuyen-dong");
      return { ok: false, result: phase2, phaseName: "2-tao-chuyen-dong" };
    }
    logLine(`✓ Giai đoạn 2 xong: ${phase2.reason || ""}`);
  }

  const phase3 = await runPhase({
    phaseName: "3-tai-file",
    phaseGoal:
      'TRƯỚC TIÊN, cuộn (scroll) qua HẾT khu vực media của project để xác nhận CHẮC CHẮN không còn ảnh/video nào đang xử lý (spinner/%/nút Stop) — đây là lỗi thật đã xảy ra: bấm tải cả project khi 1 video chưa render xong, dẫn tới thiếu file trong zip. Nếu còn item dang dở, dùng action=wait (ngắn, 2-4s) rồi kiểm tra lại, lặp lại tới khi chắc chắn TẤT CẢ đã xong. CHỈ SAU ĐÓ mới tải: cách NHANH NHẤT là tìm nút "More options" (biểu tượng 3 chấm dọc ⋮, ở thanh trên cùng gần avatar account — KHÔNG PHẢI nút "More options for the project" cạnh từng ảnh), bấm vào đó để mở menu, rồi chọn mục "Download project" trong menu — Flow sẽ tự đóng gói TOÀN BỘ ảnh/video của project thành 1 file zip và tải về trong MỘT hành động download duy nhất. Chỉ dùng cách tải từng item riêng lẻ (action=download trên từng ảnh/video) nếu không tìm thấy "Download project" trong menu đó. Trả done ngay sau khi việc tải (zip hoặc từng item) đã bắt đầu/hoàn tất, không cần tải trùng lặp.',
    messageToSend: null,
    maxSteps: 15,
    downloadedRef,
  });
  if (phase3.status !== "done") {
    stopEarly(phase3, "3-tai-file");
    return { ok: false, result: phase3, phaseName: "3-tai-file" };
  }
  logLine(`✓ Giai đoạn 3 xong (theo model): ${phase3.reason || ""}`);

  logLine("\nĐang chờ file tải thực sự ổn định trên đĩa (tất định, không tin lời model 'đã tải xong')...");
  await waitForDownloadsToSettle(STAGE_DIR, logLine);

  const sorted = sortDownloadsIntoMedia(STAGE_DIR, vp.imagesDir, vp.videosDir, logLine);
  logLine(
    `Đã phân loại: ${sorted.imagesAdded.length} ảnh → ${vp.imagesDir}, ${sorted.videosAdded.length} video → ${vp.videosDir}` +
      (sorted.skipped.length ? `, bỏ qua ${sorted.skipped.length} file không nhận diện được: ${sorted.skipped.join(", ")}` : ""),
  );

  if (sorted.imagesAdded.length === 0 && sorted.videosAdded.length === 0) {
    const result = {
      status: "error",
      reason: `Giai đoạn 3 báo done nhưng không phân loại được file nào (thư mục tạm: ${STAGE_DIR})`,
    };
    logLine(
      `\n⚠ KHÔNG có file nào được phân loại dù giai đoạn 3 báo "done" — model có thể đã trả done quá sớm (thấy thông báo bắt đầu tải, chưa phải tải xong) hoặc bấm nhầm nút. GIỮ LẠI ${STAGE_DIR} để kiểm tra tay, KHÔNG ghi tóm tắt vào run-log.md.`,
    );
    hintBrowserOpen();
    return { ok: false, result, phaseName: "3-tai-file-phan-loai" };
  }

  fs.rmSync(STAGE_DIR, { recursive: true, force: true });
  await ab(["close"]).catch(() => {});

  const summary = `Tạo & tải media qua Google Flow: ${sorted.imagesAdded.length} ảnh + ${sorted.videosAdded.length} video bằng ${MODEL} (prompt viết bởi ${routing.scene_image_prompt_writer}, account "${flowAccount}"), phân loại vào public/videos/${slug}/media/{images,videos}/`;
  console.log(summary);
  appendRunLog(`\`scripts/02b-media-generate.router.mjs\` — ${summary}`, vp.runLog);
  return { ok: true };
}

// ---- Entrypoint: thử lần lượt candidateAccounts (account chỉ định qua CLI luôn thử trước, sau
// đó tới các account trong scripts/flow-accounts.json theo đúng thứ tự "priority"), dừng ngay
// khi 1 account thành công. Khi 1 attempt fail: shouldFallback() quyết định có đáng chuyển
// account kế tiếp hay dừng hẳn — nếu có, đóng session hiện tại + dọn STAGE_DIR trước khi thử
// account sau (tránh lẫn file dở dang), account thứ 2 trở đi luôn bỏ qua --resume-project.
async function main() {
  const { priority } = loadFlowAccounts(root);
  const candidateAccounts = [cliFlowAccountArg, ...priority.filter((a) => a !== cliFlowAccountArg)];

  const attemptHistory = []; // {account, phaseName, result}
  for (let i = 0; i < candidateAccounts.length; i++) {
    const accountName = candidateAccounts[i];
    const skipResume = i > 0; // chỉ account ĐẦU TIÊN được phép dùng --resume-project

    const attempt = await attemptWithAccount(accountName, { skipResume });
    if (attempt.ok) return;

    attemptHistory.push({ account: accountName, phaseName: attempt.phaseName, result: attempt.result });

    const isLast = i === candidateAccounts.length - 1;
    if (isLast) break;

    if (!shouldFallback(attempt.result)) {
      logLine(`\nKhông chuyển sang account dự phòng khác (lý do không đáng fallback) — dừng hẳn tại đây.`);
      break;
    }

    const nextAccount = candidateAccounts[i + 1];
    logLine(`\n→ Đóng session "${flowAccount}" và chuyển sang account dự phòng tiếp theo: "${nextAccount}".`);
    await ab(["close"]).catch(() => {});
    fs.rmSync(STAGE_DIR, { recursive: true, force: true });
  }

  logLine(`\n⚠ ĐÃ DỪNG SAU ${attemptHistory.length} LẦN THỬ ACCOUNT:`);
  for (const h of attemptHistory) {
    logLine(`  - "${h.account}": giai đoạn "${h.phaseName}" — ${h.result.status}${h.result.reason ? `: ${h.result.reason}` : ""}`);
  }
  logLine(`\nLog chi tiết: ${vp.mediaGenerateLog}`);
  process.exit(1);
}

main().catch((e) => {
  console.error("Lỗi không xử lý được:", e);
  process.exit(1);
});
