// tests/multi_browser.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.setTimeout(60000);

test('Cross-browser content verification (robust + debug)', async ({ page, browserName }) => {
  await page.goto('https://httpbin.org/html', { waitUntil: 'domcontentloaded' });

  // Wait for h1 and at least one paragraph to appear
  await page.waitForSelector('h1', { timeout: 15000 });
  await page.waitForSelector('p', { timeout: 15000 });

  // Grab paragraphs
  const paragraphs = await page.locator('p').allTextContents();
  console.log(`[${browserName}] paragraph count:`, paragraphs.length);
  if (paragraphs.length) {
    console.log(`[${browserName}] first paragraph (truncated):`, paragraphs[0].slice(0, 250));
  } else {
    console.log(`[${browserName}] no paragraphs found`);
  }

  // Assert: at least one non-empty paragraph
  const nonEmpty = paragraphs.filter(t => t && t.trim().length > 0);
  expect(nonEmpty.length).toBeGreaterThan(0);

  // Save debug artifacts so you can inspect them locally
  await page.screenshot({ path: `screenshot-${browserName}.png`, fullPage: true });
  const html = await page.content();
  fs.writeFileSync(`page-${browserName}.html`, html);

  // Browser-specific screenshot already saved; still assert title/h1 as a softer check
  await expect(page.locator('h1')).toHaveText(/Herman Melville|Moby-Dick/i);
});
