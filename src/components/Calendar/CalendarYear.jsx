import React from "react";
import dayjs from "dayjs";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarYear = ({ currentDate, today }) => {
  return (
    <div className="calendar-year-grid">
      {Array.from({ length: 12 }).map((_, i) => {
        const monthStart = dayjs().month(i).year(currentDate.year());
        const daysInMonth = monthStart.daysInMonth();
        const startDay = monthStart.startOf("month").day();

        const cells = [];

        for (let x = 0; x < startDay; x++) {
          cells.push(<div key={`empty-${x}`} className="year-day empty" />);
        }

        for (let d = 1; d <= daysInMonth; d++) {
          const thisDate = dayjs(new Date(currentDate.year(), i, d));
          const isToday = thisDate.isSame(today, "day");

          cells.push(
            <div key={d} className={`year-day ${isToday ? "highlight" : ""}`}>
              {d}
            </div>
          );
        }

        return (
          <div key={i} className="year-month-box">
            <h4 className="month-title">{monthStart.format("MMMM")}</h4>
            <div className="weekdays-row">
              {weekdays.map((d) => (
                <span key={d} className="weekday">{d[0]}</span>
              ))}
            </div>
            <div className="month-grid">{cells}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarYear;
