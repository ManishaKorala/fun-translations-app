import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "~/root";

describe("App", () => {
  it("mounts without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
