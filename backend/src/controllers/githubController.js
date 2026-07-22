import * as githubService from '../services/githubService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res, next) => {
  const result = await githubService.getGithubProfile(req.user);
  return ApiResponse.success(res, 'GitHub profile retrieved successfully', result, 200);
});

export const syncProfile = asyncHandler(async (req, res, next) => {
  const result = await githubService.syncGithubProfile(req.user);
  return ApiResponse.success(res, 'GitHub profile synced successfully', result, 200);
});
