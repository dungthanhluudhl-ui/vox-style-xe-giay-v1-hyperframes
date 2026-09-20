import "./index.css";
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

// === VIDEO: an-le-64 START ===
import {Scene01 as AnLe64Scene01} from "./videos/an-le-64/scenes/Scene01";
import {Scene02 as AnLe64Scene02} from "./videos/an-le-64/scenes/Scene02";
import {Scene03 as AnLe64Scene03} from "./videos/an-le-64/scenes/Scene03";
import {Scene04 as AnLe64Scene04} from "./videos/an-le-64/scenes/Scene04";
import {Scene05 as AnLe64Scene05} from "./videos/an-le-64/scenes/Scene05";
import {Scene06 as AnLe64Scene06} from "./videos/an-le-64/scenes/Scene06";
import {Scene07 as AnLe64Scene07} from "./videos/an-le-64/scenes/Scene07";

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
        <AnLe64Scene01 />
      </Sequence>

      <Sequence name="S02 · Video bắt giữ là lớp hình chính, nhưng c" from={234} durationInFrames={163}>
        <AnLe64Scene02 />
      </Sequence>

      <Sequence name="S03 · Ba ảnh đều dùng toàn khung theo trình tự" from={397} durationInFrames={294}>
        <AnLe64Scene03 />
      </Sequence>

      <Sequence name="S04 · Dùng video phiên tòa làm lớp chính. Khi " from={692} durationInFrames={206}>
        <AnLe64Scene04 />
      </Sequence>

      <Sequence name="S05 · Dùng vid-05 toàn khung cho mốc khoản tiề" from={898} durationInFrames={200}>
        <AnLe64Scene05 />
      </Sequence>

      <Sequence name="S06 · Dùng vid-02 làm lớp hình chính xuyên suố" from={1098} durationInFrames={185}>
        <AnLe64Scene06 />
      </Sequence>

      <Sequence name="S07 · Dùng img-03 rồi img-05 làm hai ảnh nền t" from={1283} durationInFrames={197}>
        <AnLe64Scene07 />
      </Sequence>

      <Audio
        src={staticFile("videos/an-le-64/audio/narration.mp3")}
        durationInFrames={1480}
        volume={() => 1}
      />

      <Captions src="videos/an-le-64/captions/captions.json" />
    </AbsoluteFill>
  );
};
// === VIDEO: an-le-64 END ===

// === VIDEO: an-le-64-phan-2 START ===
import {Scene01 as AnLe64Phan2Scene01} from "./videos/an-le-64-phan-2/scenes/Scene01";
import {Scene02 as AnLe64Phan2Scene02} from "./videos/an-le-64-phan-2/scenes/Scene02";
import {Scene03 as AnLe64Phan2Scene03} from "./videos/an-le-64-phan-2/scenes/Scene03";
import {Scene04 as AnLe64Phan2Scene04} from "./videos/an-le-64-phan-2/scenes/Scene04";
import {Scene05 as AnLe64Phan2Scene05} from "./videos/an-le-64-phan-2/scenes/Scene05";
import {Scene06 as AnLe64Phan2Scene06} from "./videos/an-le-64-phan-2/scenes/Scene06";
import {Scene07 as AnLe64Phan2Scene07} from "./videos/an-le-64-phan-2/scenes/Scene07";

const AnLe64Phan2Timeline: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <Sequence name="S01 · Dùng img-05 làm ảnh nền toàn khung, khôn" durationInFrames={251}>
        <AnLe64Phan2Scene01 />
      </Sequence>

      <Sequence name="S02 · Dùng chuyển động lật lịch và tiền trong " from={251} durationInFrames={237}>
        <AnLe64Phan2Scene02 />
      </Sequence>

      <Sequence name="S03 · Dùng img-07 làm ảnh nền, crop tập trung " from={488} durationInFrames={181}>
        <AnLe64Phan2Scene03 />
      </Sequence>

      <Sequence name="S04 · Dùng vid-05 làm lớp hình chính trong một" from={669} durationInFrames={166}>
        <AnLe64Phan2Scene04 />
      </Sequence>

      <Sequence name="S05 · Dùng vid-02 ở panel trái cho mốc 19:00 v" from={835} durationInFrames={258}>
        <AnLe64Phan2Scene05 />
      </Sequence>

      <Sequence name="S06 · Ưu tiên hoạt cảnh vid-01 làm lớp chính. " from={1093} durationInFrames={191}>
        <AnLe64Phan2Scene06 />
      </Sequence>

      <Sequence name="S07 · Tất cả ảnh chỉ dùng như các background-p" from={1284} durationInFrames={344}>
        <AnLe64Phan2Scene07 />
      </Sequence>

      <Audio
        src={staticFile("videos/an-le-64-phan-2/audio/narration.mp3")}
        durationInFrames={1628}
        volume={() => 1}
      />

      <Captions src="videos/an-le-64-phan-2/captions/captions.json" />
    </AbsoluteFill>
  );
};
// === VIDEO: an-le-64-phan-2 END ===

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AnLe64"
        component={AnLe64Timeline}
        durationInFrames={1480}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="AnLe64Phan2"
        component={AnLe64Phan2Timeline}
        durationInFrames={1628}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />
    </>
  );
};
