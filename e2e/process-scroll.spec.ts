import { chromium, expect, firefox, test, webkit } from "@playwright/test";

for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  test(`${name}: process line retraces its route when scrolling upward`, async ({ baseURL }) => {
    const browser = await engine.launch();
    const page = await browser.newPage({ reducedMotion: "no-preference", permissions: [] });
    try {
      await page.goto(baseURL!, { waitUntil: "domcontentloaded" });
      // Changing breakpoints on the same page must also replace old triggers.
      for (const width of [1440, 390, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        await expect(page.locator("#process")).toHaveClass(width >= 1200 ? /process-journey--desktop/ : /process-journey--mobile/);
        await page.waitForTimeout(700);
        const geometry = await page.locator("#process").evaluate((element) => ({
          top: element.getBoundingClientRect().top + window.scrollY,
          height: element.querySelector(".process-journey__canvas")!.getBoundingClientRect().height,
        }));
        const at = async (fraction: number) => {
          await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), geometry.top + geometry.height * fraction - 450);
          await expect.poll(() => page.locator(".process-signal").evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0);
          await page.waitForTimeout(180);
          const state = await page.locator(".process-route__complete").evaluate((element) => ({
            dash: element.getAttribute("stroke-dasharray"),
            tip: (document.querySelector(".process-signal") as HTMLElement).style.top,
            opacity: Number(getComputedStyle(document.querySelector(".process-signal")!).opacity),
          }));
          expect(state.dash).not.toBeNull();
          expect(state.opacity).toBeGreaterThan(0);
          return state;
        };
        const early = await at(0.4);
        const middle = await at(0.6);
        const late = await at(0.8);
        expect(parseFloat(late.tip)).toBeGreaterThan(parseFloat(middle.tip));
        expect(parseFloat(middle.tip)).toBeGreaterThan(parseFloat(early.tip));
        expect(await at(0.6)).toEqual(middle);
        expect(await at(0.4)).toEqual(early);
        expect(await at(0.8)).toEqual(late);
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator("#process")).toHaveClass(/process-journey--reduced/);
      await expect(page.locator(".process-route__complete")).not.toHaveAttribute("stroke-dasharray");
    } finally {
      await browser.close();
    }
  });
}
