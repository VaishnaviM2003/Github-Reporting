//EXAMPLE 1
const { chromium } = require('playwright');
async function basicLocators() {
console.log('�� Starting basic locators example...');
const browser = await chromium.launch({ headless: false, slowMo: 100 });
const page = await browser.newPage();
await page.goto('https://github.com');
console.log('1. Navigated to GitHub');
// Different selector types
const cssSelector = await page.$('header');
console.log('2. Found header using CSS selector');
const textSelector = await page.$('text=Sign up');
console.log('3. Found "Sign up" using text selector');
const xpathSelector = await page.$('xpath=//a[contains(@href, "login")]');
console.log('4. Found login link using XPath');
// Multiple elements
const allLinks = await page.$$('a');
console.log(`5. Found ${allLinks.length} links on page`);
// Get element properties
const signupText = await textSelector.textContent();
console.log('6. Sign up button text:', signupText?.trim());
await page.waitForTimeout(2000);
await browser.close();
console.log('✅ Basic locators example completed');
}
basicLocators().catch(console.error);

//EXAMPLE 2
/*const { chromium } = require('playwright');

async function basicLocatorsPlaywright() {
  console.log('🚀 Starting basic locators example on Playwright.dev...');
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto('https://playwright.dev');
  console.log('1. Navigated to Playwright.dev');

  // Different selector types
  const cssSelector = await page.$('header');
  console.log('2. Found header using CSS selector');

  const textSelector = await page.$('text=Get started');
  console.log('3. Found "Get started" using text selector');

  const xpathSelector = await page.$('//a[contains(@href, "docs")]');
  console.log('4. Found docs link using XPath');

  // Multiple elements
  const allLinks = await page.$$('a');
  console.log(`5. Found ${allLinks.length} links on page`);

  // Get element properties
  const getStartedText = await textSelector.textContent();
  console.log('6. "Get started" button text:', getStartedText?.trim());

  await page.waitForTimeout(2000);
  await browser.close();
  console.log('✅ Basic locators example on Playwright.dev completed');
}

basicLocatorsPlaywright().catch(console.error);
*/
