import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['interested', 'applied', 'interviewing', 'offered', 'rejected'],
      default: 'interested'
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
