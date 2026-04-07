import type { ModelOption } from "../types";

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
    label: "Qwen 2.5 0.5B",
    description: "超軽量・高速起動。スマホに最適",
    vramMB: 945,
    downloadSizeMB: 350,
    japanesePower: 2,
    badge: "最軽量",
  },
  {
    id: "Qwen3-0.6B-q4f16_1-MLC",
    label: "Qwen 3 0.6B",
    description: "最新世代の軽量モデル。日本語改善",
    vramMB: 1403,
    downloadSizeMB: 500,
    japanesePower: 3,
    recommended: true,
    badge: "おすすめ",
  },
  {
    id: "Qwen2.5-1.5B-Instruct-q4f16_1-MLC",
    label: "Qwen 2.5 1.5B",
    description: "バランス型。日本語が得意",
    vramMB: 1630,
    downloadSizeMB: 900,
    japanesePower: 4,
  },
  {
    id: "Qwen3-1.7B-q4f16_1-MLC",
    label: "Qwen 3 1.7B",
    description: "最新世代。高品質な日本語出力",
    vramMB: 2037,
    downloadSizeMB: 1100,
    japanesePower: 5,
    badge: "高品質",
  },
  {
    id: "gemma-2-2b-jpn-it-q4f16_1-MLC",
    label: "Gemma 2 2B 日本語版",
    description: "Google製。日本語特化チューニング",
    vramMB: 1895,
    downloadSizeMB: 1500,
    japanesePower: 4,
  },
];

export const DEFAULT_MODEL_ID = "Qwen3-0.6B-q4f16_1-MLC";

const STORAGE_KEY = "gijiroku-selected-model";

export function loadSelectedModelId(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && MODEL_OPTIONS.some((m) => m.id === saved)) return saved;
  } catch {}
  return DEFAULT_MODEL_ID;
}

export function saveSelectedModelId(id: string): void {
  localStorage.setItem(STORAGE_KEY, id);
}
