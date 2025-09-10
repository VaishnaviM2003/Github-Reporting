// tests/advanced-web-interactions.spec.js
// Demonstrates advanced interactions: Alerts, Frames, Mouse Actions,
// Keyboard Inputs, File Uploads, and Scrolling in Playwright.

import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Advanced Web Interactions Demo', async ({ page }) => {

  // ------------------- 1. Setup & Alerts -------------------
  await page.goto('https://demoqa.com/alerts');
  await expect(page.locator('h1')).toContainText('Alerts');

  // Simple Alert
  page.once('dialog', dialog => dialog.accept());
  await page.click('#alertButton');
  await expect(page.locator('#alertButton')).toBeVisible();

  // Confirmation Alert (OK)
  page.once('dialog', dialog => dialog.accept());
  await page.click('#confirmButton');
  await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');

  // ------------------- 2. Frames -------------------
  await page.goto('https://demoqa.com/nestedframes');
  await expect(page.locator('.main-header')).toHaveText('Nested Frames');

  const parentFrame = page.frameLocator('#frame1');
  await expect(parentFrame.locator('body')).toContainText('Parent frame');

  const childFrame = parentFrame.frameLocator('iframe');
  await expect(childFrame.locator('p')).toHaveText('Child Iframe');

  // ------------------- 3. Mouse Actions -------------------
  await page.goto('https://vinothqaacademy.com/mouse-event/');
  await expect(page.locator('#dblclick')).toBeVisible();

  // Double Click
  await page.dblclick('#dblclick');
  await expect(page.locator('#demo')).toContainText('Hello World');

  // Right Click
  await page.click('#rightclick', { button: 'right' });
  await expect(page.locator('#rightclick')).toBeVisible();

  // Hover
  await page.hover('#mouseover');
  await expect(page.locator('#mouseover span')).toBeVisible();

  // ------------------- 4. Keyboard Inputs -------------------
  await page.goto('https://demoqa.com/text-box');
  const nameField = page.locator('#userName');
  await expect(nameField).toBeVisible();

  await nameField.click();
  await page.keyboard.type('Vaishnavi');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Control+A'); // use Meta+A on Mac
  await page.keyboard.type('Mishra');
  await expect(nameField).toHaveValue('Mishra');

  // ------------------- 5. File Upload -------------------
  await page.goto('https://the-internet.herokuapp.com/upload');
  await expect(page.locator('h3')).toHaveText('File Uploader');

  // create dummy file if not exists
  const filePath = 'test_upload.txt';
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'This is a test file.');
  }

  await page.setInputFiles('#file-upload', filePath);
  await page.click('#file-submit');
  await expect(page.locator('h3')).toHaveText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toHaveText('test_upload.txt');

  // ------------------- 6. Scrolling -------------------
  await page.goto('https://the-internet.herokuapp.com/large');
  await expect(page.locator('table')).toBeVisible();

  const lastCell = page.locator('table tr:last-child td:last-child');
  await lastCell.scrollIntoViewIfNeeded();
  await expect(lastCell).toBeVisible();

  console.log('✅ All advanced interactions completed successfully!');
});
