import { Box, Typography, Paper, Button, IconButton, Divider } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const ExistingAssessments = ({ 
  assessments, 
  jobTitle, 
  onViewDetails, 
  onDelete,  
  darkMode,
  isMobile 
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mb: 3 }} />
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          color: darkMode ? '#f1f5f9' : '#2c3e50',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <QuizIcon fontSize="small" />
        Existing Assessments for {jobTitle}
      </Typography>
      
      {assessments.length === 0 ? (
        <Paper
          sx={{ 
            p: 4,
            textAlign: 'center',
            backgroundColor: darkMode ? '#475569' : '#f8fafc',
          }}
        >
          <AssignmentLateIcon 
            sx={{ 
              fontSize: 48, 
              color: darkMode ? '#94a3b8' : '#64748b',
              mb: 2
            }} 
          />
          <Typography 
            variant="h6"
            sx={{ 
              color: darkMode ? '#f1f5f9' : '#2c3e50',
              mb: 1
            }}
          >
            No Assessments Found
          </Typography>
          <Typography
            sx={{ 
              color: darkMode ? '#94a3b8' : '#64748b'
            }}
          >
            There are no assessments created for this job yet.
            Create your first assessment by adding questions above.
          </Typography>
        </Paper>
      ) : (
        assessments.map((assessment) => (
          <Paper
            key={assessment.id}
            sx={{ 
              p: 2,
              mb: 2,
              backgroundColor: darkMode ? '#475569' : '#f8fafc',
              '&:hover': {
                backgroundColor: darkMode ? '#4b5563' : '#f1f5f9',
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 2, sm: 0 }
            }}>
              <Box>
                <Typography sx={{ color: darkMode ? '#f1f5f9' : '#2c3e50', fontWeight: 500, mb: 0.5 }}>
                  Assessment #{assessment.id}
                </Typography>
                <Typography variant="body2" sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  {assessment.questions.length} questions • Created on {new Date(assessment.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                width: { xs: '100%', sm: 'auto' }
              }}>
                <Button 
                  size="small"
                  variant="outlined"
                  onClick={() => onViewDetails(assessment)}
                  fullWidth={isMobile}
                  sx={{
                    color: darkMode ? '#f1f5f9' : 'primary.main',
                    borderColor: darkMode ? '#94a3b8' : 'primary.main'
                  }}
                >
                  View Details
                </Button>
                <IconButton
                  onClick={() => onDelete(assessment.id)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default ExistingAssessments;
