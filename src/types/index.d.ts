import { Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  fullName?: string;
  email: string;
  password: string;
  refreshToken?: string | null;
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