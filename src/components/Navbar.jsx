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
        backgroundColor: darkMode ? '#1e293b' : '#fff',
        borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
        transition: 'all 0.3s ease'
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
              color: darkMode ? '#94a3b8' : '#64748b',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)'
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
