import { test, expect } from "@playwright/test";

for (const width of [375, 1440]) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${width}px / ${colorScheme}: languages, links, theme, assets and layout`, async ({ page, request }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Martin Vazquez Islas", exact: true })).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
      await expect(page.getByRole("link", { name: "LinkedIn", exact: true }).first()).toHaveAttribute("href", "https://www.linkedin.com/in/martin-vazquez-islas/");
      await expect(page.getByRole("link", { name: "Descargar CV (PDF)" })).toHaveAttribute("href", "/cv.pdf");
      await expect(page.getByText("Inglés · Intermedio (B1)")).toBeVisible();
      await page.getByRole("button", { name: "EN", exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.getByRole("link", { name: "Download resume (PDF)" })).toHaveAttribute("href", "/cv-en.pdf");
      await expect(page.getByText("English · Intermediate (B1)")).toBeVisible();
      await page.getByRole("button", { name: "Toggle theme" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme === "dark" ? "light" : "dark");
      await page.getByRole("button", { name: "ES", exact: true }).click();
      if (width < 720) {
        await page.getByRole("button", { name: "Menú", exact: true }).click();
        await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible();
        await page.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Experiencia" }).click();
        await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toHaveCount(0);
      }
      for (const file of ["/cv.pdf", "/cv-en.pdf", "/cv-preview-es.png", "/cv-preview-en.png"]) {
        const response = await request.get(file);
        expect(response.ok(), file).toBeTruthy();
        if (file.endsWith(".pdf")) expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      for (const image of await page.locator("#documents img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
      await page.getByRole("button", { name: "Cambiar tema" }).click();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `test-results/cv-${width}-${colorScheme}.png`, fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}

test("personalized PDF downloads use the correct language and name", async ({ page }) => {
  await page.goto("/");
  for (const language of ["es", "en"] as const) {
    await page.getByRole("button", { name: language.toUpperCase(), exact: true }).click();
    const expectedName = `${language.toUpperCase()}_Martin_Vazquez_Islas_CV.pdf`;
    const links = [page.locator(".hero-actions a[download]"), page.locator(`.document-link[download="${expectedName}"]`)];
    for (const link of links) {
      const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);
      expect(download.suggestedFilename()).toBe(expectedName);
      expect(await download.failure()).toBeNull();
    }
  }
});

for (const language of ["es", "en"] as const) {
  test(`${language}: printable resume has conventional sections and linear reading order`, async ({ page }) => {
    await page.goto(`/resume/${language}/`);
    await expect(page).toHaveTitle(`Martin Vazquez Islas | CV ${language.toUpperCase()}`);
    await expect(page.locator(".resume-page")).toHaveCount(2);
    await expect(page.getByRole("heading", { name: language === "es" ? "Resumen profesional" : "Professional summary" })).toBeVisible();
    await expect(page.getByRole("heading", { name: language === "es" ? "Habilidades técnicas" : "Technical skills" })).toBeVisible();
    for (const selector of [".resume-skills", ".resume-education"]) {
      expect(await page.locator(selector).evaluate(element => getComputedStyle(element).display)).toBe("block");
    }
    await expect(page.locator(".resume-document")).toContainText("B1");
    for (const term of ["Spring Boot", "Apache Kafka", "JWT", "JDBC", "JUnit", "Mockito", "SonarQube"]) {
      await expect(page.locator(".resume-document")).toContainText(term);
    }
    await page.emulateMedia({ media: "print" });
    await page.locator(".resume-page").first().screenshot({ path: `test-results/resume-${language}-page-1.png`, animations: "disabled" });
    await page.locator(".resume-page").nth(1).screenshot({ path: `test-results/resume-${language}-page-2.png`, animations: "disabled" });
  });
}

test("keyboard navigation starts at skip link and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir al contenido" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  expect(await page.locator(".hero").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
});