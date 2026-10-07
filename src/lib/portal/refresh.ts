/**
 * Campaign refresh internals, shared by the admin server actions and the
 * scheduled refresh route.
 *
 * These helpers take an explicit Supabase client so they can run either as an
 * authenticated admin action or as a sessionless scheduled job. They are
 * deliberately kept out of the `"use server"` module: exporting them from there
 * would publish them as unauthenticated server-action endpoints.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { calculateMetrics, reportSnapshotDate } from "@/lib/portal/metrics";
import { getApifySoundCount, SoundCountError } from "@/lib/apify/sound-count";
import { soundTrackingMessage } from "@/lib/portal/sound-tracking";
import type { Database } from "@/lib/supabase/database.types";
import { tiktokProvider } from "@/lib/tiktok/provider";

export type PortalClient = SupabaseClient<Database>;

export async function insertSnapshot(
  supabase: PortalClient,
  postId: string,
  metrics: { views: number; likes: number; comments: number; shares: number },
) {
  const { data: latest, error: latestError } = await supabase
    .from("post_metric_snapshots")
    .select("captured_at, views, likes, comments, shares")
    .eq("post_id", postId)
    .order("captured_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (latestError) throw new Error(latestError.message);
  const today = reportSnapshotDate(new Date().toISOString());
  if (
    latest &&
    reportSnapshotDate(latest.captured_at) === today &&
    Number(latest.views) === metrics.views &&
    Number(latest.likes) === metrics.likes &&
    Number(latest.comments) === metrics.comments &&
    Number(latest.shares) === metrics.shares
  ) {
    return;
  }
  const { error } = await supabase.from("post_metric_snapshots").insert({
    post_id: postId,
    views: metrics.views,
    likes: metrics.likes,
    comments: metrics.comments,
    shares: metrics.shares,
  });
  if (error && error.code !== "23505") throw new Error(error.message);
}

async function upsertSoundCountSnapshot(
  supabase: PortalClient,
  campaignId: string,
  soundId: string,
  point: { providerDataDate: string; creationCount: number; runId: string },
  checkedAt: string,
) {
  const key = {
    campaign_id: campaignId,
    sound_id: soundId,
    provider_data_date: point.providerDataDate,
  };
  const { data: existing, error: existingError } = await supabase
    .from("sound_metric_snapshots")
    .select("id")
    .eq("campaign_id", key.campaign_id)
    .eq("sound_id", key.sound_id)
    .eq("provider_data_date", key.provider_data_date)
    .maybeSingle();
  if (existingError) throw new Error(existingError.message);

  if (existing) {
    const { error } = await supabase
      .from("sound_metric_snapshots")
      .update({
        creation_count: point.creationCount,
        source: "apify",
        provider_run_id: point.runId,
        checked_at: checkedAt,
      })
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
    return { inserted: false };
  }

  const { error } = await supabase.from("sound_metric_snapshots").insert({
    ...key,
    creation_count: point.creationCount,
    source: "apify",
    provider_run_id: point.runId,
    checked_at: checkedAt,
  });
  if (!error) return { inserted: true };
  if (error.code !== "23505") throw new Error(error.message);

  // A concurrent refresh inserted this provider day after our initial read.
  // Update that row instead of adding a second progress point.
  const { error: updateError } = await supabase
    .from("sound_metric_snapshots")
    .update({
      creation_count: point.creationCount,
      source: "apify",
      provider_run_id: point.runId,
      checked_at: checkedAt,
    })
    .eq("campaign_id", key.campaign_id)
    .eq("sound_id", key.sound_id)
    .eq("provider_data_date", key.provider_data_date);
  if (updateError) throw new Error(updateError.message);
  return { inserted: false };
}

export type SoundCountRefreshResult = {
  skipped: boolean;
  creationCount: number | null;
  providerDataDate: string | null;
  checkedAt: string | null;
  inserted: boolean;
};

/** Current exact-sound counts. Scheduled calls reuse today's successful check. */
export async function refreshCampaignSoundCountWithClient(
  supabase: PortalClient,
  campaignId: string,
  options: { force?: boolean } = {},
): Promise<SoundCountRefreshResult> {
  const { data: campaign, error } = await supabase.from("campaigns")
    .select("tiktok_sound_id, sound_usage_count, sound_tracking_status, sound_tracking_checked_at")
    .eq("id", campaignId).single();
  if (error) throw new Error(error.message);
  const soundId = campaign?.tiktok_sound_id;
  const today = new Date().toISOString().slice(0, 10);
  if (!soundId) return { skipped: true, creationCount: campaign?.sound_usage_count ?? null,
    providerDataDate: null, checkedAt: null, inserted: false };
  // Use saved provenance to avoid treating a previous provider check as Apify data.
  if (!options.force && campaign.sound_tracking_status === "ready") {
    const { data: existing, error: cacheError } = await supabase.from("sound_metric_snapshots")
      .select("creation_count, checked_at").eq("campaign_id", campaignId)
      .eq("sound_id", soundId).eq("provider_data_date", today).eq("source", "apify").maybeSingle();
    if (cacheError) throw new Error(cacheError.message);
    if (existing) return { skipped: true, creationCount: existing.creation_count,
      providerDataDate: today, checkedAt: existing.checked_at, inserted: false };
  }
  try {
    const point = await getApifySoundCount(soundId);
    const checkedAt = new Date().toISOString();
    // A sound changed during the request must never receive another sound's count.
    const { data: current, error: currentError } = await supabase.from("campaigns")
      .select("tiktok_sound_id").eq("id", campaignId).single();
    if (currentError || current?.tiktok_sound_id !== soundId) throw new SoundCountError("error");
    const write = await upsertSoundCountSnapshot(supabase, campaignId, soundId, point, checkedAt);
    const { error: updateError } = await supabase.from("campaigns").update({
      sound_usage_count: point.creationCount, sound_tracking_status: "ready",
      sound_tracking_checked_at: checkedAt, updated_at: checkedAt,
    }).eq("id", campaignId).eq("tiktok_sound_id", soundId).select("id").single();
    if (updateError) throw new SoundCountError("error");
    return { skipped: false, creationCount: point.creationCount,
      providerDataDate: point.providerDataDate, checkedAt, inserted: write.inserted };
  } catch (cause) {
    const status = cause instanceof SoundCountError ? cause.kind : "error";
    console.warn("[apify] sound check failed", { campaignId, soundId, status });
    const { error: statusError } = await supabase.from("campaigns").update({
      sound_tracking_status: status, sound_tracking_checked_at: new Date().toISOString(),
    }).eq("id", campaignId).eq("tiktok_sound_id", soundId).select("id").single();
    if (statusError) console.error("[apify] could not save tracking status", { campaignId });
    throw new Error(soundTrackingMessage(status));
  }
}

export async function insertCampaignSnapshot(
  supabase: PortalClient,
  campaignId: string,
) {
  const { data: posts, error: postsError } = await supabase
    .from("tiktok_posts")
    .select("views, likes, comments, shares")
    .eq("campaign_id", campaignId);
  if (postsError) throw new Error(postsError.message);
  const metrics = calculateMetrics(posts ?? []);
  const { data: latest, error: latestError } = await supabase
    .from("campaign_metric_snapshots")
    .select("captured_at, tracked_posts, views, likes, comments, shares")
    .eq("campaign_id", campaignId)
    .order("captured_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (latestError) throw new Error(latestError.message);
  const today = reportSnapshotDate(new Date().toISOString());
  if (
    latest &&
    reportSnapshotDate(latest.captured_at) === today &&
    Number(latest.tracked_posts) === metrics.posts &&
    Number(latest.views) === metrics.views &&
    Number(latest.likes) === metrics.likes &&
    Number(latest.comments) === metrics.comments &&
    Number(latest.shares) === metrics.shares
  ) {
    return metrics;
  }
  const { error } = await supabase.from("campaign_metric_snapshots").insert({
    campaign_id: campaignId,
    tracked_posts: metrics.posts,
    views: metrics.views,
    likes: metrics.likes,
    comments: metrics.comments,
    shares: metrics.shares,
    engagement_rate: metrics.engagementRate,
  });
  if (error && error.code !== "23505") throw new Error(error.message);
  return metrics;
}

export async function refreshCampaignSoundWithClient(
  supabase: PortalClient,
  campaignId: string,
) {
  const { data: campaign } = await supabase
    .from("campaigns")
    .select(
      "tiktok_sound_url, tiktok_sound_id, sound_title, sound_artist, sound_artwork_url, sound_usage_count, share_token",
    )
    .eq("id", campaignId)
    .single();
  if (!campaign?.tiktok_sound_url) {
    throw new Error("This campaign has no TikTok sound URL.");
  }

  const fetched = await tiktokProvider.refreshSound(campaign.tiktok_sound_url);
  if (!fetched.ok) throw new Error(fetched.error);

  const sound = fetched.data;
  if (campaign.tiktok_sound_id && sound.soundId !== campaign.tiktok_sound_id) {
    throw new Error(
      "This URL now resolves to a different TikTok sound. Use Change Sound to review it first.",
    );
  }
  // TikTok's HTML is still useful for display metadata, but Apify is
  // now the authoritative source for reportable creation counts.
  const nextUsage = campaign.sound_usage_count;

  const update: {
    tiktok_sound_url: string;
    tiktok_sound_id: string;
    updated_at: string;
    sound_title?: string;
    sound_artist?: string;
    sound_artwork_url?: string;
  } = {
    tiktok_sound_url: sound.soundUrl,
    tiktok_sound_id: sound.soundId,
    updated_at: new Date().toISOString(),
  };
  if (sound.title) update.sound_title = sound.title;
  if (sound.artist) update.sound_artist = sound.artist;
  if (sound.artworkUrl) update.sound_artwork_url = sound.artworkUrl;

  const { error } = await supabase
    .from("campaigns")
    .update(update)
    .eq("id", campaignId);

  if (error) throw new Error(error.message);

  return {
    sound,
    usageCount: nextUsage,
    usageRetrieved: false,
  };
}

export async function refreshTikTokPostWithClient(
  supabase: PortalClient,
  postId: string,
  campaignId: string,
) {
  const { data: post } = await supabase
    .from("tiktok_posts")
    .select("*")
    .eq("id", postId)
    .eq("campaign_id", campaignId)
    .single();
  if (!post) throw new Error("Post not found");

  const fetched = await tiktokProvider.refreshPost(post.post_url);
  if (!fetched.ok) {
    await supabase
      .from("tiktok_posts")
      .update({
        last_sync_status: "failed",
        last_sync_error: fetched.error,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);
    throw new Error(fetched.error);
  }
  if (!fetched.data.metricsComplete) {
    await supabase
      .from("tiktok_posts")
      .update({
        last_sync_status: "failed",
        last_sync_error:
          "TikTok returned the post but not engagement metrics. Try again shortly or edit manually.",
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);
    throw new Error(
      "TikTok returned the post but not engagement metrics. Try again shortly or edit manually.",
    );
  }

  const data = fetched.data;
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("tiktok_posts")
    .update({
      post_url: data.postUrl,
      tiktok_post_id: data.postId,
      creator_handle: data.creatorHandle,
      creator_display_name: data.creatorDisplayName,
      title: data.title,
      thumbnail_url: data.thumbnailUrl,
      posted_at: data.postedAt,
      views: data.views,
      likes: data.likes,
      comments: data.comments,
      shares: data.shares,
      last_synced_at: now,
      last_sync_status: "ok",
      last_sync_error: null,
      updated_at: now,
    })
    .eq("id", postId);
  if (error) throw new Error(error.message);

  await insertSnapshot(supabase, postId, data);
  await supabase
    .from("campaigns")
    .update({ last_synced_at: now, updated_at: now })
    .eq("id", campaignId);

  return data;
}

export async function refreshCampaignPostsWithClient(
  supabase: PortalClient,
  campaignId: string,
) {
  const { data: posts, error: postsError } = await supabase
    .from("tiktok_posts")
    .select("*")
    .eq("campaign_id", campaignId);
  if (postsError) throw new Error(postsError.message);

  const list = posts ?? [];
  const before = calculateMetrics(list);
  let updated = 0;
  let failed = 0;
  const failedPostIds: string[] = [];

  for (const post of list) {
    try {
      await refreshTikTokPostWithClient(supabase, post.id, campaignId);
      updated += 1;
    } catch {
      failed += 1;
      failedPostIds.push(post.id);
    }
  }

  const after = await insertCampaignSnapshot(supabase, campaignId);
  const now = new Date().toISOString();
  await supabase
    .from("campaigns")
    .update({ last_synced_at: now, updated_at: now })
    .eq("id", campaignId);

  return {
    total: list.length,
    updated,
    failed,
    failedPostIds,
    before,
    after,
  };
}

export type CampaignRefreshResult = {
  sound: {
    ok: boolean;
    error?: string;
    before: number | null;
    after: number | null;
    usageRetrieved: boolean;
    skipped?: boolean;
    providerDataDate?: string | null;
    checkedAt?: string | null;
    snapshotInserted?: boolean;
  };
  posts: Awaited<ReturnType<typeof refreshCampaignPostsWithClient>> & {
    error?: string;
  };
};

/** Refresh sound + posts independently. Partial failure is allowed. */
export async function refreshCampaignDataWithClient(
  supabase: PortalClient,
  campaignId: string,
): Promise<CampaignRefreshResult> {
  const { data: beforeCampaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("sound_usage_count, tiktok_sound_url, tiktok_sound_id")
    .eq("id", campaignId)
    .single();
  if (campaignError) throw new Error(campaignError.message);

  const soundResult: CampaignRefreshResult["sound"] = {
    ok: false,
    before: beforeCampaign?.sound_usage_count ?? null,
    after: beforeCampaign?.sound_usage_count ?? null,
    usageRetrieved: false,
  };

  const soundErrors: string[] = [];
  if (beforeCampaign?.tiktok_sound_url) {
    try {
      await refreshCampaignSoundWithClient(supabase, campaignId);
    } catch (error) {
      soundErrors.push(
        error instanceof Error ? error.message : "Sound refresh failed",
      );
    }
  }

  if (beforeCampaign?.tiktok_sound_id) {
    try {
      const tracked = await refreshCampaignSoundCountWithClient(
        supabase,
        campaignId,
      );
      soundResult.after = tracked.creationCount;
      soundResult.usageRetrieved = tracked.creationCount != null;
      soundResult.providerDataDate = tracked.providerDataDate;
      soundResult.checkedAt = tracked.checkedAt;
      soundResult.snapshotInserted =
        tracked.inserted;
    } catch (error) {
      soundErrors.push(
        error instanceof Error
          ? error.message
          : "Sound count check failed",
      );
    }
  } else {
    soundResult.skipped = true;
  }

  soundResult.ok = soundErrors.length === 0;
  if (soundErrors.length > 0) soundResult.error = soundErrors.join("; ");

  let postsResult: CampaignRefreshResult["posts"];
  try {
    postsResult = await refreshCampaignPostsWithClient(supabase, campaignId);
  } catch (error) {
    postsResult = {
      total: 0,
      updated: 0,
      failed: 0,
      failedPostIds: [],
      before: calculateMetrics([]),
      after: calculateMetrics([]),
      error: error instanceof Error ? error.message : "Post refresh failed",
    };
  }

  return { sound: soundResult, posts: postsResult };
}
