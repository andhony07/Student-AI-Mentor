import { GoogleGenAI } from '@google/genai';
import logger from '../utils/logger.js';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  logger.warn('GEMINI_API_KEY is not configured or uses placeholder value.');
}

// In standard usage of @google/genai:
// const ai = new GoogleGenAI({ apiKey });
export const ai = apiKey && apiKey !== 'your_gemini_api_key_here'
  ? new GoogleGenAI({ apiKey })
  : null;

logger.info('Gemini API client initialized (placeholder wrapper).');
