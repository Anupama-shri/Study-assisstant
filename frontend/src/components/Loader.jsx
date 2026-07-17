const Loader = () => {
  return (
    <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg p-10 transition-colors duration-300">
      <div className="animate-pulse">
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-40 mb-8"></div>
        <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800"></div>
        <div className="flex justify-between mt-8">
          <div className="h-12 w-32 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-12 w-32 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;