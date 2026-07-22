import api from './api';

export const resumeService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  analyze: () => api.get('/resume/analyze'),
  chat: (question) => api.post('/resume/chat', { question }),
};
