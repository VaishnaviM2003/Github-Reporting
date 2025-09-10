const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'on'
  }
});
