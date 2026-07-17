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

    const prompt = `
You are an expert AI Study Assistant.

Analyze the following study notes and generate two types of study materials:
1. Exactly 10 flashcards (each with a question and a clear answer).
2. Exactly 10 multiple-choice quiz questions (each with a question, exactly 4 unique options, the correctIndex (0-3), and a brief explanation).

Return ONLY valid JSON with this format:
{
  "flashcards": [
    {
      "question": "...",
      "answer": "..."
    }
  ],
  "quiz": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "..."
    }
  ]
}

Study Notes:
${notes}
`;

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

    const content = completion.choices[0].message.content;
    const parsed = JSON.parse(content);

    let flashcards = [];
    let quiz = [];

    // Find flashcards array using variations of keys
    const flashcardKeys = ["flashcards", "flashcard", "flash_cards", "flash_card", "cards", "items"];
    for (const key of flashcardKeys) {
      if (parsed[key] && Array.isArray(parsed[key]) && parsed[key].length > 0) {
        flashcards = parsed[key];
        break;
      }
    }

    // Find quiz array using variations of keys
    const quizKeys = ["quiz", "quizzes", "quiz_questions", "questions", "quizQuestions", "items"];
    for (const key of quizKeys) {
      if (parsed[key] && Array.isArray(parsed[key]) && parsed[key].length > 0) {
        if (parsed[key][0].options || parsed[key][0].choices) {
          quiz = parsed[key];
          break;
        }
      }
    }

    // If both failed to find any array, search for any array in root keys
    if (flashcards.length === 0 && quiz.length === 0) {
      for (const key in parsed) {
        if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
          if (parsed[key][0].options || parsed[key][0].choices) {
            quiz = parsed[key];
          } else {
            flashcards = parsed[key];
          }
        }
      }
    }

    // Fallbacks if one is missing but the other exists
    if (flashcards.length === 0 && quiz.length > 0) {
      flashcards = quiz.map((q) => ({
        question: q.question,
        answer: Array.isArray(q.options) ? q.options[q.correctIndex || 0] : "Selected option is the answer"
      }));
    } else if (quiz.length === 0 && flashcards.length > 0) {
      quiz = flashcards.map((fc) => ({
        question: fc.question,
        options: [
          fc.answer,
          "Alternative option B",
          "Alternative option C",
          "Alternative option D"
        ],
        correctIndex: 0,
        explanation: `The correct answer is: ${fc.answer}`
      }));
    }

    if (flashcards.length === 0 && quiz.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Unexpected AI response format.",
      });
    }

    res.json({
      success: true,
      flashcards: flashcards.slice(0, 10),
      quiz: quiz.slice(0, 10),
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