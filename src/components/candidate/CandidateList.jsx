import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CandidateCard from './CandidateCard';

const CandidateList = ({ darkMode }) => {
  const { candidates, setCandidates } = useContext(AppContext);

  const handleStatusChange = (candidateId, newStatus) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus }
        : candidate
    );
    setCandidates(updatedCandidates);
  };

  const handleDelete = (candidateId) => {
    const updatedCandidates = candidates.filter(
      candidate => candidate.id !== candidateId
    );
    setCandidates(updatedCandidates);
  };

  return (
    <>
      {candidates.map(candidate => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          darkMode={darkMode}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default CandidateList; 