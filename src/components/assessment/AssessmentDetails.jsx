import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  DialogContentText,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import QuestionForm from './QuestionForm';

const AssessmentDetails = ({ assessment, onClose, onEdit, darkMode }) => {
  const [editedAssessment, setEditedAssessment] = useState(assessment);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleQuestionChange = (index, newQuestionText) => {
    const updatedQuestions = [...editedAssessment.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      questionText: newQuestionText,
    };
    setEditedAssessment({ ...editedAssessment, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, newOptionText) => {
    const updatedQuestions = [...editedAssessment.questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOptionText;
    setEditedAssessment({ ...editedAssessment, questions: updatedQuestions });
  };

  const handleCorrectOptionChange = (questionIndex, newCorrectOption) => {
    const updatedQuestions = [...editedAssessment.questions];
    updatedQuestions[questionIndex].correctOption = newCorrectOption;
    setEditedAssessment({ ...editedAssessment, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: '',
      options: ['', '', '', ''],
      correctOption: ''
    };
    setEditedAssessment({
      ...editedAssessment,
      questions: [...editedAssessment.questions, newQuestion]
    });
  };

  const handleRemoveQuestion = (indexToRemove) => {
    const updatedQuestions = editedAssessment.questions.filter((_, index) => index !== indexToRemove);
    setEditedAssessment({ ...editedAssessment, questions: updatedQuestions });
  };

  const handleSaveClick = () => {
    const isValid = editedAssessment.questions.every(question => 
      question.questionText.trim() !== '' && 
      question.correctOption !== '' &&
      question.options.every(option => option.trim() !== '')
    );

    if (!isValid) {
      alert('Please fill in all questions, options, and select correct answers');
      return;
    }

    setConfirmDialog(true);
  };

  const handleConfirmSave = () => {
    onEdit(editedAssessment);
    setConfirmDialog(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: darkMode ? '#1e293b' : '#fff',
          }
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            color: darkMode ? '#f1f5f9' : 'inherit',
            backgroundColor: darkMode ? '#334155' : '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">Edit Assessment</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: darkMode ? '#94a3b8' : 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: darkMode ? '#1e293b' : '#fff',
            mt: 2
          }}
        >
          {editedAssessment.questions.map((question, index) => (
            <QuestionForm
              key={index}
              question={question}
              index={index}
              onQuestionChange={handleQuestionChange}
              onOptionChange={handleOptionChange}
              onCorrectOptionChange={handleCorrectOptionChange}
              onRemove={handleRemoveQuestion}
              darkMode={darkMode}
            />
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddQuestion}
              variant="outlined"
              sx={{
                color: darkMode ? '#3b82f6' : 'primary.main',
                borderColor: darkMode ? '#3b82f6' : 'primary.main',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : undefined,
                  borderColor: darkMode ? '#3b82f6' : 'primary.main',
                }
              }}
            >
              Add New Question
            </Button>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, backgroundColor: darkMode ? '#1e293b' : '#fff' }}>
          <Button 
            onClick={onClose}
            sx={{ color: darkMode ? '#94a3b8' : undefined }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            variant="contained"
            sx={{
              backgroundColor: darkMode ? '#3b82f6' : 'primary.main',
              '&:hover': {
                backgroundColor: darkMode ? '#2563eb' : 'primary.dark',
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: darkMode ? '#1e293b' : '#fff',
            minWidth: { xs: '90%', sm: 'auto' }
          }
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: darkMode ? '#334155' : '#f8fafc',
            color: darkMode ? '#f1f5f9' : 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <WarningIcon sx={{ color: darkMode ? '#f59e0b' : '#f97316' }} />
          Confirm Changes
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ color: darkMode ? '#94a3b8' : 'inherit' }}>
            Are you sure you want to save these changes? This action cannot be undone.
          </DialogContentText>
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 2,
              backgroundColor: darkMode ? '#422006' : undefined,
              color: darkMode ? '#f1f5f9' : undefined,
              '& .MuiAlert-icon': {
                color: darkMode ? '#f59e0b' : undefined
              }
            }}
          >
            This will update the assessment for all candidates.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: darkMode ? '#1e293b' : '#fff', p: 2 }}>
          <Button 
            onClick={() => setConfirmDialog(false)}
            sx={{ color: darkMode ? '#94a3b8' : undefined }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSave}
            variant="contained"
            color="warning"
            sx={{
              backgroundColor: darkMode ? '#f59e0b' : undefined,
              '&:hover': {
                backgroundColor: darkMode ? '#d97706' : undefined,
              }
            }}
          >
            Confirm Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssessmentDetails;