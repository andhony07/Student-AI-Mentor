// ─── Resume Types ────────────────────────────────────────────

export interface ResumeUploadResponse {
  success: boolean;
  message?: string;
  [key: string]: unknown;
}

export interface ResumeAnalysisResponse {
  [key: string]: unknown;
}

export interface ResumeChatPayload {
  question: string;
}

export interface ResumeChatResponse {
  answer: string;
}
