import { test, expect } from '@playwright/test';

const BASE = 'http://central.test';

test.describe('Login', () => {
    test('logs in successfully with valid credentials', async ({ page }) => {
        await page.goto(`${BASE}/login`);
        await page.getByTestId('email-input').fill('admin@test.com');
        await page.getByTestId('password-input').fill('test123');
        await page.getByTestId('login-button').click();
        await expect(page).toHaveURL(/dashboard/);
        await expect(page.getByText(/welcome/i).first()).toBeVisible();
    });
});