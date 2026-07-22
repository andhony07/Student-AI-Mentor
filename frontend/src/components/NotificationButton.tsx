import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'AI Study Plan Generated',
      description: 'Your DBMS exam schedule has been updated.',
      time: '10m ago',
    },
    {
      id: '2',
      title: 'New Internship Positions',
      description: '3 new React Developer opportunities matched.',
      time: '1h ago',
    },
    {
      id: '3',
      title: 'LMS Analysis Ready',
      description: 'Your uploaded Excel progress file was processed.',
      time: '2h ago',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
            <h4 className="font-semibold text-xs text-slate-800">Notifications</h4>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
              {notifications.length} New
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center mb-0.5">
                  <p className="font-bold text-slate-800">{n.title}</p>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-500">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
