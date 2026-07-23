import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  originalFilename: {
    type: String,
    required: true
  },
  storedFilename: {
    type: String,
    required: true
  },
  resumeHash: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  analysisCache: {
    type: Object,
    default: null
  }
}, {
  timestamps: true // Automatically manages createdAt (Upload Timestamp) and updatedAt
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
