import AppError from '../utils/errorHandler.js';

export const getGithubProfile = async (user) => {
  const githubUsername = user?.githubUsername;
  const githubUrl = user?.githubUrl;

  if (!githubUsername) {
    throw new AppError('GitHub username is not available for this user.', 400);
  }

  return {
    githubUsername,
    githubUrl,
    avatarUrl: `https://github.com/${githubUsername}.png`,
    publicRepos: 18,
    followers: 12,
    following: 15,
    repositories: [
      {
        name: 'student-ai-mentor',
        htmlUrl: `https://github.com/${githubUsername}/student-ai-mentor`,
        description: 'Production-ready backend for Student AI Mentor',
        language: 'JavaScript',
        stargazersCount: 5,
        forksCount: 2
      }
    ],
    lastFetched: new Date()
  };
};

export const syncGithubProfile = async (user) => {
  const githubUsername = user?.githubUsername;
  const githubUrl = user?.githubUrl;

  if (!githubUsername) {
    throw new AppError('GitHub username is not available for this user.', 400);
  }

  return {
    githubUsername,
    githubUrl,
    avatarUrl: `https://github.com/${githubUsername}.png`,
    publicRepos: 25,
    followers: 150,
    following: 75,
    repositories: [
      {
        name: 'ai-learning-assistant',
        htmlUrl: `https://github.com/${githubUsername}/ai-learning-assistant`,
        description: 'Mock repository details from sync',
        language: 'JavaScript',
        stargazersCount: 12,
        forksCount: 4
      }
    ],
    lastFetched: new Date()
  };
};
