import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

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

export { registerUser };