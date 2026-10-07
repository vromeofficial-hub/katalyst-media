/** Server-only Apify access. Never import into a client component. */
export class SoundCountError extends Error {
  constructor(public readonly kind: "not_found" | "no_data" | "error") {
    super(`Sound count check: ${kind}`);
  }
}

type Summary = {
  recordType?: string;
  soundId?: string;
  soundUsageCount?: unknown;
  startedAt?: string;
  finishedAt?: string;
  runStatus?: string;
};

export function parseSoundCount(items: unknown, soundId: string) {
  if (!Array.isArray(items)) throw new SoundCountError("error");
  const rows = (items as Summary[]).filter((item) =>
    item && item.recordType === "sound-summary" && item.soundId === soundId);
  if (rows.length !== 1) throw new SoundCountError("no_data");
  const row = rows[0];
  if (row.runStatus === "not_found") throw new SoundCountError("not_found");
  if (row.runStatus !== "completed" && row.runStatus !== "no_videos") throw new SoundCountError("error");
  const count = row.soundUsageCount;
  if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) {
    throw new SoundCountError("no_data");
  }
  // This is a current count observed during the scrape, never historical data.
  const observedAt = row.finishedAt;
  const timestamp = observedAt ? Date.parse(observedAt) : NaN;
  if (!Number.isFinite(timestamp) || timestamp > Date.now() + 300_000 ||
      timestamp < Date.now() - 86_400_000) throw new SoundCountError("error");
  return { creationCount: count, identifier: soundId,
    providerDataDate: new Date(timestamp).toISOString().slice(0, 10), observedAt: new Date(timestamp).toISOString() };
}

export async function getApifySoundCount(soundId: string) {
  const token = process.env.APIFY_API_TOKEN?.trim();
  if (!token || !/^\d+$/.test(soundId)) throw new SoundCountError("error");
  async function request(path: string, init?: RequestInit) {
    const response = await fetch(`https://api.apify.com/v2${path}`, {
      ...init, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      cache: "no-store", signal: AbortSignal.timeout(70_000),
    });
    // Do not propagate provider bodies, URLs or credentials to logs/clients.
    if (!response.ok) throw new SoundCountError("error");
    return response.json();
  }
  const query = new URLSearchParams({ waitForFinish: "60", timeout: "60", memory: "1024",
    maxTotalChargeUsd: "0.01", restartOnError: "false", forcePermissionLevel: "LIMITED_PERMISSIONS" });
  const result = await request(`/acts/coregent~tiktok-sound-music-scraper/runs?${query}`, {
    method: "POST", body: JSON.stringify({ inputMode: "sounds", sounds: [soundId],
      maxVideosPerSound: 1, maxTotalResults: 1, includeSoundSummary: true,
      includeVideoFields: false, enrichCreators: false, downloadCovers: false }),
  });
  const run = result?.data;
  if (run?.status !== "SUCCEEDED" || typeof run.defaultDatasetId !== "string" || typeof run.id !== "string") {
    throw new SoundCountError("error");
  }
  const items = await request(`/datasets/${encodeURIComponent(run.defaultDatasetId)}/items?format=json&clean=true&limit=10`);
  return { ...parseSoundCount(items, soundId), runId: run.id };
}
