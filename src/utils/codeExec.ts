import axios from "axios";

const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
};

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  status: string;
  error: string | null;
}

export const runCodeAgainstTestCases = async (
  code: string,
  language: string,
  testCases: TestCase[]
): Promise<TestCaseResult[]> => {
  const results: TestCaseResult[] = [];

  if (!languageMap[language]) {
    throw new Error("Unsupported language");
  }

  for (const { input, expectedOutput } of testCases) {
    try {
      // 1. Submit code to Judge0
      const submitRes = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=false`,
        {
          source_code: code,
          language_id: languageMap[language],
          stdin: input,
        },
        {
          headers: {
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
            "X-RapidAPI-Host": process.env.JUDGE0_API_HOST!,
            "Content-Type": "application/json",
          },
        }
      );

      const token = submitRes.data.token;

      // 2. Poll for result
      let result = null;
      for (let attempt = 0; attempt < 10; attempt++) {
        const pollRes = await axios.get(
          `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`,
          {
            headers: {
              "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
              "X-RapidAPI-Host": process.env.JUDGE0_API_HOST!,
            },
          }
        );

        if (pollRes.data.status.id >= 3) {
          result = pollRes.data;
          break;
        }

        await new Promise(res => setTimeout(res, 500)); // wait before retry
      }

      // 3. Push result
      if (result) {
        const actualOutput = result.stdout?.trim() || "";
        results.push({
          input,
          expectedOutput,
          actualOutput,
          passed: actualOutput === expectedOutput,
          status: result.status.description,
          error: result.stderr || result.compile_output || null,
        });
      } else {
        results.push({
          input,
          expectedOutput,
          actualOutput: "",
          passed: false,
          status: "Timeout",
          error: "Judge0 didn't respond in time",
        });
      }
    } catch (error: any) {
      results.push({
        input,
        expectedOutput,
        actualOutput: "",
        passed: false,
        status: "Error",
        error: error.message,
      });
    }
  }

  return results;
};
