import { WandSparkles, LoaderCircle } from "lucide-react";

const PromptBox = ({
  notes,
  setNotes,
  onGenerate,
  loading,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mt-10">

      
      <h2 className="text-2xl font-bold text-slate-800">
        Generate Flashcards
      </h2>

      <p className="text-slate-500 mt-2">
        Paste your study notes, lecture content, or any topic. AI will
        generate interactive flashcards for quick revision.
      </p>

      
      <div className="mt-6">
        <label className="block font-semibold text-slate-700 mb-2">
          Your Notes
        </label>

        <textarea
          rows={10}
          value={notes}
          maxLength={5000}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example:

• Explain React Hooks
• Binary Search Algorithm
• JavaScript Closures
• DBMS Normalization
• Operating System Scheduling..."
          className="w-full rounded-2xl border  p-5 resize-none outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
        />
      </div>

      
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">

        
        <div className="text-sm text-slate-500">
          {notes.length} 
        </div>

       
        <button
          onClick={onGenerate}
          disabled={loading || !notes.trim()}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
            ${
              loading || !notes.trim()
                ? "bg-slate-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white shadow-lg"
            }`}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} />
              Generating...
            </>
          ) : (
            <>
              <WandSparkles size={20} />
              Generate Flashcards
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default PromptBox;