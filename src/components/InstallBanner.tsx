import { Download, X } from "lucide-react";

interface InstallBannerProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export default function InstallBanner({
  onInstall,
  onDismiss,
}: InstallBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-2xl bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-700 shadow-2xl shadow-black/30 p-4">
          {/* Dismiss button */}
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-colors"
            aria-label="閉じる"
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div className="pr-8 mb-3">
            <p className="text-sm font-bold text-white">
              ホーム画面に追加
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              アプリとしてインストールすると、オフラインでも素早くアクセスできます
            </p>
          </div>

          {/* Install button - green like the reference image */}
          <button
            onClick={onInstall}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all"
          >
            <Download size={18} />
            アプリをインストール
          </button>
        </div>
      </div>
    </div>
  );
}
