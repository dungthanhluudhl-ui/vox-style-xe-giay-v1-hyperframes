/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
// Đã đo thật bằng `npx remotion benchmark` (2026-09-20-21, xem planning/README.md): mặc định
// của Remotion trên máy này (min(8, cores/2) = 8) luôn là mốc CHẬM NHẤT trong mọi mốc đã test;
// concurrency=4 nhất quán nhanh nhất/gần nhanh nhất qua 3 vòng đo độc lập (2 benchmark mẫu +
// 1 render full video thật, ffprobe xác nhận output giống hệt). hardware-acceleration đã test
// riêng và KHÔNG tạo khác biệt đo được (chỉ tăng tốc bước encode, không phải bottleneck thật ở
// đây) nên không bật.
Config.setConcurrency(4);
