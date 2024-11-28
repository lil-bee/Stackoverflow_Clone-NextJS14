import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { question } = body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  if (!question) {
    throw new Error("question is not set in");
  }

  try {
    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are a knowledgeable assistant that provides quality information. 
        Please help the user by providing detailed, straight to the point, simple, easy to grasp, and accurate answers.
  
        Question: ${question}
      `;

    const result = await model.generateContent(prompt, {
      customHeaders: {
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", result); // Logging response

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message });
  }
}
