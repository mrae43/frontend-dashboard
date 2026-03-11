import { test, expect } from "@playwright/test";

const STORAGE_KEY = 'loyalty_pulse_user';

const mockUser = (role: 'admin' | 'manager' | 'staff') => ({
  id: 1,
  email: `${role}@loyaltypulse.com`,
  token: `mock-jwt-test`,
  isLoggedIn: true,
  role: role,
});

test.describe("RBAC Verification (Bypassing Login)", () => {
  
  test("Admin should see all sidebar items and access all routes", async ({ page }) => {
    // Inject admin state
    await page.addInitScript((value) => {
      window.localStorage.setItem(value.key, JSON.stringify(value.user));
    }, { key: STORAGE_KEY, user: mockUser('admin') });

    await page.goto("/");

    // Sidebar items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Members' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Rewards' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Points' })).toBeVisible();

    // Direct access
    await page.goto("/analytics");
    await expect(page.locator("text=Member Analytics Under Construction")).toBeVisible();
    
    await page.goto("/members");
    await expect(page.locator("text=Member Management Under Construction")).toBeVisible();
    
    await page.goto("/rewards");
    await expect(page.locator("text=Rewards Management Under Construction")).toBeVisible();

    await page.goto("/points");
    await expect(page.locator("text=Points Adjustment Under Construction")).toBeVisible();
  });

  test("Manager should NOT see Members/Rewards and be redirected", async ({ page }) => {
    // Inject manager state
    await page.addInitScript((value) => {
      window.localStorage.setItem(value.key, JSON.stringify(value.user));
    }, { key: STORAGE_KEY, user: mockUser('manager') });

    await page.goto("/");

    // Sidebar items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Points' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Members' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Rewards' })).not.toBeVisible();

    // Direct access to unauthorized
    await page.goto("/members");
    await page.waitForURL("/unauthorized");
    await expect(page.locator("text=Access Denied")).toBeVisible();
  });

  test("Staff should ONLY see Dashboard and be redirected from others", async ({ page }) => {
    // Inject staff state
    await page.addInitScript((value) => {
      window.localStorage.setItem(value.key, JSON.stringify(value.user));
    }, { key: STORAGE_KEY, user: mockUser('staff') });

    await page.goto("/");

    // Sidebar items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Analytics' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Members' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Rewards' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Points' })).not.toBeVisible();

    // Direct access to unauthorized
    const unauthorizedPaths = ["/analytics", "/members", "/rewards", "/points"];
    for (const path of unauthorizedPaths) {
      await page.goto(path);
      await page.waitForURL("/unauthorized");
      await expect(page.locator("text=Access Denied")).toBeVisible();
    }
  });
});
