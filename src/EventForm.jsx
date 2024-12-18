import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EventForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    chiefGuest: '',
    conductedBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-event', formData);
      console.log(response.data);
      alert('Event created successfully');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
        />
        <TextField
          label="Venue"
          variant="outlined"
          fullWidth
          margin="normal"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
        />
        <TextField
          label="Event Date"
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Start Time"
          variant="outlined"
          fullWidth
          margin="normal"
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
        <TextField
          label="End Time"
          variant="outlined"
          fullWidth
          margin="normal"
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
        <TextField
          label="Chief Guest"
          variant="outlined"
          fullWidth
          margin="normal"
          name="chiefGuest"
          value={formData.chiefGuest}
          onChange={handleChange}
        />
        <TextField
          label="Conducted By"
          variant="outlined"
          fullWidth
          margin="normal"
          name="conductedBy"
          value={formData.conductedBy}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;