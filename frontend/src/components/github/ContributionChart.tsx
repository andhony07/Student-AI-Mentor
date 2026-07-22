import React from 'react';
import { Activity, GitCommit } from 'lucide-react';

const ContributionChart: React.FC = () => {
  const weeks = Array.from({ length: 24 }, (_, i) => ({
    week: `W${i + 1}`,
    commits: Math.floor(Math.random() * 15) + 3,
  }));

  const maxCommits = Math.max(...weeks.map((w) => w.commits));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-emerald-600" /> Commit Activity Timeline
        </h3>
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <GitCommit className="h-3.5 w-3.5 text-emerald-600" /> 184 Commits this year
        </span>
      </div>

      {/* Bar Chart Grid */}
      <div className="h-28 flex items-end justify-between gap-1 pt-4">
        {weeks.map((w, idx) => {
          const heightPct = Math.round((w.commits / maxCommits) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full rounded-t-md bg-emerald-500 group-hover:bg-emerald-600 transition-all"
                style={{ height: `${heightPct}%` }}
                title={`${w.week}: ${w.commits} commits`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContributionChart;
