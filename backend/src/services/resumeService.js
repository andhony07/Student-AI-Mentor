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
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });
    return response.text;
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
export const uploadAndParseResume = async (userId, fileBuffer, originalName) => {
  let parsed;
  try {
    parsed = await parsePDF(fileBuffer);
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError('This PDF could not be parsed. Please upload a valid PDF.', 400);
  }
  
  const extractedText = parsed.text;
  const resumeHash = hashResumeText(extractedText);

  // Check for duplicates for this specific user
  const existingResume = await Resume.findOne({ userId, resumeHash });
  if (existingResume) {
    // Update the createdAt timestamp so it becomes the latest uploaded resume again
    await Resume.findByIdAndUpdate(existingResume._id, { createdAt: new Date(), originalFilename: originalName });
    return {
      success: true,
      duplicate: true,
      message: 'Resume already uploaded. Re-analyzing existing file.'
    };
  }

  const storedFilename = `${Date.now()}_${originalName}`;
  
  try {
    await Resume.create({
      userId,
      originalFilename: originalName,
      storedFilename,
      resumeHash,
      extractedText
    });
  } catch (err) {
    if (err.code === 11000) {
      return {
        success: true,
        duplicate: true,
        message: 'Resume already uploaded.'
      };
    }
    throw err;
  }

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
export const analyzeLatestResume = async (userId) => {
  // Read the latest uploaded resume for this user
  const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
  
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
export const chatWithLatestResume = async (userId, question) => {
  const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
  
  if (!resume) {
    throw new AppError('No resume data found. Please upload your resume PDF first.', 404);
  }

  const prompt = buildResumeChatPrompt(resume.extractedText, question);
  const answer = await callGemini(prompt);

  return { answer: answer.trim() };
};
