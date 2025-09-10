import { test, expect } from '@playwright/test';

// 4. Error Handling
test('Error handling example', async ({ page }) => {
  await page.goto('https://example.com');

  try {
    // Example.com has no "Accept" button, so this will timeout
    await page.click('button:has-text("Accept")', { timeout: 5000 });
    console.log('✅ Cookie banner accepted');
  } catch (error) {
    console.log('⚠️ Cookie banner not found (expected)');
  }

  console.log('✅ Error handling example completed');
});
