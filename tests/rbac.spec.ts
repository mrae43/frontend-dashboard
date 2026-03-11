import { test, expect } from "@playwright/test";

test.describe("RBAC Verification", () => {
  test("Admin should see all sidebar items and access all routes", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "admin@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "admin");
    await page.click("button[type='submit']");
    await page.waitForURL("/");

    // Sidebar items (using role 'link' to be specific and avoid heading conflict)
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
    await page.goto("/login");
    await page.fill("[name='email']", "manager@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "manager");
    await page.click("button[type='submit']");
    await page.waitForURL("/");

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
    await page.goto("/login");
    await page.fill("[name='email']", "staff@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "staff");
    await page.click("button[type='submit']");
    await page.waitForURL("/");

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
