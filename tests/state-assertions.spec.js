// tests/state-assertions.spec.js
const { test, expect } = require('@playwright/test');

test('Attribute & State Assertions Demo', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'domcontentloaded' });

  // Attribute check
  await expect(page.locator('#Wikipedia1_wikipedia-search-input')).toHaveAttribute('type', 'text');

  // Enabled / Disabled (fixed locator)
  await expect(page.locator('.wikipedia-search-button')).toBeEnabled();

  // Checkbox state
  const checkbox = page.locator('#sunday');
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  // Negative check - another checkbox should not be checked
  await expect(page.locator('#monday')).not.toBeChecked();
});
