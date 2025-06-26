import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../SideBar/SideBar";
import "./Layout.css";
import Calendar from "../Calendar/Calendar";
import allEvents from "../../Data/events.json"; 
import dayjs from "dayjs";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const today = dayjs().format("YYYY-MM-DD");
  const todayEvents = allEvents.filter(event => event.date === today);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {sidebarOpen && <Sidebar isOpen={sidebarOpen} todayEvents={todayEvents} />}
      <div style={{ flex: 1, width: "100%" }}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="content">
          <Calendar />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
