# Vox-style xé giấy — pipeline dựng video (HyperFrames)

Repo sản xuất video dạng phóng sự/kể chuyện phong cách "xé giấy" (paper-tear/cutout), tiếng Việt,
dựng bằng [HyperFrames](https://hyperframes.heygen.com) (HTML + CSS + GSAP, render qua headless
Chrome + FFmpeg). Toàn bộ pipeline điều phối bởi Claude Code, sinh code qua 9router (model
routing nội bộ), verify/render tất định local — xem `CLAUDE.md` (cách làm việc) và
`planning/README.md` (quy trình dựng 1 video, trạng thái hiện tại).

## Bắt đầu

```console
npm i
```

Xem `planning/README.md` mục "Input cần nhận từ bạn" và "Các bước dựng 1 video" để biết đầy đủ
quy trình 8 bước (transcribe → media → scene plan → shotlist → codegen → render).

## Cấu trúc thư mục

Mỗi video có 1 slug ngắn không dấu (vd `ban-an-473-phan-1`), nội dung riêng nằm trong
`videos/<slug>/` bên trong từng nhóm:

- `content/videos/<slug>/` — script.
- `public/videos/<slug>/` — audio, media nguồn, captions.
- `hyperframes/videos/<slug>/` — project HyperFrames (composition, assets).
- `planning/videos/<slug>/` — scene plan, shotlist.
- `pipeline/videos/<slug>/` — dữ liệu trung gian (transcript thô, manifest media, run log).

Phần dùng CHUNG cho mọi video (style DNA, script pipeline) nằm ở gốc mỗi nhóm — xem
`planning/style-dna/`.

## Preview & Render (1 video cụ thể)

```console
npx hyperframes preview --background hyperframes/videos/<slug>
npx hyperframes render --quality looks -o out/<slug>-full.mp4 hyperframes/videos/<slug>
```

## Archive

4 video đầu (`an-le-64`, `an-le-64-phan-2`, `tham-hoa-itaewon-phan-1`,
`tham-hoa-itaewon-phan-2`) được dựng bằng [Remotion](https://www.remotion.dev) trước khi repo di
trú sang HyperFrames — nguồn giữ nguyên tại `archive/remotion-legacy/` để tham khảo/sửa lỗi, xem
`planning/README.md` mục "Archive: pipeline Remotion cũ".

## Docs

- `planning/README.md` — quy trình dựng video, trạng thái hiện tại.
- `planning/responsibility-matrix.md` — ai/gì đảm nhiệm task nào trong pipeline.
- [HyperFrames docs](https://hyperframes.heygen.com) hoặc `npx hyperframes docs <topic>` (local, không cần mạng).
