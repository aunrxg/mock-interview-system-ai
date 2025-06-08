import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db";
import { app } from "./app";
import { Job } from "./models/job.model";
import { Jobs } from "./utils/SeedJobs";

const seedJobs = async () => {

  await Job.deleteMany({});
  await Job.insertMany(Jobs);

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