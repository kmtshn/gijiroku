import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import ModelLoader from "./components/ModelLoader";
import MemoInput from "./components/MemoInput";
import ResultOutput from "./components/ResultOutput";
import HistoryPanel from "./components/HistoryPanel";
import PrivacyBadge from "./components/PrivacyBadge";
import InstallBanner from "./components/InstallBanner";
import { useTheme } from "./hooks/useTheme";
import { useWebLLM } from "./hooks/useWebLLM";
import { usePWAInstall } from "./hooks/usePWAInstall";
import { MODEL_OPTIONS } from "./lib/models";
import {
  loadHistory,
  saveHistoryEntry,
  deleteHistoryEntry,
  clearAllHistory,
  generateId,
  extractTitle,
} from "./lib/storage";
import type { HistoryEntry } from "./types";

function App() {
  const { theme, setTheme } = useTheme();
  const {
    status,
    progress,
    output,
    isGenerating,
    selectedModelId,
    setSelectedModelId,
    initialize,
    generate,
    setOutput,
  } = useWebLLM();
  const { canInstall, install, dismiss } = usePWAInstall();

  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleGenerate = useCallback(
    async (inputText: string) => {
      try {
        const result = await generate(inputText);
        if (result) {
          const entry: HistoryEntry = {
            id: generateId(),
            timestamp: Date.now(),
            input: inputText,
            output: result,
            title: extractTitle(inputText),
          };
          saveHistoryEntry(entry);
          setHistory(loadHistory());
        }
      } catch (err) {
        console.error("Generation error:", err);
      }
    },
    [generate],
  );

  const handleSelectHistory = useCallback(
    (entry: HistoryEntry) => {
      setOutput(entry.output);
    },
    [setOutput],
  );

  const handleDeleteHistory = useCallback((id: string) => {
    deleteHistoryEntry(id);
    setHistory(loadHistory());
  }, []);

  const handleClearAllHistory = useCallback(() => {
    clearAllHistory();
    setHistory([]);
  }, []);

  const currentModel = MODEL_OPTIONS.find((m) => m.id === selectedModelId);
  const modelLabel = currentModel?.label || "AI";

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header theme={theme} setTheme={setTheme} modelLabel={modelLabel} />

      {/* Model loader - shown until model is ready */}
      <ModelLoader
        status={status}
        progress={progress}
        selectedModelId={selectedModelId}
        onSelectModel={setSelectedModelId}
        onInitialize={initialize}
      />

      {/* Main content */}
      {status === "ready" && (
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
          <PrivacyBadge />
          <MemoInput
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            isModelReady={status === "ready"}
          />
          <ResultOutput output={output} isGenerating={isGenerating} />
          <HistoryPanel
            history={history}
            onSelect={handleSelectHistory}
            onDelete={handleDeleteHistory}
            onClearAll={handleClearAllHistory}
          />
        </main>
      )}

      {/* PWA Install Banner */}
      {canInstall && (
        <InstallBanner onInstall={install} onDismiss={dismiss} />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-600">
            AI議事録メーカー v1.1 — Powered by {modelLabel} (WebGPU) —
            全処理はデバイス内で完結
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
