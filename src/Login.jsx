import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:5000/login', { email, password });
      const response = await axios.post('https://capstonebackend-ymwc.onrender.com/login', { email, password });
      navigate('/home');
    } catch (error) {
      setErrorMessage('Invalid credentials, please try again');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
        {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#1976d2', // Make button color stand out
              '&:hover': {
                backgroundColor: '#1565c0', // Darker blue on hover
              },
            }}
          >
            Log In
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
