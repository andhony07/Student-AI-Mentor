import * as examService from '../services/examService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

export const getExams = asyncHandler(async (req, res, next) => {
  const result = await examService.getExams();
  return ApiResponse.success(res, 'Exams retrieved successfully', { exams: result }, 200);
});

export const createExam = asyncHandler(async (req, res, next) => {
  const result = await examService.createExam(req.body);
  return ApiResponse.success(res, 'Exam scheduled successfully', { exam: result }, 201);
});

export const updateExam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await examService.updateExam(id, req.body);
  if (!result) {
    return next(new AppError('Exam not found', 404));
  }
  return ApiResponse.success(res, 'Exam updated successfully', { exam: result }, 200);
});

export const deleteExam = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await examService.deleteExam(id);
  if (!result) {
    return next(new AppError('Exam not found', 404));
  }
  return ApiResponse.success(res, 'Exam deleted successfully', null, 200);
});
