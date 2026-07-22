export const buildResumeAnalysisPrompt = (resumeText) => {
  return `You are an expert AI Career Coach and Resume Analyzer. 
Analyze the following resume text and provide a structured review in JSON format.

Resume Text:
"""
${resumeText}
"""

Return ONLY a valid JSON object matching the exact structure below. Do not include markdown formatting like \`\`\`json.
{
  "Overall Resume Score (/100)": Number,
  "ATS Score (/100)": Number,
  "Strengths": [String],
  "Weaknesses": [String],
  "Skills Found": [String],
  "Missing Skills": [String],
  "Projects Review": String,
  "Education Review": String,
  "Experience Review": String,
  "Certifications Review": String,
  "Resume Formatting Suggestions": [String],
  "Grammar Suggestions": [String],
  "Keyword Suggestions": [String],
  "Recommended Improvements": [String],
  "Final Summary": String
}
`;
};
