// ─── Mentor Types ────────────────────────────────────────────

export interface MentorChatPayload {
  message: string;
}

export interface MentorChatResponse {
  status: string;
  message: string;
  data: {
    response: string;
    suggestedTopics: string[];
  };
}

export interface DailyMentorChatPayload {
  question: string;
  conversationId?: string;
}

export interface DailyMentorChatResponse {
  status: string;
  message: string;
  data: {
    conversationId: string;
    answer: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
