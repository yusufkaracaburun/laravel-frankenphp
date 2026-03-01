import { test, expect } from '@playwright/test';

const BASE = 'http://central.test';

test.describe('Register', () => {
    test('registers a new user successfully', async ({ page }) => {
        const email = `e2e+${Date.now()}@example.com`;
        await page.goto(`${BASE}/register`);
        await page.getByTestId('name-input').fill('E2E Test User');
        await page.getByTestId('email-input').fill(email);
        await page.getByTestId('password-input').fill('password123');
        await page.getByTestId('confirm-password-input').fill('password123');
        await page.getByTestId('register-button').click();
        await expect(page).toHaveURL(/dashboard/);
    });
});