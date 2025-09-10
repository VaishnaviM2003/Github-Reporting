// test/spec/products.test.js
const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');

test.describe('Automation Exercise - Products Page Tests', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
  });

  test('Search for a product', async () => {
    await productsPage.searchProduct('dress');
    const count = await productsPage.getProductCount();
    console.log(`Found ${count} products`);
    expect(count).toBeGreaterThan(0);
  });

  test('Add first product to cart and go to cart', async () => {
    await productsPage.addFirstProductToCart();
    // Modal might appear → close it if necessary
    await productsPage.goToCart();
    await expect(productsPage.page).toHaveURL(/view_cart/);
  });
});
