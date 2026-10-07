import { expect, test } from "@playwright/test";
import { integerAxisTicks } from "../src/lib/portal/chart-axis";
import { refreshCampaignSoundCountWithClient, type PortalClient } from "../src/lib/portal/refresh";
import { parseTikTokAudiencePoints } from "../src/lib/soundcharts/client";


test("integer axes have distinct labels for small counts and negative daily changes", () => {
  expect(integerAxisTicks(0, 1)).toEqual([1, 0]);
  expect(integerAxisTicks(0, 2)).toEqual([2, 1, 0]);
  expect(integerAxisTicks(-1, 1)).toEqual([1, 0, -1]);
});

test("missing or invalid provider values never become zero observations", () => {
  const payload = { items: [{ date: "2026-10-07", plots: [
    { identifier: "exact", value: null },
    { identifier: "exact", value: "" },
    { identifier: "exact", value: false },
    { identifier: "exact", value: 1.5 },
    { identifier: "other", value: 900 },
    { identifier: "exact", value: 0 },
  ] }] };
  expect(parseTikTokAudiencePoints(payload as never, "exact")).toEqual([
    { providerDataDate: "2026-10-07", identifier: "exact", creationCount: 0 },
  ]);
});

for (const scenario of ["not_found", "authentication", "empty", "count", "zero", "cached", "forced", "changed"] as const) {
  test(`refresh handles ${scenario} without inventing or erasing counts`, async () => {
    const originalFetch = global.fetch;
    const originalToken = process.env.APIFY_API_TOKEN;
    process.env.APIFY_API_TOKEN = "fixture-token";
    let requests = 0;
    let campaignReads = 0;
    const now = new Date().toISOString();
    const campaign: Record<string, unknown> = {
      id: "campaign-fixture", created_at: "2026-10-01T00:00:00Z",
      tiktok_sound_id: "123", soundcharts_song_uuid: null,
      sound_usage_count: 25,
      sound_tracking_status: scenario === "cached" ? "ready" : "pending",
      sound_title: "Example Song", sound_artist: "Example Artist",
    };
    const observations: Record<string, unknown>[] = [];
    const client = { from(table: string) {
      let write: Record<string, unknown> | undefined;
      let insert = false;
      const query = {
        select() { return query; }, eq() { return query; }, not() { return query; },
        update(value: Record<string, unknown>) { write = value; return query; },
        insert(value: Record<string, unknown>) { write = value; insert = true; return query; },
        single() { return query; }, maybeSingle() { return query; },
        then(resolve: (value: unknown) => unknown) {
          if (write) {
            if (table === "campaigns") Object.assign(campaign, write);
            else if (insert || scenario === "forced") observations.push(write);
          }
          if (table === "campaigns" && !write) campaignReads++;
          return Promise.resolve(resolve({
            data: table === "campaigns"
              ? (scenario === "changed" && campaignReads > 1 ? { ...campaign, tiktok_sound_id: "456" } : campaign)
              : scenario === "cached" && !write ? { creation_count: 25, checked_at: now }
                : scenario === "forced" && !write ? { id: "existing-observation" } : null,
            count: 1, error: null,
          }));
        },
      };
      return query;
    } } as unknown as PortalClient;

    global.fetch = (async (input, init) => {
      requests++;
      const url = String(input);
      expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer fixture-token");
      expect(url).not.toContain("fixture-token");
      if (url.includes("/runs?")) {
        const body = JSON.parse(String(init?.body));
        expect(body).toMatchObject({ sounds: ["123"], includeVideoFields: false, enrichCreators: false, downloadCovers: false });
        expect(new URL(url).searchParams.get("maxTotalChargeUsd")).toBe("0.01");
        return scenario === "authentication" ? Response.json({}, { status: 401 })
          : Response.json({ data: { status: "SUCCEEDED", id: "test-run", defaultDatasetId: "test-dataset" } });
      }
      return Response.json([{ recordType: "sound-summary", soundId: "123",
        runStatus: scenario === "not_found" ? "not_found" : "no_videos",
        soundUsageCount: scenario === "empty" ? null : scenario === "zero" ? 0 : 42,
        finishedAt: now, returnedVideos: 0 }]);
    }) as typeof fetch;
    try {
      if (["not_found", "authentication", "empty", "changed"].includes(scenario)) {
        await expect(refreshCampaignSoundCountWithClient(client, "campaign-fixture")).rejects.toThrow();
        expect(campaign.sound_tracking_status).toBe(scenario === "not_found" ? "not_found" : scenario === "empty" ? "no_data" : "error");
        expect(campaign.sound_usage_count).toBe(25);
        expect(observations).toHaveLength(0);
      } else {
        const result = await refreshCampaignSoundCountWithClient(client, "campaign-fixture", { force: scenario === "forced" });
        expect(result.creationCount).toBe(scenario === "cached" ? 25 : scenario === "zero" ? 0 : 42);
        expect(observations).toHaveLength(scenario === "cached" ? 0 : 1);
        if (scenario === "cached") expect(requests).toBe(0);
        else if (scenario === "forced") {
          expect(result.inserted).toBe(false);
          expect(observations[0]).toMatchObject({ creation_count: 42, source: "apify", provider_run_id: "test-run" });
        } else expect(observations[0]).toMatchObject({ sound_id: "123", source: "apify", provider_run_id: "test-run", provider_data_date: now.slice(0, 10) });
      }
    } finally {
      global.fetch = originalFetch;
      if (originalToken == null) delete process.env.APIFY_API_TOKEN;
      else process.env.APIFY_API_TOKEN = originalToken;
    }
  });
}
