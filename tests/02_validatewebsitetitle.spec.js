import { test, expect } from '@playwright/test';

test('Lab 2: Verify Website Title', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await expect(page).toHaveTitle('Wikipedia');
  console.log('Current URL:', page.url());
});
