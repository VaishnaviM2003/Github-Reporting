const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  workers: process.env.CI ? 2 : undefined, // reduce workers in CI to avoid resource issues
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure', // safer for CI
  },
  testDir: 'tests', // make sure this points to your test folder
});
