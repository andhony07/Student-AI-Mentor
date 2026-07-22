import * as lmsService from '../services/lmsService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

export const uploadLMSProgress = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an Excel file', 400));
  }

  const result = await lmsService.processExcelUpload(req.user._id, req.file.buffer);
  return ApiResponse.success(res, 'LMS Progress file processed', result, 200);
});

export const getLMSProgress = asyncHandler(async (req, res, next) => {
  const result = await lmsService.getProgress(req.user._id);
  return ApiResponse.success(res, 'LMS Progress retrieved', { progress: result }, 200);
});
