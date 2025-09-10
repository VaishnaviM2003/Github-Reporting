const { test, expect } = require('@playwright/test');

test.setTimeout(60000);

test('Complex form with multiple field types', async ({ page }) => {
  await page.goto('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

  // Fill username & password
  await page.locator('input[name="username"]').fill('playwright_user');
  await page.locator('input[name="password"]').fill('secret123');

  // Fill comments textarea
  await page.locator('textarea[name="comments"]').fill('This is a Playwright test comment.');

  // Check multiple checkboxes
  await page.locator('input[value="cb1"]').check();
  await page.locator('input[value="cb3"]').check();

  // Verify a checkbox is checked
  await expect(page.locator('input[value="cb1"]')).toBeChecked();

  // Select a radio button
  await page.locator('input[value="rd2"]').check();
  await expect(page.locator('input[value="rd2"]')).toBeChecked();

  // Single select dropdown
  await page.locator('select[name="dropdown"]').selectOption('dd2');
  await expect(page.locator('select[name="dropdown"]')).toHaveValue('dd2');

  // Multi-select dropdown
  const multi = page.locator('select[name="multipleselect[]"]');
  await multi.selectOption(['ms1', 'ms3']);
  const selected = await multi.evaluate(el =>
    Array.from(el.selectedOptions).map(opt => opt.value)
  );
  expect(selected).toEqual(['ms1', 'ms3']);

  // Submit the form
  await page.locator('input[type="submit"]').click();

  // ✅ Corrected expected text
  await expect(page.locator('h1')).toHaveText('Processed Form Details');
});
