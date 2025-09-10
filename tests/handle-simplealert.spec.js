import { test, expect } from '@playwright/test';

test.setTimeout(60000); // shorter, safer timeout

test('Handle simple alert', async ({ page }) => {
  // Navigate without waiting for slow resources
  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });

  // Handle the alert dialog
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`); 
    await dialog.dismiss();
  });

  // Trigger the alert
  await page.locator('#alertButton').click();

  // Verification: button is still visible
  await expect(page.locator('#alertButton')).toBeVisible();
});
