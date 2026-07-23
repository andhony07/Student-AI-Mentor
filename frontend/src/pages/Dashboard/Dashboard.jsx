import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiDocumentText, HiCode, HiBriefcase, HiChat,
  HiCalendar, HiAcademicCap, HiArrowRight, HiSparkles,
  HiTrendingUp
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const modules = [
  { path: '/resume', icon: HiDocumentText, title: 'Resume Assistant', desc: 'Chat about your resume', color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600', key: 'resume' },
  { path: '/github', icon: HiCode, title: 'GitHub Profile', desc: 'Showcase your commits', color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600', key: 'github' },
  { path: '/internships', icon: HiBriefcase, title: 'Career Assistant', desc: 'Find perfect opportunities', color: 'bg-sky-500', lightColor: 'bg-sky-50', textColor: 'text-sky-600', key: 'internships' },
  { path: '/lms', icon: HiAcademicCap, title: 'LMS Assistant', desc: 'Chat about your performance', color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-600', key: 'lms' },
  { path: '/exams', icon: HiCalendar, title: 'Plan Assistant', desc: 'Generate study schedules', color: 'bg-blue-400', lightColor: 'bg-blue-50', textColor: 'text-blue-500', key: 'exams' },
  { path: '/mentor', icon: HiChat, title: 'AI Mentor', desc: 'Your 24/7 personal guide', color: 'bg-indigo-600', lightColor: 'bg-indigo-50', textColor: 'text-indigo-700', key: 'mentor' },
];

const Dashboard = () => {
  const { user } = useAuth();

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
            Your personalized AI command center. Chat with your resume, analyze your academic progress, and plan your career path effortlessly.
          </p>
        </div>
      </motion.div>

      {/* Main Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Your Assistants</h2>
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
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{mod.title}</h3>
                  <p className="text-sm text-slate-500 flex-grow">{mod.desc}</p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    Open Assistant <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
          AI Mentor Tips
        </h2>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">Upload your Resume:</span> Navigate to the Resume Assistant to get personalized tips for interviews and ATS optimizations.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 flex-shrink-0" />
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">Upload LMS Data:</span> Go to the LMS Assistant and ask about your weakest subjects so you can generate a tailored study plan.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 flex-shrink-0" />
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">Prepare for Exams:</span> Create a plan in the Plan Assistant to automatically schedule your study hours based on subjects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
