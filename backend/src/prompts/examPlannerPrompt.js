export const buildExamPlannerPrompt = (examDetails) => {
  return `You are an expert AI Study Planner. 
Generate a comprehensive, personalized study plan based on the following exam details:

Exam Details:
"""
${JSON.stringify(examDetails, null, 2)}
"""

Return ONLY a valid JSON object matching the exact structure below. Do not include markdown formatting like \`\`\`json.
{
  "Overall Strategy": String,
  "Daily Schedule": String,
  "Weekly Schedule": String,
  "Subject Priorities": [String],
  "Topic Priorities": [String],
  "Revision Plan": String,
  "Mock Test Plan": String,
  "Final Week Strategy": String,
  "Last Day Before Exam Plan": String,
  "Time Allocation": String,
  "Motivational Advice": String
}
`;
};
