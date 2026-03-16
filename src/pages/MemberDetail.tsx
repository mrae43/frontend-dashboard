import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_MEMBERS } from '../utils/mock/members';
import { MOCK_TRANSACTIONS } from '../utils/mock/transactions';
import { IdentityHeader } from '../components/loyalty/IdentityHeader';
import { PointsTierProgress } from '../components/loyalty/PointsTierProgress';
import { ActivityFeed } from '../components/loyalty/ActivityFeed';

const MemberDetail = () => {
  const { id } = useParams<{ id: string }>();

  const member = useMemo(() => {
    return MOCK_MEMBERS.find(m => m.id === id);
  }, [id]);

  const transactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t => t.memberId === id);
  }, [id]);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
        <h2 className="text-xl font-bold mb-4">Member Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/members" className="hover:text-blue-600 transition-colors">Members</Link>
        <span>/</span>
        <span className="font-semibold text-slate-900">{member.name}'s Profile</span>
      </div>

      <IdentityHeader member={member} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PointsTierProgress member={member} />
          <ActivityFeed transactions={transactions} />
        </div>

        {/* Placeholder for future tiles (Quick Actions, etc.) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-[200px] flex items-center justify-center text-slate-400 italic">
            Quick Actions Tile (Planned)
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 min-h-[200px] flex items-center justify-center text-slate-400 italic">
            Tier Benefits Tile (Planned)
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
