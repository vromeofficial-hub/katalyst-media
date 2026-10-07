import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { renderCampaignPreview } from "../src/lib/portal/report-preview-layout";

for (const [name, title, artist] of [
  ["standard", "High hopes", "Gigi Moss"],
  ["long", "The Places We Used to Go When We Thought This Summer Would Last Forever (Anniversary Edition)", "Alexandra and the Midnight Orchestra featuring The Northern Lights"],
  ["fallback", "A New Release", null],
]) {
  test(`preview layout renders ${name} campaign without artwork`, async ({}, testInfo) => {
    const response = await renderCampaignPreview({ title: title!, artist, artwork: null });
    expect(response.status).toBe(200);
    const image = Buffer.from(await response.arrayBuffer());
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
    const path = testInfo.outputPath(`${name}.png`);
    await writeFile(path, image);
    await testInfo.attach(name!, { path, contentType: "image/png" });
  });
}
