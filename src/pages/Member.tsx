import { Link } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import { useMemo, useState } from 'react';
import { MOCK_MEMBERS } from '../utils/mock/members';
import { IdentityHeader } from '../components/loyalty/IdentityHeader';

const MemberPage = () => {
  const [search, setSearch] = useState('');

  const members = useMemo(() => {
    return MOCK_MEMBERS.filter(member =>
      member.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Members</span>
        </div>
        <SearchInput search={search} setSearch={setSearch} placeholder="members" filtered={members.length} total={MOCK_MEMBERS.length}/>
      </div>
      <div>
        {members.length === 0 ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-900 font-bold">No members found</p>
            <p className="text-sm text-slate-500">Try adjusting your search keyword.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {members.map((member) => (
              <Link key={member.id} to={`/members/${member.id}`} className="flex items-center gap-2">
                <IdentityHeader member={member} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberPage;