import { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, Clock, type LucideIcon, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { type PointsTransaction, type TransactionType } from '../../models/loyalty';
import { PointDisplay } from './PointDisplay';
import { getBadgeStyles } from '../../utils/style';
import { SearchTransaction } from './SearchTransaction';

interface ActivityFeedProps {
  transactions: PointsTransaction[];
}

interface TransactionUI {
  label: string;
  icon: LucideIcon;
  variant: 'success' | 'danger' | 'info' | 'neutral';
  action: 'plus' | 'minus' | 'none';
}

const TYPE_CONFIG: Record<TransactionType, TransactionUI> = {
  EARNED: {
    label: 'Points Earned',
    icon: ArrowUpRight,
    variant: 'success',
    action: 'plus',
  },
  REDEEMED: {
    label: 'Reward Redeemed',
    icon: ArrowDownLeft,
    variant: 'danger',
    action: 'minus',
  },
  ADJUSTMENT: {
    label: 'Manual Adjustment',
    icon: RefreshCcw,
    variant: 'info',
    action: 'none',
  },
  EXPIRED: {
    label: 'Points Expired',
    icon: Clock,
    variant: 'neutral',
    action: 'none',
  },
};

export const ActivityFeed = ({ transactions }: ActivityFeedProps) => {
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      return tx.description.toLowerCase().includes(search.toLowerCase());
    });
  }, [transactions, search]);

  return (
    <div
      data-testid="activity-feed-tile"
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Activity History</h3>
          <p className="text-sm text-slate-500">Live feed of point transactions</p>
        </div>
        <SearchTransaction search={search} setSearch={setSearch} />
        <span
          data-testid="transaction-count-badge"
          className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider"
        >
          {search
            ? `${filteredTransactions.length} found`
            : `${transactions.length} total`
          }
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2">Transaction Details</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredTransactions.map((tx) => {
              // Defensive data handling: Fallback to ADJUSTMENT if type is unknown
              const config = TYPE_CONFIG[tx.type] || TYPE_CONFIG.ADJUSTMENT;
              const relativeTime = formatDistanceToNow(new Date(tx.date), { addSuffix: true });

              return (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">
                        {tx.description}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {relativeTime}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-black uppercase tracking-wider ${getBadgeStyles(config.variant)}`}>
                      <config.icon className="w-3 h-3 stroke-[3]" />
                      {config.label}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <PointDisplay points={tx.points} />
                  </td>
                </tr>
              );
            })}

            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-20 text-center">
                  <div
                    data-testid="activity-feed-empty"
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">No transactions found</p>
                      <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
                        We couldn't find any activity for this member. Try adjusting your search keyword.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200">
          Load More History
          <RefreshCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
