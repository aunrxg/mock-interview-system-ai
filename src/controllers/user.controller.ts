import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler( async (req, res) => {
  // 1. get user details from frontend
  // 2. validation
  // 3. check if user already exist
  // 4. create user object
  // 5. remove password and refresh token from token
  // 6. check if the user is created
  // 7. return the res
});

export { registerUser };