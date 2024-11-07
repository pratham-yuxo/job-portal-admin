import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const DeleteConfirmationDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  darkMode 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: darkMode ? '#334155' : '#fff',
        }
      }}
    >
      <DialogTitle sx={{ color: darkMode ? '#f1f5f9' : 'inherit' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: darkMode ? '#94a3b8' : 'inherit' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{ color: darkMode ? '#94a3b8' : 'inherit' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog; 