import Exam from '../models/Exam.js';

export const getExams = async () => {
  return await Exam.find({});
};

export const createExam = async (examData) => {
  return await Exam.create(examData);
};

export const updateExam = async (examId, examData) => {
  return await Exam.findByIdAndUpdate(examId, examData, { new: true });
};

export const deleteExam = async (examId) => {
  return await Exam.findByIdAndDelete(examId);
};
