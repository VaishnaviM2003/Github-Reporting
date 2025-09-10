import { test, expect } from '@playwright/test';

test('Lab 8: Practice with a Different Domain', async ({ page }) => {
  await page.goto('https://github.com/');
  console.log('Title:', await page.title());
  console.log('URL:', page.url());
  await expect(page).toHaveTitle("GitHub: Let’s build from here · GitHub");
});
