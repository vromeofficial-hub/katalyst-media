import { ImageResponse } from "next/og";
import { getSharedReport } from "@/lib/portal/shared-report";
import { resolveReportTitles } from "@/lib/portal/report-titles";
import { campaignArtwork } from "@/lib/portal/metrics";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Katalyst Media campaign report";

async function loadArtwork(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const storage = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
    // Fetch only uploaded public artwork, never arbitrary report-supplied URLs.
    if (url.origin !== storage.origin || !url.pathname.startsWith("/storage/v1/object/public/")) return null;
    const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(4000), cache: "no-store" });
    const type = response.headers.get("content-type")?.split(";")[0];
    if (!response.ok || !type || !["image/jpeg", "image/png", "image/webp"].includes(type)) return null;
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength > 5_000_000) return null;
    return `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function ReportPreview({ params }: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  const report = await getSharedReport(shareToken);
  if (!report?.campaign) return new Response("Report unavailable", { status: 404, headers: { "Cache-Control": "no-store" } });
  const { title, artist } = resolveReportTitles(report.campaign, report.client);
  const artwork = await loadArtwork(campaignArtwork(report.campaign));
  const shortTitle = title.length > 100 ? `${title.slice(0, 97)}…` : title;
  const shortArtist = artist && artist.length > 70 ? `${artist.slice(0, 67)}…` : artist;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#080b09", color: "#f5f5f5", padding: "40px 52px", fontFamily: "sans-serif", borderTop: "2px solid #c6ff00" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 0, fontSize: 34, fontWeight: 700, letterSpacing: 0.5 }}><span>KATALYST</span><span style={{ color: "#c6ff00" }}>MEDIA</span></div>
      <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 48 }}>
        <div style={{ display: "flex", width: 360, height: 360, flexShrink: 0, borderRadius: 20, overflow: "hidden", background: "#151d10", alignItems: "center", justifyContent: "center" }}>
          {artwork ? (
            // ImageResponse renders these pixels into the preview itself.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={artwork} alt="" width={360} height={360} style={{ objectFit: "cover" }} />
          ) : <span style={{ fontSize: 132, color: "#c6ff00" }}>KM</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <div style={{ color: "#c6ff00", fontSize: 18, letterSpacing: 3, marginBottom: 24 }}>CAMPAIGN REPORT</div>
          {shortArtist ? <div style={{ fontSize: shortArtist.length > 35 ? 32 : 44, color: "#e3e7df", fontWeight: 700, lineHeight: 1.15, marginBottom: 14 }}>{shortArtist}</div> : null}
          <div style={{ fontSize: shortTitle.length > 55 ? 40 : shortTitle.length > 30 ? 54 : 72, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2 }}>{shortTitle}</div>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 18, color: "#929b90", justifyContent: "center" }}>katalystmedia.co.uk</div>
    </div>,
    { ...size, headers: { "Cache-Control": "no-store" } },
  );
}
