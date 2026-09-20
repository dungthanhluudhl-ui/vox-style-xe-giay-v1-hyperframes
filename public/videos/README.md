# Tài nguyên theo từng video

Mỗi video có 1 thư mục con `videos/<slug>/` (slug = tên ngắn không dấu, vd `an-le-64`), chứa:
- `audio/narration.mp3` — audio narration sạch (đã xử lý noise, chuẩn loudness). SFX/nhạc nền đặt vào `audio/sfx/` hoặc `audio/music/` nếu có.
- `captions/captions.json` — file caption JSON (`Caption[]` của `@remotion/captions`) sinh từ audio.
- `media/images/` — ảnh nguồn (source images) dùng để dựng scene.
- `media/videos/` — video clip nguồn (source footage) dùng để dựng scene.

Style DNA (màu sắc, font, cutout, caption style, ngôn ngữ thị giác...) dùng CHUNG cho mọi video, xem `planning/style-dna/` — không đặt trong thư mục theo video.
