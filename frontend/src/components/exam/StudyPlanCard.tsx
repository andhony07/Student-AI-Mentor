import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface StudyPlanCardProps {
  planData: Record<string, unknown> | null;
  isLoading: boolean;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ planData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <LoadingSpinner text="Fetching backend study schedule..." />
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <BookOpen className="h-10 w-10 text-slate-400 mx-auto mb-2" />
        <h4 className="font-bold text-slate-700 text-sm">No Study Schedule Generated</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          Fill out the Exam Management form above to generate a customized AI study roadmap.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-600" /> Active AI Study Plan
        </h3>
        <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-700">
          Generated Schedule
        </span>
      </div>

      <div className="rounded-xl bg-slate-900 p-4 text-slate-100 font-mono text-xs overflow-x-auto max-h-72">
        <pre>{JSON.stringify(planData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default StudyPlanCard;
