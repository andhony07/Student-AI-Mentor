// ─── Auth Types ───────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  collegeName: string;
  department: string;
  graduationYear: number;
  linkedinUrl: string;
  githubUrl: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  collegeName: string;
  department?: string;
  graduationYear?: number;
  linkedinUrl?: string;
  githubUrl?: string;
  githubUsername?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  collegeName?: string;
  department?: string;
  graduationYear?: number;
  linkedinUrl?: string;
  githubUrl?: string;
}
