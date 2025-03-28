import axios from "axios";
import { TestCaseSchema } from "types";


const languageMap: Record<string, number> = {
  python: 71,
  javascript: 63,
  java: 62,
};


export const runCodeAgainstTestCases = async (
  code: string,
  language: string,
  testCases: { input: string, expectedOutput: string }[]
): Promise<TestCaseSchema[]> => {
  try {
    if(!languageMap[language]) {
      throw new Error("Unsupported programming language");
    }

    const results = [];
    console.log("Running code using judge0 api");

    for (const testCase of testCases) {
      const { input, expectedOutput } = testCase;

      const response = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/?base64_encoded=false&wait=false`,
        {
          source_code: code,
          language_id: languageMap[language],
          stdin: input,
          expected_output: expectedOutput,
        },
        {
          headers: {
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
            "X-RapidAPI-Host": process.env.JUDGE0_API_HOST,
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      console.log("Token from judge0: ", token);

      let executionResult = null;
      let attempts = 0;
      let maxAttempts = 10;

      while(!executionResult && attempts < maxAttempts) {
        try {
          const result = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encode=false`,
            {
              headers: {
                "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
                "X-RapidAPI-Host": process.env.JUDGE0_API_HOST,
              },
            });

          if(result.data.status.id >= 3) {
            executionResult = result.data;
            console.log("Receiving result from judge0: ", executionResult);
          } else {
            console.log("Waiting for judge0 to complete processing...");
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        } catch (error) {
          console.error("Error while polling judge0: ", error);
          break;
        }

        attempts++;
      }
      console.log("Got the result from judge0");
      
      if (!executionResult) {
        console.error("Failed to retrieve the result from Judge0 after multiple attempts.");
        results.push({
          input,
          expectedOutput,
          actualOutput: "",
          passed: false,
          status: "Execution Timeout",
          error: "Judge0 API did not respond with a completed status.",
        });
        continue;
      }

      results.push({
        input,
        expectedOutput,
        actualOutput: executionResult.stdout?.trim() || "" as string,
        passed: executionResult.stdout?.trim() === expectedOutput as string,
        status: executionResult.status.description as string,
        error: (executionResult.stderr || executionResult.compile_output || null) as string | null,
      });
    }

    return results;
  } catch (error: any) {
    console.error("Excecution error: ", error);
    return [];
  }
};
