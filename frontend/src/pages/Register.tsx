import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  Calendar,
  Building2,
  BookOpen,
  GraduationCap,
  Globe,
  Code2,
  UserCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const registerSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[+]?[\d\s-]{8,20}$/, 'Invalid phone number format (e.g. +1234567890)'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    collegeName: z.string().min(1, 'College name is required'),
    department: z.string().min(1, 'Department is required'),
    graduationYear: z
      .number({ message: 'Graduation year is required' })
      .min(1950, 'Graduation year must be after 1950')
      .max(2100, 'Graduation year must be before 2100'),
    linkedinUrl: z
      .string()
      .min(1, 'LinkedIn URL is required')
      .refine((val) => val.toLowerCase().includes('linkedin'), {
        message: 'Must be a valid LinkedIn URL (e.g., https://linkedin.com/in/username)',
      }),
    githubUrl: z
      .string()
      .min(1, 'GitHub URL is required')
      .refine((val) => val.toLowerCase().includes('github'), {
        message: 'Must be a valid GitHub URL (e.g., https://github.com/username)',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        collegeName: data.collegeName,
        department: data.department,
        graduationYear: data.graduationYear,
        linkedinUrl: data.linkedinUrl,
        githubUrl: data.githubUrl,
      });
      navigate('/login');
    } catch {
      // Handled by AuthContext via react-hot-toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-6">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-2 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
          <GraduationCap className="h-6 w-6" />
        </div>
        <span className="font-bold text-slate-800 text-lg">Student AI Mentor</span>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Create an Account</h2>
        <p className="mt-1 text-sm text-slate-600">Fill in your academic details to register for Student AI Mentor.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <UserIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                {...register('fullName')}
                placeholder="Alex Johnson"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.fullName ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.fullName && <p className="mt-1 text-[11px] text-red-600">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                {...register('email')}
                placeholder="alex@college.edu"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.email ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email.message}</p>}
          </div>
        </div>

        {/* Password & Password Confirm Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Min 8 characters"
                className={`w-full rounded-xl border bg-white pl-9 pr-9 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.password ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-[11px] text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Re-enter password"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-[11px] text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Phone & Date of Birth Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="text"
                {...register('phoneNumber')}
                placeholder="+1234567890"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.phoneNumber ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.phoneNumber && <p className="mt-1 text-[11px] text-red-600">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="date"
                {...register('dateOfBirth')}
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.dateOfBirth && <p className="mt-1 text-[11px] text-red-600">{errors.dateOfBirth.message}</p>}
          </div>
        </div>

        {/* College & Department Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">College Name *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Building2 className="h-4 w-4" />
              </div>
              <input
                type="text"
                {...register('collegeName')}
                placeholder="State University"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.collegeName ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.collegeName && <p className="mt-1 text-[11px] text-red-600">{errors.collegeName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <input
                type="text"
                {...register('department')}
                placeholder="Computer Science"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.department ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.department && <p className="mt-1 text-[11px] text-red-600">{errors.department.message}</p>}
          </div>
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <input
              type="number"
              {...register('graduationYear', { valueAsNumber: true })}
              placeholder="2026"
              className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                errors.graduationYear ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.graduationYear && <p className="mt-1 text-[11px] text-red-600">{errors.graduationYear.message}</p>}
        </div>

        {/* LinkedIn & GitHub URL Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Globe className="h-4 w-4" />
              </div>
              <input
                type="text"
                {...register('linkedinUrl')}
                placeholder="https://linkedin.com/in/alex"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.linkedinUrl ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.linkedinUrl && <p className="mt-1 text-[11px] text-red-600">{errors.linkedinUrl.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Code2 className="h-4 w-4" />
              </div>
              <input
                type="text"
                {...register('githubUrl')}
                placeholder="https://github.com/alex"
                className={`w-full rounded-xl border bg-white pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden transition-all ${
                  errors.githubUrl ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.githubUrl && <p className="mt-1 text-[11px] text-red-600">{errors.githubUrl.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-60 cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <UserCheck className="h-4 w-4" /> Create Account
            </>
          )}
        </button>
      </form>

      {/* Already Have Account */}
      <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
