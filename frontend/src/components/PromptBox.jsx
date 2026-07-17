import { WandSparkles, LoaderCircle } from "lucide-react";

const PromptBox = ({
  notes,
  setNotes,
  onGenerate,
  loading,
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
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 mt-10 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-brand-text">
            Generate Study Material
          </h2>
          <p className="text-brand-text/75 mt-1 text-sm sm:text-base font-semibold">
            Paste your notes or topic below to generate flashcards and quiz questions.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label 
          htmlFor="notes-input" 
          className="block font-bold text-brand-text mb-2 text-sm sm:text-base"
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
          placeholder="Example:&#13;• Photosynthesis is the process used by plants to convert light energy into chemical energy.&#13;• Mitochondria is the powerhouse of the cell.&#13;• JavaScript closures allow functions to access lexical outer scopes."
          disabled={loading}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 text-brand-text p-4 sm:p-5 resize-y outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white dark:focus:bg-slate-950 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-brand-text/40"
          aria-describedby="char-count"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div 
          id="char-count" 
          className={`text-xs sm:text-sm font-bold transition-colors ${
            notes.length > 4500 ? "text-brand-error" : "text-brand-text/75"
          }`}
        >
          {notes.length} / 5000 characters
          {notes.length > 4500 && " (Approaching limit)"}
        </div>

        <button
          onClick={onGenerate}
          disabled={loading || !notes.trim()}
          className={`group flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-200 cursor-pointer 
            ${
              loading || !notes.trim()
                ? "bg-slate-100 dark:bg-slate-800/80 text-brand-text/30 cursor-not-allowed border border-transparent"
                : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-95"
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
              <span>Generate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptBox;