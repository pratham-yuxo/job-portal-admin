import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CandidateDetails = () => {
  const { candidateId } = useParams();
  const { candidates } = useContext(AppContext);

  const candidate = candidates.find((c) => c.id === parseInt(candidateId));

  if (!candidate) {
    return <p>Candidate not found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{candidate.name}</h1>
      <p className="mb-2">
        <strong>Email:</strong> {candidate.email || 'N/A'}
      </p>
      <p className="mb-2">
        <strong>Contact:</strong> {candidate.contact || 'N/A'}
      </p>
      <p className="mb-2">
        <strong>Skills:</strong> {candidate.skills?.join(', ') || 'N/A'}
      </p>
      <p className="mb-2">
        <strong>Experience:</strong> {candidate.experience || 'N/A'} years
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {candidate.status}
      </p>
      <a
        href={candidate.resumeLink}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Resume
      </a>
      <div className="mt-6">
        <label className="block text-gray-700 mb-2">Update Status:</label>
        <select className="border p-2 w-full">
          <option value="Under Review">Under Review</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Update Status
        </button>
      </div>
    </div>
  );
};

export default CandidateDetails;
