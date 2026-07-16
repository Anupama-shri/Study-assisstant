import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateFlashcards = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Notes are required.",
      });
    }

    const prompt = `
You are an AI Study Assistant.

Generate exactly 10 flashcards.

Return ONLY valid JSON.

Format:

{
  "flashcards": [
    {
      "question": "Question here",
      "answer": "Answer here"
    }
  ]
}

Do not return markdown.
Do not return explanation.
Do not return any extra text.

Study Notes:

${notes}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON:", text);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
      });
    }

    if (!parsed.flashcards || !Array.isArray(parsed.flashcards)) {
      return res.status(500).json({
        success: false,
        message: "Unexpected AI response.",
      });
    }

    res.json({
      success: true,
      flashcards: parsed.flashcards,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};