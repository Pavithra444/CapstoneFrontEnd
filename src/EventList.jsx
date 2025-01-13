import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Card, CardContent, Grid, TextField, Box } from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    venue: '',
    special: '',
    vip: '',
    general: '',
  });

  // Fetch events from the server when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-events');
        setEvents(response.data); // Assuming the API returns an array of events
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle input changes for filters
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value };
      filterEvents(newFilters); // Apply filter whenever an input changes
      return newFilters;
    });
  };

  // Filter events based on selected filters
  const filterEvents = (filters) => {
    const { date, venue, special, vip, general } = filters;
    const filtered = events.filter((event) => {
      const isDateMatch = date ? new Date(event.eventDate).toLocaleDateString().includes(date) : true;
      const isVenueMatch = venue ? (event.venue || '').toLowerCase().includes(venue.toLowerCase()) : true;
      const isSpecialMatch = special ? (event.special || '').toString().includes(special) : true;
      const isVipMatch = vip ? (event.vip || '').toString().includes(vip) : true;
      const isGeneralMatch = general ? (event.general || '').toString().includes(general) : true;
  
      return isDateMatch && isVenueMatch && isSpecialMatch && isVipMatch && isGeneralMatch;
    });
    setFilteredEvents(filtered);
  };
  
  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{  color: '#3f51b5',fontWeight: 'bold' }}>
        Event List
      </Typography>

      {/* Search Fields for Filtering */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField
          label="Search by Date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Search by Venue"
          name="venue"
          value={filters.venue}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Special Ticket Price"
          name="special"
          value={filters.special}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="VIP Ticket Price"
          name="vip"
          value={filters.vip}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="General Ticket Price"
          name="general"
          value={filters.general}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Event Cards */}
      <Grid container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: '#f4f6f8',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
                  {event.eventName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  <strong>Event ID:</strong> {event.eventId}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Venue:</strong> {event.venue}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Start Time:</strong> {event.startTime}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>End Time:</strong> {event.endTime}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Chief Guest:</strong> {event.chiefGuest}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Conducted By:</strong> {event.conductedBy}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Special Ticket Price:</strong> {event.special}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>VIP Ticket Price:</strong> {event.vip}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>General Ticket Price:</strong> {event.general}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  <strong>Attendees:</strong> {event.attendees}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EventList;
