import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';

import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ResumeAnalyzer from '../pages/ResumeAnalyzer/ResumeAnalyzer';
import GitHubAnalyzer from '../pages/GitHubAnalyzer/GitHubAnalyzer';
import InternshipFinder from '../pages/InternshipFinder/InternshipFinder';
import DailyMentor from '../pages/DailyMentor/DailyMentor';
import ExamPlanner from '../pages/ExamPlanner/ExamPlanner';
import LMSAnalyzer from '../pages/LMSAnalyzer/LMSAnalyzer';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import NotFound from '../pages/NotFound/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/github" element={<GitHubAnalyzer />} />
          <Route path="/internships" element={<InternshipFinder />} />
          <Route path="/mentor" element={<DailyMentor />} />
          <Route path="/exams" element={<ExamPlanner />} />
          <Route path="/lms" element={<LMSAnalyzer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
