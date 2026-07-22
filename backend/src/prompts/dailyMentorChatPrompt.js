import { DAILY_MENTOR_SYSTEM_PROMPT } from './dailyMentorPrompt.js';

/**
 * Builds the complete prompt sent to Gemini for a Daily Mentor chat turn.
 *
 * @param {Object} params
 * @param {Object|null} params.studentContext - Compact {lms, resume, exam} object
 * @param {Array}       params.conversationHistory - Previous {role, content} pairs
 * @param {string}      params.question - The student's current question
 * @returns {string} Full prompt string
 */
export const buildDailyMentorChatPrompt = ({
  studentContext,
  conversationHistory,
  question,
}) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ── Student Context Block ──────────────────────────────────
  let contextBlock;
  if (
    !studentContext ||
    (!studentContext.lms && !studentContext.resume && !studentContext.exam)
  ) {
    contextBlock =
      'No student data has been uploaded yet (LMS, Resume, and Exam data are all unavailable).';
  } else {
    const parts = [];

    if (studentContext.lms) {
      parts.push(`LMS Data:\n${JSON.stringify(studentContext.lms, null, 2)}`);
    } else {
      parts.push('LMS Data: Not available.');
    }

    if (studentContext.resume) {
      parts.push(
        `Resume Data:\n${JSON.stringify(studentContext.resume, null, 2)}`
      );
    } else {
      parts.push('Resume Data: Not available.');
    }

    if (studentContext.exam) {
      parts.push(
        `Exam Data:\n${JSON.stringify(studentContext.exam, null, 2)}`
      );
    } else {
      parts.push('Exam Data: Not available.');
    }

    contextBlock = parts.join('\n\n');
  }

  // ── Conversation History Block ─────────────────────────────
  let historyBlock = 'No previous conversation.';
  if (conversationHistory && conversationHistory.length > 0) {
    historyBlock = conversationHistory
      .map((msg) => `${msg.role === 'user' ? 'Student' : 'Mentor'}: ${msg.content}`)
      .join('\n');
  }

  // ── Assemble Full Prompt ───────────────────────────────────
  return `
${DAILY_MENTOR_SYSTEM_PROMPT}

─── TODAY'S DATE ───
${currentDate}

─── STUDENT CONTEXT ───
${contextBlock}

─── CONVERSATION HISTORY ───
${historyBlock}

─── STUDENT QUESTION ───
${question}

Answer:
`.trim();
};
