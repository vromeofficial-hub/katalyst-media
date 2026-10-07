/** A stored target is only displayed after an explicit opt-in. */
export function campaignPostTarget(campaign: {
  post_target_enabled?: boolean;
  target_posts: number | null;
}): number | null {
  return campaign.post_target_enabled === true &&
    campaign.target_posts != null &&
    Number.isInteger(campaign.target_posts) &&
    campaign.target_posts > 0
    ? campaign.target_posts
    : null;
}

/** Omitting target_posts when off preserves any previously saved goal. */
export function readPostTargetSettings(formData: FormData) {
  const enabled = formData.get("post_target_enabled") === "on";
  if (!enabled) return { post_target_enabled: false } as const;
  const raw = String(formData.get("target_posts") ?? "").trim();
  const target = Number(raw);
  if (!raw || !Number.isInteger(target) || target < 1 || target > 10_000) {
    throw new Error("Post target must be a whole number between 1 and 10,000");
  }
  return { post_target_enabled: true, target_posts: target } as const;
}
