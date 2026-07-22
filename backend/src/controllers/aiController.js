import * as aiService from '../services/aiService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

export const askMentor = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    return next(new AppError('Please provide a message query in the request body', 400));
  }

  const result = await aiService.askMentor(req.user._id, message);
  return ApiResponse.success(res, 'AI Mentor responded successfully', result, 200);
});
