import * as userService from '../services/userService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res, next) => {
  const result = await userService.getProfile(req.user._id);
  return ApiResponse.success(res, 'User profile retrieved successfully (placeholder)', result, 200);
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const result = await userService.updateProfile(req.user._id, req.body);
  return ApiResponse.success(res, 'User profile updated successfully (placeholder)', result, 200);
});
