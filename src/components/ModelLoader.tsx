import {
  Cpu,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Zap,
  HardDrive,
  Languages,
} from "lucide-react";
import type { ModelStatus, DownloadProgress, ModelOption } from "../types";
import { MODEL_OPTIONS } from "../lib/models";

interface ModelLoaderProps {
  status: ModelStatus;
  progress: DownloadProgress;
  selectedModelId: string;
  onSelectModel: (id: string) => void;
  onInitialize: () => void;
}

function JapanesePowerBar({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-3 rounded-full ${
            i <= level
              ? "bg-blue-500"
              : "bg-slate-200 dark:bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

function ModelCard({
  model,
  selected,
  onSelect,
}: {
  model: ModelOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
        selected
          ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-bold ${
                selected
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-800 dark:text-slate-200"
              }`}
            >
              {model.label}
            </span>
            {model.badge && (
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  model.badge === "おすすめ"
                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    : model.badge === "最軽量"
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                      : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                }`}
              >
                {model.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {model.description}
          </p>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
            selected
              ? "border-blue-500 bg-blue-500"
              : "border-slate-300 dark:border-slate-600"
          }`}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 mt-2 flex-wrap">
        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <HardDrive size={10} />
          <span>~{model.downloadSizeMB >= 1000 ? `${(model.downloadSizeMB / 1000).toFixed(1)}GB` : `${model.downloadSizeMB}MB`}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
          <Zap size={10} />
          <span>{model.vramMB >= 1000 ? `${(model.vramMB / 1000).toFixed(1)}GB` : `${model.vramMB}MB`} VRAM</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
          <Languages size={10} />
          <span>日本語</span>
          <JapanesePowerBar level={model.japanesePower} />
        </div>
      </div>
    </button>
  );
}

export default function ModelLoader({
  status,
  progress,
  selectedModelId,
  onSelectModel,
  onInitialize,
}: ModelLoaderProps) {
  if (status === "ready") return null;

  const selectedModel = MODEL_OPTIONS.find((m) => m.id === selectedModelId);

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

        {/* Idle - Model selection + download */}
        {status === "idle" && (
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                <Cpu size={20} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  AIモデルを選択
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  デバイスの性能に合わせてモデルを選んでください
                </p>
              </div>
            </div>

            {/* Model list */}
            <div className="space-y-2 mb-5">
              {MODEL_OPTIONS.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  selected={selectedModelId === model.id}
                  onSelect={() => onSelectModel(model.id)}
                />
              ))}
            </div>

            {/* Download button */}
            <button
              onClick={onInitialize}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] transition-all"
            >
              <Download size={18} />
              {selectedModel?.label} をダウンロード
              <span className="text-blue-200 text-xs font-normal">
                (~{selectedModel && selectedModel.downloadSizeMB >= 1000 ? `${(selectedModel.downloadSizeMB / 1000).toFixed(1)}GB` : `${selectedModel?.downloadSizeMB}MB`})
              </span>
            </button>

            <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-2">
              初回のみダウンロードが必要です（2回目以降はキャッシュ済み）
            </p>
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
                  {selectedModel?.label} を準備中...
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
