// Logic ráp src/Root.tsx — LOCAL, TẤT ĐỊNH, KHÔNG gọi AI. Dùng chung bởi
// scripts/08-sync-root.mjs (CLI) và scripts/07-codegen.router.mjs (gọi trực tiếp sau mỗi
// scene ở chế độ tuần tự, để verify() luôn render-smoke-test được trên Root.tsx mới nhất).
//
// Mỗi video có 1 khối riêng trong Root.tsx, phân tách bằng marker comment
// "// === VIDEO: <slug> START/END ===". Mỗi lần gọi syncRoot(slug), hàm đọc lại TOÀN BỘ danh
// sách video đã từng xuất hiện trong Root.tsx hiện có (quét marker) CỘNG slug đang sync, rồi
// build lại từ đầu — không giữ trạng thái cũ, luôn tất định từ scene-plan.json + file scene
// thật đang có trên đĩa của MỖI video. Nhờ vậy không cần splice text phức tạp.
import fs from "node:fs";
import path from "node:path";
import { videoPaths } from "../../../../scripts/lib/video-paths.mjs";

const FPS = 30;
const msToFrame = (ms) => Math.round((ms / 1000) * FPS);

function buildVideoBlock(slug, root) {
  const vp = videoPaths(slug, root);
  const allPlanned = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
  const existingSceneNames = fs.existsSync(vp.scenesDir)
    ? new Set(
        fs
          .readdirSync(vp.scenesDir)
          .filter((f) => /^Scene\d+\.tsx$/.test(f))
          .map((f) => f.replace(/\.tsx$/, "")),
      )
    : new Set();

  // Chỉ ráp những scene ĐÃ CÓ file code thật — cho phép gọi hàm này sau MỖI scene (tuần tự)
  // hoặc sau cả loạt (song song) đều đúng, không cần chờ đủ 100% scene trong kế hoạch.
  const scenes = allPlanned.filter((s) => existingSceneNames.has(s.id.replace("S", "Scene")));
  const missing = allPlanned.filter((s) => !existingSceneNames.has(s.id.replace("S", "Scene")));
  if (missing.length > 0) {
    console.warn(
      `(video "${slug}") chưa có code cho scene: ${missing.map((s) => s.id).join(", ")} — Root.tsx tạm thời chỉ gồm ${scenes.length}/${allPlanned.length} scene đã có.`,
    );
  }
  if (scenes.length === 0) {
    throw new Error(`Video "${slug}" chưa có scene nào được code — không có gì để ráp vào Root.tsx.`);
  }

  const totalFrames = msToFrame(scenes[scenes.length - 1].endMs);
  const pascal = vp.compositionId;

  const imports = scenes
    .map((s) => {
      const compName = s.id.replace("S", "Scene");
      const alias = `${pascal}${compName}`;
      return `import {${compName} as ${alias}} from "./videos/${slug}/scenes/${compName}";`;
    })
    .join("\n");

  const sequences = scenes
    .map((s) => {
      const compName = s.id.replace("S", "Scene");
      const alias = `${pascal}${compName}`;
      const from = msToFrame(s.startMs);
      const duration = msToFrame(s.endMs) - from;
      const label = `${s.id} · ${(s.notes || s.narrativeFunction || "").slice(0, 40)}`.replace(/"/g, "'");
      const fromProp = from === 0 ? "" : ` from={${from}}`;
      return `      <Sequence name="${label}"${fromProp} durationInFrames={${duration}}>
        <${alias} />
      </Sequence>`;
    })
    .join("\n\n");

  const block = `// === VIDEO: ${slug} START ===
${imports}

const ${vp.componentName}: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
        overflow: "hidden",
      }}
    >
${sequences}

      <Audio
        src={staticFile("${vp.audioStaticPath}")}
        durationInFrames={${totalFrames}}
        volume={() => 1}
      />

      <Captions src="${vp.captionsStaticPath}" />
    </AbsoluteFill>
  );
};
// === VIDEO: ${slug} END ===`;

  const compositionEntry = `      <Composition
        id="${vp.compositionId}"
        component={${vp.componentName}}
        durationInFrames={${totalFrames}}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />`;

  return { slug, compositionId: vp.compositionId, block, compositionEntry, totalFrames, sceneCount: scenes.length };
}

/** Ráp lại toàn bộ src/Root.tsx, gồm slug đang sync + mọi slug khác đã có sẵn trong file. */
export function syncRoot(slug, root = process.cwd()) {
  // Archive Remotion (Giai đoạn F, 2026-09-21): src/ di dời sang archive/remotion-legacy/src/.
  const rootTsxPath = path.join(root, "archive", "remotion-legacy", "src", "Root.tsx");
  const existing = fs.existsSync(rootTsxPath) ? fs.readFileSync(rootTsxPath, "utf8") : null;

  const existingSlugs = existing ? [...existing.matchAll(/\/\/ === VIDEO: (.+?) START ===/g)].map((m) => m[1]) : [];
  const allSlugs = [...new Set([...existingSlugs, slug])];

  const results = allSlugs.map((s) => buildVideoBlock(s, root));

  const content = `import "./index.css";
import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  staticFile,
} from "remotion";
import {Captions} from "./components/Captions";
import {
  CANVAS,
  COLORS,
  fontFamily,
} from "./styles/theme";

${results.map((r) => r.block).join("\n\n")}

export const RemotionRoot: React.FC = () => {
  return (
    <>
${results.map((r) => r.compositionEntry).join("\n")}
    </>
  );
};
`;

  fs.writeFileSync(rootTsxPath, content, "utf8");
  return results.find((r) => r.slug === slug);
}
