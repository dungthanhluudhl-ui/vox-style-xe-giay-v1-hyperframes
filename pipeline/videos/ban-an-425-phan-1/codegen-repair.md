Repair the existing standalone scene rather than redesigning it. Preserve the shotlist meaning, media, Vietnamese copy, timing, and Vox-style visual identity.

Make `hyperframes check` pass with zero errors, including lint, runtime, layout, motion, contrast, and the configured caption safe-zone:

- Every `<video src>` must be framework-timed with valid `data-start`, `data-duration`, and `data-media-start` where needed.
- Remove or reposition text that is occluded, overlapping, outside the canvas, or inside the reserved caption band. Decorative/background chart labels may be removed if they trigger false visual clutter.
- Increase text/background contrast to the required WCAG threshold. Prefer the established near-black, warm cream, white, and orange style tokens.
- Keep all important text and overlays above the caption zone and within the canvas after transforms.
- Use explicit deterministic GSAP baseline states on the paused main timeline. Replace standalone `gsap.set()` and snapshot-dependent `to()`/repeat patterns with timeline `set()` or explicit `fromTo()` states.
- Treat overflow warnings as errors when caused by an intentional animated transform: add the correct layout allowance to the moving element/container or constrain the transform.
- Do not modify repo pipeline scripts, shared files, source media, captions, scene plan, or shotlist.

Run the scene check mentally against all sampled times before returning the repaired complete `index.html`.
