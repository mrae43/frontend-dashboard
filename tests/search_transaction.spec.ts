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
});

test.describe('ActivityFeed Search & Filtering', () => {
  const sarahChenId = 'e1234567-e89b-12d3-a456-426614174001';

  test.beforeEach(async ({ page }) => {
    // 1. Setup Auth Mock
    await page.addInitScript(() => {
      const mockUser = { id: 1, email: 'admin@example.com', role: 'admin', isLoggedIn: true };
      window.localStorage.setItem('loyalty_pulse_user', JSON.stringify(mockUser));
    });

    // 2. Navigate to Sarah Chen's profile
    await page.goto(`/members/${sarahChenId}`);

    // 3. Wait for the feed to be visible
    await expect(page.getByTestId('activity-feed-tile')).toBeVisible();
  });

  test('should filter transactions by description', async ({ page }) => {
    const searchInput = page.getByTestId('transaction-search-input');
    const tableRows = page.locator('tbody tr');

    // Initial state check (Sarah has 7 transactions)
    await expect(tableRows).toHaveCount(7);

    // Act: Search for "Burger"
    await searchInput.fill('Burger');

    // Assert: Only 1 row should remain (Double Truffle Burger Combo)
    await expect(tableRows).toHaveCount(1);
    await expect(page.getByText('Double Truffle Burger Combo')).toBeVisible();

    // Assert: A transaction that doesn't match should NOT be visible
    await expect(page.getByText('Classic Cheese Pizza')).not.toBeVisible();
  });

  test('should clear results when clicking the reset button', async ({ page }) => {
    const searchInput = page.getByTestId('transaction-search-input');

    await searchInput.fill('Pizza');
    await expect(page.locator('tbody tr')).toHaveCount(1);

    // Act: Click the 'X' button (assuming you added the Lucide X icon)
    const clearButton = page.getByTestId('transaction-search-clear');
    await clearButton.click();

    // Assert: Input is empty and all 7 rows are back
    await expect(searchInput).toHaveValue('');
    await expect(page.locator('tbody tr')).toHaveCount(7);
  });

  test('should show custom empty state for unmatched searches', async ({ page }) => {
    const searchInput = page.getByTestId('transaction-search-input');
    const badge = page.getByTestId('transaction-count-badge');

    // Act
    await searchInput.fill('NonExistentFoodItem123');

    // Assert: Empty state is visible
    const emptyState = page.getByTestId('activity-feed-empty');
    await expect(emptyState).toBeVisible();

    // Assert: Badge now correctly shows 0 items found
    // We use a regex /0 (found|total)/ to be extra safe
    await expect(badge).toHaveText(/0 (found|total)/i);
  });
});


