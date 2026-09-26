Repair the existing standalone scene only. Preserve every part not implicated below. The scene already passed HyperFrames technical verification; fix the relevant reviewer finding while keeping lint, runtime, layout, motion, contrast, caption-zone, media timing, determinism, and the shotlist valid.

Scene-specific reviewer findings from the latest review (these supersede older findings):

- S05: The torn-paper edge is still missing. Build an unmistakable irregular paper edge around the video using deterministic CSS/SVG geometry, not a rounded rectangular card, plain border, or box shadow.
- S07: Implement the shotlist freeze: show moving video only until about 7.8s, then a deterministic held final visual from 7.8s through 11.54s. Concentrate the Ken Burns pan-right in the held section. Do not use asynchronous loadedmetadata/seeked/canvas event state.
- S08: Replace the incorrect missing-child full-frame asset. Use the available assigned cafe/friends image and girl image in a two-photo collage matching the shotlist. Preserve source media color generally, while applying the requested grayscale character treatment with a clearly visible orange `#ff7a1a` shadow to the intended portrait layer. Keep the already-correct overlay timing and exits.
- S10: The moving video must end at 7.8s, followed by a deterministic held final visual through 9.0s. Put the zoom primarily in this 1.2-second hold. Give each label/icon an explicit exit matching its holdMs. A 9-second continuously playing video is not acceptable.
- S11: Remove CSS `transform` baselines from `.dashed-line` and `.vs-badge`; declare their complete initial transform states inside timeline `fromTo()`/`set()` only. Preserve the now-correct dark spotlight, parallax, and overlay exits.
- S15: Add `class="clip"`, `data-start`, and `data-duration` to the three timed overlays `date-badge`, `phone-status`, and `amount-card`, matching their current shotlist/GSAP windows. Preserve the corrected video timing and transform wrappers.
- S17: Change composition root sizing from hardcoded `1080px`/`1920px` to `width:100%; height:100%`. Preserve the corrected shard occlusion.
- S18: Add `data-layout-allow-overflow="true"` directly to `#camera`, whose deliberate scale 1.05 zoom extends beyond the frame. Preserve the corrected overlay exit.

Do not weaken checks, delete essential shotlist content, alter shared pipeline code, or replace source assets.
