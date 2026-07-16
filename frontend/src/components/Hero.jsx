import { Sparkles, Brain, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="text-center mb-14">

      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium">
        <Sparkles size={18} />
        AI Powered Learning
      </div>

      <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight text-slate-800">

        Turn Your Notes Into

        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
          Interactive Flashcards
        </span>

      </h1>

      <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
        Paste your study material and let AI instantly create
        beautiful flashcards that help you revise faster and
        remember longer.
      </p>

      <div className="flex justify-center gap-6 mt-12 flex-wrap">

        <div className="bg-white shadow-md rounded-2xl px-6 py-5 w-56">
          <Brain className="mx-auto text-blue-600" size={32} />
          <h3 className="font-bold mt-3">
            AI Generated
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Smart flashcards created instantly.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl px-6 py-5 w-56">
          <BookOpen className="mx-auto text-indigo-600" size={32} />
          <h3 className="font-bold mt-3">
            Interactive
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Flip cards and test yourself.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Hero;