import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
const JobSelect = ({ selectedJobId, jobs, darkMode,setSelectedJobId }) => {
  return (
    <>
        <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel 
                id="job-select-label"
                sx={{
                  color: darkMode ? '#94a3b8' : 'inherit',
                  '&.Mui-focused': {
                    color: darkMode ? '#3b82f6' : 'primary.main',
                  }
                }}
              >
                Select Job
              </InputLabel>
              <Select
                labelId="job-select-label"
                value={selectedJobId}
                label="Select Job"
                onChange={(e) => setSelectedJobId(e.target.value)}
                sx={{
                  backgroundColor: darkMode ? '#475569' : '#fff',
                  color: darkMode ? '#f1f5f9' : 'inherit',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(241, 245, 249, 0.2)' : 'rgba(0, 0, 0, 0.23)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(241, 245, 249, 0.3)' : undefined
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#3b82f6' : 'primary.main'
                  }
                }}
              >
                <MenuItem value="">
                  <em>-- Select Job --</em>
                </MenuItem>
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
    </>
  )
}

export default JobSelect