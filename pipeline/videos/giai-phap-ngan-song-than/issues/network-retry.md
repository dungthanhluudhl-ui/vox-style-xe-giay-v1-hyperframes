# Clean retry after reviewer availability reset

Regenerate the assigned scene through the full generator, HyperFrames check, and reviewer loop. Preserve the approved scene plan, shotlist, timing, copy, assets, and visual intent.

The prior attempt reached a passing HyperFrames check but could not complete the reviewer step because ag/claude-sonnet-4-6 returned a temporary HTTP 403/503 availability reset. This is not approval to skip review. Produce a clean deterministic composition and run the reviewer normally.

Maintain the core contract: untimed root; framework-owned timed media; no timed-media nesting; stable ids; no animation on timed clip owners; one writer per property; absolute seek-safe states; text above the caption safe zone; and exactly one paused timeline registered as `window.__timelines["main"] = tl` without initializing the registry.
