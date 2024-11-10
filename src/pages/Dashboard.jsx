import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import JobCard from '../components/JobCard';
import AddJob from '../components/AddJob';
import { 
  Grid, 
  Container, 
  Button, 
  Typography, 
  useTheme,
  Snackbar,
  Alert 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';

const Dashboard = () => {
  const { jobs, setJobs, darkMode } = useContext(AppContext);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const theme = useTheme();
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  const handleNotification = (message, type = 'success') => {
    setNotification({
      open: true,
      message,
      type
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

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
        <Container maxWidth="lg">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px' 
          }}>
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{
                fontWeight: 600,
                color: darkMode ? '#f1f5f9' : '#2c3e50',
                letterSpacing: '0.5px'
              }}
            >
              Job Postings
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setIsAddJobOpen(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: darkMode ? '#3b82f6' : theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: darkMode ? '#2563eb' : theme.palette.primary.dark,
                }
              }}
            >
              Add Job
            </Button>
          </div>

          {jobs.length > 0 ? (
            <Grid container spacing={2}>
              {jobs.map((job) => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={job.id}>
                  <JobCard 
                    job={job} 
                    onDeleteSuccess={() => handleNotification('Job deleted successfully')}
                    onEditSuccess={() => handleNotification('Job updated successfully')}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 24px',
                backgroundColor: darkMode ? '#1e293b' : '#fff',
                borderRadius: '8px',
                marginTop: '24px'
              }}
            >
              <WorkIcon 
                sx={{ 
                  fontSize: '4rem', 
                  color: darkMode ? '#64748b' : '#94a3b8',
                  mb: 2
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: darkMode ? '#f1f5f9' : '#2c3e50',
                  mb: 1
                }}
              >
                No Jobs Posted Yet
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: darkMode ? '#94a3b8' : 'text.secondary',
                  textAlign: 'center',
                  maxWidth: '400px'
                }}
              >
                Click the "Add Job" button above to create your first job posting.
              </Typography>
            </div>
          )}

          <AddJob 
            isOpen={isAddJobOpen} 
            onClose={() => setIsAddJobOpen(false)}
            onSave={() => handleNotification('Job added successfully')}
          />

          <Snackbar
            open={notification.open}
            autoHideDuration={4000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseNotification} 
              severity={notification.type}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
