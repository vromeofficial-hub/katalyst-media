import { renderCampaignPreview } from "@/lib/portal/report-preview-layout";
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
  return renderCampaignPreview({ title, artist, artwork });
}
