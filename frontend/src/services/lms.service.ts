import apiClient from '../api/axios';
import type {
  LMSUploadResponse,
  LMSAnalysis,
  LMSChatPayload,
  LMSChatResponse,
} from '../types/lms.types';

const LMSService = {
  uploadExcel: async (file: File): Promise<LMSUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post<LMSUploadResponse>('/lms/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  upload: async (file: File): Promise<LMSUploadResponse> => {
    return LMSService.uploadExcel(file);
  },

  analyze: async (): Promise<LMSAnalysis> => {
    const { data } = await apiClient.get<LMSAnalysis>('/lms/analyze');
    return data;
  },

  chat: async (payload: LMSChatPayload | string): Promise<LMSChatResponse> => {
    const body = typeof payload === 'string' ? { question: payload } : payload;
    const { data } = await apiClient.post<LMSChatResponse>('/lms/chat', body);
    return data;
  },

  history: async (): Promise<LMSAnalysis> => {
    return LMSService.analyze();
  },
};

export default LMSService;
