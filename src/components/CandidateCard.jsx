import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  IconButton
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';

const CandidateCard = ({ candidate, darkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        p: isMobile ? 2 : 3,
        backgroundColor: darkMode ? '#1e293b' : '#fff',
        borderRadius: 2,
        mb: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: darkMode ? '#2c3e50' : '#f8fafc'
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 2 : 0
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 1,
          width: isMobile ? '100%' : 'auto'
        }}>
          <Typography 
            variant={isMobile ? "body1" : "h6"}
            sx={{ 
              fontWeight: 600,
              color: darkMode ? '#f1f5f9' : '#2c3e50'
            }}
          >
            {candidate.name}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              color: darkMode ? '#94a3b8' : '#64748b'
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
                height: '24px',
                backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                color: darkMode ? '#f1f5f9' : '#475569'
              }}
            />
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'flex-start' : 'flex-end'
        }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={!isMobile && <DescriptionIcon />}
            onClick={() => window.open(candidate.resumeUrl, '_blank')}
            sx={{
              textTransform: 'none',
              color: darkMode ? '#3b82f6' : 'primary.main',
              borderColor: darkMode ? '#3b82f6' : 'primary.main',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : undefined,
                borderColor: darkMode ? '#3b82f6' : 'primary.main',
              },
              minWidth: isMobile ? '40%' : 'auto'
            }}
          >
            {isMobile ? 'Resume' : 'View Resume'}
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={!isMobile && <InfoIcon />}
            onClick={() => navigate(`/candidates/${candidate.id}`)}
            sx={{
              textTransform: 'none',
              backgroundColor: darkMode ? '#3b82f6' : 'primary.main',
              '&:hover': {
                backgroundColor: darkMode ? '#2563eb' : 'primary.dark',
              },
              minWidth: isMobile ? '40%' : 'auto'
            }}
          >
            {isMobile ? 'Details' : 'View Details'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CandidateCard;
