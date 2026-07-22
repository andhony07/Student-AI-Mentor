import crypto from 'crypto';

/**
 * Generate a SHA-256 hash for a given text.
 * Used to deduplicate resumes based on their extracted text.
 * 
 * @param {string} text - The extracted resume text
 * @returns {string} The SHA-256 hex digest
 */
export const hashResumeText = (text) => {
  if (!text) return '';
  return crypto.createHash('sha256').update(text).digest('hex');
};
