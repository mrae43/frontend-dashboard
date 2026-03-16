import { z } from 'zod';

export const LoyaltyTierSchema = z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']);
export type LoyaltyTier = z.infer<typeof LoyaltyTierSchema>;

export const LoyaltyMemberSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  spendablePoints: z.number().int().nonnegative(),
  tierXP: z.number().int().nonnegative(),
  tier: LoyaltyTierSchema,
  joinDate: z.iso.datetime(),
  lastVisit: z.iso.datetime().optional(),
  status: z.enum(['active', 'flagged', 'inactive']),
});

export type LoyaltyMember = z.infer<typeof LoyaltyMemberSchema>;

export const RewardSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  costInPoints: z.number().int().positive(),
  stock: z.number().int().nonnegative(),
  category: z.string(),
});

export type Reward = z.infer<typeof RewardSchema>;

export const TransactionTypeSchema = z.enum(['EARNED', 'REDEEMED', 'ADJUSTMENT', 'EXPIRED']);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const PointsTransactionSchema = z.object({
  id: z.uuid(),
  memberId: z.uuid(),
  points: z.number().int(),
  type: TransactionTypeSchema,
  date: z.iso.datetime(),
  description: z.string(),
});

export type PointsTransaction = z.infer<typeof PointsTransactionSchema>;

export const LoyaltyTierMultiplierSchema = z.object({
  BRONZE: z.number().positive(),
  SILVER: z.number().positive(),
  GOLD: z.number().positive(),
  PLATINUM: z.number().positive(),
});

