import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import '@testing-library/jest-dom';

jest.mock("./../NavTabs/CoursesPage", () => () => <div>CoursesPage</div>);
jest.mock("./../NavTabs/PaymentsPage", () => () => <div>PaymentsPage</div>);
jest.mock("./../AddCourseModal/AddCourseModal", () => (props: any) =>
  props.isOpen ? <div>AddCourseModal</div> : null
);
jest.mock("./../AddPaymentModal/AddPaymentModal", () => (props: any) =>
  props.isOpen ? <div>AddPaymentModal</div> : null
);

describe("UserProfile component", () => {
  const renderUserProfile = (initialPath: string = "/users/courses") => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/users/*" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders UserProfile component without crashing", () => {
    renderUserProfile();
    expect(screen.getByText("CoursesPage")).toBeInTheDocument();
  });

  it("renders breadcrumbs correctly", () => {
    renderUserProfile();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("opens the correct modal when clicking add button on Courses page", () => {
    renderUserProfile("/users/courses");
    const addButton = screen.getByText("Add to course");
    fireEvent.click(addButton);
    expect(screen.getByText("AddCourseModal")).toBeInTheDocument();
  });

  it("opens the correct modal when clicking add button on Payments page", () => {
    renderUserProfile("/users/payments");
    const addButton = screen.getByText("Add payment");
    fireEvent.click(addButton);
    expect(screen.getByText("AddPaymentModal")).toBeInTheDocument();
  });

  it("toggles filter visibility on Courses page", () => {
    renderUserProfile("/users/courses");
    const filterButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterButton);
    expect(screen.getByRole('heading', { name: /filters/i })).toBeInTheDocument();
  });
  

  it("does not display filter button on Payments page", () => {
    renderUserProfile("/users/payments");
    expect(screen.queryByText("Filters")).not.toBeInTheDocument();
  });

  it("handles filter date input changes", () => {
    renderUserProfile("/users/courses");
    fireEvent.click(screen.getByText("Filters"));
  
    const fromDateInput = screen.getByLabelText("From :");
    const toDateInput = screen.getByLabelText("To :");
  
    fireEvent.change(fromDateInput, { target: { value: "2023-08-01" } });
    fireEvent.change(toDateInput, { target: { value: "2023-08-31" } });
  
    expect(fromDateInput).toHaveValue("2023-08-01");
    expect(toDateInput).toHaveValue("2023-08-31");
  });
  
});
