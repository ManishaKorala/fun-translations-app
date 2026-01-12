import { useTranslationHistory } from "view/context/TranslationHistoryContext";

export default function TranslationHistoryList() {
  const { history } = useTranslationHistory();

  if (history.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        <p>No translations yet.</p>
        <p className="mt-2">Translate something to see history here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 mb-3">📚 History</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="w-full text-left p-3 rounded-md border border-gray-200 bg-gray-50"
          >
            <div className="font-medium text-gray-900 truncate">
              {item.text.substring(0, 30)}
              {item.text.length > 30 ? "..." : ""}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {item.engine} · {item.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
