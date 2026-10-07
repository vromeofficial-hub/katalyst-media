import { expect, test } from "@playwright/test";
import { parseSoundCount } from "../src/lib/apify/sound-count";

test("accepts the usage count independently of downloaded video count", () => {
  const result = parseSoundCount([{ recordType: "sound-summary", soundId: "123",
    soundUsageCount: 103, returnedVideos: 0, runStatus: "no_videos", finishedAt: new Date().toISOString() }], "123");
  expect(result.creationCount).toBe(103);
});

for (const value of [null, "103", false, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
  test(`rejects invalid count ${String(value)}`, () => {
    expect(() => parseSoundCount([{ recordType: "sound-summary", soundId: "123", soundUsageCount: value,
      runStatus: "completed", finishedAt: new Date().toISOString() }], "123")).toThrow();
  });
}

test("rejects another sound, stale data, ambiguous rows and unsuccessful runs", () => {
  const row = { recordType: "sound-summary", soundId: "123", soundUsageCount: 103,
    runStatus: "completed", finishedAt: new Date().toISOString() };
  expect(() => parseSoundCount([{ ...row, soundId: "456" }], "123")).toThrow();
  expect(() => parseSoundCount([{ ...row, finishedAt: "2020-01-01" }], "123")).toThrow();
  expect(() => parseSoundCount([row, row], "123")).toThrow();
  expect(() => parseSoundCount([{ ...row, runStatus: "failed" }], "123")).toThrow();
});
