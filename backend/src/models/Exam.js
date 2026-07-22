import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  topics: {
    type: [String],
    required: true,
    validate: [v => v.length > 0, 'At least one topic is required per subject']
  }
}, { _id: false });

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  examName: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  dailyStudyHours: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  subjects: {
    type: [subjectSchema],
    required: true,
    validate: [v => v.length > 0, 'At least one subject is required']
  },
  generatedStudyPlan: {
    type: mongoose.Schema.Types.Mixed // Will store the JSON returned by Gemini
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
