// tests/auto-wait.spec.js
const { test, expect } = require('@playwright/test');

async function clickWithAutoWait(locator) {
  // Demonstrating what Playwright auto-wait does internally
  await locator.waitFor({ state: 'attached' });   // element exists in DOM
  await locator.waitFor({ state: 'visible' });    // element is visible
  // Playwright itself handles stable/enabled internally
  await locator.click();                          // now perform click
}

test('3.1 Auto-waiting mechanism demo', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded' });

  // Example: Search box + button
  const searchBox = page.locator('#Wikipedia1_wikipedia-search-input');
  const searchButton = page.locator('.wikipedia-search-button'); // ✅ fixed locator

  // Fill input (auto-wait built-in)
  await searchBox.fill('Playwright');

  // Use our custom wrapper to simulate auto-waiting before clicking
  await clickWithAutoWait(searchButton);

  // Validate results
  await expect(page.locator('.wikipedia-search-results')).toBeVisible();
});
