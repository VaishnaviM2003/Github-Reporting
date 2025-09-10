import { test, expect } from '@playwright/test';

test('Lab 5: Navigate to a Sub-page', async ({ page }) => {
  await page.goto('https://playwright.dev/python/docs/intro');
  await expect(page).toHaveTitle(/Playwright for Python/);
  await expect(page).toHaveURL(/.*\/python\/docs\/intro/);
});