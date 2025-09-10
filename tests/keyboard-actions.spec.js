import { test } from '@playwright/test';

test('handle keyboard actions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');

  // Simple key press
  await page.click('#target');
  await page.keyboard.press('A');

  // Modifier key combinations
  await page.keyboard.down('Shift');
  await page.keyboard.press('A'); // Produces 'A'
  await page.keyboard.up('Shift');

  // Type text with delay between keystrokes
  await page.keyboard.type('Hello World!', { delay: 100 });

  // Special keys and navigation
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Backspace');

  // Complex shortcut (Ctrl+A to select all)
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');

  // Using keyboard in different contexts
  await page.goto('https://example.com');

  // Example.com doesn’t have inputs, so let’s create one dynamically
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);
  });

  const input = page.locator('input[type="text"]');
  await input.click();

  // Keyboard actions on specific element
  await input.type('Text with special keys: ');
  await page.keyboard.press('Enter');
  await input.type('New line after enter');

  await page.waitForTimeout(2000);
});
