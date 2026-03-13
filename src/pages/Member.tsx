import { Link } from "react-router-dom";
import { SearchInput } from "../components/SearchInput";
import { useState } from "react";

const MemberPage = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Members</span>
        </div>
        <SearchInput search={search} setSearch={setSearch} />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Member Management Under Construction</div>
    </div>
  );
};

export default MemberPage;