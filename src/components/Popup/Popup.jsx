import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ date, events, onClose, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedEvent({ ...events[index] });
  };

  const saveEdit = () => {
    onEdit(editIndex, editedEvent);
    setEditIndex(null);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Events on {date.format("MMMM D, YYYY")}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {events.map((event, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1} flex={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: event.color,
                  flexShrink: 0,
                }}
              />
              {editIndex === idx ? (
                <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                  <TextField
                    size="small"
                    label="Title"
                    value={editedEvent.title}
                    onChange={(e) =>
                      setEditedEvent({ ...editedEvent, title: e.target.value })
                    }
                  />
                  <TextField
                    size="small"
                    label="Start"
                    type="time"
                    value={editedEvent.startTime}
                    onChange={(e) =>
                      setEditedEvent({ ...editedEvent, startTime: e.target.value })
                    }
                  />
                  <TextField
                    size="small"
                    label="End"
                    type="time"
                    value={editedEvent.endTime}
                    onChange={(e) =>
                      setEditedEvent({ ...editedEvent, endTime: e.target.value })
                    }
                  />
                  <IconButton onClick={saveEdit} color="success">
                    <CheckIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Box flex={1}>
                  <Typography fontWeight="bold">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.startTime} - {event.endTime}
                  </Typography>
                </Box>
              )}
            </Box>

            {editIndex !== idx && (
              <Box>
                <IconButton onClick={() => startEdit(idx)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(idx)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
