import type { Engine } from "./Engine";

export interface HistoryItem {
  id: string;
  text: string;
  translated: string;
  engine: Engine;
  timestamp: Date;
}
