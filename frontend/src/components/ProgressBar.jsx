const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <div className="flex justify-between items-center mb-3">

        <div>
          <h3 className="font-bold text-lg">
            Progress
          </h3>

          <p className="text-slate-500 text-sm">
            Flashcard {current} of {total}
          </p>
        </div>

        <span className="font-bold text-blue-600 text-xl">
          {Math.round(progress)}%
        </span>

      </div>

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

        <div
          className="h-full bg-linear-to-r from-blue-500 to-indigo-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
};

export default ProgressBar;