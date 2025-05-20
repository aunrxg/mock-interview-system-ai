import { verifyJWT } from "../middlewares/auth.middleware";
import { getSubmissions, submitCode } from "../controllers/submit.controller";
import { Router } from "express";

const submitRouter = Router();

submitRouter.route("/").get((req, res) => {
  res.send("Api is working");
});
submitRouter.route("/").post(verifyJWT, submitCode);
submitRouter.route("/get/:jobId").get(verifyJWT, getSubmissions);

export default submitRouter;