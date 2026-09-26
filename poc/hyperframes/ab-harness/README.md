# Harness A/B Stage 7 — cách POC CHUẨN của repo (từ 2026-09-26)

Chạy **đúng script `scripts/07-codegen.hf.router.mjs` production** trong các "mini-root" cách ly ngoài repo, nên
kết quả phản ánh đúng pipeline thật. `poc/hyperframes/codegen-poc.mjs` là bản sao prompt cũ đã **lệch production**
(thiếu quy tắc, check không pin version, không có caption-zone) — chỉ giữ để tham khảo lịch sử, KHÔNG dùng để
quyết định thay đổi mới.

## Quy trình
```bash
# 1. Dựng mini-root: mỗi arm = 1 bản scripts/ (git ref, WORKTREE, hoặc đường dẫn); --work phải NGOÀI repo
node poc/hyperframes/ab-harness/ab.mjs setup --work=<dir> --arms=base:HEAD,v2:WORKTREE \
  --videos=ban-an-425-phan-1,nvidia-phu-song-viet-nam --reps=2 \
  [--routing=v2alt:reasoning_generator=cx/gpt-5.6-sol]
# 2. Chạy (các arm xen kẽ trong 1 hàng đợi để chịu cùng tải/hạn mức 9router)
node poc/hyperframes/ab-harness/ab.mjs run --work=<dir> --scenes=ban-an-425-phan-1:S01,nvidia-phu-song-viet-nam:S04 --concurrency=4
# 3. Số liệu: PASS lần 1, fail, số lần thử, mã lỗi verify, stage trong codegen-issues, dùng model dự phòng, thời gian
node poc/hyperframes/ab-harness/ab.mjs analyze --work=<dir>
```

## Chấm chất lượng độc lập (Claude KHÔNG tự xem ảnh)
```bash
# Trích khung 3 mốc/shot từ scene đã PASS (đổi ngược sub-composition → standalone, CÓ nạp GSAP)
node poc/hyperframes/ab-harness/snap-scene.mjs <projectDir> <SceneId> <shotlist.json> <scene-plan.json> <outDir>
# Chấm mù theo cặp qua vision_qa, đảo thứ tự A/B để khử thiên vị vị trí
node poc/hyperframes/ab-harness/judge-pair.mjs <outDirX> <outDirY> "<bối cảnh scene>" <out.json>
```
**Bắt buộc** kiểm tra khung có chuyển động (kích thước file/SSIM khác nhau giữa các mốc) trước khi chấm — bài
học thật 2026-09-26: bản dựng ngược thiếu GSAP cho khung CHƯA animate mà không báo lỗi, làm hỏng 1 đợt chấm.

## Giả lập lỗi hạ tầng
`fault-proxy.mjs` đứng trước 9router thật: trả 503 "[403] … (reset after 3s)" cho model khớp `REVIEW_MATCH`
(regex) trong `FAIL_REVIEW_TIMES` lần đầu, chuyển tiếp mọi lời gọi khác. Dùng để kiểm chứng
`callWithModelFallback()` mà không mock code. Chạy 07 với `NINEROUTER_BASE_URL=http://127.0.0.1:<PORT>/v1`.
Kiểm tra cổng trống trước khi chạy (proxy cũ còn sống sẽ chiếm cổng — đã gặp thật).
