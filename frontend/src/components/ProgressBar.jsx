const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xs p-5 transition-colors duration-300">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-bold text-lg text-brand-text">
            Progress
          </h3>
          <p className="text-brand-text/75 text-sm font-semibold mt-0.5">
            Question {current} of {total}
          </p>
        </div>
        <span className="font-bold text-primary text-xl">
          {Math.round(progress > 100 ? 100 : progress)}%
        </span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;