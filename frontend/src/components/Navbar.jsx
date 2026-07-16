import { BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="text-white" size={22} />
          </div>

          <div>
            <h1 className="font-bold text-xl text-slate-800">
              AI Study Assistant
            </h1>

            <p className="text-xs text-slate-500">
              Learn smarter with AI
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;