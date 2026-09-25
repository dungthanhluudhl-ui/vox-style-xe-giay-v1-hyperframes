# S04 assembled caption-safe retry

Regenerate S04 through the normal generator, HyperFrames check, and reviewer loop. Preserve the approved scene plan, shotlist, asset, duration, copy, split-card mechanism, and flip entrance. Fix the assembled-project evidence below:

1. Remove the decorative footer `MÔ HÌNH VẬT LÝ THỦY ĐỘNG LỰC` entirely. It overlaps generated captions around global 32.967s and 39.460s.
2. Keep every scene-authored text element, diagram caption, badge, icon label, and decoration containing text entirely above y=1220px on the 1080x1920 canvas. The caption rail below must remain empty.
3. Move `MẶT CẮT: SEAWALL RAMP FAILURE` upward into its own non-overlapping zone above y=1150px, or remove this optional decorative English caption. Do not mark overlaps as allowed and do not suppress layout audit.
4. Timed framework clip owners must remain full-frame; animate only untimed inner elements. Use stable ids, one writer per property, absolute seek-safe states, and one paused timeline registered as `window.__timelines["main"] = tl` without initializing the registry.
