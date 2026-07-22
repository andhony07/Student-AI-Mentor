import apiClient from '../api/axios';
import type {
  GithubProfileResponse,
  GithubSyncResponse,
  GithubProfileData,
} from '../types/github.types';

const GithubService = {
  fetchAnalytics: async (): Promise<GithubProfileData> => {
    const { data } = await apiClient.get<GithubProfileResponse>('/github');
    return data.data;
  },

  getProfile: async (): Promise<GithubProfileResponse> => {
    const { data } = await apiClient.get<GithubProfileResponse>('/github');
    return data;
  },

  fetchRepositories: async (): Promise<GithubProfileData> => {
    return GithubService.fetchAnalytics();
  },

  fetchInsights: async (): Promise<GithubProfileData> => {
    const { data } = await apiClient.post<GithubSyncResponse>('/github/sync');
    return data.data;
  },

  syncProfile: async (): Promise<GithubSyncResponse> => {
    const { data } = await apiClient.post<GithubSyncResponse>('/github/sync');
    return data;
  },

  connectGithub: async (_username: string): Promise<GithubProfileData> => {
    return GithubService.fetchAnalytics();
  },

  disconnectGithub: async (): Promise<{ success: boolean }> => {
    return { success: true };
  },

  chat: async (question: string): Promise<{ answer: string }> => {
    const { data } = await apiClient.post<{ data?: { response?: string }; message?: string }>('/mentor', {
      message: `[GitHub Profile Query] ${question}`,
    });
    return {
      answer: data.data?.response || data.message || 'GitHub AI response received.',
    };
  },

  getHistory: async (): Promise<GithubProfileData> => {
    return GithubService.fetchAnalytics();
  },
};

export default GithubService;
