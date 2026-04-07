export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  output: string;
  title: string;
}

export type ModelStatus =
  | "idle"
  | "checking"
  | "downloading"
  | "loading"
  | "ready"
  | "error"
  | "unsupported";

export interface DownloadProgress {
  progress: number;
  timeElapsed: number;
  text: string;
}

export interface ModelOption {
  id: string;
  label: string;
  description: string;
  vramMB: number;
  downloadSizeMB: number;
  japanesePower: 1 | 2 | 3 | 4 | 5;
  recommended?: boolean;
  badge?: string;
}
