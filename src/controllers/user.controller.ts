import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { Types } from "mongoose";

const generateAccessAndRefreshTokens = async (userId: Types.ObjectId) => {
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

const registerUser = asyncHandler( async (req, res) => {
  // 1. get user details from frontend
  const { email, username, password } = req.body;

  // 2. validation
  if(
    [email, username, password].some((field) => field?.trim() === "")
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
    email,
    password,
  });

  // 5. remove password and refresh token from token
  const createdUser = await User.findById(user._id).select(" -password -refreshToken");

  // 6. check if the user is created
  if(!createdUser) throw new ApiError(500, "Something went wrong while registering user.");

  // 7. return the res
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully.")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  // req body data
  const { email, username, password } = req.body;

  // username or email exits?
  if(!email || !username) {
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
  const options = {
    httpOnly: true,
    secure: true,
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

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(200, {}, "User loggedOut successfully")
    )
});

export { registerUser, loginUser, logoutUser, };