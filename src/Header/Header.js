// src/components/Header.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './header.scss'; // Import your custom CSS for the header
import {IconButton,Menu,MenuItem} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";


const Header = () => {
  const {enqueueSnackbar}=useSnackbar();
  const navigate=useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogoClick=()=>{
    navigate("/");
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      navigate("/");
      enqueueSnackbar("Logged out Successfully", { variant: "warning",
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                } });

  };
  return (
    <AppBar position="static" className="header" style={{ background: '#9D76C1', width:'100%'}}>
      <Toolbar>
        <Typography variant="h6" className="title">
        
        <span className='span' onClick={()=>{handleLogoClick()}}>Quiz App!</span>
      
        </Typography>
        { localStorage.getItem("username")? (
          <div>
            <Typography variant="body1" color="inherit" sx={{ marginRight: '16px' }}>
              Welcome, {localStorage.getItem("username")}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              
              <i className="material-icons">{localStorage.getItem("username")}</i>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem >MyAccount</MenuItem>
            </Menu>
          </div>
        ) : 
        (<div className="nav-links">
          <Link to="/login" className="nav-link">
            <Button color="inherit" >Login</Button>
          </Link>
          <Link to="/register" className="nav-link">
            <Button color="inherit">Signup</Button>
          </Link>
        </div>)
}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
