const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('should complete checkout flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  await cartPage.goto();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();
  await checkoutPage.expectOrderSuccess();
});
