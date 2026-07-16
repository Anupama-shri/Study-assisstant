import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

      <TriangleAlert
        size={50}
        className="mx-auto text-red-500"
      />

      <h2 className="text-2xl font-bold text-red-600 mt-4">
        Something went wrong
      </h2>

      <p className="text-red-500 mt-3">
        {message}
      </p>

    </div>
  );
};

export default ErrorMessage;