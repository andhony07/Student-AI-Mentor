import apiClient from '../api/axios';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
  ChangePasswordPayload,
  UpdateProfilePayload,
} from '../types/auth.types';

const AuthService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const { data } = await apiClient.post<RegisterResponse>('/auth/register', payload);
    return data;
  },

  getMe: async (): Promise<{ status: string; user: User }> => {
    const { data } = await apiClient.get<{ status: string; user: User }>('/auth/me');
    return data;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<{ status: string; user: User }> => {
    const { data } = await apiClient.put<{ status: string; user: User }>('/auth/profile', payload);
    return data;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<{ status: string; message: string }> => {
    const { data } = await apiClient.put<{ status: string; message: string }>('/auth/change-password', payload);
    return data;
  },
};

export default AuthService;
