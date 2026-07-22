import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: "Hello",
    });
    console.log(interaction.output_text);
  } catch (err) {
    console.error("interactions.create failed:", err.message);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: 'Hello',
    });
    console.log("models.generateContent success:", response.text);
  } catch (err) {
    console.error("generateContent failed:", err.message);
  }
}

test();
