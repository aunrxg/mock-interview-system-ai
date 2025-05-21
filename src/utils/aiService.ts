import { GoogleGenAI } from "@google/genai";
import { ReviewInput } from "types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function AiReview({ questionTitle, questionDescription, code, language  }: ReviewInput): Promise<string> {

  const prompt = `
    You are a senior software engineer and technical interviewer reviewing a candidate's coding solution.

    ### Problem Description
    ${questionTitle}: 
    ${questionDescription}

    ### Candidate's submission (in ${language})
    ${code}

    ### Instructions: 
    Please provide a detailed review including: 
    1. **Correction**: Are there any logical errors or bugs? Mention edge cases it may fail.
    2. **Time & Space Complexity**: Estimate and comment on efficiency.
    3. **Code Style & Readability**: How readable and maintainable is the code?
    4. **Suggestions for Improvement**: Any changes to improve logic, structure, or performance.
    5. **Alternative Better Solution**: If applicable, provide a cleaner or more efficient solution.
    6. **Explanation**: Explain why your suggested solution is better.

    Make sure the feedback is constructive, technical and help the candidate learn.

    Begin your review below: 
  `;


  try {
    const response = await ai.models.generateContent({ 
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
     });
     return response.text || "AI review could not be generated. Please try again later.";
  } catch (error) {
    console.error("AI review failed: ", error);
    return "We couldn't fetch the ai review at this time. Please try again later.";
  }
}