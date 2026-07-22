// ─── Exam Types ──────────────────────────────────────────────

export interface ExamSubject {
  subject: string;
  topics: string[];
}

export interface CreateExamPayload {
  examName: string;
  examDate: string;
  dailyStudyHours: number;
  subjects: ExamSubject[];
}

export interface CreateExamResponse {
  success: boolean;
  message: string;
}

export interface ExamPlanResponse {
  [key: string]: unknown;
}

export interface ExamChatPayload {
  question: string;
}

export interface ExamChatResponse {
  answer: string;
}
