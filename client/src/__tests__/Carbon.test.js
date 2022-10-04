import { render, screen } from "@testing-library/react";
import Carbon from "../pages/Carbon";

test("image appears on the page", () => {
  render(<Carbon />);
});
