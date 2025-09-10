import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {
 await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
 await expect(page.getByRole('img', { name: 'Fork me on GitHub'
})).toBeVisible();
 page.once('dialog', dialog => {
 console.log(`Dialog message: ${dialog.message()}`);
 dialog.dismiss().catch(() => {});
 });
 await page.getByRole('button', { name: 'Click for JS Alert' }).click();
 page.once('dialog', dialog => {
 console.log(`Dialog message: ${dialog.message()}`);
 dialog.dismiss().catch(() => {});
 });
 await page.getByRole('button', { name: 'Click for JS Confirm'
}).click();
 page.once('dialog', dialog => {
 console.log(`Dialog message: ${dialog.message()}`);
 dialog.dismiss().catch(() => {});
 });
 await page.getByRole('button', { name: 'Click for JS Confirm'
}).click();
 page.once('dialog', dialog => {
 console.log(`Dialog message: ${dialog.message()}`);
 dialog.dismiss().catch(() => {});
 });
 await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
 await expect(page.getByRole('list')).toContainText('Click for JS Alert');
});
