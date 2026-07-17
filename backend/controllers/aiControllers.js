import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateFlashcards = async (req, res) => {
  try {
    const { notes, mode = "flashcards" } = req.body;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Notes are required.",
      });
    }

    let prompt = "";

    if (mode === "quiz") {
      prompt = `
You are an expert AI Study Assistant.

Generate exactly 10 multiple-choice quiz questions.

Return ONLY valid JSON.

Format:
{
  "items":[
    {
      "question":"...",
      "options":["A","B","C","D"],
      "correctIndex":0,
      "explanation":"..."
    }
  ]
}

Study Notes:
${notes}
`;
    } else {
      prompt = `
You are an expert AI Study Assistant.

Generate exactly 10 flashcards.

Return ONLY valid JSON.

Format:
{
  "items":[
    {
      "question":"...",
      "answer":"..."
    }
  ]
}

Study Notes:
${notes}
`;
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const parsed = JSON.parse(
      completion.choices[0].message.content
    );

    if (
      !parsed.items ||
      !Array.isArray(parsed.items) ||
      parsed.items.length === 0
    ) {
      return res.status(500).json({
        success: false,
        message: "Unexpected AI response.",
      });
    }

    res.json({
      success: true,
      items: parsed.items.slice(0, 10),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error?.message || "Failed to generate study material.",
    });
  }
};