import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  useTheme,
  Snackbar,
  Alert,
  useMediaQuery
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssessmentDetails from '../components/AssessmentDetails';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';

const CreateAssessment = () => {
  const { jobs, assessments, setAssessments, darkMode } = useContext(AppContext);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const theme = useTheme();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    assessmentId: null
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success'
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const selectedJobAssessments = assessments.filter(
    assessment => assessment.jobId === parseInt(selectedJobId)
  );

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', options: ['', '', '', ''], correctOption: '' },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOption = value;
    setQuestions(newQuestions);
  };

  const handleSaveAssessment = () => {
    if (!selectedJobId) {
      setNotification({
        open: true,
        message: 'Please select a job first',
        type: 'error'
      });
      return;
    }
    if (questions.length === 0) {
      setNotification({
        open: true,
        message: 'Please add at least one question',
        type: 'error'
      });
      return;
    }

    const isComplete = questions.every(q => 
      q.questionText && 
      q.options.every(opt => opt.trim() !== '') && 
      q.correctOption !== ''
    );

    if (!isComplete) {
      setNotification({
        open: true,
        message: 'Please complete all questions and options',
        type: 'error'
      });
      return;
    }

    const newAssessment = {
      id: Date.now(),
      jobId: parseInt(selectedJobId),
      jobTitle: jobs.find(job => job.id === parseInt(selectedJobId))?.title,
      questions,
      createdAt: new Date().toISOString()
    };

    setAssessments(prev => [...prev, newAssessment]);
    
    setNotification({
      open: true,
      message: 'Assessment saved successfully',
      type: 'success'
    });

    setSelectedJobId('');
    setQuestions([]);
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const handleEditAssessment = (editedAssessment) => {
    setAssessments(prev => 
      prev.map(assessment => 
        assessment.id === editedAssessment.id ? editedAssessment : assessment
      )
    );
    setShowSuccess(true);
  };

  const handleDeleteClick = (assessmentId) => {
    setDeleteConfirmation({
      open: true,
      assessmentId
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.assessmentId) {
      setAssessments(prev => 
        prev.filter(assessment => assessment.id !== deleteConfirmation.assessmentId)
      );
      setSelectedAssessment(null);
      setNotification({
        open: true,
        message: 'Assessment deleted successfully',
        type: 'success'
      });
    }
    setDeleteConfirmation({ open: false, assessmentId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ open: false, assessmentId: null });
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
        <Container maxWidth="md">
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              backgroundColor: darkMode ? '#1e293b' : '#fff',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
              <QuizIcon sx={{ fontSize: 32, color: darkMode ? '#3b82f6' : theme.palette.primary.main }} />
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  fontWeight: 600,
                  color: darkMode ? '#f1f5f9' : '#2c3e50'
                }}
              >
                Create Assessment
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel 
                id="job-select-label"
                sx={{
                  color: darkMode ? '#94a3b8' : 'inherit',
                  '&.Mui-focused': {
                    color: darkMode ? '#3b82f6' : 'primary.main',
                  }
                }}
              >
                Select Job
              </InputLabel>
              <Select
                labelId="job-select-label"
                value={selectedJobId}
                label="Select Job"
                onChange={(e) => setSelectedJobId(e.target.value)}
                sx={{
                  backgroundColor: darkMode ? '#475569' : '#fff',
                  color: darkMode ? '#f1f5f9' : 'inherit',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(241, 245, 249, 0.2)' : 'rgba(0, 0, 0, 0.23)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(241, 245, 249, 0.3)' : undefined
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#3b82f6' : 'primary.main'
                  }
                }}
              >
                <MenuItem value="">
                  <em>-- Select Job --</em>
                </MenuItem>
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {questions.map((question, qIndex) => (
              <Paper 
                key={qIndex} 
                sx={{ 
                  p: 3, 
                  mb: 3,
                  backgroundColor: darkMode ? '#475569' : '#f8fafc',
                  position: 'relative'
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleRemoveQuestion(qIndex)}
                  sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: darkMode ? '#f1f5f9' : 'inherit'
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    color: darkMode ? '#f1f5f9' : '#2c3e50'
                  }}
                >
                  Question {qIndex + 1}
                </Typography>

                <TextField
                  fullWidth
                  label="Question Text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { 
                      backgroundColor: darkMode ? '#334155' : '#fff',
                      color: darkMode ? '#f1f5f9' : 'inherit'
                    }
                  }}
                />

                <Box sx={{ mb: 3 }}>
                  {question.options.map((option, oIndex) => (
                    <TextField
                      key={oIndex}
                      fullWidth
                      label={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        sx: { 
                          backgroundColor: darkMode ? '#334155' : '#fff',
                          color: darkMode ? '#f1f5f9' : 'inherit'
                        }
                      }}
                    />
                  ))}
                </Box>

                <FormControl fullWidth>
                  <InputLabel>Correct Option</InputLabel>
                  <Select
                    value={question.correctOption}
                    label="Correct Option"
                    onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
                    sx={{
                      backgroundColor: darkMode ? '#334155' : '#fff',
                      color: darkMode ? '#f1f5f9' : 'inherit'
                    }}
                  >
                    <MenuItem value="">
                      <em>-- Select Correct Option --</em>
                    </MenuItem>
                    {question.options.map((_, oIndex) => (
                      <MenuItem key={oIndex} value={oIndex}>
                        Option {oIndex + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            ))}

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddQuestion}
                sx={{
                  color: darkMode ? '#3b82f6' : theme.palette.primary.main,
                  borderColor: darkMode ? '#3b82f6' : theme.palette.primary.main,
                  '&:hover': {
                    borderColor: darkMode ? '#2563eb' : theme.palette.primary.dark,
                    backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : undefined
                  }
                }}
              >
                Add Question
              </Button>

              {questions.length > 0 && (
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveAssessment}
                  sx={{
                    backgroundColor: darkMode ? '#3b82f6' : theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: darkMode ? '#2563eb' : theme.palette.primary.dark,
                    }
                  }}
                >
                  Save Assessment
                </Button>
              )}
            </Box>

            {selectedJobId && selectedJobAssessments.length > 0 && (
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
                  Existing Assessments for {jobs.find(job => job.id === parseInt(selectedJobId))?.title}
                </Typography>
                
                {selectedJobAssessments.map((assessment) => (
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
                        <Typography 
                          sx={{ 
                            color: darkMode ? '#f1f5f9' : '#2c3e50',
                            fontWeight: 500,
                            mb: 0.5
                          }}
                        >
                          Assessment #{assessment.id}
                        </Typography>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            color: darkMode ? '#94a3b8' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap'
                          }}
                        >
                          <span>{assessment.questions.length} questions</span>
                          <span>•</span>
                          <span>Created on {new Date(assessment.createdAt).toLocaleDateString()}</span>
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        width: { xs: '100%', sm: 'auto' },
                        justifyContent: { xs: 'flex-start', sm: 'flex-end' }
                      }}>
                        <Button 
                          size="small"
                          variant="outlined"
                          onClick={() => setSelectedAssessment(assessment)}
                          fullWidth={isMobile}
                          sx={{
                            color: darkMode ? '#f1f5f9' : 'primary.main',
                            borderColor: darkMode ? '#94a3b8' : 'primary.main',
                            '&:hover': {
                              borderColor: darkMode ? '#f1f5f9' : 'primary.dark',
                              backgroundColor: darkMode ? 'rgba(241, 245, 249, 0.1)' : undefined
                            }
                          }}
                        >
                          View Details
                        </Button>
                        <IconButton
                          onClick={() => handleDeleteClick(assessment.id)}
                          sx={{ 
                            color: 'error.main',
                            ml: { xs: 'auto', sm: 0 }
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>

          <DeleteConfirmationDialog
            open={deleteConfirmation.open}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            title="Delete Assessment"
            message="Are you sure you want to delete this assessment? This action cannot be undone."
            darkMode={darkMode}
          />

          <Snackbar
            open={notification.open}
            autoHideDuration={4000}
            onClose={() => setNotification(prev => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert 
              onClose={() => setNotification(prev => ({ ...prev, open: false }))} 
              severity={notification.type}
              variant="filled"
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </Container>
      </div>

      {selectedAssessment && (
        <AssessmentDetails
          open={Boolean(selectedAssessment)}
          onClose={() => setSelectedAssessment(null)}
          assessment={selectedAssessment}
          darkMode={darkMode}
          onEdit={handleEditAssessment}
          onDelete={handleDeleteClick}
        />
      )}
    </>
  );
};

export default CreateAssessment;
