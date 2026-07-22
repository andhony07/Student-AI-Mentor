// ─── GitHub Types ────────────────────────────────────────────

export interface GitHubRepo {
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
}

export type GithubRepository = GitHubRepo;

export interface GitHubProfile {
  githubUsername: string;
  githubUrl: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  repositories: GitHubRepo[];
  lastFetched: string;
}

export type GithubProfileData = GitHubProfile;

export interface GitHubProfileResponse {
  status: string;
  message: string;
  data: GitHubProfile;
}

export type GithubProfileResponse = GitHubProfileResponse;

export interface GithubSyncResponse {
  status: string;
  message: string;
  data: GitHubProfile;
}
