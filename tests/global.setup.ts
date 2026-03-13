import { test as setup } from '@playwright/test';
import { expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');  // Manager role
const adminFile = path.join(__dirname, '.auth/admin.json');

setup('setup manager auth', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login');

  // Fill form with manager creds
  await page.fill('[name="email"]', 'manager@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for localStorage set + redirect
  await page.waitForURL('/dashboard');
  await expect(page.locator('[data-testid="user-role"]')).toContainText('manager');

  // Save full storageState (localStorage + cookies)
  await page.context().storageState({ path: authFile });
});

setup('setup admin auth', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'admin@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  await expect(page.locator('[data-testid="user-role"]')).toContainText('admin');
  await page.context().storageState({ path: adminFile });
});
