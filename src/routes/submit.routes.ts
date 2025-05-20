import { verifyJWT } from "../middlewares/auth.middleware";
import { getAllSubmissions, getSubmisson, submitCode } from "../controllers/submit.controller";
import { Router } from "express";

const submitRouter = Router();

submitRouter.route("/").get((req, res) => {
  res.send("Api is working");
});
submitRouter.route("/").post(verifyJWT, submitCode);
submitRouter.route("/getAll/:jobId").get(verifyJWT, getAllSubmissions);
submitRouter.route("/get/:id").get(verifyJWT, getSubmisson)
export default submitRouter;