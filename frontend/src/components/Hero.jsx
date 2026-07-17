import { Sparkles, Brain, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="text-center mb-14 transition-colors duration-300">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full font-bold border border-primary/20">
        <Sparkles size={18} />
        AI Powered Learning
      </div>

      <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight text-brand-text">
        Turn Your Notes Into
        <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
          Interactive Study Sets
        </span>
      </h1>

      <p className="mt-6 max-w-3xl mx-auto text-lg text-brand-text/85 font-semibold">
        Paste your study material and let AI instantly create
        beautiful flashcards and quizzes that help you revise faster and
        remember longer.
      </p>

      <div className="flex justify-center gap-6 mt-12 flex-wrap">
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-md rounded-2xl px-6 py-5 w-56 transition-colors duration-300">
          <Brain className="mx-auto text-primary" size={32} />
          <h3 className="font-extrabold mt-3 text-brand-text">
            AI Generated
          </h3>
          <p className="text-sm text-brand-text/60 font-semibold mt-2">
            Sets created instantly from notes.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-md rounded-2xl px-6 py-5 w-56 transition-colors duration-300">
          <BookOpen className="mx-auto text-secondary" size={32} />
          <h3 className="font-extrabold mt-3 text-brand-text">
            Interactive
          </h3>
          <p className="text-sm text-brand-text/60 font-semibold mt-2">
            Flip cards and take quizzes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;