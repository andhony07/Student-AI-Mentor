import api from './api';

export const lmsService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/lms/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  analyze: () => api.get('/lms/analyze'),
  chat: (question) => api.post('/lms/chat', { question }),
};
