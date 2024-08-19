import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar Component", () => {
  test("renders the Sidebar component", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    const toggleButton = screen.getByTestId("sidebar-toggle-btn");
    expect(toggleButton).toBeInTheDocument();
  });

  test("toggles the sidebar on button click", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const toggleButton = screen.getByTestId("sidebar-toggle-btn");
    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).not.toHaveClass("expanded");

    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass("expanded");

    fireEvent.click(toggleButton);
    expect(sidebar).not.toHaveClass("expanded");
  });

  test("applies the active class to the active nav item", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Sidebar />
      </MemoryRouter>
    );

    const activeLink = screen.getByTestId("dashboard-link");

    expect(activeLink).toHaveClass("active");
  });
});
