import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CalendarView from "./CalendarView";
import Papa from "papaparse";
import moment from "moment";
import "@testing-library/jest-dom";

jest.mock("papaparse", () => ({
  parse: jest.fn(),
}));

describe("CalendarView Component", () => {
  const mockSessions = [
    {
      session_id: "1",
      session_name: "Session 1",
      session_description: "Description 1",
      session_date: moment().format("YYYY-MM-DD"),
      session_status: "Active",
      session_type: "Type 1",
      course_id: "101",
      course_name: "Course 1",
    },
    {
      session_id: "2",
      session_name: "Session 2",
      session_description: "Description 2",
      session_date: moment().add(1, "day").format("YYYY-MM-DD"),
      session_status: "Active",
      session_type: "Type 2",
      course_id: "102",
      course_name: "Course 2",
    },
  ];

  beforeEach(() => {
    (Papa.parse as jest.Mock).mockImplementation((_, options: any) => {
      options.complete({ data: mockSessions });
    });
  });

  it("renders CalendarView component", () => {
    render(<CalendarView />);
    expect(screen.getByText("Latest Sessions")).toBeInTheDocument();
  });

  test("CalendarView Component navigates to the next and previous months using custom toolbar", () => {
    render(<CalendarView />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.click(nextButton);

    fireEvent.click(prevButton);
  });

  test("shows a message when no events are available", async () => {
    (Papa.parse as jest.Mock).mockImplementation((_, { complete }) => {
      complete({ data: [] });
    });

    render(<CalendarView />);

    await waitFor(() => {
      expect(screen.getByText(/No events on this day/i)).toBeInTheDocument();
    });
  });
});
