import { test, expect } from '@playwright/test';

test('Practice dynamic loading from The Internet site', async ({ page }) => {
  // Open the demo page
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  // Click the "Start" button to begin loading
  await page.click('button');

  // Wait for the "Hello World!" element to appear
  await page.waitForSelector('#finish h4', { state: 'visible', timeout: 10000 });

  // Assert that the text is correct
  await expect(page.locator('#finish h4')).toHaveText('Hello World!');

  console.log('✅ Dynamic loading test passed on The Internet site');
});
