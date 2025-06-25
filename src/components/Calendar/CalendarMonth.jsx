import React, { useState } from "react";
import dayjs from "dayjs";
import eventsData from "../../Data/events.json";
import "./Calendar.css";
import Popup from "../Popup/Popup";
import AddEventDialog from "../Popup/AddEvent";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarMonth = ({ currentDate, today }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupEvents, setPopupEvents] = useState([]);
  const [popupDate, setPopupDate] = useState(null);
  const [events, setEvents] = useState(eventsData);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedCellDate, setSelectedCellDate] = useState(null);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const startDay = startOfMonth.day();
  const totalDays = 42;
  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    const date = startOfMonth.subtract(i + 1, "day");
    days.push({ date, isCurrentMonth: false });
  }

  for (let i = 1; i <= endOfMonth.date(); i++) {
    const date = dayjs(new Date(currentDate.year(), currentDate.month(), i));
    days.push({ date, isCurrentMonth: true });
  }

  const nextDays = totalDays - days.length;
  for (let i = 1; i <= nextDays; i++) {
    const date = endOfMonth.add(i, "day");
    days.push({ date, isCurrentMonth: false });
  }

  const getEventsForDay = (day) =>
    events.filter((event) => dayjs(event.date).isSame(day, "day"));

  const handleMoreClick = (date, events) => {
    setPopupDate(date);
    setPopupEvents(events);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupEvents([]);
    setPopupDate(null);
  };

  const handleDelete = (index) => {
    const eventToDelete = popupEvents[index];
    const updatedEvents = events.filter(
      (e) =>
        !(
          e.title === eventToDelete.title &&
          e.date === eventToDelete.date &&
          e.startTime === eventToDelete.startTime
        )
    );
    setEvents(updatedEvents);
    setPopupEvents(updatedEvents.filter((e) => dayjs(e.date).isSame(popupDate, "day")));
  };

  const handleEdit = (index, updated) => {
    const updatedEvents = events.map((event, i) =>
      event === popupEvents[index] ? updated : event
    );
    setEvents(updatedEvents);
    setPopupEvents(updatedEvents.filter((e) => dayjs(e.date).isSame(popupDate, "day")));
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setAddDialogOpen(false);
  };

  return (
    <>
      <div className="calendar-grid">
        {weekdays.map((day) => (
          <div key={day} className="calendar-day-label">{day}</div>
        ))}

        {days.map(({ date, isCurrentMonth }, idx) => {
          const isToday = date.isSame(today, "day");
          const eventsForDay = getEventsForDay(date);
          const visibleEvents = eventsForDay.slice(0, 2);
          const remainingCount = eventsForDay.length - visibleEvents.length;

          return (
            <div
              key={idx}
              className={`calendar-cell ${isCurrentMonth ? "" : "calendar-faded"}`}
              onClick={() => {
                setSelectedCellDate(date);
                setAddDialogOpen(true);
              }}
            >
              <div className="calendar-date-wrapper">
                <div className={`calendar-date ${isToday ? "calendar-today" : ""}`}>
                  {date.date()}
                </div>
              </div>
              <div className="calendar-events">
                {visibleEvents.map((event, i) => (
                  <div
                    key={i}
                    className="calendar-event"
                    style={{ backgroundColor: event.color }}
                    title={`${event.title}\n${event.startTime} - ${event.endTime}`}
                    onClick={(e) => {e.stopPropagation(); handleMoreClick(date, eventsForDay);}}
                  >
                    {event.title}
                  </div>
                ))}
                {remainingCount > 0 && (
                  <div
                    className="calendar-event-more"

                  >
                    +{remainingCount}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event List Popup */}
      {showPopup && (
        <Popup
          date={popupDate}
          events={popupEvents}
          onClose={handleClosePopup}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {/* Add Event Dialog */}
      <AddEventDialog
        open={addDialogOpen}
        selectedDate={selectedCellDate}
        onClose={() => setAddDialogOpen(false)}
        onSave={handleAddEvent}
      />
    </>
  );
};

export default CalendarMonth;
