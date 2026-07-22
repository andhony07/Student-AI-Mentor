import React from 'react';
import { Award, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface StatisticsCardProps {
  stats?: {
    completionRate?: number;
    quizScoreAvg?: number;
    assignmentScoreAvg?: number;
    attendanceAvg?: number;
  } | null;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Completion Rate',
      value: stats?.completionRate !== undefined ? `${stats.completionRate}%` : '85%',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Quiz Score Avg',
      value: stats?.quizScoreAvg !== undefined ? `${stats.quizScoreAvg}%` : '91%',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Assignment Avg',
      value: stats?.assignmentScoreAvg !== undefined ? `${stats.assignmentScoreAvg}%` : '88%',
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Attendance Rate',
      value: stats?.attendanceAvg !== undefined ? `${stats.attendanceAvg}%` : '95%',
      icon: Clock,
      color: 'bg-cyan-50 text-cyan-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500">{c.title}</span>
              <div className={`p-2 rounded-xl ${c.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-slate-900">{c.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsCard;
