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

    for (const testCase of testCases) {
      const { input, expectedOutput } = testCase;

      const response = await axios.post(`${process.env.JUDGE0_API_URL}/submissions`,
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

      let executionResult = null;
      while(!executionResult) {
        const result = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/${token}`, {
          headers: {
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
            "X-RapidAPI-Host": process.env.JUDGE0_API_HOST,
          },
        });

        if(result.data.status.id >= 3) {
          executionResult = result.data.stdout?.trim();
        }
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
