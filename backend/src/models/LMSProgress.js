import mongoose from 'mongoose';

const lmsProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    course: {
      type: String,
      required: true,
      trim: true
    },
    module: {
      type: String,
      trim: true,
      default: null
    },
    completion: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    quizScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    assignmentScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    attendance: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const LMSProgress = mongoose.model('LMSProgress', lmsProgressSchema);
export default LMSProgress;
