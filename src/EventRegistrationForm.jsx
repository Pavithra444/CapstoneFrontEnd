import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const EventRegistrationForm = ({ open, onClose, events }) => {
  const [formData, setFormData] = useState({
    name: '',
    mailId: '',
    phoneNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    event: '',
    registrationId: '',
    registrationDate: ''
  });

  

  useEffect(() => {
    // Generate registration ID and date when the form is opened
    if (open) {
      setFormData((prevData) => ({
        ...prevData,
        registrationId: generateRegistrationId(),
        registrationDate: new Date().toLocaleDateString()
      }));
    }
  }, [open]);

  
  // Function to handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      alert('Registration Successful');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Registration Failed', error);
      alert('Registration Failed');
    }
  };

  // Function to generate a random Registration ID
  const generateRegistrationId = () => {
    return 'REG-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

   
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/get-events');
  //       const data = await response.json();
  //       setEvents(data);  // Set the events state with the fetched data
  //     } catch (error) {
  //       console.error('Failed to fetch events:', error);
  //     }
  //   };

  //   if (open) {
  //     fetchEvents();  // Fetch events when the form opens
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       registrationId: generateRegistrationId(),
  //       registrationDate: new Date().toLocaleDateString()
  //     }));
  //   }
  // }, [open]);

  const uniqueEvents = Array.from(
    new Set(events.map((event) => event.eventName))
  ).map((eventName) => {
    return events.find((event) => event.eventName === eventName);
  });

  return (
   
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Attendee Registration</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
 
          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            name="mailId"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            variant="outlined"
            name="phoneNo"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Address Line 1 */}
          <TextField
            label="Address Line 1"
            fullWidth
            margin="normal"
            variant="outlined"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
          />

          {/* Address Line 2 */}
          <TextField
            label="Address Line 2"
            fullWidth
            margin="normal"
            variant="outlined"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />

          {/* City */}
          <TextField
            label="City"
            fullWidth
            margin="normal"
            variant="outlined"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          {/* Pincode */}
          <TextField
            label="Pincode"
            fullWidth
            margin="normal"
            variant="outlined"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />

          {/* State */}
          <TextField
            label="State"
            fullWidth
            margin="normal"
            variant="outlined"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          {/* Country */}
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            variant="outlined"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          {/* Event Selection */}
          <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel>Event</InputLabel>
            <Select
              label="Select Event"
              name="event"
              value={formData.event}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select an event</em>
              </MenuItem>
              {/* {uniqueEvents.map((event) => (
                <MenuItem key={event.id} value={event.eventName}>
                  {event.eventName}
                </MenuItem>
              ))} */}

{uniqueEvents.map((event) => (
                <MenuItem key={event.eventId} value={event.eventName}>
                  {event.eventName}
                </MenuItem>
              ))}

              
            </Select>
          </FormControl>

          {/* Registration ID */}
          <TextField
            label="Registration ID"
            fullWidth
            margin="normal"
            variant="outlined"
            name="registrationId"
            value={formData.registrationId}
            readOnly
          />

          {/* Registration Date */}
          <TextField
            label="Registration Date"
            fullWidth
            margin="normal"
            variant="outlined"
            name="registrationDate"
            value={formData.registrationDate}
            readOnly
          />

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationForm;
