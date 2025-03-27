import OpenAI from "openai";
import { TestCaseSchema } from "types";

const opneai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIReview = async(
  code: string,
  language: string,
  testResult: TestCaseSchema[]
) => {
  try {
    const prompt = `
    You are an AI coding assistant. The user submitted the following code:

    Language: ${language}
    Code:
    \`\`\`${language}
    ${code}
    \`\`\`

    The code was tested against the following test cases:

    ${testResult.map((t, i) => `Test ${i+1}: Input: ${t.input}, Expected: ${t.expectedOutput}, Got: ${t.actualOutput}, Passed: ${t.passed}`).join("\n")}

    1. Provide a review of the submitted code.
    2. Suggest improvement if necessary.
    3. If a more optimal solution exist, suggest an improvement solution with an explanation.
    `;


    const response = await opneai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are an expert programming mentor." }, { role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI FeedBack Error: ", error);
    return "AI feedback could not be generated.";
  }
};
