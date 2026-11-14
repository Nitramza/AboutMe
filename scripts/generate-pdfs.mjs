import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { cvData } from "../src/data/cvData.ts";

const baseURL = process.env.CV_BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch();
try {
  await mkdir("public", { recursive: true });
  for (const language of ["es", "en"]) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 1 });
    const response = await page.goto(`${baseURL}/resume/${language}/`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`Resume route failed: ${language}`);
    await page.evaluate(() => document.fonts.ready);
    for (const sheet of await page.locator(".resume-page").all()) {
      const fits = await sheet.evaluate(element => {
        const footer = element.querySelector("footer");
        const content = [...element.children].filter(child => child !== footer);
        return !footer || content.every(child => child.getBoundingClientRect().bottom < footer.getBoundingClientRect().top - 4);
      });
      if (!fits) throw new Error(`Content overlaps the footer in the ${language} resume.`);
    }
    const pdfPath = `public${cvData[language].profile.pdf}`;
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true });
    await page.emulateMedia({ media: "screen" });
    await page.locator(".resume-page").first().screenshot({ path: `public/cv-preview-${language}.png` });
    await page.close();
    console.log(`Generated ${pdfPath} and preview (${language}).`);
  }
} finally {
  await browser.close();
}