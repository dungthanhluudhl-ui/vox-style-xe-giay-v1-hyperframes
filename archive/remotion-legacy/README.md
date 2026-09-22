# Archive: pipeline Remotion (4 video đầu)

Nguồn Remotion của 4 video đầu (`an-le-64`, `an-le-64-phan-2`, `tham-hoa-itaewon-phan-1`,
`tham-hoa-itaewon-phan-2`), giữ nguyên tại đây sau khi repo di trú sang HyperFrames
(2026-09-21) — xem `planning/README.md` mục "Archive: pipeline Remotion cũ" và
`planning/responsibility-matrix.md` mục "Lịch sử: pipeline Remotion" để biết đầy đủ quy trình.

**Không phát triển video mới ở đây** — chỉ dùng khi cần sửa lỗi phát sinh cho 1 trong 4 video
archive này.

4 script codegen/ráp Root.tsx của pipeline Remotion (`07-codegen.router.mjs`,
`07-codegen-parallel.mjs`, `08-sync-root.mjs`, `lib/sync-root-lib.mjs`) nằm tại
`archive/remotion-legacy/scripts/` (di chuyển từ gốc `scripts/` ngày 2026-09-22 để khớp đúng chú
thích "archive" đã có từ trước trong tài liệu). Các script này vẫn import 2 thư viện dùng chung
với pipeline HyperFrames hiện tại (`router-client.mjs`, `video-paths.mjs`) trực tiếp từ
`scripts/lib/` ở gốc repo qua đường dẫn tương đối (`../../../scripts/lib/...`) — cố ý không copy
trùng bản để tránh lệch, nên vẫn chạy được nếu môi trường Remotion (xem mục dưới) được khôi phục.

## Khôi phục môi trường để sửa lỗi

Repo gốc đã gỡ các dependency chỉ phục vụ Remotion/React khỏi `package.json` (giữ lại
`@remotion/captions`/`@remotion/install-whisper-cpp` vì vẫn dùng cho pipeline HyperFrames hiện
tại). Trước khi sửa code trong `src/` ở đây, cài tạm:

```console
npm i --no-save remotion@4.0.526 @remotion/cli@4.0.526 @remotion/google-fonts@4.0.526 \
  @remotion/media@4.0.526 @remotion/tailwind-v4@4.0.526 @remotion/eslint-config-flat@4.0.526 \
  react@19.2.3 react-dom@19.2.3 @types/react@19.2.7 @types/web@0.0.166 tailwindcss@4.0.0 \
  typescript eslint
```

`tsconfig.json` trong thư mục này (không phải ở gốc repo) là bản dùng cho `src/`. Chạy
`npx tsc -p archive/remotion-legacy/tsconfig.json --noEmit` và
`npx eslint archive/remotion-legacy/src` để kiểm tra sau khi sửa — cần một
`eslint.config.mjs` trỏ `@remotion/eslint-config-flat` (đã gỡ khỏi gốc repo, tự tạo tạm nếu cần).
