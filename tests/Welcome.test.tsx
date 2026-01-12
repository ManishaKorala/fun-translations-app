import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Welcome } from "../app/welcome/welcome";

describe("Welcome", () => {
  it("renders logo and resources", () => {
    render(<Welcome />);
    
    expect(screen.getAllByAltText("React Router")).toHaveLength(2);
    expect(screen.getByText("What's next?")).toBeInTheDocument();
    expect(screen.getByText("React Router Docs")).toBeInTheDocument();
    expect(screen.getByText("Join Discord")).toBeInTheDocument();
  });
});
