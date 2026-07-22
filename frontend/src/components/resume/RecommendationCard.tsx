import React from 'react';
import { Lightbulb, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface RecommendationCardProps {
  formattingFeedback?: string[];
  projectSuggestions?: string[];
  careerRecommendations?: string[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  formattingFeedback = [
    'Use bullet points starting with strong action verbs (e.g. Architected, Developed, Optimized).',
    'Quantify results where possible (e.g. Improved query execution speed by 40%).',
  ],
  projectSuggestions = [
    'Include a full-stack project demonstrating REST API consumption and state management.',
    'Add GitHub repository links and live preview URLs for key portfolio applications.',
  ],
  careerRecommendations = [
    'Target Junior Full Stack / Frontend React Developer positions based on skill alignment.',
    'Highlight relevant coursework projects in DBMS, Operating Systems, and Web Engineering.',
  ],
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-indigo-600" /> AI Resume Recommendations
        </h3>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-600">
          Action Plan
        </span>
      </div>

      {/* Formatting & Grammar */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Formatting & Grammar Optimization
        </h4>
        <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
          {formattingFeedback.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* Project & Experience */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" /> Portfolio & Project Enhancement
        </h4>
        <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
          {projectSuggestions.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Career Guidance */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-indigo-600" /> Targeted Career Alignment
        </h4>
        <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
          {careerRecommendations.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationCard;
