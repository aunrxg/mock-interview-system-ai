import axios from "axios";
import { TestCase, TestCaseResult, RunCodeResponse } from "my-types";

const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
};

export const runCodeAgainstTestCases = async (
  code: string,
  language: string,
  testCases: TestCase[]
): Promise<RunCodeResponse> => {
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
          time: result.time || "NA",
          space: result.memory ? `${result.memory} KB` : "NA",  
          error: result.stderr || result.compile_output || null,
        });
      } else {
        results.push({
          input,
          expectedOutput,
          actualOutput: "",
          passed: false,
          status: "Timeout",
          time: "NA",
          space: "NA",
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
        time: "NA",
        space: "NA",
        error: error.message,
      });
    }
  }

  const totalTime = results.reduce((sum, r) => {
    const timeNum = parseFloat(r.time || '0');
    return sum + (isNaN(timeNum) ? 0 : timeNum);
  }, 0).toFixed(3) + 's';

  const maxMemory = results.reduce((max, r) => {
    const mem = parseInt(r.space || '0');
    return Math.max(max, isNaN(mem) ? 0 : mem);
  }, 0) + 'KB';

  // const errors = results
  //   .filter(r => r.error)
  //   .map(r => r.error as string);
  // const error = ""

  // if(!errors.length && results.every(r => r.passed)) {
  //   errors.push('❌ Wrong Answer')
  // }

  return {
    allPassed: results.every(r => r.passed),
    totalTime,
    maxMemory,
    // errors,
    results,
  };
};
