import { test, expect } from '@playwright/test';

test('Verify Nested Frames', async ({ page }) => {
  await page.goto('https://demoqa.com/nestedframes', { waitUntil: 'domcontentloaded' });

  // Switch to parent frame (#frame1)
  const parentFrame = await page.frameLocator('#frame1');

  // Verify parent frame contains "Parent frame"
  await expect(parentFrame.locator('body')).toContainText('Parent frame');

  // Switch to child frame inside parent
  const childFrame = parentFrame.frameLocator('iframe');

  // Verify child frame contains "Child Iframe"
  await expect(childFrame.locator('p')).toHaveText('Child Iframe');
});
