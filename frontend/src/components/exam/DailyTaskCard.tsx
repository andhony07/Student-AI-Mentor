import React, { useState } from 'react';
import { CheckSquare, Square, Calendar } from 'lucide-react';

interface DailyTask {
  id: string;
  taskName: string;
  duration: string;
  completed: boolean;
}

const DailyTaskCard: React.FC = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([
    { id: '1', taskName: 'DBMS Normalization & 3NF Examples', duration: '1.5 hrs', completed: true },
    { id: '2', taskName: 'Data Structures: Tree Traversals (Inorder/Preorder)', duration: '1.5 hrs', completed: true },
    { id: '3', taskName: 'OS Memory Management Paging Quiz', duration: '1.0 hr', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Today's Study Checklist</h3>
            <p className="text-[11px] text-slate-500">Track daily target goals</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[11px] font-bold text-cyan-700">
            {progressPct}% Done
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
              task.completed
                ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                : 'bg-white border-slate-200 text-slate-800 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              {task.completed ? (
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : (
                <Square className="h-4 w-4 text-slate-400 shrink-0" />
              )}
              <span>{task.taskName}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              {task.duration}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyTaskCard;
