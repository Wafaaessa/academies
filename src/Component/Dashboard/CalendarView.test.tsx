import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CalendarView from "./CalendarView";
import { act } from "react-dom/test-utils";

jest.mock("papaparse", () => ({
  parse: jest.fn((_, { complete }) => {
    const mockData = [
      {
        session_id: "1",
        session_name: "Math Lecture",
        session_description: "<p>Algebra and Geometry</p>",
        session_date: "2024-10-30",
        session_status: "completed",
        session_type: "Lecture",
        course_id: "101",
        course_name: "Mathematics",
      },
      {
        session_id: "2",
        session_name: "Physics Lecture",
        session_description: "<p>Introduction to Mechanics</p>",
        session_date: "2024-10-31",
        session_status: "coming",
        session_type: "Lecture",
        course_id: "102",
        course_name: "Physics",
      },
    ];
    complete({ data: mockData });
  }),
}));

describe("CalendarView Component", () => {
  beforeEach(() => {
    render(<CalendarView />);
  });

  test("renders the calendar buttons", () => {
    expect(screen.getByText(/Schedule a lecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Tomorrow/i)).toBeInTheDocument();
  });

  test("shows session details when a date is selected", async () => {
    const todayButton = screen.getByText(/Today/i);
    fireEvent.click(todayButton);

    const sessionName = await screen.findByText(/Session Name:/i);
    expect(sessionName).toBeInTheDocument();
    expect(screen.getByText(/Math Lecture/i)).toBeInTheDocument();
  });

  test("displays a message when there are no events on a selected date", async () => {
    jest.mock("papaparse", () => ({
      parse: jest.fn((_, { complete }) => {
        const mockData = [
          {
            session_id: "1",
            session_name: "Math Lecture",
            session_description: "<p>Algebra and Geometry</p>",
            session_date: "2024-10-30",
            session_status: "completed",
            session_type: "Lecture",
            course_id: "101",
            course_name: "Mathematics",
          },
        ];
        complete({ data: mockData });
      }),
    }));

    render(<CalendarView />);

    const tomorrowButtons = screen.getAllByText(/Tomorrow/i);
    fireEvent.click(tomorrowButtons[0]);

    const noEventMessage = await screen.findByText(/No events on this day/i);
    expect(noEventMessage).toBeInTheDocument();
  });
});
