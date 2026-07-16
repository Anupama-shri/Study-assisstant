import { Brain, BookOpen, Trophy } from "lucide-react";

const Stats = ({ total }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

      <div className="bg-white rounded-2xl shadow p-6">
        <Brain className="text-blue-600 mb-3" />
        <h3 className="text-2xl font-bold">{total}</h3>
        <p className="text-slate-500">Flashcards</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <BookOpen className="text-green-600 mb-3" />
        <h3 className="text-2xl font-bold">AI</h3>
        <p className="text-slate-500">Powered Learning</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <Trophy className="text-yellow-500 mb-3" />
        <h3 className="text-2xl font-bold">100%</h3>
        <p className="text-slate-500">Interactive</p>
      </div>

    </div>
  );
};

export default Stats;