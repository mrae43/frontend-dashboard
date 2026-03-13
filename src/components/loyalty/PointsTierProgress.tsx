import { Wallet, Trophy, TrendingUp, ChevronRight } from 'lucide-react';
import { type LoyaltyMember, type LoyaltyTier } from '../../models/loyalty';
import { calculateProgressToNextTier, formatPoints, TIER_THRESHOLDS } from '../../utils/loyalty';

interface PointsTierProgressProps {
  member: LoyaltyMember;
}

const TIER_THEMES: Record<LoyaltyTier, {
  bg: string,
  border: string,
  accent: string,
  text: string,
  walletBg: string,
  progress: string,
  shadow: string
}> = {
  BRONZE: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    accent: 'text-orange-700',
    text: 'text-orange-900',
    walletBg: 'bg-white',
    progress: 'bg-orange-500',
    shadow: 'shadow-orange-200',
  },
  SILVER: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    accent: 'text-slate-600',
    text: 'text-slate-900',
    walletBg: 'bg-white',
    progress: 'bg-slate-400',
    shadow: 'shadow-slate-200',
  },
  GOLD: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    accent: 'text-yellow-600',
    text: 'text-yellow-900',
    walletBg: 'bg-white',
    progress: 'bg-yellow-500',
    shadow: 'shadow-yellow-200',
  },
  PLATINUM: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    accent: 'text-indigo-700',
    text: 'text-indigo-900',
    walletBg: 'bg-white',
    progress: 'bg-indigo-600',
    shadow: 'shadow-indigo-200',
  },
};

export const PointsTierProgress = ({ member }: PointsTierProgressProps) => {
  const { progress, remaining, nextTier } = calculateProgressToNextTier(member.tierXP, member.tier);
  const theme = TIER_THEMES[member.tier];

  const currentThreshold = TIER_THRESHOLDS[member.tier];
  const nextThreshold = nextTier ? TIER_THRESHOLDS[nextTier] : currentThreshold;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* The "Wallet" Card - Immediate Gratification */}
      <div
        data-testid="wallet-card"
        className={`md:col-span-1 rounded-3xl p-6 shadow-xl border-2 ${theme.bg} ${theme.border} flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]`}
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className={`p-2 rounded-xl ${theme.accent} bg-white shadow-sm ring-1 ring-black/5`}>
              <Wallet className="w-5 h-5" />
            </div>
            <span className={`text-xs font-black uppercase tracking-widest ${theme.accent} opacity-80`}>
              Wallet Balance
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter text-slate-900">
              <span className="mr-1">🪙</span>{formatPoints(member.spendablePoints)}
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-500">Spendable Points</p>
        </div>

        <button className="mt-8 w-full py-3 px-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors">
          Redeem Rewards
        </button>
      </div>

      {/* The "Status" Card - Future Aspiration */}
      <div
        data-testid="status-card"
        className={'md:col-span-2 rounded-3xl p-6 shadow-xl border-2 bg-white border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl'}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className={`w-5 h-5 ${theme.accent}`} />
              <span className={`text-xs font-black uppercase tracking-widest ${theme.accent}`}>
                {member.tier} Status
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Progression</h2>
          </div>

          <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${theme.bg} ${theme.accent} border ${theme.border}`}>
            Tier: {member.tier}
          </div>
        </div>

        <div className="space-y-6">
          {nextTier ? (
            <>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Momentum</span>
                  </div>
                  <p className="text-lg font-bold text-slate-700">
                    You're only <span className={`${theme.accent} font-black underline decoration-2 underline-offset-4`}>{formatPoints(remaining)} pts</span> away from <span className="font-black text-slate-900">{nextTier}</span>!
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-400">{progress}%</span>
                </div>
              </div>

              <div
                role="progressbar"
                aria-valuenow={member.tierXP}
                aria-valuemin={currentThreshold}
                aria-valuemax={nextThreshold}
                aria-label={`Progress to ${nextTier} Tier`}
                className="relative h-6 bg-slate-100 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner"
              >
                <div
                  style={{ width: `${progress}%` }}
                  className={`absolute inset-y-0 left-0 ${theme.progress} transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,0,0,0.1)]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30" />
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>{member.tier}</span>
                <div className="flex items-center gap-1">
                  <span>{nextTier}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-6 rounded-full bg-indigo-50 border-4 border-indigo-100 shadow-xl shadow-indigo-100 animate-pulse">
                <Trophy className="w-12 h-12 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">LEGENDS NEVER DIE</h3>
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Lifetime {member.tier} Elite</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
