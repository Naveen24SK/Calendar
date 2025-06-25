import React from "react";
import "./SideBar.css";

export default function Sidebar({ isOpen, todayEvents = [] }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
      <ul>
        <li>Calendar</li>
        <li>Messages</li>
      </ul>
      {todayEvents.length > 0 && (
        <div className="sidebar-events">
          <h4>Today's Events</h4>
          <ul>
            {todayEvents.map((event, i) => (
              <li key={i} title={`${event.startTime} - ${event.endTime}`}>
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: event.color,
                    marginRight: 8,
                  }}
                />
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

