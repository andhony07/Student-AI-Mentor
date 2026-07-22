import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiSparkles, HiDocumentText, HiCode, HiBriefcase,
  HiChat, HiCalendar, HiAcademicCap, HiArrowRight,
  HiCheck, HiChevronDown, HiStar,
} from 'react-icons/hi';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';

const features = [
  { icon: HiDocumentText, title: 'Resume Analyzer', desc: 'AI-powered resume scoring, ATS analysis, and personalized improvement suggestions.' },
  { icon: HiCode, title: 'GitHub Analyzer', desc: 'Analyze your GitHub profile, repositories, languages, and get AI-driven suggestions.' },
  { icon: HiBriefcase, title: 'Internship Finder', desc: 'Discover internships tailored to your skills with AI-matched job recommendations.' },
  { icon: HiChat, title: 'Daily AI Mentor', desc: 'Get personalized academic guidance with context-aware AI mentoring.' },
  { icon: HiCalendar, title: 'Exam Planner', desc: 'AI-generated study plans, revision schedules, and countdown timers.' },
  { icon: HiAcademicCap, title: 'LMS Analyzer', desc: 'Upload LMS data and get AI insights on your academic performance.' },
];

const steps = [
  { step: '01', title: 'Create Account', desc: 'Sign up with your academic details and GitHub profile.' },
  { step: '02', title: 'Upload Your Data', desc: 'Upload your resume, connect GitHub, and add LMS data.' },
  { step: '03', title: 'Get AI Insights', desc: 'Receive personalized analysis, plans, and recommendations.' },
  { step: '04', title: 'Track Progress', desc: 'Monitor your growth with dashboards and analytics.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'B.Tech CSE Student', text: 'Student AI Mentor helped me improve my resume score from 45 to 92. Got my dream internship!', rating: 5 },
  { name: 'Rahul Kumar', role: 'M.Tech Data Science', text: 'The exam planner feature is incredible. My study efficiency improved by 60%.', rating: 5 },
  { name: 'Ananya Patel', role: 'BCA Final Year', text: 'Daily AI Mentor is like having a personal career coach available 24/7.', rating: 5 },
];

const faqs = [
  { q: 'Is Student AI Mentor free to use?', a: 'Yes, the core features are completely free for all students.' },
  { q: 'How does the Resume Analyzer work?', a: 'Upload your PDF resume and our AI analyzes it for ATS compatibility, skills coverage, formatting, and provides actionable improvement suggestions.' },
  { q: 'Can I use it without a GitHub account?', a: 'Yes! GitHub analysis is optional. All other features work independently.' },
  { q: 'Is my data secure?', a: 'Absolutely. We use JWT authentication, encrypted storage, and never share your data with third parties.' },
  { q: 'Which AI model powers the mentoring?', a: 'We use Google Gemini AI for all analysis, mentoring, and recommendation features.' },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const Landing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <HiSparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">Student AI Mentor</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-surface-950 dark:via-surface-900 dark:to-primary-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <HiSparkles className="w-4 h-4" /> Powered by Google Gemini AI
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            Your AI-Powered<br />
            <span className="gradient-text">Academic Companion</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Resume analysis, exam planning, GitHub insights, internship discovery, and personalized AI mentoring — all in one platform.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/25 transition-all">
              Start for Free <HiArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all">
              Explore Features
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Six powerful AI modules designed to accelerate your academic and career growth.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Get started in four simple steps.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black gradient-text">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-violet-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Why Students Love Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {['AI-powered personalized insights', 'Resume ATS compatibility scoring', 'Smart study plan generation', 'GitHub profile optimization', 'Internship matching', '24/7 AI mentoring support'].map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <HiCheck className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/90 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What Students <span className="gradient-text">Say</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <HiStar key={j} className="w-5 h-5 text-amber-400" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-gray-50 dark:bg-surface-900">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  {faq.q}
                  <HiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Ready to Accelerate Your <span className="gradient-text">Academic Journey</span>?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Join thousands of students already using AI to achieve their goals.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/25 transition-all">
              Get Started for Free <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
