import * as examService from '../services/examService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

export const createExam = asyncHandler(async (req, res, next) => {
  const { examName, examDate, dailyStudyHours, subjects } = req.body;

  // Validation
  if (!examName || String(examName).trim() === '') {
    return next(new AppError('Exam name is required.', 400));
  }

  if (!examDate) {
    return next(new AppError('Exam date is required.', 400));
  }

  const parsedDate = new Date(examDate);
  if (isNaN(parsedDate.getTime())) {
    return next(new AppError('Invalid exam date.', 400));
  }

  if (parsedDate < new Date()) {
    return next(new AppError('Exam date cannot be in the past.', 400));
  }

  if (dailyStudyHours === undefined || dailyStudyHours < 1 || dailyStudyHours > 12) {
    return next(new AppError('Daily study hours must be between 1 and 12.', 400));
  }

  if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return next(new AppError('At least one subject is required.', 400));
  }

  for (const sub of subjects) {
    if (!sub.subject || String(sub.subject).trim() === '') {
      return next(new AppError('Each subject must have a valid name.', 400));
    }
    if (!sub.topics || !Array.isArray(sub.topics) || sub.topics.length === 0) {
      return next(new AppError(`Subject '${sub.subject}' must contain at least one topic.`, 400));
    }
  }

  const result = await examService.createStudyPlan(req.body);
  return res.status(201).json(result);
});

export const getPlan = asyncHandler(async (req, res, next) => {
  const result = await examService.getLatestPlan();
  return res.status(200).json(result);
});

export const chatWithPlan = asyncHandler(async (req, res, next) => {
  const { question } = req.body;
  
  if (!question || String(question).trim() === '') {
    return next(new AppError('Please provide a question in the request body.', 400));
  }

  const result = await examService.chatWithPlan(String(question).trim());
  return res.status(200).json(result);
});
