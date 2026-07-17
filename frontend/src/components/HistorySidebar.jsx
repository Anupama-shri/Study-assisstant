import { useState } from "react";
import { History, Search, Trash2, Calendar, BrainCircuit, BookOpen, ChevronLeft, Layers } from "lucide-react";

const HistorySidebar = ({ history = [], onSelect, onDelete, onClear, activeId, isCollapsed, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = history.filter((item) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = item.title?.toLowerCase().includes(query) || false;
    const modeMatch = item.mode?.toLowerCase().includes(query) || false;
    return titleMatch || modeMatch;
  });

  return (
    <aside className={`bg-slate-50 dark:bg-slate-900/60 h-screen flex flex-col shadow-sm select-none shrink-0 z-20 overflow-hidden transition-all duration-300 ease-in-out border-r border-slate-200/80 dark:border-slate-800/80 ${
      isCollapsed ? "w-0 border-r-0 shadow-none" : "w-80"
    }`}>
      {/* Header Section */}
      <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/85 bg-white dark:bg-slate-900/90 min-h-[65px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <History className="w-4 h-4" />
          </div>
          <h2 className="text-md font-bold text-brand-text tracking-tight truncate">
            Study History
          </h2>
          {history.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-secondary/10 text-secondary rounded-full border border-secondary/20">
              {history.length}
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-brand-text/50 hover:text-brand-text hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shrink-0"
          title="Collapse sidebar"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Section */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900/90 border-b border-slate-150 dark:border-slate-800/85 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-brand-text/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-brand-text placeholder-brand-text/40"
          />
        </div>
      </div>

      {/* History Items List */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 bg-slate-50/20 dark:bg-slate-900/20">
        {filteredHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <History className="text-brand-text/25 stroke-[1.5] w-10 h-10 mb-3 animate-pulse" />
            <p className="text-sm font-semibold text-brand-text/75">
              {history.length === 0 ? "No history yet" : "No matches found"}
            </p>
            <p className="text-xs text-brand-text/50 mt-1 max-w-[200px] leading-relaxed">
              {history.length === 0
                ? "Generate a study set to start saving your progress."
                : "Try searching for a different keyword or study mode."}
            </p>
          </div>
        )}

        {filteredHistory.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`group relative w-full text-left rounded-2xl border p-4 transition-all duration-300 cursor-pointer flex flex-col justify-between shrink-0 ${
                isActive
                  ? "bg-primary/10 border-primary/50 text-brand-text shadow-xs ring-1 ring-primary/25"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 hover:border-primary/50 hover:shadow-md hover:shadow-slate-100/50 dark:hover:shadow-none hover:-translate-y-0.5"
              }`}
            >
              {/* Header: Icon & Deletion */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  {item.mode === "quiz" ? (
                    <BrainCircuit className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-primary/70'}`} />
                  ) : item.mode === "both" ? (
                    <Layers className={`w-4 h-4 shrink-0 ${isActive ? 'text-secondary' : 'text-secondary/70'}`} />
                  ) : (
                    <BookOpen className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-primary/70'}`} />
                  )}
                  <h3 className={`font-bold text-sm truncate ${isActive ? 'text-brand-text' : 'text-brand-text/80'}`}>
                    {item.title}
                  </h3>
                </div>

                {onDelete && (
                  <button
                    onClick={(e) => onDelete(item.id, e)}
                    className="p-1 rounded-md text-brand-text/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 active:scale-95 transition-all md:opacity-0 md:group-hover:opacity-100 cursor-pointer shrink-0"
                    title="Delete study set"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Footer: Date & Mode Badge */}
              <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100/50 dark:border-slate-800/50">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-brand-text/40">
                  <Calendar className="w-3 h-3" />
                  <span>{item.createdAt ? item.createdAt.split(',')[0] : ''}</span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                    item.mode === "quiz"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : item.mode === "both"
                      ? "bg-brand-info/10 text-brand-info border-brand-info/20"
                      : "bg-secondary/10 text-secondary border-secondary/20"
                  }`}
                >
                  {item.mode === "both" ? "both" : item.mode}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clear All Footer */}
      {history.length > 0 && onClear && (
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-850 flex justify-center shrink-0">
          <button
            onClick={onClear}
            className="w-full py-2.5 px-3 text-xs font-bold text-brand-text/60 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition flex items-center justify-center gap-1.5 border border-dashed border-slate-200 dark:border-slate-800 hover:border-red-200 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All History
          </button>
        </div>
      )}
    </aside>
  );
};

export default HistorySidebar;