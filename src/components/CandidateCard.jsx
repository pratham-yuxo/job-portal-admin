import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';

const getStatusColor = (status) => {
  const statusColors = {
    'Under Review': {
      bg: '#fff8dd',
      color: '#ffc107',
      darkBg: '#2c2000',
    },
    'Interview Scheduled': {
      bg: '#e0f2f1',
      color: '#009688',
      darkBg: '#002b27',
    },
    'Shortlisted': {
      bg: '#e8f5e9',
      color: '#4caf50',
      darkBg: '#002904',
    },
    'Rejected': {
      bg: '#ffebee',
      color: '#f44336',
      darkBg: '#310000',
    }
  };
  return statusColors[status] || { bg: '#f5f5f5', color: '#9e9e9e', darkBg: '#262626' };
};

const CandidateCard = ({ candidate, darkMode }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{ 
        py: 2,
        px: 3,
        backgroundColor: darkMode ? '#1e293b' : '#fff',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
     
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography 
            sx={{ 
              fontWeight: 600,
              color: darkMode ? '#f1f5f9' : '#2c3e50',
              minWidth: '150px'
            }}
          >
            {candidate.name}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: darkMode ? '#94a3b8' : '#64748b',
          }}>
            <CalendarTodayIcon sx={{ fontSize: '0.9rem' }} />
            <Typography variant="body2">
              {formatDate(candidate.applicationDate)}
            </Typography>
          </Box>
          
          <Chip
            label={candidate.status}
            size="small"
            sx={{
              backgroundColor: darkMode ? 
                getStatusColor(candidate.status).darkBg : 
                getStatusColor(candidate.status).bg,
              color: getStatusColor(candidate.status).color,
              fontWeight: 500,
              height: '24px'
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DescriptionIcon />}
            onClick={() => window.open(candidate.resumeUrl, '_blank')}
            sx={{
              textTransform: 'none',
              color: darkMode ? '#3b82f6' : 'primary.main',
              borderColor: darkMode ? '#3b82f6' : 'primary.main',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : undefined,
                borderColor: darkMode ? '#3b82f6' : 'primary.main',
              }
            }}
          >
            Resume
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<InfoIcon />}
            onClick={() => navigate(`/candidates/${candidate.id}`)}
            sx={{
              textTransform: 'none',
              backgroundColor: darkMode ? '#3b82f6' : 'primary.main',
              '&:hover': {
                backgroundColor: darkMode ? '#2563eb' : 'primary.dark',
              }
            }}
          >
            Details
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CandidateCard;
