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
