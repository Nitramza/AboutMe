import { test, expect } from "@playwright/test";

const route = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
type RevealSamples = Record<string, { min: number; max: number }>;

for (const width of [320, 375, 768, 1024, 1440, 2560]) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${width}px / ${colorScheme}: compact portfolio, navigation and documents`, async ({ page, request }) => {
      await page.setViewportSize({ width, height: width < 720 ? 812 : width >= 1920 ? 1440 : 900 });
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto("/");
      await expect(page.getByRole("heading", { name: "Martin Vazquez Islas." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Ingeniero de Software Full Stack | Arquitectura Backend & Flujos con IA" })).toBeVisible();
      await expect(page.locator(".compact-profile-stack")).toHaveCount(0);
      await expect(page.locator(".compact-slide")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
      const profileAlignment = await page.locator(".compact-hero").evaluate(element => {
        const rect = element.getBoundingClientRect();
        const container = element.parentElement!;
        const bounds = container.getBoundingClientRect();
        const styles = getComputedStyle(container);
        const contentTop = bounds.top + parseFloat(styles.paddingTop);
        const contentHeight = container.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
        return { fits: rect.height <= contentHeight, centerOffset: Math.abs(rect.top + rect.height / 2 - contentTop - contentHeight / 2), topOffset: rect.top - contentTop, scrollTop: container.scrollTop };
      });
      if (profileAlignment.fits) expect(profileAlignment.centerOffset).toBeLessThan(1);
      else expect(profileAlignment.topOffset).toBeGreaterThanOrEqual(-1);
      expect(profileAlignment.scrollTop).toBe(0);
      await expect(page.locator(".compact-profile-skills")).toHaveCount(0);
      await expect(page.locator(".compact-highlight-heading")).toHaveText("ENFOQUE");
      await expect(page.locator(".compact-highlight-row")).toHaveCount(6);
      await expect(page.locator(".compact-contact-row")).toContainText("martin.vazquez.islas@hotmail.com");
      await expect(page.locator(".compact-contact-row")).toContainText("+52 222 143 6219");
      const dock = page.locator(".compact-dock");
      const navigation = width <= 760 ? dock : page.locator(".compact-top-nav");
      await expect(dock.locator("button")).toHaveCount(4);
      await expect(page.locator(".compact-top-nav button")).toHaveCount(4);
      await expect(page.locator(".compact-top-nav button svg")).toHaveCount(4);
      await expect(dock.locator("button svg")).toHaveCount(4);
      await expect(dock.locator(".compact-dock-label")).toHaveText(["Perfil", "Experiencia", "Proyectos", "Servicios"]);
      const cyan = await page.locator(".compact-highlight-index").first().evaluate(element => getComputedStyle(element).color);
      const iconColors = await page.locator(".compact-top-nav svg, .compact-dock svg").evaluateAll(icons => icons.map(icon => getComputedStyle(icon).color));
      expect(iconColors).toEqual(Array(8).fill(cyan));
      await expect(dock.locator("button").first()).toHaveAttribute("tabindex", "0");
      await expect(page.getByRole("link", { name: "Descargar PDF · ES" })).toHaveAttribute("href", route("/cv.pdf"));
      await expect(page.getByRole("link", { name: "Descargar PDF · EN" })).toHaveAttribute("href", route("/cv-en.pdf"));
      await expect(page.locator(".compact-printable-links")).toHaveCount(0);
      for (const language of ["es", "en"] as const) {
        const response = await request.get(new URL(route(`/resume/${language}/`), page.url()).toString());
        expect(response.ok()).toBeTruthy();
      }
      if (width <= 760) {
        for (const label of await dock.locator(".compact-dock-label").all()) {
          await expect(label).toBeVisible();
          expect(await label.evaluate(element => element.scrollWidth <= element.clientWidth && element.getBoundingClientRect().right <= element.parentElement!.getBoundingClientRect().right)).toBeTruthy();
        }
        const homeDockItem = dock.getByRole("button", { name: "Perfil" });
        await homeDockItem.hover();
        await expect(homeDockItem.locator(".compact-dock-tooltip")).toBeHidden();
      }
      await navigation.getByRole("button", { name: "Experiencia" }).click();
      await expect(page.locator(".compact-slide")).toHaveCount(1);
      await expect(page.getByRole("heading", { name: "Experiencia profesional" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Stack & especialidades" })).toBeVisible();
      await expect(page.locator("#experience .compact-profile-skill-row")).toHaveCount(9);
      await expect(page.locator("#experience .compact-profile-details p")).toHaveCount(2);
      for (const term of ["Sistemas conectados", "Oracle SQL", "Checkmarx", "SQL Server", "AI agents"]) {
        await expect(page.locator("#experience .compact-profile-skills")).toContainText(term);
      }
      await expect(page.locator("#experience .compact-profile-skills")).not.toContainText("En desarrollo: Go");
      expect(await page.locator("#experience").evaluate(element => element.querySelector(".compact-profile-skills")!.getBoundingClientRect().top >= element.querySelector(".compact-timeline")!.getBoundingClientRect().bottom)).toBeTruthy();
      await expect(page.getByRole("tab")).toHaveCount(0);
      await expect(page.locator(".compact-timeline .compact-experience-date")).toHaveCount(4);
      const experienceLayout = await page.locator(".compact-timeline").evaluate(element => {
        const cards = Array.from(element.querySelectorAll(".compact-experience-card"), card => card.getBoundingClientRect());
        const nextRow = cards.slice(1).find(card => Math.abs(card.left - cards[0].left) < 1 && card.top > cards[0].top + 1);
        const styles = getComputedStyle(element);
        return { columns: styles.gridTemplateColumns.split(" ").length, gap: nextRow ? nextRow.top - cards[0].bottom : -1, expectedGap: parseFloat(styles.rowGap) };
      });
      expect(experienceLayout.columns).toBe(width < 1200 ? 1 : 2);
      expect(Math.abs(experienceLayout.gap - experienceLayout.expectedGap)).toBeLessThan(1);
      await navigation.getByRole("button", { name: "Proyectos" }).click();
      await expect(page.getByText("SaaS de Liquidez Quincenal & Control de Tarjetas")).toBeVisible();
      await expect(page.getByText("En Desarrollo / Arquitectura")).toBeVisible();
      await expect(page.locator(".compact-project-card")).toHaveCount(6);
      expect(await page.locator(".compact-project-grid").evaluate(element => getComputedStyle(element).gridTemplateColumns.split(" ").length)).toBe(width < 1200 ? 1 : 3);
      await expect(page.locator(".compact-project-card").first()).toContainText("CASO PROFESIONAL");
      const projectTitleSize = await page.locator(".compact-project-card h3").first().evaluate(element => parseFloat(getComputedStyle(element).fontSize));
      await navigation.getByRole("button", { name: "Experiencia" }).click();
      const experienceTitleSize = await page.locator(".compact-experience-title h3").first().evaluate(element => parseFloat(getComputedStyle(element).fontSize));
      expect(Math.abs(projectTitleSize - experienceTitleSize)).toBeLessThan(2);
      await page.getByRole("button", { name: "EN", exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.getByRole("heading", { name: "Full Stack Software Engineer | Backend Architecture & AI Workflows" })).toBeVisible();
      await navigation.getByRole("button", { name: "Projects" }).click();
      await expect(page.getByText("Fortnightly Liquidity & Card Management SaaS")).toBeVisible();
      await expect(page.getByText("In Development / Architecture")).toBeVisible();
      await page.locator(".compact-icon-button").click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme === "dark" ? "light" : "dark");
      await page.getByRole("button", { name: "ES", exact: true }).click();
      await navigation.getByRole("button", { name: "Perfil" }).click();
      await expect(page.locator(".compact-profile-skills")).toHaveCount(0);
      for (const link of [page.getByRole("link", { name: "Descargar PDF · ES" }), page.getByRole("link", { name: "Descargar PDF · EN" })]) {
        const href = await link.getAttribute("href");
        expect(href).not.toBeNull();
        const response = await request.get(new URL(href ?? "", page.url()).toString());
        expect(response.ok(), href ?? "Missing PDF link").toBeTruthy();
        expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      const maxPageHeight = await page.evaluate(() => document.documentElement.clientHeight * 3);
      expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(maxPageHeight);
      if (width >= 1920) {
        const sizing = await page.evaluate(() => ({ root: parseFloat(getComputedStyle(document.documentElement).fontSize), content: document.querySelector(".compact-slide-content")!.getBoundingClientRect().width }));
        expect(sizing.root).toBe(24);
        expect(sizing.content).toBeGreaterThan(1800);
        expect(sizing.content).toBeLessThanOrEqual(1920);
      }
      await navigation.getByRole("button", { name: "Servicios" }).click();
      await expect(page.locator(".compact-service-card")).toHaveCount(3);
      await expect(page.locator(".compact-service-offer")).toHaveCount(3);
      await expect(page.locator(".compact-service-index")).toHaveText(["01", "02", "03"]);
      expect(await page.locator(".compact-service-grid").evaluate(element => getComputedStyle(element).gridTemplateColumns.split(" ").length)).toBe(width < 1200 ? 1 : 3);
      for (const card of await page.locator(".compact-service-card").all()) {
        await expect(card.locator(".compact-service-offer")).toHaveCount(1);
        const circle = await card.evaluate(element => ({ content: getComputedStyle(element, "::after").content, radius: getComputedStyle(element, "::after").borderRadius }));
        expect(circle.content).not.toBe("none");
        expect(circle.radius).toBe("50%");
      }
      const serviceTitleSize = await page.locator(".compact-service-card h3").first().evaluate(element => parseFloat(getComputedStyle(element).fontSize));
      expect(Math.abs(projectTitleSize - serviceTitleSize)).toBeLessThan(2);
      await expect(page.getByRole("link", { name: "Hablemos / Contactar vía LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/martin-vazquez-islas/");
      await expect(page.locator(".compact-services-contact")).toContainText("martin.vazquez.islas@hotmail.com");
      await expect(page.locator(".compact-services-contact")).toContainText("+52 222 143 6219");
      await expect(page.locator(".compact-services a[href*='/resume/']")).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "Servicios & colaboración" })).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
}
  test("static first paint contains a loading skeleton before hydration", async ({ browser }) => {
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto("/");
    await expect(page.locator(".compact-slide")).toHaveAttribute("aria-busy", "true");
    await expect(page.locator(".compact-skeleton")).toHaveCount(1);
    await expect(page.locator(".compact-dock button")).toHaveAttribute("tabindex", "0");
    await page.close();
  });

for (const colorScheme of ["light", "dark"] as const) {
  test(`mobile dock follows taps and swipes without tooltips in ${colorScheme} mode`, async ({ browser, baseURL }) => {
    const page = await browser.newPage({ baseURL, viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true, colorScheme, reducedMotion: "reduce" });
    try {
      await page.goto("/");
      await expect(page.locator("#profile-name")).toBeVisible();
      const dock = page.locator(".compact-dock");
      const expectActive = async (index: number) => {
        await expect(dock.locator("button").nth(index)).toHaveAttribute("aria-current", "page");
        const states = await dock.locator("button").evaluateAll(buttons => buttons.map(button => ({ active: button.classList.contains("compact-dock-active"), background: getComputedStyle(button).backgroundColor, bar: getComputedStyle(button, "::after").content })));
        for (const [position, state] of states.entries()) {
          expect(state.active).toBe(position === index);
          if (position === index) {
            expect(state.background).not.toBe("rgba(0, 0, 0, 0)");
            expect(state.bar).not.toBe("none");
          } else {
            expect(state.background).toBe("rgba(0, 0, 0, 0)");
            expect(state.bar).toBe("none");
          }
        }
        for (const tooltip of await dock.locator(".compact-dock-tooltip").all()) await expect(tooltip).toBeHidden();
      };
      await dock.getByRole("button", { name: "Experiencia" }).tap();
      await expectActive(1);
      const client = await page.context().newCDPSession(page);
      const swipe = async (left: boolean) => {
        await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: left ? 290 : 80, y: 250 }] });
        await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 180, y: 250 }] });
        await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: left ? 80 : 290, y: 250 }] });
        await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      };
      for (const [left, index] of [[true, 2], [true, 3], [false, 2], [false, 1], [false, 0]] as const) {
        await swipe(left);
        await expectActive(index);
      }
    } finally {
      await page.close();
    }
  });
}

  test("dock hover animates only the focused destination", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const buttons = page.locator(".compact-dock button");
    await buttons.first().hover();
    await expect.poll(() => buttons.first().evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeGreaterThan(1.15);
    await expect.poll(() => buttons.nth(1).evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeLessThanOrEqual(1.01);
    for (const index of [1, 2, 3]) {
      await expect.poll(() => buttons.nth(index).evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeLessThanOrEqual(1.01);
    }
  });

test("personalized PDF downloads use the correct language and name", async ({ page }) => {
  await page.goto("/");
  for (const language of ["es", "en"] as const) {
    await page.getByRole("button", { name: language.toUpperCase(), exact: true }).click();
    const expectedName = `${language.toUpperCase()}_Martin_Vazquez_Islas_CV.pdf`;
    const link = page.locator(`.compact-downloads a[download="${expectedName}"]`);
    const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);
    expect(download.suggestedFilename()).toBe(expectedName);
    expect(await download.failure()).toBeNull();
  }
});

test("experience cards animate and skills remain as focus rows", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Experiencia" }).click();
  const experienceCard = page.locator(".compact-experience-card").first();
  const initialTop = await experienceCard.evaluate(element => element.getBoundingClientRect().top);
  await experienceCard.hover();
  await expect.poll(() => experienceCard.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(initialTop - 2);
  await expect(page.locator("#experience .compact-profile-skill-row")).toHaveCount(9);
  await expect(page.locator("#experience .compact-profile-skill-row").nth(4)).toContainText("Agentes y Agent Skills");
  await page.getByRole("button", { name: "Perfil" }).click();
  await expect(page.locator(".compact-profile-skills")).toHaveCount(0);
});

test("project cards only show real public links and service CTA uses LinkedIn", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Proyectos" }).click();
  const portfolio = page.locator(".compact-project-card").filter({ hasText: "CV web y portafolio profesional" });
  await expect(portfolio.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/Nitramza/AboutMe");
  await expect(portfolio.getByRole("link", { name: "Demo" })).toHaveAttribute("href", "https://nitramza.github.io/AboutMe/");
  await expect(portfolio.locator("img")).toHaveCount(0);
  await expect(page.locator(".compact-project-card").filter({ hasText: "SaaS de Liquidez Quincenal" })).not.toHaveAttribute("href", "#");
  await expect(page.locator(".compact-project-card a[href='#']")).toHaveCount(0);
  await page.getByRole("button", { name: "Servicios" }).click();
  await expect(page.getByRole("link", { name: "Hablemos / Contactar vía LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/martin-vazquez-islas/");
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

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`profile and supporting content reveal with ${reducedMotion} motion`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion });
    await page.addInitScript(() => {
      const trackedWindow = window as typeof window & { revealSamples: RevealSamples };
      trackedWindow.revealSamples = {};
      const targets = { title: "#profile-name", profileContact: ".compact-contact-row a", focus: ".compact-highlight-row", stackHeading: ".compact-profile-skills-heading", stack: ".compact-profile-skill-row", education: ".compact-profile-details p", linkedin: ".compact-contact-link", serviceContact: ".compact-services-contact a" };
      const sample = () => {
        for (const [key, selector] of Object.entries(targets)) {
          const element = document.querySelector(selector);
          if (!element) continue;
          const opacity = Number(getComputedStyle(element).opacity);
          const previous = trackedWindow.revealSamples[key] ?? { min: 1, max: 0 };
          trackedWindow.revealSamples[key] = { min: Math.min(previous.min, opacity), max: Math.max(previous.max, opacity) };
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await page.goto("/");
    await expect(page.locator("#profile-name")).toBeVisible();
    await page.waitForFunction(() => Array.from(document.querySelectorAll("#profile-name, .compact-contact-row a, .compact-highlight-row")).every(element => Number(getComputedStyle(element).opacity) === 1));
    const navigation = page.locator(".compact-dock");
    await navigation.getByRole("button", { name: "Experiencia" }).click();
    await page.locator(".compact-profile-details").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll(".compact-profile-skills-heading, .compact-profile-skill-row, .compact-profile-details p")).every(element => Number(getComputedStyle(element).opacity) === 1));
    await navigation.getByRole("button", { name: "Servicios" }).click();
    await page.locator(".compact-services-contact").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll(".compact-contact-link, .compact-services-contact a")).every(element => Number(getComputedStyle(element).opacity) === 1));
    const samples = await page.evaluate(() => (window as typeof window & { revealSamples: RevealSamples }).revealSamples);
    expect(Object.keys(samples)).toHaveLength(8);
    for (const sample of Object.values(samples)) {
      expect(sample.max).toBe(1);
      if (reducedMotion === "reduce") expect(sample.min).toBeGreaterThanOrEqual(0.99);
      else expect(sample.min).toBeLessThan(0.99);
    }
  });
}

test("keyboard navigation starts at skip link and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir al contenido" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#deck-slide$/);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".compact-slide")).toHaveAttribute("aria-label", "02 / EXPERIENCIA");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".compact-slide")).toHaveAttribute("aria-label", "03 / PROYECTOS");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".compact-slide")).toHaveAttribute("aria-label", "04 / SERVICIOS");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".compact-slide")).toHaveAttribute("aria-label", "03 / PROYECTOS");
});

test("minimal tech theme exposes the requested colors in light and dark modes", async ({ page }) => {
  await page.goto("/");
  const palette = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return Object.fromEntries(["--deep-space", "--royal-blue", "--sky-focus", "--soft-cloud", "--bg", "--accent"].map(token => [token, styles.getPropertyValue(token).trim()]));
  });
  expect(palette).toMatchObject({ "--deep-space": "#1b262c", "--royal-blue": "#0f4c75", "--sky-focus": "#3282b8", "--soft-cloud": "#bbe1fa", "--bg": "#f4f8fb", "--accent": "#0f4c75" });
  await page.locator(".compact-icon-button").click();
  const darkPalette = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return { background: styles.getPropertyValue("--bg").trim(), foreground: styles.getPropertyValue("--text").trim(), accent: styles.getPropertyValue("--accent").trim() };
  });
  expect(darkPalette).toMatchObject({ background: "#1b262c", foreground: "#edf7fd", accent: "#bbe1fa" });
});