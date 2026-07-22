import apiClient from '../api/axios';
import type {
  CreateExamPayload,
  CreateExamResponse,
  ExamPlanResponse,
  ExamChatPayload,
  ExamChatResponse,
} from '../types/exam.types';

const ExamService = {
  createExam: async (payload: CreateExamPayload): Promise<CreateExamResponse> => {
    const { data } = await apiClient.post<CreateExamResponse>('/exams/create', payload);
    return data;
  },

  create: async (payload: CreateExamPayload): Promise<CreateExamResponse> => {
    return ExamService.createExam(payload);
  },

  updateExam: async (_id: string, payload: CreateExamPayload): Promise<CreateExamResponse> => {
    return ExamService.createExam(payload);
  },

  deleteExam: async (_id: string): Promise<{ success: boolean; message: string }> => {
    return { success: true, message: 'Exam deleted from local view' };
  },

  getExamList: async (): Promise<ExamPlanResponse> => {
    const { data } = await apiClient.get<ExamPlanResponse>('/exams/plan');
    return data;
  },

  generateStudyPlan: async (): Promise<ExamPlanResponse> => {
    return ExamService.getExamList();
  },

  getPlan: async (): Promise<ExamPlanResponse> => {
    return ExamService.getExamList();
  },

  chat: async (payload: ExamChatPayload | string): Promise<ExamChatResponse> => {
    const body = typeof payload === 'string' ? { question: payload } : payload;
    const { data } = await apiClient.post<ExamChatResponse>('/exams/chat', body);
    return data;
  },

  getHistory: async (): Promise<ExamPlanResponse> => {
    return ExamService.getExamList();
  },
};

export default ExamService;
