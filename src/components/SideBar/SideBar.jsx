import React from "react";
import "./SideBar.css";

export default function Sidebar({ isOpen, todayEvents = [] }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
      <div className="sidebar-header">
        <h2>Calendar</h2>
        <hr />
      </div>

      <div className="sidebar-content">
        {todayEvents.length > 0 ? (
          <div className="sidebar-events">
            <h4>Today's Events</h4>
            <ul>
              {todayEvents.map((event, i) => (
                <li key={i} title={`${event.startTime} - ${event.endTime}`}>
                  <span
                    className="event-dot"
                    style={{ backgroundColor: event.color }}
                  />
                  <div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-time">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="no-events">No events for today</p>
        )}
      </div>
    </aside>
  );
}
