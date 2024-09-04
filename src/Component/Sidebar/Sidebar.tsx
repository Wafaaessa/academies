import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Settings, User, Users, Book, PieChart, LogOut } from "react-feather";
import "./Sidebar.css";
import logo from "../../assests/Academy 1.png";
import DashboardIcon from "../../assests/Category.png";

type IconType = "fontawesome" | "feather" | "custom";

interface NavItem {
  path: string;
  text: string;
  icon: any;
  testId: string;
  type: IconType;
}

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setExpanded(!expanded);
  };
  const handleLogoutClick = () => {
    navigate("/logout");
  };

  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      text: "Dashboard",
      icon: DashboardIcon,
      testId: "dashboard-link",
      type: "custom",
    },
    {
      path: "/users",
      text: "Users",
      icon: User,
      testId: "users-link",
      type: "feather",
    },
    {
      path: "/groups",
      text: "Groups",
      icon: Users,
      testId: "groups-link",
      type: "feather",
    },
    {
      path: "/courses",
      text: "Courses",
      icon: Book,
      testId: "courses-link",
      type: "feather",
    },
    {
      path: "/reports",
      text: "Reports",
      icon: PieChart,
      testId: "reports-link",
      type: "feather",
    },
    {
      path: "/settings",
      text: "Settings",
      icon: Settings,
      testId: "settings-link",
      type: "feather",
    },
  ];

  return (
    <div
      data-testid="sidebar"
      className={`sidebar ${expanded ? "expanded" : ""}`}
    >
      {/* logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" style={{ width: expanded ? "80px" : "50px" }}  />
      </div>
      {/* Menu bar button */}
      <div className="menu-bar" onClick={handleMenuClick}  style={{ left: expanded ? "245px" : "90px" }} >
        {expanded ? (
          <button
            className="Wrapper_menuToggler__Qm7qH"
            data-testid="sidebar-toggle-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        ) : (
          <button
            className="Wrapper_menuToggler__Qm7qH Wrapper_close__1phTM"
            data-testid="sidebar-toggle-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </div>
      {/* sidebar content */}
      {navItems.map((item, index) => (
        <div className="sidebar-item" key={index}>
          <NavLink
            data-testid={item.testId}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {item.type === "feather" ? (
              <item.icon />
            ) : item.type === "fontawesome" ? (
              <FontAwesomeIcon icon={item.icon} />
            ) : (
              <img src={item.icon} alt={item.text} className="icon-img " />
            )}
            {expanded && item.text}
          </NavLink>
        </div>
      ))}
      {/* Log Out Section */}
      <div className={`sidebar-item logout ${expanded ? "visible" : "hidden"}`}>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `logout-icon ${isActive ? "active" : ""}`
          }
          onClick={handleLogoutClick}
        >
          <LogOut className="fa-arrow-right-from-bracket " />
          {expanded && <span>Log Out</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
