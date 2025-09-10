import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('test', async ({ page }) => {
   // Navigate to the DemoQA Text Box page
  await page.goto('https://demoqa.com/text-box');
    //  Focus on the "Full Name" text box
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('John');
  //  Press Tab to move focus to the next input field (Email)
  await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
    //  Fill the Email field
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('John@gmail.com');
  //  Press Shift+Tab to move BACK to the Full Name field
  await page.getByRole('textbox', { name: 'name@example.com' }).press('Shift+Tab');
    //  Select all text in the Full Name field 
  await page.getByRole('textbox', { name: 'Full Name' }).press('ControlOrMeta+A');
   //  Overwrite by typing LAST NAME ("ULIYAR")
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Depp');
   //  (Verification Point):
  await expect(page.getByRole('textbox', { name: 'Full Name' })).toHaveValue('Depp');
});