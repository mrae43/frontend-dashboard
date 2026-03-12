import { type LoyaltyMember } from '../../models/loyalty';
import { calculateProgressToNextTier, formatPoints } from '../../utils/loyalty';

interface PointsTierProgressProps {
  member: LoyaltyMember;
}

export const PointsTierProgress= ({ member }: PointsTierProgressProps) => {
  const { progress, remaining, nextTier } = calculateProgressToNextTier(member.points, member.tier);

  return (
    <div 
      data-testid="points-tier-progress-tile"
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Balance</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">{formatPoints(member.points)}</span>
            <span className="text-slate-400 font-medium">Points</span>
          </div>
        </div>
        <div className="text-right">
          {nextTier ? (
            <>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Next Milestone</h3>
              <p className="text-slate-900 font-bold">
                <span className="text-blue-600">{formatPoints(remaining)}</span> pts away from <span className="text-blue-600">{nextTier}</span>
              </p>
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-1">Max Level Reached</h3>
              <p className="text-slate-900 font-bold">You are at the top tier!</p>
            </>
          )}
        </div>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
              Tier Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
          <div 
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-out"
          ></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>{member.tier}</span>
          <span>{nextTier || 'MAX'}</span>
        </div>
      </div>
    </div>
  );
};
