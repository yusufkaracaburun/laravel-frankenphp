import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'list',
    timeout: 15000,
    expect: {
        timeout: 5000,
    },
    use: {
        baseURL: 'http://central.test',
        trace: 'on-first-retry',
        headless: false,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
