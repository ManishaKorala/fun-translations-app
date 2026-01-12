import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Translate from "../app/routes/translate";

// Mocks
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useActionData: vi.fn(() => ({
      text: "Hello",
      translated: "Yoda says: Hello",
      engine: "yoda",
    })),
    Form: ({ children, onSubmit, ...props }: any) => (
      <form {...props} onSubmit={onSubmit}>
        {children}
      </form>
    ),
  };
});

vi.mock("../view/context/TranslationHistoryContext", () => ({
  useTranslationHistory: () => ({
    history: [],
    addToHistory: vi.fn(),
  }),
}));

describe("Translate", () => {
    it("shows translation result", async () => {
        render(<Translate />);
        
        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("Yoda says: Hello")).toBeInTheDocument();
    });
});
