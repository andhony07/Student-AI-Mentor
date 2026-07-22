import * as authService from '../services/authService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

export const register = asyncHandler(async (req, res, next) => {
  await authService.registerUser(req.body);
  return ApiResponse.success(res, 'Registration successful. Please login.', null, 201);
});

export const login = asyncHandler(async (req, res, next) => {
  const result = await authService.loginUser(req.body);
  return res.status(200).json({
    status: 'success',
    token: result.token,
    user: result.user
  });
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json({
    status: 'success',
    user
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await authService.updateProfile(req.user._id, req.body);
  return res.status(200).json({
    status: 'success',
    user
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  await authService.changePassword(req.user._id, req.body);
  return res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });
});
