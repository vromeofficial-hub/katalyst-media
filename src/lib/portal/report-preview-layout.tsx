import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const fonts = Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/Inter-Regular.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Inter-SemiBold.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/Inter-Bold.ttf")),
]);

export async function renderCampaignPreview({ title, artist, artwork }: {
  title: string;
  artist: string | null;
  artwork: string | null;
}) {
  const [regular, semibold, bold] = await fonts;
  const shortTitle = title.length > 100 ? `${title.slice(0, 97)}…` : title;
  const shortArtist = artist && artist.length > 70 ? `${artist.slice(0, 67)}…` : artist;
  const titleSize = shortTitle.length > 55 ? 38 : shortTitle.length > 30 ? 50 : shortTitle.length > 17 ? 64 : 78;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#080b09", color: "#f5f5f5", fontFamily: "Inter" }}>
      <div style={{ position: "absolute", top: 40, left: 0, width: "100%", display: "flex", justifyContent: "center", alignItems: "baseline", gap: 12, fontSize: 30, fontWeight: 600, letterSpacing: -0.6 }}>
        <span>KATALYST</span><span style={{ color: "#c6ff00" }}>MEDIA</span>
      </div>
      <div style={{ position: "absolute", left: 48, top: 128, width: 1104, height: 406, display: "flex", alignItems: "center", gap: 56, padding: "40px 58px", borderRadius: 24, background: "#131714" }}>
        <div style={{ display: "flex", width: 326, height: 326, flexShrink: 0, borderRadius: 18, overflow: "hidden", background: "#202620", alignItems: "center", justifyContent: "center" }}>
          {artwork ? (
            // ImageResponse embeds the supplied artwork directly into the PNG.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={artwork} alt="" width={326} height={326} style={{ objectFit: "cover" }} />
          ) : <span style={{ fontSize: 108, fontWeight: 700, color: "#c6ff00" }}>KM</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 606, minWidth: 0, maxHeight: 326, overflow: "hidden" }}>
          {shortArtist ? <div style={{ fontSize: shortArtist.length > 35 ? 28 : 46, fontWeight: 600, lineHeight: 1.15, marginBottom: 14, wordBreak: "break-word" }}>{shortArtist}</div> : null}
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.8, wordBreak: "break-word" }}>{shortTitle}</div>
          <div style={{ color: "#949994", fontSize: 20, fontWeight: 400, letterSpacing: 3, marginTop: 28 }}>CAMPAIGN REPORT</div>
        </div>
      </div>
    </div>,
    {
      width: 1200, height: 630,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "no-store" },
    },
  );
}
