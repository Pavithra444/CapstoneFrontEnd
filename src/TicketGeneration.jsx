import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const TicketGenerationDialog = ({ open, onClose }) => {
  const [registrationId, setRegistrationId] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [eventName, setEventName] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [ticketData, setTicketData] = useState(null);
  

   const categories = {
    vip: 200,
    special: 150,
    general: 100,
  };

  const handleCategoryChange = (category) => {
    setTicketCategory(category);
    setTicketPrice(categories[category] || '');
  };


  // Handle registrationId Enter key event
  const handleRegistrationIdEnter = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.post('http://localhost:5000/get-attendee-details', { registrationId });
        if (response.data.success) {
          const { name, phoneNo, event } = response.data.attendee;
          setName(name);
          setPhoneNo(phoneNo);
          setEventName(event);
        } else {
          alert('Attendee not found');
        }
      } catch (error) {
        console.error('Error fetching attendee details:', error);
      }
    }
  };

  const handleGenerateTicket = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-ticket', {
              registrationId,
              name,
              phoneNo,
              eventName,
              ticketCategory,
              ticketPrice,
              ticketDate,
            });
      console.log(response.data);
      alert('Ticket Generation Successful');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Ticket Generation Failed', error);
      alert('Ticket Generation Failed');
    }
  };


  const handleCancel = () => {
    setRegistrationId('');
    setName('');
    setPhoneNo('');
    setEventName('');
    setTicketCategory('');
    setTicketPrice('');
    setTicketDate('');
    setTicketData(null);
    onClose();  // Close the dialog when canceling
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ticket Generation</DialogTitle>
      <DialogContent>
        <form noValidate>
           <TextField
            label="Registration ID"
            fullWidth
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
            onKeyDown={handleRegistrationIdEnter} // Listen for Enter key press
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Date"
            fullWidth
            value={new Date()}
            disabled
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Phone No"
            fullWidth
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            style={{ marginBottom: 16 }}
          />

<TextField
            label="Event Name"
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={{ marginBottom: 16 }}
          />

          <FormControl fullWidth style={{ marginBottom: 16 }}>
            <InputLabel>Ticket Category</InputLabel>
            <Select
              value={ticketCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              label="Ticket Category"
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="vip">VIP</MenuItem>
              <MenuItem value="special">Special</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Ticket Price"
            value={ticketPrice ? `$${ticketPrice}` : 'Select Category'}
            fullWidth
            disabled
            style={{ marginBottom: 16 }}
          />
        </form>

        {ticketData && (
          <div style={{ marginTop: 16 }}>
            <h3>Ticket Generated!</h3>
            <p>Ticket ID: {ticketData.ticketId}</p>
            <p>Event: {ticketData.eventName}</p>
            <p>Category: {ticketData.ticketCategory}</p>
            <p>Price: ${ticketData.ticketPrice}</p>
            <a href={ticketData.downloadLink} download>
              Download Ticket
            </a>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleGenerateTicket} color="primary">
          Generate Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketGenerationDialog;
