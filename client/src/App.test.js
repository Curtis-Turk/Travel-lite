import { render, screen } from "@testing-library/react";
import App from "./App";

test("About us appears in the nav bar", () => {
  render(<App />);
  const NavLink = screen.getByText("About us");
  expect(NavLink).toBeInTheDocument();
});
test("Home appears in the nav bar", () => {
  render(<App />);
  const NavLink = screen.getByText("Home");
  expect(NavLink).toBeInTheDocument();
});
test("Carbon appears in the nav bar", () => {
  render(<App />);
  const NavLink = screen.getByText("Carbon");
  expect(NavLink).toBeInTheDocument();
});
