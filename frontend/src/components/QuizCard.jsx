import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Lightbulb, ArrowRight } from "lucide-react";

const QuizCard = ({ card, onAnswer, onNext, isLast }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsRevealed(false);
  }, [card]);

  const handleOptionClick = (index) => {
    if (isRevealed) return; // Prevent changing answer after selection
    setSelectedOption(index);
    setIsRevealed(true);

    const isCorrect = index === card.correctIndex;
    onAnswer(isCorrect);
  };

  const getOptionStyle = (index) => {
    if (!isRevealed) {
      return "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 hover:shadow-xs";
    }
    if (index === card.correctIndex) {
      return "border-emerald-500 bg-emerald-50/50 text-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300 ring-2 ring-emerald-500/25";
    }
    if (index === selectedOption && index !== card.correctIndex) {
      return "border-rose-500 bg-rose-50/50 text-rose-900 dark:bg-rose-950/20 dark:text-rose-350 ring-2 ring-rose-500/25";
    }
    return "border-slate-150 dark:border-slate-850 opacity-40 text-slate-450 dark:text-slate-500 cursor-not-allowed";
  };

  const getBubbleStyle = (index) => {
    if (!isRevealed) {
      return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-455 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-slate-900 transition-all duration-200";
    }
    if (index === card.correctIndex) {
      return "bg-emerald-500 text-white dark:bg-emerald-550 dark:text-white shadow-sm";
    }
    if (index === selectedOption && index !== card.correctIndex) {
      return "bg-rose-500 text-white dark:bg-rose-550 dark:text-white shadow-sm";
    }
    return "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 opacity-60";
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mt-6 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Quiz Mode
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-8">
        {card.question}
      </h2>

      <div className="space-y-3.5">
        {card.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={isRevealed}
            className={`group w-full text-left p-4.5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3.5 ${getOptionStyle(
              index
            )} ${!isRevealed ? "cursor-pointer hover:scale-[1.005] active:scale-[0.995]" : "cursor-default"}`}
          >
            <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm ${getBubbleStyle(index)}`}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="font-semibold text-[15px] sm:text-base leading-snug">{option}</span>

            {isRevealed && index === card.correctIndex && (
              <CheckCircle2 className="ml-auto text-emerald-600 dark:text-emerald-400 shrink-0" size={20} />
            )}
            {isRevealed && index === selectedOption && index !== card.correctIndex && (
              <XCircle className="ml-auto text-rose-600 dark:text-rose-455 shrink-0" size={20} />
            )}
          </button>
        ))}
      </div>

      {isRevealed && card.explanation && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-850 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Lightbulb className="text-amber-550 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-250 text-sm mb-0.5">Explanation</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{card.explanation}</p>
          </div>
        </div>
      )}

      {isRevealed && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            className="group/btn flex items-center gap-2 px-7 py-3.5 bg-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            <span>{isLast ? "See Results" : "Next Question"}</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;