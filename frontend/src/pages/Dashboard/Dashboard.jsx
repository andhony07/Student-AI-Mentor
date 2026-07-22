import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiDocumentText, HiCode, HiBriefcase, HiChat,
  HiCalendar, HiAcademicCap, HiArrowRight, HiSparkles,
  HiTrendingUp
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { githubService } from '../../services/githubService';
import { resumeService } from '../../services/resumeService';
import { examService } from '../../services/examService';
import { internshipService } from '../../services/internshipService';
import { lmsService } from '../../services/lmsService';

const modules = [
  { path: '/resume', icon: HiDocumentText, title: 'Resume Analyzer', desc: 'Optimize your ATS score', color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600', key: 'resume' },
  { path: '/github', icon: HiCode, title: 'GitHub Profile', desc: 'Showcase your commits', color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600', key: 'github' },
  { path: '/internships', icon: HiBriefcase, title: 'Internships', desc: 'Find perfect opportunities', color: 'bg-sky-500', lightColor: 'bg-sky-50', textColor: 'text-sky-600', key: 'internships' },
  { path: '/lms', icon: HiAcademicCap, title: 'LMS Analytics', desc: 'Track your performance', color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-600', key: 'lms' },
  { path: '/exams', icon: HiCalendar, title: 'Exam Planner', desc: 'Generate study schedules', color: 'bg-blue-400', lightColor: 'bg-blue-50', textColor: 'text-blue-500', key: 'exams' },
  { path: '/mentor', icon: HiChat, title: 'AI Mentor', desc: 'Your 24/7 personal guide', color: 'bg-indigo-600', lightColor: 'bg-indigo-50', textColor: 'text-indigo-700', key: 'mentor' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    resumeScore: null,
    githubRepos: null,
    internships: null,
    examDays: null,
    lmsAverage: null
  });

  const loadDashboardData = useCallback(async () => {
    const promises = [
      resumeService.analyze().catch(() => null),
      user?.githubUsername ? githubService.getProfile().catch(() => null) : Promise.resolve(null),
      internshipService.getAll().catch(() => null),
      examService.getPlan().catch(() => null),
      lmsService.analyze().catch(() => null),
    ];

    const [resumeRes, githubRes, internshipRes, examRes, lmsRes] = await Promise.all(promises);

    const newStats = {
      resumeScore: resumeRes?.data?.data?.overallScore || resumeRes?.data?.overallScore || null,
      githubRepos: githubRes?.data?.data?.publicRepos || githubRes?.data?.publicRepos || null,
      internships: internshipRes?.data?.data?.length || internshipRes?.data?.length || null,
      examDays: null,
      lmsAverage: null
    };

    if (examRes?.data) {
      const plan = examRes.data.data || examRes.data;
      if (plan?.examDate) {
        const days = Math.ceil((new Date(plan.examDate) - new Date()) / 86400000);
        newStats.examDays = days > 0 ? `${days}d` : 'Past';
      }
    }

    if (lmsRes?.data) {
      const analysis = lmsRes.data.data || lmsRes.data;
      if (analysis?.overallProgress) {
        newStats.lmsAverage = analysis.overallProgress;
      }
    }

    setStats(newStats);
  }, [user?.githubUsername]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const renderStat = (key) => {
    const val = stats[key];
    if (val === null || val === undefined) return 'Not configured';
    if (key === 'resumeScore') return `${val}/100`;
    if (key === 'githubRepos') return `${val} repos`;
    if (key === 'internships') return `${val} saved`;
    if (key === 'lmsAverage') return `${val}% avg`;
    return val;
  };

  const getModuleStat = (modKey) => {
    switch (modKey) {
      case 'resume': return renderStat('resumeScore');
      case 'github': return renderStat('githubRepos');
      case 'internships': return renderStat('internships');
      case 'exams': return renderStat('examDays');
      case 'lms': return renderStat('lmsAverage');
      case 'mentor': return 'Ready';
      default: return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white shadow-xl shadow-blue-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-sm">
              <HiSparkles className="w-4 h-4 text-blue-100" />
              <span className="text-xs font-semibold tracking-wider text-blue-50 uppercase">Student AI Mentor</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Welcome back, {user?.fullName?.split(' ')[0]}! 👋
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-xl leading-relaxed">
            Your personalized AI command center. Analyze your resume, track academic progress, and plan your career path all in one place.
          </p>
        </div>
      </motion.div>

      {/* Main Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Your Modules</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={mod.path} 
                className="group block h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${mod.lightColor} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 opacity-50`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${mod.lightColor} ${mod.textColor} flex items-center justify-center`}>
                      <mod.icon className="w-7 h-7" />
                    </div>
                    <div className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      <span className="text-xs font-semibold text-slate-600">
                        {getModuleStat(mod.key)}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{mod.title}</h3>
                  <p className="text-sm text-slate-500 flex-grow">{mod.desc}</p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Open Module <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Insights Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <HiTrendingUp className="w-6 h-6 text-indigo-500" />
          Quick AI Insights
        </h2>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <p className="text-slate-600">
                Your ATS Resume score is currently <span className="font-semibold text-slate-900">{stats.resumeScore || 'pending calculation'}</span>. Upload your latest resume version to unlock tailored AI interview prep questions.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 flex-shrink-0" />
              <p className="text-slate-600">
                You have saved <span className="font-semibold text-slate-900">{stats.internships || 'no'}</span> internships. The AI Mentor suggests reviewing your GitHub profile to align with target roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
