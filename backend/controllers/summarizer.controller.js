import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const summarizeSession = async (messages=[]) => {
  if (!messages || messages.length < 4) {
    return ""; // Not enough data to summarize
  }

  const systemPrompt = `
    You are summarizing a short conversation between a user and a voice assistant.
    Summarize the topic and key facts discussed so far in 1–2 natural sentences.
    Use natural language, not bullet points or headers.
    Keep it concise but specific, as if prepping for a follow-up.
      `.trim();

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    ...messages.slice(-10), // Only the last 10 messages (limit context)
  ];

  const result = await model.generateContent({ contents });
  const summary = result.response.text().trim();

  console.log(`🧠 Summarizer output: ${summary}`);
  return summary;
};
