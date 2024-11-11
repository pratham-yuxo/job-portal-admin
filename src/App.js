import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import CandidateDetails from './pages/CandidateDetails';
import CreateAssessment from './pages/CreateAssessment';
import AppProvider from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/candidates/:candidateId" element={<CandidateDetails />} />
            <Route path="/create-assessment" element={<CreateAssessment />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
