import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

const AddJob = ({ isOpen, onClose, onSave }) => {
  const { addJob, darkMode } = useContext(AppContext);
  const [jobData, setJobData] = useState({
    id: Date.now(),
    title: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      ...jobData,
      id: Date.now()
    };
    
    addJob(newJob);
    onSave?.();
    setJobData({ 
      id: Date.now(),
      title: '', 
      description: '' 
    });
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#1e293b' : '#fff',
          color: darkMode ? '#f1f5f9' : 'inherit',
          minHeight: '300px'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          color: darkMode ? '#fff' : 'inherit',
          pb: 1,
          fontSize: '1.25rem',
          fontWeight: 600
        }}
      >
        Add New Job
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            py: 1
          }}>
            <TextField
              label="Job Title"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              required
              fullWidth
              InputProps={{
                sx: { 
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: darkMode ? '#fff' : 'inherit'
                }
              }}
              InputLabelProps={{
                sx: { color: darkMode ? '#fff' : 'inherit' }
              }}
            />
            <TextField
              label="Job Description"
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              required
              fullWidth
              multiline
              rows={4}
              InputProps={{
                sx: { 
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: darkMode ? '#fff' : 'inherit'
                }
              }}
              InputLabelProps={{
                sx: { color: darkMode ? '#fff' : 'inherit' }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{
              color: darkMode ? '#fff' : 'inherit',
              borderColor: darkMode ? '#fff' : 'inherit',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 3 }}
          >
            Add Job
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddJob;
