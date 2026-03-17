import { useState } from 'react';
import Select from 'react-select';
import { customStyles } from '../../utils/style';

export interface OptionType {
  value: string;
  label: string;
}

export interface MembersFilterValues {
  tier: OptionType;
  status: OptionType;
  sortBy: OptionType;
}

interface MembersFilterProps {
  onApply: (filters: MembersFilterValues) => void;
  onReset: () => void;
}


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
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'points_desc', label: 'Points (High to Low)' },
  { value: 'points_asc', label: 'Points (Low to High)' },
  { value: 'lastActivity_desc', label: 'Last Activity (Newest)' },
  { value: 'lastActivity_asc', label: 'Last Activity (Oldest)' },
  { value: 'memberSince_desc', label: 'Member Since (Newest)' },
  { value: 'memberSince_asc', label: 'Member Since (Oldest)' },
];

const getOptionByValue = (options: OptionType[], value: string) => 
  options.find(opt => opt.value === value) || options[0];

export const MembersFilter = ({ onApply, onReset }: MembersFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<MembersFilterValues>({
    tier: getOptionByValue(optionsTier, 'All'),
    status: getOptionByValue(optionsStatus, 'All'),
    sortBy: getOptionByValue(optionsSortBy, 'name_asc'),
  });
  const handleApplyFilter = () => {
    onApply(activeFilters);
  };

  const handleResetFilter = () => {
    const defaultFilters = {
      tier: getOptionByValue(optionsTier, 'All'),
      status: getOptionByValue(optionsStatus, 'All'),
      sortBy: getOptionByValue(optionsSortBy, 'name_asc'),
    };
    setActiveFilters(defaultFilters);
    onReset();
  };
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-md text-slate-900 font-bold mb-2">Advanced Filter:</p>
            <Select
              options={optionsTier}
              styles={customStyles}
              isSearchable={false}
              value={activeFilters.tier}
              onChange={(e) => setActiveFilters({ ...activeFilters, tier: getOptionByValue(optionsTier, e?.value || 'All') })}
            />
            <Select
              options={optionsStatus}
              styles={customStyles}
              isSearchable={false}
              value={activeFilters.status}
              onChange={(e) => setActiveFilters({ ...activeFilters, status: getOptionByValue(optionsStatus, e?.value || 'All') })}
            />
            <Select
              options={optionsSortBy}
              styles={customStyles}
              isSearchable={false}
              value={activeFilters.sortBy}
              onChange={(e) => setActiveFilters({ ...activeFilters, sortBy: getOptionByValue(optionsSortBy, e?.value || 'name_asc') })}
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