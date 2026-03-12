import { test, expect } from '@playwright/test';

test('Progress bar reflects correct width based on points', async ({ page }) => {
  // 1. Mock a user who is 75% of the way to Gold
  // Thresholds: BRONZE (0), SILVER (500), GOLD (2000), PLATINUM (5000)
  // SILVER starts at 500. Next is GOLD at 2000. Band is 1500.
  // 75% of 1500 is 1125. 1125 + 500 = 1625 points.
  
  await page.addInitScript(() => {
    const mockUser = {
      id: 1,
      email: "admin@example.com",
      role: "admin",
      isLoggedIn: true,
      token: "mock-jwt-token"
    };
    window.localStorage.setItem('loyalty_pulse_user', JSON.stringify(mockUser));

    const mockMember = {
      id: "e1234567-e89b-12d3-a456-426614174001",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      spendablePoints: 1000,
      tierXP: 1625,
      tier: "SILVER",
      joinDate: "2023-11-20T09:15:00Z",
      lastVisit: "2024-03-12T11:45:00Z"
    };
    window.localStorage.setItem('current_member', JSON.stringify(mockMember));
  });

  // Navigate to the member detail page
  await page.goto('/members/e1234567-e89b-12d3-a456-426614174001');

  // 2. Get the progress bar inner div
  // The progress bar has role="progressbar" and the first child div is the fill
  const progressFill = page.locator('[role="progressbar"] > div').first();

  // 3. Verify the visual state
  // For Sarah Chen: TierXP is 1250. SILVER band is 500-2000. 
  // Progress = (1250 - 500) / (2000 - 500) = 750 / 1500 = 50%
  await expect(progressFill).toHaveAttribute('style', /width: 50%/);
  
  // 4. Verify the motivation text
  // Remaining: 2000 - 1250 = 750.
  // The text is "You're only 750 pts away from GOLD!"
  await expect(page.locator('[data-testid="status-card"]')).toContainText(/750 pts away from GOLD/);
});

