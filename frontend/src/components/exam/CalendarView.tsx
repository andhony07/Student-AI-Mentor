import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface CalendarEvent {
  date: number;
  title: string;
  type: 'exam' | 'task' | 'revision';
}

const CalendarView: React.FC = () => {
  const [currentMonth] = useState('July 2026');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const events: CalendarEvent[] = [
    { date: 24, title: 'DBMS Midterm Exam', type: 'exam' },
    { date: 26, title: 'Revise Graphs & DP', type: 'revision' },
    { date: 28, title: 'OS Quiz #3', type: 'task' },
    { date: 30, title: 'Algorithms Final', type: 'exam' },
  ];

  const getEventForDay = (day: number) => {
    return events.filter((e) => e.date === day);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">{currentMonth}</h3>
            <p className="text-[11px] text-slate-500">Monthly Study Schedule & Exam Deadlines</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
        {daysOfWeek.map((d, i) => (
          <div key={i} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-xs">
        {calendarDays.map((day) => {
          const dayEvents = getEventForDay(day);
          const isToday = day === 23;
          return (
            <div
              key={day}
              className={`min-h-[54px] rounded-xl border p-1.5 flex flex-col justify-between transition-all ${
                isToday
                  ? 'border-cyan-500 bg-cyan-50/50 font-bold'
                  : dayEvents.length > 0
                  ? 'border-slate-300 bg-slate-50'
                  : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[11px] ${isToday ? 'text-cyan-700' : 'text-slate-700'}`}>
                {day}
              </span>
              {dayEvents.map((ev, idx) => (
                <span
                  key={idx}
                  className={`block rounded-md px-1 py-0.5 text-[9px] font-semibold truncate ${
                    ev.type === 'exam'
                      ? 'bg-red-100 text-red-800'
                      : ev.type === 'task'
                      ? 'bg-cyan-100 text-cyan-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                  title={ev.title}
                >
                  {ev.title}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      {/* Today's Tasks & Legend */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-red-700 font-semibold">
            <span className="h-2 w-2 rounded-full bg-red-500" /> Exam
          </span>
          <span className="flex items-center gap-1 text-cyan-700 font-semibold">
            <span className="h-2 w-2 rounded-full bg-cyan-500" /> Task
          </span>
          <span className="flex items-center gap-1 text-purple-700 font-semibold">
            <span className="h-2 w-2 rounded-full bg-purple-500" /> Revision
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="h-3.5 w-3.5 text-cyan-600" /> Today's Goal: 4 Hours Study Completed
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
