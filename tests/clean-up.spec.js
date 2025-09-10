import { test, expect } from '@playwright/test';

// 1. Clean Up Generated Code
test('Clean up codegen example', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Before cleanup (example style) → commented out to avoid errors
  // await page.click('#someId');
  // await page.waitForTimeout(3000);
  // await page.click('#anotherId');

  // After cleanup (real working selectors)
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page).toHaveURL(/docs/);

  console.log('✅ Cleaned up selectors & removed hard waits');
});