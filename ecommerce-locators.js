//EXAMPLE 1
/*const { chromium } = require('playwright');

async function ecommerceExample() {
  console.log('🚀 Starting e-commerce locators example...');
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();

  await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });
  console.log('1. Navigated to Amazon');

  // Handle cookie consent if present
  try {
    const cookieAccept = await page.$('input[name="accept"], input[data-cel-widget*="sp-cc-accept"]');
    if (cookieAccept) {
      await cookieAccept.click();
      console.log('2. Accepted cookies');
    }
  } catch {
    console.log('2. No cookie banner found');
  }

  // Search for products
  await page.waitForSelector('input[name="field-keywords"], #twotabsearchtextbox');
  await page.fill('input[name="field-keywords"], #twotabsearchtextbox', 'wireless headphones');

  const searchButton = await page.waitForSelector(
    '#nav-search-submit-button, input[type="submit"][value="Go"], input.nav-input[type="submit"]'
  );
  await searchButton.click();
  console.log('3. Searched for wireless headphones');

  // Wait for search results
  await page.waitForSelector('[data-component-type="s-search-result"]');
  const products = await page.$$('[data-component-type="s-search-result"]');
  console.log(`4. Found ${products.length} products`);

  // Extract product details from first few valid items
  let validProducts = [];
  for (const product of products) {
    const titleElement = await product.$('h2 a');
    if (titleElement) {
      const title = await titleElement.textContent();
      const priceElement = await product.$('.a-price-whole');
      const price = priceElement ? await priceElement.textContent() : 'No price';
      validProducts.push({ element: titleElement, title: title?.trim(), price });
    }
  }

  console.log(`   Found ${validProducts.length} products with valid titles`);
  validProducts.slice(0, 3).forEach((p, i) => {
    console.log(`   Product ${i + 1}: ${p.title} - $${p.price}`);
  });

  // Click first valid product
  if (validProducts.length > 0) {
    await validProducts[0].element.click();
    console.log('5. Clicked on first valid product');

    // Wait for product page
    await page.waitForSelector('#productTitle');
    const productTitle = await page.textContent('#productTitle');
    console.log('6. Product page loaded:', productTitle?.trim());
  }

  await page.waitForTimeout(5000);
  await browser.close();
  console.log('✅ E-commerce example completed');
}

ecommerceExample().catch(console.error);
*/

//EXAMPLE 2
const { chromium } = require('playwright');

async function ecommerceExampleBooks() {
  console.log('🚀 Starting e-commerce locators example on Books to Scrape...');
  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('http://books.toscrape.com/', { waitUntil: 'domcontentloaded' });
  console.log('1. Navigated to Books to Scrape');

  // Wait for product list
  await page.waitForSelector('.product_pod', { timeout: 10000 });
  const products = await page.$$('.product_pod');
  console.log(`2. Found ${products.length} products`);

  // Extract product details from first few items
  for (let i = 0; i < Math.min(3, products.length); i++) {
    const product = products[i];
    const title = await product.$eval('h3 a', el => el.title);
    const price = await product.$eval('.price_color', el => el.textContent);
    console.log(`   Product ${i + 1}: ${title} - ${price}`);
  }

  // Click first product and wait for navigation
  if (products.length > 0) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      products[0].$('h3 a').then(link => link.click())
    ]);
    console.log('3. Clicked on first product and navigated');

    // Wait for product page title
    await page.waitForSelector('.product_main h1', { timeout: 10000 });
    const productTitle = await page.textContent('.product_main h1');
    console.log('4. Product page loaded:', productTitle?.trim());
  }

  await page.waitForTimeout(3000);
  await browser.close();
  console.log('✅ E-commerce example completed');
}

ecommerceExampleBooks().catch(console.error);
