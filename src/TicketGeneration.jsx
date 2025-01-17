import React, { useState,useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const TicketGenerationDialog = ({ open, onClose }) => {
  const [registrationId, setRegistrationId] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [eventName, setEventName] = useState('');
  const [vip, setVip] = useState('');
  const [special, setSpecial] = useState('');
  const [general, setGeneral] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [ticketData, setTicketData] = useState(null);
  
  useEffect(() => {
    // Set the current date in YYYY-MM-DD format when the component mounts
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    setTicketDate(currentDate);
  }, []); 
  // Handle registrationId Enter key event
  const handleRegistrationIdEnter = async (event) => {
    if (event.key === 'Enter') {
      try {
        // const response = await axios.post('http://localhost:5000/get-attendee-details', { registrationId });
        const response = await axios.post('https://capstonebackend-ymwc.onrender.com/get-attendee-details', { registrationId });
        
        if (response.data.success) {
          const { name, phoneNo, event,special,vip,general } = response.data.attendee;
          setName(name);
          setPhoneNo(phoneNo);
          setEventName(event);
          handlePrice(event);
        } else {
          alert('Attendee not found');
        }
      } catch (error) {
        console.error('Error fetching attendee details:', error);
      }
    }
  
  };

  const handlePrice = async (eventName) => {
    // Log the event name to ensure it's correct
    console.log('Event Name:', eventName);
  
    if (eventName) {
      try {
        // Send a GET request with eventName in the URL
        // const response = await axios.get(`http://localhost:5000/get-event-pricedtls/${encodeURIComponent(eventName)}`);
        const response = await axios.get(`https://capstonebackend-ymwc.onrender.com/get-event-pricedtls/${encodeURIComponent(eventName)}`);
  
        if (response.data) {
          // Handle the response if the event is found
          const { special, vip, general } = response.data.event;
          setSpecial(special);
          setVip(vip);
          setGeneral(general);
          console.log(response.data.event);
        } else {
          // Handle the case when the event is not found
          alert('Event not found');
        }
      } catch (error) {
        // Handle errors in the request
        console.error('Error fetching event price details:', error);
      }
    } else {
      console.log('Event name is not provided');
    }
  };
  

  const categories = {
    vip: vip,
    special: special,
    general:general,
  };

  const handleCategoryChange = (category) => {
   
    setTicketCategory(category);
   
    setTicketPrice(categories[category] || '');
  };

  const handleGenerateTicket = async () => {
    // Validate required fields
    const missingFields = [];

  if (!registrationId) missingFields.push('Registration ID');
  if (!name) missingFields.push('Name');
  if (!phoneNo) missingFields.push('Phone Number');
  if (!eventName) missingFields.push('Event Name');
  if (!ticketCategory) missingFields.push('Ticket Category');
  if (!ticketPrice) missingFields.push('Ticket Price');
  // if (!ticketDate || isNaN(Date.parse(ticketDate))) {
  //   missingFields.push('Ticket Date');
  // }
  if (!ticketDate) missingFields.push('Ticket Date');

  // If there are missing fields, show an alert with the list
  if (missingFields.length > 0) {
    alert('Please fill in the following fields: ' + missingFields.join(', '));
    return;
  }

  const formattedTicketDate = new Date(ticketDate).toISOString();
    try {
      // const response = await axios.post('http://localhost:5000/generate-ticket', {
        const response = await axios.post('https://capstonebackend-ymwc.onrender.com/generate-ticket', {
        registrationId,
        name,
        phoneNo,
        eventName,
        ticketCategory,
        ticketPrice,
        ticketDate: formattedTicketDate,
      });
      console.log(response.data);
      alert('Ticket Generation Successful');
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error('Ticket Generation Failed:', error.response.data);
        alert('Ticket Generation Failed: ' + error.response.data.message || error.response.data.error);
      } else if (error.request) {
        // No response from server
        console.error('Network Error:', error.request);
        alert('Network error, please try again later.');
      } else {
        // Something else went wrong
        console.error('Error:', error.message);
        alert('An unexpected error occurred.');
      }
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
            type="date"
            // value={ticketDate}
 
            readOnly
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
