import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi';
import Select from 'react-select';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Information Technology', label: 'Information Technology' },
  { value: 'Electronics & Communication', label: 'Electronics & Communication' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Aerospace Engineering', label: 'Aerospace Engineering' }
];

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { confirmPassword, departmentObj, ...userData } = data;
      userData.department = departmentObj.value;
      await registerUser(userData);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm shadow-sm';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200 p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100">
            <HiSparkles className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create Account</h1>
          <p className="text-sm text-slate-500">Join Student AI Mentor today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
            <input placeholder="John Doe" {...register('fullName', { required: 'Full name is required' })} className={inputClass} />
            {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
            <input type="email" placeholder="you@example.com" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} className={inputClass} />
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password *</label>
              <input type="password" placeholder="Min 8 chars" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })} className={inputClass} />
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm Password *</label>
              <input type="password" placeholder="Repeat" {...register('confirmPassword', { required: 'Required', validate: (v) => v === password || 'Passwords do not match' })} className={inputClass} />
              {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
              <input placeholder="+91 9876543210" {...register('phoneNumber', { required: 'Phone is required' })} className={inputClass} />
              {errors.phoneNumber && <p className="text-xs text-rose-500 mt-1">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date of Birth *</label>
              <input type="date" {...register('dateOfBirth', { required: 'DOB is required' })} className={inputClass} />
              {errors.dateOfBirth && <p className="text-xs text-rose-500 mt-1">{errors.dateOfBirth.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">College Name *</label>
            <input placeholder="MIT, Harvard, IIT..." {...register('collegeName', { required: 'College name is required' })} className={inputClass} />
            {errors.collegeName && <p className="text-xs text-rose-500 mt-1">{errors.collegeName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Department *</label>
              <Controller
                name="departmentObj"
                control={control}
                rules={{ required: 'Department is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={DEPARTMENTS}
                    className="text-sm shadow-sm"
                    classNamePrefix="select"
                    placeholder="Search dept..."
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderRadius: '0.75rem',
                        padding: '2px',
                        borderColor: state.isFocused ? '#3b82f6' : '#e2e8f0',
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.25)' : 'none',
                        '&:hover': {
                          borderColor: '#3b82f6'
                        }
                      }),
                    }}
                  />
                )}
              />
              {errors.departmentObj && <p className="text-xs text-rose-500 mt-1">{errors.departmentObj.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Graduation Year *</label>
              <input type="number" placeholder="2026" {...register('graduationYear', { required: 'Year is required', min: { value: 1950, message: 'Invalid' }, max: { value: 2100, message: 'Invalid' } })} className={inputClass} />
              {errors.graduationYear && <p className="text-xs text-rose-500 mt-1">{errors.graduationYear.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">LinkedIn URL *</label>
            <input placeholder="https://linkedin.com/in/username" {...register('linkedinUrl', { required: 'LinkedIn URL is required' })} className={inputClass} />
            {errors.linkedinUrl && <p className="text-xs text-rose-500 mt-1">{errors.linkedinUrl.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">GitHub URL *</label>
            <input placeholder="https://github.com/username" {...register('githubUrl', { required: 'GitHub URL is required' })} className={inputClass} />
            {errors.githubUrl && <p className="text-xs text-rose-500 mt-1">{errors.githubUrl.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
