const Loader = () => {
  return (
    <div className="mt-12 bg-white rounded-3xl shadow-lg p-10">

      <div className="animate-pulse">

        <div className="h-5 bg-slate-200 rounded w-40 mb-8"></div>

        <div className="h-64 rounded-3xl bg-slate-200"></div>

        <div className="flex justify-between mt-8">

          <div className="h-12 w-32 rounded-xl bg-slate-200"></div>

          <div className="h-12 w-32 rounded-xl bg-slate-200"></div>

        </div>

      </div>

    </div>
  );
};

export default Loader;