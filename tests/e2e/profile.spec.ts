import { test, expect } from '@playwright/test';

const BASE = 'http://central.test';

test.describe('Profile Update', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE}/login`);
        await page.getByTestId('email-input').fill('admin@test.com');
        await page.getByTestId('password-input').fill('test123');
        await page.getByTestId('login-button').click();
        await expect(page).toHaveURL(/\/(?:dashboard)?\/?$/);
        await page.goto(`${BASE}/profile`);
        await expect(page.getByRole('button', { name: /save changes/i })).toBeVisible();
    });

    test('updates the user name and reverts', async ({ page }) => {
        await expect(page.getByTestId('name-input')).not.toHaveValue('');
        await page.getByTestId('name-input').fill('Updated Admin');
        await page.getByRole('button', { name: /save changes/i }).click();
        await expect(page.locator('[data-sonner-toast]').filter({ hasText: /profile updated successfully/i })).toBeVisible();

        await page.getByTestId('name-input').fill('Central Admin');
        await page.getByRole('button', { name: /save changes/i }).click();
        await expect(page.locator('[data-sonner-toast]').filter({ hasText: /profile updated successfully/i })).toBeVisible();
    });
});
