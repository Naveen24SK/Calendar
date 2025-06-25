import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { SketchPicker } from "react-color";

const presetColors = ["#f44336", "#4caf50", "#2196f3", "#ff9800", "#9c27b0"];

const AddEvent = ({ open, onClose, onSave, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    date: "",
    color: presetColors[0],
  });

  const [customColor, setCustomColor] = useState(false);

  // Update date only when selectedDate is available
  useEffect(() => {
    if (selectedDate) {
      setEventData((prev) => ({
        ...prev,
        date: selectedDate.format("YYYY-MM-DD"),
      }));
    }
  }, [selectedDate]);

  const handleChange = (field) => (e) => {
    setEventData({ ...eventData, [field]: e.target.value });
  };

  const handleColorSelect = (color) => {
    setEventData({ ...eventData, color });
    setCustomColor(false);
  };

  const handleSave = () => {
    if (eventData.title && eventData.startTime && eventData.endTime && eventData.date) {
      onSave(eventData);
      setEventData({
        title: "",
        startTime: "",
        endTime: "",
        date: selectedDate?.format("YYYY-MM-DD") || "",
        color: presetColors[0],
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Title"
              value={eventData.title}
              onChange={handleChange("title")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              value={eventData.startTime}
              onChange={handleChange("startTime")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Time"
              type="time"
              value={eventData.endTime}
              onChange={handleChange("endTime")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <label>Choose Color</label>
            <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
              {presetColors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    border: color === eventData.color ? "2px solid black" : "1px solid gray",
                  }}
                />
              ))}
              <IconButton size="small" onClick={() => setCustomColor(!customColor)}>
                <ColorLensIcon />
              </IconButton>
            </div>
            {customColor && (
              <SketchPicker
                color={eventData.color}
                onChangeComplete={(color) => handleColorSelect(color.hex)}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEvent;
