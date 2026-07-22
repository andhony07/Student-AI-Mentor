import * as dailyMentorService from '../services/dailyMentorService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

/**
 * POST /api/daily-mentor/chat
 *
 * Request body:
 *   { "question": "...", "conversationId": "..." (optional) }
 *
 * Response:
 *   { status, message, data: { conversationId, answer } }
 */
export const chat = asyncHandler(async (req, res, next) => {
  const { question, conversationId } = req.body;

  if (!question || typeof question !== 'string' || !question.trim()) {
    return next(
      new AppError('Please provide a valid "question" in the request body.', 400)
    );
  }

  const result = await dailyMentorService.chat(req.user._id, question.trim(), conversationId);

  return ApiResponse.success(
    res,
    'Daily Mentor responded successfully',
    result,
    200
  );
});
