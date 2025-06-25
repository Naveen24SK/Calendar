import React, { useState } from "react";
import {
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import dayjs from "dayjs";
import CalendarMonth from "./CalendarMonth";
import CalendarYear from "./CalendarYear";
import CalendarDay from "./CalendarDay";
import CalendarWeek from "./CalendarWeek";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("month");
  const today = dayjs();

  const goPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const goNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <Typography variant="h5">{currentDate.format("MMMM YYYY")}</Typography>
        <div className="calendar-controls">
          <Select
            size="small"
            value={view}
            onChange={(e) => setView(e.target.value)}
            style={{ backgroundColor: "white", borderRadius: 4 }}
          >
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="day">Day</MenuItem>
          </Select>
          <IconButton onClick={goPrevMonth}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <IconButton onClick={goNextMonth}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </div>
      </div>

      {view === "month" && <CalendarMonth currentDate={currentDate} today={today} />}
      {view === "year" && <CalendarYear currentDate={currentDate} today={today} />}
      {view === "day" && <CalendarDay currentDate={currentDate} />}
      {view === "week" && <CalendarWeek currentDate={currentDate} />}
    </div>
  );
};

export default Calendar;
