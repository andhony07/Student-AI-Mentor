import { ai } from '../config/gemini.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

/**
 * Call Gemini with a given user message.
 * Auth-independent: no userId required.
 *
 * @param {string} userMessage
 */
export const askMentor = async (userMessage) => {
  if (!ai) {
    throw new AppError(
      'Gemini API is not configured. Please set GEMINI_API_KEY in your .env file.',
      503
    );
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userMessage
    });
    
    return { 
      response: response.text,
      suggestedTopics: [
        'How to optimize my resume for ATS?',
        'Create a study planner for my DBMS exam',
        'Recommend coding exercises for recursion'
      ]
    };
  } catch (err) {
    logger.error(`Gemini API error (AI Mentor): ${err.message}`);
    throw new AppError(`Gemini request failed: ${err.message}`, 502);
  }
};
