import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';

interface CountdownCardProps {
  examName?: string;
  examDate?: string;
}

const CountdownCard: React.FC<CountdownCardProps> = ({
  examName = 'DBMS & Algorithms Final Exam',
  examDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number }>({
    days: 7,
    hours: 12,
    mins: 30,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(examDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, mins });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [examDate]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-950 p-6 text-white shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
          <Sparkles className="h-4 w-4" /> Next Upcoming Exam Countdown
        </div>
        <span className="rounded-full bg-white/10 border border-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white">
          Target: {examDate}
        </span>
      </div>

      <div>
        <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">{examName}</h3>
        <p className="text-xs text-cyan-100/80 mt-0.5 flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> High Priority Assessment
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/10">
          <span className="text-2xl font-extrabold text-white">{timeLeft.days}</span>
          <span className="text-[10px] text-cyan-200 uppercase tracking-wider font-medium">Days</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/10">
          <span className="text-2xl font-extrabold text-white">{timeLeft.hours}</span>
          <span className="text-[10px] text-cyan-200 uppercase tracking-wider font-medium">Hours</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/10 backdrop-blur-md p-3 border border-white/10">
          <span className="text-2xl font-extrabold text-white">{timeLeft.mins}</span>
          <span className="text-[10px] text-cyan-200 uppercase tracking-wider font-medium">Minutes</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownCard;
