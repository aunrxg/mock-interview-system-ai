import { Types } from "mongoose";

interface savedJob {
  job: mongoose.Type.ObjectId;
  savedAt: Date;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  fullName?: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  jobs: savedJob[];
  isModified(path: string): boolean;
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface DecodedToken {
  _id: string;
  email: string;
  username: string;
}

export interface TestCaseSchema {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  status: string;
  error: string | null;
}


export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  status: string;
  time: string;
  space: string;
  error: string | null;
}

export interface RunCodeResponse {
  allPassed: boolean;
  totalTime: string;
  maxMemory: string;
  // errors: string[];
  results: TestCaseResult[];
}

export interface IAttempt extends Document {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  language: string;
  code: string;
  aiFeedback?: string;
  submittedAt: Date;
  judgeResult?:RunCodeResponse;
}

export interface ReviewInput {
  questionTitle: string;
  questionDescription: string;
  code: string;
  language: string;
}

export interface IUserJob {
  job: mongoose.Types.ObjectId;
  savedAt: Date;
}