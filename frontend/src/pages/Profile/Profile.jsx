import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/Cards/GlassCard';
import { getInitials, formatDate } from '../../utils/helpers';
import {
  HiUser,
  HiMail,
  HiAcademicCap,
  HiCalendar,
  HiCode,
  HiLink,
} from 'react-icons/hi';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
          <HiUser className="w-5 h-5 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-black">
            User Profile
          </h1>

          <p className="text-sm text-gray-600">
            View your account details and academic credentials
          </p>
        </div>
      </div>

      {/* Profile Header */}
      <GlassCard className="flex flex-col items-center gap-6 p-6 sm:flex-row">
        <div className="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white shadow-xl rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600">
          {getInitials(user?.fullName)}
        </div>

        <div className="flex-1 space-y-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-black">
            {user?.fullName}
          </h2>

          <p className="font-medium text-blue-600">
            {user?.collegeName || 'Student'}
          </p>

          <p className="text-sm text-gray-600">
            {user?.email}
          </p>
        </div>
      </GlassCard>

      {/* Information Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Academic Details */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="flex items-center gap-2 pb-3 text-lg font-semibold text-black border-b border-gray-200">
            <HiAcademicCap className="w-5 h-5 text-blue-600" />
            Academic Details
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-xs text-gray-500">
                College / University
              </p>

              <p className="font-medium text-black">
                {user?.collegeName || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Department
              </p>

              <p className="font-medium text-black">
                {user?.department || 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Graduation Year
              </p>

              <p className="font-medium text-black">
                {user?.graduationYear || 'N/A'}
              </p>
            </div>

          </div>
        </GlassCard>

        {/* Contact Details */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="flex items-center gap-2 pb-3 text-lg font-semibold text-black border-b border-gray-200">
            <HiLink className="w-5 h-5 text-indigo-600" />
            Contact & Links
          </h3>

          <div className="space-y-4">

            <div>
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <HiMail className="w-3 h-3" />
                Email
              </p>

              <p className="font-medium text-black break-all">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <HiCode className="w-3 h-3" />
                GitHub Username
              </p>

              <p className="font-medium text-blue-600">
                {user?.githubUsername || user?.githubUrl || 'N/A'}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <HiCalendar className="w-3 h-3" />
                Member Since
              </p>

              <p className="font-medium text-black">
                {user?.createdAt
                  ? formatDate(user.createdAt)
                  : 'Recently'}
              </p>
            </div>

          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default Profile;