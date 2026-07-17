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
      return "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50";
    }
    if (index === card.correctIndex) {
      return "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200";
    }
    if (index === selectedOption && index !== card.correctIndex) {
      return "border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-200";
    }
    return "border-slate-200 opacity-50";
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Quiz Mode
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed mb-8">
        {card.question}
      </h2>

      <div className="space-y-3">
        {card.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={isRevealed}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${getOptionStyle(
              index
            )} ${!isRevealed ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}`}
          >
            <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="font-medium">{option}</span>
            
            {isRevealed && index === card.correctIndex && (
              <CheckCircle2 className="ml-auto text-emerald-600 shrink-0" size={20} />
            )}
            {isRevealed && index === selectedOption && index !== card.correctIndex && (
              <XCircle className="ml-auto text-rose-600 shrink-0" size={20} />
            )}
          </button>
        ))}
      </div>

      {isRevealed && card.explanation && (
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-slate-800 text-sm mb-1">Explanation</p>
            <p className="text-slate-600 text-sm leading-relaxed">{card.explanation}</p>
          </div>
        </div>
      )}

      
      {isRevealed && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {isLast ? "See Results" : "Next Question"}
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;