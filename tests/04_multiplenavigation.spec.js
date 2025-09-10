import { test, expect } from '@playwright/test';
 
test('Navigate to multiple websites and print titles', async ({ page }) => {
 
  await page.goto('https://playwright.dev/');
  const title1 = await page.title();
  console.log('Playwright Title:', title1);
 
  await page.goto('https://www.wikipedia.org/');
  const title2 = await page.title();
  console.log('Wikipedia Title:', title2);
 
  await page.goto('https://www.google.com/');
  const title3 = await page.title();
  console.log('Google Title:', title3);
});