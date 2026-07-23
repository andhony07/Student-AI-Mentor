import api from './api';

export const internshipService = {
  getAll: () => api.get('/internships'),
  add: (data) => api.post('/internships', data),
  search: () => api.get('/internships/search'),
};
