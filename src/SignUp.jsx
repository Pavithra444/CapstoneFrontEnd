import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    
    // Prepare the data to be sent in the POST request
    const userData = {
      username,
      email,
      password,
    };

    try {
      // Send data to the server via Axios
      // const response = await axios.post('http://localhost:5000/signup', userData);
      const response = await axios.post('https://capstonebackend-ymwc.onrender.com/signup', userData);
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (error) {
      setErrorMessage('Error signing up, please try again');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Sign Up</Typography>
        {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}
        
        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          {/* Username field */}
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          {/* Email field */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          {/* Password field */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          {/* Confirm Password field */}
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          
          {/* Sign Up Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#1976d2', // Button color
              '&:hover': {
                backgroundColor: '#1565c0', // Darker blue on hover
              },
            }}
          >
            Sign Up
          </Button>
        </form>
        
        {/* Link to Login page */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <a href="/login">Log In</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;

