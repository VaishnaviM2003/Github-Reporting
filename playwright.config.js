const { defineConfig } = require('@playwright/test');
 
module.exports = defineConfig({
  testDir: 'tests',
  workers: process.env.CI ? 4 : undefined,   // parallelism
  retries: process.env.CI ? 2 : 0,
 
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    // Uncomment if using Allure
    // ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
 
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  }
});