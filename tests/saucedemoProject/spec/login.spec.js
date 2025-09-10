const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoginSuccess();
});
