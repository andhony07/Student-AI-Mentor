import { GoogleGenAI } from '@google/genai';
import logger from '../utils/logger.js';

const apiKey = process.env.GEMINI_API_KEY;

// Debug logs — confirm .env was loaded before this module executed
console.log('Gemini Key Loaded:', apiKey ? 'YES' : 'NO');
console.log('Gemini Key Prefix:', apiKey?.substring(0, 6));

let geminiClient = null;

if (!apiKey) {
  logger.warn('GEMINI_API_KEY is not configured. Add it to your .env file.');
} else {
  // Initialize the real @google/genai client
  geminiClient = new GoogleGenAI({ apiKey });
  logger.info('Gemini Client Initialized Successfully');
}

export const ai = geminiClient;
