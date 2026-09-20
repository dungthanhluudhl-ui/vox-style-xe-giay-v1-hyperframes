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

// === VIDEO: tham-hoa-itaewon-phan-1 START ===
import {Scene01 as ThamHoaItaewonPhan1Scene01} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene01";
import {Scene02 as ThamHoaItaewonPhan1Scene02} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene02";
import {Scene03 as ThamHoaItaewonPhan1Scene03} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene03";
import {Scene04 as ThamHoaItaewonPhan1Scene04} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene04";
import {Scene05 as ThamHoaItaewonPhan1Scene05} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene05";
import {Scene06 as ThamHoaItaewonPhan1Scene06} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene06";
import {Scene07 as ThamHoaItaewonPhan1Scene07} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene07";
import {Scene08 as ThamHoaItaewonPhan1Scene08} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene08";
import {Scene09 as ThamHoaItaewonPhan1Scene09} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene09";
import {Scene10 as ThamHoaItaewonPhan1Scene10} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene10";
import {Scene11 as ThamHoaItaewonPhan1Scene11} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene11";
import {Scene12 as ThamHoaItaewonPhan1Scene12} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene12";
import {Scene13 as ThamHoaItaewonPhan1Scene13} from "./videos/tham-hoa-itaewon-phan-1/scenes/Scene13";

const ThamHoaItaewonPhan1Timeline: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <Sequence name="S01 · Dùng img-01 toàn khung làm ảnh nền, khôn" durationInFrames={177}>
        <ThamHoaItaewonPhan1Scene01 />
      </Sequence>

      <Sequence name="S02 · Phát vid-04 gần trọn thời lượng làm lớp " from={177} durationInFrames={239}>
        <ThamHoaItaewonPhan1Scene02 />
      </Sequence>

      <Sequence name="S03 · Dùng img-04 làm ảnh nền toàn khung, ưu t" from={416} durationInFrames={168}>
        <ThamHoaItaewonPhan1Scene03 />
      </Sequence>

      <Sequence name="S04 · Fallback dựng code được phép vì phải thể" from={584} durationInFrames={178}>
        <ThamHoaItaewonPhan1Scene04 />
      </Sequence>

      <Sequence name="S05 · Vid-03 là lớp hình ảnh chính. Overlay ti" from={762} durationInFrames={167}>
        <ThamHoaItaewonPhan1Scene05 />
      </Sequence>

      <Sequence name="S06 · Dùng img-03 toàn khung làm nền tưởng niệ" from={929} durationInFrames={233}>
        <ThamHoaItaewonPhan1Scene06 />
      </Sequence>

      <Sequence name="S07 · Vid-01 giữ vai trò bản đồ chính. Chỉ ove" from={1162} durationInFrames={215}>
        <ThamHoaItaewonPhan1Scene07 />
      </Sequence>

      <Sequence name="S08 · Brand bumper không có media phù hợp nên " from={1377} durationInFrames={299}>
        <ThamHoaItaewonPhan1Scene08 />
      </Sequence>

      <Sequence name="S09 · Img-02 được dùng nguyên dạng làm ảnh nền" from={1676} durationInFrames={168}>
        <ThamHoaItaewonPhan1Scene09 />
      </Sequence>

      <Sequence name="S10 · Vid-02 là lớp chính và được giữ đủ lâu đ" from={1844} durationInFrames={327}>
        <ThamHoaItaewonPhan1Scene10 />
      </Sequence>

      <Sequence name="S11 · Dùng img-06 toàn khung làm ảnh nền, khôn" from={2171} durationInFrames={268}>
        <ThamHoaItaewonPhan1Scene11 />
      </Sequence>

      <Sequence name="S12 · Vid-05 là lớp lịch sử chính. Bắt đầu bằn" from={2439} durationInFrames={328}>
        <ThamHoaItaewonPhan1Scene12 />
      </Sequence>

      <Sequence name="S13 · Dùng img-05 làm ảnh nền toàn khung. Over" from={2767} durationInFrames={264}>
        <ThamHoaItaewonPhan1Scene13 />
      </Sequence>

      <Audio
        src={staticFile("videos/tham-hoa-itaewon-phan-1/audio/narration.mp3")}
        durationInFrames={3031}
        volume={() => 1}
      />

      <Captions src="videos/tham-hoa-itaewon-phan-1/captions/captions.json" />
    </AbsoluteFill>
  );
};
// === VIDEO: tham-hoa-itaewon-phan-1 END ===

// === VIDEO: tham-hoa-itaewon-phan-2 START ===
import {Scene01 as ThamHoaItaewonPhan2Scene01} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene01";
import {Scene02 as ThamHoaItaewonPhan2Scene02} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene02";
import {Scene03 as ThamHoaItaewonPhan2Scene03} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene03";
import {Scene04 as ThamHoaItaewonPhan2Scene04} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene04";
import {Scene05 as ThamHoaItaewonPhan2Scene05} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene05";
import {Scene06 as ThamHoaItaewonPhan2Scene06} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene06";
import {Scene07 as ThamHoaItaewonPhan2Scene07} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene07";
import {Scene08 as ThamHoaItaewonPhan2Scene08} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene08";
import {Scene09 as ThamHoaItaewonPhan2Scene09} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene09";
import {Scene10 as ThamHoaItaewonPhan2Scene10} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene10";
import {Scene11 as ThamHoaItaewonPhan2Scene11} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene11";
import {Scene12 as ThamHoaItaewonPhan2Scene12} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene12";
import {Scene13 as ThamHoaItaewonPhan2Scene13} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene13";
import {Scene14 as ThamHoaItaewonPhan2Scene14} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene14";
import {Scene15 as ThamHoaItaewonPhan2Scene15} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene15";
import {Scene16 as ThamHoaItaewonPhan2Scene16} from "./videos/tham-hoa-itaewon-phan-2/scenes/Scene16";

const ThamHoaItaewonPhan2Timeline: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.ink,
        fontFamily,
        overflow: "hidden",
      }}
    >
      <Sequence name="S01 · Mở bằng img-05 đặt full-frame làm nền, t" durationInFrames={192}>
        <ThamHoaItaewonPhan2Scene01 />
      </Sequence>

      <Sequence name="S02 · Không có asset chưa dùng nào thể hiện ch" from={192} durationInFrames={212}>
        <ThamHoaItaewonPhan2Scene02 />
      </Sequence>

      <Sequence name="S03 · Không có media phù hợp trực tiếp với bin" from={404} durationInFrames={180}>
        <ThamHoaItaewonPhan2Scene03 />
      </Sequence>

      <Sequence name="S04 · Dùng img-06 full-frame làm nền, không cắ" from={584} durationInFrames={228}>
        <ThamHoaItaewonPhan2Scene04 />
      </Sequence>

      <Sequence name="S05 · Vid-03 là lớp hình ảnh chính. Chỉ thêm m" from={812} durationInFrames={159}>
        <ThamHoaItaewonPhan2Scene05 />
      </Sequence>

      <Sequence name="S06 · Không có asset riêng cho quyết định đổi " from={971} durationInFrames={307}>
        <ThamHoaItaewonPhan2Scene06 />
      </Sequence>

      <Sequence name="S07 · Img-04 dùng full-frame làm nền và không " from={1278} durationInFrames={251}>
        <ThamHoaItaewonPhan2Scene07 />
      </Sequence>

      <Sequence name="S08 · Dùng chuyển động khối nhà của vid-06 làm" from={1529} durationInFrames={242}>
        <ThamHoaItaewonPhan2Scene08 />
      </Sequence>

      <Sequence name="S09 · Img-02 đặt full-frame làm nền, không cắt" from={1771} durationInFrames={227}>
        <ThamHoaItaewonPhan2Scene09 />
      </Sequence>

      <Sequence name="S10 · Vid-02 khớp trực tiếp nguyên nhân dỡ bỏ " from={1998} durationInFrames={199}>
        <ThamHoaItaewonPhan2Scene10 />
      </Sequence>

      <Sequence name="S11 · Img-03 dùng full-frame làm nền, không áp" from={2197} durationInFrames={198}>
        <ThamHoaItaewonPhan2Scene11 />
      </Sequence>

      <Sequence name="S12 · Vid-07 là lớp chính. Overlay timeline ch" from={2395} durationInFrames={211}>
        <ThamHoaItaewonPhan2Scene12 />
      </Sequence>

      <Sequence name="S13 · Img-01 đặt full-frame làm nền, không xử " from={2606} durationInFrames={316}>
        <ThamHoaItaewonPhan2Scene13 />
      </Sequence>

      <Sequence name="S14 · Dùng toàn bộ chuyển động bản đồ của vid-" from={2922} durationInFrames={301}>
        <ThamHoaItaewonPhan2Scene14 />
      </Sequence>

      <Sequence name="S15 · Img-07 dùng nguyên khung làm ảnh nền, kh" from={3223} durationInFrames={213}>
        <ThamHoaItaewonPhan2Scene15 />
      </Sequence>

      <Sequence name="S16 · Vid-01 làm lớp chính vì đã mô phỏng hai " from={3436} durationInFrames={282}>
        <ThamHoaItaewonPhan2Scene16 />
      </Sequence>

      <Audio
        src={staticFile("videos/tham-hoa-itaewon-phan-2/audio/narration.mp3")}
        durationInFrames={3718}
        volume={() => 1}
      />

      <Captions src="videos/tham-hoa-itaewon-phan-2/captions/captions.json" />
    </AbsoluteFill>
  );
};
// === VIDEO: tham-hoa-itaewon-phan-2 END ===

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
      <Composition
        id="ThamHoaItaewonPhan1"
        component={ThamHoaItaewonPhan1Timeline}
        durationInFrames={3031}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />
      <Composition
        id="ThamHoaItaewonPhan2"
        component={ThamHoaItaewonPhan2Timeline}
        durationInFrames={3718}
        fps={CANVAS.fps}
        width={CANVAS.width}
        height={CANVAS.height}
      />
    </>
  );
};
