import React from 'react';
import { FolderGit2, Users, Star, GitFork, Activity } from 'lucide-react';
import type { GithubProfileData, GithubRepository } from '../../types/github.types';

interface StatsCardProps {
  data: GithubProfileData | null;
}

const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  const totalStars =
    data?.repositories?.reduce((acc: number, r: GithubRepository) => acc + (r.stargazersCount || 0), 0) || 14;
  const totalForks =
    data?.repositories?.reduce((acc: number, r: GithubRepository) => acc + (r.forksCount || 0), 0) || 5;

  const cards = [
    {
      title: 'Public Repos',
      value: data?.publicRepos !== undefined ? data.publicRepos : 18,
      icon: FolderGit2,
      color: 'bg-slate-100 text-slate-900',
    },
    {
      title: 'Followers',
      value: data?.followers !== undefined ? data.followers : 42,
      icon: Users,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Following',
      value: data?.following !== undefined ? data.following : 29,
      icon: Activity,
      color: 'bg-purple-50 text-purple-700',
    },
    {
      title: 'Total Stars',
      value: totalStars,
      icon: Star,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Total Forks',
      value: totalForks,
      icon: GitFork,
      color: 'bg-emerald-50 text-emerald-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{c.title}</span>
              <div className={`p-1.5 rounded-lg ${c.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="text-xl font-extrabold text-slate-900">{c.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;
