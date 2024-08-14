import React, { useEffect, useState } from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import "./UserProfile.css";
import CoursesPage from "./../NavTabs/CoursesPage";
import GroupsPage from "./../NavTabs/GroupsPage";
import PaymentsPage from "./../NavTabs/PaymentsPage";
import FilesPage from "./../NavTabs/FilesPage";
import InfoPage from "./../NavTabs/InfoPage";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumbs from "./../Breadcrumbs/Breadcrumbs";
import AddCourseModal from "./../AddCourseModal/AddCourseModal";
import AddGroupModal from "./../AddGroupModal/AddGroupModal";
import AddPaymentModal from "./../AddPaymentModal/AddPaymentModal";

const UserProfile: React.FC = () => {
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const state = location.state as
      | { username?: string; userData?: any }
      | undefined;
    setUsername(state?.username || "User");
    setUserData(state?.userData || null);
  }, [location.state]);

  const handleAddButton = () => {
    const currentPath = location.pathname;
    if (currentPath.endsWith("courses")) {
      setIsCourseModalOpen(true);
    } else if (currentPath.endsWith("payments")) {
      setIsPaymentModalOpen(true);
    } else if (currentPath.endsWith("groups")) {
      setIsGroupModalOpen(true);
    } else if (currentPath.endsWith("files")) {
      /////////
    } else if (currentPath.endsWith("info")) {
      /////////
    }
  };

  const getAddButtonLabel = () => {
    const currentPath = location.pathname;
    if (currentPath.endsWith("courses")) {
      return "Add to course";
    } else if (currentPath.endsWith("payments")) {
      return "Add payment";
    } else if (currentPath.endsWith("groups")) {
      return "Add to group";
    } else if (currentPath.endsWith("files")) {
      return "Add File";
    } else if (currentPath.endsWith("info")) {
      return "Add Info";
    }
    return "Add";
  };
  /////////////////
  const showFilterButton = location.pathname.endsWith("courses");
  const showSearchInput = !location.pathname.endsWith("payments");

  ///////////////////
  const handleFilterChange = (field: "fromDate" | "toDate", value: string) => {
    if (field === "fromDate") {
      setFromDate(value);
    } else {
      setToDate(value);
    }
  };
  return (
    <div className="user-profile">
      <header>
        <div className="search-top">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <Breadcrumbs
          items={[
            { label: "Home", path: "/dashboard" },
            { label: "Users", path: "/users" },
            { label: username || "User" },
          ]}
        />
        <Link to="/users" className="back-arrow">
          <i className="fa-solid fa-chevron-left"></i> {username}
        </Link>
      </header>
      {/* nav */}
      <nav className="profile-nav">
        <ul>
          <li>
            <Link
              to="courses"
              state={{ username, userData }}
              className={location.pathname.endsWith("courses") ? "active" : ""}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="groups"
              state={{ username, userData }}
              className={location.pathname.endsWith("groups") ? "active" : ""}
            >
              Groups
            </Link>
          </li>
          <li>
            <Link
              to="payments"
              state={{ username, userData }}
              className={location.pathname.endsWith("payments") ? "active" : ""}
            >
              Payments
            </Link>
          </li>
          <li>
            <Link
              to="files"
              state={{ username, userData }}
              className={location.pathname.endsWith("files") ? "active" : ""}
            >
              Files
            </Link>
          </li>
          <li>
            <Link
              to="info"
              state={{ username, userData }}
              className={location.pathname.endsWith("info") ? "active" : ""}
            >
              Info
            </Link>
          </li>
        </ul>
      </nav>

      {/* buttons */}
      <div className="action-bar">
        <div className="bar">
          {showSearchInput && (
            <input type="text" placeholder="Search" className="search-input" />
          )}
          {showFilterButton && (
            <>
              <button
                className={`add-user-btn filter ${
                  location.pathname.endsWith("payments")
                    ? "payment-page-filter-button"
                    : ""
                }`}
                onClick={() => setShowFilter(!showFilter)}
              >
                <FontAwesomeIcon icon={faFilter} /> Filters
              </button>
            </>
          )}
        </div>
        <button className="add-user-btn usernbtn" onClick={handleAddButton}>
          <FontAwesomeIcon icon={faPlus} />
          {getAddButtonLabel()}
        </button>
      </div>

      {/* show filter */}
      {showFilter && (
        <div className="filter-form">
          <h4>Filters</h4>
          <h3>Enrollment Date</h3>
          <div className="row mb-3 mt-3">
            <div className="filter-field  col-md-6">
              <label> From :</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                className="form-control"
              />
            </div>
            <div className="filter-field col-md-6 mb-3">
              <label>To :</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => handleFilterChange("toDate", e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
      )}

      <div className="tab-content">
        <Routes>
          <Route
            path="courses"
            element={<CoursesPage fromDate={fromDate} toDate={toDate} />}
          />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="info" element={<InfoPage userData={userData} />} />
        </Routes>
      </div>
      {/* Modals */}
      {isCourseModalOpen && (
        <AddCourseModal
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
        />
      )}
      {isGroupModalOpen && (
        <AddGroupModal
          isOpen={isGroupModalOpen}
          onClose={() => setIsGroupModalOpen(false)}
        />
      )}
      {isPaymentModalOpen && (
        <AddPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;
