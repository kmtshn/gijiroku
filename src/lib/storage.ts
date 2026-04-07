import type { HistoryEntry } from "../types";

const STORAGE_KEY = "gijiroku-ai-history";
const MAX_ENTRIES = 50;

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: HistoryEntry): void {
  const history = loadHistory();
  history.unshift(entry);
  if (history.length > MAX_ENTRIES) {
    history.splice(MAX_ENTRIES);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function deleteHistoryEntry(id: string): void {
  const history = loadHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearAllHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function extractTitle(input: string): string {
  const firstLine = input.trim().split("\n")[0];
  if (firstLine.length <= 30) return firstLine;
  return firstLine.slice(0, 30) + "...";
}
