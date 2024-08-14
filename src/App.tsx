import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import UsersPage from "./Component/UsersPage/UsersPage";
import UserProfile from "./Component/UserProfile/UserProfile";
import Dashoard from "./Component/Dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/dashboard" element={<Dashoard />} />

          <Route path="/user/:userId/*" element={<UserProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
