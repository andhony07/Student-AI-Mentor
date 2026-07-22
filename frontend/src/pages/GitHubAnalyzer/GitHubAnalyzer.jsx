import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCode, HiRefresh, HiExternalLink, HiStar, HiCog } from 'react-icons/hi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { githubService } from '../../services/githubService';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

const GitHubAnalyzer = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [errorType, setErrorType] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.githubUsername && !user?.githubUrl) {
      setProfile(null);
      setErrorType('no_username');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorType(null);
      const { data } = await githubService.getProfile();
      setProfile(data?.data || data);
    } catch (err) {
      setProfile(null);
      if (err.response?.status === 404) {
        setErrorType('not_found');
      } else {
        setErrorType('error');
      }
    } finally {
      setLoading(false);
    }
  }, [user?.githubUsername, user?.githubUrl]);

  const handleSync = async () => {
    try {
      setSyncing(true);
      const { data } = await githubService.syncProfile();
      setProfile(data?.data || data);
      setErrorType(null);
      toast.success('GitHub profile synced!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Build language chart
  const langData = profile?.repositories
    ? Object.entries(
        profile.repositories.reduce((acc, r) => {
          if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value }))
    : [];

  if (loading) return <Loader text="Loading GitHub profile..." />;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
            <HiCode className="w-7 h-7 text-slate-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">GitHub Analyzer</h1>
            <p className="text-sm text-slate-500 mt-1">Analyze your GitHub profile and repositories</p>
          </div>
        </div>
        {profile && (
          <PrimaryButton onClick={handleSync} loading={syncing} icon={HiRefresh} variant="outline">
            Sync
          </PrimaryButton>
        )}
      </div>

      {!profile ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          {errorType === 'not_found' ? (
            <EmptyState
              icon={HiCode}
              title="GitHub username not found."
              description="The specified GitHub profile could not be found. Please check your username in settings."
              action={
                <Link to="/settings">
                  <PrimaryButton icon={HiCog}>Go to Settings</PrimaryButton>
                </Link>
              }
            />
          ) : (
            <EmptyState
              icon={HiCode}
              title="Connect your GitHub Profile"
              description="Add your GitHub username or URL in settings to view your profile analysis and repositories."
              action={
                <Link to="/settings">
                  <PrimaryButton icon={HiCog}>Configure in Settings</PrimaryButton>
                </Link>
              }
            />
          )}
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-full -ml-8 -mt-8 z-0" />
            <img src={profile.avatarUrl} alt="GitHub Avatar" className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg relative z-10" />
            <div className="text-center sm:text-left flex-1 relative z-10">
              <h2 className="text-2xl font-bold text-slate-900">{profile.githubUsername}</h2>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl.startsWith('http') ? profile.githubUrl : `https://${profile.githubUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 justify-center sm:justify-start mt-2"
                >
                  View on GitHub <HiExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="flex gap-10 text-center relative z-10 bg-slate-50 py-4 px-8 rounded-2xl border border-slate-100">
              <div>
                <p className="text-3xl font-black text-slate-900">{profile.publicRepos ?? 0}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Repos</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{profile.followers ?? 0}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Followers</p>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{profile.following ?? 0}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Following</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Language Distribution */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Language Distribution</h3>
              {langData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={langData} cx="50%" cy="50%" outerRadius={100} innerRadius={60} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {langData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">No language data available</p>
              )}
            </div>

            {/* Repository Cards */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                Recent Repositories
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {profile.repositories?.length || 0} Total
                </span>
              </h3>
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {profile.repositories?.map((repo, i) => (
                  <motion.a
                    key={i}
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block p-5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">{repo.name}</p>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-1">{repo.description || 'No description provided.'}</p>
                      </div>
                      <HiExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                    </div>
                    <div className="flex items-center gap-5 mt-4">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <HiStar className="w-4 h-4 text-amber-500" /> {repo.stargazersCount}
                      </span>
                      <span className="text-xs font-medium text-slate-600">Forks: {repo.forksCount}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GitHubAnalyzer;
