import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Menu, X, Info, Mail } from 'lucide-react';
import NotificationButton from './NotificationButton';
import ProfileDropdown from './ProfileDropdown';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Brand Logo & Toggle Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-bold text-slate-800 text-base sm:text-lg tracking-tight">
            Student <span className="text-blue-600">AI Mentor</span>
          </span>
        </NavLink>
      </div>

      {/* Right: Nav Links, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600 border-r border-slate-200 pr-5">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              alert("Student AI Mentor — Intelligent Learning & Career Platform");
            }}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
          >
            <Info className="h-3.5 w-3.5" /> About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              alert("Contact Support: support@studentaimentor.edu");
            }}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" /> Contact
          </a>
        </nav>

        <NotificationButton />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
