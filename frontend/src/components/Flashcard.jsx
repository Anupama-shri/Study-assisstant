import { useEffect, useState } from "react";
import { RotateCcw, Star } from "lucide-react";

const Flashcard = ({ card, cardNumber, totalCards, isStarred, onToggleStar }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [card]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    onToggleStar();
  };

  if (!card) return null;

  return (
    <div className="mt-6">
      {cardNumber && totalCards && (
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-750 dark:text-blue-400 bg-blue-100/85 dark:bg-blue-950/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-850">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Card {cardNumber} of {totalCards}
          </span>
        </div>
      )}

      <div
        className="relative w-full h-96 cursor-pointer outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-500/10 rounded-3xl transition-transform duration-300 hover:scale-[1.005] active:scale-[0.995]"
        style={{ perspective: "1500px" }}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={flipped ? "Show question" : "Show answer"}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
        >
          {/* FRONT - Question */}
          <div
            className="absolute w-full h-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between p-8 sm:p-10 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary to-secondary"></div>

            <div className="flex justify-between items-center pt-2">
              <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
                Question
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStarClick}
                  className="p-2 rounded-xl transition cursor-pointer"
                  title={isStarred ? "Unstar card" : "Star card"}
                >
                  <Star
                    size={18}
                    className={isStarred ? "fill-amber-400 text-amber-400" : "text-slate-400 hover:text-amber-400"}
                  />
                </button>
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-md">?</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-4">
              <div className="w-full max-h-48 overflow-y-auto px-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 dark:text-slate-100 leading-relaxed">
                  {card.question}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-semibold pb-1">
              <RotateCcw size={14} className="animate-pulse" />
              <span>Click card or press Space to flip</span>
            </div>
          </div>

          {/* BACK - Answer */}
          {/* BACK - Answer */}
          <div
            className="absolute w-full h-full bg-blue-600 dark:bg-blue-950 border border-transparent dark:border-blue-900/60 rounded-3xl shadow-2xl text-white dark:text-blue-100 flex flex-col justify-between p-8 sm:p-10 overflow-hidden"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex justify-between items-center pt-2 relative z-10">
              <span className="bg-white/20 dark:bg-blue-900/40 backdrop-blur-sm text-white dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 dark:border-blue-800/40">
                Answer
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStarClick}
                  className="p-2 rounded-xl transition cursor-pointer"
                  title={isStarred ? "Unstar card" : "Star card"}
                >
                  <Star
                    size={18}
                    className={isStarred ? "fill-amber-300 text-amber-300" : "text-white/70 dark:text-blue-300 hover:text-amber-355"}
                  />
                </button>
                <div className="w-9 h-9 rounded-full bg-white/20 dark:bg-blue-900/30 backdrop-blur-sm border border-white/30 dark:border-blue-800/30 flex items-center justify-center">
                  <span className="text-white dark:text-blue-300 font-bold text-md">✓</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-4 relative z-10">
              <div className="w-full max-h-48 overflow-y-auto px-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-center leading-relaxed">
                  {card.answer}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/80 dark:text-blue-400 text-xs font-semibold pb-1 relative z-10">
              <RotateCcw size={14} />
              <span>Click or press Space to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;