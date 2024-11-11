import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  useTheme,
  Snackbar,
  Alert,
  useMediaQuery
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import SaveIcon from '@mui/icons-material/Save';
import AssessmentDetails from '../components/assessment/AssessmentDetails';
import DeleteConfirmationDialog from '../components/utitlity components/ConfirmationDialogBox';
import JobSelect from '../components/assessment/JobSelect';
import QuestionForm from '../components/assessment/QuestionForm';
import ExistingAssessments from '../components/assessment/ExistingAssessments';

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
    setNotification({
      open: true,
      message: 'Assessment edited successfully',
      type: 'success'
    });
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
            {/* JobSelect component to select the job for the assessment */}
            <JobSelect 
              selectedJobId={selectedJobId}
              jobs={jobs}
              setSelectedJobId={setSelectedJobId}
              darkMode={darkMode}
            />

            {/* Mapping all the questions */}
            {questions.map((question, qIndex) => (
              <QuestionForm 
                question={question}
                index={qIndex}
                onQuestionChange={handleQuestionChange}
                onOptionChange={handleOptionChange}
                onCorrectOptionChange={handleCorrectOptionChange}
                onRemove={handleRemoveQuestion}
                darkMode={darkMode}
              />
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

            {selectedJobId && (
              <ExistingAssessments
                assessments={selectedJobAssessments}
                jobTitle={jobs.find(job => job.id === parseInt(selectedJobId))?.title}
                onViewDetails={setSelectedAssessment}
                onDelete={handleDeleteClick}
                darkMode={darkMode}
                isMobile={isMobile}
              />
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
