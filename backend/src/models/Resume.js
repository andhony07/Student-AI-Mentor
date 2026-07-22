import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  parsedText: {
    type: String
  },
  analysis: {
    skillsIdentified: [String],
    experienceSummary: String,
    educationSummary: String,
    recommendations: [String],
    rawGeminiResponse: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
