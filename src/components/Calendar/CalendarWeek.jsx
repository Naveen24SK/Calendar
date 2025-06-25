import React from "react";
import dayjs from "dayjs";
import events from "../../Data/events.json";
import { Tooltip } from "@mui/material";

const CalendarWeek = ({ currentDate }) => {
  const startOfWeek = currentDate.startOf("week");
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  const getEventsForDay = (day) =>
    events.filter((event) => dayjs(event.date).isSame(day, "day"));

  return (
    <div className="calendar-week-view">
      <div className="week-header">
        {weekDays.map((day) => (
          <div key={day} className="week-day-header">
            {day.format("ddd, MMM D")}
          </div>
        ))}
      </div>
      <div className="week-body">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div key={hour} className="week-hour-row">
            <div className="hour-label">{`${hour
              .toString()
              .padStart(2, "0")}:00`}</div>
            <div className="week-day-cells">
              {weekDays.map((day, dIdx) => {
                const slotEvents = getEventsForDay(day).filter((event) => {
                  const [startHour] = event.startTime.split(":");
                  return parseInt(startHour) === hour;
                });

                return (
                  <div key={dIdx} className="week-day-cell">
                    {slotEvents.map((event, i) => (
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
                              slotEvents.length > 1
                                ? "2px solid red"
                                : "none",
                          }}
                        >
                          {event.title}
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWeek;
