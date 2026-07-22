import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl p-1.5 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="User Profile Menu"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs shadow-xs">
          {user?.fullName?.charAt(0).toUpperCase() || 'S'}
        </div>
        <span className="hidden sm:inline font-semibold text-xs text-slate-800 max-w-[120px] truncate">
          {user?.fullName || 'Student'}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="font-bold text-xs text-slate-800 truncate">{user?.fullName || 'Student'}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email || 'student@college.edu'}</p>
            {user?.collegeName && (
              <p className="text-[10px] text-blue-600 font-medium truncate mt-0.5">{user.collegeName}</p>
            )}
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                alert(`Student Profile Info:\nName: ${user?.fullName}\nEmail: ${user?.email}\nCollege: ${user?.collegeName}\nDept: ${user?.department || 'N/A'}`);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
            >
              <UserIcon className="h-4 w-4 text-slate-500" /> Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/dashboard/settings');
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
            >
              <Settings className="h-4 w-4 text-slate-500" /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer font-medium"
            >
              <LogOut className="h-4 w-4 text-red-500" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
