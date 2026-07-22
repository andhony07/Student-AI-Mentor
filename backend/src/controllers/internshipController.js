import * as internshipService from '../services/internshipService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getInternships = asyncHandler(async (req, res, next) => {
  const result = await internshipService.getInternships();
  return ApiResponse.success(res, 'Internship tracking records retrieved', { internships: result }, 200);
});

export const addInternship = asyncHandler(async (req, res, next) => {
  const result = await internshipService.applyInternship(req.body);
  return ApiResponse.success(res, 'Internship tracking record added', { internship: result }, 201);
});

export const searchJobs = asyncHandler(async (req, res, next) => {
  const { query } = req.query;
  const result = await internshipService.searchExternalJobs(query || 'Backend');
  return ApiResponse.success(res, 'Job search completed', result, 200);
});
