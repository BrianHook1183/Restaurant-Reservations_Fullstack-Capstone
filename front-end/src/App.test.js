import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("renders title", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const restaurant = screen.getByText(/Restaurant Reservation System v1.8/i);
  expect(restaurant).toBeInTheDocument();
});
