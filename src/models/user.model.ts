import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { _id: string };
    }
  }
}

const userSchema = new mongoose.Schema({
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
  // fullName: {},
  // avatar: {},
  // refreshToken: {},
}, {
  timestamps: true
});


userSchema.pre("save", async function (next) {

  if(!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
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

userSchema.methods.generateRefreshToken = function () {
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

export const User = mongoose.model("User", userSchema);
