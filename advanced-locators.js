//EXAMPLE 1
const { chromium } = require('playwright');

async function advancedLocators() {
  console.log('🚀 Starting advanced locators example...');
  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const page = await browser.newPage();

  await page.goto('https://github.com/search');
  console.log('1. Navigated to GitHub Search');

  // Type search query into the global search box
  const searchInput = await page.$('input[aria-label="Search GitHub"]');
  await searchInput.type('playwright');
  await page.keyboard.press('Enter');
  console.log('2. Typed search query and pressed Enter');

  // Wait for results container
  await page.waitForSelector('div[data-testid="results-list"]');
  console.log('3. Search results are visible');

  // Repos with descriptions (new selector)
  const repoItems = await page.$$('div[data-testid="results-list"] article');
  console.log(`4. Found ${repoItems.length} repos with results`);

  // Filter by text content
  const javascriptRepos = await page.$$('a:has-text("JavaScript")');
  console.log(`5. Found ${javascriptRepos.length} JavaScript-related repos`);

  // Get attribute values
  if (repoItems.length > 0) {
    const firstRepo = repoItems[0];
    const repoUrl = await firstRepo.$eval('a', el => el.href);
    console.log('6. First repo URL:', repoUrl);
  }

  await page.waitForTimeout(3000);
  await browser.close();
  console.log('✅ Advanced locators example completed');
}

advancedLocators().catch(console.error);

//EXAMPLE 2
/*
const { chromium } = require('playwright');

async function advancedLocatorsGitLab() {
  console.log('🚀 Starting advanced locators example on GitLab Explore...');
  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const page = await browser.newPage();

  await page.goto('https://gitlab.com/explore/projects');
  console.log('1. Navigated to GitLab Explore Projects');

  try {
    await page.waitForSelector('ul.projects-list', { timeout: 15000 });
    console.log('2. Projects list is visible');

    const repoItems = await page.$$('ul.projects-list li.project-row');
    console.log(`3. Found ${repoItems.length} repos on page`);

    if (repoItems.length > 0) {
      const firstRepo = repoItems[0];
      const repoUrl = await firstRepo.$eval('a.project', el => el.href);
      const repoName = await firstRepo.$eval('a.project', el => el.textContent.trim());
      console.log('4. First repo:', repoName, repoUrl);
    }
  } catch (err) {
    console.log('⚠️ Failed to get projects:', err.message);
  }

  await page.waitForTimeout(3000);
  await browser.close();
  console.log('✅ Advanced locators example on GitLab completed');
}

advancedLocatorsGitLab().catch(console.error);
*/