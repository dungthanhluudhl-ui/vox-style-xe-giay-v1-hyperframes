# Archive: pipeline Remotion (4 video đầu)

Nguồn Remotion của 4 video đầu (`an-le-64`, `an-le-64-phan-2`, `tham-hoa-itaewon-phan-1`,
`tham-hoa-itaewon-phan-2`), giữ nguyên tại đây sau khi repo di trú sang HyperFrames
(2026-09-21) — xem `planning/README.md` mục "Archive: pipeline Remotion cũ" và
`planning/responsibility-matrix.md` mục "Lịch sử: pipeline Remotion" để biết đầy đủ quy trình.

**Không phát triển video mới ở đây** — chỉ dùng khi cần sửa lỗi phát sinh cho 1 trong 4 video
archive này.

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
