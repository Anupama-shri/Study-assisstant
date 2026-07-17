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
import HistorySidebar from "../components/HistorySidebar";

const Home = () => {
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState("flashcards");
  const [flashcards, setFlashcards] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [starredQuestions, setStarredQuestions] = useState([]);
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [wrongCards, setWrongCards] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("studyAssistant");

    if (saved) {
      const data = JSON.parse(saved);

      setNotes(data.notes || "");
      setMode(data.mode || "flashcards");
      setFlashcards(data.flashcards || []);
      setQuizQuestions(data.quizQuestions || []);
      setStarredQuestions(data.starredQuestions || []);
      setShowStarredOnly(data.showStarredOnly || false);
      setCurrent(data.current || 0);
      setCorrect(data.correct || 0);
      setWrong(data.wrong || 0);
      setWrongCards(data.wrongCards || []);
      setActiveSessionId(data.activeSessionId || null);
      setIsSidebarCollapsed(data.isSidebarCollapsed || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "studyAssistant",
      JSON.stringify({
        notes,
        mode,
        flashcards,
        quizQuestions,
        starredQuestions,
        showStarredOnly,
        current,
        correct,
        wrong,
        wrongCards,
        activeSessionId,
        isSidebarCollapsed,
      }),
    );
  }, [
    notes,
    mode,
    flashcards,
    quizQuestions,
    starredQuestions,
    showStarredOnly,
    current,
    correct,
    wrong,
    wrongCards,
    activeSessionId,
    isSidebarCollapsed,
  ]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("studyHistory")) || [];

    setHistory(savedHistory);
  }, []);

  const activeCards = mode === "quiz" ? quizQuestions : flashcards;

  const filteredCards = (mode === "flashcards" && showStarredOnly)
    ? activeCards.filter((card) => starredQuestions.includes(card.question))
    : activeCards;

  const isFinished = filteredCards.length > 0 && current >= filteredCards.length;

  const handleGenerate = async () => {
    if (!notes.trim()) return;

    localStorage.removeItem("studyAssistant");

    setLoading(true);
    setError("");
    setFlashcards([]);
    setQuizQuestions([]);
    setStarredQuestions([]);
    setShowStarredOnly(false);
    setCorrect(0);
    setWrong(0);
    setWrongCards([]);
    setCurrent(0);

    try {
      const response = await api.post("/ai/generate", { notes });

      if (
        response.data.success &&
        Array.isArray(response.data.flashcards) &&
        Array.isArray(response.data.quiz)
      ) {
        setFlashcards(response.data.flashcards);
        setQuizQuestions(response.data.quiz);

        const newSession = {
          id: Date.now(),
          title:
            notes.split("\n")[0].slice(0, 30) +
            (notes.length > 30 ? "..." : ""),
          notes,
          mode: "both",
          flashcards: response.data.flashcards,
          quiz: response.data.quiz,
          createdAt: new Date().toLocaleString(),
        };

        const updatedHistory = [newSession, ...history];

        setHistory(updatedHistory);
        setActiveSessionId(newSession.id);

        localStorage.setItem("studyHistory", JSON.stringify(updatedHistory));
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

  const loadHistory = (session) => {
    setNotes(session.notes);
    setStarredQuestions([]);
    setShowStarredOnly(false);

    if (session.flashcards && session.quiz) {
      setFlashcards(session.flashcards);
      setQuizQuestions(session.quiz);
      setMode("flashcards");
    } else {
      if (session.mode === "quiz") {
        setFlashcards([]);
        setQuizQuestions(session.items || []);
        setMode("quiz");
      } else {
        setFlashcards(session.items || []);
        setQuizQuestions([]);
        setMode("flashcards");
      }
    }
    setCurrent(0);
    setCorrect(0);
    setWrong(0);
    setWrongCards([]);
    setActiveSessionId(session.id);
  };

  const handleDeleteHistory = (id, e) => {
    if (e) e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("studyHistory", JSON.stringify(updated));
    if (activeSessionId === id) {
      setActiveSessionId(null);
    }
  };

  const handleToggleStar = (questionText) => {
    setStarredQuestions((prev) =>
      prev.includes(questionText)
        ? prev.filter((q) => q !== questionText)
        : [...prev, questionText]
    );
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all your study history?")) {
      setHistory([]);
      localStorage.removeItem("studyHistory");
      setActiveSessionId(null);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
      setWrongCards((prev) => [...prev, filteredCards[current]]);
    }
  };

  const handleNext = () => {
    if (current < filteredCards.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setCurrent(filteredCards.length);
    }
  };

  const handleReviewWrong = () => {
    localStorage.removeItem("studyAssistant");
    if (wrongCards.length === 0) return;
    if (mode === "quiz") {
      setQuizQuestions(wrongCards);
    } else {
      setFlashcards(wrongCards);
    }
    setCurrent(0);
    setCorrect(0);
    setWrong(0);
    setWrongCards([]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading || filteredCards.length === 0 || isFinished) return;

      if (e.key === "ArrowLeft" && current > 0) {
        setCurrent((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && current < filteredCards.length - 1) {
        setCurrent((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, loading, filteredCards.length, isFinished]);

  return (
    <div className="flex h-screen overflow-hidden">
      <HistorySidebar
        history={history}
        onSelect={loadHistory}
        onDelete={handleDeleteHistory}
        onClear={handleClearHistory}
        activeId={activeSessionId}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden bg-brand-bg text-brand-text relative min-w-0 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 dark:opacity-10 -translate-x-40 -translate-y-40 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20 dark:opacity-10 translate-x-40 translate-y-40 pointer-events-none"></div>

        <Navbar onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <Hero />

          <PromptBox
            notes={notes}
            setNotes={setNotes}
            onGenerate={handleGenerate}
            loading={loading}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                localStorage.removeItem("studyAssistant");

                setNotes("");
                setFlashcards([]);
                setQuizQuestions([]);
                setStarredQuestions([]);
                setShowStarredOnly(false);
                setCurrent(0);
                setCorrect(0);
                setWrong(0);
                setWrongCards([]);
                setMode("flashcards");
                setActiveSessionId(null);
              }}
              className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition cursor-pointer"
            >
              Clear Progress
            </button>
          </div>

          {/* Tab Selector & Filter */}
          {(flashcards.length > 0 || quizQuestions.length > 0) && (
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-xl max-w-xs shrink-0">
                <button
                  onClick={() => {
                    setMode("flashcards");
                    setCurrent(0);
                    setCorrect(0);
                    setWrong(0);
                    setWrongCards([]);
                  }}
                  className={`flex-1 px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${mode === "flashcards"
                      ? "bg-primary text-white shadow-xs"
                      : "text-brand-text/60 hover:text-brand-text"
                    }`}
                >
                  📚 Flashcards
                </button>
                <button
                  onClick={() => {
                    setMode("quiz");
                    setCurrent(0);
                    setCorrect(0);
                    setWrong(0);
                    setWrongCards([]);
                  }}
                  className={`flex-1 px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${mode === "quiz"
                      ? "bg-primary text-white shadow-xs"
                      : "text-brand-text/60 hover:text-brand-text"
                    }`}
                >
                  📝 Take Quiz
                </button>
              </div>

              {mode === "flashcards" && (
                <div className="flex items-center gap-2">
                  <span
                    onClick={() => {
                      setShowStarredOnly(!showStarredOnly);
                      setCurrent(0);
                    }}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer select-none"
                  >
                    Study Starred Only
                  </span>
                  <button
                    onClick={() => {
                      setShowStarredOnly(!showStarredOnly);
                      setCurrent(0);
                    }}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showStarredOnly ? "bg-primary" : "bg-slate-250 dark:bg-slate-700"
                      }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${showStarredOnly ? "translate-x-5" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {filteredCards.length > 0 && !isFinished && (
            <Stats total={filteredCards.length} correct={correct} wrong={wrong} />
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleGenerate} />
          ) : activeCards.length === 0 ? (
            <EmptyState />
          ) : filteredCards.length === 0 ? (
            <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-10 text-center max-w-md mx-auto">
              <div className="mx-auto w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">No Starred Cards</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                You haven't bookmarked any flashcards in this set yet. Toggle starred mode off, then click the star icon on a card to bookmark it.
              </p>
              <button
                onClick={() => setShowStarredOnly(false)}
                className="px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xs transition cursor-pointer"
              >
                Show All Cards
              </button>
            </div>
          ) : isFinished ? (
            <div className="mt-12 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/50 dark:border-slate-800">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Session Complete! 🎉
              </h2>
              <p className="text-slate-650 dark:text-slate-400 mb-6">
                You got{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-450">{correct}</span>{" "}
                right and{" "}
                <span className="font-bold text-rose-500 dark:text-rose-450">{wrong}</span> wrong.
              </p>

              {wrongCards.length > 0 ? (
                <button
                  onClick={handleReviewWrong}
                  className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-650 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  🔄 Review {wrongCards.length} Wrong Item
                  {wrongCards.length > 1 ? "s" : ""}
                </button>
              ) : (
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                  Perfect score! You nailed it.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-10">
              <ProgressBar current={current + 1} total={filteredCards.length} />

              {mode === "quiz" ? (
                <QuizCard
                  card={filteredCards[current]}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  isLast={current === filteredCards.length - 1}
                />
              ) : (
                <div className="mt-6">
                  <Flashcard
                    card={filteredCards[current]}
                    isStarred={starredQuestions.includes(filteredCards[current]?.question)}
                    onToggleStar={() => handleToggleStar(filteredCards[current]?.question)}
                  />
                </div>
              )}

              {mode === "flashcards" && (
                <div className="flex justify-between items-center mt-8">
                  <button
                    disabled={current === 0}
                    onClick={() => setCurrent((prev) => prev - 1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/75 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold hidden sm:block">
                    Use{" "}
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 rounded text-xs shadow-xs">
                      ←
                    </kbd>{" "}
                    and{" "}
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 rounded text-xs shadow-xs">
                      →
                    </kbd>{" "}
                    to navigate
                  </span>
                  <button
                    disabled={current === filteredCards.length - 1}
                    onClick={() => setCurrent((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/75 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer"
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
    </div>
  );
};

export default Home;
