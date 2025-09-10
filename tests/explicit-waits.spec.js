// tests/explicit-waits.spec.js
const { test, expect } = require('@playwright/test');

test('3.2 Explicit Waits demo', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded' });

  // ✅ page.waitForSelector()
  await page.fill('#Wikipedia1_wikipedia-search-input', 'Playwright');
  await page.click('.wikipedia-search-button');
  await page.waitForSelector('.wikipedia-search-results');
  console.log('✔ Results container appeared');

  // ✅ page.waitForFunction()
  await page.waitForFunction(() => document.readyState === 'complete');
  console.log('✔ Document is fully loaded');

  // ✅ page.waitForResponse()
  await page.waitForResponse((resp) =>
    resp.url().includes('wikipedia.org') && resp.status() === 200
  );
  console.log('✔ Wikipedia API response received');

  // ✅ Handle popup instead of waitForNavigation
  const firstResult = page.locator('.wikipedia-search-results a').first();
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),  // waits for new tab
    firstResult.click()
  ]);
  await newPage.waitForLoadState();
  console.log('✔ Wikipedia opened in a new tab');

  // ❌ Example of fixed wait (avoid in real tests)
  await page.waitForTimeout(2000);
  console.log('⚠ Used fixed wait (demo only, avoid in real tests)');

  // ✅ Assert Wikipedia loaded
  await expect(newPage).toHaveURL(/wikipedia\.org/);
});
