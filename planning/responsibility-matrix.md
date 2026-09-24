# Ma trận trách nhiệm pipeline dựng video

Tài liệu tham chiếu cố định: mỗi task trong pipeline do ai/gì đảm nhiệm. Khi phát sinh task mới hoặc cần đổi tier model, chỉ sửa file này (và `scripts/model-routing.json` nếu đổi model), không cần đổi kiến trúc.

Ký hiệu:
- **Claude** = xử lý trực tiếp trong session điều phối chính.
- **9router[tier]** = script gọi model qua 9router (`http://localhost:20128/v1`). Tier tra trong `scripts/model-routing.json`.
- **Local** = script/CLI chạy local, không gọi AI (ffmpeg, ffprobe, sharp, whisper.cpp, hyperframes CLI, remotion CLI/tsc/eslint cho archive...).

**HyperFrames là framework mặc định từ video 5 trở đi** (xem mục 6). 4 video đầu dùng Remotion,
giữ nguyên archive tại `archive/remotion-legacy/` — các ghi chú riêng Remotion trong tài liệu này
được đánh dấu rõ "(archive)".

**Repo sản xuất nhiều video.** Mọi script `02b/03/05/06/07-*.router.mjs` nhận tham số bắt buộc `--video=<slug>` (slug = tên ngắn không dấu, vd `ban-an-473-phan-1`), tự suy ra toàn bộ đường dẫn qua `scripts/lib/video-paths.mjs` (nguồn xác thực duy nhất cho convention đường dẫn — sửa 1 chỗ này nếu cần đổi cấu trúc thư mục). Nội dung riêng từng video nằm trong `videos/<slug>/` bên trong mỗi nhóm (`content/`, `public/`, `planning/`, `pipeline/`, `hyperframes/`); phần dùng chung (style DNA, script) nằm ở gốc mỗi nhóm.

## 1. Intake & Validation
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Lấy metadata audio (format, duration, sample rate) | Local | ffprobe |
| Lấy metadata ảnh/video nguồn | Local | ffprobe / sharp |
| Đọc & nắm cấu trúc script text | Claude | — |

## 2. Xử lý Audio
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Transcribe audio → text + timestamp thô | Local | whisper.cpp (`@remotion/install-whisper-cpp`) — audio tiếng Việt phải dùng model đa ngôn ngữ (`medium`/`large-v3`), không dùng bản `.en`. **Mặc định chạy CUDA từ 2026-09-24** (~5.6x nhanh hơn CPU, đã benchmark trên audio 460s thật; `WHISPER_CUDA=0` để quay lại CPU) — xem memory `whisper_cuda_manual_setup` để biết cách cài lại nếu thiếu |
| Convert whisper output → `Caption[]` chuẩn | Local | `toCaptions()` |
| Sửa lỗi chính tả/dấu câu transcript, giữ nguyên timestamp | 9router[text_cleanup] | `ag/gemini-3.8-flash-high` |
| Chuẩn hoá loudness, kiểm tra clipping/khoảng lặng | Local | ffmpeg loudnorm |

> Cần kiểm tra thực tế khi có audio thật: so sánh chất lượng transcribe tiếng Việt giữa whisper.cpp local vs. gửi thẳng audio cho `ag/gemini-3.8-flash-*` qua 9router (model hỗ trợ `audioInput` trực tiếp). Whisper.cpp cho timestamp đáng tin cậy hơn; quyết định chốt sau khi thử dữ liệu thật.

## 2b. Tạo ảnh/video minh hoạ tự động qua Google Flow
Thay bước tự tay tạo ảnh/video trong Google Flow rồi copy vào `public/videos/<slug>/media/`
— **không bắt buộc**, vẫn có thể tiếp tục copy tay như trước, đây chỉ là đường tự động thêm vào.

**Chạy song song với Nhánh A (mặc định đã kiểm chứng, video `ban-an-35-phan-1`, 2026-09-22):**
`02b-media-generate.router.mjs` chỉ đọc `vp.scriptFile` (script gốc), KHÔNG đọc `captionsFile` —
độc lập hoàn toàn với Stage 1 (whisper)/Stage 2 (align). Stage 3 (`03-media-analyze.router.mjs`)
cũng chỉ đọc `imagesDir`/`videosDir`, không đọc `captionsFile`. Vì vậy mặc định chạy 2 nhánh song
song: **Nhánh A** = Stage 1 → Stage 2 (ra `captions.json`); **Nhánh B** = Stage 2b → Stage 3 (ra
`manifest.json`) — Nhánh B có thể bắt đầu ngay, không chờ Nhánh A, và Stage 3 chạy ngay khi Stage
2b xong mà không cần đợi Nhánh A. Cả 2 nhánh phải xong trước khi chạy Stage 5 (`05-scene-plan.router.mjs`
đọc `vp.captionsFile` ở dòng 24) vì đây là điểm hợp nhất đầu tiên cần cả 2 output.

| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Chia kịch bản thành phân cảnh + viết prompt ảnh tiếng Anh (tỉ lệ số cảnh theo độ dài kịch bản) | 9router[scene_image_prompt_writer] | `ag/gemini-3.7-flash-medium` (đổi từ `ag/gemini-3.8-flash-high` qua POC B2, xem mục 9) |
| Quyết định hành động điều khiển trình duyệt (click/fill/scroll/wait/download/done/blocked) mỗi bước | 9router[browser_agent] | `ag/gemini-3.7-flash-medium` (đổi từ `ag/gemini-3.8-flash-high`, áp dụng trực tiếp cho video kế tiếp — CHƯA qua POC riêng, xem mục 9; theo dõi kết quả qua latency ghi trong `media-generate-log.md`), nhìn screenshot đánh số [N] + danh sách accessibility (ref `@eN`) |
| Thực thi hành động trên Chrome thật qua CDP | Local | `agent-browser` (Vercel Labs, binary native, gọi thẳng không qua shell) |
| Giải nén zip tải về (nếu có) + phân loại ảnh/video theo đuôi file vào đúng `imagesDir`/`videosDir`, chờ tất định (poll hệ thống file) cho tới khi tải thực sự xong trước khi phân loại | Local | `adm-zip` |

Script: `scripts/02b-media-generate.router.mjs --video=<slug> [--flow-account=<tên>] [--style-notes="..."] [--resume-project=<url>]`.
`--resume-project=<url>` mở lại project Flow đã tạo (URL tự lưu vào
`pipeline/videos/<slug>/flow-project.json` sau Giai đoạn 1 mỗi lần chạy), bỏ qua hẳn Giai đoạn
1+2, chỉ chạy Giai đoạn 3 (tải file) — dùng khi tải lỗi/thiếu file, tránh tốn credit tạo lại.
Log chi tiết từng bước → `pipeline/videos/<slug>/media-generate-log.md`; 1 dòng tóm tắt cuối → `pipeline/videos/<slug>/run-log.md` (đúng convention chung).

**Danh sách account Flow dự phòng — `scripts/flow-accounts.json`** (đọc qua
`scripts/lib/flow-accounts.mjs`, mirror `loadModelRouting()`): trường `priority` liệt kê thứ tự
ưu tiên thử account khi cần chuyển đổi. **Quy ước đặt tên:** giữ nguyên `default` (không đổi tên
thư mục đang hoạt động thật), account mới từ nay đặt tên tuần tự `flow-02`, `flow-03`, ... (bắt
đầu từ 02 vì `default` coi như #1). File chỉ nên liệt kê account THẬT SỰ đã đăng nhập thủ công
xong (xem gotcha "Hết credit/hạn mức" phía trên) — nếu file chưa tồn tại hoặc account mới chưa
kịp thêm vào, helper trả về mặc định an toàn `{ priority: ["default"] }`, không crash. Hiện tại
(2026-09-22) file đã có `["default", "flow-02", "flow-03"]` — `flow-02` = tài khoản Google
`taobaobinhthuan1405@gmail.com` ("binhthuan"), `flow-03` = `dtlcloud1@gmail.com` ("cloud1"), cả 2
đã đăng nhập thủ công xong và xác nhận có gói Google AI Pro (kiểm chứng qua đọc
`myaccount.google.com` bằng agent-browser, không suy đoán).

**Tạo profile mới / mở lại profile để đăng nhập, quản lý (không cần gõ lệnh tay):**
`scripts/flow-profile-open.bat [tên-account]` (double-click được; `-ListAccounts` để xem các
profile đã có) — tự tạo `pipeline/.flow-profile/<tên>/` nếu chưa có, mở đúng Chrome trỏ profile
đó tại flow.google.com, KHÔNG qua agent-browser. Vẫn phải tự đóng HẾT Chrome đang chạy (kể cả
nền) trước khi chạy nếu là lần đăng nhập ĐẦU TIÊN cho account đó — đã xác nhận thật
(2026-09-22): nếu Chrome cá nhân đang mở, `--user-data-dir` bị bỏ qua âm thầm và trang chỉ mở
thành 1 tab trong cửa sổ Chrome hiện có thay vì cửa sổ profile riêng.

**Bug thật đã sửa (2026-09-22) — double-click không tham số âm thầm mở NHẦM profile đang dùng
thật:** double-click file `.bat` trong File Explorer KHÔNG truyền được tham số dòng lệnh — bản
đầu tiên của script khi đó âm thầm mặc định về `"default"`. Hậu quả thật đã xảy ra: người dùng
double-click định tạo profile mới cho `flow-02` (account `binhthuan`), nhưng vì không gõ tham
số, script mở lại đúng profile `default` — vốn ĐÃ đăng nhập sẵn tài khoản `luu` (qua session
website, KHÔNG phải tài khoản cấp Chrome profile nên không có avatar/dấu hiệu trực quan nào cảnh
báo "profile này đã có người dùng"). Người dùng tưởng đây là cửa sổ trống nên đăng nhập
`binhthuan` vào đúng profile production `default` đang dùng thật, có nguy cơ ghi đè/trộn lẫn
session đang chạy thật. Đã sửa 2 lớp:
1. `flow-profile-open.bat`: nếu double-click KHÔNG kèm tên account, giờ HỎI LẠI ngay trong cửa
   sổ console (không âm thầm mặc định) — Enter rỗng = huỷ, không mở gì.
2. `flow-profile-open.ps1`: khi mở 1 profile ĐÃ CÓ SẴN (không phải profile mới tạo), in cảnh báo
   to màu đỏ "ĐÂY LÀ PROFILE ĐÃ CÓ SẴN — KHÔNG PHẢI PROFILE MỚI" trước khi mở Chrome.
3. Thêm sẵn 3 file double-click riêng biệt, không cần gõ gì, không thể nhầm account:
   `scripts/flow-profile-open-default.bat`, `scripts/flow-profile-open-flow-02.bat`,
   `scripts/flow-profile-open-flow-03.bat` — mỗi file hardcode đúng 1 tên account.

**Trạng thái cần xử lý sau sự cố (2026-09-22):** profile `default` hiện có thể đang lẫn/đã đổi
sang session `binhthuan` thay vì `luu` như trước — cần người dùng tự kiểm tra lại trên
flow.google.com (avatar tài khoản góc phải) trước khi chạy video sản xuất tiếp theo bằng
`--flow-account=default`, và dùng `scripts/flow-profile-open-flow-02.bat` (KHÔNG phải file
`.bat` chung) để thiết lập `flow-02` thật sự từ đầu.

**Đã thử và KHÔNG dùng được — tái sử dụng profile Chrome thật đã đăng nhập sẵn (2026-09-22):**
`agent-browser` có tính năng "Chrome Profile Reuse" (`--profile <tên>`, copy profile Chrome thật
thành bản snapshot tạm) tưởng chừng bỏ được bước đăng nhập thủ công. Đã thử THẬT với profile
`luudungofficial` (đã đăng nhập Google sẵn trên máy) qua cả 2 cách: (1) `--profile
"luudungofficial" --session ... --restore` mở flow.google.com, và (2) test cô lập không có
`--restore`, chỉ `--profile "luudungofficial"` mở thẳng `mail.google.com` (đúng ví dụ mẫu trong
README agent-browser) — CẢ 2 đều bị đá thẳng về trang đăng nhập Google trống trơn
(`accounts.google.com/v3/signin/...`), không nhận diện được tài khoản nào, dù đã đóng hết Chrome
trước khi copy. Kết luận: cookie/session copy qua `--profile` KHÔNG mang theo được trạng thái
đăng nhập Google thật trên máy này (nguyên nhân chưa rõ — có thể do Google chủ động vô hiệu hoá
session khi phát hiện tín hiệu trình duyệt khác, hoặc lỗi giải mã cookie khi copy sang thư mục
tạm khác owner/context). **Không thử lại hướng này** trừ khi có bằng chứng mới (vd agent-browser
bản mới sửa lỗi) — quay lại cách hiện tại: mỗi account Flow vẫn cần đăng nhập thủ công 1 lần qua
`scripts/flow-profile-open.bat`, không có cách rút ngắn bước này trên máy Windows hiện tại.
**Auto-fallback account khi gặp lỗi (D2/D3, đã cài đặt 2026-09-22):** `02b-media-generate.router.mjs`
giờ thử LẦN LƯỢT `candidateAccounts = [--flow-account (hoặc "default"), ...priority còn lại trong
flow-accounts.json]` — dừng ngay khi 1 account thành công. `attemptWithAccount(accountName,
{ skipResume })` bọc toàn bộ logic Giai đoạn 1-3, trả `{ ok: true }` hoặc `{ ok: false, result,
phaseName }` thay vì `process.exit()` trực tiếp, để vòng lặp ở `main()` quyết định có fallback
hay không.

Điều kiện kích hoạt fallback (hàm `shouldFallback()` + `classifyBlockedReason()`, mirror
`classifyFailure()` ở `07-codegen-hf-parallel.mjs`):
- `status: "blocked"` + lý do khớp từ khoá hết credit/hạn mức (`credit`, `quota`, `hạn mức`,
  `limit`, `exceeded`...) → **fallback**.
- `status: "blocked"` + lý do khớp từ khoá cần người (CAPTCHA, đăng nhập, xác minh bảo mật,
  2FA...) → **KHÔNG fallback** — account khác cũng cần xử lý thủ công riêng, đổi account không
  giải quyết được.
- `status: "blocked"` + lý do KHÔNG khớp khoá nào (`unknown`) → **KHÔNG fallback** (an toàn hơn
  khi chưa chắc account khác giải quyết được).
- `status: "error"` hoặc `"timeout"` → **fallback** (có thể do session/account cụ thể).
- `status: "page-closed"` → **KHÔNG fallback** (người dùng tự đóng cửa sổ hoặc lỗi kết nối
  nghiêm trọng, cần người xem trực tiếp, không tự ý mở hàng loạt profile mới).

Danh sách từ khoá là **suy đoán hợp lý, chưa có case thật nào xác nhận** câu `reason` thật khi
Flow báo hết credit (repo chưa gặp case này thật) — tinh chỉnh `classifyBlockedReason()` khi gặp
case thật đầu tiên thay vì đoán thêm bây giờ.

Khi fallback: đóng session hiện tại (`ab(["close"])`), dọn `STAGE_DIR` (tránh lẫn file dở dang
của account trước), log rõ account chuyển sang, rồi thử account kế tiếp. Account thứ 2 trở đi
LUÔN bỏ qua `--resume-project`/`--retry-animate` (project Flow gắn quyền theo tài khoản Google
đã tạo nó, account khác không truy cập được) — tự bắt đầu lại từ Giai đoạn 1, tự sinh lại prompt
ảnh qua cache `getScenePrompts()` (chỉ sinh 1 lần, dùng chung mọi account vì không phụ thuộc
account nào chạy). Hết toàn bộ `candidateAccounts` mà vẫn fail, hoặc gặp lý do không đáng
fallback: dừng hẳn, log đầy đủ lịch sử đã thử (account/giai đoạn/lý do từng lần).

**Trạng thái kiểm chứng (2026-09-22):** đã unit-test `classifyBlockedReason()`/`shouldFallback()`
với bảng case khớp đúng spec, và mô phỏng đầy đủ vòng lặp `main()` với 4 kịch bản (quota-fail rồi
fallback thành công, CAPTCHA không fallback, hết cả 3 account, chỉ 1 account thành công ngay) —
cả 4 PASS. Đã setup xong 2 account dự phòng thật (`flow-02`=binhthuan, `flow-03`=cloud1, xem mục
2b phía trên) và thêm vào `flow-accounts.json`. **CHƯA kiểm chứng end-to-end trên Flow thật** (cả
đường thành công lẫn đường fallback thật đều chưa chạy qua `02b-media-generate.router.mjs` thật)
— cần chạy trên video sản xuất kế tiếp, hoặc giả lập 1 điều kiện fail để buộc nhánh fallback
chạy, trước khi coi là đã kiểm chứng đầy đủ.

**Sự cố production cần cải tiến (video `su-kien-thien-an-mon`, 2026-09-22):** `flow-02` đã tạo
đủ 6 ảnh và đang tạo video; một clip video lỗi rồi retry làm pha `2-tao-chuyen-dong` chạm trần
25 bước. `runPhase()` trả `timeout`, và luật hiện tại (`status: "timeout"` → fallback) đã đóng
session `flow-02`, dọn stage tạm, mở `flow-03` rồi tạo lại từ Giai đoạn 1. Đây là fallback sai
ngữ cảnh: timeout sau khi một Flow project đã được tạo thành công không chứng minh account hiện
tại hỏng, trong khi project và các asset đang render chỉ truy cập được bởi chính account đó. Hậu
quả: tốn credit tạo lặp 6 ảnh trên `flow-03`, checkpoint `flow-project.json` bị ghi đè URL của
`flow-02`, và luồng download asset hợp lệ bị gián đoạn.

**Đã sửa (2026-09-23):** thêm `POST_PROJECT_PHASES` (Set chứa `"mo-project-resume"`,
`"2-tao-chuyen-dong"`, `"3-tai-file"`, `"3-tai-file-phan-loai"`) trong
`scripts/02b-media-generate.router.mjs` — `main()` kiểm tra tập này TRƯỚC `shouldFallback()`: nếu
`phaseName` của lần thử vừa fail nằm trong tập này (nghĩa là project Flow của account đó đã tồn
tại), dừng hẳn ngay, đọc lại checkpoint qua `readFlowProjectFile()` và in đúng lệnh
`--flow-account=<owner> --resume-project=<url>` (kèm `--retry-animate` nếu lỗi ở giai đoạn
"2-tao-chuyen-dong") — KHÔNG chuyển account khác, không tạo lại project từ đầu. Đã kiểm chứng bằng
bảng case mô phỏng (9/9 PASS): 4 case sau-khi-có-project đều dừng giữ checkpoint đúng, 2 case
trước-khi-có-project vẫn fallback bình thường như cũ, 1 case "không đáng fallback" vẫn dừng như cũ,
2 case `readFlowProjectFile()` đọc đúng file thật + trả `null` an toàn khi file không tồn tại.
**Chưa kiểm chứng end-to-end trên Flow thật** (không mô phỏng được `attemptWithAccount()`/browser
thật) — quan sát ở video sản xuất kế tiếp nếu gặp lại tình huống timeout/error sau khi project đã
tạo xong.

**Gotcha môi trường thật đã gặp khi setup (đọc trước khi debug lại, giống tinh thần đoạn
`--no-root-sync` ở mục 6):**
- Google chặn đăng nhập tương tác qua Chrome bị automation điều khiển (`navigator.webdriver`).
  Đăng nhập lần đầu cho MỖI tài khoản (`--flow-account=`) phải làm thủ công: đóng HẾT Chrome
  đang chạy (kể cả chạy nền không cửa sổ), mở Chrome thường (không qua agent-browser) trỏ
  `--user-data-dir` vào đúng `pipeline/.flow-profile/<tên tài khoản>/`, đăng nhập, đóng lại.
  Chi phí một lần/tài khoản — không lặp lại cho các lần chạy sau hay khi đổi qua lại giữa các
  tài khoản đã thiết lập sẵn.
- Windows Chrome's singleton-instance bỏ qua âm thầm `--user-data-dir` nếu ĐÃ có Chrome khác
  đang chạy (kể cả chạy nền) — chỉ ảnh hưởng bước đăng nhập thủ công nêu trên, KHÔNG ảnh hưởng
  các lần chạy tự động sau đó (agent-browser tự quản lý daemon/profile riêng).
- LUÔN dùng đường dẫn TUYỆT ĐỐI cho `--profile`/`--download-path` của agent-browser — nó chạy
  dạng daemon nền, giữ nguyên working directory của lần gọi đầu tiên.
- 2 nút "More options" dễ nhầm trên trang project Flow: nút cạnh mỗi ảnh ("More options for
  the project" → Rename/Trash/Delete, SAI) và nút ở thanh trên cùng gần avatar account
  ("More options" → Download project/..., ĐÚNG — dùng để tải cả project 1 lần dạng zip).
- Model có thể trả `done` ngay khi THẤY thông báo "bắt đầu tải" (vd "Downloading project..."),
  chưa phải lúc file tải xong thật (tải xuống trình duyệt không hiện trong page DOM/screenshot
  nên model không tự phán đoán chính xác được) — script tự chờ tất định bằng cách poll thư mục
  tải tạm (không còn `.crdownload`, danh sách file ổn định vài giây) trước khi phân loại, thay
  vì tin lời model.
- Hết credit/hạn mức tạo ảnh ở 1 tài khoản: thiết lập thêm 1 tài khoản Flow khác (đăng nhập thủ
  công 1 lần vào `--flow-account=<tên khác>`), rồi chỉ cần đổi flag đó ở lần chạy sau.
- Model từng bấm "Download project" khi 1 video trong project VẪN CÒN đang render, làm thiếu
  file trong zip tải về — đã thêm yêu cầu tường minh trong prompt giai đoạn 3: cuộn qua hết khu
  vực media xác nhận không còn item đang xử lý trước khi tải. Nếu vẫn gặp lại, dùng
  `--resume-project=<url>` (xem trên) để tải lại từ đúng project đó, không cần tạo lại từ đầu.
- Mỗi bước `action=wait` từng mặc định/trần khá dài (3000ms/15000ms), cộng thêm độ trễ gọi
  model cho bước kiểm tra tiếp theo khiến tổng thời gian chờ thực tế đo được ~16-23s/lần — đã
  rút xuống 2000ms/6000ms và yêu cầu model ưu tiên chờ ngắn, kiểm tra lại thường xuyên hơn.
- **Lỗi thật đã gặp (video "ban-an-473-phan-1", 2026-09-21): Flow Agent gộp toàn bộ N prompt
  thành 1 ảnh khổ NGANG 16:9 duy nhất** (kiểu minh hoạ "danh sách prompt"/collage nhiều cảnh
  trong 1 ô) thay vì tạo N ảnh dọc 9:16 riêng biệt như 2 video trước đó vẫn tạo đúng — nguyên
  nhân do `buildScenePromptListMessage()` gửi cả danh sách prompt gộp thành 1 tin nhắn duy nhất
  cho Flow Agent (AI ngoài tầm kiểm soát của repo) tự diễn giải cách tách ảnh, không có gì đảm
  bảo tất định. Hậu quả dây chuyền: bước tạo chuyển động (Giai đoạn 2) sau đó tạo video 9:16 từ
  đúng nguồn ảnh sai khổ ngang này (ép crop), nên cả ảnh lẫn video tải về đều dùng không được.
  Phát hiện bằng `ffprobe` đo width/height thật (KHÔNG cần xem ảnh trực tiếp) — 4 file cùng
  1376×768 dù tải 2 lần khác nhau, không phải lỗi tải thiếu file (khác gotcha phía trên). Đã sửa
  `buildScenePromptListMessage()`: nêu tường minh số ảnh chính xác cần tạo, khổ dọc 9:16, và cấm
  rõ ràng việc gộp nhiều cảnh vào 1 ảnh — nhưng vì Flow Agent vẫn là AI ngoài tầm kiểm soát, đây
  chỉ giảm rủi ro chứ không đảm bảo tuyệt đối; nếu tái diễn, kiểm tra lại bằng `ffprobe` (đúng số
  file + đúng tỉ lệ dọc) trước khi đi tiếp Giai đoạn 2, đừng chỉ tin log "done" của model.
- **Đã audit (2026-09-23) — lỗi "Chrome exited early (exit code: 0) without writing
  DevToolsActivePort" khi mở account "default"** (gặp thật ở video `ban-an-473-phan-3` và
  `su-kien-thien-an-mon`, KHÔNG gặp ở `ban-an-35-phan-1` chạy cùng ngày): đã đọc trực tiếp
  `attemptWithAccount()` — script chỉ gọi `ab open` ĐÚNG 1 LẦN/attempt, chạy tuần tự, luôn dùng
  đúng `PROFILE_DIR` theo account, không có vòng lặp mở lại nhiều lần → **không phải bug trong
  code router**. Nguyên nhân nhiều khả năng nhất: `user-data-dir` của profile "default" đang bị
  khoá bởi 1 tiến trình Chrome cũ/zombie chưa thoát hẳn (từ lần chạy trước bị ngắt giữa chừng,
  hoặc do double-click tay `flow-profile-open.bat` còn mở song song) — giải thích được vì sao
  không ổn định (chỉ xảy ra khi có tiến trình cũ tồn đọng tại đúng lúc chạy). Cơ chế fallback
  (`shouldFallback()`, `status: "error"` → fallback) đã xử lý ĐÚNG THIẾT KẾ, tự chuyển "flow-02"
  thành công ở cả 2 video — đây là lỗi tự phục hồi, mức độ thấp, **không cần sửa code**. Nếu tái
  diễn thường xuyên, kiểm tra Task Manager có tiến trình `chrome.exe`/`agent-browser*.exe` cũ còn
  sống trỏ đúng `pipeline/.flow-profile/default/` trước khi chạy lại.

## 3. Xử lý Media nguồn (ảnh/video)
Media tới đây từ Stage 2b (tự động qua Google Flow) hoặc copy tay như trước — cả 2 đường đều
đổ vào đúng `imagesDir`/`videosDir` không đổi, Stage 3 không cần biết nguồn gốc.

| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Trích metadata (resolution, duration, codec) | Local | ffprobe / sharp |
| Tạo contact sheet (lưới thumbnail để review) | Local | ffmpeg + sharp |
| Phân tích nội dung từng ảnh/video (mô tả, gắn tag, đánh giá dùng được, đề xuất đoạn cắt/khung hình) — 1 lời gọi/1 tier duy nhất, không tách 2 bước như bản tài liệu cũ | 9router[vision_media_analyze] | `ag/gemini-3.8-flash-high` |
| Thực thi cắt/crop/resize theo quyết định đã chọn | Local | ffmpeg |

## 4. Style DNA (khi nhận tài liệu style)
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Phân tích ảnh/video mẫu style (màu, texture giấy, cơ chế xé) | 9router[vision_qa] | `ag/gemini-3.8-flash-high` |
| Tổng hợp thành design tokens (text/JSON) | 9router[text_cleanup hoặc reasoning_generator nếu phức tạp] | — |
| Nạp trực tiếp `STYLE_DNA.md`/`style-tokens.json` vào prompt generator mỗi lần codegen (không có file theme trung gian như `theme.ts` bên Remotion) | Local | `scripts/07-codegen.hf.router.mjs` |

## 5. Lập kế hoạch nội dung
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Lập Scene Plan | 9router[reasoning_planning] | `ag/gemini-3.8-flash-high` (đổi từ `cx/gpt-5.6-sol` cùng đợt POC Stage 7, xem mục 6; tách tier riêng khỏi `reasoning_generator` của Stage 7 — cùng giá trị, khác key, để đổi model Stage 5/6 không ảnh hưởng Stage 7) |
| Lập Shotlist | 9router[reasoning_planning] | `ag/gemini-3.8-flash-high` |
| Đọc & chốt Scene Plan/Shotlist trước khi dựng code | Claude | — (text, không nặng context) |

## 6. Dựng video (code HyperFrames)
Mô hình **generator → verify → reviewer**, chạy trong script, Claude chỉ nhận báo cáo cuối. Kiến
trúc quan trọng (đã kiểm chứng qua Checkpoint D + Giai đoạn E, xem memory
`feedback_incremental_buildout`): **LLM chỉ sinh 1 composition STANDALONE** (`index.html`,
`composition-id="main"`, không biết gì về sub-composition/`<template>`) trong 1 project tạm
riêng mỗi scene (`hyperframes/.gen-tmp/<slug>-<sceneId>/`) — bắt LLM tự sinh đúng khuôn dạng
sub-composition trực tiếp đã bị bác bỏ vì làm giảm điểm khớp Style DNA rõ rệt.

| Bước | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| 1. Generate: composition standalone cho 1 scene, project tạm riêng | 9router[reasoning_generator] | script tự bundle skill docs HyperFrames + `STYLE_DNA.md`/`style-tokens.json` + shotlist |
| 2. Verify tự động | Local | `npx hyperframes check --json` chạy TRÊN PROJECT TẠM RIÊNG scene đó (cách ly hoàn toàn, không race khi song song) |
| 3. Review | 9router[reasoning_reviewer] | `ag/claude-sonnet-4-6` — verdict PASS/FAIL + danh sách lỗi |
| 4. Nếu FAIL: gửi lỗi lại generator, lặp bước 1–3 | Local orchestration | tối đa 3 lần trước khi escalate |
| 5. PASS: chuyển đổi tất định standalone → `compositions/scene-sNN.html`, ráp `index.html` | Local, tất định, KHÔNG AI | `scripts/lib/sync-root-hf-lib.mjs` (`standaloneToSubComposition()` + `syncRootHf()`) — gọi tự động, trừ khi `--no-root-sync` |
| 6. Ghi file + cập nhật `pipeline/videos/<slug>/run-log.md` | Local | — |
| 7. Hết lần vẫn FAIL, hoặc vấn đề mang tính sản phẩm | Claude | đọc code/log chi tiết để xử lý, sửa targeted bằng `--issue-file` |
| 8. PASS bình thường | Claude | chỉ đọc báo cáo ngắn, không đọc code |

`syncRootHf()` cũng tự sinh tất định `compositions/caption-track.html` từ `captions.json` mỗi
lần ráp (`scripts/lib/generate-caption-track-hf.mjs`, port đúng `applyFourWordPageBreaks()` +
`createTikTokStyleCaptions()` của `@remotion/captions`) và mount `<audio>` — không cần thao tác
tay cho bất kỳ video nào.

**Quy tắc bắt buộc (giữ nguyên từ bản Remotion): KHÔNG BAO GIỜ batch nhiều scene trong 1 lần gọi.** Luôn 1 scene/lần: `node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=SNN [--issue-file=...]`.

**Chạy song song nhiều scene — MẶC ĐỊNH cho mọi video từ 2 scene trở lên:**
`node scripts/07-codegen-hf-parallel.mjs --video=<slug> --scenes=S01,S02,...,SNN [--concurrency=10]` — mirror đúng worker-pool đã kiểm chứng bên Remotion (xem "Lịch sử: pipeline Remotion" bên dưới), nhưng AN TOÀN HƠN theo kiến trúc: mỗi scene HyperFrames sinh trong project tạm RIÊNG THƯ MỤC (không phải cùng chia sẻ `src/` như Remotion), nên không còn nhóm lỗi race-condition-verify-quét-nhầm-file từng gặp bên Remotion. Khi TẤT CẢ scene PASS, script tự gọi `syncRootHf()` ráp `index.html`.

**Đã kiểm chứng thật lần đầu ở quy mô lớn (video "ban-an-473-phan-1", 2026-09-21, 14 scene, concurrency=10):** 13/13 scene (S02-S14) PASS trong ngân sách tự động retry (đa số 1 lần, S03/S08 2 lần, S14 3 lần), không cần `--issue-file` can thiệp tay, 0 lỗi mạng/timeout — kết quả tốt hơn cả mốc Remotion (15/16). Trước khi vào vòng song song, S01 (chạy riêng để bootstrap) fail 3 lần đầu do 2 gotcha thật của HyperFrames chưa từng gặp bên Remotion (contrast WCAG AA không đạt, `querySelector` dùng template literal khiến bundler crash) — đã vá vào `KNOWN_GOTCHAS_HF` trong `scripts/07-codegen.hf.router.mjs`, PASS ngay sau đó.

**`KNOWN_GOTCHAS_HF`** (trong `scripts/07-codegen.hf.router.mjs`) là nơi tích luỹ mọi lỗi
HyperFrames-cụ-thể tổng quát hoá được (contrast, template-literal selector, quy tắc file ảnh
"cutout"...) — khi Claude xử lý escalation hoặc phát hiện lỗi lặp lại qua `pipeline/codegen-issues.jsonl` (field `framework: "hyperframes"`, dùng chung với Remotion), thêm gotcha mới vào đây thay vì chỉ sửa 1 lần cho scene đang lỗi.

**LƯU Ý khi tra `pipeline/codegen-issues.jsonl`**: file này CHIA SẺ giữa MỌI video, chỉ ghi thêm
không bao giờ bớt (đo thật 2026-09-25: 384 dòng/844KB cho ~13 video, ~50-70KB/video) — TUYỆT ĐỐI
không `Read`/`cat` trọn file khi nó đã lớn, luôn truy vấn CÓ LỌC (`node -e` parse từng dòng JSON lọc
theo `video`/`scene`, hoặc `jq`) để không tốn token oan đọc dữ liệu của video khác không liên quan.

**Bug thật đã sửa ở tầng ráp (`sync-root-hf-lib.mjs`), áp dụng cho MỌI video:** CSS `.clip` (style mọi slot `data-composition-src` trong `index.html`) phải có `isolation: isolate` — thiếu dòng này, z-index dùng NỘI BỘ trong 1 scene có thể thoát stacking context và đè lên slot khác (kể cả `caption-track` dù luôn nằm sau trong DOM). Xem memory `feedback_incremental_buildout` bài học #5 để biết đầy đủ cách phát hiện + tại sao track-index không liên quan.

**Bug render TRỐNG HÌNH (S23/S47, video `cach-hoat-dong-cua-kinh-te-meo`) — CONFIRMED thật nhưng
nguyên nhân gốc CHƯA xác định được, KHÔNG có chặn tự động (điều tra 2026-09-24):**
- **Đã confirmed thật** (qua vision QA/điều tra trực tiếp, không phải suy đoán): CHỈ S23 và S47
  render trống dù `hyperframes check` PASS hoàn toàn — đã sửa bằng regenerate Stage 7 (commit
  `2a31aab`).
- **Đính chính 1 lỗi tài liệu đã tự lan truyền:** bản ghi trước đó của mục này từng nói S38 cũng
  "CONFIRMED trống qua vision QA" — SAI, đã kiểm tra lại và không có căn cứ. Theo
  `planning/README.md:180` (nhật ký build gốc), S38 thực ra là 1 trong 3 báo động giả của reviewer
  (cùng S25/S27) — `hyperframes check` thực tế hoàn toàn sạch, không hề có bằng chứng trống hình.
  Không có file nào trong repo ghi nhận từng chạy vision QA trên S38. Claim sai này tự nó bắt nguồn
  từ 1 tài liệu kế hoạch trước đó mà Claude tin theo mà không kiểm chứng lại bằng dữ liệu thật
  trong repo — bài học: luôn tra lại nguồn gốc (`run-log.md`/`planning/README.md`/`codegen-issues.jsonl`)
  trước khi ghi 1 claim "đã confirmed" vào tài liệu dự án, không chép lại nguyên văn từ kế hoạch cũ.
- **Giả thuyết ban đầu (rút ra từ bisection HẸP, chỉ trong phạm vi S23/S47) đã bị bác bỏ khi kiểm
  chứng rộng hơn trên cả 51 scene bằng regex tất định:**
  - Pattern "1 tween GSAP full-duration + `ease:\"none\"` trên hero": khớp 30/51 scene (59%), gồm
    cả S24/S31 — 2 scene đã xác nhận render TỐT trước đó. Đây là kỹ thuật Ken Burns pan/zoom
    chuẩn dùng khắp video, KHÔNG phải chỉ báo lỗi.
  - Pattern CSS `perspective`/`transform-style: preserve-3d`: khớp 3/51 scene (S13, S32, S38).
    Sau khi đính chính S38 ở trên, KHÔNG còn scene nào trong 3 ca này có bằng chứng thật là trống
    hình — S13/S32 người dùng tự xem video xác nhận bình thường, S38 là báo động giả reviewer.
    Pattern này KHÔNG phải chỉ báo đáng tin.
- **Kết luận:** nguyên nhân gốc thật của lỗi render trống ở S23/S47 chưa xác định được ở mức
  pattern cấu trúc tất định — có thể là lỗi hiếm/ngẫu nhiên (timing, headless Chrome/GPU capture),
  không phải quy tắc code cụ thể có thể chặn bằng regex. Đã thử viết code chặn tĩnh cho
  `scripts/lib/hf-check.mjs`/`07-codegen.hf.router.mjs`/`07b-integration-check.hf.mjs` rồi
  **revert lại hoàn toàn** vì false-positive quá cao (sẽ chặn nhầm phần lớn scene hợp lệ tương
  lai).
- **Quyết định (người dùng, 2026-09-24):** KHÔNG đầu tư thêm công cụ/điều tra lúc này — chỉ ghi
  chú lại để theo dõi thủ công. Nếu lỗi render-trống tái diễn ở video khác hoặc tần suất tăng lên,
  audit lại từ đầu (không dựa trên 2 giả thuyết đã bác bỏ này). Không mở lại việc sửa/điều tra
  S13/S32/S38.

> **Sự cố cụ thể (2026-09-22) — đã chuyển sang `planning/incident-log.md`** (mục "Sự cố integration CSS sau Stage 7 — video su-kien-thien-an-mon").

### Model generator/reviewer — đã đổi qua POC kiểm chứng (2026-09-22)

Trước đây dùng `cx/gpt-5.6-sol` (generator) + `cx/gpt-5.6-sol-review` (reviewer). Đã chạy POC
song song 5 cặp model × 3 scene thật của video "ban-an-473-phan-1" (S01 phức tạp/từng fail thật,
S04 đơn giản/text-only, S06 trung bình) để tìm model rẻ/nhanh hơn nhưng chất lượng tương đương —
xem đầy đủ dữ liệu + phương pháp tại `poc/hyperframes/codegen-poc.mjs` (đã tham số hoá
`--video=`/`--gen-model=`/`--review-model=`/`--gen-max-tokens=`/`--review-max-tokens=`),
`poc/hyperframes/score-render.mjs` (rubric chấm điểm 1-10, tái dùng được cho lần audit sau), và
kết quả thô tại `poc/hyperframes/poc-results/model-compare/`.

**Kết quả (PASS/3 scene, tổng 3 scene):**

| Cặp | PASS | Tổng attempts | Tổng token | Tổng thời gian | Điểm chấm TB |
|---|---|---|---|---|---|
| `ag/gemini-3.1-pro-low` + `ag/claude-sonnet-4-6` | 0/3 ❌ | 9 | 424K | 1052s | — (loại) |
| `cx/gpt-5.6-sol` + `cx/gpt-5.6-sol-review` (cũ) | 3/3 | 6 | 205K | 1325s | 6.00 |
| **`ag/gemini-3.8-flash-high` + `ag/claude-sonnet-4-6` (MỚI, mặc định)** | 3/3 | 6 | 322K | 509s (2.6x nhanh hơn) | **6.33** |
| `ag/gemini-3.8-flash-high` + `ag/gemini-3.8-flash-high` (tự chấm điểm mình) | 3/3 | 7 | 370K | 581s (2.3x nhanh hơn) | 6.00 |
| `ag/gemini-3.8-flash-high` + `ag/gpt-oss-120b-medium` | 3/3 | 5 (ít nhất) | 254K | 438s (3x nhanh hơn) | 6.00 |

**Kết luận:**
- **Thời gian**: xác nhận tiết kiệm thật, cả 3 cặp dùng `gemini-3.8-flash-high` làm generator đều
  nhanh hơn baseline 2.3-3 lần (latency ẩn của reasoning phía `cx/gpt-5.6-sol` rất cao dù token
  không nhiều hơn).
- **Token/chi phí $**: KHÔNG xác nhận được là rẻ hơn — các cặp Gemini dùng NHIỀU token hơn
  baseline (205K → 254-370K). 9router `/v1/models` không trả đơn giá, không có cách kiểm chứng
  chi phí $ thật từ trong repo — cần tự kiểm tra dashboard nhà cung cấp nếu muốn biết chính xác.
- **Chất lượng hình ảnh**: ngang nhau giữa 4 cặp PASS (6.00-6.33, chấm bằng `score-render.mjs`
  so với chính scene đó ở video 5 đã duyệt) — không có bằng chứng model rẻ hơn làm giảm chất
  lượng.
- **`ag/gemini-3.1-pro-low` KHÔNG phù hợp vai trò generator** — fail cả 3/3 scene kể cả scene
  đơn giản nhất (text-only), trái với dự đoán ban đầu dựa trên capability (context/reasoning) —
  bài học: capability số liệu không thay thế được kiểm chứng thật trên đúng task.
- **Cặp tự-chấm-điểm-mình** (`gemini-3.8-flash-high` làm cả 2 vai) chạy được nhưng kém hiệu quả
  nhất trong 3 cặp thành công (nhiều attempts/token nhất) — dùng được khi cần nhưng không phải
  lựa chọn tối ưu.
- Người dùng đã tự xem 12 bản render POC (`pipeline/.cache/model-compare-renders/`, không commit
  — tái tạo được bằng cách chạy lại POC) và xác nhận đạt trước khi đổi.

**Xếp hạng fallback (đổi thủ công bằng cách sửa `scripts/model-routing.json`, không có cơ chế tự
động — xem `feedback_incremental_buildout`):**
- **Generator**: 1) `ag/gemini-3.8-flash-high` (mặc định) → 2) `cx/gpt-5.6-sol` (=
  `reasoning_generator_alt` trong `model-routing.json`, chậm hơn nhưng đã kiểm chứng chắc chắn
  chạy được). KHÔNG dùng `ag/gemini-3.1-pro-low` (đã loại). Chưa có lựa chọn #3 đã kiểm chứng —
  cần POC riêng nếu muốn thêm (vd `ag/gemini-pro-agent`, chưa test).
- **Reviewer**: 1) `ag/claude-sonnet-4-6` (mặc định) → 2) `ag/gpt-oss-120b-medium` (rẻ/nhanh nhất,
  chất lượng tương đương) → 3) `ag/gemini-3.8-flash-high` (tự chấm điểm mình — dùng được nhưng
  kém hiệu quả nhất) → 4) `cx/gpt-5.6-sol-review` (cũ, dự phòng cuối cùng).

**2 gotcha mới phát hiện qua POC** (đã thêm vào `KNOWN_GOTCHAS_HF`, chưa từng gặp với
`cx/gpt-5.6-sol`): `gsap_relative_value_second_writer` (giá trị GSAP tương đối `+=N` xung đột
writer khác cùng thuộc tính) và `text_occluded` (chữ bị phần tử khác che khuất) — cả 2 đều tự sửa
được trong ngân sách 3 lần thử, không cần can thiệp tay, nhưng theo dõi qua
`pipeline/codegen-issues.jsonl` nếu tái diễn nhiều.

**Nghi vấn chưa xác nhận 100% (video "ban-an-473-phan-2", scene S13, 2026-09-22) — đốm cam nhỏ
lạc trên silhouette nhân vật:** người dùng xem preview phát hiện 1 đốm tròn cam ⌀10-12px đè lên
thân silhouette "Sơn". Xác nhận toạ độ chính xác qua vision agent (x≈428, y≈742 trên khung
1080×1920, nằm giữa ngực/sườn silhouette). Đối chiếu code `compositions/scene-s13.html`: nhân vật
dùng kỹ thuật 2-layer SVG "cutout" phổ biến trong style DNA (`.shadow-layer` màu cam `#ff7a1a`
đặt `top:10px; left:10px` lệch phía sau `.front-layer` màu đen cùng path) để tạo hiệu ứng đổ bóng
giấy — **nghi vấn cao nhất nhưng CHƯA xác nhận qua debug trực tiếp** (chưa thử tắt từng layer để
kiểm chứng): tại các đoạn path có độ cong lớn (cổ/vai nơi phần đầu path và phần thân path nối
nhau), phần lệch offset 10px của `.shadow-layer` có thể lộ ra ngoài viền `.front-layer` thành 1
đốm cam nhỏ tách biệt thay vì bị che khuất hoàn toàn như phần còn lại. Nếu gặp lại ở video sau
(cùng kỹ thuật 2-layer shadow cho silhouette nhân vật), kiểm tra bằng cách tạm ẩn `.front-layer`
để xem `.shadow-layer` lộ ra ở đâu, rồi cân nhắc giảm offset hoặc dùng `clip-path`/mask thay vì
2 SVG chồng lệch.

## 7. Preview & QA
**QUAN TRỌNG (làm rõ 2026-09-22 sau khi Claude hiểu nhầm và tự ý làm sai — xem bài học bên dưới):
đây KHÔNG PHẢI bước bắt buộc chạy tự động cho mọi video.** Sau khi Stage 6 xong và
`hyperframes check` trên project đã ráp sạch lỗi (ok=true), đi thẳng sang Stage 8 (Render).
Chỉ dùng preview/snapshot khi CÓ lý do cụ thể cần nó: đang debug trực tiếp 1 vấn đề đã biết,
người dùng yêu cầu xem trước, hoặc lần đầu áp dụng kỹ thuật/kiến trúc mới chưa từng kiểm chứng.
Chạy mặc định mỗi video là lãng phí token/thời gian vô ích — không phải video nào cũng có vấn đề
sau Stage 6/7.

| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Preview (chỉ khi cần debug/người dùng yêu cầu xem) | Local | `npx hyperframes preview --background` (xem `hyperframes/videos/<slug>/CLAUDE.md`) |
| Kiểm tra hình ảnh preview có khớp ý đồ/style không (chỉ khi cần, KHÔNG mặc định) | 9router[vision_qa] | `hyperframes snapshot` chụp vài frame gửi review, trả nhận xét text — KHÔNG Claude tự xem |
| Sửa code theo phản hồi QA | Claude (hoặc quay lại bước generate ở Stage 6 nếu là lỗi code) | — |

## 8. Render
**Chạy ngay sau khi Stage 6 xong (`hyperframes check` project đã ráp ok=true), không cần bước
Preview/QA riêng ở giữa** (xem ghi chú mục 7).

| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Render video cuối (chỉ khi được yêu cầu rõ) | Local | `node scripts/09-render.hf.mjs --video=<slug>` — wrapper tất định (2026-09-23), preflight assertion từ chối lệch `--quality`/output convention trừ khi có `--force-non-default`. KHÔNG gõ tay `npx hyperframes render` thô (xem sự cố mục "Nhật ký audit" bên dưới). |
| Kiểm tra file render (duration, resolution, không lỗi) | Local | ffprobe — đã tích hợp tự động vào `scripts/09-render.hf.mjs`, không cần chạy tay |
| Xác nhận nội dung hiển thị đúng (vd phụ đề, hiệu ứng xuyên suốt) — CHỈ khi có lý do nghi ngờ cụ thể (không mặc định mọi video) | 9router[vision_qa] | trích frame bằng ffmpeg tại nhiều mốc + gửi vision agent — bài học thật (video 5): `hyperframes check` PASS không đảm bảo mọi lớp nội dung THỰC SỰ hiển thị (vd bug stacking-context ở mục 6). Đây là ghi chú cho 1 trường hợp cụ thể đã xảy ra, KHÔNG phải quy tắc bắt buộc tự động cho mọi video. |

**Bài học thật (video "ban-an-473-phan-2", 2026-09-22):** sau khi Stage 6 xong và `hyperframes
check` đã ok=true, Claude tự ý mở `hyperframes preview --background` (không ai yêu cầu xem) và
tự chụp snapshot + gửi 9router[vision] để "tự QA" toàn bộ 18 scene trước khi render — người dùng
chỉ rõ đây là hiểu sai pipeline: (1) không có yêu cầu nào cho việc mở preview cho người dùng xem,
(2) bước xác minh bằng vision agent ở mục 8 chỉ là ghi chú từ 1 lần xảy ra vấn đề thật (video 5,
phụ đề thiếu), không phải bước mặc định bắt buộc tự động — làm vậy mỗi video là tốn token vô ích.
**Áp dụng từ nay:** sau Stage 6 sạch lỗi → Render thẳng (Stage 8) → chỉ verify bằng
ffprobe (bắt buộc, rẻ) → vision agent CHỈ khi người dùng report vấn đề cụ thể sau khi xem, hoặc
Claude có nghi ngờ rõ ràng dựa trên bằng chứng cụ thể (không phải "để chắc ăn").

> **Nhật ký audit chi tiết (2026-09-22, session ban-an-35-phan-1) — đã chuyển sang `planning/incident-log.md`.**

> **Audit end-to-end video "ha-noi-cam-xe-may" (2026-09-24/25) — đã chuyển sang `planning/incident-log.md`.**

> **Audit worktree Kilo Code (2026-09-25) — đã chuyển sang `planning/incident-log.md`.**

## 9. Theo dõi POC đổi model tier sang biến thể rẻ hơn (2026-09-22)

Các model `-flash-medium` dưới đây **chưa từng được test ở đâu trong repo** — theo văn hoá dự án
(không suy đoán từ capability, luôn POC thật trên đúng task trước khi đổi đại trà; xem bài học
`ag/gemini-3.1-pro-low` bị loại dù "tốt hơn trên giấy" ở mục 6). Cột "Trạng thái":
chưa POC / đang POC / PASS-đã đổi / FAIL-giữ nguyên.

| Tier | Stage | Model hiện tại | Model ứng viên | Trạng thái |
|---|---|---|---|---|
| `text_cleanup` | 2 | `ag/gemini-3.7-flash-medium` (đã đổi) | dự phòng: `ag/gemini-3.8-flash-medium` = `text_cleanup_alt` | **PASS-đã đổi** — xem POC B1 dưới |
| `scene_image_prompt_writer` | 2b | `ag/gemini-3.7-flash-medium` (đã đổi) | dự phòng: `ag/gemini-3.8-flash-medium` = `scene_image_prompt_writer_alt` | **PASS-đã đổi** (người dùng đã tự xem 2 bản prompt và xác nhận) — xem POC B2 dưới |
| `browser_agent` | 2b | `ag/gemini-3.7-flash-medium` (đã đổi) | dự phòng: `ag/gemini-3.8-flash-medium` = `browser_agent_alt`, hoặc revert về `ag/gemini-3.8-flash-high` | **đang theo dõi (Nhóm C)** — theo quyết định người dùng, KHÔNG POC riêng, áp dụng thẳng cho video sản xuất kế tiếp. `runPhase()` trong `02b-media-generate.router.mjs` đã ghi latency thật (`model: NNNms`) vào `media-generate-log.md` mỗi bước (2026-09-22) để so sánh với baseline ~7-10s/lần đo trước đó — kiểm tra log này sau khi video kế tiếp chạy xong Stage 2b. Nếu kết quả kém rõ rệt (nhiều `blocked`/`timeout`/lặp hành động bất thường so với các lần trước): revert `browser_agent` về `ag/gemini-3.8-flash-high`, ghi lý do vào đây. |
| `vision_media_analyze` | 3 | `ag/gemini-3.8-flash-high` | `ag/gemini-3.8-flash-low` (= `vision_media_analyze_alt`, đã tồn tại thật trong repo — khác rủi ro so với `-flash-medium` hoàn toàn chưa test) | **FAIL-giữ nguyên** — xem POC B3 dưới |

### Kết quả POC B1 — `text_cleanup` (2026-09-22, video "ban-an-473-phan-2", chế độ align-với-script, 504 từ)

So sánh chéo bằng cách chạy LẠI baseline `ag/gemini-3.8-flash-high` trên đúng input để có mốc so
sánh công bằng (bản production đã lưu chỉ là 1 lần chạy, không đại diện đủ cho biến thiên tự
nhiên của model): bản baseline mới chạy khác bản production đã lưu tới 42/504 từ (8.3%, chỉ lệch
timestamp vài chục-vài trăm ms, không lệch nội dung chữ) — CHÍNH bản thân 1 model chạy 2 lần khác
nhau đã tạo ra mức nhiễu nền này. `ag/gemini-3.7-flash-medium` khác baseline mới 35/504 từ,
`ag/gemini-3.8-flash-medium` khác 47/504 từ — cả 2 đều nằm trong đúng dải biến thiên tự nhiên đó,
không phải dấu hiệu giảm chất lượng. Nội dung chữ (text) luôn khớp 100% với script gốc ở cả 3 lần
chạy (chế độ align bắt buộc dùng đúng câu chữ script, không có chỗ cho model paraphrase).

Về tốc độ: `-medium` nhanh hơn rõ rệt mỗi lần gọi (27-60s/lần so với 69-103s/lần của
`flash-high`), dù cả 3 đều bị tràn token (`finish_reason=max_tokens`) ở đoạn 504 từ và phải tự
chia nhỏ đệ quy (baseline 5 lần gọi/443s tổng, `-medium` 7 lần gọi/236-243s tổng) — hiện tượng
tràn token này là đặc tính của prompt/độ dài transcript, không phải nhược điểm riêng của
`-medium`.

**Kết luận: PASS.** Đề xuất `text_cleanup` → `ag/gemini-3.7-flash-medium` (nhỉnh hơn
`3.8-flash-medium` cả về tốc độ lẫn độ lệch).

### Kết quả POC B2 — `scene_image_prompt_writer` (2026-09-22, video "ban-an-473-phan-2")

Cả 2 model tuân thủ đúng cấu trúc prompt bắt buộc (mở đầu, kết thúc, mô tả chất liệu giấy) và giữ
nhất quán mô tả ngoại hình nhân vật xuyên suốt các cảnh lặp lại (đúng yêu cầu quan trọng nhất của
prompt). Số cảnh tự chia khác nhau giữa 2 lần chạy (10 cảnh với `flash-high` mới chạy, 7 cảnh với
`3.7-flash-medium`) — nhưng bản THẬT của video này khi sản xuất cũng ra đúng 7 cảnh, cho thấy số
cảnh vốn biến thiên tự nhiên giữa các lần chạy CÙNG 1 model, không phải chỉ báo chất lượng. Nội
dung/độ chi tiết prompt tiếng Anh ở mức tương đương giữa 2 model qua đọc mắt.

**Kết luận: PASS, nhưng đây là văn bản sáng tạo (đọc mắt chủ quan) — đề nghị người dùng tự xem lại
2 file kết quả trước khi chốt áp dụng chính thức** (đã lưu tạm, xem phần báo cáo cuối).

### Kết quả POC B3 — `vision_media_analyze` (2026-09-22, video "ban-an-473-phan-2", 3 ảnh: sơ đồ tổ chức, ảnh cutout nhân vật, ảnh cắt dán quán cà phê)

Cả 2 model đều cho `visual_language`/`suggested_slug`/`suitability_notes` hợp lý, mô tả tổng thể
đúng bối cảnh/hành động. NHƯNG phát hiện khác biệt thật đáng lưu ý: `ag/gemini-3.7-flash-medium`
có xu hướng **bỏ sót chi tiết chữ/số cụ thể đọc được TRONG ảnh** mà `flash-high` bắt đúng — ảnh sơ
đồ tổ chức: `flash-high` nêu đúng tên nhân vật "Tiến/Sơn/Đức Huy" đọc từ chữ trong ảnh, `-medium`
mô tả đúng cấu trúc nhưng bỏ sót tên; ảnh quán cà phê: `flash-high` đọc đúng số tiền "250k/350k"
ghi trên giấy trong ảnh, `-medium` chỉ nói chung "vẽ sơ đồ tính toán số tiền" không có số cụ thể.
Khả năng đọc text-trong-ảnh (OCR-như) của `-medium` yếu hơn rõ rệt so với `flash-high`.

**Kết luận: FAIL-giữ nguyên `ag/gemini-3.8-flash-high`.** Mô tả tổng thể vẫn dùng được (không chặn
việc chọn ảnh minh hoạ), nhưng mất chi tiết cụ thể là rủi ro thật cho tác vụ này (mô tả càng chi
tiết càng hữu ích cho các giai đoạn sau tra cứu bằng manifest) — không đáng đánh đổi để tiết kiệm
chi phí ở 1 tier chỉ chạy 1 lần/video (không lặp nhiều lần như `browser_agent`).

## Lịch sử: pipeline Remotion (archive, 4 video đầu — KHÔNG áp dụng cho video mới)

Giữ nguyên để tham khảo/sửa lỗi cho `archive/remotion-legacy/`.

Mô hình generator → verify → reviewer y hệt tinh thần mục 6, nhưng: generate ghi file scene
`src/videos/<slug>/scenes/SceneNN.tsx`; verify chạy `tsc --noEmit` + `eslint` + render smoke-test
(`npx remotion render <CompositionId>` đúng dải frame scene — bắt lỗi runtime-only như
`interpolate()` output-range sai); ráp `src/Root.tsx` tất định qua
`archive/remotion-legacy/scripts/lib/sync-root-lib.mjs`.
Agent qua 9router không tự có quyền truy cập skill Remotion — script phải tự đọc file skill
(`remotion-best-practices`, `remotion-markup`, `remotion-create/video-layout.md`,
`remotion-interactivity`, `remotion-captions/display-captions.md`) và nhét vào prompt.

`theme.ts` (`src/styles/theme.ts`) và component dùng chung (`src/components/*`) do generator
tạo/mở rộng CHỈ MỘT LẦN CHO CẢ REPO (video đầu tiên tạo nền tảng, các video sau tái sử dụng).

**Quy tắc không batch nhiều scene** — đã kiểm chứng: request càng nhiều scene, model sinh càng
nhiều token, thời gian gọi cộng dồn dễ vượt timeout mạng (`fetch failed`/`HeadersTimeoutError`),
KHÔNG phải do máy quá tải khi render smoke-test.

**Chạy song song mặc định ≥2 scene**: `archive/remotion-legacy/scripts/07-codegen-parallel.mjs --video=<slug> --scenes=... [--concurrency=10]`, worker-pool, mỗi tiến trình con `--no-root-sync`.

**Bug thật đã sửa (video "tham-hoa-itaewon-phan-2", 16 scene, concurrency=3):** `--no-root-sync`
KHÔNG loại bỏ hoàn toàn race condition như từng tưởng — `verify()` vẫn chạy `tsc`/`eslint --fix`
trên TOÀN BỘ `src/`, nên verify() của 1 scene có thể đọc/ghi đè nhầm file scene KHÁC đang sinh dở
cùng lúc (xác nhận thật: lỗi verify S01 nằm trong file `Scene03.tsx`). Sửa: `verify()` scope
`eslint` đúng file vừa ghi, lọc output `tsc` chỉ giữ lỗi đúng file đó.

**Render smoke-test KHÔNG chạy trong luồng song song mặc định** — chỉ chạy khi `archive/remotion-legacy/scripts/07-codegen.router.mjs` chạy TUẦN TỰ (video 1). Luồng song song (video 3/4) không render thử trong lúc codegen; an toàn runtime dựa vào review + render final + `codegen-issues.jsonl`.

**Concurrency mặc định = 10** (nâng từ 3, kiểm chứng 2026-09-20): 16 scene, 15/16 PASS, 0 lỗi
mạng/timeout. 5/16 scene lỗi `tsc: Cannot find module` sai ở lần thử đầu (tranh chấp I/O cục bộ
Windows khi 10 tiến trình `npx tsc`/`npx eslint` đồng thời), tự PASS lần 2 — chấp nhận đổi lấy
tốc độ.

**Log lỗi codegen dùng chung Remotion + HyperFrames — `pipeline/codegen-issues.jsonl`** (field
`framework` phân biệt): mỗi attempt FAIL được ghi 1 dòng JSON `{ts, video, scene, attempt, stage,
detail}` — dùng để audit định kỳ tìm lỗi lặp lại, đưa vào `KNOWN_GOTCHAS`/`KNOWN_GOTCHAS_HF`
tương ứng.

Chỉ chạy song song scene CỦA CÙNG 1 VIDEO; không chạy song song 2 video nếu cả hai cần MỞ RỘNG
`theme.ts`/component dùng chung cùng lúc (race ở lớp dùng-chung — xử lý tuần tự hoặc merge tay).

### Tối ưu render Remotion
Đã đo thật `Config.setConcurrency(4)` trong `remotion.config.ts` — xem chi tiết đầy đủ (benchmark, kết luận) tại `planning/README.md` mục "Archive: pipeline Remotion cũ".

## Ghi chú vận hành: không tự tạo file lưu-lịch-sử thủ công
Từ khi repo đã có git backup (2026-09-20), **không** tạo thêm file kiểu "trước-khi-sửa"/"v1"/"v2" trong `pipeline/videos/<slug>/*-history/` mỗi lần sửa lỗi hay chạy lại một bước — git đã lưu đúng việc này tốt hơn (`git log`, `git diff <commit> -- <file>`, `git show <commit>:<file>`). Việc này tránh cộng dồn số file vô hạn theo mỗi vòng sửa lỗi của mỗi video khi sản xuất hàng loạt. Các file lịch sử đã có sẵn trong `pipeline/scene-plan-history/` (tạo trước khi có git) được giữ nguyên, không cần dọn.

## Điều phối / Báo cáo (xuyên suốt)
| Task | Ai/gì đảm nhiệm |
|---|---|
| Quyết định bước kế tiếp, chọn đúng script + model/tier | Claude |
| Cập nhật `pipeline/videos/<slug>/run-log.md` sau mỗi bước | Claude / script |
| Báo cáo tiến độ, xin xác nhận khi cần | Claude |

## Quy ước đặt tên script
`scripts/<số-thứ-tự>-<giai-đoạn>-<tên-task>.<owner>.mjs`, ví dụ thực tế trong repo:
- `scripts/01-audio-transcribe.local.mjs`
- `scripts/02-audio-clean-transcript.router.mjs`
- `scripts/02b-media-generate.router.mjs` (tạo ảnh/video qua Google Flow — xem mục 2b; số thứ
  tự có hậu tố "b" vì chèn thêm sau khi 02/03 đã tồn tại, không renumber các script cũ)
- `scripts/03-media-analyze.router.mjs`
- `scripts/05-scene-plan.router.mjs`
- `scripts/06-shotlist.router.mjs`
- `scripts/07-codegen.hf.router.mjs` — codegen HyperFrames, mặc định từ video 5 (xem mục 6)
- `scripts/07-codegen-hf-parallel.mjs` (local, không gọi AI trực tiếp — orchestrator worker-pool, mặc định cho ≥2 scene, xem mục 6)
- `scripts/08-sync-root.hf.mjs` (local, không gọi AI — CLI ráp `index.html` thủ công, thường không cần gọi riêng vì `07-codegen-hf-parallel.mjs` đã tự gọi khi xong)
- `scripts/lib/generate-caption-track-hf.mjs` (local, không gọi AI — sinh `caption-track.html` tất định, gọi tự động bởi `syncRootHf()`)
- Hậu tố `.hf.`/`-hf-` phân biệt nhánh HyperFrames.

Archive (Remotion, 4 video đầu — không dùng cho video mới, đã di chuyển vật lý khỏi `scripts/`
vào `archive/remotion-legacy/scripts/` ngày 2026-09-22 để khớp đúng chú thích này):
`archive/remotion-legacy/scripts/07-codegen.router.mjs`,
`archive/remotion-legacy/scripts/07-codegen-parallel.mjs`,
`archive/remotion-legacy/scripts/08-sync-root.mjs` (+ `archive/remotion-legacy/scripts/lib/sync-root-lib.mjs`
dùng chung bởi cả 3 — vẫn import `router-client.mjs`/`video-paths.mjs` từ `scripts/lib/` gốc repo
qua đường dẫn tương đối, không copy trùng để tránh lệch bản).

Hậu tố `.local.mjs` / `.router.mjs` cho biết ngay loại xử lý. Mọi script `.router.mjs` dùng chung `scripts/lib/router-client.mjs` và tra model qua `scripts/model-routing.json`.

**Vì sao không có `04`**: Stage 4 (phân tích style DNA từ ảnh/video mẫu, xem mục 4 phía trên) không cần script vì Style DNA của dự án này được kế thừa nguyên bộ từ `vox-style-3` (xem `planning/style-dna/README.md`), không phải phân tích lại từ đầu. Số thứ tự giữ nguyên khoảng trống này để phản ánh đúng vị trí Stage 4 trong pipeline — không phải lỗi đánh số.
