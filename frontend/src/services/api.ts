import axios from 'axios';
import { tokenUtils } from '../utils/token';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
});

// Request Interceptor — Automatic JWT token injection
api.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — Global Error Handling (401, 403, 404, 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message || error.message;

    if (status === 401) {
      tokenUtils.clearAll();
      // Only notify if not already on the login page
      if (!window.location.pathname.includes('/login')) {
        toast.error('Session expired or unauthorized. Please log in.');
        window.location.href = '/login';
      }
    } else if (status === 403) {
      toast.error(backendMessage || 'Access forbidden: You do not have permission.');
    } else if (status === 404) {
      toast.error(backendMessage || 'Requested resource not found.');
    } else if (status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else if (status && status >= 500) {
      toast.error(backendMessage || 'Server error occurred. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;
