import { BookOpenCheck } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-12 text-center transition-colors duration-300">
      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
        <BookOpenCheck size={40} className="text-primary" />
      </div>

      <h2 className="text-2xl font-bold mt-6 text-slate-800 dark:text-slate-100">
        No Study Material Yet
      </h2>

      <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
        Paste your study notes or topics above and click
        <span className="font-semibold text-slate-700 dark:text-slate-350"> Generate Study Set </span>
        to begin learning.
      </p>
    </div>
  );
};

export default EmptyState;