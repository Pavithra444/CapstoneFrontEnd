import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';

const Ticket = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle fetching ticket details from the API
  const fetchTicketDetails = async () => {
    if (!registrationId) {
      setError('Please enter a valid registration ID.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Make an API call to fetch ticket details based on registrationId
      const response = await axios.get(`http://localhost:5000/tickets/${registrationId}`);
      setTicketDetails(response.data); // Set ticket data to the state
    } catch (err) {
      setError('Failed to fetch ticket details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate a downloadable ticket
  const generateDownloadLink = () => {
    const ticketContent = JSON.stringify(ticketDetails, null, 2); // Convert the ticket data into a string
    const blob = new Blob([ticketContent], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    return downloadUrl;
  };

  

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Download Your Ticket
        
      </Typography>
      <p>After completing the ticket generation Process only you can download your ticket.</p>
      <TextField
        label="Registration ID" 
        variant="outlined"
        fullWidth
        value={registrationId}
        onChange={(e) => setRegistrationId(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={fetchTicketDetails}
        disabled={loading}
        fullWidth
      >
        {loading ? 'Loading...' : 'Fetch Ticket Details'}
      </Button>

      {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

      


      {ticketDetails && (
        <Card sx={{ marginTop: 3 }}>
          <CardContent>
            <Typography variant="h6">Ticket Details</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <strong>Ticket ID:</strong> {ticketDetails.registrationId}
            </Typography>
            <Typography variant="body1">
              <strong>Event Name:</strong> {ticketDetails.eventName}
            </Typography>
           
            <Typography variant="body1">
              <strong>TicketCategory:</strong> {ticketDetails.ticketCategory}
            </Typography>
            <Typography variant="body1">
              <strong>Customer Name:</strong> {ticketDetails.name}
            </Typography>
            {/* <Typography variant="body1">
              <strong>Email:</strong> {ticketDetails.customerEmail}
            </Typography> */}
            
            <Box sx={{ marginTop: 2 }}>
              <Button variant="contained" color="secondary" href={generateDownloadLink()} download="ticket.txt">
                Download Ticket
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Ticket;
