import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import EditJob from './EditJob';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from '@mui/material/styles';

const JobCard = ({ job, onDeleteSuccess, onEditSuccess }) => {
  const { deleteJob, getCandidatesAppliedCount, darkMode } = useContext(AppContext);
  const theme = useTheme();
  const candidatesApplied = getCandidatesAppliedCount(job.id);
  const [isEditJobOpen, setIsEditJobOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteJob(job.id);
    setIsDeleteDialogOpen(false);
    onDeleteSuccess?.();
  };

  const handleEditSuccess = () => {
    setIsEditJobOpen(false);
    onEditSuccess?.();
  };

  return (
    <>
      <Card 
        elevation={2} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          backgroundColor: darkMode ? '#1e293b' : '#fff',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: darkMode 
              ? '0 8px 40px -12px rgba(255,255,255,0.2)'
              : '0 8px 40px -12px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }
        }}
      >
        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: 2,
          pb: 1.5
        }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontSize: '1.1rem',
              mb: 1,
              fontWeight: 600,
              letterSpacing: '0.3px',
              color: darkMode ? '#fff' : '#2c3e50'
            }}
          >
            {job.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1.5,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: '1.5em',
              maxHeight: '3em',
              color: darkMode ? '#b3b3b3' : 'text.secondary',
              fontSize: '0.875rem',
              letterSpacing: '0.2px'
            }}
          >
            {job.description}
          </Typography>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              borderTop: 1,
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider',
              pt: 1.5,
              color: darkMode ? '#b3b3b3' : 'text.secondary'
            }}
          >
            <PeopleIcon sx={{ fontSize: '0.9rem' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.2px'
              }}
            >
              {candidatesApplied} candidates
            </Typography>
          </Box>
        </CardContent>
        
        <CardActions 
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            borderTop: 1,
            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'divider',
            px: 2,
            py: 1.5,
            flexWrap: 'wrap'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex',
              gap: 1,
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Link 
              to={`/jobs/${job.id}`} 
              style={{ 
                textDecoration: 'none',
                flex: 1
              }}
            >
              <Button
                fullWidth
                size="small"
                variant="outlined"
                color="primary"
                startIcon={<VisibilityIcon sx={{ fontSize: '0.9rem' }} />}
                sx={{ 
                  fontSize: '0.8rem',
                  py: 0.5,
                  whiteSpace: 'nowrap',
                  minWidth: 0
                }}
              >
                View
              </Button>
            </Link>
            <Button 
              size="small"
              variant="outlined"
              color="success" 
              onClick={() => setIsEditJobOpen(true)}
              startIcon={<EditIcon sx={{ fontSize: '0.9rem' }} />}
              sx={{ 
                fontSize: '0.8rem',
                py: 0.5,
                whiteSpace: 'nowrap',
                flex: 1,
                minWidth: 0
              }}
            >
              Edit
            </Button>
            <Button 
              size="small"
              variant="outlined"
              color="error" 
              onClick={() => setIsDeleteDialogOpen(true)}
              startIcon={<DeleteIcon sx={{ fontSize: '0.9rem' }} />}
              sx={{ 
                fontSize: '0.75rem',
                py: 0.5,
                whiteSpace: 'nowrap',
                flex: 1,
                minWidth: 0
              }}
            >
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            color: darkMode ? '#fff' : 'inherit'
          }
        }}
      >
        <DialogTitle 
          id="delete-dialog-title" 
          sx={{ 
            pb: 1,
            color: darkMode ? '#fff' : 'inherit'
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the job posting "{job.title}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <EditJob
        isOpen={isEditJobOpen}
        onClose={() => setIsEditJobOpen(false)}
        job={job}
        onSave={handleEditSuccess}
      />
    </>
  );
};

export default JobCard;
