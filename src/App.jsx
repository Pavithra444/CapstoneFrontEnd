import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import MenuBar from './MenuBar';
import { Button,AppBar, Toolbar,Container, Typography, Box } from '@mui/material';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import CreateEvent from './CreateEvent';
import EventForm from './EventForm';
import EventList from './EventList';
import UserList from './UserList';
import EventRegistrationForm from './EventRegistrationForm';
import TicketGeneration from './TicketGeneration';
import Ticket from './Ticket';
import axios from 'axios';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to load message');
      });
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-events'); // Fetch from the backend
        const data = await response.json();
        setEvents(data); // Store the events in state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the function to fetch events
  }, []);

 
  return (
<>

    <Router>
   
    <div>
      <MenuBar /> {/* Menubar at the top */}

      {/* Company Details Section (Cover Image + Company Name) */}
      <Box
        sx={{
          marginTop: '0',  // Ensure it doesn't overlap with the fixed AppBar
          height: '50vh',      // Set height to 50% of the viewport height (half screen)
          backgroundColor: '#f4f4f4', 
          position: 'relative', 
          width:'100vw'
          
        }}
      >
        {/* Cover Image */}
        <Box
          component="img"
          src="https://media.istockphoto.com/id/2014634732/photo/2024-event-planner-timetable-agenda-plan-on-schedule-event-business-woman-checking-planner.webp?a=1&b=1&s=612x612&w=0&k=20&c=H9FIWrRI6nS3LXp95iRmwhKk5hYz6ena4aqwM6fkEhE=" // Replace with your cover image URL
          alt="Company Cover"
          sx={{
            width: '100%',        // Full width of the container
            height: '100%',       // Full height of the container (50% of the viewport height)
            objectFit: 'fill',   // Ensures the image covers the area without distortion
            position: 'absolute',
            opacity:'80%',
            top: 0,
            left: 0,
          }}
        />

        {/* Company Name and Description */}
        <Box
          sx={{
            position: 'absolute', 
            top: '50%',            // Center vertically within the 50vh container
            left: '50%',           // Center horizontally
            transform: 'translate(-50%, -50%)', // Exactly center the text
            textAlign: 'center',   // Center text
            color: '#000000',        // Make text white for contrast against the image
            zIndex: 1,             // Ensure text appears on top of the image
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Kurinji Event Management
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Service that beyonds your expectations.
          </Typography>
        </Box>
      </Box>

        {/* Routes for other pages */}
        <div className="content" style={{ marginTop: '64px' }}>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        
          {/* <Route path="/" element={<div>Welcome to Event Manager</div>} /> */}
            <Route path="/home"  element={ 
               <div className='btn-container'>
                  <Button variant="contained" color="primary"  style={{ margin: '10px' }} onClick={handleOpen}>
                  Create New Event
                  </Button>

                  <EventForm open={open} onClose={handleClose} />
                  
                  <Button variant="contained" color="primary"  style={{ margin: '10px' }} component={Link} to="/event-list">Event List</Button>

               </div>} /> 
            <Route path="/event-list" element={<EventList />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/about" element={<AboutPage />} /> 
            <Route path="/services" element={<div className='btn-container'>
                 
                  <Button variant="contained" color="primary"  style={{ margin: '10px' }} onClick={handleOpen}>
                    Ticket Generation
                  </Button>
                  <TicketGeneration open={open} onClose={handleClose} />
                  <Ticket open={open} onClose={handleClose} />
               </div>} /> 
            <Route path="/contact" element={<ContactPage />} /> 
            <Route path="/registration" element={ 
               <div className='btn-container'>
                  <Button variant="contained" color="primary"  style={{ margin: '10px' }} onClick={handleOpen}>
                    Attendee Registration
                  </Button>
                  <EventRegistrationForm open={open} onClose={handleClose} events={events} />

                  <Button variant="contained" color="primary"  style={{ margin: '10px' }} component={Link} to="/user-list">Attendees List</Button>


                 

               </div>} /> 
              
          </Routes>
        </div>
      </div>
     
    </Router>
    </>
  );

}


export default App;
