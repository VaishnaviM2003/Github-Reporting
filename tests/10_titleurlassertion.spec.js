import { test, expect } from '@playwright/test';

test('Lab 10: Combine Title and URL Assertions', async ({ page }) => {
  await page.goto('https://nodejs.org/');
  await expect(page).toHaveTitle(/Node\.js/);
  await expect(page).toHaveURL('https://nodejs.org/');
  console.log('All assertions passed for Node.js!');
});
