import api from './api';

export const examService = {
  create: (data) => api.post('/exams/create', data),
  getPlan: () => api.get('/exams/plan'),
  chat: (question) => api.post('/exams/chat', { question }),
};
