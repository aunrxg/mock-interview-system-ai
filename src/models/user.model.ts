import mongoose, { Model } from "mongoose";
// import HookNextFunction from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { IUser } from "../my-types";

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: 8,
  },
  jobs: [{
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    savedAt: { type: Date, default: Date.now }
  }],
  // fullName: {},
  // avatar: {},minlength: 8,
  refreshToken: {
    type: String,
  },
}, {
  timestamps: true
});


userSchema.pre<IUser>("save", async function (next) {

  if(!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (): string {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
  }

  const options: SignOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"],
  }
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, options)
}

userSchema.methods.generateRefreshToken = function (): string {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
  }

  const options: SignOptions = {
    expiresIn: env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
  }
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, options);
}

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
