import Exam from '../models/Exam.js';
import { ai } from '../config/gemini.js';
import { buildExamPlannerPrompt } from '../prompts/examPlannerPrompt.js';
import { buildExamChatPrompt } from '../prompts/examChatPrompt.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

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
 * Save exam details, generate a personalized study plan using Gemini, and store it.
 */
export const createStudyPlan = async (examDetails) => {
  const prompt = buildExamPlannerPrompt(examDetails);
  const rawResponse = await callGemini(prompt);

  // Strip markdown code fences if present
  const cleaned = rawResponse
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let generatedStudyPlan;
  try {
    generatedStudyPlan = JSON.parse(cleaned);
  } catch (err) {
    logger.error(`Failed to parse Gemini JSON response for exam plan: ${cleaned}`);
    throw new AppError(
      'Received an unexpected response format from Gemini. Please try again.',
      502
    );
  }

  // Store in DB
  await Exam.create({
    examName: examDetails.examName,
    examDate: examDetails.examDate,
    dailyStudyHours: examDetails.dailyStudyHours,
    subjects: examDetails.subjects,
    generatedStudyPlan
  });

  return {
    success: true,
    message: 'Study plan generated successfully.'
  };
};

/**
 * Retrieve the latest generated exam plan.
 */
export const getLatestPlan = async () => {
  const exam = await Exam.findOne().sort({ createdAt: -1 }).lean();
  
  if (!exam) {
    throw new AppError('No exam plan found. Please create one first.', 404);
  }

  return exam.generatedStudyPlan;
};

/**
 * Chat contextually with the latest exam plan and details.
 */
export const chatWithPlan = async (question) => {
  const exam = await Exam.findOne().sort({ createdAt: -1 }).lean();
  
  if (!exam) {
    throw new AppError('No exam plan found. Please create one first.', 404);
  }

  const examDetails = {
    examName: exam.examName,
    examDate: exam.examDate,
    dailyStudyHours: exam.dailyStudyHours,
    subjects: exam.subjects
  };

  const prompt = buildExamChatPrompt(examDetails, exam.generatedStudyPlan, question);
  const answer = await callGemini(prompt);

  return { answer: answer.trim() };
};
