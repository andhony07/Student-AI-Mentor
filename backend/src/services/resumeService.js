import { parsePDF } from '../utils/pdfParser.js';
import { ai } from '../config/gemini.js';
import Resume from '../models/Resume.js';
import AppError from '../utils/errorHandler.js';

/**
 * Parse and store an uploaded PDF resume.
 * Auth-independent: no userId required.
 *
 * @param {Buffer} fileBuffer
 * @param {string} fileName
 * @returns {Object}
 */
export const uploadAndParseResume = async (fileBuffer, fileName) => {
  const parsed = await parsePDF(fileBuffer);

  const mockPath = `uploads/resumes/${Date.now()}_${fileName}`;

  const resume = await Resume.create({
    fileName,
    filePath: mockPath,
    parsedText: parsed.text,
    analysis: {
      skillsIdentified: [],
      experienceSummary: 'Pending analysis',
      educationSummary: 'Pending analysis',
      recommendations: []
    }
  });

  return {
    message: 'Resume uploaded and parsed successfully',
    resumeId: resume._id,
    parsedTextPreview: parsed.text ? parsed.text.substring(0, 300) : '',
    numPages: parsed.numPages
  };
};

/**
 * Run (placeholder) Gemini analysis on a stored resume by ID.
 *
 * @param {string} resumeId
 * @returns {Object}
 */
export const analyzeResume = async (resumeId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) {
    throw new AppError('Resume not found', 404);
  }

  // Placeholder Gemini analysis.
  // Code snippet using @google/genai syntax:
  // if (ai) {
  //   const response = await ai.models.generateContent({
  //     model: 'gemini-2.0-flash',
  //     contents: 'Analyze this resume...'
  //   });
  // }

  const mockAnalysis = {
    skillsIdentified: ['React', 'Node.js', 'Express.js', 'JavaScript', 'MongoDB', 'Python'],
    experienceSummary: 'Has completed multiple academic projects and a Web Development Internship.',
    educationSummary: 'Pursuing B.Tech in CSE at Tech Institute, graduating in 2027.',
    recommendations: [
      'Include links to GitHub repositories for key projects',
      'Highlight specific algorithms used in backend tasks to stand out'
    ]
  };

  resume.analysis = mockAnalysis;
  await resume.save();

  return {
    message: 'Gemini analysis placeholder completed successfully',
    analysis: mockAnalysis
  };
};
