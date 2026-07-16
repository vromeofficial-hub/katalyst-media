export type CampaignStatus =
  | "in-progress"
  | "content-being-prepared"
  | "campaign-live"
  | "results-being-reviewed"
  | "complete"
  | "case-study-being-prepared";

export const campaignStatusLabels: Record<CampaignStatus, string> = {
  "in-progress": "In progress",
  "content-being-prepared": "Content being prepared",
  "campaign-live": "Campaign live",
  "results-being-reviewed": "Results being reviewed",
  complete: "Complete",
  "case-study-being-prepared": "Case study being prepared",
};

export type CampaignMetric = {
  label: string;
  value: string;
};

export type Campaign = {
  slug: string;
  artistName: string;
  trackName: string;
  campaignTitle: string;
  coverArtwork: string | null;
  shortDescription: string;
  contentCategories: string[];
  participatingCreators: number | null;
  status: CampaignStatus;
  startDate: string | null;
  endDate: string | null;
  publicResults: CampaignMetric[];
  gallery: string[];
  publiclyVisible: boolean;
  permissionToDisplay: boolean;
};

/**
 * Only include genuine campaigns with permission to appear publicly.
 * Never invent artists, songs, results or creator counts.
 */
export const projects: Campaign[] = [];

export function getVisibleCampaigns() {
  return projects.filter(
    (campaign) => campaign.publiclyVisible && campaign.permissionToDisplay,
  );
}
