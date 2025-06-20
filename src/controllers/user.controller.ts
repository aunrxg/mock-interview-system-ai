import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { DecodedToken, IUserJob } from "my-types";
import { Job } from "../models/job.model";
import { Request, Response } from "express";
import { CookieOptions } from "express";

const generateAccessAndRefreshTokens= async (userId: Types.ObjectId) => {
  try {
    const user = await User.findById(userId);
    if(!user) {
      throw new ApiError(404, "User not found.");
    }
    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();

    if(user) {
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
    }

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token");
  }
}

const registerUser = asyncHandler( async (req: Request, res: Response) => {
  // 1. get user details from frontend
  const { fullName, email, username, password } = req.body;

  // 2. validation
  if(
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fields are required");
  }

  // 3. check if user already exist
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if(existedUser) throw new ApiError(409, "User already exist.");

  // 4. create user object
  const user = await User.create({
    username: username ? username.toLowerCase() : "",
    fullName,
    email,
    password,
  });

  // 5. remove password and refresh token from token
  const createdUser = await User.findById(user._id).select(" -password -refreshToken");

  // 6. check if the user is created
  if(!createdUser) throw new ApiError(500, "Something went wrong while registering user.");

  // access and ref token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id as Types.ObjectId);

  // send cookies
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  }
  // 7. return the res
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
    new ApiResponse(200, createdUser, "User registered successfully.")
  );
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // req body data
  const { email, username, password } = req.body;

  // username or email exits?
  if(!(username || email)) {
    throw new ApiError(400, "Username or email is required.");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }]
  });
  if(!user) {
    throw new ApiError(404, "Invalid credetials");
  }

  // passoword check
  const isPasswordValid = await user.isPasswordCorrect(password);
  if(!isPasswordValid) {
    throw new ApiError(401, "Invalid creadentials");
  }

  // access and ref token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id as Types.ObjectId);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  // send cookies
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User loggedin successfully"
      )
    )
});

const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  );

  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  }

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(200, {}, "User loggedOut successfully")
    )
});

const refreshAccessToken = asyncHandler(async(req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as DecodedToken;

  const user = await User.findById(decodedToken?._id);

  if(!user) {
    throw new ApiError(401, "Invalid refresh Token");
  }

  if(incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refres token is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  const options: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  }

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Token is refreshed"
      )
    )

});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current user fetched successfully"
      )
    )
});

const saveJob = asyncHandler(async (req, res) => {
  const { jobId, userId } = req.body

  if(!jobId || !userId) {
    throw new ApiError(400, "fields are required.")
  }

  const job = await Job.findById(jobId);
  if(!job) {
    throw new ApiError(404, "Job not found.");
  }

  const user = await User.findById(userId);
  if(!user) {
    throw new ApiError(404, "User not found");
  }

  const isAlreadySaved = user.jobs.some((savedJob: IUserJob) => savedJob.job.toString() === jobId)
  if(isAlreadySaved) {
    throw new ApiError(400, "Job is already saved")
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { 
      jobs: {
        job: jobId,
        savedAt: new Date()
      }
     } },
    { new: true },
  );
  // console.log("Type of JOBS field in user:", typeof(updatedUser?.jobs))

  if(!updatedUser) {
    throw new ApiError(500, "server ERror")
  }

  return res.status(200).json(new ApiResponse(200, updatedUser, "Job added"))
});

export { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, saveJob };