import { submitCode } from "../controllers/submit.controller";
import { Router } from "express";

const submitRouter = Router();

submitRouter.route("/").get((req, res) => {
  res.send("Api is working");
});
submitRouter.route("/").post(submitCode);

export default submitRouter;