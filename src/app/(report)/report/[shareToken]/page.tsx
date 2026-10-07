import type { Metadata } from "next";
import { Wordmark } from "@/components/ui/Wordmark";
import { CampaignReportView } from "@/components/report/CampaignReportView";
import { getSharedReport } from "@/lib/portal/shared-report";
import { resolveReportTitles } from "@/lib/portal/report-titles";
import { company } from "@/content/company";

export async function generateMetadata({ params }: {
  params: Promise<{ shareToken: string }>;
}): Promise<Metadata> {
  const { shareToken } = await params;
  const report = await getSharedReport(shareToken);
  const names = report?.campaign ? resolveReportTitles(report.campaign, report.client) : null;
  const label = names ? [names.artist, names.title].filter(Boolean).join(" — ") : "Campaign report unavailable";
  const title = `${label} | Katalyst Media`;
  const description = names ? `View the campaign report for ${label}, powered by Katalyst Media.` : "This campaign report is no longer available.";
  const url = `${company.url}/report/${encodeURIComponent(shareToken)}`;
  const images = names ? [{ url: `${url}/preview-image`, width: 1200, height: 630, alt: `${label} — campaign report` }] : [];
  return {
    title: { absolute: title }, description,
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: company.name, type: "website", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ReportPage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  const report = await getSharedReport(shareToken);

  if (!report?.campaign) {
    return (
      <div className="report-shell">
        <main className="report-state">
          <Wordmark className="report-state__wordmark" href={null} />
          <p className="report-state__eyebrow">Campaign Report</p>
          <h1 className="report-state__title">
            This campaign report is no longer available.
          </h1>
          <p className="report-state__copy">
            Please contact your Katalyst Media representative if you need
            access.
          </p>
        </main>
      </div>
    );
  }

  return (
    <CampaignReportView
      campaign={report.campaign}
      client={report.client}
      posts={report.posts ?? []}
      snapshots={report.snapshots ?? []}
      soundSnapshots={report.sound_snapshots ?? []}
      campaignSnapshots={report.campaign_snapshots ?? []}
    />
  );
}
