import React from 'react';
import { X, Building2, MapPin, DollarSign, ExternalLink, CheckCircle2, Bookmark } from 'lucide-react';
import type { InternshipItem } from '../../types/internship.types';

interface DetailsDrawerProps {
  internship: InternshipItem | null;
  onClose: () => void;
  onSave: (item: InternshipItem) => void;
  isSaved?: boolean;
}

const DetailsDrawer: React.FC<DetailsDrawerProps> = ({
  internship,
  onClose,
  onSave,
  isSaved = false,
}) => {
  if (!internship) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{internship.role}</h3>
              <p className="text-xs text-slate-500 font-semibold">{internship.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700 chat-scroll">
          {/* Key Meta Details */}
          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Location</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-amber-600" /> {internship.location}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Stipend / Salary</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <DollarSign className="h-3.5 w-3.5" /> {internship.salary}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">Role & Overview Description</h4>
            <p className="leading-relaxed text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
              {internship.description}
            </p>
          </div>

          {/* Requirements & Responsibilities */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">Key Qualifications</h4>
            <ul className="space-y-1.5 pl-2 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Proficiency in core software engineering principles and computer science topics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Experience building web applications or solving algorithmic problems.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Strong analytical and communication skills for team collaboration.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Footer */}
        <div className="border-t border-slate-200 bg-white p-4 flex items-center gap-3">
          <button
            onClick={() => onSave(internship)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold border transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="h-4 w-4" /> {isSaved ? 'Tracked in Dashboard' : 'Track Application'}
          </button>

          <a
            href={internship.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-white hover:bg-amber-600 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            Apply Now <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailsDrawer;
