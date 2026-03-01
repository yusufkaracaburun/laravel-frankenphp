import { test, expect } from '@playwright/test';

const BASE = 'http://central.test';

test.describe('Profile Update', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE}/login`);
        await page.getByLabel(/email/i).first().fill('admin@test.com');
        await page.getByLabel(/password/i).fill('test123');
        await page.getByTestId('login-button').click();
        await expect(page).toHaveURL(/dashboard/);
        await page.goto(`${BASE}/profile`);
        await expect(page.getByRole('button', { name: /save changes/i })).toBeVisible();
    });

    test('updates the user name and reverts', async ({ page }) => {
        await page.getByLabel(/^name/i).fill('Updated Admin');
        await page.getByRole('button', { name: /save changes/i }).click();
        await expect(page.getByText(/profile updated successfully/i)).toBeVisible();

        await page.getByLabel(/^name/i).fill('Central Admin');
        await page.getByRole('button', { name: /save changes/i }).click();
        await expect(page.getByText(/profile updated successfully/i)).toBeVisible();
    });
});
