import { verifyJWT } from "../middlewares/auth.middleware";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

//secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);

export default userRouter;