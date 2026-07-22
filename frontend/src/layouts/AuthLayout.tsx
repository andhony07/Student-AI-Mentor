import React from 'react';
import { Outlet } from 'react-router-dom';
import { GraduationCap, Sparkles, BookOpen, Target, Award } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Left Split Banner */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-12 text-white relative overflow-hidden">
        {/* Ambient Glow background shapes */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <GraduationCap className="h-7 w-7 text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Student AI Mentor</h1>
            <p className="text-xs text-blue-200">Personalized Learning & Career Growth Platform</p>
          </div>
        </div>

        {/* Center Illustration & Copy */}
        <div className="relative z-10 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-3 py-1.5 text-xs font-medium text-blue-200 mb-6 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            AI-Powered Student Guidance System
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Supercharge Your Academic & Career Journey
          </h2>
          <p className="text-blue-100/80 text-sm leading-relaxed mb-8">
            Access intelligent LMS analytics, AI resume auditing, automated exam planning, live mentor chat, and personalized internship matching in one platform.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-xs">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">LMS Analytics</h4>
                <p className="text-[11px] text-blue-200">Track course progress</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-xs">
              <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-300">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Exam Planner</h4>
                <p className="text-[11px] text-blue-200">Custom study schedules</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-xs">
              <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-300">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Resume AI</h4>
                <p className="text-[11px] text-blue-200">Instant feedback</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-xs">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Internship Finder</h4>
                <p className="text-[11px] text-blue-200">Matched opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-blue-300/60">
          © {new Date().getFullYear()} Student AI Mentor. Built for Academic Excellence.
        </div>
      </div>

      {/* Right Form Area */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
