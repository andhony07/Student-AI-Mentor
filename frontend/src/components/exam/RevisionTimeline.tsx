import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

const RevisionTimeline: React.FC = () => {
  const weeks = [
    {
      week: 'Week 1: Core Foundation',
      status: 'Completed',
      topics: ['Array & Linked List Basics', 'OS Processes & Threads', 'SQL SELECT & JOINs'],
    },
    {
      week: 'Week 2: Advanced Topics',
      status: 'In Progress',
      topics: ['Trees, Graphs & BFS/DFS', 'OS Memory Paging', 'DBMS Normalization (1NF to 3NF)'],
    },
    {
      week: 'Week 3: Intensive Revision & Mock Exams',
      status: 'Upcoming',
      topics: ['Dynamic Programming Review', 'Past Exam Paper Solutions', 'Final Practice Quizzes'],
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
        <Calendar className="h-4 w-4 text-cyan-600" /> Weekly Revision Timeline
      </h3>

      <div className="relative border-l-2 border-slate-200 ml-3 space-y-5 pl-4 py-1">
        {weeks.map((w, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[25px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-cyan-600">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-xs">{w.week}</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  w.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700'
                    : w.status === 'In Progress'
                    ? 'bg-cyan-50 text-cyan-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {w.status}
              </span>
            </div>

            <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
              {w.topics.map((t, tIdx) => (
                <li key={tIdx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-cyan-500 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevisionTimeline;
