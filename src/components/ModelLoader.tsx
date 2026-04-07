import { Cpu, Download, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import type { ModelStatus, DownloadProgress } from "../types";

interface ModelLoaderProps {
  status: ModelStatus;
  progress: DownloadProgress;
  onInitialize: () => void;
}

export default function ModelLoader({
  status,
  progress,
  onInitialize,
}: ModelLoaderProps) {
  if (status === "ready") return null;

  return (
    <div className="max-w-3xl mx-auto px-4 mt-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {/* Unsupported */}
        {status === "unsupported" && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center">
              <XCircle size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              WebGPU非対応ブラウザ
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              このブラウザはWebGPUに対応していません。
              <br />
              Chrome 113以降またはEdge 113以降をお使いください。
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-xs">
              <AlertTriangle size={14} />
              <span>Android: Chrome Canary / PC: Chrome 最新版を推奨</span>
            </div>
          </div>
        )}

        {/* Idle - Ready to download */}
        {status === "idle" && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
              <Cpu size={28} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              AIモデルの準備
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              Gemma 2B モデルをデバイスにダウンロードします。
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
              初回のみ約1.5GBのダウンロードが必要です（2回目以降はキャッシュ済み）
            </p>
            <button
              onClick={onInitialize}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] transition-all"
            >
              <Download size={18} />
              モデルをダウンロード
            </button>
          </div>
        )}

        {/* Checking */}
        {status === "checking" && (
          <div className="p-6 text-center">
            <Loader2
              size={36}
              className="mx-auto mb-4 text-blue-500 animate-spin"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              WebGPU対応を確認中...
            </p>
          </div>
        )}

        {/* Downloading / Loading */}
        {(status === "downloading" || status === "loading") && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center animate-pulse-glow">
                <Download size={20} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  AIモデルを準備中...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {progress.text || "初期化中..."}
                </p>
              </div>
              <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                {Math.round(progress.progress * 100)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.max(progress.progress * 100, 2)}%` }}
              />
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                経過時間: {Math.round(progress.timeElapsed)}秒
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                ブラウザを閉じないでください
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center">
              <XCircle size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              エラーが発生しました
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              モデルの読み込みに失敗しました。ページを再読み込みしてください。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              再読み込み
            </button>
          </div>
        )}
      </div>

      {/* Privacy badge */}
      {status === "idle" && (
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span className="text-xs text-emerald-700 dark:text-emerald-400">
              全データはデバイス内で処理 — 外部送信なし
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
