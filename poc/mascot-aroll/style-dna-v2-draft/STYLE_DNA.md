# Vox-style DNA — grayscale + orange collage, 9:16 (BẢN NHÁP v2)

> **BẢN NHÁP v2 (POC `poc/mascot-aroll/`) — CHƯA áp dụng cho pipeline thật.** Khác bản thật ở mục 1 (bỏ thanh cam đáy, nền lưới chuyển động), 3, 4 (+4b mascot), 5, 6, 7, 8. Các đoạn `[ĐÃ DUYỆT]` đã được người dùng chốt; `[ĐÃ KIỂM CHỨNG POC]` = đã đo thật ở Bước C (lưới chuyển động, PNG alpha). Mục 2, 9, 10 giữ nguyên. **Nguyên tắc sửa:** chỉ bỏ/chỉnh những gì buộc phải đổi vì (a) không còn chữ/component trên cảnh asset, (b) có mascot; mọi tư duy dựng cốt lõi (ý nghĩa trước component sau, nhịp/chỗ thở, không lặp liên tiếp, đa dạng, media-first, hợp đồng phụ đề…) được giữ và diễn đạt lại cho khớp v2.

Đây là **bản đặc tả phong cách** (không phải hướng dẫn vận hành một pipeline cụ thể). Nó
chắt lọc lại toàn bộ quyết định thiết kế đã được kiểm chứng qua nhiều video thật (V10-V13)
trong repo nguồn `vox-style-3`, để bất kỳ agent nào đọc file này cũng dựng đúng phong cách
mà không cần hỏi lại. Số liệu chính xác (mã màu, kích thước, ngưỡng) nằm ở
[`style-tokens.json`](style-tokens.json) — file này diễn giải Ý NGHĨA và LÝ DO đằng sau
từng con số.

Xem ảnh thật ở [`examples/`](examples/) song song khi đọc — đặc biệt
`examples/contact-sheet-full-video.png`, một video 24 cảnh hoàn chỉnh thể hiện toàn bộ
phong cách trong một lưới ảnh.

## 1. Nhận diện thị giác cốt lõi

- **Khung hình**: 1080×1920 @30fps, dọc 9:16 (short-form: TikTok/Reels/Shorts). Chỉ đổi
  sang 16:9 khi được yêu cầu rõ.
- **Bảng màu**: nền giấy ngà `#E7E3D9`, mực đen `#141414`, cam nhấn `#FF6A1A`, lưới kẻ
  `rgba(20,20,20,0.32)`, kem cho biến thể "card" `#F5F0E4`, chữ trên nền tối `#F7F4EC`.
  Cam là màu DUY NHẤT được dùng làm điểm nhấn — không thêm màu nhấn thứ hai.
- **Font**: Be Vietnam Pro, weight 700/900 (chỉ dùng nét đậm/rất đậm, không dùng regular
  cho tiêu đề), hỗ trợ dấu tiếng Việt đầy đủ.
- **Nền cảnh mặc định — lưới CHUYỂN ĐỘNG** (thay lưới tĩnh của v1): lưới ô vuông 84px, nét `rgba(20,20,20,0.32)`, trôi chậm theo một hướng để nền có sức sống mà không cạnh tranh với chủ thể. Ba biến thể khác giữ nguyên: `chart` (đường kẻ ngang đậm cho cảnh số liệu), `card` (nền phẳng không lưới cho cảnh tiêu đề/trích dẫn), `spotlight` (vignette tối cho cảnh cảnh báo/hệ quả). **Chọn biến thể có chủ đích theo từng cảnh**, đừng để mọi cảnh dùng mặc định; **hai cảnh liền nhau có nền nhìn thấy được (cảnh mascot, cảnh đồ hoạ, cảnh thẻ tài liệu) không dùng cùng một biến thể nền — và với lưới chuyển động thì không cùng hướng trôi** — để tạo khác biệt và biến đổi.
  - **Lưới chuyển động — kỹ thuật (tất định, `[ĐÃ KIỂM CHỨNG POC]`: 84px/4s = 21px/s, lưới lớn hơn khung 2 ô mỗi cạnh nằm trong wrapper `overflow:hidden`; `hyperframes check` ok, chỉ ghi `container_overflow` mức `info`; đo trên mp4 render: lưới dịch 72px so với kỳ vọng 71,4px):** một phần tử lưới lớn hơn khung mỗi cạnh ≥2 ô, trôi bằng GSAP `x`/`y` (alias transform) với `ease:"none"`, quãng trôi = số NGUYÊN ô (bội của 84px) trong đúng thời lượng cảnh nên không cần lặp vô hạn (cấm `repeat:-1`); tốc độ ~84px mỗi 4-6 giây; hướng đổi theo cảnh (trái/phải/lên/xuống/chéo); tuyệt đối không xoay. Chỉ nằm sau chủ thể, không đè lên media.
- **Không có thanh cam đáy khung hình** (v2 bỏ hoàn toàn dải cam mỏng ở mép dưới mà v1 dùng làm chữ ký thương hiệu). Màu cam `#FF6A1A` vẫn là màu nhấn duy nhất trong cảnh đồ hoạ (mục 3/6) nhưng không còn phần tử cố định nào ở mép dưới.

## 2. Xử lý ảnh cắt (cutout) — quy tắc quan trọng nhất về mặt hình ảnh

| Loại chủ thể | Màu | Đổ bóng |
|---|---|---|
| **Người** | Grayscale (đen trắng tương phản cao, KHÔNG phải halftone chấm bi — đã thử và bị loại) | CÓ — bóng cam đặc `#ff7a1a`, lệch 3% kích thước ảnh (tối thiểu 6px), là silhouette nhị phân sắc nét (không mờ, không gradient) |
| **Vật thể** | Giữ nguyên màu gốc | KHÔNG đổ bóng |

Việc này được xử lý ở bước xử lý ảnh (cắt nền), KHÔNG phải filter CSS lúc dựng — nghĩa là
file ảnh cuối cùng đã "chín" sẵn màu + bóng trước khi đưa vào cảnh.

**Ngoại lệ chính thức cho dự án này — ảnh AI tạo qua Google Flow (Stage 2b):** các ảnh đó là tranh
minh hoạ paper-collage CÓ MÀU (phong cách riêng của Stage 2b, quyết định tách khỏi bảng trên từ
2026-09-20), KHÔNG phải ảnh cutout thật đã xử lý grayscale + bóng cam. Khi dựng, dùng chúng NGUYÊN MÀU
như file gốc: không CSS filter/grayscale, không tách nền, không đổ bóng giả. Bảng trên chỉ áp cho ảnh cutout
thật đã được xử lý sẵn. Mọi stage (5 scene plan, 6 shotlist, 7 codegen + reviewer) theo ĐÚNG ngoại lệ này —
đây là nguồn duy nhất; ghi chú trong từng script chỉ nhắc lại và trỏ về đây. (Thiếu ngoại lệ này ở Stage 6
từng làm reviewer Stage 7 lật qua lật lại giữa "đòi grayscale" và "cấm filter" — xem
`planning/incident-log.md` mục 2026-09-26.)

Luôn crop sát nội dung trước khi đặt vào khung — một cutout còn nhiều viền trong suốt sẽ
luôn trông nhỏ hơn thực tế dù khung chứa nó có to bao nhiêu.

## 3. Chữ & caption

**Cảnh asset và cảnh mascot: KHÔNG có chữ nào trên hình** — không punch phrase, nhãn, mốc thời gian, địa điểm, con số, tên, tiêu đề hay trích dẫn. Chữ duy nhất là phụ đề đồng bộ giọng đọc (bên dưới). Lý do: mỗi phần tử chữ do code tự đặt là một nguồn lỗi (chồng nhau, nghiêng, bị che, quá nhiều); bỏ hẳn thì không còn lỗi đó. Muốn có chữ nhấn mạnh có kiểm soát là quyết định riêng của người dùng sau này, không tự thêm.

**Cảnh đồ hoạ** (chỉ khi thiếu asset phù hợp, mục 4) giữ quy tắc cũ sau, kèm giới hạn mới:

- **Punch phrase** (tiêu đề/điểm nhấn của cảnh): weight 900, cỡ mặc định 70px, lineHeight
  1.34, luôn đo bằng bề rộng ký tự thật (không đếm số ký tự để đoán) để không bao giờ vỡ
  dòng giữa câu hay tràn khung. Trên nền tối dùng màu kem `#F7F4EC` thay vì mực đen.
- **Nhãn vẽ tay** (label trong diagram/annotation): tối đa **4 từ**, và **không được lặp
  lại nguyên văn lời thoại** — nó phải bổ sung thông tin, không phải phụ đề thứ hai.
- **[ĐÃ DUYỆT] Giới hạn cảnh đồ hoạ:** tối đa 1 punch phrase + 2 nhãn/thẻ chữ mỗi cảnh; hai phần tử chữ/thẻ không bao giờ giao nhau; mọi chữ/thẻ đặt THẲNG (`rotation=0`, không skew) ở mọi thời điểm, kể cả lúc đang vào cảnh.
- **Caption đồng bộ giọng đọc**: 4 từ/dòng, reset ở ranh giới câu, đồng bộ theo timestamp
  cấp từ (word-level, ví dụ từ Whisper) — không tự ước lượng bằng cảm giác. Neo cố định
  `bottom: 374px`, nền `rgba(10,10,10,0.8)`, bo góc 14px, đệm `12px 24px`. Mount MỘT LẦN ở
  cấp timeline tổng (không phải theo từng cảnh) bằng frame tuyệt đối, để đọc liền mạch
  xuyên qua các lần chuyển cảnh.

## 4. Ba loại cảnh và 13 ngôn ngữ thị giác

Mỗi cảnh thuộc ĐÚNG MỘT trong ba loại; Stage 5 chọn:

1. **Cảnh asset** — dùng ảnh/video minh hoạ có sẵn, kể cả thẻ tài liệu PDF `doc-NN` (người dùng chốt: `doc-NN` là **asset tương đương**, dùng như hiện nay: thẻ đặt giữa khung, `object-fit:contain`, giữ nguyên bản — không mờ/filter/lớp tối, không vẽ thêm highlight, không chép lại chữ bản án thành HTML; nền phía sau thẻ là một biến thể nền ở mục 1). Chỉ có media + phụ đề. KHÔNG icon, diagram, thẻ, chữ, mũi tên, nét vẽ, lớp tối/vignette phủ lên media. Ngôn ngữ thị giác: `background-photo`, `cutout`, `split` (hai media đối lập/xen nhau), `document` (thẻ hồ sơ nguyên bản). Sự sống đến từ chuyển động của chính asset (mục 5).
2. **Cảnh mascot** — người kể capybara toàn khung (mục 4b).
3. **Cảnh đồ hoạ** — CHỈ khi không còn asset nào khớp (Stage 2b đã không bổ sung được). Giữ nguyên toàn bộ bảng 13 ngôn ngữ ở [`references/visual-languages.md`](references/visual-languages.md) (`diagram`, `flow`, `timeline`, `data`, `map`, `quote`, `annotated`, `mockup`, `text-only`…) và quy tắc đi kèm. Không xếp đồ hoạ lên media của cảnh asset.

**Quy tắc chọn ưu tiên hàng đầu — dùng media nguồn có sẵn**: nếu có ảnh/video nguồn chuẩn bị riêng cho đúng kịch bản/cảnh này, PHẢI dùng nó làm cảnh asset (mặc định), thay vì dựng cảnh đồ hoạ. Chỉ dựng cảnh đồ hoạ khi: (a) không còn asset nào khớp nội dung cảnh, hoặc **(b) `[ĐÃ DUYỆT]` asset có sẵn không truyền tải được quan hệ chính xác cần thể hiện (số liệu, cấu trúc, vị trí)** — khi đó dựng MỘT CẢNH ĐỒ HOẠ RIÊNG chứ KHÔNG đặt overlay lên asset (v1 ở trường hợp (b) cho overlay nhẹ trên media; v2 thay bằng cảnh riêng). Xem `references/editorial-framework.md`.

**Tư duy "quan hệ trước, component sau" vẫn là lõi — áp dụng cho cả cảnh asset.** Trước khi chọn cách trình bày asset phải trả lời được quan hệ người xem cần THẤY HÌNH THÀNH (mục 7), rồi mới chọn cách trình bày; không chọn kiểu camera/bố cục trước rồi biện minh ngược:

| Quan hệ cần thấy | Cách trình bày asset (không chữ, không overlay) |
|---|---|
| Chi tiết quan trọng trong một khung rộng | camera đẩy vào/lia tới đúng chi tiết đó |
| Đối lập / so sánh | `split` chia đôi hai media; một bên lấn sang bên kia nếu là "đảo chiều" |
| Tiết lộ, bước ngoặt | reveal (wipe/mask) từ khung này sang khung kia |
| Từ toàn cảnh đến cụ thể (hoặc ngược lại) | đổi shot/crop, camera đẩy vào/lùi ra |
| Không khí, bối cảnh | `background-photo` full-khung, chuyển động chậm có chủ đích |
| Bằng chứng tài liệu | thẻ `doc-NN` giữa khung, đi kèm chuyển cảnh rõ ràng |

**Các quy tắc khác**: không ngôn ngữ nào chiếm quá 50% số cảnh; không lặp cùng một ngôn ngữ ở hai cảnh liên tiếp; `text-only` ≤15%. **Quy tắc "hầu hết cảnh mạnh xếp chồng ≥2 ngôn ngữ" của bản v1 BỊ BỎ cho cảnh asset** — nó khiến hầu hết cảnh có thêm lớp chữ/thẻ, là nguồn lỗi chồng/nghiêng/quá nhiều đã gặp.

**Rủi ro v2 phải kiểm soát — đơn điệu.** Bài học v1: video bị chê có 54-67% cảnh thuộc nhóm "giống nhau nhất", video được thích 23-38% (`references/quality-bars.md` §6). Cảnh asset đều là media toàn khung nên dễ giống nhau theo thiết kế; vì vậy `[ĐÃ DUYỆT]`: đo "kiểu trình bày" của cảnh asset (đẩy vào, lùi ra, lia, đổi crop, `split`, reveal, nhiều shot cắt, thẻ `doc-NN`); không hai cảnh liên tiếp cùng kiểu; không kiểu nào quá ~35% số cảnh asset; nhóm cảnh giống nhau nhất ≤38% tổng số cảnh (đo trên bản dựng thật).

### 4b. Mascot capybara (thư viện `capybara-library-v1`, 17 PNG 1024×1536 nền trong suốt)

- Là NGƯỜI KỂ, không phải hình chứng minh sự kiện. Dùng khi: đặt câu hỏi, bình luận/bóc tách giả định, ví von nhẹ, chuyển ý, chốt ý, đoạn nhạy cảm (`serious`/`concerned`/`sad`). KHÔNG quota; KHÔNG dùng để lấp chỗ thiếu asset (thiếu asset → cảnh đồ hoạ).
- Cảnh mascot là shot RIÊNG toàn khung: chỉ nhân vật + nền; không ghép ảnh/video/đồ hoạ/chữ/bong bóng thoại. **Nền là một biến thể nền của ADN (mục 1), không cố định `#E7E3D9` phẳng như template kit:** đổi biến thể/hướng lưới giữa các cảnh liền kề; lớp nền là phần tử riêng PHÍA SAU ảnh PNG, không đụng tới pixel PNG (không filter/shadow lên nhân vật).
- **Chọn theo chức năng kể chuyện, không theo cảm tính.** Mascot phải gắn với `narrativeFunction` của đoạn (hook/question/paradox/mechanism/evidence/reversal/conclusion…, xem `references/editorial-framework.md`) và `contrastWithPrevious` (đổi nhịp so với cảnh trước). Ánh xạ gợi ý với `narrativeRole` của kit: `hook`→`opening`/`question`; `question`/`paradox`→`question`/`uncertainty`; `mechanism`/`cause`→`analysis`/`explanation`; ví von→`light_analogy`; hậu quả→`consequence`; sự kiện nhạy cảm→`sensitive_fact`/`empathy`; `reversal`→`established_point`/`uncertainty`; `conclusion`→`takeaway`/`closing`. Mascot cũng là **chỗ thở** hợp lệ sau một cụm cảnh mật độ cao (mục 5) — nhưng KHÔNG được dùng chỉ để lấp thời lượng.
- **Độ dài cảnh mascot 3–5 giây, do ý đồ quyết định (không phải con số cố định):** nhấn mạnh dứt khoát (đặt câu hỏi, chốt ý) ngắn ~3 giây; bình luận/giải thích/ví von/chỗ thở dài hơn tới ~5 giây; điểm cắt bám khoảng nghỉ hơi/ranh giới câu của lời thoại thật, không bám độ dài lời thoại; không để hai cảnh liên tiếp có độ dài gần bằng nhau (±15%, tránh nhịp metronome); mascot không dồn vào một đoạn và không biến mất ở 1/3 cuối video (video không được "nhạt dần").
- **Sự kiện thị giác trong cảnh mascot `[ĐÃ DUYỆT]`:** quy tắc cốt lõi "không quá 3 giây không có sự kiện thị giác mới" vẫn áp dụng, nhưng cảnh mascot >3 giây có xung đột (1 pose + `grow-600` chỉ có sự kiện ở 0,6s đầu; nền lưới trôi là chuyển động nền chứ không tính là sự kiện mới). Quy định: cảnh mascot >~3,5 giây tách 2 shot đổi pose (đúng contract kit: đổi pose = shot mới, không cùng pose liền nhau) để luôn có sự kiện thị giác mỗi ≤3 giây.
- Chọn đúng ID có thật trong `manifest.json`; không suy tổ hợp trang phục×biểu cảm từ tên. Mặc định trang phục `host`; `reporter` chỉ cho đoạn tường thuật. Giữ cùng trang phục xuyên phân đoạn. Mỗi shot 1 pose; đổi pose = shot mới; không cùng pose ở hai shot mascot liền nhau.
- Hiển thị: PNG nguyên trạng (không crop/mirror/stretch/xoay/filter/shadow/recolor), contain trong x40 y160 w1000 h1230 (y≤1390, nằm trên vùng phụ đề). Preset duy nhất: `hold` hoặc `grow-600` (scale .97→1 trong 0,6s). Không lip-sync, không chớp mắt, không idle motion ngẫu nhiên.
- Stage 7 không vẽ lại nhân vật bằng CSS/SVG/canvas, không đổi ID; thiếu file thì trả lỗi.

## 5. Chuyển động & nhịp độ

**Cảnh asset** — sự kiện thị giác là thay đổi có chủ đích người xem nhận ra: đổi shot/crop, camera đẩy vào/lùi/lia tới chi tiết, chia đôi hai media, reveal (wipe/mask), hoặc hành động thật trong video nguồn. Ken Burns chậm đều kéo suốt cảnh KHÔNG tính là nhịp mới. Không để quá 3 giây không có sự kiện thị giác. Sự kiện phải gắn với cụm từ (cue) có thật trong lời thoại và **dàn đều theo cue**, không dồn hết vào ~2 giây đầu rồi để im 5-10 giây (bài học v1); điểm chuyển cảnh bám khoảng nghỉ hơi/ranh giới câu.

**Kiểu vào cảnh/chuyển cảnh — vẫn không bao giờ lặp ở hai cảnh liên tiếp (mọi loại cảnh).** Cảnh asset: cách shot đầu "đến" (cắt thẳng, đẩy vào từ xa, wipe/reveal, trượt `split`, zoom-through…) phải khác cảnh liền trước; âm thanh chuyển cảnh cũng đổi theo cảnh (tránh 1-2 hiệu ứng cho cả video).

**Cảnh mascot** — chỉ `hold` hoặc `grow-600`, không thêm chuyển động nào khác lên nhân vật (kit cấm idle motion vì các pose không căn khớp theo pixel — làm khác đi sẽ gây rung). Sự sống của cảnh đến từ nền lưới chuyển động (mục 1) và việc đổi biến thể nền/hướng trôi giữa các cảnh; hai cảnh `hold` liên tiếp hãy xen `grow-600`.

**Cảnh đồ hoạ** — kiểu vào cảnh chỉ dùng bộ KHÔNG XOAY: rise, grow, punch, shatter, unfold, zoom-through, strike ([`references/animation-variants.md`](references/animation-variants.md)). **BỎ `flip` (rotateY), `peel`, `spiral`, `wobble-drop`** — bốn kiểu này có xoay, là gốc của lỗi "thẻ chữ nghiêng/xoay". Không hai cảnh liên tiếp cùng kiểu vào cảnh. **Chuyển động nền liên tục vẫn BẮT BUỘC (bài học v1: chủ thể đứng yên = ảnh tĩnh chết cứng) và vẫn phải đổi CHẾ ĐỘ giữa các phần tử cùng khung, lệch pha** — nhưng chỉ dùng chế độ KHÔNG xoay: `bob` (trôi dọc vài px), `drift-x` (trôi ngang vài px), `breathe` (scale 1→1,012). BỎ `sway`/`tremble` (xoay theo độ).

**Quy tắc chung:** không phần tử nào của cảnh (chữ, thẻ, media, mascot) có `rotation` ≠ 0 hoặc skew tại bất kỳ thời điểm nào.

**Nhịp dựng**: một cảnh trung bình 6-9 giây (cảnh dài quá 13 giây là dấu hiệu "chết khí");
15 giây mở đầu cần nhiều nhịp riêng biệt thay vì một cảnh giới thiệu dài; punch phrase (chỉ ở cảnh đồ hoạ) phải
giữ tối thiểu 48 khung hình (1.6 giây) để đọc kịp; không được để quá 3 giây trôi qua mà
không có sự kiện thị giác mới nào xuất hiện (dead-air).

**Ngưỡng dưới — không hy sinh nhịp độ để chiều theo media**: quy tắc "ưu tiên dùng media
nguồn có sẵn" ở mục 4 KHÔNG được phép biến một scene thành ngắn hơn ~5 giây chỉ để mỗi
asset có một scene riêng. Nếu nội dung lời thoại cho một beat quá ngắn để tách thành scene
độc lập đạt chuẩn 5s+, chọn MỘT trong hai hướng thay vì tách nhỏ: (a) gộp nhiều asset liên
quan vào chung một scene (cắt cảnh giữa các asset bằng shot ngắn bên trong cùng một scene),
hoặc (b) giữ hình ảnh hiển thị LÂU HƠN lời thoại đã giới thiệu nó — thời gian trên màn hình
không bắt buộc bằng thời gian nói (xem `references/editorial-framework.md`, nguyên tắc
`comprehensionLoad`). Ưu tiên dùng media thật và giữ đủ nhịp độ để xem kịp là YÊU CẦU ĐỒNG
THỜI, không phải hai lựa chọn đánh đổi lẫn nhau.

**Cảnh mascot và ngưỡng ~5 giây:** cảnh mascot không áp ngưỡng dưới ~5 giây của cảnh asset (đó là một nhịp kể chuyện/chỗ thở, không phải nhịp xem asset); độ dài 3–5 giây do ý đồ nhấn mạnh và nhịp dựng quyết định, xem mục 4b. Các nguyên tắc nhịp còn lại (cảnh `complex` không ngắn hơn trung vị, phần tử hiện diện ≥1,5 giây, tránh metronome ±15%, có chỗ thở giữa các cảnh mật độ cao) vẫn áp dụng nguyên cho mọi loại cảnh.

## 6. Icon vocabulary chuẩn hoá

15 biểu tượng vẽ tay bằng đường path tự-vẽ-dần: ban, check, clock, crowd, density, doc, fall, money, person, phone, pin, question, rise, scale, warning. **Chỉ dùng trong CẢNH ĐỒ HOẠ** (thiếu asset). Tuyệt đối không đặt icon lên cảnh asset hay cảnh mascot. Diagram/icon tự-vẽ-dần phức tạp rất dễ lỗi hoặc xấu khi code tự sinh hàng loạt, ưu tiên phiên bản đơn giản.

## 7. Khung tư duy biên tập — "Ý NGHĨA trước, COMPONENT sau"

Đây là nguyên tắc quan trọng nhất trong toàn bộ DNA này, và là nguyên nhân gốc rễ khiến
một AI dựng video thường ra kết quả "công thức hoá, lặp lại" nếu bỏ qua nó. Xem đầy đủ ở
[`references/editorial-framework.md`](references/editorial-framework.md).

Trước khi viết bất kỳ đoạn hình ảnh nào cho một cảnh, phải trả lời được câu hỏi:

> **Quan hệ nào người xem phải THẤY HÌNH THÀNH trên màn hình?**

Không phải "cảnh này đang nói về cái gì" (câu hỏi đó chỉ ra minh hoạ cho ĐỀ TÀI, tức là
filler) — mà là quan hệ cụ thể một tấm ảnh tĩnh không thể truyền tải được: một kích thước
so với cơ thể người, một lực tác động rồi bị chặn lại, một số đếm tăng dần đến một con số,
một chuỗi đang hoạt động rồi đứt gãy.

Chỉ sau khi xác định được quan hệ đó, mới lần lượt quyết định: chức năng kể chuyện của
đoạn thoại này là gì (hook/câu hỏi/nghịch lý/nguyên nhân/chuỗi nhân quả/liệt kê/định
nghĩa/cơ chế/bằng chứng/đảo chiều/kết luận) → **có media nguồn nào đã chuẩn bị sẵn khớp
quan hệ đó không** (kiểm tra manifest media trước tiên — media chuẩn bị riêng cho kịch bản
này luôn được ưu tiên hơn dựng mới) → ngôn ngữ thị giác nào phù hợp (mục 4) → và CUỐI CÙNG
mới là animation/component cụ thể để dựng nó. Đảo ngược thứ tự này — chọn animation/template
trước rồi mới biện minh ngược lại — là nguyên nhân gốc của mọi video bị người xem đánh giá
"rập khuôn, lặp lại".

**Phạm vi code scene (HyperFrames, trước đây Remotion)**: diagram/icon tự-vẽ-dần phức tạp
(mục 6) rất dễ lỗi hoặc trông xấu khi để code tự sinh hàng loạt. Code scene nên tập trung vào
phụ đề/caption, (v2: text/tiêu đề/punch-phrase chỉ ở cảnh đồ hoạ), ráp nối & hiệu ứng cho A-roll/B-roll (media thật:
crop/pan/zoom/Ken-Burns, chuyển cảnh), và motion graphics/transition effect (GSAP timeline bên
HyperFrames) — không phải vẽ minh hoạ từ đầu khi đã có media phù hợp. Diagram/icon tự vẽ toàn
cảnh chỉ dùng khi thực sự không có media phù hợp (mục 4), ưu tiên phiên bản đơn giản thay vì bộ
"self-drawing SVG path" phức tạp ở mục 6 nếu không thật sự cần thiết cho cảnh đó.

**Phạm vi v2:** cảnh asset = media thật + camera + chuyển cảnh + phụ đề, không gì khác. Cảnh mascot ráp TẤT ĐỊNH từ template của kit (bind ID/duration/preset), không do AI viết code. Chỉ cảnh đồ hoạ mới do generator dựng bố cục.

## 8. Ngưỡng chất lượng — "tốt" trông như thế nào bằng số

Xem đầy đủ ở [`references/quality-bars.md`](references/quality-bars.md), gồm cả hồ sơ số
liệu tham chiếu của video được đánh giá đạt cả 4 tiêu chí nghiệm thu. Vài ngưỡng cốt lõi
(vẫn nguyên hiệu lực ở v2): độ phủ vùng minh hoạ ≥12% khung hình (mục tiêu 25%), hero
chiếm 45-55% dải nội dung hữu dụng (cảnh asset toàn khung luôn thoả), không quá 3 giây không
có sự kiện thị giác mới, video không được "nhạt dần" ở 1/3 cuối, và 4 tiêu chí nghiệm thu
(illustrated / composed / varied / purposeful) vẫn cần một người/agent thật sự NHÌN bản dựng
đã ghép caption. Riêng v2: (1) mọi phần tử có mặt phải có lý do — mascot gắn `narrativeFunction`;
(2) đa dạng kiểu trình bày cảnh asset theo mục 4; (3) hồ sơ tham chiếu V10 là hồ sơ v1 —
**không sửa số, không hạ**; sẽ lập hồ sơ v2 riêng từ video v2 đầu tiên được duyệt.

## 9. Bài học đã trả giá

[`references/lessons.md`](references/lessons.md) tổng hợp các quyết định thiết kế đã sai
một lần và không nên lặp lại (vd: một ghim trên bản đồ trắng không phải là bản đồ; vẽ
khung chứa — TV, điện thoại — thay vì cố cắt nền một vật thể có hình dạng đơn giản; một
claim về mật độ phải được vẽ như mật độ, không phải một ví dụ đại diện).

## 10. Cách dùng bộ DNA này cho một dự án mới

1. Đọc toàn bộ file này trước.
2. Đọc [`references/worked-examples.md`](references/worked-examples.md) — 12 ví dụ thật
   "lời thoại → quyết định hình ảnh" kèm phương án bị loại và lý do. Đây là phần huấn
   luyện trực giác quan trọng nhất, đọc trước khi quyết định hình ảnh cho BẤT KỲ cảnh nào.
3. Khi lên kế hoạch cảnh, dùng đúng schema ở `references/editorial-framework.md` (đừng bỏ
   qua tầng Editorial Director để nhảy thẳng vào chọn animation).
4. Khi cần biết một quyết định có "đủ tốt" chưa, đối chiếu với `references/quality-bars.md`.
5. Style đã được quyết định sẵn — không cần hỏi lại user về màu sắc/font/tỉ lệ khung hình,
   trừ khi họ chủ động muốn đổi.
