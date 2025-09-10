import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('test', async ({ page }) => {
    //  Navigate to the mouse event demo page
  await page.goto('https://vinothqaacademy.com/mouse-event/');
   //  Click inside the "Enter First Name" text box (basic focus action)
  await page.getByRole('textbox', { name: 'Enter First Name' }).click();
   //  Perform a DOUBLE CLICK on the "Double Click Me" button
  await page.getByRole('button', { name: 'Double Click Me' }).click();
    //  Verify that the double-click action triggered the expected text
  await expect(page.locator('#dblclick')).toContainText('Double Click Me');
   //  Perform a RIGHT CLICK on the "Right Click Me" button
  await page.getByRole('button', { name: 'Right Click Me' }).click({
    button: 'right'
  });
   //  Verify that the right-click action triggered the expected text
  await expect(page.locator('#rightclick')).toContainText('Right Click Me');
});