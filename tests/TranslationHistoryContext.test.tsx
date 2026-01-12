import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TranslationHistoryProvider, useTranslationHistory } from "../view/context/TranslationHistoryContext";

const TestComponent = () => {
  const { history, addToHistory } = useTranslationHistory();
  return (
    <div>
      <span data-testid="history-count">{history.length}</span>
      <button onClick={() => addToHistory({ text: "hello", engine: "gpt" })}>
        Add
      </button>
    </div>
  );
};

describe("TranslationHistoryContext", () => {
  it("starts empty", () => {
    render(
      <TranslationHistoryProvider>
        <TestComponent />
      </TranslationHistoryProvider>
    );
    expect(screen.getByTestId("history-count")).toHaveTextContent("0");
  });

  it("adds to history", async () => {
    render(
      <TranslationHistoryProvider>
        <TestComponent />
      </TranslationHistoryProvider>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("history-count")).toHaveTextContent("1");
  });
});
