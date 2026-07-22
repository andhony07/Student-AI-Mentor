import React from 'react';
import { Building2, MapPin, DollarSign, ExternalLink, Bookmark, Check } from 'lucide-react';
import type { InternshipItem } from '../../types/internship.types';

interface InternshipCardProps {
  internship: InternshipItem;
  onViewDetails: (item: InternshipItem) => void;
  onSave: (item: InternshipItem) => void;
  isSaved?: boolean;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onViewDetails,
  onSave,
  isSaved = false,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        {/* Header: Company & Mode Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-bold border border-amber-100">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">{internship.role}</h3>
              <p className="text-xs text-slate-500 font-medium">{internship.company}</p>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
              internship.mode === 'Remote'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            {internship.mode}
          </span>
        </div>

        {/* Location & Salary */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-amber-600" /> {internship.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> {internship.salary}
          </span>
        </div>

        {/* Snippet Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {internship.description}
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <button
          onClick={() => onViewDetails(internship)}
          className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          View Details
        </button>

        <a
          href={internship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-amber-500 py-2 text-xs font-bold text-white hover:bg-amber-600 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          Apply <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <button
          onClick={() => onSave(internship)}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            isSaved
              ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
              : 'bg-white border-slate-200 text-slate-400 hover:text-amber-600 hover:bg-amber-50'
          }`}
          title={isSaved ? 'Tracked' : 'Save / Track'}
        >
          {isSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
