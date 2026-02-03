import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function runLLM({ system, user, type }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
      temperature: type === "critical" ? 0.85 : 0.6,
    },
  });

  // ✅ SDK expects STRING or ARRAY OF STRINGS
  const prompt = `${system}\n\n${user}`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}
