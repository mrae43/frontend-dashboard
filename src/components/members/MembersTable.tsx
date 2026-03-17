import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import type { MemberListItem } from '../../models/member';

interface MembersTableProps {
  members: MemberListItem[];
}

const TIER_COLORS: Record<MemberListItem['tier'], string> = {
  BRONZE: 'bg-orange-100 text-orange-800 border-orange-200',
  SILVER: 'bg-slate-100 text-slate-800 border-slate-200',
  GOLD: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  PLATINUM: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

const STATUS_COLORS: Record<MemberListItem['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700',
  flagged: 'bg-rose-100 text-rose-700',
  inactive: 'bg-slate-100 text-slate-600',
};

export const MembersTable = ({ members }: MembersTableProps) => {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-full">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p className="text-slate-900 font-bold mb-1">No members found</p>
        <p className="text-sm text-slate-500">Try adjusting your search keyword.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col h-full min-h-0">
      <div className="overflow-x-auto overflow-y-auto flex-1 min-h-0">
        <table className="w-full text-left text-sm text-slate-600 relative">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 uppercase text-xs tracking-wider sticky top-0 z-10 shadow-sm">
            <tr>
              <th scope="col" className="px-6 py-4 rounded-tl-2xl">Member</th>
              <th scope="col" className="px-6 py-4">Loyalty Tier</th>
              <th scope="col" className="px-6 py-4">Points</th>
              <th scope="col" className="px-6 py-4">Joined</th>
              <th scope="col" className="px-6 py-4">Last Active</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4 text-center rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {members.map((member) => {
              const joinDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(member.memberSince));
              const activeDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(member.lastActivity));

              return (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shrink-0">
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="font-semibold text-slate-600 uppercase">
                            {member.name.substring(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{member.name}</div>
                        <div className="text-slate-500 text-xs">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${TIER_COLORS[member.tier]}`}>
                      {member.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1 w-24">
                      <span className="font-medium text-slate-900">{member.points.toLocaleString()} pts</span>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${member.xpProgress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {activeDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${STATUS_COLORS[member.status]}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      to={`/members/${member.id}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
