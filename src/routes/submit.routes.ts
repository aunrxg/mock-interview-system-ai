import { verifyJWT } from "../middlewares/auth.middleware";
import { getAiReview, getAllSubmissions, getSubmisson, submitCode } from "../controllers/submit.controller";
import { Request, Router, Response } from "express";

const submitRouter = Router();

submitRouter.route("/").get((req: Request, res: Response ) => {
  res.send("Api is working");
});
submitRouter.route("/").post(verifyJWT, submitCode);
submitRouter.route("/getAll/:jobId").get(verifyJWT, getAllSubmissions);
submitRouter.route("/get/:id").get(verifyJWT, getSubmisson)
submitRouter.route("/get-ai/:id").get(verifyJWT, getAiReview)
export default submitRouter;