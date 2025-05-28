import { getPersona } from "./personaManager.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const systemPrompt = `
// You are a friendly, casual, human-like voice assistant.
// Keep your answers short, natural, and conversational.
// Avoid robotic phrasing, and never explain obvious things.
// Use contractions, natural pauses, and avoid listing unless really needed.
// `;

export const askGemini = async (
  sessionId,
  userPrompt,
  personaId,
  memory = [],
  summary = ""
) => {
  const persona = getPersona(personaId);

  const promptParts = [
    { role: "user", parts: [{ text: persona.prompt }] },
    {
      role: "user",
      parts: [{ text: summary || "This is an ongoing conversation." }],
    },
    ...memory,
    { role: "user", parts: [{ text: userPrompt }] },
  ];

  const result = await model.generateContent({ contents: promptParts });
  return result.response.text();
};
