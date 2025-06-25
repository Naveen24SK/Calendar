import React from "react";
import events from "../../Data/events.json";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";

const CalendarDay = ({ currentDate }) => {
  const getEventsForDay = (day) =>
    events.filter((event) => dayjs(event.date).isSame(day, "day"));

  const eventsForDay = getEventsForDay(currentDate);

  return (
    <div className="calendar-day-view">
      <h3 className="day-title">{currentDate.format("dddd, MMMM D, YYYY")}</h3>
      {Array.from({ length: 24 }).map((_, hour) => {
        const hourLabel = `${hour.toString().padStart(2, "0")}:00`;
        const hourEvents = eventsForDay.filter((event) => {
          const [startHour] = event.startTime.split(":");
          return parseInt(startHour) === hour;
        });

        return (
          <div key={hour} className="day-slot">
            <div className="hour-label">{hourLabel}</div>
            <div className="slot-events">
              {hourEvents.map((event, i) => (
                <Tooltip
                  key={i}
                  title={`${event.title}\n${event.startTime} - ${event.endTime}`}
                  arrow
                >
                  <div
                    className="calendar-event day-view-event"
                    style={{
                      backgroundColor: event.color,
                      border:
                        hourEvents.length > 1 ? "2px solid red" : "none",
                    }}
                  >
                    {event.title}
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDay;
