// form-handling.js
const { chromium } = require('playwright');

async function formHandlingExample() {
  console.log('🚀 Starting form handling example...');
  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  console.log('1. Navigated to SauceDemo login page');

  // Fill login form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  console.log('2. Filled login credentials');

  // Click login button
  await page.click('#login-button');
  console.log('3. Clicked login button');

  // Wait for products page
  await page.waitForSelector('.inventory_list');
  console.log('4. Successfully logged in');

  // Interact with products
  await page.click('#add-to-cart-sauce-labs-backpack');
  console.log('5. Added item to cart');

  await page.click('.shopping_cart_link');
  console.log('6. Opened cart');

  await page.waitForSelector('.cart_list');
  console.log('7. Cart page loaded');

  await page.waitForTimeout(3000);
  await browser.close();
  console.log('✅ Form handling example completed');
}

formHandlingExample().catch(console.error);
