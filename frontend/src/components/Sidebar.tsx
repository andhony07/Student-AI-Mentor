import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Calendar,
  Bot,
  Briefcase,
  FolderGit2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, end: true },
    { name: 'LMS Analyzer', path: '/dashboard/lms', icon: BarChart3 },
    { name: 'Resume Analyzer', path: '/dashboard/resume', icon: FileText },
    { name: 'Exam Planner', path: '/dashboard/exams', icon: Calendar },
    { name: 'AI Mentor', path: '/dashboard/mentor', icon: Bot },
    { name: 'Internship Finder', path: '/dashboard/internships', icon: Briefcase },
    { name: 'GitHub Analysis', path: '/dashboard/github', icon: FolderGit2 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-3">
      <div className="space-y-1">
        {/* Collapse button for desktop */}
        <div className="hidden md:flex items-center justify-between px-3 py-2 text-slate-400">
          {!isCollapsed && (
            <span className="text-[11px] font-semibold tracking-wider uppercase">Navigation</span>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors ml-auto cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                title={isCollapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner */}
      {!isCollapsed && (
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-3.5 text-xs text-blue-900 mt-6">
          <p className="font-bold text-slate-800">Student AI Portal</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            24/7 intelligent tutoring & career guidance active.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 shrink-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex"
          onClick={onCloseMobile}
        >
          <div
            className="w-64 bg-white h-full shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
