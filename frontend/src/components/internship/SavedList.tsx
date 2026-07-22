import React from 'react';
import { Bookmark, Building2, Calendar } from 'lucide-react';
import type { TrackedInternship } from '../../types/internship.types';

interface SavedListProps {
  savedItems: TrackedInternship[];
}

const SavedList: React.FC<SavedListProps> = ({ savedItems }) => {
  const statusColors: Record<string, string> = {
    interested: 'bg-blue-50 text-blue-700 border-blue-200',
    applied: 'bg-purple-50 text-purple-700 border-purple-200',
    interviewing: 'bg-amber-50 text-amber-700 border-amber-200',
    offered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Bookmark className="h-4 w-4 text-amber-600" /> Saved & Tracked Applications
        </h3>
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
          {savedItems.length} Saved
        </span>
      </div>

      {savedItems.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4">
          No internships saved yet. Click the bookmark icon on any card to track applications.
        </p>
      ) : (
        <div className="space-y-2.5 max-h-72 overflow-y-auto chat-scroll pr-1">
          {savedItems.map((item, idx) => (
            <div
              key={item._id || idx}
              className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{item.role}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="h-3 w-3" /> {item.companyName}
                  </p>
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[9px] font-bold capitalize ${
                    statusColors[item.status] || statusColors.interested
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {item.applicationDate && (
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-400" /> Tracked on{' '}
                  {new Date(item.applicationDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedList;
