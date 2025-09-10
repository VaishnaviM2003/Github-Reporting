import { test, expect } from '@playwright/test';

test('Assertions example — example.com', async ({ page }) => {
  // go to a very stable page
  await page.goto('https://example.com');

  // verify the page heading is the expected, stable text
  await expect(page.locator('h1')).toContainText('Example Domain');

  // click the "More information..." link and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('link', { name: 'More information...' }).click(),
  ]);

  // verify we navigated to IANA
  await expect(page).toHaveURL(/iana\.org/);

  console.log('✅ Example.com assertions passed');
});
