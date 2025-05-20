import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  language: {
    type: String,
    enum: ["python", "javascript", "java"],
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  // stdout: {
  //   type: String,
  // },
  // stderror: {
  //   type: [String],
  // },
  status: {
    type: Boolean,
  },
  time: {
    type: String,
  }, 
  space: {
    type: String,
  },
  aiFeedback: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

export const Attempt = mongoose.model("Attempt", attemptSchema);
