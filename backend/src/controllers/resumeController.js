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
  return ApiResponse.success(res, 'Resume uploaded and parsed successfully', result, 200);
});

export const analyzeResume = asyncHandler(async (req, res, next) => {
  const { resumeId } = req.body;
  if (!resumeId) {
    return next(new AppError('Please provide a resumeId in the request body', 400));
  }

  const result = await resumeService.analyzeResume(resumeId);
  return ApiResponse.success(res, 'Resume analysis successful', result, 200);
});
