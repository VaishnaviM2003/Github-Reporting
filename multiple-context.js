// multiple-contexts.js
const { chromium } = require('playwright');
async function multipleContextsExample() {
console.log('�� Creating multiple browser contexts...');
const browser = await chromium.launch({ headless: false });
// First context - GitHub
const context1 = await browser.newContext();
const page1 = await context1.newPage();
await page1.goto('https://github.com');
console.log('Context 1: GitHub loaded');
// Second context - Twitter (isolated session)
const context2 = await browser.newContext();
const page2 = await context2.newPage();
await page2.goto('https://twitter.com');
console.log('Context 2: Twitter loaded');
// Demonstrate isolation
const githubTitle = await page1.title();
const twitterTitle = await page2.title();
console.log('�� Context 1 Title:', githubTitle);
console.log('�� Context 2 Title:', twitterTitle);
await page1.waitForTimeout(2000);
await page2.waitForTimeout(2000);
await browser.close();
console.log('✅ All contexts closed');
}
multipleContextsExample().catch(console.error);
