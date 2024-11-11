import React, { createContext, useState, useEffect } from 'react';
import { mockJobs } from '../mockData/mockJobs';
import { mockCandidates } from '../mockData/mockCandidates';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : mockJobs;
  });

  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = localStorage.getItem('candidates');
    return savedCandidates ? JSON.parse(savedCandidates) : mockCandidates;
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
