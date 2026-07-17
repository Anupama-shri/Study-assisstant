import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const Flashcard = ({ card, cardNumber, totalCards }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [card]);

  const handleFlip = () => setFlipped(!flipped);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div className="mt-10">
      {cardNumber && totalCards && (
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Card {cardNumber} of {totalCards}
          </span>
        </div>
      )}

      <div
        className="relative w-full h-96 cursor-pointer outline-none focus:ring-4 focus:ring-emerald-200 rounded-3xl transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
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
            className="absolute w-full h-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col justify-between p-8 sm:p-10 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

            <div className="flex justify-between items-start pt-2">
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
                Question
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-lg">?</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-4">
              <div className="w-full max-h-48 overflow-y-auto px-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 leading-relaxed">
                  {card.question}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium pb-1">
              <RotateCcw size={16} className="animate-pulse" />
              <span>Click or press Space to flip</span>
            </div>
          </div>

          {/* BACK - Answer */}
          <div
            className="absolute w-full h-full bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl text-white flex flex-col justify-between p-8 sm:p-10 overflow-hidden"
            style={{
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-start pt-2 relative z-10">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                Answer
              </span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center py-4 relative z-10">
              <div className="w-full max-h-48 overflow-y-auto px-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-center leading-relaxed">
                  {card.answer}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium pb-1 relative z-10">
              <RotateCcw size={16} />
              <span>Click or press Space to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;