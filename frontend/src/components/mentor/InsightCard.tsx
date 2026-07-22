import React from 'react';
import { Sparkles, BookOpen, Award, TrendingUp } from 'lucide-react';

const InsightCard: React.FC = () => {
  const suggestedTopics = [
    'System Design Basics',
    'React Server Components',
    'PostgreSQL Indexing',
    'Python Asyncio',
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-emerald-600" /> Learning Insights
        </h3>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          Active Session
        </span>
      </div>

      {/* Progress Metric */}
      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-600" /> Weekly Mentor Engagement
          </span>
          <span className="text-emerald-700 font-bold">92%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full w-[92%]" />
        </div>
      </div>

      {/* Suggested Topics */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-blue-600" /> Suggested Study Topics
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {suggestedTopics.map((topic, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-medium text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
            >
              + {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> Recent Learning Progress
        </h4>
        <ul className="space-y-1 text-xs text-slate-600">
          <li className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Mastered Data Structures & Normalization</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Completed 12 AI Mentor Q&A sessions this week</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InsightCard;
