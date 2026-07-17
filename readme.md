#  AI Study Assistant

An AI-powered Study Assistant built with **React**, **Node.js**, **Express.js**, and a **Large Language Model (LLM)**. Users can paste study notes or any topic, and the application generates interactive **Flashcards** or **Multiple Choice Quizzes**. Instead of displaying raw AI responses, the application parses structured JSON returned by the AI and renders an engaging, interactive learning experience.

This project was developed as part of the **Frontend Internship Assignment**.

---

##  Features

### 📖 Flashcard Mode
- Generate AI-powered flashcards from free-form study notes.
- Interactive flip animation.
- Previous / Next navigation.
- Star important flashcards.
- Keyboard navigation (Enter / Space to flip).
- Beautiful card animations.

### 📝 Quiz Mode
- Generate AI-powered multiple-choice quizzes.
- Four options for every question.
- Instant answer validation.
- Correct answer explanation.
- Live score tracking.
- Final performance summary.

### 🔄 Review Wrong Answers
- Stores incorrectly answered quiz questions.
- Retry only the wrong answers.
- Helps reinforce learning.

###  Starred Flashcards
- Mark important flashcards.
- Easily identify important concepts while revising.

###  Study History
- Automatically saves every generated session.
- Sidebar displaying previous study sessions.
- Reload previous flashcards or quizzes instantly.
- History persists using Local Storage.

###  Progress Tracking
- Live progress bar.
- Correct/Wrong answer statistics.
- Completion summary.
- Progress updates in real time.

###  Local Storage Support
- Saves study history.
- Saves generated flashcards.
- Saves quizzes.
- Preserves user sessions even after page refresh.

###  Responsive UI
- Fully responsive.
- Optimized for Desktop, Tablet, and Mobile devices.
- Modern, clean, and intuitive interface.

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

- Google Gemini API / Groq API

---

#  Project Structure

```
Study-Assistant/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

#  Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Study-Assistant.git

cd AI-Study-Assistant
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

### Using Gemini

```env
GEMINI_API_KEY=your_api_key
PORT=5000
```

or

### Using Groq

```env
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

The frontend runs at:

```
http://localhost:5173
```

The backend runs at:

```
http://localhost:5000
```

---

#  Usage

1. Enter your study notes or any topic.
2. Select either:
   -  Flashcards
   -  Quiz
3. Click **Generate**.
4. Study using the generated flashcards or quiz.
5. Review wrong answers if needed.
6. Revisit previous study sessions using the History Sidebar.

---

#  AI Usage

The application sends user notes to an LLM through a secure backend API.

The AI is instructed to always return **structured JSON** instead of raw text.

## Flashcard Format

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

## Quiz Format

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
      "correctIndex": 2,
      "explanation": "..."
    }
  ]
}
```

The frontend validates, parses, and renders the structured data as interactive UI components.

---

#  Error Handling

The application gracefully handles AI failures, including:

- Empty input validation
- API failures
- Invalid JSON
- Unexpected response format
- Slow responses
- Loading state
- Error messages
- Empty state
- Prevents stale responses from overwriting newer ones
- Prevents application crashes

---

#  Local Storage

The application stores:

- Study History
- Generated Flashcards
- Generated Quizzes
- Wrong Answer Sessions
- User Progress

This allows users to continue studying without regenerating AI responses.

---

#  UI Features

- Modern glassmorphism-inspired UI
- Beautiful gradients
- Animated flashcards
- Interactive quiz interface
- Sidebar History
- Progress bar
- Responsive design
- Keyboard accessibility
- Smooth transitions
- Lucide Icons

---


#  Live Demo

The application is deployed and can be accessed here:

** Live Application:**  
https://study-assisstant-dvij-nine.vercel.app/


-  Generate AI-powered Flashcards
-  Generate Interactive Quizzes
-  Review Incorrect Answers
-  Star Important Flashcards
-  View Previous Study Sessions
-  Track Learning Progress
-  Experience the Responsive UI
-  Persistent Study History using Local Storage



#  Demo Video

A short screen recording demonstrating the application can be viewed here:

**Demo Video:**  
🔗 **https://drive.google.com/file/d/17yxRsw8ACwX-D3ER4Sizk-3XOnEmqMzG/view?usp=drivesdk**

The demonstration includes:

-  Flashcard Generation
-  Quiz Generation
-  Review Wrong Answers
-  Study History Sidebar
-  Progress Tracking
-  Responsive Design
-  Error Handling
-  Local Storage Persistence



---

# AI Assistance Used

AI tools (ChatGPT) were used to:

- Brainstorm project architecture
- Design UI components
- Improve React component structure
- Debug React and Express issues
- Generate prompt templates
- Improve error handling
- Refactor reusable components
- Suggest UI/UX improvements

All generated code was reviewed, understood, modified, and integrated manually before submission.

---

#  Known Limitations

- AI output quality depends on the quality of user-provided notes.
- Large Language Models may occasionally return malformed JSON.
- Study history is stored locally and is not synchronized across devices.
- Internet connection is required to generate new flashcards or quizzes.
- API rate limits may temporarily affect generation speed.

---

# ⏱ Time Spent

Approximately **8 hours**, including:

- UI Design
- Frontend Development
- Backend Development
- AI Integration
- Local Storage
- Error Handling
- Responsive Design
- Testing & Debugging

---




#  Future Improvements

- User Authentication
- Cloud Storage for History
- PDF Upload Support
- Dark/Light Theme Toggle
- AI-powered Study Recommendations
- Export Flashcards as PDF
- Flashcard Categories
- Voice Support
- Multi-language Support

---

#  Author

**Anupama Shrivastava**

B.Tech – Computer Science (Internet of Things)

Pranveer Singh Institute of Technology





---

