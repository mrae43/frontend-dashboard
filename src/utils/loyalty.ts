import { type LoyaltyMember, type LoyaltyTier, type Reward } from "../models/loyalty";

export const TIER_MULTIPLIER: Record<LoyaltyTier, number> = {
  BRONZE: 1,
  SILVER: 1.2,
  GOLD: 1.5,
  PLATINUM: 2
}

export const TIER_THRESHOLDS: Record<LoyaltyTier, number> = {
  BRONZE: 0,
  SILVER: 500,
  GOLD: 2000,
  PLATINUM: 5000
}

export const calculateEarnedPoints = (amount: number, tier: LoyaltyTier): number => {
  return Math.floor(amount * TIER_MULTIPLIER[tier]);
}

export const canMemberRedeemPoints = (member: LoyaltyMember, reward: Reward): boolean => {
  return member.spendablePoints >= reward.costInPoints && reward.stock > 0;
}

export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat().format(points);
}

const TIERS_ORDER: LoyaltyTier[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

export const getNextTier = (currentTier: LoyaltyTier): LoyaltyTier | null => {
  const nextIndex = TIERS_ORDER.indexOf(currentTier) + 1;
  return TIERS_ORDER[nextIndex] ?? null;
}

export const calculateProgressToNextTier = (tierXP: number, currentTier: LoyaltyTier): { 
  progress: number; 
  remaining: number; 
  nextTier: LoyaltyTier | null 
} => {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) {
    return { progress: 100, remaining: 0, nextTier: null };
  }

  const threshold = TIER_THRESHOLDS[nextTier];
  const currentThreshold = TIER_THRESHOLDS[currentTier];
  
  const totalNeeded = threshold - currentThreshold;
  const earnedInCurrentTier = Math.max(0, tierXP - currentThreshold);
  
  const progress = Math.min(100, Math.round((earnedInCurrentTier / totalNeeded) * 100));
  const remaining = Math.max(0, threshold - tierXP);

  return { progress, remaining, nextTier };
}
