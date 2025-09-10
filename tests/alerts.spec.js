import { test, expect } from '@playwright/test';

test.setTimeout(60000); // shorter timeout per test

test('Alerts page heading is visible', async ({ page }) => {
  // Navigate without waiting for full load (prevents timeout issues)
  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });

  // Verify heading contains text "Alerts"
  const heading = page.getByRole('heading', { name: 'Alerts' });
  await expect(heading).toBeVisible();
});
