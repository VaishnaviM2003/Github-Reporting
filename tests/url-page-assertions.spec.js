import { test, expect } from '@playwright/test';

test('URL & Page Assertions Demo', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Page Title
  await expect(page).toHaveTitle(/Automation Testing Practice/);

  // Page URL
  await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
});
