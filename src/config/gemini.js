import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD49X5mLhRooECRoLZaq3uYUqsnZTyeTmo");

async function main(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

  const result = await model.generateContent(prompt); // 👈 prompt dynamic
  const response = await result.response;
  const text = await response.text();

  return text; // 👈 return the text to use in UI
}

export default main;
