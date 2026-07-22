import { v4 as uuidv4 } from 'uuid';
import { ai } from '../config/gemini.js';
import { buildDailyMentorChatPrompt } from '../prompts/dailyMentorChatPrompt.js';
import DailyMentor from '../models/DailyMentor.js';
import LMSProgress from '../models/LMSProgress.js';
import Resume from '../models/Resume.js';
import Exam from '../models/Exam.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

// ─────────────────────────────────────────────
// GEMINI HELPER
// ─────────────────────────────────────────────

/**
 * Call Gemini with a given prompt string.
 * @param {string} prompt
 * @returns {string} Raw text response
 */
const callGemini = async (prompt) => {
  if (!ai) {
    throw new AppError(
      'Gemini API is not configured. Please set GEMINI_API_KEY in your .env file.',
      503
    );
  }

  try {
    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      input: prompt,
    });
    return interaction.output_text;
  } catch (err) {
    logger.error(`Gemini API error (Daily Mentor): ${err.message}`);
    throw new AppError(`Gemini request failed: ${err.message}`, 502);
  }
};

// ─────────────────────────────────────────────
// CONTEXT SUMMARISERS
// ─────────────────────────────────────────────

/**
 * Summarise raw LMS records into a compact context object.
 * @param {Array} records
 * @returns {Object|null}
 */
const summarizeLMS = (records) => {
  if (!records || records.length === 0) return null;

  const courses = records.map((r) => ({
    course: r.course,
    module: r.module || null,
    completion: r.completion,
    quizScore: r.quizScore ?? null,
    assignmentScore: r.assignmentScore ?? null,
    attendance: r.attendance ?? null,
  }));

  const avgCompletion =
    courses.reduce((sum, c) => sum + (c.completion || 0), 0) / courses.length;

  const quizScores = courses.filter((c) => c.quizScore != null);
  const avgQuiz =
    quizScores.length > 0
      ? quizScores.reduce((s, c) => s + c.quizScore, 0) / quizScores.length
      : null;

  const assignmentScores = courses.filter((c) => c.assignmentScore != null);
  const avgAssignment =
    assignmentScores.length > 0
      ? assignmentScores.reduce((s, c) => s + c.assignmentScore, 0) /
        assignmentScores.length
      : null;

  return {
    totalCourses: courses.length,
    averageCompletion: Math.round(avgCompletion * 10) / 10,
    averageQuizScore: avgQuiz != null ? Math.round(avgQuiz * 10) / 10 : null,
    averageAssignmentScore:
      avgAssignment != null ? Math.round(avgAssignment * 10) / 10 : null,
    courses,
  };
};

/**
 * Summarise the latest resume into compact context.
 * Truncates extractedText to keep the prompt token-efficient.
 * @param {Object} resume - Mongoose lean document
 * @returns {Object|null}
 */
const summarizeResume = (resume) => {
  if (!resume) return null;

  const MAX_RESUME_CHARS = 3000;
  const text = resume.extractedText || '';
  const truncated =
    text.length > MAX_RESUME_CHARS
      ? text.substring(0, MAX_RESUME_CHARS) + '… [truncated]'
      : text;

  return {
    filename: resume.originalFilename,
    uploadedAt: resume.createdAt,
    extractedText: truncated,
  };
};

/**
 * Summarise the latest exam plan into compact context.
 * @param {Object} exam - Mongoose lean document
 * @returns {Object|null}
 */
const summarizeExam = (exam) => {
  if (!exam) return null;

  return {
    examName: exam.examName,
    examDate: exam.examDate,
    dailyStudyHours: exam.dailyStudyHours,
    subjects: exam.subjects,
    generatedStudyPlan: exam.generatedStudyPlan || null,
  };
};

// ─────────────────────────────────────────────
// CONTEXT GATHERING
// ─────────────────────────────────────────────

/**
 * Fetch latest data from LMS, Resume, and Exam modules in parallel.
 * Each module is individually wrapped — if one fails the others still return.
 *
 * @returns {Object} { lms, resume, exam }
 */
const gatherStudentContext = async () => {
  const [lmsResult, resumeResult, examResult] = await Promise.allSettled([
    LMSProgress.find({}).lean(),
    Resume.findOne().sort({ createdAt: -1 }).lean(),
    Exam.findOne().sort({ createdAt: -1 }).lean(),
  ]);

  const lmsRecords =
    lmsResult.status === 'fulfilled' ? lmsResult.value : null;
  const resumeDoc =
    resumeResult.status === 'fulfilled' ? resumeResult.value : null;
  const examDoc =
    examResult.status === 'fulfilled' ? examResult.value : null;

  if (lmsResult.status === 'rejected') {
    logger.warn(`Failed to fetch LMS data: ${lmsResult.reason?.message}`);
  }
  if (resumeResult.status === 'rejected') {
    logger.warn(`Failed to fetch Resume data: ${resumeResult.reason?.message}`);
  }
  if (examResult.status === 'rejected') {
    logger.warn(`Failed to fetch Exam data: ${examResult.reason?.message}`);
  }

  return {
    lms: summarizeLMS(lmsRecords),
    resume: summarizeResume(resumeDoc),
    exam: summarizeExam(examDoc),
  };
};

// ─────────────────────────────────────────────
// PUBLIC SERVICE METHODS
// ─────────────────────────────────────────────

/** Maximum number of previous messages to include for context */
const MAX_HISTORY_MESSAGES = 10;

/**
 * Handle a student chat message in the Daily Mentor.
 *
 * @param {string}      question        - The student's question
 * @param {string|null} conversationId  - Existing conversation ID (optional)
 * @returns {{ conversationId: string, answer: string }}
 */
export const chat = async (question, conversationId) => {
  // Generate new conversation ID if none provided
  const convId = conversationId || uuidv4();

  // 1. Gather student context from all modules
  const studentContext = await gatherStudentContext();

  // 2. Fetch conversation history
  const previousMessages = await DailyMentor.find({ conversationId: convId })
    .sort({ createdAt: 1 })
    .limit(MAX_HISTORY_MESSAGES)
    .lean();

  const conversationHistory = previousMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // 3. Build prompt
  const prompt = buildDailyMentorChatPrompt({
    studentContext,
    conversationHistory,
    question,
  });

  // 4. Call Gemini
  const rawAnswer = await callGemini(prompt);
  const answer = rawAnswer.trim();

  // 5. Persist both messages
  await DailyMentor.insertMany([
    { conversationId: convId, role: 'user', content: question },
    { conversationId: convId, role: 'assistant', content: answer },
  ]);

  logger.info(`Daily Mentor chat — conversation: ${convId}`);

  return { conversationId: convId, answer };
};
