import axios from 'axios';
import AppError from '../utils/errorHandler.js';

export const getGithubProfile = async (user) => {
  const githubUsername = user?.githubUsername;
  const githubUrl = user?.githubUrl;

  if (!githubUsername) {
    throw new AppError('GitHub username is not available for this user.', 400);
  }

  try {
    const profileResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`);
    
    return {
      githubUsername,
      githubUrl,
      avatarUrl: profileResponse.data.avatar_url,
      publicRepos: profileResponse.data.public_repos,
      followers: profileResponse.data.followers,
      following: profileResponse.data.following,
      repositories: reposResponse.data.map(repo => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count
      })),
      lastFetched: new Date()
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new AppError('GitHub username not found.', 404);
    }
    const status = error.response?.status || 500;
    const msg = error.response?.data?.message || 'Failed to fetch GitHub profile. Please check if the username is correct.';
    throw new AppError(msg, status);
  }
};

export const syncGithubProfile = async (user) => {
  return await getGithubProfile(user);
};
