import apiClient from '../api/axios';
import type {
  ResumeUploadResponse,
  ResumeAnalysisResponse,
  ResumeChatPayload,
  ResumeChatResponse,
} from '../types/resume.types';

const ResumeService = {
  uploadResume: async (file: File): Promise<ResumeUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post<ResumeUploadResponse>('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  upload: async (file: File): Promise<ResumeUploadResponse> => {
    return ResumeService.uploadResume(file);
  },

  analyzeResume: async (): Promise<ResumeAnalysisResponse> => {
    const { data } = await apiClient.get<ResumeAnalysisResponse>('/resume/analyze');
    return data;
  },

  analyze: async (): Promise<ResumeAnalysisResponse> => {
    return ResumeService.analyzeResume();
  },

  chat: async (payload: ResumeChatPayload | string): Promise<ResumeChatResponse> => {
    const body = typeof payload === 'string' ? { question: payload } : payload;
    const { data } = await apiClient.post<ResumeChatResponse>('/resume/chat', body);
    return data;
  },

  getHistory: async (): Promise<ResumeAnalysisResponse> => {
    return ResumeService.analyzeResume();
  },
};

export default ResumeService;
