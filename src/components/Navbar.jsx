import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo and Brand */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkIcon 
              sx={{ 
                fontSize: '2rem',
                color: darkMode ? '#fff' : theme.palette.primary.main 
              }} 
            />
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                fontWeight: 600,
                letterSpacing: '0.5px',
                color: darkMode ? '#fff' : '#2c3e50',
                fontSize: '1.2rem'
              }}
            >
              Job Portal Admin
            </Typography>
          </Box>
        </Link>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/create-assessment" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<AssessmentIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                px: 2,
                backgroundColor: darkMode ? '#2c3e50' : theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: darkMode ? '#34495e' : theme.palette.primary.dark,
                }
              }}
            >
              Create Assessment
            </Button>
          </Link>
          
          <IconButton 
            onClick={() => setDarkMode(!darkMode)}
            sx={{ 
              ml: 1,
              color: darkMode ? '#fff' : '#2c3e50',
              border: `1px solid ${darkMode ? '#ffffff30' : '#2c3e5030'}`,
              '&:hover': {
                backgroundColor: darkMode ? '#ffffff15' : '#2c3e5015',
              }
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
