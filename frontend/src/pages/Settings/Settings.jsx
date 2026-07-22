import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiCog, HiMoon, HiSun, HiUser, HiLockClosed } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { authService } from '../../services/authService';
import GlassCard from '../../components/Cards/GlassCard';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  const {
    register: regProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      collegeName: user?.collegeName || '',
      department: user?.department || '',
      graduationYear: user?.graduationYear || '',
      githubUrl: user?.githubUrl || '',
      linkedinUrl: user?.linkedinUrl || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  const {
    register: regPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
    formState: { errors: errorsPass },
  } = useForm();

  const onUpdateProfile = async (data) => {
    try {
      setSavingProfile(true);
      const res = await authService.updateProfile(data);
      const updatedUser = res.data?.user || res.data;
      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const onChangePassword = async (data) => {
    try {
      setChangingPass(true);
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully!');
      resetPass();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setChangingPass(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <HiCog className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your preferences, profile details, and account security
          </p>
        </div>
      </div>

      {/* Theme Settings */}
      <GlassCard className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
            {isDark ? <HiMoon className="w-6 h-6" /> : <HiSun className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Appearance</h3>
            <p className="text-xs text-gray-500">Currently using {isDark ? 'Dark' : 'Light'} theme</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
        >
          Toggle Theme
        </button>
      </GlassCard>

      {/* Profile Update */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <HiUser className="w-5 h-5 text-indigo-500" /> Update Profile
        </h3>
        <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input {...regProfile('fullName', { required: 'Required' })} className={inputClass} />
              {errorsProfile.fullName && (
                <p className="text-xs text-rose-500 mt-1">{errorsProfile.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input {...regProfile('phoneNumber')} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">College Name</label>
              <input {...regProfile('collegeName')} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
              <input {...regProfile('department')} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Graduation Year</label>
              <input type="number" {...regProfile('graduationYear')} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
              <input {...regProfile('githubUrl')} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
            <input {...regProfile('linkedinUrl')} className={inputClass} />
          </div>

          <div className="flex justify-end pt-2">
            <PrimaryButton type="submit" loading={savingProfile}>
              Save Profile Changes
            </PrimaryButton>
          </div>
        </form>
      </GlassCard>

      {/* Password Change */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <HiLockClosed className="w-5 h-5 text-indigo-500" /> Change Password
        </h3>
        <form onSubmit={handleSubmitPass(onChangePassword)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
              <input
                type="password"
                {...regPass('currentPassword', { required: 'Current password required' })}
                className={inputClass}
              />
              {errorsPass.currentPassword && (
                <p className="text-xs text-rose-500 mt-1">{errorsPass.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">New Password (min 8 chars)</label>
              <input
                type="password"
                {...regPass('newPassword', {
                  required: 'New password required',
                  minLength: { value: 8, message: 'Min 8 characters' },
                })}
                className={inputClass}
              />
              {errorsPass.newPassword && (
                <p className="text-xs text-rose-500 mt-1">{errorsPass.newPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <PrimaryButton type="submit" loading={changingPass} variant="outline">
              Update Password
            </PrimaryButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default Settings;
