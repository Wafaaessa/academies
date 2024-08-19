/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersPage from "./Component/UsersPage/UsersPage";
import UserProfile from "./Component/UserProfile/UserProfile";
import Dashboard from "./Component/Dashboard/Dashboard";
describe("App Component", () => {
  test("renders UsersPage at /users route", async () => {
    render(
      <MemoryRouter initialEntries={["/users"]}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("users-page")).toBeInTheDocument();
    });
  });

  test("renders Dashboard at /dashboard route", async () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId("dash-page")).toBeInTheDocument();
    });
  });

  test("renders UserProfile at /user/:userId route", async () => {
    render(
      <App
        router={
          <MemoryRouter initialEntries={["/user/123"]}>
            <Routes>
              <Route path="/user/:userId/*" element={<UserProfile />} />
            </Routes>
          </MemoryRouter>
        }
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-profile")).toBeInTheDocument();
    });
  });
});