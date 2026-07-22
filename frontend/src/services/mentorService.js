import api from './api';

export const mentorService = {
  askMentor: (message) => api.post('/mentor', { message }),
  dailyChat: (question, conversationId) =>
    api.post('/daily-mentor/chat', { question, conversationId }),
};
