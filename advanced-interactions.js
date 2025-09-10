// advanced-interactions.js
const { chromium } = require('playwright');
async function advancedInteractions() {
console.log('�� Starting advanced interactions example...');
const browser = await chromium.launch({ headless: false, slowMo: 200 });
const page = await browser.newPage();
await page.goto('https://the-internet.herokuapp.com/hovers');
console.log('1. Navigated to hovers page');
// Hover over element
const avatar = await page.$('.figure');
await avatar.hover();
console.log('2. Hovered over avatar');
// Wait for caption to appear
await page.waitForSelector('.figcaption:visible');
console.log('3. Caption appeared on hover');
// Right click context
await page.goto('https://the-internet.herokuapp.com/context_menu');
const hotSpot = await page.$('#hot-spot');
await hotSpot.click({ button: 'right' });
console.log('4. Right-clicked on context menu area');
// Handle alert
page.on('dialog', async dialog => {
console.log(`5. Alert message: ${dialog.message()}`);
await dialog.accept();
});
await page.waitForTimeout(3000);
await browser.close();
console.log('✅ Advanced interactions completed');
}
advancedInteractions().catch(console.error);
