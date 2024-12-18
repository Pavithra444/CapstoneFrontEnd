import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const MenuBar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left-aligned buttons */}
          <Box sx={{ display: 'flex' }}>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/home"
              sx={{ marginRight: 2 }}
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/about"
              sx={{ marginRight: 2 }}
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              About
            </Button>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/registration"
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              Registration
            </Button>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/services"
              sx={{ marginRight: 2 }}
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              Ticket
            </Button>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/contact"
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              Contact
            </Button>
          </Box>

          {/* Right-aligned buttons */}
          <Box sx={{ display: 'flex' }}>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/login"
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              LogIn
            </Button>
            <Button
              color="inherit"
              component={NavLink} // Use NavLink to handle activeStyle
              to="/signup"
              style={({ isActive }) => isActive ? { color: '#f00' } : {}}
            >
              SignUp
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
