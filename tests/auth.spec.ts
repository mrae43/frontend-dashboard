import { test, expect } from "@playwright/test";

const adminFile = `./.auth/admin.json`;
const managerFile = `./.auth/manager.json`;
const staffFile = `./.auth/staff.json`;

test.describe("Authentication Flow", () => {
  test("should redirect unauthenticated users to login", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("/login");
    await expect(page).toHaveURL(/.*login/);
  });

  test("login as admin", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "admin@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "admin");
    await page.click("button[type='submit']");
    
    await page.waitForURL("/");
    await expect(page.locator("[data-testid='user-role']")).toHaveText("admin");
    await page.context().storageState({ path: adminFile });
  });

  test("login as manager", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "manager@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "manager");
    await page.click("button[type='submit']");
    
    await page.waitForURL("/");
    await expect(page.locator("[data-testid='user-role']")).toHaveText("manager");
    await page.context().storageState({ path: managerFile });
  });

  test("login as staff", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "staff@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "staff");
    await page.click("button[type='submit']");
    
    await page.waitForURL("/");
    await expect(page.locator("[data-testid='user-role']")).toHaveText("staff");
    await page.context().storageState({ path: staffFile });
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "invalid-email");
    await page.fill("[name='password']", "123");
    await page.click("button[type='submit']");
    
    // Zod validation error for email and password length
    // The current implementation might show the first Zod error
    await expect(page.locator("text=Invalid email address")).toBeVisible();
  });

  test("should logout successfully", async ({ page }) => {
    // Perform login first
    await page.goto("/login");
    await page.fill("[name='email']", "admin@fooddash.com");
    await page.fill("[name='password']", "password123");
    await page.click("button[type='submit']");
    await page.waitForURL("/");

    // Open user menu
    await page.click("[data-testid='user-avatar-trigger']");
    
    // Click logout
    await page.click("text=Sign Out");
    
    // Should redirect to login
    await page.waitForURL("/login");
    await expect(page).toHaveURL(/.*login/);
  });
});
