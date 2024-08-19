/* eslint-disable testing-library/no-node-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/no-conditional-expect */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaymentsPage from "./PaymentsPage";
describe("PaymentsPage Component", () => {
  test("renders the component correctly", () => {
    render(<PaymentsPage />);
    expect(screen.getByText(/Online payments/i)).toBeInTheDocument();
    expect(screen.getByText(/Offline payments/i)).toBeInTheDocument();
  });

  test("displays online payments by default", () => {
    render(<PaymentsPage />);

    expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();

    expect(screen.getByText("pi_3Pikhv062D4e6xfi1hfGKVFn")).toBeInTheDocument();
    expect(screen.getByText("8/1/2024 1:10:26 AM")).toBeInTheDocument();

    expect(screen.getAllByText("Stripe")).toHaveLength(2);

    expect(screen.getAllByText("500")).toHaveLength(2);

    expect(screen.getAllByText("EGP")).toHaveLength(2);

    expect(
      screen.queryByText(/No payments available/i)
    ).not.toBeInTheDocument();
  });

  test("switches to offline payments when the button is clicked", () => {
    render(<PaymentsPage />);
    const offlineButton = screen.getByText(/Offline payments/i);
    fireEvent.click(offlineButton);
    expect(screen.getByText(/Payment date/i)).toBeInTheDocument();
  });

  test("opens and closes the delete modal correctly", () => {
    render(<PaymentsPage />);
    fireEvent.click(screen.getByText(/Offline payments/i));

    const allButtons = screen.getAllByRole("button");
    allButtons.forEach((button) => console.log(button.innerHTML));

    const deleteButtons = screen.getAllByRole("button", { name: "" });
    const deleteButton = deleteButtons.find((button) =>
      button.className.includes("delete")
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(
        screen.getByText(/Are you sure you want to delete this payment?/i)
      ).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Cancel/i));
      expect(
        screen.queryByText(/Are you sure you want to delete this payment?/i)
      ).not.toBeInTheDocument();
    } else {
      throw new Error("Delete button not found");
    }
  });

  test("opens and closes the edit modal correctly", () => {
    render(<PaymentsPage />);
    fireEvent.click(screen.getByText(/Offline payments/i));

    const editButtons = document.querySelectorAll("button.action-btn.edit");

    expect(editButtons.length).toBeGreaterThan(0);

    fireEvent.click(editButtons[0]);

    expect(screen.getByText(/Edit Payment/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByText(/Edit Payment/i)).not.toBeInTheDocument();
  });

  test("filters payments based on the selected date range", () => {
    render(<PaymentsPage />);

    fireEvent.click(screen.getByText(/Offline payments/i));
    fireEvent.click(screen.getByText(/Filters/i));

    const startDateInput = screen.getByLabelText("From :");
    const endDateInput = screen.getByLabelText("To :");

    fireEvent.change(startDateInput, { target: { value: "2024-08-01" } });
    fireEvent.change(endDateInput, { target: { value: "2024-08-02" } });

    const filterButton = screen.getByRole("button", { name: /Filters/i });
    fireEvent.click(filterButton);

    expect(screen.getAllByText("500")).toHaveLength(2);
  });
});
