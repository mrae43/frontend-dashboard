import { test, expect } from "@playwright/test";

test.describe("Login UI Mechanism", () => {
  test("should redirect unauthenticated users to login", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("/login");
    await expect(page).toHaveURL(/.*login/);
  });

  test("successful login should land on dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "admin@loyaltypulse.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "admin");
    await page.click("button[type='submit']");
    
    await page.waitForURL("/");
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Members' })).toBeVisible();
    await expect(page.locator("[data-testid='user-role']")).toHaveText("admin");
  });

  test("should show Zod validation errors for invalid input", async ({ page }) => {
    await page.goto("/login");
    
    // Invalid email
    await page.fill("[name='email']", "not-an-email");
    await page.fill("[name='password']", "short");
    await page.click("button[type='submit']");
    
    await expect(page.getByTestId("login-error")).toContainText("Invalid email address");
    
    // Fix email but keep short password
    await page.fill("[name='email']", "valid@email.com");
    await page.click("button[type='submit']");
    await expect(page.getByTestId("login-error")).toContainText("Password must be at least 6 characters");
  });

  test("staff user should not see manager-only links", async ({ page }) => {
    await page.goto("/login");
    await page.fill("[name='email']", "staff@loyaltypulse.com");
    await page.fill("[name='password']", "password123");
    await page.selectOption("#role", "staff");
    await page.click("button[type='submit']");
    
    await page.waitForURL("/");
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Members' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Rewards' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Points' })).not.toBeVisible();
  });

  test("should logout successfully", async ({ page }) => {
    // Fast login via UI
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
