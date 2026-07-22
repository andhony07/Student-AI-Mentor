import Task from '../models/Task.js';

export const getTasks = async (userId) => {
  return await Task.find({ user: userId });
};

export const createTask = async (userId, taskData) => {
  return await Task.create({ ...taskData, user: userId });
};

export const updateTask = async (taskId, userId, taskData) => {
  return await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    taskData,
    { new: true }
  );
};

export const deleteTask = async (taskId, userId) => {
  return await Task.findOneAndDelete({ _id: taskId, user: userId });
};
