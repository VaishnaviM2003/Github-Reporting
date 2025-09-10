import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('test', async ({ page }) => {
    //  Navigate to the file upload demo page
  await page.goto('https://the-internet.herokuapp.com/upload');
   //  Verify page heading "File Uploader" is visible
  await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();
   // Create the path to the test file (make sure test_upload.txt exists in your project root)
  await page.getByRole('button', { name: 'Choose File' }).click();
    //  Upload the file using the <input type="file"> element
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('test_upload.txt');
    //  Click on the "Upload" button
  await page.getByRole('button', { name: 'Upload' }).click();
   //  (Verification Point): Check that the uploaded file name is displayed on the page
  await expect(page.locator('#uploaded-files')).toContainText('test_upload.txt');
});