import GlassCard from '../../components/Cards/GlassCard';
import { HiInformationCircle, HiSparkles, HiCode, HiChip, HiUserGroup } from 'react-icons/hi';

const About = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <HiInformationCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About Student AI Mentor</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Empowering students with AI-driven academic and career guidance
          </p>
        </div>
      </div>

      <GlassCard className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <HiSparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-xs text-indigo-500 font-medium">Bridging academia and industry success</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Student AI Mentor is an end-to-end intelligent platform engineered to assist college students at every step of their academic journey. By combining artificial intelligence with personalized analytics, we turn raw resumes, GitHub repositories, and LMS transcripts into clear, actionable career pathways.
        </p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-500 font-semibold text-sm">
            <HiCode className="w-5 h-5" /> Tech Stack
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 list-disc list-inside">
            <li><strong>Frontend:</strong> React JS, Vite, Tailwind CSS v4</li>
            <li><strong>State & Auth:</strong> Context API, JWT Authentication</li>
            <li><strong>Animations:</strong> Framer Motion</li>
            <li><strong>Charts:</strong> Recharts</li>
            <li><strong>Backend:</strong> Node.js, Express.js, MongoDB</li>
          </ul>
        </GlassCard>

        <GlassCard className="space-y-3">
          <div className="flex items-center gap-2 text-violet-500 font-semibold text-sm">
            <HiChip className="w-5 h-5" /> AI Capabilities
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 list-disc list-inside">
            <li><strong>Engine:</strong> Google Gemini 3.6 Flash AI</li>
            <li><strong>Resume ATS:</strong> Structural parsing & scoring</li>
            <li><strong>Exam Planning:</strong> Dynamic study schedules</li>
            <li><strong>Daily Mentor:</strong> Context-aware assistant</li>
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
          <HiUserGroup className="w-5 h-5" /> Core Modules
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 font-medium text-gray-800 dark:text-gray-200">
            📄 Resume Analyzer
          </div>
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 font-medium text-gray-800 dark:text-gray-200">
            🐙 GitHub Insights
          </div>
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 font-medium text-gray-800 dark:text-gray-200">
            💼 Internship Finder
          </div>
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 font-medium text-gray-800 dark:text-gray-200">
            🤖 Daily AI Mentor
          </div>
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 font-medium text-gray-800 dark:text-gray-200">
            📅 Exam Planner
          </div>
          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 font-medium text-gray-800 dark:text-gray-200">
            🎓 LMS Performance
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default About;
