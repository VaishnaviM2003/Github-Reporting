import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  await page.getByRole('heading', { name: 'File Uploader' }).click();

  // Ensure test_upload.txt exists
  const filePath = path.join(__dirname, 'test_upload.txt');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Hello, this is a Playwright test upload file.');
  }

  await page.locator('input[type="file"]').setInputFiles(filePath);
  await page.getByRole('button', { name: 'Upload' }).click();
});
