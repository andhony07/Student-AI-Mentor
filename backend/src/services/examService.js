import Exam from '../models/Exam.js';

export const getExams = async (userId) => {
  return await Exam.find({ user: userId });
};

export const createExam = async (userId, examData) => {
  return await Exam.create({ ...examData, user: userId });
};

export const updateExam = async (examId, userId, examData) => {
  return await Exam.findOneAndUpdate(
    { _id: examId, user: userId },
    examData,
    { new: true }
  );
};

export const deleteExam = async (examId, userId) => {
  return await Exam.findOneAndDelete({ _id: examId, user: userId });
};
