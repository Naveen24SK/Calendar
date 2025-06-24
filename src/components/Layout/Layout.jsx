import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../SideBar/SideBar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} />}
      <div style={{ flex: 1, width: "100%" }}>
        <Header toggleSidebar={toggleSidebar} />
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
