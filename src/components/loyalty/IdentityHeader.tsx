import { type LoyaltyMember, type LoyaltyTier } from '../../models/loyalty';

interface IdentityHeaderProps {
  member: LoyaltyMember;
}

const TIER_COLORS: Record<LoyaltyTier, string> = {
  BRONZE: 'bg-orange-700 text-orange-50',
  SILVER: 'bg-slate-400 text-slate-900',
  GOLD: 'bg-yellow-400 text-yellow-950',
  PLATINUM: 'bg-indigo-600 text-indigo-50',
};

export const IdentityHeader= ({ member }: IdentityHeaderProps) => {
  const joinYear = new Date(member.joinDate).getFullYear();

  return (
    <div
      data-testid="identity-header-tile"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h1>
          <p className="text-slate-500 font-medium">{member.email}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${TIER_COLORS[member.tier]}`}>
          {member.tier} Member
        </span>
        <p className="text-sm text-slate-400">
          Member since {joinYear}
        </p>
      </div>
    </div>
  );
};
