import { Search, X } from 'lucide-react';

interface SearchInputProps {
    search: string;
    setSearch: (search: string) => void;
}

export const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  return (
    <div className="flex-1 max-w-sm relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      <input
        type="text"
        data-testid="transaction-search-input"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl
                      placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10
                      focus:border-blue-500 transition-all outline-none"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          data-testid="transaction-search-clear"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md hover:bg-slate-200/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};