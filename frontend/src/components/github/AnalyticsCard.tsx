import React from 'react';
import { FolderGit2, Star, GitFork, ExternalLink } from 'lucide-react';
import type { GithubRepository } from '../../types/github.types';

interface AnalyticsCardProps {
  repositories: GithubRepository[];
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ repositories }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
        <FolderGit2 className="h-4 w-4 text-slate-900" /> Recent Repositories Breakdown
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {repositories.map((repo, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-2 flex flex-col justify-between hover:border-slate-400 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs truncate max-w-[180px]">
                  {repo.name}
                </h4>
                {repo.htmlUrl && (
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-700 p-0.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {repo.description || 'No description provided.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-600">
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5">
                {repo.language || 'Plain Text'}
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {repo.stargazersCount}
                </span>
                <span className="flex items-center gap-0.5">
                  <GitFork className="h-3 w-3 text-slate-400" /> {repo.forksCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;
