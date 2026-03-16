export interface MemberListItem {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  points: number;
  xpProgress: number; // 0 to 100
  lastActivity: string; // ISO Date
  memberSince: string;
  status: 'active' | 'flagged' | 'inactive';
}
