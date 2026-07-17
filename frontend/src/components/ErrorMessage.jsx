import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="mt-12 rounded-3xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-8 text-center transition-colors duration-300">
      <TriangleAlert
        className="mx-auto text-red-500 dark:text-red-400"
        size={50}
      />

      <h2 className="text-2xl font-bold mt-4 text-red-600 dark:text-red-400">
        Oops!
      </h2>

      <p className="mt-3 text-red-500 dark:text-red-450">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer active:scale-95 transition-all"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;