import { parsePDF } from '../utils/pdfParser.js';
import { hashResumeText } from '../utils/hashResume.js';
import { ai } from '../config/gemini.js';
import { buildResumeAnalysisPrompt } from '../prompts/resumeAnalysisPrompt.js';
import { buildResumeChatPrompt } from '../prompts/resumeChatPrompt.js';
import Resume from '../models/Resume.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

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

/**
 * Parse and store an uploaded PDF resume.
 * Auth-independent: deduplicates based on extracted text hash.
 *
 * @param {Buffer} fileBuffer
 * @param {string} originalName
 * @returns {Object}
 */
export const uploadAndParseResume = async (fileBuffer, originalName) => {
  const parsed = await parsePDF(fileBuffer);
  
  const extractedText = parsed.text;
  const resumeHash = hashResumeText(extractedText);

  // Check for duplicates
  const existingResume = await Resume.findOne({ resumeHash });
  if (existingResume) {
    return {
      success: true,
      duplicate: true,
      message: 'Resume already exists.'
    };
  }

  const storedFilename = `${Date.now()}_${originalName}`;
  
  await Resume.create({
    originalFilename: originalName,
    storedFilename,
    resumeHash,
    extractedText
  });

  return {
    success: true,
    duplicate: false,
    message: 'Resume uploaded successfully.'
  };
};

/**
 * Retrieve the latest uploaded resume, send its text to Gemini for analysis,
 * and return a structured JSON performance report.
 *
 * @returns {Object} Structured analysis JSON parsed from Gemini response
 */
export const analyzeLatestResume = async () => {
  // Read the latest uploaded resume
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  
  if (!resume) {
    throw new AppError('No resume data found. Please upload your resume PDF first.', 404);
  }

  const prompt = buildResumeAnalysisPrompt(resume.extractedText);
  const rawResponse = await callGemini(prompt);

  // Strip markdown code fences if present
  const cleaned = rawResponse
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let analysis;
  try {
    analysis = JSON.parse(cleaned);
  } catch (err) {
    logger.error(`Failed to parse Gemini JSON response: ${cleaned}`);
    throw new AppError(
      'Received an unexpected response format from Gemini. Please try again.',
      502
    );
  }

  return analysis;
};

/**
 * Retrieve the latest resume, build context, and ask Gemini to answer
 * the student's natural language question using only that context.
 *
 * @param {string} question - Student's natural language question
 * @returns {Object}
 */
export const chatWithLatestResume = async (question) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  
  if (!resume) {
    throw new AppError('No resume data found. Please upload your resume PDF first.', 404);
  }

  const prompt = buildResumeChatPrompt(resume.extractedText, question);
  const answer = await callGemini(prompt);

  return { answer: answer.trim() };
};
