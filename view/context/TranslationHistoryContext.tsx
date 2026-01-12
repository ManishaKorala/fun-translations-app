import { createContext, useContext, useState, type ReactNode } from "react";
import type { HistoryItem } from "domain/types/TranslationHistory";

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
}

const TranslationHistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function TranslationHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);

  const addToHistory = (item: Omit<HistoryItem, "id" | "timestamp">) => {
    // Create a key for this translation
    const key = `${item.text}|${item.engine}`;
    
    // Only add if it's different from the last one
    if (lastAddedKey !== key) {
      setLastAddedKey(key);
      
      const newItem: HistoryItem = {
        ...item,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
      };
      setHistory((prev) => [newItem, ...prev]); // Newest first
    }
  };

  return (
    <TranslationHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </TranslationHistoryContext.Provider>
  );
}

export function useTranslationHistory() {
  const context = useContext(TranslationHistoryContext);
  if (!context) {
    throw new Error("useTranslationHistory must be used within TranslationHistoryProvider");
  }
  return context;
}
