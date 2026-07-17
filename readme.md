# 📚 AI Study Assistant

An AI-powered Study Assistant built with **React**, **Node.js**, and a **Large Language Model (LLM)**. Users can paste study notes and instantly generate interactive **Flashcards** or **Multiple Choice Quizzes**. The application focuses on structured AI output, robust error handling, and an engaging learning experience.

---

## ✨ Features

### 📖 Flashcard Mode
- Generate AI-powered flashcards from free-form study notes.
- Interactive flip animation.
- Navigate through flashcards.
- Mark cards as **Known** or **Review Again**.
- Track learning progress.

### 📝 Quiz Mode
- Generate multiple-choice quizzes from study notes.
- Four options per question.
- Instant answer validation.
- Explanation for every correct answer.
- Score tracking.
- Final result summary.

### 🔄 Review Wrong Answers
- Incorrectly answered questions are stored.
- Reattempt only the questions answered incorrectly.

### 📚 Study History
- Every generated session is automatically saved.
- View previous study sessions.
- Reload old flashcards/quizzes without regenerating.
- Stored locally using Local Storage.

### 📊 Progress Tracking
- Live progress bar.
- Correct/Wrong answer count.
- Session summary after completion.

### 📱 Responsive Design
- Mobile-friendly interface.
- Desktop and tablet support.
- Modern UI built using Tailwind CSS.

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React Icons

## Backend
- Node.js
- Express.js

## AI
- Google Gemini API (or Groq API)

---

# 📂 Project Structure

```
Study-Assistant/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-study-assistant.git

cd ai-study-assistant
```

---

## 2. Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

## 3. Install Backend Dependencies

```bash
cd ../backend

npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```
GEMINI_API_KEY=your_api_key
PORT=5000
```

or

```
GROQ_API_KEY=your_api_key
PORT=5000
```

---

## 5. Start Backend

```bash
npm run dev
```

---

## 6. Start Frontend

```bash
cd ../frontend

npm run dev
```

---

The application will be available at

```
http://localhost:5173
```

Backend runs at

```
http://localhost:5000
```

---

# 🧠 AI Usage

The application sends the user's study notes to a Large Language Model through a secure backend API.

The model is instructed to return **structured JSON** instead of plain text.

Depending on the selected mode, the model generates:

### Flashcards

```json
{
  "items": [
    {
      "question": "...",
      "answer": "..."
    }
  ]
}
```

### Quiz

```json
{
  "items": [
    {
      "question": "...",
      "options": [
        "...",
        "...",
        "...",
        "..."
      ],
      "correctIndex": 1,
      "explanation": "..."
    }
  ]
}
```

The frontend parses this JSON and renders interactive UI components instead of displaying raw AI responses.

---

# ⚠ Error Handling

The application gracefully handles common AI failures:

- Empty input validation
- Invalid JSON responses
- Unexpected response structure
- API/network failures
- Loading state
- Retry option on failure
- Empty state
- Backend API key protection
- Prevents application crashes

---

# 💾 Local Storage

The application stores:

- Study history
- Previous flashcards
- Previous quizzes
- User progress
- Wrong-answer sessions

This allows users to revisit previously generated study material without making another AI request.

---

# 🎨 UI Features

- Modern glassmorphism-inspired interface
- Gradient backgrounds
- Responsive layout
- Interactive flashcards
- Animated progress bar
- Quiz explanations
- Icons using Lucide React
- Clean navigation
- Keyboard-friendly interactions

---

# 🤖 AI Assistance Used

AI tools were used to:

- Brainstorm project structure
- Generate prompt templates
- Improve UI/UX ideas
- Debug React and Express issues
- Refactor components
- Suggest error handling strategies
- Improve code organization

All generated code was reviewed, understood, integrated, and modified before inclusion in the project.

---

# ⚠ Known Limitations

- AI responses depend on the quality of the provided notes.
- LLMs may occasionally return malformed or unexpected JSON despite prompt constraints.
- Study history is stored locally and is not synchronized across devices.
- Requires an active internet connection to generate new content.
- API rate limits or temporary service unavailability may affect response generation.

---

# ⏱ Time Spent

Approximately **8 hours**, including:

- UI Design
- React Development
- Backend Development
- AI Integration
- Error Handling
- Local Storage
- Testing and Debugging

---

# 📹 Demo

A short screen recording demonstrating the application's functionality is included with the submission.

---

# 👨‍💻 Author

**Anupama Shrivastava**

B.Tech Computer Science (IoT)

Pranveer Singh Institute of Technology