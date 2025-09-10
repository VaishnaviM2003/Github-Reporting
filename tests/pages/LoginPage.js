const { expect } = require('@playwright/test');
exports.LoginPage = class LoginPage {
 /**
 * @param {import('@playwright/test').Page} page
 */
 constructor(page) {
 this.page = page;
 // Locators for the login page elements
 this.usernameInput = page.getByPlaceholder('Username');
 this.passwordInput = page.getByPlaceholder('Password');
 this.loginButton = page.getByRole('button', { name: 'Login' });
 this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard'
});
 }
 // Method to navigate to the login page
 async goto() {
 await
this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 }
 // Method to perform the login action
 async login(username, password) {
 await this.usernameInput.fill(username);
 await this.passwordInput.fill(password);
 await this.loginButton.click();
 }
 // Assertion method to verify a successful login
 async expectLoginSuccess() {
 // Wait for navigation and verify the dashboard header is visible
 await expect(this.dashboardHeader).toBeVisible();
 }
};
