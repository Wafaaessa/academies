import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddGroupModal from "./AddGroupModal"; 
import '@testing-library/jest-dom';

describe("AddGroupModal", () => {
  const mockOnClose = jest.fn();

  test("renders modal content when isOpen is true", () => {
    render(<AddGroupModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText("Add to Group")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Group One")).toBeInTheDocument();
    expect(screen.getByText("Group two")).toBeInTheDocument();
    expect(screen.getByText("Group three")).toBeInTheDocument();
  });

  test("does not render modal content when isOpen is false", () => {
    render(<AddGroupModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByText("Add to Group")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
    expect(screen.queryByText("Group One")).not.toBeInTheDocument();
    expect(screen.queryByText("Group two")).not.toBeInTheDocument();
    expect(screen.queryByText("Group three")).not.toBeInTheDocument();
  });

  test("calls onClose when Cancel button is clicked", () => {
    render(<AddGroupModal isOpen={true} onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText("Cancel"));
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  beforeEach(() => {
    mockOnClose.mockClear(); 
  });

  test("calls onClose when Save button is clicked", () => {
    render(<AddGroupModal isOpen={true} onClose={mockOnClose} />);
    
    console.log("Initial mockOnClose call count:", mockOnClose.mock.calls.length);

    fireEvent.click(screen.getByText("Save"));

    console.log("mockOnClose call count after click:", mockOnClose.mock.calls.length);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
