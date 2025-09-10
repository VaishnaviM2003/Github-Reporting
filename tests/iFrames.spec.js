import { test, expect } from '@playwright/test';

test('test123', async ({ page }) => {
  test.setTimeout(60000); // global timeout for slow browsers

  console.log('🌐 Navigating to page...');
  await page.goto('https://ui.vision/demo/webtest/frames/', { waitUntil: 'domcontentloaded' });

  // ---------------- Frame 1 ----------------
  console.log('📝 Filling Frame 1');
  const frame1 = page.frameLocator('frame').first();
  await frame1.getByRole('textbox').fill('hello world');

  // ---------------- Frame 2 ----------------
  console.log('📝 Filling Frame 2');
  const frame2 = page.frameLocator('frame').nth(1);
  await frame2.getByRole('textbox').fill('hello testing');

  // ---------------- Frame 3 ----------------
  console.log('📝 Filling Frame 3');
  const frame3 = page.frameLocator('frame').nth(2);
  await frame3.getByRole('textbox').fill('hello playwright');

  // ✅ Nested iframe inside Frame 3
  console.log('🔍 Waiting for nested iframe inside Frame 3...');
  const nested = frame3.frameLocator('iframe');
  await nested.locator('body').waitFor({ timeout: 30000 });

  // Interactions inside nested iframe
  console.log('✅ Selecting options inside nested iframe...');
  await nested.getByText('Form-filling and web testing').click();
  await nested.getByText('Hi, I am the UI.Vision IDE').click();

  console.log('⏳ Waiting for "Clear selection" button...');
  await expect(
    nested.getByRole('button', { name: 'Clear selection' })
  ).toBeVisible({ timeout: 20000 });

  console.log('👉 Clicking "Choose"...');
  await nested.getByText('Choose').click();

  console.log('⏳ Waiting for option "Yes"...');
  await expect(
    nested.getByRole('option', { name: 'Yes' })
  ).toBeVisible({ timeout: 20000 });

  console.log('✅ Selecting "Well, now I know :-)"');
  await nested.getByRole('option', { name: 'Well, now I know :-)' }).locator('span').click();

  console.log('👉 Clicking pagination (Page 1 of 2)...');
  await nested.locator('div', { hasText: /^Page 1 of 2$/ }).first().click();

  // ---------------- Frame 4 ----------------
  console.log('📝 Filling Frame 4');
  const frame4 = page.frameLocator('frame').nth(3);
  await frame4.getByRole('textbox').fill('hello india');

  console.log('🎉 Test completed successfully!');
});
