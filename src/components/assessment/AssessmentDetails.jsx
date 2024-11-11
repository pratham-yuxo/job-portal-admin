import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const AssessmentDetails = ({ 
  open, 
  onClose, 
  assessment, 
  darkMode,
  onEdit,
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAssessment, setEditedAssessment] = useState(assessment);

  const handleEdit = () => {
    onEdit(editedAssessment);
    setIsEditing(false);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...editedAssessment.questions];
    if (field === 'questionText') {
      newQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.replace('option', ''));
      newQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctOption') {
      newQuestions[index].correctOption = value;
    }
    setEditedAssessment({ ...editedAssessment, questions: newQuestions });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#334155' : '#fff',
          color: darkMode ? '#f1f5f9' : 'inherit'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6">
          Assessment for {assessment.jobTitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isEditing ? (
            <>
              <IconButton 
                onClick={() => setIsEditing(true)}
                sx={{ color: darkMode ? '#3b82f6' : 'primary.main' }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(assessment.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton 
                onClick={handleEdit}
                sx={{ color: 'success.main' }}
              >
                <SaveIcon />
              </IconButton>
              <IconButton 
                onClick={() => setIsEditing(false)}
                sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {editedAssessment.questions.map((question, qIndex) => (
          <Box key={qIndex} sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2,
                color: darkMode ? '#f1f5f9' : 'inherit',
                fontWeight: 500
              }}
            >
              Question {qIndex + 1}
            </Typography>

            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="Question"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    sx: { 
                      backgroundColor: darkMode ? '#475569' : '#fff',
                      color: darkMode ? '#f1f5f9' : 'inherit'
                    }
                  }}
                />
                {question.options.map((option, oIndex) => (
                  <TextField
                    key={oIndex}
                    fullWidth
                    label={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleQuestionChange(qIndex, `option${oIndex}`, e.target.value)}
                    sx={{ mb: 1 }}
                    InputProps={{
                      sx: { 
                        backgroundColor: darkMode ? '#475569' : '#fff',
                        color: darkMode ? '#f1f5f9' : 'inherit'
                      }
                    }}
                  />
                ))}
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel>Correct Answer</InputLabel>
                  <Select
                    value={question.correctOption}
                    label="Correct Answer"
                    onChange={(e) => handleQuestionChange(qIndex, 'correctOption', e.target.value)}
                    sx={{
                      backgroundColor: darkMode ? '#475569' : '#fff',
                      color: darkMode ? '#f1f5f9' : 'inherit'
                    }}
                  >
                    {question.options.map((_, index) => (
                      <MenuItem key={index} value={index}>
                        Option {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <Typography sx={{ mb: 2 }}>{question.questionText}</Typography>
                {question.options.map((option, oIndex) => (
                  <Typography
                    key={oIndex}
                    sx={{
                      mb: 1,
                      color: oIndex === question.correctOption ? 
                        (darkMode ? '#4ade80' : 'success.main') : 
                        (darkMode ? '#94a3b8' : 'text.secondary')
                    }}
                  >
                    {oIndex + 1}. {option} 
                    {oIndex === question.correctOption && ' ✓'}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssessmentDetails; 