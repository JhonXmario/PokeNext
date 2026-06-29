import { test, expect } from '@playwright/test';

test.describe('Pokedex App Security', () => {

  test('Redirects to login when accessing protected /favorites route', async ({ page }) => {
    // Attempt to access protected route without being authenticated
    await page.goto('/favorites');

    // Clerk redirects to the sign-in page. The URL should contain 'sign-in' or 'clerk'
    await expect(page).toHaveURL(/.*sign-in|.*accounts\.clerk\.com/);
  });

  test('Redirects to login when accessing protected /teams route', async ({ page }) => {
    // Attempt to access protected route without being authenticated
    await page.goto('/teams');

    // Clerk redirects to the sign-in page
    await expect(page).toHaveURL(/.*sign-in|.*accounts\.clerk\.com/);
  });

});
