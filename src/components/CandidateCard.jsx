import React from 'react';
import { Link } from 'react-router-dom';

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{candidate.name}</h2>
      <p className="text-gray-700 mb-2">Applied on: {candidate.applicationDate}</p>
      <p className="text-gray-500 mb-4">Status: {candidate.status}</p>
      <div className="flex space-x-2">
        <a
          href={candidate.resumeLink}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </a>
        <Link
          to={`/candidates/${candidate.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;
