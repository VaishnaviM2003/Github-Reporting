const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginpage');
test.describe('OrangeHRM Login Scenarios', () => {
 test('should successfully log in with valid credentials', async ({ page
}) => {
 const loginPage = new LoginPage(page);
 await loginPage.goto();
 await loginPage.login('Admin', 'admin123');
 await loginPage.expectLoginSuccess();
 });
});