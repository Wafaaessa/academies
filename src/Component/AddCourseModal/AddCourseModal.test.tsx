import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddCourseModal from "./AddCourseModal";

describe("AddCourseModal", () => {
  test("renders modal content when isOpen is true", () => {
    render(<AddCourseModal isOpen={true} onClose={() => {}} />);

    expect(screen.getByTestId("modal-overlay")).toBeInTheDocument();
    
    const modalContent = screen.getByTestId("modal-content");
    expect(modalContent).toBeInTheDocument();
    expect(modalContent).toHaveTextContent("Add to course");

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    const cards = screen.getAllByTestId("card-content");
    expect(cards).toHaveLength(6);

    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("does not render modal content when isOpen is false", () => {
    render(<AddCourseModal isOpen={false} onClose={() => {}} />);

    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });

  test("calls onClose when Cancel button is clicked", () => {
    const onClose = jest.fn();
    render(<AddCourseModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose and logs "Course saved" when Save button is clicked', () => {
    const onClose = jest.fn();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<AddCourseModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(consoleSpy).toHaveBeenCalledWith("Course saved");
    expect(onClose).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});
