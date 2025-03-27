import dotenv from "dotenv";
import connectDB from "./db";
import { app } from "./app";
import { Job } from "./models/job.model";

dotenv.config({
  path: "./env",
})

const seedJobs = async () => {

  const jobs = [
    {
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      question: {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        constraints: [
          "Each input has exactly one solution.",
          "You may not use the same element twice.",
          "You can return the answer in any order."
        ],
        testCases: [
          { input: "[2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
          { input: "[3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] = 2 + 4 = 6" }
        ],
        tags: [ "Array", "Loops" ],
      }
    },
    {
      title: "Backend Developer",
      company: "Amazon",
      location: "Seattle, WA",
      question: {
        title: "Reverse String",
        description: "Write a function that reverses a string. The input string is given as an array of characters s.",
        constraints: [
          "Do not allocate extra space for another array.",
          "You must do this by modifying the input array in-place."
        ],
        testCases: [
          { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: "Reversed string." },
          { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: "Reversed string." }
        ],
        tags: [ "Array", "String", "Loops" ],
      }
    }
  ];

  await Job.deleteMany({});
  await Job.insertMany(jobs);

  console.log("Database seeded with job listings and questions.");
  process.exit();
};



connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is runnings at PORT : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MongoDB connection failed !! ", err);
})
// seedJobs().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });