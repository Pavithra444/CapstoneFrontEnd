import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, Card, CardContent, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const Ticket = () => {
  const [registrationId, setRegistrationId] = useState('');
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null); // Ref for the canvas element

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
      const response = await axios.get(`https://capstonebackend-ymwc.onrender.com/tickets/${registrationId}`);
      setTicketDetails(response.data);
    } catch (err) {
      setError('Failed to fetch ticket details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate ticket image on canvas
  const generateDownloadLink = () => {
    if (ticketDetails && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set up canvas size (width and height)
      canvas.width = 400;
      canvas.height = 400;

      // Draw background and ticket details on the canvas
      ctx.fillStyle = '#FFFFFF'; // white background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
     
      ctx.font = '16px Arial';
      ctx.fillStyle = '#000000'; // black text color
      ctx.fillText(`KURINJI EVENT MANAGEMENT`, 20, 30);
      ctx.fillText(`Ticket ID: ${ticketDetails.registrationId}`, 20, 90);
      ctx.fillText(`Event Name: ${ticketDetails.eventName}`, 20, 120);
      ctx.fillText(`Ticket Category: ${ticketDetails.ticketCategory}`, 20, 150);
      ctx.fillText(`Customer Name: ${ticketDetails.name}`, 20, 180);
      ctx.fillText(`Ticket Date: ${formattedTicketDate}`, 20, 210);

      // Convert canvas to image URL (PNG format)
      const imageUrl = canvas.toDataURL('image/png');
      
      return imageUrl; // Return the image URL for download
    }
    return '';
  };

  const formattedTicketDate = ticketDetails?.ticketDate
    ? new Date(ticketDetails.ticketDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : 'No date available';

  const handleDownload = () => {
    const imageUrl = generateDownloadLink();

    // If an image URL is generated, create a downloadable link and trigger the download
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'ticket.png'; // Set the default download file name
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove the link after download
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>Download Your Ticket</Typography>
      <p>Note: Complete the ticket generation process</p>
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
        {loading ? <CircularProgress size={24} /> : 'Fetch Ticket Details'}
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
              <strong>Ticket Category:</strong> {ticketDetails.ticketCategory}
            </Typography>
            <Typography variant="body1">
              <strong>Customer Name:</strong> {ticketDetails.name}
            </Typography>
            <Typography variant="body1">
              <strong>Ticket Date:</strong> {formattedTicketDate}
            </Typography>

            <Box sx={{ marginTop: 2 }}>
              {/* Canvas for rendering the ticket image */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDownload}
              >
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


