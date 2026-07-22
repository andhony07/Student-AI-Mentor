import React from 'react';
import { Calendar, BarChart3, FileText, Code2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActionCard: React.FC = () => {
  const actions = [
    {
      title: 'Recent Exam Plans',
      desc: 'DBMS & Algorithms Midterm',
      icon: Calendar,
      link: '/dashboard/exams',
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: 'Recent LMS Analysis',
      desc: 'Semester 6 Grades Uploaded',
      icon: BarChart3,
      link: '/dashboard/lms',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Resume ATS Score',
      desc: 'Score: 92% (High Pass Rate)',
      icon: FileText,
      link: '/dashboard/resume',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'GitHub Activity',
      desc: 'Profile & Commits Tracked',
      icon: Code2,
      link: '/dashboard/github',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quick Academic Shortcuts</h3>

      <div className="space-y-2">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              to={act.link}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-slate-50/80 transition-all text-xs group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${act.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">{act.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionCard;
