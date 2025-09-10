import { test, expect } from '@playwright/test';

test.describe('Visibility Assertions Demo', () => {
  test('Check element visibility on TestAutomationPractice', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', {
      waitUntil: 'commit',   // fix for Firefox
      timeout: 60000,
    });

    // 1. toBeVisible() - Blog title should be visible
    const headerTitle = page.locator('h1.title');
    await expect(headerTitle).toBeVisible();

    // 2. toBeHidden() - hidden text element (id='text3' is hidden by CSS)
    const hiddenText = page.locator('#text3');
    await expect(hiddenText).toBeHidden();

    // 3. toBeInViewport() - scroll to Wikipedia search box and check it is in viewport
    const wikipediaSearch = page.locator('#Wikipedia1_wikipedia-search-input');
    await wikipediaSearch.scrollIntoViewIfNeeded();
    await expect(wikipediaSearch).toBeInViewport();
  });
});
