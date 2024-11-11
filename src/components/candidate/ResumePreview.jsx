import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

const ResumePreview = ({ open, onClose, resumeUrl, candidateName, darkMode }) => {
  if (!resumeUrl) return null;

  const getEmbedUrl = (url) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/[-\w]{25,}/);
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId[0]}/preview`;
      }
    }
    return url;
  };

  const getDownloadUrl = (url) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/[-\w]{25,}/);
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
      }
    }
    return url;
  };

  const embedUrl = getEmbedUrl(resumeUrl);
  const downloadUrl = getDownloadUrl(resumeUrl);

  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6">
          {candidateName}'s Resume
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Download Resume">
            <IconButton
              onClick={handleDownload}
              sx={{
                color: darkMode ? '#94a3b8' : 'grey.500',
                '&:hover': {
                  color: darkMode ? '#3b82f6' : 'primary.main',
                }
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: darkMode ? '#94a3b8' : 'grey.500',
                '&:hover': {
                  color: darkMode ? '#ef4444' : 'error.main',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      <DialogContent 
        sx={{ 
          p: 0,
          backgroundColor: darkMode ? '#1e293b' : '#fff',
          height: '80vh'
        }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title={`${candidateName}'s Resume`}
          allow="autoplay"
          style={{ border: 'none' }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreview; 