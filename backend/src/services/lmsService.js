import { parseExcel } from '../utils/excelParser.js';
import LMSProgress from '../models/LMSProgress.js';

export const processExcelUpload = async (userId, fileBuffer) => {
  const parsedData = parseExcel(fileBuffer);
  
  // Placeholder analysis of LMS sheets
  const summary = [];
  
  Object.keys(parsedData).forEach((sheetName) => {
    const rows = parsedData[sheetName];
    summary.push({
      sheetName,
      rowCount: rows.length,
      preview: rows.slice(0, 2)
    });
  });

  return {
    message: 'LMS Excel sheet parsed successfully',
    summary,
    analysis: {
      overallCompletion: 78.5,
      completedCourses: 4,
      pendingCourses: 2,
      averageGrade: 88.2
    }
  };
};

export const getProgress = async (userId) => {
  const progressList = await LMSProgress.find({ user: userId });
  if (progressList.length === 0) {
    // Return mock data if DB is empty
    return [
      {
        courseName: 'Data Structures and Algorithms (Mock)',
        completionPercentage: 90,
        status: 'in_progress',
        grades: [
          { assessmentName: 'Assignment 1', score: 95, maxScore: 100 },
          { assessmentName: 'Quiz 1', score: 8, maxScore: 10 }
        ]
      },
      {
        courseName: 'Database Management Systems (Mock)',
        completionPercentage: 100,
        status: 'completed',
        grades: [
          { assessmentName: 'Exam', score: 88, maxScore: 100 }
        ]
      }
    ];
  }
  return progressList;
};
