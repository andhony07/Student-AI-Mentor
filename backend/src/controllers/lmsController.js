import * as lmsService from '../services/lmsService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

// Allowed MIME types for xlsx uploads
const ALLOWED_MIMETYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

/**
 * POST /api/lms/upload
 * Accepts a multipart/form-data file, validates it is an xlsx,
 * parses it, and stores all records in MongoDB.
 */
export const uploadLMS = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded. Please attach an Excel (.xlsx) file.', 400));
  }

  const { mimetype, originalname } = req.file;
  const ext = originalname.split('.').pop().toLowerCase();

  if (ext !== 'xlsx' || !ALLOWED_MIMETYPES.includes(mimetype)) {
    return next(
      new AppError(
        'Invalid file type. Only .xlsx Excel files are accepted. CSV, PDF, and Word files are not supported.',
        415
      )
    );
  }

  const { recordsInserted, skippedRows } = await lmsService.uploadAndStoreLMS(req.user._id, req.file.buffer);

  return res.status(200).json({
    success: true,
    message: 'LMS uploaded successfully',
    recordsInserted,
    ...(skippedRows > 0 && { skippedRows }),
  });
});

/**
 * GET /api/lms/analyze
 * Reads stored LMS records and generates a Gemini-powered analysis report.
 */
export const analyzeLMS = asyncHandler(async (req, res, next) => {
  const analysis = await lmsService.analyzePerformance(req.user._id);
  return ApiResponse.success(res, 'LMS analysis generated successfully', analysis, 200);
});

/**
 * POST /api/lms/chat
 * Accepts a natural language question and answers it using stored LMS data via Gemini.
 */
export const chatWithLMS = asyncHandler(async (req, res, next) => {
  const { question } = req.body;

  if (!question || String(question).trim() === '') {
    return next(new AppError('Please provide a question in the request body.', 400));
  }

  const result = await lmsService.chatWithLMSData(req.user._id, String(question).trim());
  return ApiResponse.success(res, 'AI Mentor response generated', result, 200);
});
