import api from './api';

export const githubService = {
  getProfile: () => api.get('/github'),
  syncProfile: () => api.post('/github/sync'),
};
