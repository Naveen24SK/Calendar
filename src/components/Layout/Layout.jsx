import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../SideBar/SideBar";
import "./Layout.css";
import Calendar from "../Calendar/Calendar"; // Assuming you have a Calendar component

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} />}
      <div style={{ flex: 1, width: "100%" }}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="content">
        <Calendar /> 
        </div>
        <main >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
