import { calculateEarnedPoints, canMemberRedeemPoints, formatPoints, getNextTier, calculateProgressToNextTier } from '../src/utils/loyalty';
import { type LoyaltyTier, type Reward, type LoyaltyMember } from '../src/models/loyalty';

console.log('--- Loyalty Logic Verification ---');

// 1. Point Calculation
console.log('\n1. Point Calculation:');
console.log('BRONZE (1x) for 100:', calculateEarnedPoints(100, 'BRONZE'));
console.log('SILVER (1.2x) for 100:', calculateEarnedPoints(100, 'SILVER'));
console.log('GOLD (1.5x) for 100:', calculateEarnedPoints(100, 'GOLD'));
console.log('PLATINUM (2x) for 100:', calculateEarnedPoints(100, 'PLATINUM'));

// 2. Redemption Logic
console.log('\n2. Redemption Logic:');
const member: Partial<LoyaltyMember> = { points: 1000 };
const cheapReward: Partial<Reward> = { costInPoints: 500, stock: 10 };
const expensiveReward: Partial<Reward> = { costInPoints: 1500, stock: 10 };
const outOfStockReward: Partial<Reward> = { costInPoints: 500, stock: 0 };

console.log('Can redeem cheap reward (1000 >= 500):', canMemberRedeemPoints(member as LoyaltyMember, cheapReward as Reward));
console.log('Can redeem expensive reward (1000 < 1500):', canMemberRedeemPoints(member as LoyaltyMember, expensiveReward as Reward));
console.log('Can redeem out of stock reward:', canMemberRedeemPoints(member as LoyaltyMember, outOfStockReward as Reward));

// 3. Formatting
console.log('\n3. Formatting:');
console.log('Format 1000:', formatPoints(1000));
console.log('Format 1234567:', formatPoints(1234567));

// 4. Tier Progression
console.log('\n4. Tier Progression:');
console.log('Next tier after BRONZE:', getNextTier('BRONZE'));
console.log('Next tier after PLATINUM:', getNextTier('PLATINUM'));

console.log('\nProgress from BRONZE at 250 points (Threshold for SILVER is 500):');
console.log(JSON.stringify(calculateProgressToNextTier(250, 'BRONZE'), null, 2));

console.log('\nProgress from SILVER at 1250 points (Threshold for GOLD is 2000, SILVER starts at 500):');
// SILVER starts at 500. Next is GOLD at 2000. Total needed in this band is 1500.
// Current points 1250. Earned in band = 1250 - 500 = 750.
// Progress = 750 / 1500 = 50%.
console.log(JSON.stringify(calculateProgressToNextTier(1250, 'SILVER'), null, 2));

console.log('\n--- Verification Finished ---');
