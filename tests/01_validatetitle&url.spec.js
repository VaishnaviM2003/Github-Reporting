import { test, expect } from '@playwright/test';

test('Lab 1: First Script & Basic Navigation', async ({ page }) => 
  {
    await page.goto('https://playwright.dev');
    console.log(await page.title());
    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
  });
