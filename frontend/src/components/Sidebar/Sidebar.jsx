import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiHome,
  HiDocumentText,
  HiCode,
  HiBriefcase,
  HiChat,
  HiCalendar,
  HiAcademicCap,
  HiUser,
  HiCog,
  HiInformationCircle,
  HiMail,
  HiChevronLeft,
  HiChevronRight,
  HiSparkles,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';

const menuItems = [
  { path: '/dashboard', icon: HiHome, label: 'Dashboard' },
  { path: '/resume', icon: HiDocumentText, label: 'Resume Analyzer' },
  { path: '/github', icon: HiCode, label: 'GitHub Analyzer' },
  { path: '/internships', icon: HiBriefcase, label: 'Internship Finder' },
  { path: '/mentor', icon: HiChat, label: 'Daily AI Mentor' },
  { path: '/exams', icon: HiCalendar, label: 'Exam Planner' },
  { path: '/lms', icon: HiAcademicCap, label: 'LMS Analyzer' },
  { divider: true },
  { path: '/profile', icon: HiUser, label: 'Profile' },
  { path: '/settings', icon: HiCog, label: 'Settings' },
  { path: '/about', icon: HiInformationCircle, label: 'About' },
  { path: '/contact', icon: HiMail, label: 'Contact' },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-screen z-40',
        'bg-white dark:bg-surface-900',
        'border-r border-gray-100 dark:border-white/10',
        'flex flex-col',
        'shadow-xl dark:shadow-black/20'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 dark:border-white/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0">
          <HiSparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-gray-900 dark:text-white whitespace-nowrap"
          >
            Student AI Mentor
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) =>
          item.divider ? (
            <div key={idx} className="my-3 border-t border-gray-100 dark:border-white/10" />
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                'group relative',
                location.pathname === item.path
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <item.icon className={cn(
                'w-5 h-5 flex-shrink-0',
                location.pathname === item.path && 'text-indigo-600 dark:text-indigo-400'
              )} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        )}
      </nav>

      {/* Toggle */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-white/10">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-xl text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {collapsed ? <HiChevronRight className="w-5 h-5" /> : <HiChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
