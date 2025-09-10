import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('Handle Confirmation Alert - Accept OK', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts', { waitUntil: 'domcontentloaded' });

  page.once('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept(); // Click OK
  });

  await page.locator('#confirmButton').click();

  await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');
});
