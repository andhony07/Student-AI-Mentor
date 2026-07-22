import Task from '../models/Task.js';

export const getTasks = async () => {
  return await Task.find({});
};

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const updateTask = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

export const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};
