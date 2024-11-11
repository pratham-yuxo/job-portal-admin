import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ResumePreview = ({ open, onClose, resumeUrl, candidateName, darkMode }) => {
  if (!resumeUrl) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#1e293b' : '#fff',
          minHeight: '80vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          color: darkMode ? '#f1f5f9' : 'inherit',
          backgroundColor: darkMode ? '#334155' : '#f8fafc',
        }}
      >
        <Typography variant="h6">
          {candidateName}'s Resume
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: darkMode ? '#94a3b8' : 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent 
        sx={{ 
          p: 0,
          backgroundColor: darkMode ? '#1e293b' : '#fff',
          '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            background: darkMode ? '#334155' : '#f1f5f9'
          },
          '&::-webkit-scrollbar-thumb': {
            background: darkMode ? '#94a3b8' : '#cbd5e1'
          }
        }}
      >
        <Box sx={{ height: '75vh' }}>
          <iframe
            src={resumeUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title={`${candidateName}'s Resume`}
            allow="autoplay"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreview; 