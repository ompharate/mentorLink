import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function askGeminiAI(content: string) {
  const combined = [
    {
      role: "user",
      parts: [
        {
          text: `
          you are give the word please give me meaning of the word in marathi :
          ${content}
         
          `,
        },
      ],
    },
  ];

  try {
    const result = await model.generateContent({
      contents: combined,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.1,
      },
    });

    return result.response?.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content from Gemini AI");
  }
}