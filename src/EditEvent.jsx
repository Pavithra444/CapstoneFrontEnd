import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EditEvent = () => {
  const [eventId, setEventId] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    venue: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    chiefGuest: '',
    conductedBy: '',
    special: '',
    vip: '',
    general: '',
    attendees: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [openDialog, setOpenDialog] = useState(false);

  // Function to open the confirmation dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Fetch event details by eventId
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/get-event/${eventId}`);
      setEventDetails(response.data);
      setFormData({
        eventName: response.data.eventName,
        venue: response.data.venue,
        eventDate: new Date(response.data.eventDate).toLocaleDateString(),
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        chiefGuest: response.data.chiefGuest,
        conductedBy: response.data.conductedBy,
        special: response.data.special,
        vip: response.data.vip,
        general: response.data.general,
        attendees: response.data.attendees,
      });
      setError('');
    } catch (err) {
      setError('Event not found');
    } finally {
      setLoading(false);
    }
  };
  
  // Update event details
  const handleUpdate = async () => {
    try {
      const updatedEvent = {
        eventName: formData.eventName,
        venue: formData.venue,
        eventDate: formData.eventDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        chiefGuest: formData.chiefGuest,
        conductedBy: formData.conductedBy,
        special: formData.special,
        vip: formData.vip,
        general: formData.general,
        attendees: formData.attendees,
      };
      await axios.put(`http://localhost:5000/update-event/${eventId}`, updatedEvent);
      alert('Event updated successfully');
    } catch (err) {
      alert('Error updating event');
    }
  };

  // Delete event
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete-event/${eventId}`);
      alert('Event deleted successfully');
      handleCloseDialog(); 
      setEventDetails(null); // Clear event details after deletion
      setFormData({
        eventName: '',
        venue: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        chiefGuest: '',
        conductedBy: '',
        special: '',
        vip: '',
        general: '',
        attendees: '',
      });
      setEventId('');
    } catch (err) {
      alert('Error deleting event');
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Event
      </Typography>
      <TextField
        label="Enter Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        style={{ width: '50%',display:"block" }} 
      />
      <Button variant="contained" color="primary" onClick={fetchEvent}style={{ marginLeft: '16px' }} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Event'}
      </Button>

      {error && <Typography color="error" mt={2}>{error}</Typography>}

      {eventDetails && (
        <Box mt={3}>
          <TextField
            label="Event Name"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%' ,display:"block"}} 
          />
          <TextField
            label="Venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="Event Date"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: '50%' ,display:"block"}} 
          />
        
          <TextField
            label="Start Time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="End Time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="Chief Guest"
            name="chiefGuest"
            value={formData.chiefGuest}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="Conducted By"
            name="conductedBy"
            value={formData.conductedBy}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="Special Tickets"
            name="special"
            value={formData.special}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="VIP Tickets"
            name="vip"
            value={formData.vip}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />
          <TextField
            label="General Tickets"
            name="general"
            value={formData.general}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%' ,display:"block"}} 
          />
          <TextField
            label="Attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            style={{ width: '50%',display:"block" }} 
          />

          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleUpdate}style={{ marginLeft: '16px' }}>
              Update Event
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              style={{ marginLeft: '16px' }}
            >
              Delete Event
            </Button> */}
            {/* <div> */}
      {/* Delete Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenDialog}
        style={{ marginLeft: '16px' }}
      >
        Delete Event
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this event? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    {/* </div> */}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default EditEvent;
