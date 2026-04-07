import { useState, useCallback, useRef } from "react";
import type { InitProgressReport } from "@mlc-ai/web-llm";
import {
  initEngine,
  generateMinutes,
  checkWebGPUSupport,
} from "../lib/llm-engine";
import {
  loadSelectedModelId,
  saveSelectedModelId,
} from "../lib/models";
import type { ModelStatus, DownloadProgress } from "../types";

export function useWebLLM() {
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [progress, setProgress] = useState<DownloadProgress>({
    progress: 0,
    timeElapsed: 0,
    text: "",
  });
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModelId, setSelectedModelIdState] = useState(loadSelectedModelId);
  const startTimeRef = useRef<number>(0);

  const setSelectedModelId = useCallback((id: string) => {
    setSelectedModelIdState(id);
    saveSelectedModelId(id);
  }, []);

  const initialize = useCallback(async (modelId?: string) => {
    const targetModel = modelId || selectedModelId;

    if (!checkWebGPUSupport()) {
      setStatus("unsupported");
      return;
    }

    setStatus("checking");

    try {
      setStatus("downloading");
      startTimeRef.current = Date.now();

      await initEngine(targetModel, (report: InitProgressReport) => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setProgress({
          progress: report.progress,
          timeElapsed: elapsed,
          text: report.text,
        });

        if (report.progress >= 1) {
          setStatus("ready");
        }
      });

      setStatus("ready");
    } catch (err) {
      console.error("Model initialization failed:", err);
      setStatus("error");
    }
  }, [selectedModelId]);

  const generate = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return "";

    setIsGenerating(true);
    setOutput("");

    try {
      const result = await generateMinutes(inputText, (text) => {
        setOutput(text);
      });
      return result;
    } catch (err) {
      console.error("Generation failed:", err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    status,
    progress,
    output,
    isGenerating,
    selectedModelId,
    setSelectedModelId,
    initialize,
    generate,
    setOutput,
  };
}
