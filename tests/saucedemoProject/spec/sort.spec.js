// sort.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test('Sort: Price (low to high) sorts product prices ascending', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Ensure inventory loaded
  await inventoryPage.expectInventoryLoaded();

  // Select "Price (low to high)" - saucedemo select value is "lohi"
  await inventoryPage.sortBy('lohi');

  // small pause to allow DOM update (explicit wait per lab instructions)
  await page.waitForTimeout(700);

  // Get prices as numbers
  const prices = await inventoryPage.getAllPrices(); // e.g. [7.99, 9.99, ...]
  // build a sorted copy
  const sorted = [...prices].sort((a, b) => a - b);

  // Assert the prices array is sorted ascending
  await expect(prices).toEqual(sorted);
});
