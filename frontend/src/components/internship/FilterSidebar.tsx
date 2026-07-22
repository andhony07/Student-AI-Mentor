import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  workMode: string;
  onWorkModeChange: (mode: string) => void;
  stipendRange: string;
  onStipendChange: (stipend: string) => void;
  companyFilter: string;
  onCompanyChange: (company: string) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  workMode,
  onWorkModeChange,
  stipendRange,
  onStipendChange,
  companyFilter,
  onCompanyChange,
  onResetFilters,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-5 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
          <Filter className="h-4 w-4 text-amber-600" /> Filter Internships
        </h3>
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Work Mode */}
      <div className="space-y-2">
        <label className="font-semibold text-slate-700 block">Work Mode</label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'Remote', 'On-site', 'Hybrid'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onWorkModeChange(mode)}
              className={`rounded-xl py-1.5 px-3 text-xs font-semibold border transition-all text-center cursor-pointer ${
                workMode === mode
                  ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Stipend Range */}
      <div className="space-y-2">
        <label className="font-semibold text-slate-700 block">Stipend Range</label>
        <select
          value={stipendRange}
          onChange={(e) => onStipendChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-hidden"
        >
          <option value="All">All Stipends</option>
          <option value="Paid">Paid Only</option>
          <option value="20k+">₹20,000+ / month</option>
          <option value="40k+">₹40,000+ / month</option>
        </select>
      </div>

      {/* Company Filter */}
      <div className="space-y-2">
        <label className="font-semibold text-slate-700 block">Company Name</label>
        <input
          type="text"
          value={companyFilter}
          onChange={(e) => onCompanyChange(e.target.value)}
          placeholder="Filter by company..."
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-hidden"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
