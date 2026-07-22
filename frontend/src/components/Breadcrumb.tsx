import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const location = useLocation();

  const getAutoBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Dashboard', path: '/dashboard' }];

    if (segments.length > 1) {
      const routeNameMap: Record<string, string> = {
        lms: 'LMS Analyzer',
        resume: 'Resume Analyzer',
        exams: 'Exam Planner',
        mentor: 'AI Mentor',
        internships: 'Internship Finder',
        github: 'GitHub Analysis',
        settings: 'Settings',
      };

      const currentSegment = segments[1];
      const label = routeNameMap[currentSegment] || currentSegment.toUpperCase();
      breadcrumbs.push({ label, path: location.pathname });
    }

    return breadcrumbs;
  };

  const list = items || getAutoBreadcrumbs();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {list.map((item, index) => {
        const isLast = index === list.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            {isLast || !item.path ? (
              <span className="font-semibold text-slate-800">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-blue-600 transition-colors font-medium">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
