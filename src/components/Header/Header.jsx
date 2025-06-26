import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";

export default function Header({ toggleSidebar }) {
  return (
    <header className="main-header">
      <div className="left-section">
        <button className="menu-btn" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <h1 className="logo">Calendar</h1>
      </div>
      <div className="right-section">
        <div className="icon">
          <NotificationsIcon />
        </div>
        <div className="icon">
          <AccountCircleIcon />
        </div>
      </div>
    </header>
  );
}
