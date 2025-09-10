// tests/advanced_navigation.spec.js
const { test, expect } = require('@playwright/test');

test.setTimeout(60000);

test('Advanced navigation patterns', async ({ page }) => {
  // Navigate to redirector page
  await page.goto('https://the-internet.herokuapp.com/redirector');

  // Click redirect link and wait for navigation in the SAME page
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click('#redirect')
  ]);

  // Verify redirected URL
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');

  // Go back to original page
  await page.goBack();
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/redirector');

  // Test waiting for specific navigation events
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.goto('https://the-internet.herokuapp.com/')
  ]);

  // Verify navigation completed
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

  // Test reload with options
  await page.reload({ waitUntil: 'domcontentloaded' });
});
