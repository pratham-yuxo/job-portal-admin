import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const EditJob = ({ isOpen, onClose, job, onSave }) => {
  const { editJob, darkMode } = useContext(AppContext);
  const [jobTitle, setJobTitle] = useState(job.title);
  const [jobDescription, setJobDescription] = useState(job.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle && jobDescription) {
      const updatedJob = {
        ...job,
        title: jobTitle,
        description: jobDescription,
      };
      editJob(updatedJob);
      setJobTitle("");
      setJobDescription("");
      onSave?.();
      onClose();
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#334155' : '#fff',
          backgroundImage: 'none',
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: darkMode ? '#f1f5f9' : 'inherit',
          borderBottom: 1,
          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider',
          pb: 2,
          mb: 1
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Edit Job
          </Typography>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{ color: darkMode ? '#94a3b8' : 'inherit' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent 
          sx={{ 
            py: 2,
            px: 3,
            overflowY: 'visible',
            '& .MuiDialogContent-root': {
              overflowY: 'visible'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2.5,
            '& .MuiTextField-root': {
              position: 'relative',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: darkMode ? '#3b82f6' : 'primary.main',
                }
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? '#94a3b8' : 'inherit',
                backgroundColor: darkMode ? '#334155' : '#fff',
                padding: '0 4px',
                '&.Mui-focused': {
                  color: darkMode ? '#3b82f6' : 'primary.main',
                }
              },
              '& .MuiInputBase-input': {
                color: darkMode ? '#f1f5f9' : 'inherit',
              }
            }
          }}>
            <TextField
              label="Job Title"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              variant="outlined"
              size="small"
            />

            <TextField
              label="Job Description"
              fullWidth
              multiline
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              variant="outlined"
              size="small"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          px: 3, 
          py: 2,
          borderTop: 1,
          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider',
          gap: 1
        }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            size="small"
            sx={{
              color: darkMode ? '#94a3b8' : 'inherit',
              borderColor: darkMode ? '#475569' : 'inherit',
              '&:hover': {
                borderColor: darkMode ? '#94a3b8' : undefined,
                backgroundColor: darkMode ? 'rgba(148, 163, 184, 0.1)' : undefined
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            size="small"
            sx={{
              bgcolor: darkMode ? '#3b82f6' : 'primary.main',
              '&:hover': {
                bgcolor: darkMode ? '#2563eb' : 'primary.dark',
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditJob;