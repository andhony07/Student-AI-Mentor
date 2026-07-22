import * as resumeService from '../services/resumeService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

export const uploadResume = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a PDF file', 400));
  }

  const result = await resumeService.uploadAndParseResume(
    req.file.buffer,
    req.file.originalname
  );
  
  return res.status(200).json(result);
});

export const analyzeResume = asyncHandler(async (req, res, next) => {
  const result = await resumeService.analyzeLatestResume();
  return res.status(200).json(result);
});

export const chatWithResume = asyncHandler(async (req, res, next) => {
  const { question } = req.body;
  if (!question || String(question).trim() === '') {
    return next(new AppError('Please provide a question in the request body.', 400));
  }

  const result = await resumeService.chatWithLatestResume(String(question).trim());
  return res.status(200).json(result);
});
