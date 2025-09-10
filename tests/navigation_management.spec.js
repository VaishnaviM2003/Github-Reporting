const { test, expect } = require('@playwright/test');

test('Navigation and state management - robust new tab handling', async ({ page, context }) => {
  const base = 'https://the-internet.herokuapp.com/';

  // Go to main page → login
  await page.goto(base);
  await page.click('a[href="/login"]');
  await expect(page).toHaveURL(base + 'login');

  // Go back → then forward
  await page.goBack();
  await expect(page).toHaveURL(base);
  await page.goForward();
  await expect(page).toHaveURL(base + 'login');

  // Reload and verify
  await page.reload();
  await expect(page.locator('h2')).toHaveText('Login Page');

  // Ensure footer link is visible
  const extLink = page.locator('a[href="http://elementalselenium.com/"]');
  await extLink.scrollIntoViewIfNeeded();
  await expect(extLink).toBeVisible();

  // Open link in new tab
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    extLink.click(),
  ]);

  // Wait for new tab and validate URL
  await newPage.waitForLoadState('domcontentloaded');
  expect(await newPage.url()).toContain('elementalselenium.com');

  // Close new tab and verify main tab still active
  await newPage.close();
  await expect(page).toHaveURL(base + 'login');
});
