# Nhật ký audit/sự cố — pipeline Vox-style xé giấy

File này lưu các mục audit/sự cố CÓ NGÀY CỤ THỂ, chỉ thêm không bao giờ bớt — tách ra khỏi
`planning/responsibility-matrix.md` (2026-09-25) để file đó giữ vai trò tham chiếu ỔN ĐỊNH
(ai/gì làm task nào), không bị phình to theo thời gian dựng video. **Không cần đọc mặc định
mỗi session** — chỉ đọc khi đang điều tra 1 vấn đề có khả năng đã từng gặp trước đó (tra bằng
grep tên video/mã lỗi/từ khoá liên quan, không đọc trọn file).

---

### Sự cố integration CSS sau Stage 7 — video `su-kien-thien-an-mon`, S10 (2026-09-22)

**Trạng thái:** đã audit và xác nhận nguyên nhân; **chưa sửa code**. Đây là backlog cải tiến cho
session sau, không được hiểu là pipeline hiện tại đã xử lý lỗi.

Ở bản render cuối, hai overlay của S10 (`#tape-box` và `#scale-card`) bị kéo giãn thành các mảng
đen gần đầy chiều cao canvas tại khoảng 92–94 giây. Đây không phải overflow thông thường mà là
**unintended stretching do CSS constraints còn sót lại sau khi ráp composition**.

**Nguyên nhân đã xác nhận:** root project do `syncRootHf()` sinh dùng selector toàn cục:

```css
.clip {
  position: absolute;
  inset: 0;
  isolation: isolate;
}
```

Selector này được tạo trong `scripts/lib/sync-root-hf-lib.mjs` để các slot scene/caption cấp root
phủ toàn canvas. Tuy nhiên, scene S10 cũng dùng `class="clip"` cho các timed element nội bộ. Khi
standalone scene được chuyển thành sub-composition, CSS root vẫn match các node nội bộ này:

- `#tape-box.clip` có `top: 230px`, nhưng nhận thêm `bottom: 0` từ `inset: 0`, nên bị kéo từ
  `top: 230px` xuống đáy canvas.
- `#scale-card.clip` có `bottom: 500px`, nhưng nhận thêm `top: 0`, nên bị kéo từ đỉnh canvas xuống
  vị trí cách đáy 500px.

Lỗi không xuất hiện khi Stage 7 kiểm tra composition standalone, vì CSS host/root chỉ được áp sau
bước `standaloneToSubComposition()` + `syncRootHf()`.

**Reviewer Stage 7 không phát hiện lỗi integration này.** Reviewer và `hyperframes check` của S10
đã phát hiện các lỗi khác gồm `video_nested_in_timed_element`,
`gsap_timeline_set_initial_hide`, và `nested_structure_needs_subcomposition`, nhưng không phát
hiện selector collision `.clip` hoặc kích thước card sai sau assembly. Final assembled check vẫn
PASS vì các card vẫn nằm trong canvas, có `data-layout-allow-overlap`, và root S10 còn dùng
`data-layout-allow-overflow="true"`; checker không biết chiều cao thiết kế mong đợi của card nên
xem hình chữ nhật lớn là layout CSS hợp lệ.

**Các lỗi Stage 7 khác của video này đã có log thô nhưng chưa được tổng hợp đầy đủ thành quy tắc
pipeline dùng chung:** root/media hardcode kích thước pixel; video và wrapper cùng mang timing;
initial hide bằng `tl.set(..., 0)`; CSS transform xung đột GSAP transform; `back.out` sai register;
text/label lệch shotlist; `toLocaleString()` và counter callback không hoàn toàn deterministic;
repeated `fromTo()` thiếu baseline; tween trực tiếp timed clip; overlay chồng nhau; root-level
layout exemptions có blast radius quá lớn. Bằng chứng nằm trong `pipeline/codegen-issues.jsonl`,
`pipeline/videos/su-kien-thien-an-mon/run-log.md`, và các issue file targeted của S01/S05/S14.

**Khoảng trống kiến trúc cần xử lý trong session tương lai:**

1. Stage 7 chỉ verify/review standalone artifact trước conversion, nên chưa kiểm tra đầy đủ tương
   tác giữa CSS scene và CSS host sau assembly.
2. Selector `.clip { inset: 0 }` của root có phạm vi quá rộng, có thể làm thay đổi layout nội bộ
   của mọi scene.
3. Root-level `data-layout-allow-overflow` có thể che giấu lỗi bố cục thật.
4. Sparse layout sampling không bảo đảm trúng đúng cue ngắn khi overlay đang hiển thị.

**Hướng cải tiến đề xuất — chưa thực hiện:**

1. Scope CSS slot của root vào direct child, ví dụ `#root > .clip`, hoặc dùng class riêng như
   `.composition-slot`; không tái sử dụng selector layout nội bộ `.clip` cho host full-frame.
2. Bảo đảm CSS host chỉ áp lên các slot `data-composition-src`, không áp vào node nội bộ của
   sub-composition.
3. Thêm integration check sau `standaloneToSubComposition()` và sau `syncRootHf()`, thay vì chỉ
   check standalone scene.
4. Thêm static audit phát hiện selector host có thể match node nội bộ, đặc biệt `.clip`, `#root`,
   `video` và `[data-start]`.
5. Cấm hoặc cảnh báo mạnh `data-layout-allow-overflow="true"` trên composition root; exemption
   phải đặt ở phần tử nhỏ nhất thực sự cần overflow.
6. Với overlay có cue cụ thể, lấy layout sample tại `atMs` và trong khoảng hold của overlay, không
   chỉ dùng sparse sampling đều theo scene.
7. Reviewer integration phải nhận được CSS host/root sau assembly hoặc chạy thêm một lượt review
   trên assembled artifact.

**Regression test bắt buộc khi sửa:**

- Tạo sub-composition có một `.clip` dùng `top` nhưng không khai báo `bottom`, và một `.clip` dùng
  `bottom` nhưng không khai báo `top`.
- Ráp vào root có full-frame scene slots; xác nhận computed style của hai internal clip không nhận
  cạnh đối diện từ host.
- Xác nhận scene slot vẫn phủ đúng 1080×1920 và giữ `isolation: isolate`.
- Chụp/đo layout tại đúng cue hiển thị overlay của S10: `#tape-box` khoảng global 90.8–92.8s và
  `#scale-card` khoảng global 93.6–95.4s.
- Test phải fail với selector `.clip { inset: 0 }` hiện tại và PASS sau khi CSS được scope.

**Gotcha cần đưa vào `KNOWN_GOTCHAS_HF` khi triển khai bản sửa:** composition standalone có thể
PASS nhưng layout thay đổi sau assembly nếu CSS host dùng selector phổ biến như `.clip`. Mọi CSS
full-frame của host phải được scope vào direct composition slots; không được để `inset: 0` lan vào
timed elements nội bộ.

**Bug race condition thật đã sửa (video "ban-an-473-phan-2", 2026-09-22), áp dụng cho MỌI video:** trước đây `07-codegen.hf.router.mjs` scaffold PROJECT CHUNG của video (khi `hyperframes.json` của `hfProjectDir` chưa tồn tại) vào một thư mục tạm tên CỐ ĐỊNH `.scaffold-tmp-<slug>` (không gắn sceneId/pid) — khác với project test standalone riêng từng scene vốn đã an toàn. Chạy thẳng ≥2 scene song song NGAY TỪ SCENE ĐẦU (chưa có scene nào bootstrap project chung trước) khiến nhiều process cùng thấy "chưa tồn tại" và cùng ghi/xoá CHUNG một thư mục tạm → 11/18 scene fail với lỗi `hyperframes init`/`ENOENT scandir` (không phải lỗi nội dung). Đã sửa: tên thư mục tạm giờ gắn cả `sceneId` + `process.pid` để luôn unique. Trước bản vá này, quy trình "chạy S01 riêng để bootstrap trước khi vào vòng song song" (xem video ban-an-473-phan-1 bên dưới) ngẫu nhiên né được bug này (project chung đã tồn tại trước khi vòng song song bắt đầu) — nhưng đó không phải lý do chính thức của bước bootstrap riêng (lý do chính thức là phát hiện sớm gotcha nội dung). Từ nay chạy thẳng toàn bộ scene song song ngay từ đầu (không cần bootstrap 1 scene riêng trước) là an toàn.

Chỉ chạy `scripts/07-codegen.hf.router.mjs` tuần tự/thủ công (không qua orchestrator) khi có lý do cụ thể, ví dụ đang debug/sửa riêng 1 scene bằng `--issue-file`.

---

### Nhật ký audit chưa xử lý — session `ban-an-35-phan-1` (2026-09-22)

**Phạm vi và trạng thái:** mục này ghi lại lỗi/vấn đề phát sinh trong đúng session dựng video
`ban-an-35-phan-1`. **Cập nhật (2026-09-23):** backlog P0 mục 1-4 (wrapper render tất định) ĐÃ
triển khai — xem chi tiết ở mục 6 bên dưới và mục 8 phía trên. Bản MP4 đã render của `ban-an-35-phan-1`
vẫn đang ở đường dẫn sai convention `renders/ban-an-35-phan-1.mp4` theo yêu cầu người dùng (tự xử lý
thủ công, không cần render lại).

**Cập nhật (2026-09-23, sau đó cùng ngày) — backlog P1/P2 ĐÃ ĐÓNG, commit `91edca2`:** cả 4 mục nêu ở
mục 6 bên dưới đã triển khai và xác minh bằng dữ liệu thật (không chỉ đọc code):
- ✅ P1.2 (Stage 7b assembled integration check) — `scripts/07b-integration-check.hf.mjs`, verify lại
  PROJECT ĐÃ RÁP (không chỉ scene standalone), giờ là preflight bắt buộc của `09-render.hf.mjs`.
- ✅ P1.3 (caption safe-zone contract) — `scripts/lib/caption-zone.mjs`, tính `--caption-zone` tất
  định từ `style-tokens.json`, wire vào `verify()`. Nhân tiện hạ luôn vị trí mặc định phụ đề 15%
  (bottom 440→374px) theo yêu cầu người dùng, đồng bộ `STYLE_DNA.md`/`style-dna-integration.md`.
- ✅ P1.5 (log render) — `09-render.hf.mjs` giờ parse capture mode/GPU mode/stage timing vào run-log.
- ✅ P2.1 (log đúng chỗ) + P2.3 (completion manifest) — `pipeline/videos/<slug>/integration-check.log`
  + `completion-manifest.json`, quy ước chỉ tuyên bố "hoàn tất" khi mọi field `*Ok` đều `true`.
- **⚠️ P1.4 CHỈ XONG 1 PHẦN, KHÔNG đọc như đã sửa toàn bộ**: đã làm (c) sửa `classifyFailure()` đọc
  đúng log lần thử cuối, và (b) `runHyperframesCheck()` thêm field `infraError` phân biệt tool
  treo/crash vs lỗi nội dung thật. **CHƯA làm** (a) tách retry `review()` riêng khỏi `generate()` để
  không tốn oan ngân sách `MAX_ATTEMPTS` khi chỉ review() timeout — hoãn theo quyết định người dùng,
  vẫn còn nguyên trong `07-codegen.hf.router.mjs` vòng lặp attempt hiện tại. Không phải lỗi đúng/sai,
  chỉ là tối ưu hiệu quả retry, an toàn để dựng video mới trước khi quay lại làm (a).

#### 1. Kết luận trách nhiệm — lỗi render không phải do quy định mơ hồ

Repo đã quy định rõ và lặp lại lệnh chuẩn tại `README.md`, `planning/README.md` và bảng Stage 8
ngay phía trên:

```console
npx hyperframes render --quality looks -o out/<slug>-full.mp4 hyperframes/videos/<slug>
```

Nhưng session đã chạy `--quality delivery` và ghi vào
`renders/ban-an-35-phan-1.mp4`. Đây là lỗi tuân thủ của Claude dù chỉ dẫn đã rõ, không phải lỗi do
pipeline mâu thuẫn. Có ba sai lệch độc lập trong cùng một lệnh:

1. Sai preset: `delivery` thay vì `looks`.
2. Sai thư mục: `renders/` thay vì `out/`.
3. Sai tên file: `<slug>.mp4` thay vì `<slug>-full.mp4`.

Nguyên nhân thao tác: Claude để hướng dẫn chung của skill HyperFrames (`delivery` cho final
delivery, output mặc định dưới `renders/`) lấn át convention cụ thể hơn của repo. Quy tắc cần giữ:
**chỉ dẫn repo-local cụ thể luôn ưu tiên hơn default của tool/skill**. Không được tự nâng quality
vì cho rằng đây là "final delivery" khi pipeline đã chốt `looks`.

Hậu quả đo được của lần render sai preset: video 226.4s mất khoảng 938.4s tổng; capture 6792 frame
mất khoảng 541.6s và encode `delivery/high` mất khoảng 316.4s, output khoảng 242.3MB.

**Đính chính (2026-09-23, audit bằng số liệu thật):** 2 claim ở trên KHÔNG đủ bằng chứng ủng hộ.
So sánh `ban-an-473-phan-2` (429.1s / 3948 frame, render ĐÚNG `--quality looks`, **cũng dùng CSS 3D
`perspective` ở 4 scene** s05/s06/s07/s16) = 0.109s/frame, với `ban-an-35-phan-1` (938.4s / 6792
frame, `delivery/high`) = 0.138s/frame — chỉ chênh ~27%, không phải ~2x như tài liệu CLI mô tả
chênh lệch giữa `drawElementImage` (fast path) và screenshot capture (slow path). Nhiều khả năng cả
2 video đều dùng CÙNG đường screenshot capture (mặc định trên máy Windows này), CSS 3D không phải
thủ phạm riêng của video này. Bitrate ffprobe thật: `ban-an-35-phan-1` (delivery/high) = **8.98
Mbps** — THẤP HƠN cả 4 video khác dùng đúng `looks` (11.3-15.5 Mbps) — ngược với claim "delivery
làm encode nặng hơn". Đây là so sánh gián tiếp (khác composition), chưa phải test A/B kiểm soát
hoàn toàn; người dùng đã xác nhận chấp nhận kết luận này, không cần test A/B thật để xác nhận dứt
điểm. Bài học: không suy luận nguyên nhân hiệu năng chỉ từ 1 lần đo duy nhất khi có dữ liệu video
khác để đối chứng.

#### 2. Lỗi thao tác/báo cáo khác trong session

1. **Tự chạy preview không cần thiết:** Claude đã chạy `preview --background`, `preview --status`
   và `preview --stop` dù mục 7-8 hiện hành yêu cầu assembled check sạch thì đi thẳng tới render,
   trừ khi có trigger debug cụ thể. Việc này tốn thời gian và sinh thêm `.thumbnails/` /
   `.waveform-cache/` trong project.
2. **Kết luận sai về vision QA:** báo cáo audit ban đầu nói chưa chạy vision agent trên MP4 là một
   thiếu sót. Đính chính: theo mục 8, `ffprobe` là bắt buộc; vision QA chỉ chạy khi người dùng báo
   lỗi hoặc có nghi ngờ cụ thể dựa trên bằng chứng. Session đã chạy `ffprobe`, nên việc không chạy
   vision agent không phải lỗi.
3. **Dùng sai cú pháp CLI một lần:** đã thử `hyperframes check --project <dir>`, trong khi
   `--project` thuộc contract của lệnh upgrade, không phải `check`. Sau đó đã sửa bằng cách chạy
   `check` trong project directory. Không làm hỏng artefact nhưng tốn một lượt lệnh.
4. **Thiếu nhật ký hoàn tất Stage 8:** `pipeline/videos/ban-an-35-phan-1/run-log.md` hiện kết thúc
   ở lần sửa S02; chưa ghi final assembled check, lệnh/preset/path render, thời gian, dung lượng và
   kết quả ffprobe. Vì vậy run log không đủ để audit Stage 8 và không ghi lại chính sai lệch
   output/quality đã xảy ra.
5. **Đặt log check sai lớp thư mục:** `pipeline-check-final.log` được ghi vào
   `hyperframes/videos/ban-an-35-phan-1/` thay vì `pipeline/videos/ban-an-35-phan-1/` hoặc chỉ ghi
   summary vào run log. File vận hành có thể bị lẫn vào project source/publish bundle.
6. **Báo cáo hoàn tất quá mạnh:** Claude nói pipeline end-to-end đã hoàn tất dù deliverable chưa
   đạt contract path/name/quality và run log chưa có Stage 8. Render kỹ thuật thành công không đủ
   để tuyên bố pipeline hoàn tất nếu output contract chưa đạt.
7. **Cập nhật workflow không cần thiết:** session đã chạy `npx hyperframes skills update
   general-video` dù repo đã có pipeline riêng đầy đủ. Chưa có bằng chứng lệnh này gây diff/hỏng
   repo, nhưng đây là biến số và rủi ro không cần thiết trong một yêu cầu nhấn mạnh không tự đổi
   code. Từ nay không update skill/workflow trong pipeline repo trừ khi tài liệu repo yêu cầu hoặc
   có blocker đã được xác nhận.

#### 3. Mâu thuẫn tài liệu thật sự phát hiện trong session

Mâu thuẫn này **không biện minh** cho lỗi path/name/quality phía trên, nhưng có liên quan trực tiếp
đến việc preview và diễn giải vision QA:

- `planning/README.md` bước 9-10 hiện liệt kê Preview rồi Render, và câu cuối bước 10 yêu cầu
  `ffprobe + vision agent`, khiến cả hai trông như bước mặc định.
- `planning/responsibility-matrix.md` mục 7-8 (quy định chi tiết và mới hơn) nói ngược lại: không
  preview mặc định, vision QA không bắt buộc, chỉ `ffprobe` là gate mặc định sau render.

Claude cũng có lỗi vì ban đầu chỉ đọc phần đầu `responsibility-matrix.md`, chưa đọc tới mục 7-8
trước khi hành động. Hướng đồng bộ tài liệu cần audit ở session sau: sửa `planning/README.md` để
nêu một đường duy nhất — assembled check PASS → render thẳng → ffprobe bắt buộc; preview/snapshot/
vision QA chỉ khi có trigger cụ thể.

#### 4. Dependency graph và cơ hội song song bộc lộ trong session

Ban đầu Claude chạy Stage 1 rồi Stage 2 theo cách tuần tự; người dùng phải nhắc Stage 2b độc lập
với kết quả transcript và Stage 3 chỉ phụ thuộc media từ Stage 2b. Sau khi đọc code, xác nhận DAG
thực tế là:

```text
script + audio ─┬─> Stage 1 ─> Stage 2 ─┐
                └─> Stage 2b ─> Stage 3 ─┴─> Stage 5
```

Stage 1 và 2b có thể bắt đầu song song ngay sau intake; Stage 3 có thể chạy ngay khi 2b hoàn tất,
không cần chờ Stage 2. Session đã áp dụng song song an toàn sau khi người dùng nhắc. Đây một phần
là thiếu sót điều phối của Claude, một phần do tài liệu hiện trình bày danh sách tuyến tính mà chưa
ghi `depends_on`/DAG. Cần bổ sung bảng dependency để tối ưu này không tiếp tục phụ thuộc trí nhớ
hoặc người dùng nhắc lại.

#### 5. Khoảng trống integration/retry bộc lộ trong session

1. **Standalone PASS không đồng nghĩa assembled PASS:** 24 scene đã qua verify/reviewer riêng,
   nhưng final assembled check vẫn bắt lỗi S02/S16 liên quan contrast/collision với caption track.
   Cần làm rõ một gate riêng sau `syncRootHf()` (đề xuất tên Stage 7b: Assemble + Integration
   Check), trước Stage 8. Gate phải xác nhận đủ N/N scene, audio/caption track đã mount và
   `hyperframes check` trên project assembled PASS.
2. **Standalone verifier không thấy caption safe rail:** scene riêng không mount caption track nên
   không thể phát hiện text/card xâm lấn vùng caption. Cần audit giải pháp đưa safe-zone contract
   vào generator/reviewer hoặc mount safe-zone fixture trong verify; không dùng
   `data-layout-allow-overlap` để che collision ngoài ý muốn.
3. **Retry S23 chưa phân biệt tốt lỗi mạng với lỗi nội dung:** S23 phải chạy lại nhiều vòng do
   9router timeout. Cần phân loại riêng generator timeout, verifier timeout, reviewer timeout và
   content FAIL; network-only retry không nên tiêu ngân sách content attempt hoặc bắt generator
   viết lại artefact đang tốt.

#### 6. Backlog đề xuất để audit ở session khác — chưa triển khai

**P0 — ngăn lặp lại lỗi deliverable:**

**Đã triển khai (2026-09-23), mục 1-4 xong:**

1. ✅ `scripts/09-render.hf.mjs --video=<slug>` — wrapper tất định (số `09`, không xung đột
   `08-sync-root.hf.mjs`).
2. ✅ Wrapper cố định `--quality looks`, output `vp.finalOutput` (`out/<slug>-full.mp4`), tự tạo
   `out/` nếu thiếu, tự chạy ffprobe đối chiếu duration với `narration.mp3` thật (cảnh báo nếu lệch
   >1s), append đầy đủ vào run-log qua `appendRunLog()`.
3. ✅ Thêm `finalOutput: path.join(root, "out", \`${slug}-full.mp4\`)` vào `videoPaths()`
   (`scripts/lib/video-paths.mjs`) làm nguồn xác thực duy nhất.
4. ✅ Preflight assertion: nếu `--quality`/`--output` khác mặc định repo, wrapper TỪ CHỐI chạy
   (exit 1) trừ khi có cờ `--force-non-default` xác nhận chủ đích. Đã kiểm chứng bằng bảng case mô
   phỏng (6/6 PASS, bao gồm đúng kịch bản lỗi thật: `--quality delivery` không có force → reject).
   Đã sửa 1 lỗi thật phát hiện qua kiểm chứng: ffprobe trên Windows trả `\r\n`, làm hỏng chuỗi
   `resolution` (nhiều dòng ghép lại dính `\r` ẩn) — đã thêm `.replace(/\r/g, "")` trong
   `ffprobeField()`.
   Đồng thời cập nhật CLAUDE.md/AGENTS.md scaffold (`scripts/07-codegen.hf.router.mjs`) trỏ về
   đúng wrapper này thay vì lệnh CLI thô, làm lớp nhắc bổ sung phòng khi ai đó vẫn gõ tay.
   **Chưa kiểm chứng end-to-end bằng 1 lần render thật** (chỉ mô phỏng logic + test trên file đã
   render sẵn) — xác nhận thêm ở lần render video kế tiếp.
5. ⬜ Chưa làm (mục riêng, đã tự hoàn thành ở audit khác — xem mục 7 phía trên: README/matrix đã
   đồng bộ preview/vision QA ngày 2026-09-23).

**P1 — tốc độ và độ tin cậy:**

1. ✅ Ghi dependency DAG/bảng `depends_on` cho Stage 1/2/2b/3/5; mặc định chạy Stage 1 + 2b song
   song, rồi Stage 3 ngay sau 2b. (Đã tài liệu hoá ở mục 2b bên trên.) Từ nay DAG này CŨNG được
   enforce trực tiếp trong code qua `scripts/run-stages-1-6.mjs` (`Promise.all` cho 2 nhánh, Stage
   5/6 chỉ chạy sau khi cả 2 nhánh settle), không chỉ dừng ở tài liệu.
2. ✅ Chính thức hoá Stage 7b assembled integration check. (`scripts/07b-integration-check.hf.mjs`,
   commit `91edca2`.)
3. ✅ Thêm caption safe-zone contract vào generator/reviewer/fixture verify. (`scripts/lib/caption-zone.mjs`
   + wire vào `verify()`, commit `91edca2`.)
4. ⚠️ **MỘT PHẦN** — đã sửa `classifyFailure()` đọc đúng log lần thử cuối + `runHyperframesCheck()`
   phân biệt tool treo/crash vs lỗi nội dung thật (commit `91edca2`). **CHƯA làm**: tách hẳn retry
   `review()` khỏi `generate()` (không tốn oan `MAX_ATTEMPTS` khi chỉ review() timeout) và "giữ
   artefact tốt nhất giữa các attempt" — cả 2 vẫn treo, hoãn theo quyết định người dùng.
5. ✅ Ghi capture mode, GPU mode và stage timings của render vào run log để phân biệt chậm do capture
   với chậm do encode; không suy đoán. (`scripts/09-render.hf.mjs`, commit `91edca2`.)
6. **Xác nhận thật (2026-09-23) qua test render trực tiếp 1 scene** (`scene-s01.html`,
   `ban-an-35-phan-1` — thất bại vì lý do khác, xem mục 6 dưới, nhưng log kịp in ra trước khi lỗi):
   cơ chế "1 số CSS feature tắt fast-capture (`drawElementImage`), rơi về screenshot capture" LÀ
   CÓ THẬT trên máy này — log ghi rõ `Fast capture: composition uses mix-blend-mode — disabling
   drawElementImage`, khác lý do "CSS 3D" agent trước nêu cho video khác, xác nhận GPU thật được
   nhận diện (`NVIDIA GeForce GTX 1660 SUPER`, `browserGpuMode: hardware`). Nhiều khả năng phong
   cách paper-cutout Vox dùng `mix-blend-mode` phổ biến nên HẦU HẾT video đều rơi vào đường
   screenshot-capture — không phải lỗi riêng của 1 video. **Không nên "sửa" bằng cách bỏ
   `mix-blend-mode`/CSS 3D** — đây là hiệu ứng thị giác thật của style DNA, đánh đổi chất lượng lấy
   tốc độ không xứng đáng, và `--experimental-fast-capture` bản thân CLI còn gắn nhãn "experimental"
   (chưa chắc ổn định). Hướng tối ưu AN TOÀN hơn, CHƯA thử: tinh chỉnh `-w/--workers` bằng
   `npx hyperframes benchmark` (CLI tự đề xuất công cụ này) — đúng bài học đã kiểm chứng trước đó
   với Remotion trong repo này (mặc định `concurrency=8` không phải nhanh nhất, `concurrency=4`
   nhanh hơn thật — xem "Tối ưu render Remotion" trong `planning/README.md`). "Auto workers" của
   HyperFrames CLI có thể đang chọn số worker không tối ưu cho máy 16-core này; cần đo thật ở lần
   render video kế tiếp, không đoán trước 1 con số.

**P2 — hygiene/auditability:**

1. ✅ Log vận hành/final check phải nằm dưới `pipeline/videos/<slug>/`, không nằm trong project
   composition. (`pipeline/videos/<slug>/integration-check.log`, commit `91edca2`.)
2. ✅ Audit cách ignore/dọn `.thumbnails/` và `.waveform-cache/` khi preview thực sự được yêu cầu —
   đã xác nhận (`git check-ignore -v`) cả 2 đã được `.gitignore` đúng từ trước (dòng 33-34), không
   phải lỗi thật, không cần sửa gì (xác nhận ở session trước commit `91edca2`).
3. ✅ Cân nhắc completion manifest chỉ được ghi khi assembled check, render contract và ffprobe đều
   đạt; tránh tuyên bố end-to-end complete chỉ vì một MP4 bất kỳ đã được tạo.

#### 7. Tiêu chí regression/acceptance đề xuất cho bản sửa tương lai

- Chạy wrapper với một slug test phải chỉ sinh `out/<slug>-full.mp4` bằng quality `looks`.
- Override path/name/quality sai phải fail trước khi render; override do người dùng yêu cầu phải
  được log rõ, không âm thầm thay default.
- Run log phải có check verdict, exact relative output, quality, duration/resolution/fps/codecs,
  file size và timings.
- Pipeline scheduler test phải chứng minh Stage 1 và 2b có thể chạy đồng thời; Stage 5 không bắt
  đầu trước khi cả Stage 2 và Stage 3 hoàn tất.
- Một scene đặt text trong caption rail phải PASS standalone hiện tại nhưng FAIL integration
  fixture/gate mới; bản sửa layout phải PASS.
- Mô phỏng reviewer timeout sau khi composition đã verify: retry reviewer hoặc tiếp tục từ artefact
  hiện có, không sinh lại scene và không tiêu content-attempt.
- Tài liệu `README.md`, `planning/README.md` và `responsibility-matrix.md` phải thống nhất về một
  lệnh render chuẩn và điều kiện preview/vision QA.

---

## 8b. Audit end-to-end — video "ha-noi-cam-xe-may" (2026-09-24/25), session hoàn toàn mới

Dựng THẬT 1 video mới từ đầu tới cuối (input: audio 85.76s + script text thật của người dùng, KHÔNG
có media nguồn sẵn → bắt buộc qua Stage 2b Google Flow thật), đóng vai 1 session hoàn toàn mới (chỉ
đi theo `planning/README.md`, không dựa trí nhớ phiên trước), để audit theo 4 câu hỏi người dùng nêu.
Video hoàn tất thành công: `out/ha-noi-cam-xe-may-full.mp4` (97.2MB, 85.733s khớp audio 85.760s,
1080×1920 h264, `completion-manifest.json` mọi field `*Ok`=true). Đây là lần đầu
`scripts/run-stages-1-6.mjs` (checkpoint trước) chạy THẬT với Stage 2b Google Flow thật (lần trước
chỉ test bằng slug giả ở bước precheck).

### 1. Tài liệu/chỉ dẫn — rõ ràng, mạch lạc, có mâu thuẫn gây quyết định sai/tốn token không?
- ✅ **Tốt**: đi đúng theo `planning/README.md` không cần suy đoán thêm — orchestrator mới chạy đúng
  y hệt tài liệu mô tả, intake (copy audio/script vào đúng path convention) không mơ hồ.
- ⚠️ **Lỗ hổng thật, tốn token oan đã xảy ra**: `scripts/07-codegen.hf.router.mjs:403-405` cắt output
  `hyperframes check` thô xuống còn 2000 ký tự (console), 2000 ký tự (ghi vào
  `pipeline/codegen-issues.jsonl`), và CHỈ 4000 ký tự gửi lại cho generator để sửa ở lần retry. Xảy
  ra thật với scene S08: JSON thật có 5 mục (`lint`/`runtime`/`layout`/`motion`/`contrast`), lỗi
  THẬT nằm ở `layout` (8 lỗi `text_occluded`) nhưng `lint` (chỉ có warning, không phải lỗi thật) đã
  chiếm hết ngân sách 4000 ký tự trước khi tới `layout` — generator KHÔNG BAO GIỜ thấy lỗi thật qua
  cả 3 lần thử, tốn oan 3 vòng generate+verify(+review) thật (chi phí API/thời gian thật) rồi vẫn
  fail, phải Claude tự chạy lại `npx hyperframes check --json` trực tiếp trên
  `hyperframes/.gen-tmp/<slug>-s08/` mới thấy lỗi thật. Xác nhận đúng giả thuyết: khi đưa lỗi thật
  (8 selector cụ thể) vào `--issue-file` thủ công, generator sửa đúng ngay lần đầu. **Đề xuất (chưa
  sửa — thuộc logic pipeline, để người dùng quyết định)**: không cắt mù theo số ký tự — hoặc tăng
  giới hạn nhiều, hoặc ưu tiên đưa các mục `ok:false`/`errorCount>0` lên trước khi cắt, hoặc luôn kèm
  1 dòng tóm tắt `{category: ok/errorCount}` của cả 5 mục trước phần chi tiết dù có bị cắt tiếp theo.
- ⚠️ **Không phải lỗi tài liệu, nhưng đáng ghi chú**: Stage 1 (`01-audio-transcribe.local.mjs`, qua
  `transcribe()` của `@remotion/install-whisper-cpp` với `tokenLevelTimestamps: true`) in ra
  **17.456/17.768 dòng (98,2%)** tổng output của cả lần chạy orchestrator — toàn bộ là debug thô
  per-token DTW timestamp của whisper.cpp, không phải lỗi. Với audio chỉ 85s đã vậy; video dài hơn
  (vd 450s) sẽ tỉ lệ thuận nặng hơn. Không tài liệu nào cảnh báo trước — 1 agent tương lai cần đọc
  log để debug 1 lỗi khác sẽ tốn token oan lọc qua hàng chục nghìn dòng này trước khi tới phần liên
  quan.
- ⚠️ Numbering "Stage N" trong `planning/README.md` (đánh số theo thứ tự bước trong tài liệu) không
  luôn khớp 1-1 với tiền tố file script (`0N-*.mjs`) — vd bước gọi `07-codegen-hf-parallel.mjs` được
  đánh số "8." trong danh sách. Có giải thích (mục "vì sao không có scripts/04-*") nhưng vẫn có thể
  gây lệch khi 1 agent map nhanh "Stage N" ↔ tên file.

### 2. Cấu trúc thư mục/file — khoa học, có dư thừa không, cần dọn gì không?
- ✅ Convention `content/`, `public/`, `planning/`, `pipeline/`, `hyperframes/` × `videos/<slug>/` áp
  dụng nhất quán, không cần tạo gì ngoài quy ước.
- ✅ `.gitignore` che đúng `hyperframes/.gen-tmp/` và `out/` (xác nhận bằng `git check-ignore -v`,
  không phải đọc mắt) — không rác lọt vào git status sau khi dựng xong.
- ✅ `hyperframes/.gen-tmp/` tự dọn sạch — dù 2 scene (S02, S08) fail 3 lần + phải retry 2-3 vòng
  (S05 retry 2 vòng), thư mục tạm không tích tụ rác (kiểm tra `du -sh` = 8.0K, rỗng sau khi xong).
- ℹ️ Vẫn còn nghi vấn cũ CHƯA xác minh lại trong phiên này: thư mục `.kilo/worktrees/blue-marmoset/`
  chứa bản sao riêng của `planning/README.md`/`responsibility-matrix.md` (phát hiện qua grep ở phiên
  trước) — nếu đây là worktree mồ côi của công cụ khác, nên dọn hoặc xác nhận mục đích, vì 1 agent
  tương lai `grep -r` toàn repo có thể vô tình đọc nhầm bản sao cũ trong đó.

### 3. Script — đầy đủ/tối ưu/chạy đúng, lỗi/retry/chậm bất thường, naming đồng bộ?
- ✅ Orchestrator `run-stages-1-6.mjs` chạy đúng thiết kế ở lần đầu dùng thật (log xác nhận
  `[01-transcribe]`/`[02b-media]` in CHỒNG THỜI GIAN thật, không nối đuôi).
- ⚠️ Xem lỗ hổng truncation ở mục 1 — đây vừa là vấn đề tài liệu vừa là bug script thật, ảnh hưởng
  trực tiếp tốc độ/độ tin cậy Stage 7.
- ⚠️ **Xác nhận sống lại đúng lớp lỗi đã biết "standalone PASS ≠ assembled PASS"**: S05 PASS sạch ở
  Stage 7 (verify standalone), nhưng Stage 7b (project đã ráp) bắt lỗi `content_overlap` thật (7 lỗi)
  giữa `.punch-text` (div cha) và `span.punch-accent` (con) — không phải case lý thuyết cũ, là lỗi
  SỐNG xảy ra ngay trong phiên này. Sửa vòng 1 (tách 2 span riêng, CSS flex/gap hợp lệ, không chồng
  hình học thật) giảm còn 4 lỗi nhưng KHÔNG hết — nghi ngờ đây là false-positive của checker với 2
  span tô màu khác nhau nằm cùng dòng (chưa xác minh bằng vision QA để chắc chắn 100%). Sửa vòng 2
  dùng đúng cơ chế có sẵn `data-layout-allow-overlap` đặt trên phần tử cha cụ thể (không phải root)
  → Stage 7b PASS. Tổng cộng tốn 2 vòng generate+verify+review thật cho riêng scene này.
- Tỉ lệ PASS lần đầu ở Stage 7: 10/12 (83%) — khớp baseline lịch sử đã ghi nhận (~85-90%), không bất
  thường; cả 2 fail đều là lỗi nội dung thật (không phải hạ tầng/mạng).
- Render: 270.0s cho 85.7s output (2572 frame), capture mode "screenshot" (KHÔNG fast-capture) vì
  scene S07 dùng CSS 3D (`perspective`/`transform-style: preserve-3d`/`backface-visibility`) — lý do
  cụ thể khác với giả thuyết "mix-blend-mode phổ biến" đã ghi trước đó cho video khác (mục P1.6) →
  nguyên nhân capture mode chậm KHÔNG cố định 1 lý do, thay đổi theo từng video, không nên giả định
  trước.
- Bất đối xứng CLI đã biết (không phải lỗi mới, nhắc lại để lưu ý): Stage 1/2 nhận input/output qua
  **positional args bắt buộc**, mọi stage khác chỉ dùng `--video=` + flag tuỳ chọn — orchestrator mới
  đã che khuất khác biệt này cho luồng chính, nhưng ai debug tay Stage 1/2 riêng lẻ vẫn cần nhớ.

### 4. Bất cập khác phát sinh trong lúc dựng
- Script input kết thúc bằng câu cụt có chủ đích ("Thế nên...") — pipeline xử lý bình thường, không
  crash, Scene Plan dùng luôn làm nhịp kết — xác nhận pipeline chịu được input "trông như chưa xong".
- Toàn bộ 2 vòng sửa Stage 7 (S02, S08) + 2 vòng sửa Stage 7b (S05) đều là lỗi NỘI DUNG thật do đúng
  lớp QA bắt được (không phải crash/timeout/lỗi hạ tầng) — hệ thống gate đang làm đúng việc của nó,
  nhưng tổng thời gian/token thật cho 1 video 12-scene, media tự sinh hoàn toàn qua Stage 2b: cần ước
  tính lại cho video dài hơn dựa trên số liệu thật này thay vì đoán.
- **Dữ liệu mới cho câu hỏi mở về bug render trống** (xem mục "Bug render TRỐNG HÌNH..." trong mục 6
  phía trên): scene S07 video này dùng `preserve-3d` — đã kiểm tra bằng `ffmpeg signalstats` (đo dải
  sáng tối thật của frame, KHÔNG dùng vision QA) tại 3 mốc thời gian rải khắp scene (45.2s/47.0s/
  49.3s), cả 3 đều cho dải Y-luminance rộng (13-236), KHÔNG phải frame trống/phẳng màu — thêm 1 bằng
  chứng thật củng cố kết luận đã ghi: `preserve-3d` một mình KHÔNG phải chỉ báo tin cậy cho lỗi render
  trống. Không kết luận thêm gì mới về nguyên nhân gốc, giữ nguyên quyết định "theo dõi thủ công" đã
  chốt.

### Kết luận ngắn cho người dùng
Pipeline hiện tại VẬN HÀNH ĐƯỢC end-to-end thật, không crash/treo ở tầng hạ tầng. Vấn đề thật đáng
chú ý nhất là **bug truncation ở Stage 7 retry-feedback** (mục 1/3) — gây tốn oan API/thời gian thật
và có thể lặp lại ở bất kỳ video nào khác có lỗi verify nằm ở phần JSON bị cắt mất. Đây là ứng viên
sửa ưu tiên cao nhất nếu muốn tối ưu tiếp, nhưng CHƯA sửa trong phiên này (thuộc logic pipeline đang
audit, để người dùng quyết định theo đúng nguyên tắc audit không tự sửa).

---

## 8c. Audit worktree Kilo Code (`.kilo/worktrees/blue-marmoset`) — 2026-09-25

Người dùng xác nhận `.kilo/` là workspace tự tạo của **Kilo Code** (agent extension khác, cùng loại
với Claude Code, chạy trên cùng IDE) — đã dùng nó dựng vài video end-to-end trước đây. Audit 2 câu
hỏi: (1) worktree có cần cập nhật gì để chạy đúng/hiệu quả với pipeline vừa cải tiến không, (2) Kilo
có tuân thủ chỉ dẫn/pipeline trong lúc chạy không, có tự ý tạo/xoá/sửa thư mục bất thường không.

**1. Trạng thái worktree — ĐÃ đồng bộ:** `git worktree list` xác nhận worktree ở detached HEAD
`2a31aab` (main đang ở `98a6c84`, đúng 1 commit sau — chính là commit orchestrator+bỏ-grain của
checkpoint hôm nay). `git status --short` trong worktree hoàn toàn sạch (không uncommitted/untracked)
→ an toàn 100% để `git checkout 98a6c84` (đã làm, xác nhận `git log -1 --oneline` = `98a6c84`, status
vẫn sạch sau đó). Không có file cấu hình riêng của Kilo Code trong repo (không `.kilocode/`, không
`AGENTS.md` gốc; `.kilo/` chỉ có `worktrees/` + 1 `.gitignore` nội bộ cho node_modules/lockfile/
`agent-manager.json` của chính Kilo) — Kilo dựa thẳng vào `CLAUDE.md`/`planning/README.md` chung với
Claude, không có tài liệu riêng cần cập nhật. Diff `CLAUDE.md` giữa worktree/main trước khi sync chỉ
khác CRLF/LF (xác nhận bằng `diff` sau khi bỏ `\r`) — không phải nội dung lỗi thời. **CHƯA xong hoàn
toàn**: 2 bug fix Stage 1/Stage 7 (mục 8b) vẫn CHƯA commit trên `main` — worktree cần đồng bộ thêm 1
lần (`git -C .kilo/worktrees/blue-marmoset checkout <commit mới>`) sau khi 2 fix đó được commit.

**2. Tuân thủ pipeline trong quá khứ — KHÔNG tìm được bằng chứng, cả tốt lẫn xấu:**
`git -C .kilo/worktrees/blue-marmoset reflog` chỉ toàn dòng `checkout: moving from X to Y` — **không
một dòng `commit:` nào** từng được tạo từ trong worktree này. `git fsck --unreachable --no-reflogs`
trên toàn object database (worktree dùng chung với repo chính) trả về **0 commit mồ côi**. Kết luận
thật: không có dấu vết git nào cho thấy Kilo Code từng tạo thay đổi còn tồn tại ở đây — nếu Kilo có
dựng video thật, kết quả đó hiện không còn (đã dọn, hoặc chưa từng ghi commit). **Không thể kết luận
Kilo có tuân thủ đúng pipeline hay không chỉ từ git** — cần người dùng chỉ rõ video/thời điểm cụ thể
nếu muốn audit sâu 1 lần chạy thật của Kilo.

Phát hiện phụ, không liên quan Kilo (gặp lúc quét cấu trúc để đối chiếu): `hyperframes/videos/an-le-64/`
tồn tại dù `an-le-64` là 1 trong 4 video Remotion-legacy — xác nhận qua `git log` đây là scaffold TEST
từ giai đoạn di trú HyperFrames cũ (commit `9e9223b`, trước khi chốt KHÔNG migrate 4 video cũ), có từ
lâu, không phải rác mới/không phải do Kilo.

