import React from 'react'
import { Paper, IconButton, Typography, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const QuestionForm = ({ 
  question, 
  index, 
  onQuestionChange, 
  onOptionChange, 
  onCorrectOptionChange, 
  onRemove,
  darkMode 
}) => {
  return (
    <Paper 
      sx={{ 
        p: 3, 
        mb: 3,
        backgroundColor: darkMode ? '#475569' : '#f8fafc',
        position: 'relative'
      }}
    >
      <IconButton
        size="small"
        onClick={() => onRemove(index)}
        sx={{ 
          position: 'absolute',
          right: 8,
          top: 8,
          color: darkMode ? '#f1f5f9' : 'inherit'
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 2, color: darkMode ? '#f1f5f9' : '#2c3e50' }}>
        Question {index + 1}
      </Typography>

      <TextField
        fullWidth
        label="Question Text"
        value={question.questionText}
        onChange={(e) => onQuestionChange(index, e.target.value)}
        sx={{ mb: 3 }}
        InputLabelProps={{
          sx: {
            color: darkMode ? '#94a3b8' : 'inherit',
            '&.Mui-focused': {
              color: darkMode ? '#3b82f6' : 'primary.main',
            }
          }
        }}
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
            onChange={(e) => onOptionChange(index, oIndex, e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              sx: {
                color: darkMode ? '#94a3b8' : 'inherit',
                '&.Mui-focused': {
                  color: darkMode ? '#3b82f6' : 'primary.main',
                }
              }
            }}
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
        <InputLabel 
          sx={{
            color: darkMode ? '#94a3b8' : 'inherit',
            '&.Mui-focused': {
              color: darkMode ? '#3b82f6' : 'primary.main',
            }
          }}
        >
          Correct Option
        </InputLabel>
        <Select
          value={question.correctOption}
          label="Correct Option"
          onChange={(e) => onCorrectOptionChange(index, e.target.value)}
          sx={{
            backgroundColor: darkMode ? '#334155' : '#fff',
            color: darkMode ? '#f1f5f9' : 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(0, 0, 0, 0.23)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(0, 0, 0, 0.23)'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: darkMode ? '#3b82f6' : 'primary.main'
            }
          }}
        >
          <MenuItem value=""><em>-- Select Correct Option --</em></MenuItem>
          {question.options.map((_, oIndex) => (
            <MenuItem key={oIndex} value={oIndex}>Option {oIndex + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default QuestionForm;