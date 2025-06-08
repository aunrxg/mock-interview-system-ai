import mongoose from "mongoose";
import { IAttempt } from "my-types";

const attemptSchema = new mongoose.Schema<IAttempt>({
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
  aiFeedback: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }, 
  judgeResult: {
    allPassed: Boolean,
    totalTime: String,
    maxMemory: String,
    results: [
      {
        input: String,
        expectedOutput: String,
        actualOutput: String,
        passed: Boolean,
        status: String,
        time: String,
        space: String,
        error: { type: String, default: null },
      }
    ],
  }
}, {
  timestamps: true,
});

export const Attempt = mongoose.model("Attempt", attemptSchema);
