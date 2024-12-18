// src/ContactPage.js
import React from 'react';
import { Button } from '@mui/material';

const CreateEvent = () => {
  return (
    <div>
     <Button variant="contained" color="primary" onClick={() => alert('Button clicked!')}>Create New Event</Button>
    </div>
  );
};

export default CreateEvent;
