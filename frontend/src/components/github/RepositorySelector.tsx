import React from 'react';
import { FolderGit2, Star, GitFork } from 'lucide-react';
import type { GithubRepository } from '../../types/github.types';

interface RepositorySelectorProps {
  repositories: GithubRepository[];
  selectedRepo: string | null;
  onSelectRepo: (name: string) => void;
}

const RepositorySelector: React.FC<RepositorySelectorProps> = ({
  repositories,
  selectedRepo,
  onSelectRepo,
}) => {
  if (repositories.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
        <FolderGit2 className="h-4 w-4 text-slate-700" /> Active Repositories ({repositories.length})
      </h3>

      <div className="space-y-1.5 max-h-60 overflow-y-auto chat-scroll pr-1">
        {repositories.map((repo) => (
          <div
            key={repo.name}
            onClick={() => onSelectRepo(repo.name)}
            className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
              selectedRepo === repo.name
                ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="min-w-0 flex-1 pr-2">
              <h4 className="font-bold truncate">{repo.name}</h4>
              <p
                className={`text-[10px] truncate ${
                  selectedRepo === repo.name ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {repo.language || 'Plain Text'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] shrink-0 font-semibold">
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {repo.stargazersCount}
              </span>
              <span className="flex items-center gap-0.5">
                <GitFork className="h-3 w-3" /> {repo.forksCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositorySelector;
