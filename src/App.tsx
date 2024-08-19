import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import UsersPage from "./Component/UsersPage/UsersPage";
import UserProfile from "./Component/UserProfile/UserProfile";
import Dashboard from "./Component/Dashboard/Dashboard";

const App: React.FC<{ router?: React.ReactNode }> = ({ router }) => {
  return (
    <>
      {router ? (
        router
      ) : (
        <Router>
          <Layout>
            <Routes>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user/:userId/*" element={<UserProfile />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
};

export default App;
