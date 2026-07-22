import { ai } from '../config/gemini.js';
import { buildDailyMentorPrompt } from '../prompts/dailyMentorPrompt.js';
import { buildDailyMentorChatPrompt } from '../prompts/dailyMentorChatPrompt.js';
import DailyMentor from '../models/DailyMentor.js';
import LMSProgress from '../models/LMSProgress.js';
import Resume from '../models/Resume.js';
import Exam from '../models/Exam.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';
import crypto from 'crypto';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Call Gemini with a given prompt string.
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
      model: "gemini-3.6-flash",
      input: prompt,
    });
    return interaction.output_text;
  } catch (err) {
    logger.error(`Gemini API error: ${err.message}`);
    throw new AppError(`Gemini request failed: ${err.message}`, 502);
  }
};

/**
 * Gather all available student context from other modules.
 * Never throws if a module has no data — gracefully returns null for that section.
 */
const gatherStudentContext = async () => {
  let lmsContext = null;
  let resumeContext = null;
  let examContext = null;

  try {
    const lmsRecords = await LMSProgress.find({}).lean();
    if (lmsRecords.length) {
      lmsContext = lmsRecords
        .map((r, i) => {
          const parts = [
            `Record ${i + 1}:`,
            `  Course: ${r.course}`,
            r.module ? `  Module: ${r.module}` : null,
            `  Completion: ${r.completion}%`,
            r.quizScore != null ? `  Quiz Score: ${r.quizScore}%` : null,
            r.assignmentScore != null ? `  Assignment Score: ${r.assignmentScore}%` : null,
            r.attendance != null ? `  Attendance: ${r.attendance}%` : null,
          ].filter(Boolean);
          return parts.join('\n');
        })
        .join('\n\n');
    }
  } catch (err) {
    logger.warn(`Could not load LMS data: ${err.message}`);
  }

  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 }).lean();
    if (resume && resume.extractedText) {
      resumeContext = resume.extractedText;
    }
  } catch (err) {
    logger.warn(`Could not load Resume data: ${err.message}`);
  }

  try {
    const exam = await Exam.findOne().sort({ createdAt: -1 }).lean();
    if (exam) {
      examContext = JSON.stringify({
        examName: exam.examName,
        examDate: exam.examDate,
        dailyStudyHours: exam.dailyStudyHours,
        subjects: exam.subjects,
        studyPlan: exam.generatedStudyPlan
      }, null, 2);
    }
  } catch (err) {
    logger.warn(`Could not load Exam data: ${err.message}`);
  }

  return { lmsContext, resumeContext, examContext };
};

/**
 * Build a string representation of recent conversation history
 * for injecting into the prompt as context.
 */
const formatConversationHistory = (messages, maxMessages = 10) => {
  if (!messages || messages.length === 0) return null;

  // Take the last N messages to keep the prompt manageable
  const recent = messages.slice(-maxMessages);
  return recent
    .map(m => `${m.role === 'user' ? 'Student' : 'AI Mentor'}: ${m.content}`)
    .join('\n\n');
};

// ─────────────────────────────────────────────
// SERVICE METHODS
// ─────────────────────────────────────────────

/**
 * Handle a chat message from the student.
 * Gathers all available module context, includes conversation history,
 * sends to Gemini, and stores the exchange.
 *
 * @param {string} question - Student's natural language question
 * @param {string} [conversationId] - Optional conversation ID to continue a session
 * @returns {{ answer: string, conversationId: string }}
 */
export const chat = async (question, conversationId) => {
  // Get or create conversation
  let conversation;
  if (conversationId) {
    conversation = await DailyMentor.findOne({ conversationId });
  }

  if (!conversation) {
    conversationId = crypto.randomUUID();
    conversation = await DailyMentor.create({
      conversationId,
      messages: []
    });
  }

  // Gather cross-module context
  const { lmsContext, resumeContext, examContext } = await gatherStudentContext();

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const conversationHistory = formatConversationHistory(conversation.messages);

  // Build the system context
  const systemContext = buildDailyMentorPrompt({
    todayDate,
    lmsContext,
    resumeContext,
    examContext,
    conversationHistory
  });

  // Build the final prompt
  const prompt = buildDailyMentorChatPrompt(systemContext, question);

  // Call Gemini
  const answer = await callGemini(prompt);
  const trimmedAnswer = answer.trim();

  // Store the exchange in conversation history
  conversation.messages.push(
    { role: 'user', content: question, timestamp: new Date() },
    { role: 'ai', content: trimmedAnswer, timestamp: new Date() }
  );
  await conversation.save();

  return {
    answer: trimmedAnswer,
    conversationId
  };
};

/**
 * Retrieve conversation history for a given conversation ID.
 *
 * @param {string} conversationId
 * @returns {Object}
 */
export const getHistory = async (conversationId) => {
  const conversation = await DailyMentor.findOne({ conversationId }).lean();

  if (!conversation) {
    throw new AppError('Conversation not found.', 404);
  }

  return {
    conversationId: conversation.conversationId,
    messages: conversation.messages
  };
};
