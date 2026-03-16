import { Search, X } from 'lucide-react';

interface SearchInputProps {
    search: string;
    setSearch: (search: string) => void;
    placeholder: string;
    filtered: number;
    total: number;
}

export const SearchInput = ({ search, setSearch, placeholder, filtered, total }: SearchInputProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 max-w-sm relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          data-testid="transaction-search-input"
          placeholder={`Search ${placeholder}...`}
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
      <span
        data-testid="transaction-count-badge"
        className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider"
      >
        {search
          ? `${filtered} found`
          : `${total} total`
        }
      </span>
    </div>
  );
};