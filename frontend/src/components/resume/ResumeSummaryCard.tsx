import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

interface ResumeSummaryCardProps {
  analysis: Record<string, unknown> | null;
  isLoading: boolean;
}

const ResumeSummaryCard: React.FC<ResumeSummaryCardProps> = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <LoadingSpinner text="Evaluating PDF Resume with Gemini AI..." />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <FileText className="h-10 w-10 text-slate-400 mx-auto mb-2" />
        <h4 className="font-bold text-slate-700 text-sm">No Resume Uploaded</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
          Upload your PDF resume above to unlock complete ATS evaluation & AI recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" /> Extracted Resume Report
        </h3>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-600">
          Raw Analysis JSON
        </span>
      </div>

      <div className="rounded-xl bg-slate-900 p-4 text-slate-100 font-mono text-xs overflow-x-auto max-h-72">
        <pre>{JSON.stringify(analysis, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
