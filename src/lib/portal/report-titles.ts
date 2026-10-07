import { campaignSoundArtist, campaignSoundTitle } from "@/lib/portal/metrics";
import type { ReportCampaign, ReportClient } from "@/lib/portal/report";

export function resolveReportTitles(
  campaign: ReportCampaign,
  client: ReportClient | null,
): { title: string; artist: string | null } {
  const release = campaignSoundTitle(campaign) || "";
  const display = campaign.display_title?.trim() || "";
  const title = display || release || client?.name?.trim() || "Campaign";
  const soundArtist = campaignSoundArtist(campaign) || "";
  const artist =
    soundArtist && soundArtist.toLowerCase() !== title.toLowerCase()
      ? soundArtist
      : client?.name?.trim() || "";
  const artistLine = artist.toLowerCase() !== title.toLowerCase() ? artist : null;

  return { title, artist: artistLine };
}

