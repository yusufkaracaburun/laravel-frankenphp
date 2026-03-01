import { test, expect } from '@playwright/test';

const BASE = 'http://central.test';

test.describe('Register', () => {
    test('registers a new user successfully', async ({ page }) => {
        const email = `e2e+${Date.now()}@example.com`;
        await page.goto(`${BASE}/register`);
        await page.getByLabel(/^name/i).fill('E2E Test User');
        await page.getByLabel(/^email/i).fill(email);
        await page.getByLabel(/^password$/i).fill('password123');
        await page.getByLabel(/confirm password/i).fill('password123');
        await page.getByTestId('register-button').click();
        await expect(page).toHaveURL(/dashboard/);
    });
});