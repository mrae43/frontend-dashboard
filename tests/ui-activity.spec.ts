import { test, expect } from '@playwright/test';

test.describe('ActivityFeed Component', () => {
  test.beforeEach(async ({ page }) => {
    // Mock user and member data in localStorage
    await page.addInitScript(() => {
      const mockUser = {
        id: 1,
        email: 'admin@example.com',
        role: 'admin',
        isLoggedIn: true,
        token: 'mock-jwt-token',
      };
      window.localStorage.setItem('loyalty_pulse_user', JSON.stringify(mockUser));
    });
  });

  test('should render activity history with transactions for Sarah Chen', async ({ page }) => {
    const sarahId = 'e1234567-e89b-12d3-a456-426614174001';

    // Inject mock member into localStorage
    await page.addInitScript((id) => {
      const mockMember = {
        id,
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        spendablePoints: 750,
        tierXP: 1250,
        tier: 'SILVER',
        joinDate: '2023-11-20T09:15:00Z',
        lastVisit: '2024-03-12T11:45:00Z',
      };
      window.localStorage.setItem('current_member', JSON.stringify(mockMember));
    }, sarahId);

    await page.goto(`/members/${sarahId}`);

    // Verify Tile structure
    const feedTile = page.locator('[data-testid="activity-feed-tile"]');
    await expect(feedTile).toBeVisible();
    await expect(feedTile.locator('h3')).toHaveText('Activity History');

    // Verify transaction count badge (Sarah has 7 transactions in MOCK_TRANSACTIONS)
    await expect(feedTile.locator('.bg-slate-100')).toContainText('7 total');

    // Verify Table Headers
    const headers = feedTile.locator('thead th');
    await expect(headers.nth(0)).toHaveText('Transaction Details');
    await expect(headers.nth(1)).toHaveText('Type');
    await expect(headers.nth(2)).toHaveText('Points');

    // Verify first transaction (Ordered: Double Truffle Burger Combo)
    const firstRow = feedTile.locator('tbody tr').first();
    await expect(firstRow.locator('td').nth(0)).toContainText('Ordered: Double Truffle Burger Combo');
    await expect(firstRow.locator('td').nth(1)).toContainText('Points Earned');
    await expect(firstRow.locator('td').nth(2)).toContainText('+250');

    // Verify a redemption transaction (Redeemed: $5 Reward Voucher)
    const redemptionRow = feedTile.locator('tbody tr').filter({ hasText: 'Redeemed: $5 Reward Voucher' });
    await expect(redemptionRow).toBeVisible();
    await expect(redemptionRow.locator('td').nth(1)).toContainText('Reward Redeemed');
    await expect(redemptionRow.locator('td').nth(2)).toContainText('-500');
  });

  test('should show empty state for member with no transactions', async ({ page }) => {
    // Use Maya Johnson's ID from your MOCK_MEMBERS file
    const emptyMemberId = 'e1234567-e89b-12d3-a456-426614174003';

    await page.goto(`/members/${emptyMemberId}`);

    const feedTile = page.getByTestId('activity-feed-tile');

    // 1. Verify the ActivityFeed actually rendered
    await expect(feedTile).toBeVisible();

    // 2. Verify the count is 0
    await expect(feedTile.getByText('0 total')).toBeVisible();

    // 3. Verify empty state message
    const emptyState = page.getByTestId('activity-feed-empty');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('No transactions found');
  });

  test('should have a Load More History button', async ({ page }) => {
    const sarahId = 'e1234567-e89b-12d3-a456-426614174001';
    await page.goto(`/members/${sarahId}`);

    const loadMoreBtn = page.getByRole('button', { name: 'Load More History' });
    await expect(loadMoreBtn).toBeVisible();
    await expect(loadMoreBtn).toBeEnabled();
  });
});
