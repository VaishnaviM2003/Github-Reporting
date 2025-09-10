import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/large');
  await page.getByRole('cell', { name: '50.50' }).click();
});