import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Student AI Mentor
              </span>
            </Link>
            <p className="text-slate-500 text-sm">
              Your intelligent companion for academic excellence and career growth.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Modules</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/resume" className="hover:text-blue-600 transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/github" className="hover:text-blue-600 transition-colors">GitHub Analyzer</Link></li>
              <li><Link to="/internships" className="hover:text-blue-600 transition-colors">Internship Finder</Link></li>
              <li><Link to="/lms" className="hover:text-blue-600 transition-colors">LMS Analytics</Link></li>
              <li><Link to="/exams" className="hover:text-blue-600 transition-colors">Exam Planner</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-700 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Student AI Mentor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
