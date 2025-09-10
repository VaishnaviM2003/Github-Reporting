// browser-config.js
const { chromium } = require('playwright');
async function advancedBrowserConfig() {
console.log('�� Launching browser with advanced configuration...');
const browser = await chromium.launch({
headless: false,
slowMo: 100, // Slow down operations for visibility
devtools: true, // Open developer tools
args: [
'--start-maximized',
'--disable-notifications'
]
});
const context = await browser.newContext({
viewport: { width: 1600, height: 900 },
userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
locale: 'en-US'
});
const page = await context.newPage();
await page.goto('https://example.com');
console.log('�� Page title:', await page.title());
// Wait before closing
await page.waitForTimeout(3000);
await browser.close();
console.log('✅ Browser closed successfully');
}
advancedBrowserConfig().catch(console.error);
