import { test, expect } from '@playwright/test';
test.setTimeout(120000);
test('Scroll to element in large DOM — with step-by-step assertions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/large');
  //  Table exists & visible
  const table = page.locator('table#large-table');
  await expect(table).toBeVisible();
  //  Table has many rows (sanity check)
  const rows = table.locator('tbody tr');
  const rowCount = await rows.count();
  //  Locate target element (last row) and assert it's not in viewport before scroll
  const lastRow = rows.last();
  const inViewportBefore = await lastRow.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top >= 0 && r.bottom <= vh;
  });
  expect(inViewportBefore).toBe(false);
  //  Scroll into view (action)
  await lastRow.scrollIntoViewIfNeeded();
  //  Assert the element is visible (Playwright visibility check)
  await expect(lastRow).toBeVisible();
  // Assert the element is inside the viewport (coordinate check)
  const inViewportAfter = await lastRow.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top >= 0 && r.bottom <= vh;
  });
  expect(inViewportAfter).toBe(true);
  //  Assert the element is not obscured (elementFromPoint test)
  const notObscured = await lastRow.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const topEl = document.elementFromPoint(cx, cy);
    // true if the element itself or one of its children is at the center point
    return topEl === el || el.contains(topEl);
  });
});
