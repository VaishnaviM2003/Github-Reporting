const { expect } = require('@playwright/test');

class AuthPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.logo = '.orangehrm-login-branding > img';
    this.forgotPasswordLink = '.orangehrm-login-forgot';
  }

  async navigate() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
    await this.page.waitForLoadState('networkidle');
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    // Fix for Firefox: wait until stable and force click
    await this.page.waitForSelector(this.loginButton, { state: 'visible' });
    await this.page.locator(this.loginButton).click({ force: true });
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    return await this.page.textContent('.oxd-alert-content-text');
  }

  async isLogoVisible() {
    return await this.page.isVisible(this.logo);
  }

  async isLoginButtonVisible() {
    return await this.page.isVisible(this.loginButton);
  }

  async getPageTitle() {
    return await this.page.textContent('.orangehrm-login-title');
  }

  async getUsernamePlaceholder() {
    return await this.page.getAttribute(this.usernameInput, 'placeholder');
  }

  async getPasswordPlaceholder() {
    return await this.page.getAttribute(this.passwordInput, 'placeholder');
  }

  async clickForgotPassword() {
    // Fix for Firefox: wait until stable and force click
    await this.page.waitForSelector(this.forgotPasswordLink, { state: 'visible' });
    await this.page.locator(this.forgotPasswordLink).click({ force: true });
  }

  async clearUsername() {
    await this.page.fill(this.usernameInput, '');
  }

  async clearPassword() {
    await this.page.fill(this.passwordInput, '');
  }
}

module.exports = AuthPage;
