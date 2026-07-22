import React from 'react';
import { Sparkles, Building2, ExternalLink } from 'lucide-react';
import type { InternshipItem } from '../../types/internship.types';

interface RecommendationCardProps {
  recommendations: InternshipItem[];
  onSelect: (item: InternshipItem) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendations, onSelect }) => {
  const topThree = recommendations.slice(0, 3);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-600" /> Top Resume Skill Matches
        </h3>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          95%+ Match
        </span>
      </div>

      {topThree.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-2">
          Upload your PDF Resume to generate tailored internship matches.
        </p>
      ) : (
        <div className="space-y-2">
          {topThree.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(item)}
              className="p-3 rounded-xl border border-slate-200 bg-amber-50/20 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-between group text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-[11px] text-slate-500">{item.company}</p>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
