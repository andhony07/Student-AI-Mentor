import mongoose from 'mongoose';

const lmsProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  completionPercentage: {
    type: Number,
    default: 0
  },
  grades: [{
    assessmentName: String,
    score: Number,
    maxScore: Number
  }],
  lastAccessed: {
    type: Date
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  }
}, {
  timestamps: true
});

const LMSProgress = mongoose.model('LMSProgress', lmsProgressSchema);
export default LMSProgress;
