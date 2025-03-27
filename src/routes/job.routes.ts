import { getAllJobs, getJobById } from "../controllers/job.controller";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

const jobRouter = Router();

jobRouter.route("/").get(verifyJWT, getAllJobs);
jobRouter.route("/:id").get(verifyJWT, getJobById);

export default jobRouter;