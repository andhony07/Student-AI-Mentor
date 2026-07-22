import * as authService from '../services/authService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await authService.registerUser({ name, email, password });
  return ApiResponse.success(res, 'User registered successfully', result, 201);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.loginUser({ email, password });
  return ApiResponse.success(res, 'User logged in successfully', result, 200);
});

export const getMe = asyncHandler(async (req, res, next) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    profile: req.user.profile
  };
  return ApiResponse.success(res, 'Current user profile fetched', { user }, 200);
});
