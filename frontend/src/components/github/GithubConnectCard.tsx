import React, { useState } from 'react';
import { Code2, RefreshCw, ExternalLink, Unlink } from 'lucide-react';
import type { GithubProfileData } from '../../types/github.types';

interface GithubConnectCardProps {
  profileData: GithubProfileData | null;
  onSync: () => Promise<void>;
  onConnect: (username: string) => Promise<void>;
  onDisconnect: () => void;
  isSyncing: boolean;
}

const GithubConnectCard: React.FC<GithubConnectCardProps> = ({
  profileData,
  onSync,
  onConnect,
  onDisconnect,
  isSyncing,
}) => {
  const [usernameInput, setUsernameInput] = useState('');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      onConnect(usernameInput.trim());
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-slate-900 text-white">
            <Code2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">GitHub Account</h3>
            <p className="text-[11px] text-slate-500">Integration Status</p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
            profileData?.githubUsername
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {profileData?.githubUsername ? 'Connected' : 'Not Connected'}
        </span>
      </div>

      {profileData?.githubUsername ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {profileData.avatarUrl ? (
              <img
                src={profileData.avatarUrl}
                alt={profileData.githubUsername}
                className="h-11 w-11 rounded-full border border-slate-200"
              />
            ) : (
              <div className="h-11 w-11 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                {profileData.githubUsername[0]?.toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 text-sm truncate">
                @{profileData.githubUsername}
              </h4>
              {profileData.githubUrl && (
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 mt-0.5"
                >
                  View Profile <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-black transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> Sync Data
            </button>
            <button
              onClick={onDisconnect}
              className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Disconnect Account"
            >
              <Unlink className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleConnect} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Enter GitHub Username
          </label>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="e.g. torvalds"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-slate-900 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={!usernameInput.trim() || isSyncing}
            className="w-full rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-black transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          >
            Connect GitHub Account
          </button>
        </form>
      )}
    </div>
  );
};

export default GithubConnectCard;
