export type SoundTrackingStatus = "pending" | "not_found" | "no_data" | "error" | "ready";

/** Safe copy for shared reports; provider errors and credentials stay server-side. */
export function soundTrackingMessage(status?: SoundTrackingStatus | null): string {
  switch (status) {
    case "not_found":
      return "Soundcharts could not resolve this exact TikTok sound yet.";
    case "no_data":
      return "Soundcharts has not returned a count for this exact sound yet.";
    case "error":
      return "The latest count check failed. Tracking will retry automatically.";
    default:
      return "A verified creation count has not been retrieved for this sound yet.";
  }
}
