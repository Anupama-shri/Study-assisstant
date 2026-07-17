import { WandSparkles, LoaderCircle, Layers, HelpCircle } from "lucide-react";

const PromptBox = ({
  notes,
  setNotes,
  onGenerate,
  loading,
  mode,
  setMode,
}) => {
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (notes.trim() && !loading) {
        onGenerate();
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 mt-10 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Generate Study Material
          </h2>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Paste your notes and choose how you want to study.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setMode("flashcards")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === "flashcards"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Layers size={16} />
            Flashcards
          </button>
          <button
            onClick={() => setMode("quiz")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === "quiz"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <HelpCircle size={16} />
            Quiz
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label 
          htmlFor="notes-input" 
          className="block font-semibold text-slate-700 mb-2 text-sm sm:text-base"
        >
          Your Notes
        </label>

        <textarea
          id="notes-input"
          rows={8}
          value={notes}
          maxLength={5000}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            mode === "flashcards"
              ? "Example:\n\n• Explain React Hooks\n• Binary Search Algorithm\n• JavaScript Closures"
              : "Example:\n\n• Photosynthesis process\n• Mitochondria function\n• Cell membrane structure"
          }
          disabled={loading}
          className="w-full rounded-2xl border   p-4 sm:p-5 resize-y outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:bg-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed  placeholder:text-slate-400"
          aria-describedby="char-count"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div 
          id="char-count" 
          className={`text-xs sm:text-sm font-medium transition-colors ${
            notes.length > 4500 ? "text-amber-600" : "text-slate-500"
          }`}
        >
          {notes.length} / 5000 characters
          {notes.length > 4500 && " (Approaching limit)"}
        </div>

        <button
          onClick={onGenerate}
          disabled={loading || !notes.trim()}
          className={`group flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 
            ${
              loading || !notes.trim()
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            }`}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <WandSparkles size={20} className="transition-transform group-hover:rotate-12" />
              <span>Generate {mode === "quiz" ? "Quiz" : "Flashcards"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptBox;