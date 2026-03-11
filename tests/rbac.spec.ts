import { test, expect } from "@playwright/test";

const STORAGE_KEY = 'food_dashboard_user';

const mockUser = (role: 'admin' | 'manager' | 'staff') => ({
  id: 1,
  email: `${role}@fooddash.com`,
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
    await expect(page.getByRole('link', { name: 'Customers' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();

    // Direct access
    await page.goto("/analytics");
    await expect(page.locator("text=Analytics Page Under Construction")).toBeVisible();
    
    await page.goto("/customers");
    await expect(page.locator("text=Customers Page Under Construction")).toBeVisible();
    
    await page.goto("/settings");
    await expect(page.locator("text=Settings Page Under Construction")).toBeVisible();
  });

  test("Manager should NOT see Customers and be redirected if accessing manually", async ({ page }) => {
    // Inject manager state
    await page.addInitScript((value) => {
      window.localStorage.setItem(value.key, JSON.stringify(value.user));
    }, { key: STORAGE_KEY, user: mockUser('manager') });

    await page.goto("/");

    // Sidebar items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Customers' })).not.toBeVisible();

    // Direct access to unauthorized
    await page.goto("/customers");
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
    await expect(page.getByRole('link', { name: 'Customers' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Settings' })).not.toBeVisible();

    // Direct access to unauthorized
    const unauthorizedPaths = ["/analytics", "/customers", "/settings"];
    for (const path of unauthorizedPaths) {
      await page.goto(path);
      await page.waitForURL("/unauthorized");
      await expect(page.locator("text=Access Denied")).toBeVisible();
    }
  });
});
