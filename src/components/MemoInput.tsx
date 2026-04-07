import { useState } from "react";
import { Sparkles, Loader2, RotateCcw, FileText } from "lucide-react";

interface MemoInputProps {
  onGenerate: (text: string) => void;
  isGenerating: boolean;
  isModelReady: boolean;
}

const PLACEHOLDER = `例：
田中さんと来期の予算について打ち合わせ
広告費は前年比120%で合意
SNS施策は佐藤さんが来週金曜までに提案書作成
次回は4/15に進捗確認ミーティング
鈴木部長の承認が必要`;

export default function MemoInput({
  onGenerate,
  isGenerating,
  isModelReady,
}: MemoInputProps) {
  const [text, setText] = useState("");

  const handleGenerate = () => {
    if (!text.trim() || isGenerating || !isModelReady) return;
    onGenerate(text);
  };

  const charCount = text.length;

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <FileText size={16} className="text-blue-500" />
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
          商談メモ入力
        </h2>
        {charCount > 0 && (
          <span className="text-[10px] text-slate-400 ml-auto font-mono">
            {charCount.toLocaleString()} 文字
          </span>
        )}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={8}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-sm leading-relaxed resize-y placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
          disabled={isGenerating}
        />
        {text.length > 0 && !isGenerating && (
          <button
            onClick={() => setText("")}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="クリア"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!text.trim() || isGenerating || !isModelReady}
        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] disabled:shadow-none disabled:active:scale-100"
      >
        {isGenerating ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            AI推論中...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            議事録を生成
          </>
        )}
      </button>

      {!isModelReady && (
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          先にAIモデルをダウンロードしてください
        </p>
      )}
    </div>
  );
}
