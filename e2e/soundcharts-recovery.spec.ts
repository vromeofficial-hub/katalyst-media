import { expect, test } from "@playwright/test";
import { integerAxisTicks } from "../src/lib/portal/chart-axis";
import { refreshCampaignSoundchartsWithClient, type PortalClient } from "../src/lib/portal/refresh";
import { parseTikTokAudiencePoints } from "../src/lib/soundcharts/client";
import { clearSoundchartsAccessToken } from "../src/lib/soundcharts/credentials";

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

for (const scenario of ["not_found", "authentication", "empty", "count"] as const) {
  test(`refresh handles ${scenario} without inventing or erasing counts`, async () => {
    const originalFetch = global.fetch;
    const originalId = process.env.SOUNDCHARTS_CLIENT_ID;
    const originalSecret = process.env.SOUNDCHARTS_CLIENT_SECRET;
    process.env.SOUNDCHARTS_CLIENT_ID = "fixture";
    process.env.SOUNDCHARTS_CLIENT_SECRET = "fixture-secret";
    clearSoundchartsAccessToken();
    const campaign: Record<string, unknown> = {
      id: "campaign-fixture", created_at: "2026-10-01T00:00:00Z",
      tiktok_sound_id: "exact", soundcharts_song_uuid: null,
      sound_usage_count: scenario === "empty" ? 25 : null,
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
            else if (insert) observations.push(write);
          }
          return Promise.resolve(resolve({
            data: table === "campaigns" ? campaign : null,
            count: 1, error: null,
          }));
        },
      };
      return query;
    } } as unknown as PortalClient;

    global.fetch = (async (input) => {
      const url = String(input);
      if (url.includes("/oauth/token")) {
        return scenario === "authentication"
          ? Response.json({ error: "invalid_client" }, { status: 401 })
          : Response.json({ access_token: "fixture-token", expires_in: 900 });
      }
      if (url.includes("/by-platform/")) {
        return scenario === "not_found"
          ? Response.json({ errors: [{ message: "No song found" }] }, { status: 404 })
          : Response.json({ object: { uuid: "11111111-1111-4111-8111-111111111111" } });
      }
      return Response.json({ items: scenario === "count" ? [{
        date: "2026-10-06", plots: [{ identifier: "exact", value: 42 }, { identifier: "different", value: 999 }],
      }] : [] });
    }) as typeof fetch;
    try {
      if (scenario === "not_found" || scenario === "authentication") {
        await expect(refreshCampaignSoundchartsWithClient(client, "campaign-fixture")).rejects.toThrow(
          scenario === "not_found" ? "not linked" : "check failed",
        );
        expect(campaign.sound_tracking_status).toBe(scenario === "not_found" ? "not_found" : "error");
        expect(campaign.sound_usage_count).toBeNull();
        expect(observations).toHaveLength(0);
      } else {
        const result = await refreshCampaignSoundchartsWithClient(client, "campaign-fixture");
        expect(campaign.sound_tracking_status).toBe(scenario === "empty" ? "no_data" : "ready");
        expect(result.creationCount).toBe(scenario === "empty" ? 25 : 42);
        expect(observations).toHaveLength(scenario === "empty" ? 0 : 1);
        if (scenario === "count") expect(observations[0]).toMatchObject({
          sound_id: "exact", creation_count: 42, provider_data_date: "2026-10-06",
        });
      }
      expect(campaign.sound_tracking_checked_at).toEqual(expect.any(String));
    } finally {
      global.fetch = originalFetch;
      if (originalId == null) delete process.env.SOUNDCHARTS_CLIENT_ID;
      else process.env.SOUNDCHARTS_CLIENT_ID = originalId;
      if (originalSecret == null) delete process.env.SOUNDCHARTS_CLIENT_SECRET;
      else process.env.SOUNDCHARTS_CLIENT_SECRET = originalSecret;
      clearSoundchartsAccessToken();
    }
  });
}
