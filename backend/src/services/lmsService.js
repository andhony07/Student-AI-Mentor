import { parseLMSExcel } from '../utils/excelParser.js';
import LMSProgress from '../models/LMSProgress.js';
import { ai } from '../config/gemini.js';
import { buildLMSAnalysisPrompt } from '../prompts/lmsAnalysisPrompt.js';
import { buildLMSChatPrompt } from '../prompts/lmsChatPrompt.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Convert an array of LMS records into a human-readable context string
 * suitable for embedding in a Gemini prompt.
 */
const buildLMSContext = (records) => {
  if (!records.length) return 'No LMS data available.';

  return records
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
};

/**
 * Call Gemini with a given prompt string.
 * Returns the raw text response.
 * Throws AppError if Gemini is not configured.
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

// ─────────────────────────────────────────────
// SERVICE METHODS
// ─────────────────────────────────────────────

/**
 * Parse an uploaded Excel buffer and persist all valid rows to MongoDB.
 * Auth-independent: replaces all existing records on each upload.
 *
 * @param {Buffer} fileBuffer - Raw file buffer from Multer memory storage
 * @returns {{ recordsInserted: number, skippedRows: number }}
 */
export const uploadAndStoreLMS = async (userId, fileBuffer) => {
  const { rows, totalRows, skippedRows } = parseLMSExcel(fileBuffer);

  // Replace all existing records for this user with the newly uploaded data
  await LMSProgress.deleteMany({ userId });

  const documents = rows.map((row) => ({
    userId,
    course: row.course,
    module: row.module,
    completion: row.completion,
    quizScore: row.quizScore,
    assignmentScore: row.assignmentScore,
    attendance: row.attendance,
    uploadedAt: new Date(),
  }));

  await LMSProgress.insertMany(documents);

  logger.info(`LMS upload: ${totalRows} records inserted.`);

  return { recordsInserted: totalRows, skippedRows };
};

/**
 * Fetch all LMS records, send them to Gemini for analysis,
 * and return a structured JSON performance report.
 *
 * @returns {Object} Structured analysis JSON parsed from Gemini response
 */
export const analyzePerformance = async (userId) => {
  const records = await LMSProgress.find({ userId }).lean();

  if (!records.length) {
    throw new AppError(
      'No LMS data found. Please upload your LMS Excel file first.',
      404
    );
  }

  const lmsContext = buildLMSContext(records);
  const prompt = buildLMSAnalysisPrompt(lmsContext);
  const rawResponse = await callGemini(prompt);

  // Strip potential markdown code fences Gemini might include despite instructions
  const cleaned = rawResponse
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let analysis;
  try {
    analysis = JSON.parse(cleaned);
  } catch {
    logger.error(`Failed to parse Gemini JSON response: ${cleaned}`);
    throw new AppError(
      'Received an unexpected response format from Gemini. Please try again.',
      502
    );
  }

  return analysis;
};

/**
 * Retrieve LMS records, build context, and ask Gemini to answer
 * the student's natural language question using only that context.
 *
 * @param {string} question - Student's natural language question
 * @returns {{ answer: string }}
 */
export const chatWithLMSData = async (userId, question) => {
  const records = await LMSProgress.find({ userId }).lean();

  if (!records.length) {
    throw new AppError(
      'No LMS data found. Please upload your LMS Excel file before using the chat feature.',
      404
    );
  }

  const lmsContext = buildLMSContext(records);
  const prompt = buildLMSChatPrompt(lmsContext, question);
  const answer = await callGemini(prompt);

  return { answer: answer.trim() };
};
