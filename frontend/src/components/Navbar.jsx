import { useState, useEffect } from "react";
import { BookOpen, Menu, Sun, Moon } from "lucide-react";

const Navbar = ({ onToggleSidebar }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-white dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-xs sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-brand-text/80 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer mr-1"
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="bg-primary p-2 rounded-lg shrink-0 shadow-xs">
            <BookOpen className="text-white" size={22} />
          </div>

          <div>
            <h1 className="font-bold text-xl text-brand-text">
              AI Study Assistant
            </h1>

            <p className="text-xs text-brand-text/75 font-semibold mt-0.5">
              Learn smarter with AI
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 text-brand-text hover:bg-slate-100/50 dark:hover:bg-slate-800/50 active:scale-95 transition-all cursor-pointer shadow-2xs"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;