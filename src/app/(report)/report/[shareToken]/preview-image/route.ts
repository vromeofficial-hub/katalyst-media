import ReportPreview from "@/lib/portal/report-preview";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: {
  params: Promise<{ shareToken: string }>;
}) {
  return ReportPreview({ params });
}
