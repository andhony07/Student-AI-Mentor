import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationQuery: string;
  onLocationChange: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  locationQuery,
  onLocationChange,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-2">
      <div className="relative sm:col-span-7">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search role, skill, or company (e.g. Frontend Developer, Google)..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden"
        />
      </div>

      <div className="relative sm:col-span-5">
        <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Location (e.g. Bangalore, Remote)..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden"
        />
      </div>
    </div>
  );
};

export default SearchBar;
