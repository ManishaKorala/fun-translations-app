import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/routes/home";

describe("Home", () => {
  it("renders Welcome component", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
