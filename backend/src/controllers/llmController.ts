import axios from "axios";
import { Request, Response } from "express";

export const sendToLLM = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;
  const prompt =
    `
  You are an advanced AI editor. Your task is to review the following article and provide up to 4 structured, specific feedback suggestions to improve it. 
  Each suggestion should be in a numbered list and focus on clarity, grammar, engagement, and content quality.
  Return the response in the following JSON format:

  {
    "suggestions": [
      "Fix grammatical errors in the first paragraph.",
      "Make the introduction more engaging.",
      "Replace complex words with simpler alternatives.",
      "Improve sentence transitions between sections.",
      "Ensure the conclusion summarizes key points.",
      "Add relevant examples to strengthen arguments."
    ]
  }
  DO NOT add a single word or character besides this object!

  Here is the article: ` + text;
  if (!text) {
    res.status(400).json({ message: "Text is required" });
    return;
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.LLM_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    const aiResponse = data.candidates[0].content.parts[0].text;
    // const parsedSuggestions = aiResponse.suggestions || [
    //   "No improvements detected.",
    // ];
    console.log(aiResponse);
    res.status(200).json({ suggestions: aiResponse });
  } catch (err) {
    const error = err as any;
    console.error(
      "Error communicating with LLM API:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Failed to communicate with LLM API" });
  }
};
