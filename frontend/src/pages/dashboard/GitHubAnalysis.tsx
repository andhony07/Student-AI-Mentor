import React, { useState, useEffect, useCallback } from 'react';
import { Code2, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import GithubConnectCard from '../../components/github/GithubConnectCard';
import RepositorySelector from '../../components/github/RepositorySelector';
import StatsCard from '../../components/github/StatsCard';
import LanguageChart from '../../components/github/LanguageChart';
import ContributionChart from '../../components/github/ContributionChart';
import AnalyticsCard from '../../components/github/AnalyticsCard';
import InsightsCard from '../../components/github/InsightsCard';
import ChatWindow from '../../components/github/ChatWindow';
import GithubService from '../../services/github.service';
import type { GithubProfileData } from '../../types/github.types';
import type { ChatMessage } from '../../types/mentor.types';
import toast from 'react-hot-toast';

const fallbackProfile: GithubProfileData = {
  githubUsername: 'student-dev',
  githubUrl: 'https://github.com',
  avatarUrl: 'https://github.com/identicons/student-dev.png',
  publicRepos: 18,
  followers: 42,
  following: 29,
  repositories: [
    {
      name: 'student-ai-mentor',
      htmlUrl: 'https://github.com',
      description: 'AI-Powered Student Career & Exam Mentorship Platform built with React & Express.',
      language: 'TypeScript',
      stargazersCount: 8,
      forksCount: 3,
    },
    {
      name: 'lms-analytics-engine',
      htmlUrl: 'https://github.com',
      description: 'Automated Excel grade parsing & performance analysis engine using Python & Gemini.',
      language: 'Python',
      stargazersCount: 4,
      forksCount: 1,
    },
    {
      name: 'resume-ats-scanner',
      htmlUrl: 'https://github.com',
      description: 'PDF text extraction & keyword matching algorithm for ATS pass rate scoring.',
      language: 'JavaScript',
      stargazersCount: 2,
      forksCount: 1,
    },
  ],
  lastFetched: new Date().toISOString(),
};

const GitHubAnalysis: React.FC = () => {
  const [profileData, setProfileData] = useState<GithubProfileData | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  // Fetch GitHub profile analytics from backend
  const fetchAnalyticsData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const data = await GithubService.fetchAnalytics();
      if (data) {
        setProfileData(data);
        if (data.repositories?.length > 0) {
          setSelectedRepo(data.repositories[0].name);
        }
      } else {
        setProfileData(fallbackProfile);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg =
        error.response?.data?.message ||
        error.message ||
        'GitHub username not set in profile. Displaying sample repository metrics.';
      toast.error(msg);
      setProfileData(fallbackProfile);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Sync profile data via POST /api/github/sync
  const handleSyncProfile = async () => {
    setIsSyncing(true);
    try {
      const res = await GithubService.syncProfile();
      if (res?.data) {
        setProfileData(res.data);
      }
      toast.success('GitHub metrics re-synced successfully!');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Failed to sync GitHub data';
      toast.error(msg);
    } finally {
      setIsSyncing(false);
    }
  };

  // Connect custom username
  const handleConnectUser = async (username: string) => {
    setIsSyncing(true);
    try {
      const data = await GithubService.connectGithub(username);
      setProfileData(data);
      toast.success(`Connected to @${username}`);
    } catch {
      toast.error(`Failed to fetch profile for @${username}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Disconnect
  const handleDisconnect = () => {
    setProfileData(null);
    setSelectedRepo(null);
    toast.success('Disconnected GitHub account state.');
  };

  // AI Chat handler
  const handleSendMessage = async (question: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsChatting(true);

    try {
      const res = await GithubService.chat(question);
      const aiAnswer = res.answer || 'GitHub AI response complete.';
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiAnswer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Failed to send query.';
      toast.error(msg);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="GitHub Analysis"
        description="Analyze your GitHub profile, repositories, coding activity, and receive AI-powered insights."
        icon={Code2}
        action={
          <button
            onClick={handleSyncProfile}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition-colors shadow-md cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
        }
      />

      {/* Main 3-Column Layout: Desktop / Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Account Connection & Repo Selector (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <GithubConnectCard
            profileData={profileData}
            onSync={handleSyncProfile}
            onConnect={handleConnectUser}
            onDisconnect={handleDisconnect}
            isSyncing={isSyncing}
          />
          <RepositorySelector
            repositories={profileData?.repositories || []}
            selectedRepo={selectedRepo}
            onSelectRepo={setSelectedRepo}
          />
        </div>

        {/* Center Panel: Stats, Language Chart, Commit Timeline, Repos (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <StatsCard data={profileData} />
          <LanguageChart repositories={profileData?.repositories || []} />
          <ContributionChart />
          <AnalyticsCard repositories={profileData?.repositories || []} />
        </div>

        {/* Right Panel: Insights & Chat Window (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <InsightsCard />
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isChatting}
            title="GitHub AI Assistant"
            subtitle="Ask questions about your repositories & commit patterns"
          />
        </div>
      </div>
    </div>
  );
};

export default GitHubAnalysis;
