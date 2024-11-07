import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const EditJob = ({ isOpen, onClose, job, onSave }) => {
  const { editJob } = useContext(AppContext);
  const [jobTitle, setJobTitle] = useState(job.title);
  const [jobDescription, setJobDescription] = useState(job.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle && jobDescription) {
      const updatedJob = {
        ...job,
        title: jobTitle,
        description: jobDescription,
      };
      editJob(updatedJob);
      onSave?.();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job Description</label>
            <textarea
              className="border p-2 w-full"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
