import {
  Shield,
  Cpu,
  FileText,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

type Theme = "light" | "dark" | "system";

interface HeaderProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  modelLabel?: string;
}

export default function Header({ theme, setTheme, modelLabel }: HeaderProps) {
  const themeOptions: { value: Theme; icon: React.ReactNode; label: string }[] =
    [
      { value: "light", icon: <Sun size={14} />, label: "ライト" },
      { value: "dark", icon: <Moon size={14} />, label: "ダーク" },
      { value: "system", icon: <Monitor size={14} />, label: "自動" },
    ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                AI議事録メーカー
              </h1>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                <Shield size={10} className="text-emerald-500" />
                <span>完全オンデバイス</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <Cpu size={10} className="text-blue-500" />
                <span>{modelLabel || "AI"}</span>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs transition-all ${
                  theme === opt.value
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
                aria-label={opt.label}
              >
                {opt.icon}
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
