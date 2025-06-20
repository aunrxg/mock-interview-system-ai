import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Job } from "../models/job.model";
import { runCodeAgainstTestCases } from "../utils/codeExec";
import { AiReview } from "../utils/aiService";
import { ApiResponse } from "../utils/apiResponse";
import { User } from "../models/user.model";
import { Attempt } from "../models/attempt.model";


const runCode = asyncHandler(async(req, res) => {
  try {
    const { code, language, testCases } = req.body;

    if([code, language].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Fields are required.");
    }
    if(!testCases) throw new ApiError(400, "TestCases are required.")

    const testResult = await runCodeAgainstTestCases(code, language, testCases);

    return res.status(200).json(
      new ApiResponse(
        200,
        { testResult: testResult },
        "Run test cases successfuly"
      )
    )
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong while running test cases." })
  }
})

const submitCode = asyncHandler(async(req, res) => {
  // this will submit the code from user, a post request
  try {
    // 1. get the jobId, code and selected lang
    const { jobId, code, language } = req.body;
    const userId = req.user?._id

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

    //5.5 make db entry

    const makeSub = await Attempt.create({
      userId: userId,
      jobId: jobId,
      language: language,
      code: code,
      judgeResult: testResult,
    });

    const createdSub = await Attempt.findById(makeSub._id)
    if(!createdSub) throw new ApiError(500, "Something went wrong while creating submisssion.")

    // 6. return response
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          testResult: testResult,
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

const getAllSubmissions = asyncHandler(async (req, res) => {

  // get userId, and problemId 
  const userId = req.user?._id;
  const jobId = req.params.jobId || req.query.jobId;

  if(!userId || !jobId) {
    throw new ApiError(400, "Fields are required.");
  }

  const job = await Job.findById(jobId);
  if(!job) {
    throw new ApiError(404, "Job not found.");
  }

  const submissions = await Attempt.find({ userId, jobId })
    .sort({ createdAt: -1 })
    .select('-__v')
    .lean();

  if(!submissions) {
    throw new ApiError(500, "Internal server error");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      { submissions },
      'Submission fetched successfuly'
    )
  );
});

const getSubmisson = asyncHandler(async (req, res) => {

  const { id } = req.params;
  if(!id) {
    throw new ApiError(400, "Id is rquired");
  }

  const submission = await Attempt.findById(id);
  if(!submission) {
    throw new ApiError(404, "Submission not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { submission },
      "submission fetch successfuly"
    )
  );
});

const getAiReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
      throw new ApiError(400, "ID is required.");
    }
  
    const submission = await Attempt.findById(id);
    if(!submission) {
      throw new ApiError(404, "Submission not found.");
    }
  
    const { jobId, code, language } = submission;
    const job = await Job.findById(jobId);
    if(!job) {
      throw new ApiError(404, "Couldn't fetch question.");
    }
    const { title, description } = job.question;
  
    if(submission.aiFeedback) {
      return res.status(200).json(
        new ApiResponse(
          200,
          submission.aiFeedback,
          "Review Already exist"
        )
      )
    }
    const review = await AiReview({ questionTitle: title, questionDescription: description, code, language });

    submission.aiFeedback = review;
    await submission.save();
  
    return res.status(201).json(
      new ApiResponse(
        201,
        review,
        "review received succefully"
      )
    )
  } catch (error) {
    console.error("Error in getAiReview: ", error);
    throw new ApiError(500, "Internal server errror.");
  }
});



export { runCode, submitCode, getAllSubmissions, getSubmisson, getAiReview };