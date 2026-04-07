import { useState } from "react";
import {
  Copy,
  Check,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ResultOutputProps {
  output: string;
  isGenerating: boolean;
}

export default function ResultOutput({
  output,
  isGenerating,
}: ResultOutputProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (!output && !isGenerating) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = output;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatOutput = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Section headers 【...】
      if (/^【.+】/.test(line)) {
        return (
          <div
            key={i}
            className="mt-5 first:mt-0 mb-2 flex items-center gap-2"
          >
            <div className="h-5 w-1 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500" />
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {line}
            </span>
          </div>
        );
      }
      // Bullet points
      if (/^[・\-\*•]/.test(line.trim())) {
        return (
          <div key={i} className="flex gap-2 py-0.5 pl-3">
            <span className="text-blue-500 mt-0.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
            </span>
            <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {line.replace(/^[・\-\*•]\s*/, "")}
            </span>
          </div>
        );
      }
      // Empty lines
      if (!line.trim()) {
        return <div key={i} className="h-2" />;
      }
      // Regular text
      return (
        <p
          key={i}
          className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-3"
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-indigo-500" />
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            生成結果
          </h2>
          {isGenerating && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-blink" />
              生成中
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {output && !isGenerating && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    コピー済み
                  </span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  コピー
                </>
              )}
            </button>
          )}
          {output && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {collapsed ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Result content */}
      {!collapsed && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 p-4 shadow-sm">
          <div className="min-h-[100px]">
            {formatOutput(output)}
            {isGenerating && (
              <span className="inline-block w-2 h-4 bg-blue-500 ml-0.5 animate-blink rounded-sm" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
