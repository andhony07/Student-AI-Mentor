import axios from '../config/axios.js';

export const getGithubProfile = async (userId) => {
  // Return mock data directly since there is no GithubProfile model
  return {
    githubUsername: 'student-dev-mock',
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
    publicRepos: 18,
    followers: 12,
    following: 15,
    repositories: [
      {
        name: 'student-ai-mentor',
        htmlUrl: 'https://github.com/student-dev-mock/student-ai-mentor',
        description: 'Production-ready backend for Student AI Mentor',
        language: 'JavaScript',
        stargazersCount: 5,
        forksCount: 2
      }
    ],
    lastFetched: new Date()
  };
};

export const syncGithubProfile = async (userId, githubUsername) => {
  // In the future:
  // const response = await axios.get(`https://api.github.com/users/${githubUsername}`, {
  //   headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  // });
  
  return {
    githubUsername,
    avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
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
