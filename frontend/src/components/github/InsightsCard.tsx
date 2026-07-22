import React from 'react';
import { Sparkles, CheckCircle2, TrendingUp, Lightbulb } from 'lucide-react';

const InsightsCard: React.FC = () => {
  const strengths = [
    'Strong TypeScript & React project architecture',
    'Consistent commit frequency over past 6 months',
    'Clear README documentation across top repositories',
  ];

  const improvements = [
    'Add unit tests (Jest/Vitest) to backend microservices',
    'Configure GitHub Actions CI/CD workflows for automated builds',
    'Include live project demo URLs in repository headers',
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-emerald-600" /> AI GitHub Profile Insights
        </h3>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          Grade: A-
        </span>
      </div>

      {/* Strengths */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Repository Strengths
        </h4>
        <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
          {strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Portfolio Improvements */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Portfolio Improvement Action Plan
        </h4>
        <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
          {improvements.map((imp, i) => (
            <li key={i}>{imp}</li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1 text-xs">
        <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-blue-600" /> Target Role Fit
        </h4>
        <p className="text-slate-600">
          Your profile exhibits strong Frontend & Full Stack alignment. Adding Docker & CI/CD will make your repositories production-ready for senior recruiter reviews.
        </p>
      </div>
    </div>
  );
};

export default InsightsCard;
