import apiClient from '../api/axios';
import type {
  MentorChatPayload,
  MentorChatResponse,
  DailyMentorChatPayload,
  DailyMentorChatResponse,
} from '../types/mentor.types';

export interface ConversationSession {
  id: string;
  title: string;
  createdAt: Date;
  isPinned?: boolean;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
}

const MentorService = {
  sendMessage: async (message: string): Promise<MentorChatResponse> => {
    const { data } = await apiClient.post<MentorChatResponse>('/mentor', { message });
    return data;
  },

  askGeneral: async (payload: MentorChatPayload): Promise<MentorChatResponse> => {
    const { data } = await apiClient.post<MentorChatResponse>('/mentor', payload);
    return data;
  },

  askDaily: async (payload: DailyMentorChatPayload): Promise<DailyMentorChatResponse> => {
    const { data } = await apiClient.post<DailyMentorChatResponse>('/daily-mentor/chat', payload);
    return data;
  },

  getConversationHistory: async (): Promise<ConversationSession[]> => {
    return [];
  },

  createConversation: (title = 'New Learning Chat'): ConversationSession => {
    return {
      id: Date.now().toString(),
      title,
      createdAt: new Date(),
      isPinned: false,
      messages: [],
    };
  },

  deleteConversation: (id: string, sessions: ConversationSession[]): ConversationSession[] => {
    return sessions.filter((s) => s.id !== id);
  },

  renameConversation: (
    id: string,
    newTitle: string,
    sessions: ConversationSession[]
  ): ConversationSession[] => {
    return sessions.map((s) => (s.id === id ? { ...s, title: newTitle } : s));
  },
};

export default MentorService;
