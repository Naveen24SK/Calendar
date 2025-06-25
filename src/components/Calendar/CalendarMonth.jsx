import React from "react";
import dayjs from "dayjs";
import events from "../../Data/events.json";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarMonth = ({ currentDate, today }) => {
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

  return (
    <div className="calendar-grid">
      {weekdays.map((day) => (
        <div key={day} className="calendar-day-label">{day}</div>
      ))}

      {days.map(({ date, isCurrentMonth }, idx) => {
        const isToday = date.isSame(today, "day");

        return (
          <div
            key={idx}
            className={`calendar-cell ${isToday ? "calendar-today" : ""} ${
              isCurrentMonth ? "" : "calendar-faded"
            }`}
          >
            <div className="calendar-date">{date.date()}</div>
            <div className="calendar-events">
              {getEventsForDay(date).map((event, i) => (
                <div
                  key={i}
                  className="calendar-event"
                  style={{ backgroundColor: event.color }}
                  title={`${event.title}\n${event.startTime} - ${event.endTime}`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarMonth;
