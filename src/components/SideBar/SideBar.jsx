import React from "react";
import "./SideBar.css";

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
      <ul>
        <li>Dashboard</li>
        <li>Calendar</li>
        <li>Messages</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}
