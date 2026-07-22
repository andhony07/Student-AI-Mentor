import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
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
    required: true,
    unique: true
  },
  extractedText: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically manages createdAt (Upload Timestamp) and updatedAt
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
