import { test, expect } from '@playwright/test';

test('mouse actions demo', async ({ page }) => {
  test.setTimeout(90000); // Increase timeout for slow pages

  // ---------------- Hover ----------------
  console.log('🌐 Navigating to hover demo...');
  await page.goto('https://the-internet.herokuapp.com/hovers', { waitUntil: 'domcontentloaded' });

  const avatar = page.locator('.figure').first();
  await avatar.hover();

  const caption = page.locator('.figcaption').first();
  console.log('Caption visible after hover:', await caption.isVisible());

  // ---------------- Right click ----------------
  console.log('🌐 Navigating to example.com for right click...');
  await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
  await page.click('body', { button: 'right' });

  // ---------------- Double click ----------------
  console.log('🌐 Navigating to stable double-click demo...');
  await page.goto('https://demoqa.com/buttons', { waitUntil: 'domcontentloaded', timeout: 60000 });

  const doubleClickBtn = page.locator('#doubleClickBtn');
  await doubleClickBtn.waitFor({ state: 'visible', timeout: 20000 });
  console.log('Performing double click...');
  await doubleClickBtn.dblclick();

  // ---------------- Drag and drop ----------------
  console.log('🌐 Navigating to drag-and-drop demo...');
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop', { waitUntil: 'domcontentloaded' });

  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  await columnA.dragTo(columnB);

  // ---------------- Mouse movements ----------------
  console.log('🖱 Performing mouse movements...');
  await page.mouse.move(100, 100);
  await page.mouse.down();
  await page.mouse.move(200, 100);
  await page.mouse.move(200, 200);
  await page.mouse.move(100, 200);
  await page.mouse.move(100, 100);
  await page.mouse.up();

  // ---------------- Mouse wheel scrolling ----------------
  console.log('🖱 Scrolling down 500 pixels...');
  await page.mouse.wheel(0, 500);

  await page.waitForTimeout(2000); // Pause to observe

  console.log('🎉 Mouse actions test completed successfully!');
});
