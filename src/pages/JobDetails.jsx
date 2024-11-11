import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CandidateCard from '../components/candidate/CandidateCard';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WorkIcon from '@mui/icons-material/Work';

const JobDetails = () => {
  const { jobId } = useParams();
  const { candidates, jobs, darkMode } = useContext(AppContext);

  const job = jobs.find(j => j.id === parseInt(jobId));
  const jobCandidates = candidates.filter(
    (candidate) => candidate.jobId === parseInt(jobId)
  );

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
          {/* Job Header */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 3,
              backgroundColor: darkMode ? '#1e293b' : '#fff',
              borderRadius: 2,
              transition: 'background-color 0.3s ease'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <WorkIcon 
                sx={{ 
                  fontSize: '2rem',
                  color: darkMode ? '#3b82f6' : 'primary.main'
                }} 
              />
              <Typography 
                variant="h5" 
                component="h1"
                sx={{ 
                  fontWeight: 600,
                  color: darkMode ? '#f1f5f9' : '#2c3e50'
                }}
              >
                {job?.title}
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: darkMode ? '#94a3b8' : 'text.secondary',
                mb: 2
              }}
            >
              {job?.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleAltIcon 
                sx={{ 
                  color: darkMode ? '#3b82f6' : 'primary.main'
                }} 
              />
              <Typography 
                variant="h6"
                sx={{ 
                  fontWeight: 500,
                  color: darkMode ? '#f1f5f9' : '#2c3e50'
                }}
              >
                Candidates Applied - {jobCandidates.length}
              </Typography>
            </Box>
          </Paper>

          {/* Candidates List */}
          {jobCandidates.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {jobCandidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} darkMode={darkMode} />
              ))}
            </Box>
          ) : (
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                textAlign: 'center',
                backgroundColor: darkMode ? '#1e293b' : '#fff',
                borderRadius: 2,
                transition: 'background-color 0.3s ease'
              }}
            >
              <PersonSearchIcon 
                sx={{ 
                  fontSize: '4rem',
                  color: darkMode ? '#64748b' : '#94a3b8',
                  mb: 2
                }} 
              />
              <Typography 
                variant="h6"
                sx={{ 
                  fontWeight: 500,
                  color: darkMode ? '#f1f5f9' : '#2c3e50',
                  mb: 1
                }}
              >
                No Candidates Yet
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  color: darkMode ? '#94a3b8' : 'text.secondary'
                }}
              >
                No candidates have applied for this job position yet.
              </Typography>
            </Paper>
          )}
        </Container>
      </div>
    </>
  );
};

export default JobDetails;
