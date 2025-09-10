import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://vinothqaacademy.com/mouse-event/');
  await page.getByRole('button', { name: 'Double Click Me' }).click();
  await page.getByRole('textbox', { name: 'Enter First Name' }).click();
});