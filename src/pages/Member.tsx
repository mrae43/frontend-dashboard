import { Link, useSearchParams } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import { useMemo, useState } from 'react';
import { MOCK_MEMBERS } from '../utils/mock/members';
import { MembersTable } from '../components/members/MembersTable';
import type { MemberListItem } from '../models/member';
import { MembersFilter, type MembersFilterValues } from '../components/members/MembersFIlter';
import { compareMembers } from '../utils/sort';
import { Pagination } from '../components/Pagination';

const MemberPage = () => {
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<MembersFilterValues>({
    tier: { value: 'All', label: 'Loyalty Tier (All)' },
    status: { value: 'All', label: 'Status (All)' },
    sortBy: { value: 'name_asc', label: 'Name (A-Z)' },
  });

  const members: MemberListItem[] = useMemo(() => {
    const defaultDate = new Date().toISOString();
    return MOCK_MEMBERS
      .filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase());
        const matchesTier = filters.tier.value === 'All' || member.tier === filters.tier.value;
        const matchesStatus = filters.status.value === 'All' || member.status === filters.status.value;
        return matchesSearch && matchesTier && matchesStatus;
      })
      .map(member => {
        // Mock calculations for xp progress and status based on available logic
        let xpProgress = 0;
        if (member.tier === 'BRONZE') xpProgress = Math.min(100, Math.round((member.tierXP / 500) * 100));
        else if (member.tier === 'SILVER') xpProgress = Math.min(100, Math.round((member.tierXP / 2000) * 100));
        else if (member.tier === 'GOLD') xpProgress = Math.min(100, Math.round((member.tierXP / 5000) * 100));
        else xpProgress = 100;

        return {
          id: member.id,
          name: member.name,
          email: member.email,
          tier: member.tier,
          points: member.spendablePoints,
          xpProgress,
          lastActivity: member.lastVisit || defaultDate,
          memberSince: member.joinDate,
          status: member.status,
        };
      })
      .sort((a, b) => compareMembers(a, b, filters.sortBy.value));
  }, [search, filters]);

  const paginatedMembers = useMemo(() => {
    return members.slice(offset, offset + limit);
  }, [members, offset, limit]);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Members</span>
        </div>
        <div className="w-full sm:w-auto">
          <SearchInput search={search} setSearch={setSearch} placeholder="members" filtered={members.length} total={MOCK_MEMBERS.length}/>
        </div>
      </div>
      <div className="flex flex-col flex-1 min-h-0 gap-4">
        <div className="shrink-0">
          <MembersFilter 
            onApply={(newFilters) => setFilters(newFilters)} 
            onReset={() => setFilters({
              tier: { value: 'All', label: 'Loyalty Tier (All)' },
              status: { value: 'All', label: 'Status (All)' },
              sortBy: { value: 'name_asc', label: 'Name (A-Z)' },
            })} 
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <div className="flex-1 min-h-0">
            <MembersTable members={paginatedMembers} />
          </div>
          <div className="shrink-0">
            <Pagination totalItems={members.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;