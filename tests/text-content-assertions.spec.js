import { test, expect } from '@playwright/test';

test.describe('Text Content Assertions Demo', () => {
  test('Check text assertions on TestAutomationPractice', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', {
      waitUntil: 'commit',
      timeout: 60000,
    });

    // 1. toHaveText() - exact text match (site title is stable)
    const siteTitle = page.locator('h1.title');
    await expect(siteTitle).toHaveText('Automation Testing Practice');

    // 2. toContainText() - partial match in a blog post heading
    const firstPostHeading = page.locator('h2.title').first();
    await expect(firstPostHeading).toContainText(/Upload|Automation|Practice|Test/i);

    // 3. toHaveValue() - input field value
    const nameInput = page.locator('#name');
    await nameInput.fill('Vaishnavi');
    await expect(nameInput).toHaveValue('Vaishnavi');
  });
});
