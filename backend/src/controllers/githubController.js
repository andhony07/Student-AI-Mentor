import * as githubService from '../services/githubService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res, next) => {
  const result = await githubService.getGithubProfile(req.user._id);
  return ApiResponse.success(res, 'GitHub profile retrieved successfully (placeholder)', result, 200);
});

export const syncProfile = asyncHandler(async (req, res, next) => {
  const { githubUsername } = req.body;
  const result = await githubService.syncGithubProfile(req.user._id, githubUsername);
  return ApiResponse.success(res, 'GitHub profile synced successfully (placeholder)', result, 200);
});
