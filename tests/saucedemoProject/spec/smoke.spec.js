// smoke.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Smoke: site loads, title and login form are visible', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to site
  await loginPage.goto();

  // Verify page title
  await expect(page).toHaveTitle('Swag Labs');

  // Verify login form elements are visible
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
