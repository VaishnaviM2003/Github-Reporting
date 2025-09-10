import { test, expect } from '@playwright/test';

test('Lab 9: Navigate to a News Website', async ({ page }) => {
  await page.goto('https://www.bbc.com/news');
  await expect(page).toHaveURL('https://www.bbc.com/news');
  console.log('BBC News Title:', await page.title());
});
 