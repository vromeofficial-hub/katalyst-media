import { expect, test } from "@playwright/test";

test("unavailable reports do not expose campaign preview images", async ({ request }) => {
  const response = await request.get("/report/invalid-preview-test/preview-image");
  expect(response.status()).toBe(404);
  expect(response.headers()["cache-control"]).toContain("no-store");
  const page = await request.get("/report/invalid-preview-test", { headers: { "User-Agent": "WhatsApp/2.24" } });
  const head = (await page.text()).split("</head>")[0];
  expect(head).toContain("Campaign report unavailable");
  expect(head).toContain("noindex");
  expect(head).not.toContain('property="og:image"');
});

test("shared report metadata and artwork are available without JavaScript", async ({ request }) => {
  const token = process.env.REPORT_PREVIEW_TEST_TOKEN;
  test.skip(!token, "Provide an enabled report token to verify its preview.");
  for (const agent of ["WhatsApp/2.24", "facebookexternalhit/1.1"]) {
    const response = await request.get(`/report/${token}`, { headers: { "User-Agent": agent } });
    expect(response.ok()).toBeTruthy();
    const head = (await response.text()).split("</head>")[0];
    expect(head).toContain("/preview-image");
    expect(head).toContain("summary_large_image");
    expect(head).toContain("noindex");
    expect(head).not.toContain("Music Marketing for Artists");
    if (process.env.REPORT_PREVIEW_TEST_TITLE) expect(head).toContain(process.env.REPORT_PREVIEW_TEST_TITLE);
  }
  const response = await request.get(`/report/${token}/preview-image`);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toBe("image/png");
  const image = await response.body();
  expect(image.readUInt32BE(16)).toBe(1200);
  expect(image.readUInt32BE(20)).toBe(630);
});
