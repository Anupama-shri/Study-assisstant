import { BookOpenCheck } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="mt-12 bg-white rounded-3xl shadow-lg border p-12 text-center">

      <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
        <BookOpenCheck size={40} className="text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold mt-6">
        No Flashcards Yet
      </h2>

      <p className="text-slate-500 mt-3 max-w-md mx-auto">
        Paste your study notes above and click
        <span className="font-semibold"> Generate Flashcards </span>
        to begin learning.
      </p>

    </div>
  );
};

export default EmptyState;