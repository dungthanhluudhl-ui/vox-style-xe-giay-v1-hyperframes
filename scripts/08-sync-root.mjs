// Ráp lại src/Root.tsx từ scene-plan.json + danh sách file src/scenes/*.tsx hiện có.
// LOCAL, TẤT ĐỊNH, KHÔNG gọi AI — việc ráp Sequence từ frame number là thuần cơ học.
// Chạy sau khi các tiến trình codegen song song (--no-root-sync) đã sinh xong scene riêng lẻ.
// Usage: node scripts/08-sync-root.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const FPS = 30;
const AUDIO_FILE = "audio/an-le-64-narration.mp3";
const CAPTIONS_COMPONENT = "./components/Captions";

const scenes = JSON.parse(fs.readFileSync(path.join(root, "planning", "scene-plan.json"), "utf8"));
const sceneFiles = fs
  .readdirSync(path.join(root, "src", "scenes"))
  .filter((f) => /^Scene\d+\.tsx$/.test(f))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort();

const missing = scenes.filter((s) => !sceneFiles.includes(s.id.replace("S", "Scene")));
if (missing.length > 0) {
  console.error(`Thiếu file code cho scene: ${missing.map((s) => s.id).join(", ")} — chưa sync Root.tsx.`);
  process.exit(1);
}

const msToFrame = (ms) => Math.round((ms / 1000) * FPS);
const totalFrames = msToFrame(scenes[scenes.length - 1].endMs);

const imports = scenes
  .map((s) => {
    const compName = s.id.replace("S", "Scene");
    return `import {${compName}} from "./scenes/${compName}";`;
  })
  .join("\n");

const sequences = scenes
  .map((s) => {
    const compName = s.id.replace("S", "Scene");
    const from = msToFrame(s.startMs);
    const duration = msToFrame(s.endMs) - from;
    const label = `${s.id} · ${(s.notes || s.narrativeFunction || "").slice(0, 40)}`.replace(/"/g, "'");
    const fromProp = from === 0 ? "" : ` from={${from}}`;
    return `      <Sequence name="${label}"${fromProp} durationInFrames={${duration}}>
        <${compName} />
      </Sequence>`;
  })
  .join("\n\n");

const content = `import "./index.css";
import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  staticFile,
} from "remotion";
import {Captions} from "${CAPTIONS_COMPONENT}";
${imports}
import {
  CANVAS,
  COLORS,
  fontFamily,
} from "./styles/theme";

const AnLe64Timeline: React.FC = () => {
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
        src={staticFile("${AUDIO_FILE}")}
        durationInFrames={${totalFrames}}
        volume={() => 1}
      />

      <Captions />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AnLe64"
      component={AnLe64Timeline}
      durationInFrames={${totalFrames}}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
  );
};
`;

fs.writeFileSync(path.join(root, "src", "Root.tsx"), content, "utf8");
console.log(`Đã ráp Root.tsx: ${scenes.length} scene, tổng ${totalFrames} frame (${(totalFrames / FPS).toFixed(2)}s).`);
