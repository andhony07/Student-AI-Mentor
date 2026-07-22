import React from 'react';
import { Award, CheckCircle2, FileCheck, ShieldAlert } from 'lucide-react';

interface ResumeScoreCardProps {
  score?: number;
  atsScore?: number;
}

const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({ score = 86, atsScore = 92 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Overall Resume Score</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900">{score}</span>
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> High Impact Format
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 font-bold">
          <Award className="h-6 w-6" />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">ATS Pass Compatibility</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-600">{atsScore}%</span>
            <span className="text-xs text-slate-400 font-bold">Match</span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
            <FileCheck className="h-3.5 w-3.5" /> Machine Readable PDF
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 font-bold">
          <ShieldAlert className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
