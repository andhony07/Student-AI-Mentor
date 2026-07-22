import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardHome from '../pages/dashboard/DashboardHome';
import LMSAnalyzer from '../pages/dashboard/LMSAnalyzer';
import ResumeAnalyzer from '../pages/dashboard/ResumeAnalyzer';
import ExamPlanner from '../pages/dashboard/ExamPlanner';
import AIMentor from '../pages/dashboard/AIMentor';
import InternshipFinder from '../pages/dashboard/InternshipFinder';
import GitHubAnalysis from '../pages/dashboard/GitHubAnalysis';
import Settings from '../pages/dashboard/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: 'lms',
            element: <LMSAnalyzer />,
          },
          {
            path: 'resume',
            element: <ResumeAnalyzer />,
          },
          {
            path: 'exams',
            element: <ExamPlanner />,
          },
          {
            path: 'mentor',
            element: <AIMentor />,
          },
          {
            path: 'internships',
            element: <InternshipFinder />,
          },
          {
            path: 'github',
            element: <GitHubAnalysis />,
          },
          {
            path: 'profile',
            element: <Settings />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
