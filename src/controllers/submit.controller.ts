import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Job } from "../models/job.model";
import { runCodeAgainstTestCases } from "../utils/codeExec";
import { getAIReview } from "../utils/aiService";
import { ApiResponse } from "../utils/apiResponse";


const submitCode = asyncHandler(async(req, res) => {
  // this will submit the code from user, a post request
  try {
    // 1. get the jobId, code and selected lang
    const { jobId, code, language } = req.body;

    // 2. verify that they exist and not empty
    if([jobId, code, language].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "fields are required");
    }

    // 3. verify the question exist
    const job = await Job.findById(jobId);
    if(!job || !job.question) {
      throw new ApiError(404, "Job or question not found.");
    }

    const { testCases } = job.question;
    if(!testCases || testCases.length === 0) {
      throw new ApiError(400, "No test cases provided.");
    }

    // 4. run test cases
    const testResult = await runCodeAgainstTestCases(code, language, testCases);

    // 5. send to ai
    // const aiFeedBack = await getAIReview(code, language, testResult);

    // 6. return response
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          testResults: testResult,
          // aiFeedBack
        },
        "Submission success"
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export { submitCode };