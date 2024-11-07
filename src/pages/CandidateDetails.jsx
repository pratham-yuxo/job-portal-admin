import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import DescriptionIcon from '@mui/icons-material/Description';
import UpdateIcon from '@mui/icons-material/Update';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';

const CandidateDetails = () => {
  const { candidateId } = useParams();
  const { candidates, setCandidates, darkMode } = useContext(AppContext);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const candidate = candidates.find((c) => c.id === parseInt(candidateId));

  React.useEffect(() => {
    if (candidate) {
      setSelectedStatus(candidate.status);
    }
  }, [candidate]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    try {
      const updatedCandidates = candidates.map(c => 
        c.id === parseInt(candidateId) 
          ? { ...c, status: selectedStatus }
          : c
      );

      setCandidates(updatedCandidates);
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));

      setNotification({
        open: true,
        message: 'Status updated successfully',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to update status',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (!candidate) {
    return (
      <>
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: darkMode ? '#0f172a' : '#f5f5f5',
            transition: 'background-color 0.3s ease',
            zIndex: -1
          }} 
        />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              textAlign: 'center',
              backgroundColor: darkMode ? '#1e293b' : '#fff',
              borderRadius: 2
            }}
          >
            <Typography variant="h5" sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}>
              Candidate not found.
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <div 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: darkMode ? '#0f172a' : '#f5f5f5',
          transition: 'background-color 0.3s ease',
          zIndex: -1
        }} 
      />
      <div style={{ 
        minHeight: '100vh',
        paddingTop: '24px',
        paddingBottom: '24px',
      }}>
        <Container maxWidth="md">
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              backgroundColor: darkMode ? '#1e293b' : '#fff',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <PersonIcon sx={{ 
                fontSize: '2.5rem',
                color: darkMode ? '#3b82f6' : 'primary.main'
              }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600,
                  color: darkMode ? '#f1f5f9' : '#2c3e50'
                }}
              >
                {candidate.name}
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <EmailIcon sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Typography sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    {candidate.email || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PhoneIcon sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Typography sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    {candidate.contact || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <WorkHistoryIcon sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Typography sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                    {candidate.experience || 'N/A'} years of experience
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <CodeIcon sx={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                  <Box>
                    <Typography 
                      sx={{ 
                        color: darkMode ? '#94a3b8' : '#64748b',
                        mb: 1
                      }}
                    >
                      Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {candidate.skills?.map((skill, index) => (
                        <Chip 
                          key={index}
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: darkMode ? '#334155' : '#e2e8f0',
                            color: darkMode ? '#f1f5f9' : '#475569'
                          }}
                        />
                      )) || 'N/A'}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              startIcon={<DescriptionIcon />}
              href={candidate.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mb: 4,
                color: darkMode ? '#3b82f6' : 'primary.main',
                borderColor: darkMode ? '#3b82f6' : 'primary.main',
                '&:hover': {
                  borderColor: darkMode ? '#3b82f6' : 'primary.main',
                  backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : undefined,
                }
              }}
            >
              Download Resume
            </Button>

            <Divider sx={{ mb: 4 }} />

            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  color: darkMode ? '#f1f5f9' : '#2c3e50'
                }}
              >
                Update Status
              </Typography>
              <FormControl 
                fullWidth 
                sx={{ mb: 2 }}
                variant="outlined"
              >
                <InputLabel sx={{ color: darkMode ? '#94a3b8' : undefined }}>
                  Status
                </InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  label="Status"
                  sx={{
                    backgroundColor: darkMode ? '#334155' : undefined,
                    color: darkMode ? '#f1f5f9' : undefined,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: darkMode ? '#475569' : undefined
                    }
                  }}
                >
                  <MenuItem value="Under Review">Under Review</MenuItem>
                  <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                  <MenuItem value="Hired">Hired</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<UpdateIcon />}
                onClick={handleUpdateStatus}
                sx={{
                  backgroundColor: darkMode ? '#3b82f6' : 'primary.main',
                  '&:hover': {
                    backgroundColor: darkMode ? '#2563eb' : 'primary.dark',
                  }
                }}
              >
                Update Status
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CandidateDetails;
