import { Brain, CheckCircle2, XCircle } from "lucide-react";

const Stats = ({ total, correct = 0, wrong = 0 }) => {
  const hasStarted = correct > 0 || wrong > 0;

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-5 mt-10 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800/80 p-5 text-center">
        <Brain className="text-primary mx-auto mb-2.5" size={22} />
        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-text">{total}</h3>
        <p className="text-xs font-semibold text-brand-text/50 uppercase tracking-wider">Total Items</p>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800/80 p-5 text-center">
        <CheckCircle2 className="text-emerald-500 mx-auto mb-2.5" size={22} />
        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-text">{correct}</h3>
        <p className="text-xs font-semibold text-brand-text/50 uppercase tracking-wider">Correct</p>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800/80 p-5 text-center">
        <XCircle className="text-rose-500 mx-auto mb-2.5" size={22} />
        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-text">{wrong}</h3>
        <p className="text-xs font-semibold text-brand-text/50 uppercase tracking-wider">Wrong</p>
      </div>
    </div>
  );
};

export default Stats;