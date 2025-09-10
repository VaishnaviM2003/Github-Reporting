// basic-navigation.js
const { chromium } = require('playwright');

async function basicNavigation() {
  console.log('🚀 Starting basic navigation example...');
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  // Navigation sequence
  await page.goto('https://example.com');
  console.log('1. Navigated to example.com');

  await page.goto('https://github.com');
  console.log('2. Navigated to github.com');

  await page.goBack();
  console.log('3. Went back to example.com');

  await page.goForward();
  console.log('4. Went forward to github.com');

  await page.reload();
  console.log('5. Reloaded github.com');

  // Basic interaction: click a stable link
  await page.click('a[href="/solutions"]');
  console.log('6. Clicked on Solutions link');

  await page.waitForTimeout(2000);
  await browser.close();
  console.log('✅ Navigation example completed');
}

basicNavigation().catch(console.error);
