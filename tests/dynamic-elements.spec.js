import { test, expect } from '@playwright/test';

test('Dynamic elements example — example.com', async ({ page }) => {
  // Go to example.com (very stable for tests)
  await page.goto('https://example.com');

  // Verify the stable heading exists
  await expect(page.locator('h1')).toContainText('Example Domain');

  // Click the "More information..." link and wait for navigation
  await Promise.all([
    page.waitForNavigation(/*{ waitUntil: 'domcontentloaded' }*/),
    page.getByRole('link', { name: 'More information...' }).click(),
  ]);

  // We should land on an IANA page (example.com links to IANA). Assert that.
  await expect(page).toHaveURL(/iana\.org/);

  console.log('✅ example.com dynamic-elements test passed');
});
