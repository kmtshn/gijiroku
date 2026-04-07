import { useState } from "react";
import {
  History,
  Trash2,
  ChevronRight,
  Clock,
  X,
  AlertTriangle,
} from "lucide-react";
import type { HistoryEntry } from "../types";
import { formatDate } from "../lib/storage";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function HistoryPanel({
  history,
  onSelect,
  onDelete,
  onClearAll,
}: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  if (history.length === 0 && !isOpen) return null;

  return (
    <div className="space-y-3">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <History size={16} className="text-slate-400" />
        履歴
        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
          {history.length}
        </span>
        <ChevronRight
          size={14}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="space-y-2">
          {/* Clear all button */}
          {history.length > 0 && (
            <div className="flex justify-end">
              {confirmClear ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                  <AlertTriangle size={13} className="text-red-500" />
                  <span className="text-xs text-red-600 dark:text-red-400">
                    全て削除しますか？
                  </span>
                  <button
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                    }}
                    className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30"
                  >
                    削除
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={11} />
                  全て削除
                </button>
              )}
            </div>
          )}

          {/* History list */}
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="group flex items-center gap-2 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
                onClick={() => onSelect(entry)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {entry.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={10} className="text-slate-400" />
                    <span className="text-[10px] text-slate-400">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                  aria-label="削除"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          {history.length === 0 && (
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 py-6">
              まだ履歴がありません
            </p>
          )}
        </div>
      )}
    </div>
  );
}
