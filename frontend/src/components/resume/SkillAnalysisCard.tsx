import React from 'react';
import { Code, HeartHandshake, AlertCircle } from 'lucide-react';

interface SkillAnalysisCardProps {
  technicalSkills?: string[];
  softSkills?: string[];
  missingSkills?: string[];
}

const SkillAnalysisCard: React.FC<SkillAnalysisCardProps> = ({
  technicalSkills = ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Git'],
  softSkills = ['Problem Solving', 'Team Leadership', 'Agile/Scrum', 'Technical Communication'],
  missingSkills = ['Docker', 'AWS/GCP Basics', 'CI/CD Pipelines', 'Jest/Unit Testing'],
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Skill Breakdown & Keyword Audit</h3>

      {/* Technical Skills */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Code className="h-3.5 w-3.5 text-indigo-600" /> Technical Skills Identified
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {technicalSkills.map((sk, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-800"
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <HeartHandshake className="h-3.5 w-3.5 text-purple-600" /> Soft & Professional Skills
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {softSkills.map((sk, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-purple-50 border border-purple-100 px-2.5 py-0.5 text-[11px] font-semibold text-purple-800"
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 text-amber-600" /> Recommended ATS Keywords to Add
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {missingSkills.map((sk, idx) => (
            <span
              key={idx}
              className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900"
            >
              + {sk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysisCard;
