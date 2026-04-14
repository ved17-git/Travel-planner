import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'



// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an itenerary planner, you will give the itenerary according to the users request
    "destination":"agra",
    "numberOfDays":9,
    "budget":"Low" `
  });
  console.log(response.text);
}

main();