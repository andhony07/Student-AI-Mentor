import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  durationMinutes: {
    type: Number,
    default: 180
  },
  topicsToCover: [String],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
