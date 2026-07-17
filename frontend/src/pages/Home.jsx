import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PromptBox from "../components/PromptBox";
import Flashcard from "../components/Flashcard";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import api from "../api/api";

const Home = () => {
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState("flashcards");
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [wrongCards, setWrongCards] = useState([]);

  const isFinished = cards.length > 0 && current >= cards.length;

  const handleGenerate = async () => {
    if (!notes.trim()) return;

    setLoading(true);
    setError("");
    setCards([]);
    setCorrect(0);
    setWrong(0);
    setWrongCards([]);
    setCurrent(0);

    try {
      const response = await api.post("/ai/generate", { notes, mode });

      if (response.data.success && Array.isArray(response.data.items)) {
        setCards(response.data.items);
      } else {
        setError("Invalid AI response format. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to generate. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
      setWrongCards((prev) => [...prev, cards[current]]);
    }
  };

  const handleNext = () => {
    if (current < cards.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setCurrent(cards.length);
    }
  };

  const handleReviewWrong = () => {
    if (wrongCards.length === 0) return;
    setCards(wrongCards);
    setCurrent(0);
    setCorrect(0);
    setWrong(0);
    setWrongCards([]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading || cards.length === 0 || isFinished) return;

      if (e.key === "ArrowLeft" && current > 0) {
        setCurrent((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && current < cards.length - 1) {
        setCurrent((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, loading, cards.length, isFinished]);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20 -translate-x-40 -translate-y-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-20 translate-x-40 translate-y-40 pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Hero />

        <PromptBox
          notes={notes}
          setNotes={setNotes}
          onGenerate={handleGenerate}
          loading={loading}
          mode={mode}
          setMode={setMode}
        />

        {cards.length > 0 && (
          <Stats total={cards.length} correct={correct} wrong={wrong} />
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleGenerate} />
        ) : cards.length === 0 ? (
          <EmptyState />
        ) : isFinished ? (
          <div className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/50">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Session Complete! 🎉
            </h2>
            <p className="text-slate-600 mb-6">
              You got{" "}
              <span className="font-bold text-emerald-600">{correct}</span>{" "}
              right and <span className="font-bold text-rose-500">{wrong}</span>{" "}
              wrong.
            </p>

            {wrongCards.length > 0 ? (
              <button
                onClick={handleReviewWrong}
                className="px-8 py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                🔄 Review {wrongCards.length} Wrong Item
                {wrongCards.length > 1 ? "s" : ""}
              </button>
            ) : (
              <p className="text-emerald-600 font-semibold text-lg">
                Perfect score! You nailed it.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-10">
            <ProgressBar current={current + 1} total={cards.length} />

            {mode === "quiz" ? (
              <QuizCard
                card={cards[current]}
                onAnswer={handleAnswer}
                onNext={handleNext}
                isLast={current === cards.length - 1}
              />
            ) : (
              <div className="mt-6">
                <Flashcard card={cards[current]} />
                
              </div>
            )}

            {mode === "flashcards" && (
              <div className="flex justify-between items-center mt-8">
                <button
                  disabled={current === 0}
                  onClick={() => setCurrent((prev) => prev - 1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white/70 backdrop-blur-sm hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 text-slate-700 font-medium"
                >
                  ← Prev
                </button>
                <span className="text-sm text-slate-500 font-medium hidden sm:block">
                  Use{" "}
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-xs shadow-sm">
                    ←
                  </kbd>{" "}
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-xs shadow-sm">
                    →
                  </kbd>{" "}
                  to navigate
                </span>
                <button
                  disabled={current === cards.length - 1}
                  onClick={() => setCurrent((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium"
                >
                  Next →
                </button>
              </div>
            )}
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
