import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EventForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    eventId: generateEventId(), // Auto-generated Event ID
    eventName: '',
    venue: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    chiefGuest: '',
    conductedBy: '',
    eventDesc: '',
    referenceImage: '', // To store the reference image file
    special: 0,
    vip: 0,
    general: 0,
    attendees: 0, // Number of attendees
  });

  const [errors, setErrors] = useState({});


  // Generate a unique event ID (combining timestamp and random number)
  function generateEventId() {
    return 'event-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Save the uploaded file
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the file object
      }));
    } else {
      // Handle text inputs
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submit using FormData
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    
    // Append all fields to FormData (including files)
    for (const key in formData) {
      if (key === 'referenceImage' && formData[key]) {
        formDataToSend.append(key, formData[key]); // Append the file
      } else {
        formDataToSend.append(key, formData[key]); // Append other fields
      }
    }

    try {
      // const response = await axios.post('http://localhost:5000/create-event', formDataToSend, {
        const response = await axios.post('https://capstonebackend-ymwc.onrender.com/create-event', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type for file uploads
        },
      });

      // Reset errors if the submission is successful
      setErrors({});
      alert(response.data);
      console.log(response.data);
      alert('Event created successfully');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      // console.error('Error creating event:', error);
      // alert('Error creating event');
      if (error.response && error.response.data) {
        // Check if there are missing fields
        if (error.response.data.missingFields) {
          const missingFields = error.response.data.missingFields;
          const errorMessages = {};
          missingFields.forEach((field) => {
            errorMessages[field] = `This field is required`;
          });
          setErrors(errorMessages);
        }
      }
    
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event ID (Auto-generated)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="eventId"
          value={formData.eventId}
          readOnly
        />
        {errors.eventId && <span>{errors.eventId}</span>}
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
        />
         {errors.eventName && <span>{errors.eventName}</span>}
        <TextField
          label="Venue"
          variant="outlined"
          fullWidth
          margin="normal"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
        />
         {errors.venue && <span>{errors.venue}</span>}
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
         {errors.eventDate && <span>{errors.eventDate}</span>}
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
         {errors.startTime && <span>{errors.startTime}</span>}
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
        {errors.endTime && <span>{errors.endTime}</span>}
        <TextField
          label="Chief Guest"
          variant="outlined"
          fullWidth
          margin="normal"
          name="chiefGuest"
          value={formData.chiefGuest}
          onChange={handleChange}
        />
         {errors.chiefGuest && <span>{errors.chiefGuest}</span>}
        <TextField
          label="Conducted By"
          variant="outlined"
          fullWidth
          margin="normal"
          name="conductedBy"
          value={formData.conductedBy}
          onChange={handleChange}
        />
         {errors.conductedBy && <span>{errors.conductedBy}</span>}
        <TextField
          label="Event Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="eventDesc"
          value={formData.eventDesc}
          onChange={handleChange}
        />
          {errors.eventDesc && <span>{errors.eventDesc}</span>}
        <div>
          <label>Reference Image</label>
          <input
            type="file"
            name="referenceImage"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.referenceImage && <span>{errors.referenceImage}</span>}
        </div>

        <div>
          <h3>Ticket Pricing</h3>
          <TextField
            label="Special Ticket Price"
            variant="outlined"
            fullWidth
            margin="normal"
            name="special"
            type="number"
            value={formData.special}
            onChange={handleChange}
          />
           {errors.special && <span>{errors.special}</span>}
          <TextField
            label="VIP Ticket Price"
            variant="outlined"
            fullWidth
            margin="normal"
            name="vip"
            type="number"
            value={formData.vip}
            onChange={handleChange}
          />
          {errors.vip && <span>{errors.vip}</span>}
          <TextField
            label="General Ticket Price"
            variant="outlined"
            fullWidth
            margin="normal"
            name="general"
            type="number"
            value={formData.general}
            onChange={handleChange}
          />
          
          {errors.general && <span>{errors.general}</span>}

        </div>

        {/* Number of Attendees */}
        <TextField
          label="No. of Attendees"
          variant="outlined"
          fullWidth
          margin="normal"
          name="attendees"
          type="number"
          value={formData.attendees}
          onChange={handleChange}
        />
         {errors.attendees && <span>{errors.attendees}</span>}
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