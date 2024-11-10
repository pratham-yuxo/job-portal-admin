import React, { createContext, useState,useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs
      ? JSON.parse(savedJobs)
      : [
          // mock jobs
          {
            id: 1,
            title: 'Frontend Developer',
            description: 'Work on React applications.',
            candidatesApplied: 0,
            
          },
          {
            id: 2,
            title: 'Backend Developer',
            description: 'Develop APIs with Node.js.',
            candidatesApplied: 0,
          },
        ];
  });

  // Initialize candidates from localStorage or with mock data
  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = localStorage.getItem('candidates');
    return savedCandidates
      ? JSON.parse(savedCandidates)
      : [
          // Mock candidates data
          {
            id: 1,
            jobId: 1,
            name: 'Alice Smith',
            email: 'alice@example.com',
            contact: '123-456-7890',
            resume: null, // Assuming we handle resumes differently
            applicationDate: '2021-09-01',
            status: 'Under Review',
            skills: ['React', 'JavaScript', 'CSS', 'HTML'],
            experience: 2,
          },
          {
            id: 2,
            jobId: 1,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            contact: '987-654-3210',
            resume: null,
            applicationDate: '2021-09-02',
            status: 'Interview Scheduled',
            skills: ['React', 'JavaScript', 'CSS', 'HTML'],
            experience: 12,
          },
        ];
  });

  // Update localStorage whenever jobs or candidates change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const [assessments, setAssessments] = useState(() => {
    const savedAssessments = localStorage.getItem('assessments');
    return savedAssessments ? JSON.parse(savedAssessments) : [];
  });

  // Save assessments to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('assessments', JSON.stringify(assessments));
  }, [assessments]);

  // function to add a new job
  const addJob = (job) => {
    setJobs([...jobs, job]);
  };
  //function to edit a job
  const editJob = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updatedJobs);
  };

  // function to delete a job
  const deleteJob = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(updatedJobs);
  };
  // Function to get the number of candidates applied for a job
  const getCandidatesAppliedCount = (jobId) => {
    return candidates.filter((candidate) => candidate.jobId === jobId).length;
  };

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        jobs,
        setJobs,
        addJob, 
        editJob,
        deleteJob,
        candidates,
        setCandidates,
        assessments,
        setAssessments,
        getCandidatesAppliedCount,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
