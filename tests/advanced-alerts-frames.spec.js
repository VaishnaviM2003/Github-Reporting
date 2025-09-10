import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');

  await page.getByRole('heading', { name: 'Alerts' }).click();

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#alertButton').click();

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#confirmButton').click();

  await page.getByRole('listitem').filter({ hasText: 'Nested Frames' }).click();
  await page.getByRole('heading', { name: 'Nested Frames' }).click();

  const parentFrame = await page.locator('#frame1').contentFrame();
  await parentFrame.getByText('Parent frame').click();

  const childFrame = await parentFrame.locator('iframe').contentFrame();
  await childFrame.locator('html').click();
});
