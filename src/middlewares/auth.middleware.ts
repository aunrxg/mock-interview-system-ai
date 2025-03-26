import { ApiError } from "utils/apiError";
import { asyncHandler } from "utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { DecodedToken } from "../types";


export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token) {
      throw new ApiError(401, "Unauthorized requiest");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as DecodedToken;

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if(!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Authentication Failed";
    throw new ApiError(401, errorMsg);
  }
});