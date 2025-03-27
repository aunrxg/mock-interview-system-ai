import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { Job } from "../models/job.model";

const getAllJobs = asyncHandler(async(_, res) => {
  // this is a get request so we don't need to get anything from the user, but we will check if the user is authorized
  // hit the endpoint when /jobs page is called
  // use .find({}) to get all objects from the jobs document
  const jobs = await Job.find({}).select("-__v -createdAt -updatedAt");

  if(!jobs) {
    throw new ApiError(404, "No Jobs found");
  }

  res.status(201).json(
    new ApiResponse(200, jobs, "Jobs fetch successfully")
  );
});

const getJobById = asyncHandler(async(req, res) => {
  // with this endpoint we will fetch the single job using its id
  // 1. get the id from the body or params
  const { id } = req.params

  // 2. verify if that job exist in db
  // 3. fetch that particular job using the id
  const job = await Job.findById(id);
  if(!job) {
    throw new ApiError(404, "Job not found");
  }

  // 4. send the response
  res.status(200).json(new ApiResponse(200, job, "job fetched"));
});

export { getAllJobs, getJobById };