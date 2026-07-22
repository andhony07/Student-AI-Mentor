import * as taskService from '../services/taskService.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/errorHandler.js';

export const getTasks = asyncHandler(async (req, res, next) => {
  const result = await taskService.getTasks(req.user._id);
  return ApiResponse.success(res, 'Tasks retrieved successfully', { tasks: result }, 200);
});

export const createTask = asyncHandler(async (req, res, next) => {
  const result = await taskService.createTask(req.user._id, req.body);
  return ApiResponse.success(res, 'Task created successfully', { task: result }, 201);
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await taskService.updateTask(id, req.user._id, req.body);
  if (!result) {
    return next(new AppError('Task not found or unauthorized', 404));
  }
  return ApiResponse.success(res, 'Task updated successfully', { task: result }, 200);
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await taskService.deleteTask(id, req.user._id);
  if (!result) {
    return next(new AppError('Task not found or unauthorized', 404));
  }
  return ApiResponse.success(res, 'Task deleted successfully', null, 200);
});
