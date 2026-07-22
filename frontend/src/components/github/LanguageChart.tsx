import React from 'react';
import { Code2 } from 'lucide-react';
import type { GithubRepository } from '../../types/github.types';

interface LanguageChartProps {
  repositories: GithubRepository[];
}

const LanguageChart: React.FC<LanguageChartProps> = ({ repositories }) => {
  const langCounts: Record<string, number> = {};

  repositories.forEach((r) => {
    const l = r.language || 'TypeScript';
    langCounts[l] = (langCounts[l] || 0) + 1;
  });

  const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
  const sortedLangs = Object.entries(langCounts)
    .map(([lang, count]) => ({
      lang,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const colors = [
    'bg-blue-600',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-purple-600',
    'bg-rose-500',
    'bg-cyan-500',
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Code2 className="h-4 w-4 text-slate-900" /> Primary Language Distribution
        </h3>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
          Repo Tech Stack
        </span>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
        {sortedLangs.map((item, idx) => (
          <div
            key={item.lang}
            className={`h-full ${colors[idx % colors.length]}`}
            style={{ width: `${item.percentage}%` }}
            title={`${item.lang}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Language Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sortedLangs.map((item, idx) => (
          <div key={item.lang} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${colors[idx % colors.length]}`} />
              <span className="font-semibold text-slate-800">{item.lang}</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageChart;
