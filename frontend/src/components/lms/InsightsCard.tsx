import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface InsightsCardProps {
  insights?: {
    overallScore?: number;
    completedTopics?: number;
    pendingTopics?: number;
    strongSubjects?: string[];
    weakSubjects?: string[];
    recommendations?: string[];
  } | null;
}

const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
  const strong = insights?.strongSubjects || ['Data Structures', 'Operating Systems'];
  const weak = insights?.weakSubjects || ['Computer Networks', 'Database Normalization'];
  const recs = insights?.recommendations || [
    'Schedule 2 hours of revision for Computer Networks protocols.',
    'Complete Quiz #4 on B-Trees in DBMS before Friday.',
    'Maintain your 95% attendance trend in Software Engineering.',
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600" /> AI Insights Breakdown
        </h3>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600">
          Score: {insights?.overallScore || 88}/100
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strong Subjects */}
        <div className="rounded-xl bg-emerald-50/60 p-3.5 border border-emerald-100 space-y-1.5">
          <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> Strong Subjects
          </h4>
          <div className="flex flex-wrap gap-1">
            {strong.map((s, i) => (
              <span key={i} className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Weak Subjects */}
        <div className="rounded-xl bg-amber-50/60 p-3.5 border border-amber-100 space-y-1.5">
          <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Improvement Areas
          </h4>
          <div className="flex flex-wrap gap-1">
            {weak.map((w, i) => (
              <span key={i} className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations List */}
      <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> AI Action Plan Recommendations
        </h4>
        <ul className="space-y-1 text-xs text-slate-600">
          {recs.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightsCard;
