import React, { useState } from 'react';
import {
  BarChart3,
  FileText,
  Calendar,
  Bot,
  Briefcase,
  FolderGit2,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import ModuleCard, { type ModuleCardProps } from '../../components/ModuleCard';
import PageHeader from '../../components/PageHeader';
import LoadingCard from '../../components/LoadingCard';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [isLoading] = useState(false);

  const moduleCards: ModuleCardProps[] = [
    {
      id: 'lms',
      title: 'LMS Analyzer',
      description: 'Upload course Excel spreadsheets and interact with AI for performance analytics.',
      path: '/dashboard/lms',
      icon: BarChart3,
      badge: 'Academic Progress',
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-600',
      status: 'Active',
      features: ['Upload XLS spreadsheets', 'Automated performance reports', 'Natural language chat'],
    },
    {
      id: 'resume',
      title: 'Resume Analyzer',
      description: 'Analyze resumes and receive AI feedback, ATS optimization scoring, and suggestions.',
      path: '/dashboard/resume',
      icon: FileText,
      badge: 'Career Ready',
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'bg-indigo-50 text-indigo-600',
      status: 'Active',
      features: ['PDF parser & score', 'ATS feedback & recommendations', 'Resume chat mentor'],
    },
    {
      id: 'exam',
      title: 'Exam Planner',
      description: 'Create customized study schedules, topic roadmaps, and exam reminders.',
      path: '/dashboard/exams',
      icon: Calendar,
      badge: 'Study Schedule',
      color: 'from-cyan-600 to-blue-600',
      bgColor: 'bg-cyan-50 text-cyan-600',
      status: 'Active',
      features: ['AI schedule generator', 'Subject & topic breakdown', 'Interactive plan Q&A'],
    },
    {
      id: 'mentor',
      title: 'AI Mentor',
      description: 'General AI learning assistant for concept explanations, tutoring, and guidance.',
      path: '/dashboard/mentor',
      icon: Bot,
      badge: '24/7 Support',
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-600',
      status: 'Active',
      features: ['Instant concept resolution', 'Daily mentor chat sessions', 'Topic-by-topic guidance'],
    },
    {
      id: 'internship',
      title: 'Internship Finder',
      description: 'Search external internship opportunities matched to your resume and manage applications.',
      path: '/dashboard/internships',
      icon: Briefcase,
      badge: 'Opportunity Engine',
      color: 'from-violet-600 to-purple-600',
      bgColor: 'bg-violet-50 text-violet-600',
      status: 'Active',
      features: ['Live job listings', 'Resume skill matching', 'Application status tracking'],
    },
    {
      id: 'github',
      title: 'GitHub Analysis',
      description: 'Analyze repositories, coding activity, and project insights for your GitHub profile.',
      path: '/dashboard/github',
      icon: FolderGit2,
      badge: 'Code Analytics',
      color: 'from-slate-700 to-slate-900',
      bgColor: 'bg-slate-100 text-slate-800',
      status: 'Active',
      features: ['Public repo analytics', 'Profile sync & stats', 'AI project breakdown'],
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header with Breadcrumb */}
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back to your personalized AI learning and career companion."
        icon={LayoutDashboard}
      />

      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-8 text-white shadow-lg">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-semibold text-blue-200 mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" /> Student AI Mentor Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Student'}! 👋
          </h1>
          <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
            Access intelligent LMS analytics, AI resume scoring, study plan generation, live mentor guidance, and internship matching.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-blue-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>College: {user?.collegeName || 'Enrolled Student'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span>GitHub: {user?.githubUsername || 'Connected'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Six AI Modules</h2>
        <p className="text-xs text-slate-500 mt-1">
          Select any card below to launch the corresponding module.
        </p>
      </div>

      {/* Grid of 6 Professional Module Cards */}
      {isLoading ? (
        <LoadingCard count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((card) => (
            <ModuleCard key={card.id} {...card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
