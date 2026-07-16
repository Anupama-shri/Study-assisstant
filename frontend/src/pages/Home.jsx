import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PromptBox from "../components/PromptBox";
import Flashcard from "../components/Flashcard";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import api from "../api/api";

const Home = () => {
  const [notes, setNotes] = useState("");
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [wrongCards, setWrongCards] = useState([]);

  const handleGenerate = async () => {
    if (!notes.trim()) return;

    setLoading(true);
    setError("");
    setCards([]);

    try {
      const response = await api.post("/ai/generate", {
        notes,
      });

      if (response.data.success && Array.isArray(response.data.flashcards)) {
        setCards(response.data.flashcards);
        setCurrent(0);
      } else {
        setError("Invalid AI response.");
      }
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to generate flashcards.");
    } finally {
      setLoading(false);
    }
  };
  const markCorrect = () => {
    setCorrect((prev) => prev + 1);

    if (current < cards.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const markWrong = () => {
    setWrong((prev) => prev + 1);

    setWrongCards((prev) => [...prev, cards[current]]);

    if (current < cards.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -translate-x-40 -translate-y-40"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20 translate-x-40 translate-y-40"></div>
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <Hero />

        <PromptBox
          notes={notes}
          setNotes={setNotes}
          onGenerate={handleGenerate}
          loading={loading}
        />

        {cards.length > 0 && <Stats total={cards.length} />}

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleGenerate} />
        ) : cards.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-12">
            <ProgressBar current={current + 1} total={cards.length} />

            <Flashcard card={cards[current]} />

            <div className="flex justify-between items-center mt-8">
              <button
                disabled={current === 0}
                onClick={() => setCurrent((prev) => prev - 1)}
                className="px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Previous
              </button>

              <button
                disabled={current === cards.length - 1}
                onClick={() => setCurrent((prev) => prev + 1)}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>

            <div className="flex justify-center gap-5 mt-8">
              <button
                onClick={markCorrect}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                ✅ I Knew This
              </button>

              <button
                onClick={markWrong}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                ❌ Review Again
              </button>
            </div>
          </div>
        )}
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
