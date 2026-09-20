import "./index.css";
import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  staticFile,
} from "remotion";
import {Captions} from "./components/Captions";
import {Scene01} from "./scenes/Scene01";
import {Scene02} from "./scenes/Scene02";
import {Scene03} from "./scenes/Scene03";
import {Scene04} from "./scenes/Scene04";
import {Scene05} from "./scenes/Scene05";
import {Scene06} from "./scenes/Scene06";
import {Scene07} from "./scenes/Scene07";
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
      <Sequence name="S01 · Dùng img-08 rồi img-04 dưới dạng hai ảnh" durationInFrames={234}>
        <Scene01 />
      </Sequence>

      <Sequence name="S02 · Video bắt giữ là lớp hình chính, nhưng c" from={234} durationInFrames={163}>
        <Scene02 />
      </Sequence>

      <Sequence name="S03 · Ba ảnh đều dùng toàn khung theo trình tự" from={397} durationInFrames={294}>
        <Scene03 />
      </Sequence>

      <Sequence name="S04 · Dùng video phiên tòa làm lớp chính. Khi " from={692} durationInFrames={206}>
        <Scene04 />
      </Sequence>

      <Sequence name="S05 · Dùng vid-05 toàn khung cho mốc khoản tiề" from={898} durationInFrames={200}>
        <Scene05 />
      </Sequence>

      <Sequence name="S06 · Dùng vid-02 làm lớp hình chính xuyên suố" from={1098} durationInFrames={185}>
        <Scene06 />
      </Sequence>

      <Sequence name="S07 · Dùng img-03 rồi img-05 làm hai ảnh nền t" from={1283} durationInFrames={197}>
        <Scene07 />
      </Sequence>

      <Audio
        src={staticFile("audio/an-le-64-narration.mp3")}
        durationInFrames={1480}
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
      durationInFrames={1480}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
  );
};
