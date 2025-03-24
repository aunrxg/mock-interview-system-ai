import mongoose from "mongoose";

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


export const User = mongoose.model("User", userSchema);
