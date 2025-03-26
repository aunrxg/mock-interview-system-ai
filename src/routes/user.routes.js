import { verifyJWT } from "../middlewares/auth.middleware";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;