import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
    explanation: {
      type: String
    },
  },
  {
    _id: false,
  }
);

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    constraints: {
      type: [String],
      required: true,
    },
    testCases: {
      type: [TestCaseSchema],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    tags: [String],
  },
  {
    _id: false,
  }
);

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
  },
  skills: {
    type: [String],
  },
  question: {
    type: QuestionSchema,
    required: true,
  },
}, {
  timestamps: true
});

export const Job = mongoose.model("Job", JobSchema);
