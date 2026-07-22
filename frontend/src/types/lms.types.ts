// ─── LMS Types ───────────────────────────────────────────────

export interface LMSUploadResponse {
  success: boolean;
  message: string;
  recordsInserted: number;
  skippedRows?: number;
}

export interface LMSAnalysis {
  status: string;
  message: string;
  data: Record<string, unknown>;
}

export interface LMSChatPayload {
  question: string;
}

export interface LMSChatResponse {
  status: string;
  message: string;
  data: {
    answer: string;
  };
}
