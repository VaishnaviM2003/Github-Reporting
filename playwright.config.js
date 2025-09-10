// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  retries: 1,
  workers: 3,

  reporter: [
    ['list'],
    ['line'],
    ['html', { open: 'always' }],
    ['json', { outputFile: 'report.json' }],
    ['allure-playwright'],
  ],

  projects: [
    // ---------- Old Project ----------
    {
      name: 'oldProject-chromium',
      testDir: './tests/oldProject/spec',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://your-old-app-url.com' },
    },
    {
      name: 'oldProject-firefox',
      testDir: './tests/oldProject/spec',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://your-old-app-url.com' },
    },
    {
      name: 'oldProject-webkit',
      testDir: './tests/oldProject/spec',
      use: { ...devices['Desktop Safari'], baseURL: 'https://your-old-app-url.com' },
    },

    // ---------- Saucedemo Project ----------
    {
      name: 'saucedemoProject-chromium',
      testDir: './tests/saucedemoProject/spec',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com/' },
    },
    {
      name: 'saucedemoProject-firefox',
      testDir: './tests/saucedemoProject/spec',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://www.saucedemo.com/' },
    },
    {
      name: 'saucedemoProject-webkit',
      testDir: './tests/saucedemoProject/spec',
      use: { ...devices['Desktop Safari'], baseURL: 'https://www.saucedemo.com/' },
    },
  ],

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});
