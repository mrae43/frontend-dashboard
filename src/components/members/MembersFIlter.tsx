import { useState } from 'react';
import Select, { type StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

export interface MembersFilterValues {
  tier: OptionType;
  status: OptionType;
}

interface MembersFilterProps {
  onApply: (filters: MembersFilterValues) => void;
  onReset: () => void;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    borderRadius: '0.75rem',
    padding: '2px 8px',
    borderColor: state.isFocused ? '#94a3b8' : '#e2e8f0',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#cbd5e1',
    },
    backgroundColor: 'white',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e293b',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#f8fafc' : 'white',
    color: '#1e293b',
    fontSize: '14px',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#f1f5f9',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    border: '1px solid #e2e8f0',
  }),
};

const optionsTier = [
  { value: 'All', label: 'Loyalty Tier (All)' },
  { value: 'BRONZE', label: 'Loyalty Tier (Bronze)' },
  { value: 'SILVER', label: 'Loyalty Tier (Silver)' },
  { value: 'GOLD', label: 'Loyalty Tier (Gold)' },
  { value: 'PLATINUM', label: 'Loyalty Tier (Platinum)' },
];

const optionsStatus = [
  { value: 'All', label: 'Status (All)' },
  { value: 'active', label: 'Status (Active)' },
  { value: 'flagged', label: 'Status (Flagged)' },
  { value: 'inactive', label: 'Status (Inactive)' },
];

const optionsSortBy = [
  { value: 'All', label: 'Sort By (All)' },
  { value: 'name', label: 'Sort By (Name)' },
  { value: 'email', label: 'Sort By (Email)' },
  { value: 'tier', label: 'Sort By (Tier)' },
  { value: 'points', label: 'Sort By (Points)' },
  { value: 'lastActivity', label: 'Sort By (Last Activity)' },
  { value: 'memberSince', label: 'Sort By (Member Since)' },
];

const getOptionByValue = (options: OptionType[], value: string) => 
  options.find(opt => opt.value === value) || options[0];

export const MembersFilter = ({ onApply, onReset }: MembersFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<MembersFilterValues>({
    tier: getOptionByValue(optionsTier, 'All'),
    status: getOptionByValue(optionsStatus, 'All'),
  });
  const handleApplyFilter = () => {
    onApply(activeFilters);
  };

  const handleResetFilter = () => {
    setActiveFilters({
      tier: getOptionByValue(optionsTier, 'All'),
      status: getOptionByValue(optionsStatus, 'All'),
    });
    onReset();
  };
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-md text-slate-900 font-bold mb-2">Advanced Filter:</p>
            <Select
              options={optionsTier}
              styles={customStyles}
              placeholder="Loyalty Tier (All)"
              isSearchable={false}
              value={activeFilters.tier}
              onChange={(e) => setActiveFilters({ ...activeFilters, tier: getOptionByValue(optionsTier, e?.value || 'All') })}
            />
            <Select
              options={optionsStatus}
              styles={customStyles}
              placeholder="Status (All)"
              isSearchable={false}
              value={activeFilters.status}
              onChange={(e) => setActiveFilters({ ...activeFilters, status: getOptionByValue(optionsStatus, e?.value || 'All') })}
            />
            <Select
              options={optionsSortBy}
              styles={customStyles}
              placeholder="Sort By (All)"
              isSearchable={false}
              value={activeFilters.tier}
              onChange={(e) => setActiveFilters({ ...activeFilters, tier: getOptionByValue(optionsTier, e?.value || 'All') })}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleApplyFilter} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Apply Filter</button>
          <button onClick={handleResetFilter} className="px-4 py-2 bg-slate-500 text-white rounded-lg">Reset Filter</button>
        </div>
      </div>
    </div>
  );
};