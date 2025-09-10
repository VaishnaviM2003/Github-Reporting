// test/spec/auth.test.js
const { test, expect } = require('@playwright/test');
const AuthPage = require('../pages/AuthPage');

// Test data
const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';
const INVALID_USERNAME = 'invaliduser';
const INVALID_PASSWORD = 'wrongpassword';
const EMPTY_STRING = '';

test.describe('OrangeHRM Auth Tests', () => {
  let authPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.navigate();
  });

  test('Successful login with valid credentials', async () => {
    await authPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(authPage.page).toHaveURL(/dashboard/);
    await expect(authPage.page).toHaveTitle('OrangeHRM');
  });

  test('Failed login with invalid username', async () => {
    await authPage.login(INVALID_USERNAME, VALID_PASSWORD);
    const errorMessage = await authPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('Failed login with invalid password', async () => {
    await authPage.login(VALID_USERNAME, INVALID_PASSWORD);
    const errorMessage = await authPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('Failed login with empty username', async () => {
    await authPage.login(EMPTY_STRING, VALID_PASSWORD);
    await expect(authPage.page.locator('input[name="username"] + span'))
      .toContainText('Required');
  });

  test('Failed login with empty password', async () => {
    await authPage.login(VALID_USERNAME, EMPTY_STRING);
    await expect(authPage.page.locator('input[name="password"] + span'))
      .toContainText('Required');
  });

  test('Login page elements visibility', async () => {
    const isLogoVisible = await authPage.isLogoVisible();
    const isLoginButtonVisible = await authPage.isLoginButtonVisible();
    const pageTitle = await authPage.getPageTitle();
    expect(isLogoVisible).toBe(true);
    expect(isLoginButtonVisible).toBe(true);
    expect(pageTitle).toContain('Login');
  });

  test('Input field placeholders', async () => {
    const usernamePlaceholder = await authPage.getUsernamePlaceholder();
    const passwordPlaceholder = await authPage.getPasswordPlaceholder();
    expect(usernamePlaceholder).toBe('Username');
    expect(passwordPlaceholder).toBe('Password');
  });

  test('Forgot password link functionality', async () => {
    await authPage.clickForgotPassword();
    await expect(authPage.page).toHaveURL(/requestPasswordReset/);
    await expect(authPage.page.locator('.orangehrm-forgot-password-title'))
      .toContainText('Reset Password');
  });

  test('Clear input fields', async () => {
    await authPage.enterUsername('testuser');
    await authPage.enterPassword('testpass');
    await authPage.clearUsername();
    await authPage.clearPassword();

    const usernameValue = await authPage.page.getAttribute(authPage.usernameInput, 'value');
    const passwordValue = await authPage.page.getAttribute(authPage.passwordInput, 'value');

    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });
});
