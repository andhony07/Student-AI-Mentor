import { ai } from '../config/gemini.js';

/**
 * Returns a placeholder AI mentor response.
 * Auth-independent: no userId required.
 *
 * @param {string} userMessage
 */
export const askMentor = async (userMessage) => {
  // Placeholder Gemini AI Integration.
  // Code snippet using @google/genai:
  // if (ai) {
  //   const response = await ai.models.generateContent({
  //     model: 'gemini-2.0-flash',
  //     contents: userMessage
  //   });
  //   return { response: response.text };
  // }

  return {
    response: `This is a placeholder response from the Student AI Mentor. You asked: "${userMessage}". In the next phase, the Gemini API (using the @google/genai SDK) will be connected here.`,
    suggestedTopics: [
      'How to optimize my resume for ATS?',
      'Create a study planner for my DBMS exam',
      'Recommend coding exercises for recursion'
    ]
  };
};
