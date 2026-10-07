import { expect, test } from "@playwright/test";
import { campaignPostTarget, readPostTargetSettings } from "../src/lib/portal/post-target";
import { formatPostsVsTarget, formatPostsVsTargetLabel } from "../src/lib/portal/metrics";

test("existing campaigns hide their saved target until explicitly enabled", () => {
  expect(campaignPostTarget({ target_posts: 12 })).toBeNull();
  expect(campaignPostTarget({ target_posts: 12, post_target_enabled: false })).toBeNull();
  expect(formatPostsVsTarget(12, campaignPostTarget({ target_posts: 12 }))).toBe("12");
});

test("count follows posts while the manually set target stays fixed", () => {
  const campaign = { target_posts: 30, post_target_enabled: true };
  for (const posts of [12, 13, 11, 0, 31]) {
    expect(formatPostsVsTarget(posts, campaignPostTarget(campaign))).toBe(`${posts} / 30`);
  }
  expect(formatPostsVsTargetLabel(12, campaignPostTarget(campaign)).progress).toBe(0.4);
  expect(campaignPostTarget({ target_posts: null, post_target_enabled: true })).toBeNull();
});

test("turning off preserves the saved goal and ignores the disabled input", () => {
  const form = new FormData();
  form.set("target_posts", "bad disabled value");
  const settings = readPostTargetSettings(form);
  expect(settings).toEqual({ post_target_enabled: false });
  const existing = { target_posts: 30, post_target_enabled: true };
  const saved = { ...existing, ...settings };
  expect(saved.target_posts).toBe(30);
  expect(campaignPostTarget(saved)).toBeNull();
  expect(campaignPostTarget({ ...saved, post_target_enabled: true })).toBe(30);
});

test("enabled targets require a whole number from 1 to 10,000", () => {
  const form = new FormData();
  form.set("post_target_enabled", "on");
  for (const value of ["", "0", "-1", "2.5", "10001", "Infinity", "abc"]) {
    form.set("target_posts", value);
    expect(() => readPostTargetSettings(form)).toThrow(/whole number/);
  }
  for (const value of ["1", "30", "10000"]) {
    form.set("target_posts", value);
    expect(readPostTargetSettings(form)).toEqual({
      post_target_enabled: true, target_posts: Number(value),
    });
  }
});
