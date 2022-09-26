import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Title", () => {
  render(<App />);
  const linkElement = screen.getByText("Travel-lite");
  expect(linkElement).toBeInTheDocument();
});
