import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/Cards/GlassCard';
import { getInitials, formatDate } from '../../utils/helpers';
import { HiUser, HiMail, HiAcademicCap, HiCalendar, HiCode, HiLink } from 'react-icons/hi';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <HiUser className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your account details and academic credentials
          </p>
        </div>
      </div>

      {/* Main Avatar & Details Header */}
      <GlassCard className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/20">
          {getInitials(user?.fullName)}
        </div>
        <div className="text-center sm:text-left flex-1 space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.fullName}</h2>
          <p className="text-sm text-indigo-500 font-medium">{user?.collegeName || 'Student'}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </GlassCard>

      {/* Grid of Profile Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Credentials */}
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-3 flex items-center gap-2">
            <HiAcademicCap className="w-5 h-5 text-indigo-500" /> Academic Details
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">College / University</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.collegeName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Department</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.department || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Graduation Year</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.graduationYear || 'N/A'}</p>
            </div>
          </div>
        </GlassCard>

        {/* Contact & Social Links */}
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10 pb-3 flex items-center gap-2">
            <HiLink className="w-5 h-5 text-violet-500" /> Contact & Links
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><HiMail className="w-3 h-3" /> Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><HiCode className="w-3 h-3" /> GitHub Username</p>
              <p className="text-sm font-medium text-indigo-500">{user?.githubUsername || user?.githubUrl || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><HiCalendar className="w-3 h-3" /> Member Since</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.createdAt ? formatDate(user.createdAt) : 'Recently'}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Profile;
