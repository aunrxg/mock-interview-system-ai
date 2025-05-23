import { verifyJWT } from "../middlewares/auth.middleware";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, saveJob } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

//secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/me").get(verifyJWT, getCurrentUser);
userRouter.route("/save-job").post(verifyJWT, saveJob)

export default userRouter;