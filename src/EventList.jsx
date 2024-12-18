// src/EventList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, Card, CardContent, Grid } from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the server when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-events');
        setEvents(response.data); // Assuming the API returns an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{event.eventName}</Typography>
                <Typography variant="body2">Venue: {event.venue}</Typography>
                <Typography variant="body2">Date: {new Date(event.eventDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">Start Time: {event.startTime}</Typography>
                <Typography variant="body2">End Time: {event.endTime}</Typography>
                <Typography variant="body2">Chief Guest: {event.chiefGuest}</Typography>
                <Typography variant="body2">Conducted By: {event.conductedBy}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EventList;
