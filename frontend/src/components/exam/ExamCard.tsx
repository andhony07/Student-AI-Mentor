import React from 'react';
import { Calendar, Clock, BookOpen, Edit2, Trash2 } from 'lucide-react';
import type { ExamSubject } from '../../types/exam.types';

interface ExamCardProps {
  id?: string;
  examName: string;
  examDate: string;
  dailyStudyHours: number;
  subjects: ExamSubject[];
  priority?: 'High' | 'Medium' | 'Low';
  onEdit?: () => void;
  onDelete?: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({
  examName,
  examDate,
  dailyStudyHours,
  subjects,
  priority = 'High',
  onEdit,
  onDelete,
}) => {
  const priorityColors = {
    High: 'bg-red-50 text-red-700 border-red-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${priorityColors[priority]}`}>
            {priority} Priority
          </span>
          <h3 className="font-bold text-slate-900 text-sm mt-1">{examName}</h3>
        </div>

        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              title="Edit Exam"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 cursor-pointer"
              title="Delete Exam"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-cyan-600" /> {examDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-slate-400" /> {dailyStudyHours} hrs/day
        </span>
      </div>

      {/* Subjects & Topics */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <h4 className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
          <BookOpen className="h-3 w-3 text-cyan-600" /> Subjects ({subjects.length})
        </h4>
        <div className="space-y-1">
          {subjects.map((sub, idx) => (
            <div key={idx} className="text-xs">
              <span className="font-semibold text-slate-800">{sub.subject}:</span>{' '}
              <span className="text-slate-500">{sub.topics.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
